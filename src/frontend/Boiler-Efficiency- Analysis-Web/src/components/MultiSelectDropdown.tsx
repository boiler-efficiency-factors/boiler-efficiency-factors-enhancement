import { useState } from 'react';
import svgPaths from "../imports/svg-i3qy1v6uky";

interface MultiSelectDropdownProps {
  selectedItems: string[];
  onAdd: (item: string) => void;
  onRemove: (item: string) => void;
  placeholder: string;
  options: string[];
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

function X({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="relative shrink-0 size-[20px] cursor-pointer hover:opacity-70 transition-opacity" data-name="X">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="X">
          <path d="M15 5L5 15M5 5L15 15" id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </button>
  );
}

function SelectedItem({ text, onRemove }: { text: string; onRemove: () => void }) {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Depth 5, Frame 1">
      <div aria-hidden="true" className="absolute border-[var(--darkreader-border-757575,#6b7478)] inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[40px] items-center justify-between p-[15.5px] relative w-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[28px] not-italic relative shrink-0 text-[14px] text-[color:var(--darkreader-text-243647,#2c4257)] text-nowrap whitespace-pre">{text}</p>
          <X onClick={onRemove} />
        </div>
      </div>
    </div>
  );
}

export default function MultiSelectDropdown({ selectedItems, onAdd, onRemove, placeholder, options }: MultiSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  // 이미 선택된 항목은 드롭다운에서 제외
  const availableOptions = options.filter(option => !selectedItems.includes(option));

  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      {/* 드롭다운 */}
      <div className="relative h-[50px] rounded-[8px] shrink-0 w-full" data-name="Depth 5, Frame 0">
        <div aria-hidden="true" className="absolute border-[var(--darkreader-border-243647,#2c4257)] inset-0 pointer-events-none rounded-[8px]" />
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-row items-center size-full w-full text-left"
        >
          <div className="content-stretch flex h-[50px] items-center justify-between p-[16px] relative w-full">
            <p className="font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[28px] not-italic relative shrink-0 text-[14px] text-[color:var(--darkreader-text-757575,#6b7478)] text-nowrap whitespace-pre">
              {placeholder}
            </p>
            <ChevronDown />
          </div>
        </button>
        {isOpen && availableOptions.length > 0 && (
          <>
            <div
              className="fixed inset-0 z-[45]"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute top-[52px] left-0 w-full bg-[var(--darkreader-background-ffffff,#dcdad7)] rounded-[8px] border-[var(--darkreader-border-243647,#2c4257)] border z-[60] max-h-[200px] overflow-y-auto">
              {availableOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    onAdd(option);
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-[16px] py-[12px] hover:bg-[var(--darkreader-background-f5f5f5,#d3d1cd)] font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] text-[14px] text-[color:var(--darkreader-text-243647,#2c4257)]"
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* 선택된 항목 리스트 */}
      {selectedItems.length > 0 && (
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
          {selectedItems.map((item) => (
            <SelectedItem
              key={item}
              text={item}
              onRemove={() => onRemove(item)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
