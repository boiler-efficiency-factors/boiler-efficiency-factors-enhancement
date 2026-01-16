// src/components/WorkspaceTable.tsx
/*
import { Workspace } from "../types/workspace";
import { getWorkspaceId, normalizeStatus } from "../utils/workspaceStatus";

interface WorkspaceTableProps {
  workspaces: Workspace[];
  onWorkspaceClick: (workspaceId: string) => void;
}

function Header({ text }: { text: string }) {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] content-stretch flex items-start overflow-clip p-[16px] relative shrink-0">
      <p
        className="font-['Roboto:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[16px] text-[color:var(--darkreader-text-243647,#2c4257)] text-nowrap whitespace-pre"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        {text}
      </p>
      <div className="absolute inset-0 shadow-[0px_-2px_0px_0px_inset_var(--darkreader-background-e3e5e8,#cac7c3)]" />
    </div>
  );
}

type UiStatus = "completed" | "training" | "pending";

function StatusIndicator({ status }: { status?: unknown }) {
  const statusConfig = {
    completed: { color: "#66CCA7", text: "학습 완료" },
    training: { color: "#FFCC00", text: "학습 중" },
    pending: { color: "#626262", text: "대기 중" },
  } as const;

  const normalized = normalizeStatus(status) as UiStatus;
  const config = statusConfig[normalized];

  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0">
      <div className="relative shrink-0 size-[8px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
          <circle cx="4" cy="4" fill={config.color} r="4" />
        </svg>
      </div>
      <p
        className="font-['Roboto:Light','Noto_Sans_KR:Light',sans-serif] font-light leading-[20px] relative shrink-0 text-[16px] text-[color:var(--darkreader-text-454b54,#4e5558)] text-nowrap whitespace-pre"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        {config.text}
      </p>
    </div>
  );
}

function TableCell({ text }: { text: string }) {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] relative shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start px-[16px] py-[14px] relative w-full">
          <p
            className="basis-0 font-['Roboto:Light',sans-serif] font-light grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[16px] text-[color:var(--darkreader-text-454b54,#4e5558)]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}

function EmptyCell() {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] relative shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start px-[16px] py-[14px] relative w-full">
          <p
            className="basis-0 font-['Roboto:Light',sans-serif] font-light grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[16px] text-[color:var(--darkreader-text-454b54,#4e5558)]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            -
          </p>
        </div>
      </div>
    </div>
  );
}

function StatusCell({ status }: { status?: unknown }) {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] relative shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start px-[16px] py-[14px] relative w-full">
          <StatusIndicator status={status} />
        </div>
      </div>
    </div>
  );
}

export default function WorkspaceTable({ workspaces, onWorkspaceClick }: WorkspaceTableProps) {
  const ITEMS_PER_PAGE = 10;

  const reactKey = (w: any, idx: number) => {
    const id = getWorkspaceId(w);
    if (id) return id;

    const stable = String(
      (w?.createdAt ?? w?.created_at ?? "") ||
      `${w?.name ?? "row"}`
    ).trim();

    return stable ? `fallback-${stable}` : `row-${idx}`;
  };            

  const emptyRowCount = Math.max(0, ITEMS_PER_PAGE - workspaces.length);

  return (
    <div className="h-[533px] relative rounded-[8px] shrink-0 w-[872px]">
      <div className="content-stretch flex h-[533px] items-start overflow-clip relative rounded-[inherit] w-[872px]">
        <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0">
          <Header text="워크스페이스" />
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
            {workspaces.map((workspace, idx) => {
              const rid = getWorkspaceId(workspace);
              const k = reactKey(workspace, idx);

              const disabled = !rid;
              return (
                <button
                  key={`ws-${k}`}
                  onClick={() => {
                    if (!rid) {
                      alert("워크스페이스 id가 없어 상세 화면으로 이동할 수 없습니다. (백엔드 응답 확인 필요)");
                      return;
                    }
                    onWorkspaceClick(rid);
                  }}
                  disabled={disabled}
                  className={`bg-[var(--darkreader-background-ffffff,#dcdad7)] relative shrink-0 w-full text-left transition-colors ${
                    disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-[var(--darkreader-background-f5f5f5,#d3d1cd)]"
                  }`}
                >
                  <div className="overflow-clip rounded-[inherit] size-full">
                    <div className="content-stretch flex items-start px-[16px] py-[14px] relative w-full">
                      <p
                        className="basis-0 font-['Roboto:Light',sans-serif] font-light grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[16px] text-[color:var(--darkreader-text-454b54,#4e5558)]"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      >
                        {workspace.name}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}

            {[...Array(emptyRowCount)].map((_, i) => (
              <EmptyCell key={`empty-name-${i}`} />
            ))}
          </div>
        </div>

        <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0">
          <Header text="데이터 시작 날짜" />
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
            {workspaces.map((workspace, idx) => (
              <TableCell key={`start-${reactKey(workspace, idx)}`} text={workspace.startDate} />
            ))}
            {[...Array(emptyRowCount)].map((_, i) => (
              <EmptyCell key={`empty-start-${i}`} />
            ))}
          </div>
        </div>

        <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0">
          <Header text="데이터 마지막 날짜" />
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
            {workspaces.map((workspace, idx) => (
              <TableCell key={`end-${reactKey(workspace, idx)}`} text={workspace.endDate} />
            ))}
            {[...Array(emptyRowCount)].map((_, i) => (
              <EmptyCell key={`empty-end-${i}`} />
            ))}
          </div>
        </div>

        <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0">
          <Header text="워크스페이스 생성 날짜" />
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
            {workspaces.map((workspace, idx) => (
              <TableCell key={`created-${reactKey(workspace, idx)}`} text={workspace.createdAt ?? "-"} />
            ))}
            {[...Array(emptyRowCount)].map((_, i) => (
              <EmptyCell key={`empty-created-${i}`} />
            ))}
          </div>
        </div>

        <div className="content-stretch flex flex-col h-[532px] items-start overflow-clip relative shrink-0">
          <Header text="세션 상태" />
          <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0">
            {workspaces.map((workspace, idx) => (
              <StatusCell key={`status-${reactKey(workspace, idx)}`} status={workspace.status} />
            ))}
            {[...Array(emptyRowCount)].map((_, i) => (
              <EmptyCell key={`empty-status-${i}`} />
            ))}
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="absolute border-[var(--darkreader-border-243647,#2c4257)] inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}
  */

// src/components/WorkspaceTable.tsx
import { useMemo } from "react";
import { Workspace } from "../types/workspace";
import { getWorkspaceId, normalizeStatus } from "../utils/workspaceStatus";

interface WorkspaceTableProps {
  workspaces: Workspace[];
  onWorkspaceClick: (workspaceId: string) => void;

  // 추가: 선택/삭제용
  selectedWorkspaceIds: string[];
  onToggleWorkspaceSelect: (workspaceId: string) => void;
}

function Header({ text }: { text: string }) {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] content-stretch flex items-start overflow-clip p-[16px] relative shrink-0">
      <p
        className="font-['Roboto:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[16px] text-[color:var(--darkreader-text-243647,#2c4257)] text-nowrap whitespace-pre"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        {text}
      </p>
      <div className="absolute inset-0 shadow-[0px_-2px_0px_0px_inset_var(--darkreader-background-e3e5e8,#cac7c3)]" />
    </div>
  );
}

type UiStatus = "completed" | "training" | "pending";

function StatusIndicator({ status }: { status?: unknown }) {
  const statusConfig = {
    completed: { color: "#66CCA7", text: "학습 완료" },
    training: { color: "#FFCC00", text: "학습 중" },
    pending: { color: "#626262", text: "대기 중" },
  } as const;

  const normalized = normalizeStatus(status) as UiStatus;
  const config = statusConfig[normalized];

  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0">
      <div className="relative shrink-0 size-[8px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
          <circle cx="4" cy="4" fill={config.color} r="4" />
        </svg>
      </div>
      <p
        className="font-['Roboto:Light','Noto_Sans_KR:Light',sans-serif] font-light leading-[20px] relative shrink-0 text-[16px] text-[color:var(--darkreader-text-454b54,#4e5558)] text-nowrap whitespace-pre"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        {config.text}
      </p>
    </div>
  );
}

function TableCell({ text }: { text: string }) {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] relative shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start px-[16px] py-[14px] relative w-full">
          <p
            className="basis-0 font-['Roboto:Light',sans-serif] font-light grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[16px] text-[color:var(--darkreader-text-454b54,#4e5558)]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}

function EmptyCell() {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] relative shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start px-[16px] py-[14px] relative w-full">
          <p
            className="basis-0 font-['Roboto:Light',sans-serif] font-light grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[16px] text-[color:var(--darkreader-text-454b54,#4e5558)]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            -
          </p>
        </div>
      </div>
    </div>
  );
}

function StatusCell({ status }: { status?: unknown }) {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] relative shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start px-[16px] py-[14px] relative w-full">
          <StatusIndicator status={status} />
        </div>
      </div>
    </div>
  );
}

export default function WorkspaceTable({
  workspaces,
  onWorkspaceClick,
  selectedWorkspaceIds,
  onToggleWorkspaceSelect,
}: WorkspaceTableProps) {
  const ITEMS_PER_PAGE = 10;

  const selectedSet = useMemo(() => new Set(selectedWorkspaceIds), [selectedWorkspaceIds]);

  const reactKey = (w: any, idx: number) => {
    const id = getWorkspaceId(w);
    if (id) return id;

    const stable = String((w?.createdAt ?? w?.created_at ?? "") || `${w?.name ?? "row"}`).trim();
    return stable ? `fallback-${stable}` : `row-${idx}`;
  };

  const emptyRowCount = Math.max(0, ITEMS_PER_PAGE - workspaces.length);

  return (
    <div className="h-[533px] relative rounded-[8px] shrink-0 w-[872px]">
      <div className="content-stretch flex h-[533px] items-start overflow-clip relative rounded-[inherit] w-[872px]">
        <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0">
          <Header text="워크스페이스" />
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
            {workspaces.map((workspace, idx) => {
              const rid = getWorkspaceId(workspace);
              const k = reactKey(workspace, idx);

              const disabled = !rid;
              const checked = !!rid && selectedSet.has(rid);

              return (
                <button
                  key={`ws-${k}`}
                  onClick={() => {
                    if (!rid) {
                      alert("워크스페이스 id가 없어 상세 화면으로 이동할 수 없습니다. (백엔드 응답 확인 필요)");
                      return;
                    }
                    onWorkspaceClick(rid);
                  }}
                  disabled={disabled}
                  className={`bg-[var(--darkreader-background-ffffff,#dcdad7)] relative shrink-0 w-full text-left transition-colors ${
                    disabled
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer hover:bg-[var(--darkreader-background-f5f5f5,#d3d1cd)]"
                  }`}
                >
                  <div className="overflow-clip rounded-[inherit] size-full">
                    <div className="content-stretch flex items-center gap-[10px] px-[16px] py-[14px] relative w-full">
                      <input
                        type="checkbox"
                        checked={checked}
                        disabled={disabled}
                        aria-label={`${workspace.name} 삭제 선택`}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => {
                          e.stopPropagation();
                          if (!rid) return;
                          onToggleWorkspaceSelect(rid);
                        }}
                        className="shrink-0"
                      />

                      <p
                        className="basis-0 font-['Roboto:Light',sans-serif] font-light grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[16px] text-[color:var(--darkreader-text-454b54,#4e5558)]"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      >
                        {workspace.name}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}

            {[...Array(emptyRowCount)].map((_, i) => (
              <EmptyCell key={`empty-name-${i}`} />
            ))}
          </div>
        </div>

        <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0">
          <Header text="데이터 시작 날짜" />
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
            {workspaces.map((workspace, idx) => (
              <TableCell key={`start-${reactKey(workspace, idx)}`} text={workspace.startDate} />
            ))}
            {[...Array(emptyRowCount)].map((_, i) => (
              <EmptyCell key={`empty-start-${i}`} />
            ))}
          </div>
        </div>

        <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0">
          <Header text="데이터 마지막 날짜" />
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
            {workspaces.map((workspace, idx) => (
              <TableCell key={`end-${reactKey(workspace, idx)}`} text={workspace.endDate} />
            ))}
            {[...Array(emptyRowCount)].map((_, i) => (
              <EmptyCell key={`empty-end-${i}`} />
            ))}
          </div>
        </div>

        <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0">
          <Header text="워크스페이스 생성 날짜" />
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
            {workspaces.map((workspace, idx) => (
              <TableCell key={`created-${reactKey(workspace, idx)}`} text={workspace.createdAt ?? "-"} />
            ))}
            {[...Array(emptyRowCount)].map((_, i) => (
              <EmptyCell key={`empty-created-${i}`} />
            ))}
          </div>
        </div>

        <div className="content-stretch flex flex-col h-[532px] items-start overflow-clip relative shrink-0">
          <Header text="세션 상태" />
          <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0">
            {workspaces.map((workspace, idx) => (
              <StatusCell key={`status-${reactKey(workspace, idx)}`} status={workspace.status} />
            ))}
            {[...Array(emptyRowCount)].map((_, i) => (
              <EmptyCell key={`empty-status-${i}`} />
            ))}
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="absolute border-[var(--darkreader-border-243647,#2c4257)] inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

