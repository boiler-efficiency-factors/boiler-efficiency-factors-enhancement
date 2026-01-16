// src/components/workspace/CompareWorkspaceSelectList.tsx
import { useMemo, useState } from "react";
import { Workspace } from "../../types/workspace";
import { getWorkspaceCreatedAtMs, getWorkspaceId, isCompletedWorkspace } from "../../utils/workspaceStatus";
import TextInput from "../TextInput";

type SortKey = "createdAtDesc" | "createdAtAsc";

export default function CompareWorkspaceSelectList(props: {
  workspaces: Workspace[];
  selectedIds: string[];
  onChangeSelectedIds: (next: string[]) => void;
  maxSelect?: number;
}) {
  const { workspaces, selectedIds, onChangeSelectedIds, maxSelect = 3 } = props;

  const [q, setQ] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("createdAtDesc");

  const completed = useMemo(() => {
    const filtered = workspaces.filter(isCompletedWorkspace).filter((w) => !!getWorkspaceId(w));
    const searched = q.trim()
      ? filtered.filter((w) => (w.name ?? "").toLowerCase().includes(q.trim().toLowerCase()))
      : filtered;

    searched.sort((a, b) => {
      const ta = getWorkspaceCreatedAtMs(a);
      const tb = getWorkspaceCreatedAtMs(b);
      return sortKey === "createdAtDesc" ? tb - ta : ta - tb;
    });

    return searched;
  }, [workspaces, q, sortKey]);

  const toggle = (id: string) => {
    const has = selectedIds.includes(id);
    if (has) {
      onChangeSelectedIds(selectedIds.filter((x) => x !== id));
      return;
    }
    if (selectedIds.length >= maxSelect) return;
    onChangeSelectedIds([...selectedIds, id]);
  };

  return (
    <div className="w-full flex flex-col gap-[12px]">
      <div className="flex items-center gap-[12px]">
        <div className="grow">
          <TextInput value={q} onChange={setQ} placeholder="워크스페이스 검색" />
        </div>
        <button
          type="button"
          className="h-[40px] px-[12px] rounded-[4px] border"
          onClick={() => setSortKey((p) => (p === "createdAtDesc" ? "createdAtAsc" : "createdAtDesc"))}
        >
          {sortKey === "createdAtDesc" ? "시간 최신순" : "시간 오래된순"}
        </button>
      </div>

      <div className="text-[14px] opacity-70">
        학습 완료 워크스페이스만 선택 가능 (최대 {maxSelect}개). 현재 선택: {selectedIds.length}개
      </div>

      <div className="flex flex-col gap-[8px] max-h-[420px] overflow-y-auto border rounded-[8px] p-[12px] w-full">
        {completed.map((w, idx) => {
          const id = getWorkspaceId(w)!;
          const checked = selectedIds.includes(id);
          const disabled = !checked && selectedIds.length >= maxSelect;

          return (
            <label
              key={`${id}-${idx}`}
              className={`flex items-center gap-[10px] p-[10px] rounded-[6px] ${
                disabled ? "opacity-50" : "cursor-pointer hover:bg-black/5"
              }`}
            >
              <input type="checkbox" checked={checked} disabled={disabled} onChange={() => toggle(id)} />
              <div className="flex flex-col">
                <div className="text-[16px]">{w.name}</div>
                <div className="text-[12px] opacity-70">{w.createdAt ?? "-"}</div>
              </div>
            </label>
          );
        })}

        {completed.length === 0 && <div className="p-[12px] opacity-70">학습 완료된 워크스페이스가 없습니다.</div>}
      </div>
    </div>
  );
}
