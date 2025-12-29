import imgImage1 from "figma:asset/9455e449a8552d0d5315c2395b0a6b3b3b6be99c.png";

function Button() {
  return (
    <div className="bg-[var(--darkreader-background-243647,#2c4257)] content-stretch flex h-[40px] items-center justify-center px-[16px] py-[11px] relative rounded-[4px] shrink-0" data-name="Button">
      <p className="font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--darkreader-text-ffffff,#dcdad7)] text-nowrap whitespace-pre">워크스페이스 정보</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex h-[37px] items-center justify-between overflow-clip px-0 py-[4px] relative shrink-0 w-full">
      <p className="font-['Noto_Sans_KR:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[24px] text-[color:var(--darkreader-text-243647,#2c4257)] text-nowrap whitespace-pre">{`워크스페이스명 : {workspace}`}</p>
      <Button />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <Frame2 />
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

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-center relative shrink-0 w-full">
      <p className="font-['Noto_Sans_KR:Medium',sans-serif] font-medium leading-[20px] min-w-full relative shrink-0 text-[20px] text-[color:var(--darkreader-text-243647,#2c4257)] w-[min-content]">피쳐 중요도</p>
      <div className="h-[544px] relative shrink-0 w-[1098px]" data-name="image 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage1} />
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

function Cell() {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] relative shrink-0 w-full" data-name="_Cell">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start px-[16px] py-[14px] relative w-full">
          <p className="font-['Roboto:Light',sans-serif] font-light leading-[20px] relative shrink-0 text-[16px] text-[color:var(--darkreader-text-454b54,#4e5558)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            MAE
          </p>
        </div>
      </div>
    </div>
  );
}

function Cell1() {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] relative shrink-0 w-full" data-name="_Cell">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start px-[16px] py-[14px] relative w-full">
          <p className="font-['Roboto:Light',sans-serif] font-light leading-[20px] relative shrink-0 text-[16px] text-[color:var(--darkreader-text-454b54,#4e5558)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            MSE
          </p>
        </div>
      </div>
    </div>
  );
}

function Cell2() {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] relative shrink-0 w-full" data-name="_Cell">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start px-[16px] py-[14px] relative w-full">
          <p className="font-['Roboto:Light',sans-serif] font-light leading-[20px] relative shrink-0 text-[16px] text-[color:var(--darkreader-text-454b54,#4e5558)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            RMSE
          </p>
        </div>
      </div>
    </div>
  );
}

function Cell3() {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] relative shrink-0 w-full" data-name="_Cell">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start px-[16px] py-[14px] relative w-full">
          <p className="font-['Roboto:Light',sans-serif] font-light leading-[20px] relative shrink-0 text-[16px] text-[color:var(--darkreader-text-454b54,#4e5558)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            MAPE
          </p>
        </div>
      </div>
    </div>
  );
}

function TableContents() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Table Contents">
      <Cell />
      <Cell1 />
      <Cell2 />
      <Cell3 />
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

function Cell4() {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] relative shrink-0 w-full" data-name="_Cell">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start px-[16px] py-[14px] relative w-full">
          <p className="font-['Roboto:Light',sans-serif] font-light leading-[20px] relative shrink-0 text-[16px] text-[color:var(--darkreader-text-454b54,#4e5558)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            Float
          </p>
        </div>
      </div>
    </div>
  );
}

function TableContents1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Table Contents">
      {[...Array(4).keys()].map((_, i) => (
        <Cell4 key={i} />
      ))}
    </div>
  );
}

function TableColumn1() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Table Column">
      <Header1 />
      <TableContents1 />
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

function Cell5() {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] relative shrink-0 w-full" data-name="_Cell">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start px-[16px] py-[14px] relative w-full">
          <p className="font-['Roboto:Light',sans-serif] font-light leading-[20px] relative shrink-0 text-[16px] text-[color:var(--darkreader-text-454b54,#4e5558)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            Float
          </p>
        </div>
      </div>
    </div>
  );
}

function TableContents2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Table Contents">
      {[...Array(4).keys()].map((_, i) => (
        <Cell5 key={i} />
      ))}
    </div>
  );
}

function TableColumn2() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Table Column">
      <Header2 />
      <TableContents2 />
    </div>
  );
}

function Frame() {
  return (
    <div className="relative rounded-[8px] shrink-0">
      <div className="content-stretch flex items-center overflow-clip relative rounded-[inherit]">
        <TableColumn />
        <TableColumn1 />
        <TableColumn2 />
      </div>
      <div aria-hidden="true" className="absolute border-[var(--darkreader-border-243647,#2c4257)] inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
      <p className="font-['Noto_Sans_KR:Medium',sans-serif] font-medium leading-[20px] min-w-full relative shrink-0 text-[20px] text-[color:var(--darkreader-text-243647,#2c4257)] w-[min-content]">모델 평가 지표</p>
      <Frame />
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] relative rounded-[24px] shrink-0 w-full">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[20px] items-center p-[20px] relative w-full">
          <Frame3 />
          <Frame4 />
          <Frame5 />
        </div>
      </div>
    </div>
  );
}

function AuthCreateAccount() {
  return (
    <div className="absolute bg-[var(--darkreader-background-f9f9f9,#d8d6d2)] content-stretch flex flex-col items-center left-0 overflow-clip px-[100px] py-[60px] top-[72px] w-[1440px]" data-name="Auth/Create-Account">
      <Frame1 />
    </div>
  );
}

function NavBar() {
  return (
    <div className="absolute contents left-0 top-0" data-name="Nav-bar">
      <div className="absolute bg-[var(--darkreader-background-ffffff,#dcdad7)] h-[72px] left-0 top-0 w-[1440px]" data-name="Base" />
      <div className="absolute bg-[var(--darkreader-background-dcdcdc,#c3c0bb)] h-px left-0 top-[71px] w-[1440px]" data-name="Line" />
    </div>
  );
}

export default function Session() {
  return (
    <div className="bg-[var(--darkreader-background-f9f9f9,#d8d6d2)] relative size-full" data-name="Session">
      <AuthCreateAccount />
      <NavBar />
      <p className="absolute font-['Noto_Sans_KR:Bold',sans-serif] font-bold leading-[20px] left-[1214px] text-[20px] text-[color:var(--darkreader-text-243647,#2c4257)] text-nowrap top-[26px] whitespace-pre">{`{User Name}의 연구실`}</p>
    </div>
  );
}