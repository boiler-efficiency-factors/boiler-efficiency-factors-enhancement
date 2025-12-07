import svgPaths from "../imports/svg-aiatydxc6a";

interface WorkspaceInfoPopupProps {
  workspaceName: string;
  onClose: () => void;
}

function Depth4Frame() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Depth 4, Frame 1">
      <p className="font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[28px] not-italic relative shrink-0 text-[22px] text-[color:var(--darkreader-text-243647,#2c4257)] w-full">워크스페이스 이름</p>
    </div>
  );
}

function Depth5Frame({ value }: { value: string }) {
  return (
    <div className="h-[50px] relative rounded-[8px] shrink-0 w-full" data-name="Depth 5, Frame 0">
      <div aria-hidden="true" className="absolute border-[var(--darkreader-border-243647,#2c4257)] inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[50px] items-center p-[16px] relative w-full">
          <p className="font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[28px] not-italic relative shrink-0 text-[14px] text-[color:var(--darkreader-text-243647,#2c4257)] text-nowrap whitespace-pre">{value}</p>
        </div>
      </div>
    </div>
  );
}

function Frame7({ workspaceName }: { workspaceName: string }) {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <Depth4Frame />
      <Depth5Frame value={workspaceName} />
    </div>
  );
}

function Depth4Frame2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Depth 4, Frame 1">
      <p className="font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[28px] not-italic relative shrink-0 text-[22px] text-[color:var(--darkreader-text-243647,#2c4257)] w-full">데이터 기간 선택</p>
    </div>
  );
}

function Depth6Frame() {
  return (
    <div className="bg-[var(--darkreader-background-ffffff00,rgba(220,218,215,0))] h-[50px] relative rounded-[8px] shrink-0 w-[230px]" data-name="Depth 6, Frame 1">
      <div className="bg-clip-padding border-[transparent] content-stretch flex h-[50px] items-center justify-center overflow-clip px-[16px] relative rounded-[inherit] w-[230px]">
        <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[14px] text-[color:var(--darkreader-text-243647,#2c4257)] text-nowrap whitespace-pre">시작 날짜</p>
      </div>
      <div aria-hidden="true" className="absolute border-[var(--darkreader-border-243647,#2c4257)] inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Depth6Frame1() {
  return (
    <div className="bg-[var(--darkreader-background-ffffff00,rgba(220,218,215,0))] h-[50px] relative rounded-[8px] shrink-0 w-[230px]" data-name="Depth 6, Frame 2">
      <div className="bg-clip-padding border-[transparent] content-stretch flex h-[50px] items-center justify-center overflow-clip px-[16px] relative rounded-[inherit] w-[230px]">
        <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[14px] text-[color:var(--darkreader-text-243647,#2c4257)] text-nowrap whitespace-pre">끝 날짜</p>
      </div>
      <div aria-hidden="true" className="absolute border-[var(--darkreader-border-243647,#2c4257)] inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Depth4Frame1() {
  return (
    <div className="content-stretch flex gap-[16px] items-center justify-center max-w-[480px] relative shrink-0" data-name="Depth 4, Frame 2">
      <Depth6Frame />
      <Depth6Frame1 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <Depth4Frame2 />
      <Depth4Frame1 />
    </div>
  );
}

function Depth4Frame3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Depth 4, Frame 1">
      <p className="font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[28px] not-italic relative shrink-0 text-[22px] text-[color:var(--darkreader-text-243647,#2c4257)] w-full">모델 선택</p>
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

function Depth5Frame2() {
  return (
    <div className="h-[50px] relative rounded-[8px] shrink-0 w-full" data-name="Depth 5, Frame 0">
      <div aria-hidden="true" className="absolute border-[var(--darkreader-border-243647,#2c4257)] inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[50px] items-center justify-between p-[16px] relative w-full">
          <p className="font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[28px] not-italic relative shrink-0 text-[14px] text-[color:var(--darkreader-text-243647,#2c4257)] text-nowrap whitespace-pre">모델 선택</p>
          <ChevronDown />
        </div>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <Depth4Frame3 />
      <Depth5Frame2 />
    </div>
  );
}

function Depth4Frame4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Depth 4, Frame 1">
      <p className="font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[28px] not-italic relative shrink-0 text-[22px] text-[color:var(--darkreader-text-243647,#2c4257)] w-full">하이퍼파라미터 선택</p>
    </div>
  );
}

function Depth5Frame3() {
  return (
    <div className="h-[50px] relative rounded-[8px] shrink-0 w-full" data-name="Depth 5, Frame 0">
      <div aria-hidden="true" className="absolute border-[var(--darkreader-border-243647,#2c4257)] inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[50px] items-center justify-between p-[16px] relative w-full">
          <p className="font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[28px] not-italic relative shrink-0 text-[14px] text-[color:var(--darkreader-text-243647,#2c4257)] text-nowrap whitespace-pre">파라미터</p>
          <ChevronDown />
        </div>
      </div>
    </div>
  );
}

function X() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="X">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="X">
          <path d="M15 5L5 15M5 5L15 15" id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Depth5Frame1() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Depth 5, Frame 1">
      <div aria-hidden="true" className="absolute border-[var(--darkreader-border-757575,#6b7478)] inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[40px] items-center justify-between p-[15.5px] relative w-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[28px] not-italic relative shrink-0 text-[14px] text-[color:var(--darkreader-text-243647,#2c4257)] text-nowrap whitespace-pre">learning_rate : 0.9</p>
          <X />
        </div>
      </div>
    </div>
  );
}

function Depth5Frame5() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Depth 5, Frame 5">
      <div aria-hidden="true" className="absolute border-[var(--darkreader-border-757575,#6b7478)] inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[40px] items-center justify-between p-[15.5px] relative w-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[28px] not-italic relative shrink-0 text-[14px] text-[color:var(--darkreader-text-243647,#2c4257)] text-nowrap whitespace-pre">n_estimators : 0.8</p>
          <X />
        </div>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Depth5Frame1 />
      <Depth5Frame5 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <Depth4Frame4 />
      <Depth5Frame3 />
      <Frame9 />
    </div>
  );
}

function Depth4Frame5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Depth 4, Frame 1">
      <p className="font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[28px] not-italic relative shrink-0 text-[22px] text-[color:var(--darkreader-text-243647,#2c4257)] w-full">종속 변수 선택</p>
    </div>
  );
}

function Depth5Frame4() {
  return (
    <div className="h-[50px] relative rounded-[8px] shrink-0 w-full" data-name="Depth 5, Frame 0">
      <div aria-hidden="true" className="absolute border-[var(--darkreader-border-243647,#2c4257)] inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[50px] items-center justify-between p-[16px] relative w-full">
          <p className="font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[28px] not-italic relative shrink-0 text-[14px] text-[color:var(--darkreader-text-243647,#2c4257)] text-nowrap whitespace-pre">종속 변수</p>
          <ChevronDown />
        </div>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <Depth4Frame5 />
      <Depth5Frame4 />
    </div>
  );
}

function Depth4Frame6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Depth 4, Frame 1">
      <p className="font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[28px] not-italic relative shrink-0 text-[22px] text-[color:var(--darkreader-text-243647,#2c4257)] w-full">제외할 독립 변수 선택</p>
    </div>
  );
}

function Depth5Frame6() {
  return (
    <div className="h-[50px] relative rounded-[8px] shrink-0 w-full" data-name="Depth 5, Frame 0">
      <div aria-hidden="true" className="absolute border-[var(--darkreader-border-243647,#2c4257)] inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[50px] items-center justify-between p-[16px] relative w-full">
          <p className="font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[28px] not-italic relative shrink-0 text-[14px] text-[color:var(--darkreader-text-243647,#2c4257)] text-nowrap whitespace-pre">제외할 독립 변수</p>
          <ChevronDown />
        </div>
      </div>
    </div>
  );
}

function Depth5Frame7() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Depth 5, Frame 1">
      <div aria-hidden="true" className="absolute border-[var(--darkreader-border-757575,#6b7478)] inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[40px] items-center justify-between p-[15.5px] relative w-full">
          <p className="font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[28px] not-italic relative shrink-0 text-[14px] text-[color:var(--darkreader-text-243647,#2c4257)] text-nowrap whitespace-pre">효율(순간)</p>
          <X />
        </div>
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Depth5Frame7 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <Depth4Frame6 />
      <Depth5Frame6 />
      <Frame13 />
    </div>
  );
}

function Frame12({ onClose }: { onClose: () => void }) {
  return (
    <button
      onClick={onClose}
      className="bg-[var(--darkreader-background-243647,#2c4257)] content-stretch flex h-[40px] items-center justify-center px-[16px] py-[11px] relative rounded-[4px] shrink-0 w-[84px] cursor-pointer hover:opacity-90 transition-opacity"
    >
      <p className="font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--darkreader-text-ffffff,#dcdad7)] text-nowrap whitespace-pre">닫기</p>
    </button>
  );
}

function Frame1({ workspaceName, onClose }: { workspaceName: string; onClose: () => void }) {
  return (
    <div className="absolute bg-[var(--darkreader-background-ffffff,#dcdad7)] content-stretch flex flex-col gap-[30px] items-center left-1/2 p-[50px] rounded-[24px] top-1/2 translate-x-[-50%] translate-y-[-50%] w-[800px] max-h-[90vh] overflow-y-auto z-50">
      <Frame7 workspaceName={workspaceName} />
      <Frame5 />
      <Frame6 />
      <Frame8 />
      <Frame11 />
      <Frame10 />
      <Frame12 onClose={onClose} />
    </div>
  );
}

export default function WorkspaceInfoPopup({ workspaceName, onClose }: WorkspaceInfoPopupProps) {
  return (
    <>
      <div className="absolute bg-[var(--darkreader-background-75757580,rgba(107,116,120,0.5))] inset-0 z-40" onClick={onClose} />
      <Frame1 workspaceName={workspaceName} onClose={onClose} />
    </>
  );
}
