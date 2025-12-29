import { Workspace } from "../types/workspace";

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

function formatKSTDateTime(value?: string) {
  if (!value || value === "-") return "-";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value; // 파싱 실패 시 원문 출력
  return d.toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

type UiStatus = "completed" | "training" | "pending";

function normalizeStatus(raw: unknown): UiStatus {
  const s = String(raw ?? "").toLowerCase();
  if (["completed", "complete", "done", "success", "succeeded", "finished"].includes(s)) return "completed";
  if (["training", "running", "in_progress", "in-progress", "progress"].includes(s)) return "training";
  if (["pending", "queued", "wait", "waiting", ""].includes(s)) return "pending";
  return "pending";
}

function StatusIndicator({ status }: { status?: unknown }) {
  const statusConfig = {
    completed: { color: "#66CCA7", text: "학습 완료" },
    training: { color: "#FFCC00", text: "학습 중" },
    pending: { color: "#626262", text: "대기 중" },
  } as const;

  const normalized = normalizeStatus(status);
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
  const rowKey = (w: any, idx: number) =>
    String(w?.id ?? w?.model_id ?? w?.workspace_id ?? w?.session_id ?? `${w?.name ?? "row"}-${idx}`);
  const emptyRowCount = Math.max(0, ITEMS_PER_PAGE - workspaces.length);

  return (
    <div className="h-[533px] relative rounded-[8px] shrink-0 w-[872px]">
      <div className="content-stretch flex h-[533px] items-start overflow-clip relative rounded-[inherit] w-[872px]">
        <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0">
          <Header text="워크스페이스" />
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
            {workspaces.map((workspace, idx) => {
              const k = rowKey(workspace, idx);
              return (
                <button
                  key={`ws-${k}`}
                  onClick={() => onWorkspaceClick(k)}
                  className="bg-[var(--darkreader-background-ffffff,#dcdad7)] relative shrink-0 w-full cursor-pointer hover:bg-[var(--darkreader-background-f5f5f5,#d3d1cd)] transition-colors text-left"
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
              <TableCell key={`start-${rowKey(workspace, idx)}`} text={workspace.startDate} />
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
              <TableCell key={`end-${rowKey(workspace, idx)}`} text={workspace.endDate} />
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
              <TableCell key={`created-${rowKey(workspace, idx)}`} text={workspace.createdAt ?? "-"} />
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
              <StatusCell
                key={`status-${rowKey(workspace, idx)}`}
                status={workspace.status}
              />
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
