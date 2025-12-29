import svgPaths from "../imports/svg-ljulk6ezbe";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;

  onNext: () => void;
  onPrev: () => void;
  nextDisabled: boolean;
  prevDisabled: boolean;
}

function IconHeroiconsMiniHttpsHeroiconsCom() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon (heroicons-mini) https://heroicons.com/">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon (heroicons-mini) https://heroicons.com/">
          <path
            clipRule="evenodd"
            d={svgPaths.p26c500}
            fill="var(--fill-0, #626262)"
            fillRule="evenodd"
            id="Vector (Stroke)"
          />
        </g>
      </svg>
    </div>
  );
}

function IconHeroiconsMiniHttpsHeroiconsCom1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon (heroicons-mini) https://heroicons.com/">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon (heroicons-mini) https://heroicons.com/">
          <path
            clipRule="evenodd"
            d={svgPaths.p28ef368a}
            fill="var(--fill-0, #626262)"
            fillRule="evenodd"
            id="Vector (Stroke)"
          />
        </g>
      </svg>
    </div>
  );
}

function PaginationControl({
  onClick,
  disabled,
  direction,
}: {
  onClick: () => void;
  disabled: boolean;
  direction: "back" | "next";
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bg-[var(--darkreader-background-ffffff,#dcdad7)] content-stretch flex gap-[4px] h-[36px] items-center justify-center px-[12px] py-[8px] relative rounded-[4px] shrink-0 ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:opacity-70 transition-opacity"
      }`}
      data-name="pagination control"
    >
      <div aria-hidden="true" className="absolute border-[var(--darkreader-border-e9e9e9,#cdcac5)] inset-0 pointer-events-none rounded-[4px]" />
      {direction === "back" && (
        <>
          <IconHeroiconsMiniHttpsHeroiconsCom />
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--darkreader-text-313131,#3b4042)] text-nowrap whitespace-pre">
            Back
          </p>
        </>
      )}
      {direction === "next" && (
        <>
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--darkreader-text-313131,#3b4042)] text-nowrap whitespace-pre">
            Next
          </p>
          <IconHeroiconsMiniHttpsHeroiconsCom1 />
        </>
      )}
    </button>
  );
}

function PaginationPage({
  page,
  isActive,
  onClick,
}: {
  page: number;
  isActive: boolean;
  onClick: () => void;
}) {
  if (isActive) {
    return (
      <div
        className="bg-[var(--darkreader-background-243647,#2c4257)] content-stretch flex flex-col items-center justify-center px-[12px] py-[8px] relative rounded-[4px] shrink-0"
        data-name="pagination page"
      >
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--darkreader-text-ffffff,#dcdad7)] text-nowrap whitespace-pre">
          {page}
        </p>
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      className="bg-[var(--darkreader-background-ffffff,#dcdad7)] content-stretch flex flex-col items-center justify-center px-[12px] py-[8px] relative rounded-[4px] shrink-0 cursor-pointer hover:opacity-70 transition-opacity"
      data-name="pagination page"
    >
      <div aria-hidden="true" className="absolute border-[var(--darkreader-border-e9e9e9,#cdcac5)] inset-0 pointer-events-none rounded-[4px]" />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[color:var(--darkreader-text-313131,#3b4042)] text-nowrap whitespace-pre">
        {page}
      </p>
    </button>
  );
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  onNext,
  onPrev,
  nextDisabled,
  prevDisabled,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, start + maxVisible - 1);

      if (end - start < maxVisible - 1) {
        start = Math.max(1, end - maxVisible + 1);
      }

      for (let i = start; i <= end; i++) pages.push(i);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="content-stretch flex gap-[6px] items-start relative shrink-0" data-name="with numbers">
      <PaginationControl onClick={onPrev} disabled={prevDisabled} direction="back" />
      {pageNumbers.map((page) => (
        <PaginationPage key={page} page={page} isActive={page === currentPage} onClick={() => onPageChange(page)} />
      ))}
      <PaginationControl onClick={onNext} disabled={nextDisabled} direction="next" />
    </div>
  );
}
