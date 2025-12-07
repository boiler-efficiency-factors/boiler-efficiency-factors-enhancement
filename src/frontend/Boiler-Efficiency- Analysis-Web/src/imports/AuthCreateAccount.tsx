import svgPaths from "./svg-90sdba9uax";

function ArrowLeft() {
  return (
    <div className="relative shrink-0 size-[30px]" data-name="Arrow left">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="Arrow left">
          <path d={svgPaths.p119e4880} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function ArrowLeft1() {
  return (
    <div className="relative shrink-0 size-[30px]" data-name="Arrow left">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="Arrow left"></g>
      </svg>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[440px]">
      <ArrowLeft />
      <p className="font-['Noto_Sans_KR:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[30px] text-[color:var(--darkreader-text-292929,#35393c)] text-center text-nowrap whitespace-pre">Create Account</p>
      <ArrowLeft1 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] content-stretch flex flex-col h-[69px] items-start justify-center px-[20px] py-0 relative rounded-[8px] shrink-0 w-[440px]">
      <div aria-hidden="true" className="absolute border-[var(--darkreader-border-334d66,#37546f)] inset-0 pointer-events-none rounded-[8px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[20px] text-[color:var(--darkreader-text-757575,#6b7478)] text-nowrap whitespace-pre">User Name</p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] content-stretch flex flex-col h-[69px] items-start justify-center px-[20px] py-0 relative rounded-[8px] shrink-0 w-[440px]">
      <div aria-hidden="true" className="absolute border-[var(--darkreader-border-334d66,#37546f)] inset-0 pointer-events-none rounded-[8px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[20px] text-[color:var(--darkreader-text-757575,#6b7478)] text-nowrap whitespace-pre">Password</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] content-stretch flex flex-col h-[69px] items-start justify-center px-[20px] py-0 relative rounded-[8px] shrink-0 w-[440px]">
      <div aria-hidden="true" className="absolute border-[var(--darkreader-border-334d66,#37546f)] inset-0 pointer-events-none rounded-[8px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[20px] text-[color:var(--darkreader-text-757575,#6b7478)] text-nowrap whitespace-pre">Verify Password</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0">
      <Frame3 />
      <Frame6 />
      <Frame4 />
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-[var(--darkreader-background-0366ff,#0060f5)] content-stretch flex flex-col h-[62px] items-center justify-center px-[123px] py-[17px] relative rounded-[8px] shrink-0 w-[312px]">
      <p className="font-['Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[20px] text-[color:var(--darkreader-text-ffffff,#dcdad7)] text-nowrap whitespace-pre">회원가입</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] content-stretch flex flex-col gap-[32px] h-[500px] items-center justify-center relative rounded-[24px] shrink-0 w-[560px]">
      <Frame5 />
      <Frame2 />
      <Frame />
    </div>
  );
}

export default function AuthCreateAccount() {
  return (
    <div className="bg-[var(--darkreader-background-f9f9f9,#d8d6d2)] relative size-full" data-name="Auth/create_account">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[10px] relative size-full">
          <Frame1 />
        </div>
      </div>
    </div>
  );
}