import svgPaths from "./svg-aiatydxc6a";

function Button() {
  return (
    <div className="bg-[var(--darkreader-background-243647,#2c4257)] content-stretch flex h-[40px] items-center justify-center px-[16px] py-[11px] relative rounded-[16px] shrink-0" data-name="Button">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--darkreader-text-ffffff,#dcdad7)] text-nowrap whitespace-pre">+ Add WorkSpace</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex h-[37px] items-center justify-between overflow-clip px-0 py-[4px] relative shrink-0 w-[872px]">
      <p className="font-['Noto_Sans_KR:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[24px] text-[color:var(--darkreader-text-243647,#2c4257)] text-nowrap whitespace-pre">워크스페이스</p>
      <Button />
    </div>
  );
}

function Header() {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] content-stretch flex items-start overflow-clip p-[16px] relative shrink-0" data-name="_Header">
      <p className="font-['Roboto:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[16px] text-[color:var(--darkreader-text-243647,#2c4257)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        워크스페이스
      </p>
      <div className="absolute inset-0 shadow-[0px_-2px_0px_0px_inset_var(--darkreader-background-e3e5e8,#cac7c3)]" />
    </div>
  );
}

function Cell() {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] relative shrink-0 w-full" data-name="_Cell">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start px-[16px] py-[14px] relative w-full">
          <p className="basis-0 font-['Roboto:Light',sans-serif] font-light grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[16px] text-[color:var(--darkreader-text-454b54,#4e5558)]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Text
          </p>
        </div>
      </div>
    </div>
  );
}

function TableContents() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Table Contents">
      {[...Array(10).keys()].map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  );
}

function TableColumn() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Table Column">
      <Header />
      <TableContents />
    </div>
  );
}

function Header1() {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] content-stretch flex items-start overflow-clip p-[16px] relative shrink-0" data-name="_Header">
      <p className="font-['Roboto:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[16px] text-[color:var(--darkreader-text-243647,#2c4257)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        선택 모델
      </p>
      <div className="absolute inset-0 shadow-[0px_-2px_0px_0px_inset_var(--darkreader-background-e3e5e8,#cac7c3)]" />
    </div>
  );
}

function Cell1() {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] relative shrink-0 w-full" data-name="_Cell">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start px-[16px] py-[14px] relative w-full">
          <p className="basis-0 font-['Roboto:Light',sans-serif] font-light grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[16px] text-[color:var(--darkreader-text-454b54,#4e5558)]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Text
          </p>
        </div>
      </div>
    </div>
  );
}

function TableContents1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Table Contents">
      {[...Array(10).keys()].map((_, i) => (
        <Cell1 key={i} />
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
        데이터 시작 날짜
      </p>
      <div className="absolute inset-0 shadow-[0px_-2px_0px_0px_inset_var(--darkreader-background-e3e5e8,#cac7c3)]" />
    </div>
  );
}

function Cell2() {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] relative shrink-0 w-full" data-name="_Cell">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start px-[16px] py-[14px] relative w-full">
          <p className="basis-0 font-['Roboto:Light',sans-serif] font-light grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[16px] text-[color:var(--darkreader-text-454b54,#4e5558)]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Text
          </p>
        </div>
      </div>
    </div>
  );
}

function TableContents2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Table Contents">
      {[...Array(10).keys()].map((_, i) => (
        <Cell2 key={i} />
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

function Header3() {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] content-stretch flex items-start overflow-clip p-[16px] relative shrink-0" data-name="_Header">
      <p className="font-['Roboto:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[16px] text-[color:var(--darkreader-text-243647,#2c4257)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        데이터 마지막 날짜
      </p>
      <div className="absolute inset-0 shadow-[0px_-2px_0px_0px_inset_var(--darkreader-background-e3e5e8,#cac7c3)]" />
    </div>
  );
}

function Cell3() {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] relative shrink-0 w-full" data-name="_Cell">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start px-[16px] py-[14px] relative w-full">
          <p className="basis-0 font-['Roboto:Light',sans-serif] font-light grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[16px] text-[color:var(--darkreader-text-454b54,#4e5558)]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Text
          </p>
        </div>
      </div>
    </div>
  );
}

function TableContents3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Table Contents">
      {[...Array(10).keys()].map((_, i) => (
        <Cell3 key={i} />
      ))}
    </div>
  );
}

function TableColumn3() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Table Column">
      <Header3 />
      <TableContents3 />
    </div>
  );
}

function Header4() {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] content-stretch flex items-start overflow-clip p-[16px] relative shrink-0" data-name="_Header">
      <p className="font-['Roboto:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[16px] text-[color:var(--darkreader-text-243647,#2c4257)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        워크스페이스 생성 날짜
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
          <p className="basis-0 font-['Roboto:Light',sans-serif] font-light grow leading-[20px] min-h-px min-w-px relative shrink-0 text-[16px] text-[color:var(--darkreader-text-454b54,#4e5558)]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Text
          </p>
        </div>
      </div>
    </div>
  );
}

function TableContents4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Table Contents">
      {[...Array(10).keys()].map((_, i) => (
        <Cell4 key={i} />
      ))}
    </div>
  );
}

function TableColumn4() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Table Column">
      <Header4 />
      <TableContents4 />
    </div>
  );
}

function Header5() {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] relative shrink-0 w-full" data-name="_Header">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start p-[16px] relative w-full">
          <p className="font-['Roboto:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[16px] text-[color:var(--darkreader-text-243647,#2c4257)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
            세션 상태
          </p>
        </div>
      </div>
      <div className="absolute inset-0 shadow-[0px_-2px_0px_0px_inset_var(--darkreader-background-e3e5e8,#cac7c3)]" />
    </div>
  );
}

function StatusIndicator() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Status Indicator">
      <div className="relative shrink-0 size-[8px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
          <circle cx="4" cy="4" fill="var(--fill-0, #66CCA7)" id="Ellipse 1" r="4" />
        </svg>
      </div>
      <p className="font-['Roboto:Light','Noto_Sans_KR:Light',sans-serif] font-light leading-[20px] relative shrink-0 text-[16px] text-[color:var(--darkreader-text-454b54,#4e5558)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        학습 완료
      </p>
    </div>
  );
}

function Cell5() {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] relative shrink-0 w-full" data-name="_Cell">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start px-[16px] py-[14px] relative w-full">
          <StatusIndicator />
        </div>
      </div>
    </div>
  );
}

function StatusIndicator1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Status Indicator">
      <div className="relative shrink-0 size-[8px]">
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(255, 204, 0, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
            <circle cx="4" cy="4" fill="var(--fill-0, #FFCC00)" id="Ellipse 1" r="4" />
          </svg>
        </div>
      </div>
      <p className="font-['Roboto:Light','Noto_Sans_KR:Light',sans-serif] font-light leading-[20px] relative shrink-0 text-[16px] text-[color:var(--darkreader-text-454b54,#4e5558)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        학습 중
      </p>
    </div>
  );
}

function Cell6() {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] relative shrink-0 w-full" data-name="_Cell">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start px-[16px] py-[14px] relative w-full">
          <StatusIndicator1 />
        </div>
      </div>
    </div>
  );
}

function StatusIndicator2() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Status Indicator">
      <div className="relative shrink-0 size-[8px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
          <circle cx="4" cy="4" fill="var(--fill-0, #66CCA7)" id="Ellipse 1" r="4" />
        </svg>
      </div>
      <p className="font-['Roboto:Light',sans-serif] font-light leading-[20px] relative shrink-0 text-[16px] text-[color:var(--darkreader-text-454b54,#4e5558)] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Success
      </p>
    </div>
  );
}

function Cell7() {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] relative shrink-0 w-full" data-name="_Cell">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start px-[16px] py-[14px] relative w-full">
          <StatusIndicator2 />
        </div>
      </div>
    </div>
  );
}

function TableContents5() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0" data-name="Table Contents">
      <Cell5 />
      <Cell6 />
      {[...Array(8).keys()].map((_, i) => (
        <Cell7 key={i} />
      ))}
    </div>
  );
}

function TableColumn5() {
  return (
    <div className="content-stretch flex flex-col h-[532px] items-start overflow-clip relative shrink-0" data-name="Table Column">
      <Header5 />
      <TableContents5 />
    </div>
  );
}

function Header6() {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] h-[52px] relative shrink-0 w-full" data-name="_Header">
      <div className="size-full">
        <div className="h-[52px] w-full" />
      </div>
      <div className="absolute inset-0 shadow-[0px_-2px_0px_0px_inset_var(--darkreader-background-e3e5e8,#cac7c3)]" />
    </div>
  );
}

function Frame() {
  return (
    <div className="basis-0 grow h-full min-h-px min-w-px relative shrink-0">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_7_9218)" id="Frame 2">
          <path clipRule="evenodd" d="M16 2.4H0V1.6H16V2.4Z" fill="var(--fill-0, #DE5462)" fillRule="evenodd" id="Line 4 (Stroke)" />
          <path clipRule="evenodd" d={svgPaths.p1e6ccd00} fill="var(--fill-0, #DE5462)" fillRule="evenodd" id="Vector 1 (Stroke)" />
          <g id="Group 1">
            <path clipRule="evenodd" d="M7.6 13.6V4H8.4V13.6H7.6Z" fill="var(--fill-0, #DE5462)" fillRule="evenodd" id="Vector 2 (Stroke)" />
            <path clipRule="evenodd" d="M5.2 13.6V4H6V13.6H5.2Z" fill="var(--fill-0, #DE5462)" fillRule="evenodd" id="Vector 4 (Stroke)" />
            <path clipRule="evenodd" d="M10 13.6V4H10.8V13.6H10Z" fill="var(--fill-0, #DE5462)" fillRule="evenodd" id="Vector 3 (Stroke)" />
          </g>
          <path d="M6.8 0H9.2V0.8H6.8V0Z" fill="var(--fill-0, #DE5462)" id="Rectangle 1" />
        </g>
        <defs>
          <clipPath id="clip0_7_9218">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Trash() {
  return (
    <div className="content-stretch flex items-start overflow-clip p-[4px] relative shrink-0 size-[24px]" data-name="Trash">
      <Frame />
    </div>
  );
}

function Cell8() {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] relative shrink-0 w-full" data-name="_Cell">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center px-[16px] py-[12px] relative w-full">
          <Trash />
        </div>
      </div>
    </div>
  );
}

function TableContents6() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0 w-full" data-name="Table Contents">
      {[...Array(10).keys()].map((_, i) => (
        <Cell8 key={i} />
      ))}
    </div>
  );
}

function TableColumn6() {
  return (
    <div className="content-stretch flex flex-col h-[532px] items-start overflow-clip relative shrink-0 w-[64px]" data-name="Table Column">
      <Header6 />
      <TableContents6 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="h-[533px] relative rounded-[8px] shrink-0 w-[872px]">
      <div className="content-stretch flex h-[533px] items-start overflow-clip relative rounded-[inherit] w-[872px]">
        <TableColumn />
        <TableColumn1 />
        <TableColumn2 />
        <TableColumn3 />
        <TableColumn4 />
        <TableColumn5 />
        <TableColumn6 />
      </div>
      <div aria-hidden="true" className="absolute border-[var(--darkreader-border-243647,#2c4257)] inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function IconHeroiconsMiniHttpsHeroiconsCom() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon (heroicons-mini) https://heroicons.com/">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon (heroicons-mini) https://heroicons.com/">
          <path clipRule="evenodd" d={svgPaths.p26c500} fill="var(--fill-0, #626262)" fillRule="evenodd" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function PaginationControl() {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] content-stretch flex gap-[4px] h-[36px] items-center justify-center px-[12px] py-[8px] relative rounded-[4px] shrink-0" data-name="pagination control">
      <div aria-hidden="true" className="absolute border-[var(--darkreader-border-e9e9e9,#cdcac5)] inset-0 pointer-events-none rounded-[4px]" />
      <IconHeroiconsMiniHttpsHeroiconsCom />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--darkreader-text-313131,#3b4042)] text-nowrap whitespace-pre">Back</p>
    </div>
  );
}

function PaginationPage() {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] content-stretch flex flex-col items-center justify-center px-[12px] py-[8px] relative rounded-[4px] shrink-0" data-name="pagination page">
      <div aria-hidden="true" className="absolute border-[var(--darkreader-border-e9e9e9,#cdcac5)] inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--darkreader-text-313131,#3b4042)] text-nowrap whitespace-pre">1</p>
    </div>
  );
}

function PaginationPage1() {
  return (
    <div className="bg-[var(--darkreader-background-243647,#2c4257)] content-stretch flex flex-col items-center justify-center px-[12px] py-[8px] relative rounded-[4px] shrink-0" data-name="pagination page">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--darkreader-text-ffffff,#dcdad7)] text-nowrap whitespace-pre">2</p>
    </div>
  );
}

function PaginationPage2() {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] content-stretch flex flex-col items-center justify-center px-[12px] py-[8px] relative rounded-[4px] shrink-0" data-name="pagination page">
      <div aria-hidden="true" className="absolute border-[var(--darkreader-border-e9e9e9,#cdcac5)] inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--darkreader-text-313131,#3b4042)] text-nowrap whitespace-pre">3</p>
    </div>
  );
}

function PaginationPage3() {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] content-stretch flex flex-col items-center justify-center px-[12px] py-[8px] relative rounded-[4px] shrink-0" data-name="pagination page">
      <div aria-hidden="true" className="absolute border-[var(--darkreader-border-e9e9e9,#cdcac5)] inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--darkreader-text-313131,#3b4042)] text-nowrap whitespace-pre">4</p>
    </div>
  );
}

function PaginationPage4() {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] content-stretch flex flex-col items-center justify-center px-[12px] py-[8px] relative rounded-[4px] shrink-0" data-name="pagination page">
      <div aria-hidden="true" className="absolute border-[var(--darkreader-border-e9e9e9,#cdcac5)] inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--darkreader-text-313131,#3b4042)] text-nowrap whitespace-pre">5</p>
    </div>
  );
}

function IconHeroiconsMiniHttpsHeroiconsCom1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon (heroicons-mini) https://heroicons.com/">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon (heroicons-mini) https://heroicons.com/">
          <path clipRule="evenodd" d={svgPaths.p28ef368a} fill="var(--fill-0, #626262)" fillRule="evenodd" id="Vector (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function PaginationControl1() {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] content-stretch flex gap-[4px] h-[36px] items-center justify-center px-[12px] py-[8px] relative rounded-[4px] shrink-0" data-name="pagination control">
      <div aria-hidden="true" className="absolute border-[var(--darkreader-border-e9e9e9,#cdcac5)] inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--darkreader-text-313131,#3b4042)] text-nowrap whitespace-pre">Next</p>
      <IconHeroiconsMiniHttpsHeroiconsCom1 />
    </div>
  );
}

function WithNumbers() {
  return (
    <div className="content-stretch flex gap-[6px] items-start relative shrink-0" data-name="with numbers">
      <PaginationControl />
      <PaginationPage />
      <PaginationPage1 />
      <PaginationPage2 />
      <PaginationPage3 />
      <PaginationPage4 />
      <PaginationControl1 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute bg-[var(--darkreader-background-ffffff,#dcdad7)] content-stretch flex flex-col gap-[8px] items-center justify-center left-1/2 px-0 py-[40px] rounded-[24px] top-1/2 translate-x-[-50%] translate-y-[-50%] w-[1000px]">
      <Frame4 />
      <Frame3 />
      <WithNumbers />
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

function AuthCreateAccount() {
  return <div className="absolute bg-[var(--darkreader-background-75757580,rgba(107,116,120,0.5))] h-[1414px] left-0 top-0 w-[1440px]" data-name="Auth/Create-Account" />;
}

function Depth4Frame() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Depth 4, Frame 1">
      <p className="font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[28px] not-italic relative shrink-0 text-[22px] text-[color:var(--darkreader-text-243647,#2c4257)] w-full">워크스페이스 이름</p>
    </div>
  );
}

function Depth5Frame() {
  return (
    <div className="h-[50px] relative rounded-[8px] shrink-0 w-full" data-name="Depth 5, Frame 0">
      <div aria-hidden="true" className="absolute border-[var(--darkreader-border-243647,#2c4257)] inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[50px] items-center p-[16px] relative w-full">
          <p className="font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[28px] not-italic relative shrink-0 text-[14px] text-[color:var(--darkreader-text-757575,#6b7478)] text-nowrap whitespace-pre">워크스페이스 이름</p>
        </div>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <Depth4Frame />
      <Depth5Frame />
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
      <div className="bg-clip-padding border-[transparent] content-stretch flex h-[50px] overflow-clip relative rounded-[inherit] w-[230px]">
        <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[14px] text-[color:var(--darkreader-text-757575,#6b7478)] text-nowrap whitespace-pre">시작 날짜</p>
      </div>
      <div aria-hidden="true" className="absolute border-[var(--darkreader-border-243647,#2c4257)] inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Depth6Frame1() {
  return (
    <div className="bg-[var(--darkreader-background-ffffff00,rgba(220,218,215,0))] h-[50px] relative rounded-[8px] shrink-0 w-[230px]" data-name="Depth 6, Frame 2">
      <div className="bg-clip-padding border-[transparent] content-stretch flex h-[50px] overflow-clip relative rounded-[inherit] w-[230px]">
        <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[14px] text-[color:var(--darkreader-text-757575,#6b7478)] text-nowrap whitespace-pre">끝 날짜</p>
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
          <p className="font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[28px] not-italic relative shrink-0 text-[14px] text-[color:var(--darkreader-text-757575,#6b7478)] text-nowrap whitespace-pre">모델 선택</p>
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

function ChevronDown1() {
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

function Depth5Frame3() {
  return (
    <div className="h-[50px] relative rounded-[8px] shrink-0 w-full" data-name="Depth 5, Frame 0">
      <div aria-hidden="true" className="absolute border-[var(--darkreader-border-243647,#2c4257)] inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[50px] items-center justify-between p-[16px] relative w-full">
          <p className="font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[28px] not-italic relative shrink-0 text-[14px] text-[color:var(--darkreader-text-757575,#6b7478)] text-nowrap whitespace-pre">파라미터</p>
          <ChevronDown1 />
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

function X1() {
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

function Depth5Frame5() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Depth 5, Frame 5">
      <div aria-hidden="true" className="absolute border-[var(--darkreader-border-757575,#6b7478)] inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[40px] items-center justify-between p-[15.5px] relative w-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[28px] not-italic relative shrink-0 text-[14px] text-[color:var(--darkreader-text-243647,#2c4257)] text-nowrap whitespace-pre">n_estimators : 0.8</p>
          <X1 />
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

function ChevronDown2() {
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

function Depth5Frame4() {
  return (
    <div className="h-[50px] relative rounded-[8px] shrink-0 w-full" data-name="Depth 5, Frame 0">
      <div aria-hidden="true" className="absolute border-[var(--darkreader-border-243647,#2c4257)] inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[50px] items-center justify-between p-[16px] relative w-full">
          <p className="font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[28px] not-italic relative shrink-0 text-[14px] text-[color:var(--darkreader-text-757575,#6b7478)] text-nowrap whitespace-pre">종속 변수</p>
          <ChevronDown2 />
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

function ChevronDown3() {
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

function Depth5Frame6() {
  return (
    <div className="h-[50px] relative rounded-[8px] shrink-0 w-full" data-name="Depth 5, Frame 0">
      <div aria-hidden="true" className="absolute border-[var(--darkreader-border-243647,#2c4257)] inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[50px] items-center justify-between p-[16px] relative w-full">
          <p className="font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[28px] not-italic relative shrink-0 text-[14px] text-[color:var(--darkreader-text-757575,#6b7478)] text-nowrap whitespace-pre">제외할 독립 변수</p>
          <ChevronDown3 />
        </div>
      </div>
    </div>
  );
}

function X2() {
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

function Depth5Frame7() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Depth 5, Frame 1">
      <div aria-hidden="true" className="absolute border-[var(--darkreader-border-757575,#6b7478)] inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[40px] items-center justify-between p-[15.5px] relative w-full">
          <p className="font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[28px] not-italic relative shrink-0 text-[14px] text-[color:var(--darkreader-text-243647,#2c4257)] text-nowrap whitespace-pre">효율(순간)</p>
          <X2 />
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

function Frame12() {
  return <div className="h-[40px] shrink-0 w-[84px]" />;
}

function Frame1() {
  return (
    <div className="absolute bg-[var(--darkreader-background-ffffff,#dcdad7)] content-stretch flex flex-col gap-[30px] items-center left-1/2 p-[50px] rounded-[24px] top-1/2 translate-x-[-50%] translate-y-[-50%] w-[800px]">
      <Frame7 />
      <Frame5 />
      <Frame6 />
      <Frame8 />
      <Frame11 />
      <Frame10 />
      <Frame12 />
    </div>
  );
}

export default function HomePopupAddWorkspace() {
  return (
    <div className="bg-[var(--darkreader-background-f9f9f9,#d8d6d2)] relative size-full" data-name="Home/popup-Add-Workspace">
      <Frame2 />
      <NavBar />
      <p className="absolute font-['Noto_Sans_KR:Bold',sans-serif] font-bold leading-[20px] left-[1214px] text-[20px] text-[color:var(--darkreader-text-243647,#2c4257)] text-nowrap top-[26px] whitespace-pre">{`{User Name}의 연구실`}</p>
      <AuthCreateAccount />
      <Frame1 />
    </div>
  );
}