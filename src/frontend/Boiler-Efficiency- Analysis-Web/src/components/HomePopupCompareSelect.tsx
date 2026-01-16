// src/components/HomePopupCompareSelect.tsx
import { useMemo, useState } from "react";
import type { Workspace } from "../types/workspace";

type SortKey = "created_desc" | "name_asc";

function isCompleted(raw: unknown): boolean {
  const s = String(raw ?? "").toLowerCase();
  return ["completed", "complete", "done", "success", "succeeded", "finished"].includes(s);
}

function formatKST(value?: string) {
  if (!value || value === "-") return "-";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function HomePopupCompareSelect({
  workspaces,
  onClose,
  onConfirm,
}: {
  workspaces: Workspace[];
  onClose: () => void;
  onConfirm: (ids: string[]) => void;
}) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("created_desc");
  const [selected, setSelected] = useState<string[]>([]);

  const completedOnly = useMemo(
    () => workspaces.filter((w) => isCompleted((w as any).status)),
    [workspaces]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let arr = completedOnly;
    if (q) {
      arr = arr.filter((w) => String((w as any).name ?? "").toLowerCase().includes(q));
    }
    arr = [...arr];
    if (sortKey === "created_desc") {
      arr.sort((a, b) => {
        const da = new Date((a as any).createdAt ?? 0).getTime();
        const db = new Date((b as any).createdAt ?? 0).getTime();
        return (Number.isFinite(db) ? db : 0) - (Number.isFinite(da) ? da : 0);
      });
    } else if (sortKey === "name_asc") {
      arr.sort((a, b) => String((a as any).name ?? "").localeCompare(String((b as any).name ?? "")));
    }
    return arr;
  }, [completedOnly, query, sortKey]);

  const canConfirm = selected.length >= 2 && selected.length <= 3;

  const toggle = (id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev; // 최대 3개
      return [...prev, id];
    });
  };

  return (
    <>
      <div className="absolute bg-[var(--darkreader-background-75757580,rgba(107,116,120,0.5))] inset-0 z-40" onClick={onClose} />
      <div className="absolute bg-[var(--darkreader-background-ffffff,#dcdad7)] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[1200px] max-w-[95vw] max-h-[90vh] overflow-y-auto rounded-[24px] p-[28px] z-50">
        <div className="flex items-center justify-between gap-[12px]">
          <div>
            <p className="font-['Noto_Sans_KR:Bold',sans-serif] font-bold text-[20px] text-[color:var(--darkreader-text-243647,#2c4257)]">
              워크스페이스 비교(워크스페이스 2~3개 선택)
            </p>
            <p className="text-[13px] opacity-70 mt-[4px]">최대 3개 선택 가능, 2~3개 선택 시 비교하기 활성화</p>
          </div>

          <div className="flex items-center gap-[8px]">
            <button
              type="button"
              onClick={onClose}
              className="h-[36px] px-[12px] rounded-[6px] border border-[var(--darkreader-border-243647,#2c4257)] hover:opacity-90"
            >
              닫기
            </button>
          </div>
        </div>

        <div className="flex items-center gap-[10px] mt-[16px]">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="워크스페이스 이름 검색"
            className="w-full h-[40px] px-[12px] rounded-[8px] border border-[var(--darkreader-border-dcdcdc,#c3c0bb)] bg-transparent"
          />
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="h-[40px] px-[10px] rounded-[8px] border border-[var(--darkreader-border-dcdcdc,#c3c0bb)] bg-transparent"
          >
            <option value="created_desc">생성일 최신순</option>
            <option value="name_asc">이름 오름차순</option>
          </select>
        </div>

        <div className="mt-[14px] flex items-center justify-between">
          <p className="text-[14px]">
            선택: <b>{selected.length}</b> / 3
          </p>
          <button
            type="button"
            disabled={!canConfirm}
            onClick={() => onConfirm(selected)}
            className={`h-[40px] px-[16px] rounded-[8px] ${
              canConfirm
                ? "bg-[var(--darkreader-background-243647,#2c4257)] text-[color:var(--darkreader-text-ffffff,#dcdad7)] hover:opacity-90"
                : "bg-[var(--darkreader-background-dcdcdc,#c3c0bb)] opacity-60 cursor-not-allowed"
            }`}
          >
            비교하기
          </button>
        </div>

        <div className="mt-[14px] border rounded-[10px] overflow-hidden">
          <div className="grid grid-cols-[60px_1fr_180px_140px] bg-[var(--darkreader-background-f5f5f5,#d3d1cd)] px-[12px] py-[10px] text-[13px]">
            <div>선택</div>
            <div>워크스페이스</div>
            <div>생성일</div>
            <div>모델</div>
          </div>

          {filtered.map((w) => {
            const id = String((w as any).id);
            const checked = selected.includes(id);
            const disabled = !checked && selected.length >= 3;

            return (
              <div key={`cmp-row-${id}`} className="grid grid-cols-[60px_1fr_180px_140px] px-[12px] py-[10px] border-t">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={checked}
                    disabled={disabled}
                    onChange={() => toggle(id)}
                  />
                </div>
                <div className="truncate">{String((w as any).name ?? "-")}</div>
                <div>{formatKST((w as any).createdAt)}</div>
                <div className="truncate">{String((w as any).model ?? "-")}</div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="px-[12px] py-[16px] text-[14px] opacity-70">조건에 맞는 워크스페이스가 없습니다.</div>
          )}
        </div>
      </div>
    </>
  );
}
