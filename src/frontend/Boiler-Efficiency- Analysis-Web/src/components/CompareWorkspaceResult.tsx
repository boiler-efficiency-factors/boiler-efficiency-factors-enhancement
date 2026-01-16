// src/components/CompareWorkspaceResult.tsx
import { useEffect, useMemo, useState } from "react";
import * as wsApi from "../api/workspace";

type AnyObj = Record<string, any>;

function parseMaybeJson(v: any) {
  if (typeof v !== "string") return v;
  try {
    return JSON.parse(v);
  } catch {
    return v;
  }
}

function isLikelyImageUrl(v: any) {
  if (typeof v !== "string") return false;
  const s = v.toLowerCase();
  return (
    (s.startsWith("http://") || s.startsWith("https://")) &&
    (s.endsWith(".png") || s.endsWith(".jpg") || s.endsWith(".jpeg") || s.endsWith(".webp") || s.endsWith(".gif") || s.includes(".png?") || s.includes(".jpg?") || s.includes(".jpeg?") || s.includes(".webp?") || s.includes(".gif?"))
  );
}

function guessImageMimeFromBase64(b64: string) {
  const s = b64.trim();
  if (s.startsWith("iVBORw0KGgo")) return "image/png";
  if (s.startsWith("/9j/")) return "image/jpeg";
  if (s.startsWith("R0lGOD")) return "image/gif";
  if (s.startsWith("UklGR")) return "image/webp";
  return "image/png"; // fallback
}

function isLikelyBase64Image(v: any) {
  if (typeof v !== "string") return false;
  const s = v.trim();
  if (s.startsWith("data:image/")) return true;
  if (s.length < 200) return false;
  if (!/^[A-Za-z0-9+/=\s]+$/.test(s)) return false;
  if (s.startsWith("iVBORw0KGgo") || s.startsWith("/9j/") || s.startsWith("R0lGOD") || s.startsWith("UklGR")) {
    return true;
  }

  return true;
}

function toImageSrc(v: any) {
  if (typeof v !== "string") return null;
  const s = v.trim();

  if (isLikelyImageUrl(s)) return s;

  if (s.startsWith("data:image/")) return s;

  if (isLikelyBase64Image(s)) {
    const mime = guessImageMimeFromBase64(s);
    return `data:${mime};base64,${s}`;
  }

  return null;
}


function pickMetricObject(payload: AnyObj): AnyObj {
  if (!payload || typeof payload !== "object") return {};

  const candidate =
    payload.metric ??
    payload.metrics ??
    payload.evaluation ??
    payload.results ??
    payload;

  const parsed = parseMaybeJson(candidate);

  if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
    const out: AnyObj = {};
    for (const [k, v] of Object.entries(parsed)) {
      if (typeof v === "number") out[k] = v;
      else if (typeof v === "string") {
        const n = Number(v);
        if (Number.isFinite(n)) out[k] = n;
      }
    }
    return out;
  }

  const out: AnyObj = {};
  for (const [k, v] of Object.entries(payload)) {
    if (typeof v === "number") out[k] = v;
    else if (typeof v === "string") {
      const n = Number(v);
      if (Number.isFinite(n)) out[k] = n;
    }
  }
  return out;
}

// === Metric extract (deep + whitelist) ===
const METRIC_ALIAS: Record<string, string> = {
  mse: "mse",
  rmse: "rmse",
  mae: "mae",
  mape: "mape",
  smape: "smape",
  r2: "r2",
  r2score: "r2",
  r2_score: "r2",
  rmsle: "rmsle",
  msle: "msle",
};

const METRIC_ORDER = ["mse", "rmse", "mae", "mape", "smape", "r2", "rmsle", "msle"];

function normalizeKey(k: string) {
  return k.toLowerCase().replace(/\s+/g, "").replace(/[-]/g, "_");
}

function coerceNumber(v: any): number | null {
  if (typeof v === "number" && Number.isFinite(v)) return v;

  if (typeof v === "string") {
    const cleaned = v.replace(/,/g, "");
    const m = cleaned.match(/-?\d+(\.\d+)?/);
    if (!m) return null;
    const n = Number(m[0]);
    return Number.isFinite(n) ? n : null;
  }

  return null;
}

function extractMetricsDeep(payload: AnyObj): AnyObj {
  const out: AnyObj = {};
  const seen = new Set<any>();

  function visit(obj: any, depth: number) {
    if (!obj || typeof obj !== "object") return;
    if (seen.has(obj)) return;
    seen.add(obj);

    for (const [k, v] of Object.entries(obj)) {
      const nk = normalizeKey(k);
      const canonical = METRIC_ALIAS[nk];

      if (canonical) {
        const num = coerceNumber(v);
        if (num !== null) out[canonical] = num;
      }

      if (depth <= 0) continue;

      if (v && typeof v === "object") {
        visit(v, depth - 1);
      } else if (typeof v === "string") {
        const parsed = parseMaybeJson(v);
        if (parsed !== v && parsed && typeof parsed === "object") {
          visit(parsed, depth - 1);
        }
      }
    }
  }

  visit(payload, 5);
  return out;
}

function pickFeatureOnly(payload: AnyObj) {
  if (!payload || typeof payload !== "object") return payload;

  const candidate =
    payload.feature ??
    payload.features ??
    payload.feature_importance ??
    payload.featureImportance ??
    payload.url ??
    payload.image ??
    payload.plot ??
    payload;

  return parseMaybeJson(candidate);
}


function unionKeys(arr: AnyObj[]): string[] {
  const s = new Set<string>();
  for (const o of arr) for (const k of Object.keys(o ?? {})) s.add(k);
  return [...s];
}

const METRIC_WHITELIST = new Set([
  "mse",
  "rmse",
  "mae",
  "mape",
  "r2",
  "r2_score",
  "r2score",
]);

function normalizeMetricKey(k: string) {
  return k.trim().toLowerCase();
}

function filterMetricKeys(keys: string[]) {
  const exact = keys.filter((k) => METRIC_WHITELIST.has(normalizeMetricKey(k)));
  if (exact.length > 0) return exact;

  const patterns = ["mse", "rmse", "mae", "mape", "r2"];
  return keys.filter((k) => {
    const nk = normalizeMetricKey(k);
    return patterns.some((p) => nk === p || nk.endsWith(`_${p}`) || nk.includes(p));
  });
}


function looksLikeUrl(x: unknown): boolean {
  const s = String(x ?? "");
  return s.startsWith("http://") || s.startsWith("https://");
}

export default function CompareWorkspaceResult({
  workspaceIds,
  onClose,
}: {
  workspaceIds: string[];
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(true);
  const [mains, setMains] = useState<AnyObj[]>([]);
  const [features, setFeatures] = useState<AnyObj[]>([]);
  const [errors, setErrors] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setErrors(null);

        const mainSettled = await Promise.allSettled(workspaceIds.map((id) => wsApi.getWorkspaceMain(id)));
        const featureSettled = await Promise.allSettled(workspaceIds.map((id) => wsApi.getWorkspaceFeature(id)));

        if (!alive) return;

        const mainData = mainSettled.map((r) => (r.status === "fulfilled" ? r.value : { __error: String(r.reason) }));
        const featureData = featureSettled.map((r) =>
          r.status === "fulfilled" ? r.value : { __error: String(r.reason) }
        );

        setMains(mainData);
        setFeatures(featureData);

        const anyFail =
          mainSettled.some((r) => r.status === "rejected") || featureSettled.some((r) => r.status === "rejected");
        if (anyFail) setErrors("일부 워크스페이스의 비교 데이터 조회에 실패했습니다. (표시는 가능한 범위만 제공합니다.)");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [workspaceIds]);

  const metricObjs = useMemo(() => features.map((f) => extractMetricsDeep(f)), [features]);
  const metricKeys = useMemo(() => {
    const order = ["mse", "rmse", "mae", "mape", "r2", "r2_score"];
    return order.filter((k) => metricObjs.some((o) => o && o[k] !== undefined));
  }, [metricObjs]);


  return (
    <>
      <div className="absolute bg-[var(--darkreader-background-75757580,rgba(107,116,120,0.5))] inset-0 z-40" onClick={onClose} />
      <div className="absolute bg-[var(--darkreader-background-ffffff,#dcdad7)] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[1100px] max-h-[92vh] overflow-y-auto rounded-[24px] p-[28px] z-50">
        <div className="flex items-start justify-between gap-[12px]">
          <div>
            <p className="font-['Noto_Sans_KR:Bold',sans-serif] font-bold text-[20px] text-[color:var(--darkreader-text-243647,#2c4257)]">
              워크스페이스 비교 결과
            </p>
            <p className="text-[13px] opacity-70 mt-[4px]">선택된 ID: {workspaceIds.join(", ")}</p>
            {errors && <p className="text-[13px] mt-[6px] opacity-80">{errors}</p>}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="h-[36px] px-[12px] rounded-[6px] border border-[var(--darkreader-border-243647,#2c4257)] hover:opacity-90"
          >
            닫기
          </button>
        </div>

        {loading ? (
          <div className="mt-[18px] opacity-70">비교 데이터 불러오는 중...</div>
        ) : (
          <>
            <div className="mt-[18px]">
              <p className="font-['Noto_Sans_KR:Bold',sans-serif] font-bold text-[16px] text-[color:var(--darkreader-text-243647,#2c4257)]">
                지표 비교
              </p>

              <div className="mt-[10px] border rounded-[10px] overflow-hidden">
                <div
                  className="grid bg-[var(--darkreader-background-f5f5f5,#d3d1cd)] px-[12px] py-[10px] text-[13px]"
                  style={{ gridTemplateColumns: `240px repeat(${workspaceIds.length}, 1fr)` }}
                >
                  <div>Metric</div>
                  {workspaceIds.map((id) => (
                    <div key={`col-${id}`} className="truncate">
                      {id}
                    </div>
                  ))}
                </div>

                {metricKeys.length === 0 ? (
                  <div className="px-[12px] py-[16px] text-[14px] opacity-70">
                    숫자형 지표를 자동으로 찾지 못했습니다. (응답 구조에 따라 커스텀 매핑이 필요할 수 있습니다.)
                  </div>
                ) : (
                  metricKeys.map((k) => (
                    <div
                      key={`row-${k}`}
                      className="grid px-[12px] py-[10px] border-t text-[13px]"
                      style={{ gridTemplateColumns: `240px repeat(${workspaceIds.length}, 1fr)` }}
                    >
                      <div className="truncate">{k}</div>
                      {metricObjs.map((o, idx) => (
                        <div key={`cell-${k}-${idx}`} className="truncate">
                          {o?.[k] == null ? "-" : String(o[k])}
                        </div>
                      ))}
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="mt-[26px]">
              <p className="font-['Noto_Sans_KR:Bold',sans-serif] font-bold text-[16px] text-[color:var(--darkreader-text-243647,#2c4257)]">
                Feature 비교
              </p>
              <div className="mt-[10px] grid gap-[12px]" style={{ gridTemplateColumns: `repeat(${workspaceIds.length}, 1fr)` }}>
                {features.map((f, i) => {
                  const featureOnly = pickFeatureOnly(f);
                  const imgSrc = toImageSrc(featureOnly);
                  return (
                    <div key={`feat-${workspaceIds[i]}`} className="border rounded-[12px] p-[12px]">
                      <p className="text-[13px] font-semibold mb-[8px] truncate">{workspaceIds[i]}</p>
                      {imgSrc ? (
                        <img src={imgSrc} alt="feature" className="w-full rounded-[8px]" />
                      ) : (
                        <pre className="text-[12px] whitespace-pre-wrap break-words max-h-[360px] overflow-auto opacity-80">
                          {JSON.stringify(featureOnly, null, 2)}
                        </pre>
                      )}
                    </div>
                  );
                })}

              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
