import { useMemo, useState } from "react";
import { Workspace } from "../types/workspace";
import CompareWorkspaceSelectList from "./workspace/CompareWorkspaceSelectList";
import CompareWorkspaceResult from "./CompareWorkspaceResult";

type TabKey = "select" | "compare";

export default function HomePopupCompareWorkspaces(props: {
  workspaces: Workspace[];
  onClose: () => void;
}) {
  const { workspaces, onClose } = props;

  const [tab, setTab] = useState<TabKey>("select");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const canCompare = selectedIds.length >= 2 && selectedIds.length <= 3;

  const goCompare = () => {
    if (!canCompare) return;
    setTab("compare");
  };

  const title = useMemo(() => (tab === "select" ? "워크스페이스 선택" : "워크스페이스 비교"), [tab]);

  return (
    <>
      <div className="absolute bg-[var(--darkreader-background-75757580,rgba(107,116,120,0.5))] inset-0 z-40" onClick={onClose} />
      <div className="absolute bg-[var(--darkreader-background-ffffff,#dcdad7)] flex flex-col gap-[16px] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[900px] max-h-[90vh] overflow-y-auto z-50 rounded-[24px] p-[28px]">
        <div className="flex items-center justify-between">
          <div className="text-[18px] font-semibold">{title}</div>
          <button type="button" className="px-[10px] py-[6px] rounded-[6px] border" onClick={onClose}>
            닫기
          </button>
        </div>
        <div className="flex gap-[8px]">
          <button
            type="button"
            className={`px-[12px] py-[8px] rounded-[8px] border ${tab === "select" ? "bg-black/5" : ""}`}
            onClick={() => setTab("select")}
          >
            선택
          </button>
          <button
            type="button"
            className={`px-[12px] py-[8px] rounded-[8px] border ${tab === "compare" ? "bg-black/5" : ""} ${!canCompare ? "opacity-50" : ""}`}
            onClick={goCompare}
            disabled={!canCompare}
            title={!canCompare ? "2~3개를 선택해야 비교할 수 있습니다." : ""}
          >
            비교
          </button>
        </div>
        {tab === "select" ? (
          <>
            <CompareWorkspaceSelectList
              workspaces={workspaces}
              selectedIds={selectedIds}
              onChangeSelectedIds={setSelectedIds}
              maxSelect={3}
            />

            <div className="flex justify-end gap-[10px] pt-[6px]">
              <button type="button" className="h-[40px] px-[16px] rounded-[4px] border" onClick={onClose}>
                취소
              </button>
              <button
                type="button"
                className="h-[40px] px-[16px] rounded-[4px] bg-[var(--darkreader-background-243647,#2c4257)] text-[color:var(--darkreader-text-ffffff,#dcdad7)] disabled:opacity-50"
                disabled={!canCompare}
                onClick={goCompare}
              >
                선택한 워크스페이스 비교
              </button>
            </div>
          </>
        ) : (
          <CompareWorkspaceResult
            selectedIds={selectedIds}
            workspaces={workspaces}
            onBack={() => setTab("select")}
          />
        )}
      </div>
    </>
  );
}
