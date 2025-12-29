import svgPaths from "../imports/svg-aiatydxc6a";
import type { Workspace } from "../types/workspace";

interface WorkspaceInfoPopupProps {
  workspace: Workspace;
  onClose: () => void;
  isLoading?: boolean;
  error?: string | null;
}

function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Depth 4, Frame 1">
        <p className="font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[28px] not-italic relative shrink-0 text-[22px] text-[color:var(--darkreader-text-243647,#2c4257)] w-full">
          {label}
        </p>
      </div>
      <div className="h-[50px] relative rounded-[8px] shrink-0 w-full" data-name="Depth 5, Frame 0">
        <div aria-hidden="true" className="absolute border-[var(--darkreader-border-243647,#2c4257)] inset-0 pointer-events-none rounded-[8px]" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex h-[50px] items-center p-[16px] relative w-full">
            <p className="font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[28px] not-italic relative shrink-0 text-[14px] text-[color:var(--darkreader-text-243647,#2c4257)] text-nowrap whitespace-pre">
              {value}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DateRangeField({ label, startDate, endDate }: { label: string; startDate: string; endDate: string }) {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Depth 4, Frame 1">
        <p className="font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[28px] not-italic relative shrink-0 text-[22px] text-[color:var(--darkreader-text-243647,#2c4257)] w-full">
          {label}
        </p>
      </div>
      <div className="content-stretch flex gap-[16px] items-center justify-center max-w-[480px] relative shrink-0" data-name="Depth 4, Frame 2">
        <div className="bg-[var(--darkreader-background-ffffff00,rgba(220,218,215,0))] h-[50px] relative rounded-[8px] shrink-0 w-[230px]" data-name="Depth 6, Frame 1">
          <div className="bg-clip-padding border-[transparent] content-stretch flex h-[50px] items-center justify-center overflow-clip px-[16px] relative rounded-[inherit] w-[230px]">
            <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[14px] text-[color:var(--darkreader-text-243647,#2c4257)] text-nowrap whitespace-pre">
              {startDate}
            </p>
          </div>
          <div aria-hidden="true" className="absolute border-[var(--darkreader-border-243647,#2c4257)] inset-0 pointer-events-none rounded-[8px]" />
        </div>
        <div className="bg-[var(--darkreader-background-ffffff00,rgba(220,218,215,0))] h-[50px] relative rounded-[8px] shrink-0 w-[230px]" data-name="Depth 6, Frame 2">
          <div className="bg-clip-padding border-[transparent] content-stretch flex h-[50px] items-center justify-center overflow-clip px-[16px] relative rounded-[inherit] w-[230px]">
            <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[14px] text-[color:var(--darkreader-text-243647,#2c4257)] text-nowrap whitespace-pre">
              {endDate}
            </p>
          </div>
          <div aria-hidden="true" className="absolute border-[var(--darkreader-border-243647,#2c4257)] inset-0 pointer-events-none rounded-[8px]" />
        </div>
      </div>
    </div>
  );
}

function ChevronDown() {
  return (
    <div className="relative shrink-0 size-[30px]" data-name="Chevron down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="Chevron down">
          <path d={svgPaths.p3031b880} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
        </g>
      </svg>
    </div>
  );
}

function ReadOnlyDropdown({ label, value }: { label: string; value: string }) {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Depth 4, Frame 1">
        <p className="font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[28px] not-italic relative shrink-0 text-[22px] text-[color:var(--darkreader-text-243647,#2c4257)] w-full">
          {label}
        </p>
      </div>
      <div className="h-[50px] relative rounded-[8px] shrink-0 w-full" data-name="Depth 5, Frame 0">
        <div aria-hidden="true" className="absolute border-[var(--darkreader-border-243647,#2c4257)] inset-0 pointer-events-none rounded-[8px]" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex h-[50px] items-center justify-between p-[16px] relative w-full">
            <p className="font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[28px] not-italic relative shrink-0 text-[14px] text-[color:var(--darkreader-text-243647,#2c4257)] text-nowrap whitespace-pre">
              {value}
            </p>
            <ChevronDown />
          </div>
        </div>
      </div>
    </div>
  );
}

function SelectedItem({ text }: { text: string }) {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Depth 5, Frame 1">
      <div aria-hidden="true" className="absolute border-[var(--darkreader-border-757575,#6b7478)] inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[40px] items-center justify-between p-[15.5px] relative w-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[28px] not-italic relative shrink-0 text-[14px] text-[color:var(--darkreader-text-243647,#2c4257)] text-nowrap whitespace-pre">
            {text}
          </p>
          <div className="relative shrink-0 size-[20px]" data-name="X">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
              <g id="X">
                <path d="M15 5L5 15M5 5L15 15" id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function MultiSelectField({ label, placeholder, items }: { label: string; placeholder: string; items: string[] }) {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Depth 4, Frame 1">
        <p className="font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[28px] not-italic relative shrink-0 text-[22px] text-[color:var(--darkreader-text-243647,#2c4257)] w-full">
          {label}
        </p>
      </div>
      <div className="h-[50px] relative rounded-[8px] shrink-0 w-full" data-name="Depth 5, Frame 0">
        <div aria-hidden="true" className="absolute border-[var(--darkreader-border-243647,#2c4257)] inset-0 pointer-events-none rounded-[8px]" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex h-[50px] items-center justify-between p-[16px] relative w-full">
            <p className="font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[28px] not-italic relative shrink-0 text-[14px] text-[color:var(--darkreader-text-243647,#2c4257)] text-nowrap whitespace-pre">
              {placeholder}
            </p>
            <ChevronDown />
          </div>
        </div>
      </div>
      {items.length > 0 && (
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
          {items.map((item) => (
            <SelectedItem key={item} text={item} />
          ))}
        </div>
      )}
    </div>
  );
}

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-[var(--darkreader-background-243647,#2c4257)] content-stretch flex h-[40px] items-center justify-center px-[16px] py-[11px] relative rounded-[4px] shrink-0 w-[84px] cursor-pointer hover:opacity-90 transition-opacity"
    >
      <p className="font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--darkreader-text-ffffff,#dcdad7)] text-nowrap whitespace-pre">
        닫기
      </p>
    </button>
  );
}

export default function WorkspaceInfoPopup({ workspace, onClose, isLoading, error }: WorkspaceInfoPopupProps) {
  const modelId = (workspace as any).model_id ?? (workspace as any).modelId ?? (workspace as any).id ?? "";
  const createdAt = (workspace as any).createdAt ?? (workspace as any).created_at ?? "";
  const tuning = (workspace as any).tuning ?? "";

  return (
    <>
      <div className="absolute bg-[var(--darkreader-background-75757580,rgba(107,116,120,0.5))] inset-0 z-40" onClick={onClose} />
      <div className="absolute bg-[var(--darkreader-background-ffffff,#dcdad7)] content-stretch flex flex-col gap-[30px] items-center left-1/2 p-[50px] rounded-[24px] top-1/2 translate-x-[-50%] translate-y-[-50%] w-[800px] max-h-[90vh] overflow-y-auto z-50">
        {isLoading && (
          <div className="w-full text-[14px] text-[color:var(--darkreader-text-454b54,#4e5558)]">
            상세 정보를 불러오는 중...
          </div>
        )}
        {error && (
          <div className="w-full text-[14px] text-red-600">
            {error}
          </div>
        )}

        {modelId && <ReadOnlyField label="model_id" value={String(modelId)} />}
        <ReadOnlyField label="워크스페이스 이름" value={workspace.name ?? ""} />
        <DateRangeField label="데이터 기간 선택" startDate={workspace.startDate ?? ""} endDate={workspace.endDate ?? ""} />
        <ReadOnlyDropdown label="모델 선택" value={(workspace as any).model ?? (workspace as any).model_name ?? ""} />

        <MultiSelectField label="하이퍼파라미터" placeholder="파라미터" items={(workspace as any).hyperparameters || []} />
        <ReadOnlyDropdown label="종속 변수" value={(workspace as any).dependentVariable || (workspace as any).dependent_var || "선택되지 않음"} />
        <MultiSelectField label="제외할 독립 변수" placeholder="제외할 독립 변수" items={(workspace as any).excludedVariables || (workspace as any).excluded_var || []} />

        {tuning && <ReadOnlyField label="튜닝 방식" value={String(tuning)} />}
        {createdAt && <ReadOnlyField label="생성 시각" value={String(createdAt)} />}

        <CloseButton onClick={onClose} />
      </div>
    </>
  );
}
