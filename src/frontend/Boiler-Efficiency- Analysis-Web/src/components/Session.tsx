//해야할 것 : 모델 학습 현황 표시 / base64형식 사진으로 인코딩해서 표시 / 성능 지표 읽어서 테이블에 채우기
//10초 간격으로 폴링해서 워크스페이스 학습 상태 읽어오기?
import { useEffect, useMemo, useState } from "react";
import imgImage1 from "figma:asset/9455e449a8552d0d5315c2395b0a6b3b3b6be99c.png";
import WorkspaceInfoPopup from "./WorkspaceInfoPopup";
import type { Workspace } from "../types/workspace";
import { api } from "../api/client";

interface SessionProps {
  username: string;
  workspace: Workspace;
  onBack: () => void;
}

type FeatureItem = { name: string; importance: number };
type MetricsRow = { MAE?: number; MSE?: number; RMSE?: number; MAPE?: number };
type MetricsBundle = { train?: MetricsRow; test?: MetricsRow };

function getModelId(ws: any): string | null {
  const v = ws?.model_id ?? ws?.modelId ?? ws?.id ?? ws?.modelID ?? ws?.model_uuid;
  return typeof v === "string" && v.trim() ? v : null;
}

function parseMaybeJson(v: unknown): unknown {
  if (typeof v !== "string") return v;
  let s = v.trim();
  if (!s) return v;

  if (s.startsWith("{") || s.startsWith("[")) {
    try {
      return JSON.parse(s);
    } catch {
      try {
        const fixed = s
          .replace(/\bNone\b/g, "null")
          .replace(/\bTrue\b/g, "true")
          .replace(/\bFalse\b/g, "false")
          .replace(/'/g, '"');
        return JSON.parse(fixed);
      } catch {
        return v;
      }
    }
  }

  return v;
}

function parseStringList(v: unknown): string[] {
  const parsed = parseMaybeJson(v);
  if (Array.isArray(parsed)) return parsed.map((x) => String(x));
  if (typeof parsed === "string") {
    const s = parsed.trim();
    if (!s) return [];
    // "a,b,c" 형태도 대응
    if (s.includes(",")) return s.split(",").map((x) => x.trim()).filter(Boolean);
    return [s];
  }
  return [];
}
type FeatureItem = { name: string; importance: number };
function normalizeFeatureImportance(raw: unknown): FeatureItem[] {
  const parsed = parseMaybeJson(raw);

  if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
    const obj = parsed as Record<string, any>;
    const items: FeatureItem[] = [];
    for (const [k, v] of Object.entries(obj)) {
      const n = Number(v);
      if (Number.isFinite(n)) items.push({ name: k, importance: n });
    }
    return items.sort((a, b) => b.importance - a.importance);
  }

  if (Array.isArray(parsed)) {
    const items: FeatureItem[] = [];
    for (const it of parsed as any[]) {
      if (Array.isArray(it) && it.length >= 2) {
        const n = Number(it[1]);
        if (Number.isFinite(n)) items.push({ name: String(it[0]), importance: n });
      } else if (it && typeof it === "object") {
        const name = String(it.name ?? it.feature ?? it.column ?? it.key ?? "");
        const n = Number(it.importance ?? it.score ?? it.value ?? NaN);
        if (name && Number.isFinite(n)) items.push({ name, importance: n });
      }
    }
    return items.sort((a, b) => b.importance - a.importance);
  }

  return [];
}

type MetricsRow = { MAE?: number; MSE?: number; RMSE?: number; MAPE?: number; R2?: number };
type MetricsBundle = { train?: MetricsRow; test?: MetricsRow };

function toNumber(x: any): number | undefined {
  const n = typeof x === "number" ? x : Number(x);
  return Number.isFinite(n) ? n : undefined;
}

function pickCase(obj: any, key: string) {
  if (!obj) return undefined;
  return obj[key] ?? obj[key.toLowerCase()] ?? obj[key.toUpperCase()];
}

function toMetricsRow(obj: any): MetricsRow {
  return {
    MAE: toNumber(pickCase(obj, "MAE") ?? pickCase(obj, "mae")),
    MSE: toNumber(pickCase(obj, "MSE") ?? pickCase(obj, "mse")),
    RMSE: toNumber(pickCase(obj, "RMSE") ?? pickCase(obj, "rmse")),
    MAPE: toNumber(pickCase(obj, "MAPE") ?? pickCase(obj, "mape")),
    R2: toNumber(pickCase(obj, "R2") ?? pickCase(obj, "r2")),
  };
}

function normalizeMetrics(raw: unknown): MetricsBundle | null {
  const parsed = parseMaybeJson(raw);
  if (!parsed || typeof parsed !== "object") return null;

  const obj: any = parsed;

  if (obj.train || obj.test) {
    return {
      train: obj.train ? toMetricsRow(obj.train) : undefined,
      test: obj.test ? toMetricsRow(obj.test) : undefined,
    };
  }

  if (obj.training_metrics || obj.test_metrics) {
    return {
      train: obj.training_metrics ? toMetricsRow(obj.training_metrics) : undefined,
      test: obj.test_metrics ? toMetricsRow(obj.test_metrics) : undefined,
    };
  }

  const row = toMetricsRow(obj);
  const hasAny = Object.values(row).some((v) => typeof v === "number");
  if (!hasAny) return null;

  return { train: row, test: row };
}

function Button({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-[var(--darkreader-background-243647,#2c4257)] content-stretch flex h-[40px] items-center justify-center px-[16px] py-[11px] relative rounded-[4px] shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
      data-name="Button"
    >
      <p className="font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--darkreader-text-ffffff,#dcdad7)] text-nowrap whitespace-pre">
        워크스페이스 정보
      </p>
    </button>
  );
}

function Frame2({ workspaceName, onInfoClick }: { workspaceName: string; onInfoClick: () => void }) {
  return (
    <div className="content-stretch flex h-[37px] items-center justify-between overflow-clip px-0 py-[4px] relative shrink-0 w-full">
      <p className="font-['Noto_Sans_KR:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[24px] text-[color:var(--darkreader-text-243647,#2c4257)] text-nowrap whitespace-pre">
        {`워크스페이스명 : ${workspaceName}`}
      </p>
      <Button onClick={onInfoClick} />
    </div>
  );
}

function Frame3({ workspaceName, onInfoClick }: { workspaceName: string; onInfoClick: () => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <Frame2 workspaceName={workspaceName} onInfoClick={onInfoClick} />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1200 1">
            <line id="Line 1" stroke="var(--stroke-0, #243647)" x2="1200" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function FeatureBars({
  items,
}: {
  items: FeatureItem[];
}) {
  const max = items.length ? Math.max(...items.map((x) => x.importance)) : 1;
  return (
    <div className="w-full h-full overflow-y-auto p-[16px]">
      <div className="flex flex-col gap-[10px]">
        {items.map((it) => {
          const pct = max > 0 ? Math.max(0, (it.importance / max) * 100) : 0;
          return (
            <div key={it.name} className="flex items-center gap-[12px]">
              <div className="w-[320px] text-[14px] text-[color:var(--darkreader-text-243647,#2c4257)] truncate">
                {it.name}
              </div>
              <div className="flex-1 h-[10px] bg-[var(--darkreader-background-dcdcdc,#c3c0bb)] rounded-[999px] overflow-hidden">
                <div className="h-full bg-[var(--darkreader-background-243647,#2c4257)]" style={{ width: `${pct}%` }} />
              </div>
              <div className="w-[90px] text-right text-[12px] text-[color:var(--darkreader-text-454b54,#4e5558)]">
                {Number.isFinite(it.importance) ? it.importance.toFixed(6) : "-"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Frame4({
  loading,
  error,
  featureItems,
  featureImageSrc,
}: {
  loading: boolean;
  error: string | null;
  featureItems: FeatureItem[] | null;
  featureImageSrc: string | null; 
}) {
  const hasBars = !!featureItems && featureItems.length > 0;
  const hasImage = !!featureImageSrc;

  return (
    <div className="content-stretch flex flex-col gap-[20px] items-center relative shrink-0 w-full">
      <p className="font-['Noto_Sans_KR:Medium',sans-serif] font-medium leading-[20px] min-w-full relative shrink-0 text-[20px] text-[color:var(--darkreader-text-243647,#2c4257)] w-[min-content]">
        피쳐 중요도
      </p>

      <div className="h-[544px] relative shrink-0 w-[1098px] rounded-[8px] overflow-hidden">
        {!hasBars && !hasImage && (
          <img
            alt=""
            className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full opacity-40"
            src={imgImage1}
          />
        )}

        <div className="absolute inset-0 bg-[var(--darkreader-background-ffffff,#dcdad7)]">
          {loading && (
            <div className="w-full h-full flex items-center justify-center text-[14px] text-[color:var(--darkreader-text-454b54,#4e5558)]">
              피쳐 중요도 불러오는 중...
            </div>
          )}

          {!loading && error && (
            <div className="w-full h-full flex items-center justify-center text-[14px] text-red-600 px-[16px] text-center">
              {error}
            </div>
          )}

          {!loading && !error && hasBars && <FeatureBars items={featureItems!.slice(0, 30)} />}

          {!loading && !error && !hasBars && hasImage && (
            <div className="w-full h-full p-[12px]">
              <img
                src={featureImageSrc!}
                alt="피쳐 중요도"
                className="w-full h-full object-contain"
              />
            </div>
          )}

          {!loading && !error && !hasBars && !hasImage && (
            <div className="w-full h-full flex items-center justify-center text-[14px] text-[color:var(--darkreader-text-454b54,#4e5558)]">
              표시할 피쳐 중요도 데이터가 없습니다.
            </div>
          )}
        </div>

        <div aria-hidden="true" className="absolute border-[var(--darkreader-border-243647,#2c4257)] inset-0 pointer-events-none rounded-[8px]" />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] relative shrink-0 w-full" data-name="_Header">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start p-[16px] relative w-full">
          <p className="font-['Roboto:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[16px] text-[color:var(--darkreader-text-243647,#2c4257)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            지표
          </p>
        </div>
      </div>
      <div className="absolute inset-0 shadow-[0px_-2px_0px_0px_inset_var(--darkreader-background-e3e5e8,#cac7c3)]" />
    </div>
  );
}

function LabelCell({ label }: { label: string }) {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] relative shrink-0 w-full" data-name="_Cell">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start px-[16px] py-[14px] relative w-full">
          <p className="font-['Roboto:Light',sans-serif] font-light leading-[20px] relative shrink-0 text-[16px] text-[color:var(--darkreader-text-454b54,#4e5558)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}

function TableContents() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Table Contents">
      <LabelCell label="MAE" />
      <LabelCell label="MSE" />
      <LabelCell label="RMSE" />
      <LabelCell label="MAPE" />
    </div>
  );
}

function TableColumn() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[78px]" data-name="Table Column">
      <Header />
      <TableContents />
    </div>
  );
}

function Header1() {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] content-stretch flex items-start overflow-clip p-[16px] relative shrink-0" data-name="_Header">
      <p className="font-['Roboto:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[16px] text-[color:var(--darkreader-text-243647,#2c4257)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        학습 지표
      </p>
      <div className="absolute inset-0 shadow-[0px_-2px_0px_0px_inset_var(--darkreader-background-e3e5e8,#cac7c3)]" />
    </div>
  );
}

function Header2() {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] content-stretch flex items-start overflow-clip p-[16px] relative shrink-0" data-name="_Header">
      <p className="font-['Roboto:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[16px] text-[color:var(--darkreader-text-243647,#2c4257)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        테스트 지표
      </p>
      <div className="absolute inset-0 shadow-[0px_-2px_0px_0px_inset_var(--darkreader-background-e3e5e8,#cac7c3)]" />
    </div>
  );
}

function ValueCell({ value }: { value: string }) {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] relative shrink-0 w-full" data-name="_Cell">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start px-[16px] py-[14px] relative w-full">
          <p className="font-['Roboto:Light',sans-serif] font-light leading-[20px] relative shrink-0 text-[16px] text-[color:var(--darkreader-text-454b54,#4e5558)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

function TableContentsValues({ values }: { values: string[] }) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Table Contents">
      {values.map((v, i) => (
        <ValueCell key={i} value={v} />
      ))}
    </div>
  );
}

function TableColumn1({ values }: { values: string[] }) {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Table Column">
      <Header1 />
      <TableContentsValues values={values} />
    </div>
  );
}

function TableColumn2({ values }: { values: string[] }) {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Table Column">
      <Header2 />
      <TableContentsValues values={values} />
    </div>
  );
}

function Frame({ trainValues, testValues }: { trainValues: string[]; testValues: string[] }) {
  return (
    <div className="relative rounded-[8px] shrink-0">
      <div className="content-stretch flex items-center overflow-clip relative rounded-[inherit]">
        <TableColumn />
        <TableColumn1 values={trainValues} />
        <TableColumn2 values={testValues} />
      </div>
      <div aria-hidden="true" className="absolute border-[var(--darkreader-border-243647,#2c4257)] inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame5({
  loading,
  error,
  metrics,
}: {
  loading: boolean;
  error: string | null;
  metrics: MetricsBundle | null;
}) {
  const fmt = (n: any) => (typeof n === "number" && Number.isFinite(n) ? n.toFixed(6) : "-");
  const train = metrics?.train as any;
  const test = metrics?.test as any;
  const trainValues = [
    fmt(train?.MAE ?? train?.mae),
    fmt(train?.MSE ?? train?.mse),
    fmt(train?.RMSE ?? train?.rmse),
    fmt(train?.MAPE ?? train?.mape),
  ];

  const testValues = [
    fmt(test?.MAE ?? test?.mae),
    fmt(test?.MSE ?? test?.mse),
    fmt(test?.RMSE ?? test?.rmse),
    fmt(test?.MAPE ?? test?.mape),
  ];

  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
      <p className="font-['Noto_Sans_KR:Medium',sans-serif] font-medium leading-[20px] min-w-full relative shrink-0 text-[20px] text-[color:var(--darkreader-text-243647,#2c4257)] w-[min-content]">
        모델 평가 지표
      </p>

      {loading && <div className="text-[14px] text-[color:var(--darkreader-text-454b54,#4e5558)]">지표 불러오는 중...</div>}
      {!loading && error && <div className="text-[14px] text-red-600">{error}</div>}
      <Frame trainValues={trainValues} testValues={testValues} />
    </div>
  );
}

function Frame1({
  workspaceName,
  onInfoClick,
  featureLoading,
  featureError,
  featureItems,
  metricsLoading,
  featureImageSrc,
  metricsError,
  metrics,
}: {
  workspaceName: string;
  onInfoClick: () => void;
  featureLoading: boolean;
  featureError: string | null;
  featureItems: FeatureItem[] | null;
  metricsLoading: boolean;
  metricsError: string | null;
  metrics: MetricsBundle | null;
  featureImageSrc: string | null; 

}) {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] relative rounded-[24px] shrink-0 w-full">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[20px] items-center p-[20px] relative w-full">
          <Frame3 workspaceName={workspaceName} onInfoClick={onInfoClick} />
          <Frame4
            loading={featureLoading}
            error={featureError}
            featureItems={featureItems}
            featureImageSrc={featureImageSrc}
          />
          <Frame5 loading={metricsLoading} error={metricsError} metrics={metrics} />
        </div>
      </div>
    </div>
  );
}

function AuthCreateAccount(props: React.ComponentProps<typeof Frame1>) {
  return (
    <div className="absolute bg-[var(--darkreader-background-f9f9f9,#d8d6d2)] content-stretch flex flex-col items-center left-0 overflow-clip px-[100px] py-[60px] top-[72px] w-[1440px]" data-name="Auth/Create-Account">
      <Frame1 {...props} />
    </div>
  );
}

function NavBar({ username, onBack }: { username: string; onBack: () => void }) {
  return (
    <div className="absolute contents left-0 top-0" data-name="Nav-bar">
      <div className="absolute bg-[var(--darkreader-background-ffffff,#dcdad7)] h-[72px] left-0 top-0 w-[1440px]" data-name="Base" />
      <div className="absolute bg-[var(--darkreader-background-dcdcdc,#c3c0bb)] h-px left-0 top-[71px] w-[1440px]" data-name="Line" />
      <button onClick={onBack} className="absolute left-[20px] top-[26px] cursor-pointer hover:opacity-70 transition-opacity">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M12.5 15L7.5 10L12.5 5" stroke="#243647" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <p className="absolute font-['Noto_Sans_KR:Bold',sans-serif] font-bold leading-[20px] left-[1214px] text-[20px] text-[color:var(--darkreader-text-243647,#2c4257)] text-nowrap top-[26px] whitespace-pre">
        {`${username}의 연구실`}
      </p>
    </div>
  );
}

export default function Session({ username, workspace, onBack }: SessionProps) {
  const [showInfoPopup, setShowInfoPopup] = useState(false);

  const [workspaceDetail, setWorkspaceDetail] = useState<Workspace>(workspace);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  const [featureItems, setFeatureItems] = useState<FeatureItem[] | null>(null);
  const [featureLoading, setFeatureLoading] = useState(false);
  const [featureError, setFeatureError] = useState<string | null>(null);
  const [featureImageSrc, setFeatureImageSrc] = useState<string | null>(null);


  const [metrics, setMetrics] = useState<MetricsBundle | null>(null);
  const [metricsLoading, setMetricsLoading] = useState(false);
  const [metricsError, setMetricsError] = useState<string | null>(null);

  const modelId = useMemo(() => getModelId(workspace), [workspace]);

  useEffect(() => {
    setWorkspaceDetail(workspace);
  }, [workspace]);

  useEffect(() => {
    if (!modelId) return;

    // 1) 상세
    (async () => {
      setDetailLoading(true);
      setDetailError(null);
      try {
        const { data } = await api.get(`/api/home/workspace/get/${modelId}/`);
        const excluded = parseStringList(data?.excluded_var ?? data?.excludedVariables);
        const paramsParsed = parseMaybeJson(data?.parameter);

        const hyperList =
          Array.isArray(paramsParsed)
            ? (paramsParsed as any[]).map((x) => String(x))
            : paramsParsed && typeof paramsParsed === "object"
              ? Object.entries(paramsParsed as Record<string, any>).map(([k, v]) => `${k}=${String(v)}`)
              : [];

        setWorkspaceDetail({
          ...(workspace as any),
          name: data?.workspace ?? data?.name ?? workspace.name,
          model: data?.model_name ?? data?.model ?? (workspace as any).model,
          startDate: data?.start_date ?? data?.startDate ?? (workspace as any).startDate,
          endDate: data?.end_date ?? data?.endDate ?? (workspace as any).endDate,
          hyperparameters: hyperList.length ? hyperList : (workspace as any).hyperparameters,
          dependentVariable: data?.dependent_var ?? data?.dependentVariable ?? (workspace as any).dependentVariable,
          excludedVariables: excluded.length ? excluded : (workspace as any).excludedVariables,
          ...(data?.created_at ? { createdAt: data.created_at } : {}),
          ...(data?.tuning ? { tuning: data.tuning } : {}),
          ...(data?.model_id ? { model_id: data.model_id } : {}),
        } as any);
      } catch (e: any) {
        setDetailError(e?.message ?? "워크스페이스 상세 조회 실패");
      } finally {
        setDetailLoading(false);
      }
    })();

    // 2) 세션(피쳐 중요도 + 지표)
    (async () => {
      setFeatureLoading(true);
      setMetricsLoading(true);

      setFeatureError(null);
      setMetricsError(null);

      setFeatureItems(null);
      setFeatureImageSrc(null);
      setMetrics(null);

      try {
        const { data } = await api.get(`/api/home/workspace/get/session/${modelId}/`);

        // --- feature (base64 이미지 or 중요도 데이터) ---
        const featurePayload =
          data?.feature ??
          data?.features ??
          data?.feature_importance ??
          data?.featureImportance ??
          data?.importance ??
          data?.result?.feature ??
          data?.result?.features ??
          data?.result?.feature_importance ??
          null;

        if (typeof featurePayload === "string") {
          const s0 = featurePayload.trim();
          const s = s0.replace(/\s+/g, "");

          if (s.startsWith("data:image/")) {
            setFeatureImageSrc(s);
          } else if (s.startsWith("iVBORw0KGgo")) {
            setFeatureImageSrc(`data:image/png;base64,${s}`);
          } else if (s.startsWith("/9j/")) {
            setFeatureImageSrc(`data:image/jpeg;base64,${s}`);
          } else {
            setFeatureImageSrc(`data:image/png;base64,${s}`);
          }
        } else {
          const items = normalizeFeatureImportance(featurePayload ?? data);
          setFeatureItems(items);
        }

        const metricsPayload =
          data?.metrics ??
          data?.metric ??
          data?.result?.metrics ??
          data?.result?.metric ??
          null;

        setMetrics(normalizeMetrics(metricsPayload));

      } catch (e: any) {
        const msg =
          e?.response?.data?.detail ??
          e?.message ??
          "세션 조회 실패";
        setFeatureError(msg);
        setMetricsError(msg);
      } finally {
        setFeatureLoading(false);
        setMetricsLoading(false);
      }
    })();
  }, [modelId, workspace, onBack]);

  const handleInfoClick = () => setShowInfoPopup(true);
  const handleCloseInfo = () => setShowInfoPopup(false);

  return (
    <div className="bg-[var(--darkreader-background-f9f9f9,#d8d6d2)] relative min-h-screen w-full" data-name="Session">
      <AuthCreateAccount
        workspaceName={workspaceDetail.name}
        onInfoClick={handleInfoClick}
        featureLoading={featureLoading}
        featureError={featureError}
        featureItems={featureItems}
        featureImageSrc={featureImageSrc}
        metricsLoading={metricsLoading}
        metricsError={metricsError}
        metrics={metrics}
      />
      <NavBar username={username} onBack={onBack} />
      {showInfoPopup && (
        <WorkspaceInfoPopup workspace={workspaceDetail} onClose={handleCloseInfo} isLoading={detailLoading} error={detailError} />
      )}
    </div>
  );
}
