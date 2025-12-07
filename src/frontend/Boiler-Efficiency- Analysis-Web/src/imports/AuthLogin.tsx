function Frame4() {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] content-stretch flex flex-col h-[69px] items-start justify-center px-[20px] py-0 relative rounded-[8px] shrink-0 w-[440px]">
      <div aria-hidden="true" className="absolute border-[var(--darkreader-border-334d66,#37546f)] inset-0 pointer-events-none rounded-[8px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[20px] text-[color:var(--darkreader-text-757575,#6b7478)] text-nowrap whitespace-pre">User Name</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] content-stretch flex flex-col h-[69px] items-start justify-center px-[20px] py-0 relative rounded-[8px] shrink-0 w-[440px]">
      <div aria-hidden="true" className="absolute border-[var(--darkreader-border-334d66,#37546f)] inset-0 pointer-events-none rounded-[8px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[20px] text-[color:var(--darkreader-text-757575,#6b7478)] text-nowrap whitespace-pre">Password</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0">
      <Frame4 />
      <Frame5 />
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-[var(--darkreader-background-0366ff,#0060f5)] content-stretch flex flex-col h-[62px] items-center justify-center px-[123px] py-[17px] relative rounded-[8px] shrink-0 w-[312px]">
      <p className="font-['Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[20px] text-[color:var(--darkreader-text-ffffff,#dcdad7)] text-nowrap whitespace-pre">로그인</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[16px] text-[color:var(--darkreader-text-4f4f4f,#50575a)] text-nowrap whitespace-pre">Create Account</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] content-stretch flex flex-col gap-[32px] h-[500px] items-center justify-center relative rounded-[24px] shrink-0 w-[560px]">
      <div className="font-['Inter:Bold',sans-serif] font-bold leading-[0] not-italic relative shrink-0 text-[0px] text-[color:var(--darkreader-text-292929,#35393c)] text-center text-nowrap whitespace-pre">
        <p className="font-['Noto_Sans_KR:Bold',sans-serif] leading-[normal] mb-0 text-[30px]">대림로얄이엔피</p>
        <p className="font-['Noto_Sans_KR:Regular',sans-serif] font-normal leading-[30px] text-[20px]">보일러 영향 인자 AI 모델 연구</p>
      </div>
      <Frame2 />
      <Frame />
      <Frame3 />
    </div>
  );
}

export default function AuthLogin() {
  return (
    <div className="bg-[var(--darkreader-background-f9f9f9,#d8d6d2)] relative size-full" data-name="Auth/login">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[10px] relative size-full">
          <Frame1 />
        </div>
      </div>
    </div>
  );
}