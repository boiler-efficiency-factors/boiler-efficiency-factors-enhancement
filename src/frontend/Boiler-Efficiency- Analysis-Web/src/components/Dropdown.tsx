import { useMemo, useState } from "react";
import svgPaths from "../imports/svg-i3qy1v6uky";

type Option = string | { label: string; value: string };

interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: Option[];
}

function ChevronDown() {
  return (
    <div className="relative shrink-0 size-[30px]" data-name="Chevron down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="Chevron down">
          <path
            d={svgPaths.p3031b880}
            id="Icon"
            stroke="var(--stroke-0, #1E1E1E)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
          />
        </g>
      </svg>
    </div>
  );
}

const getValue = (o: Option) => (typeof o === "string" ? o : o.value);
const getLabel = (o: Option) => (typeof o === "string" ? o : o.label);

export default function Dropdown({ value, onChange, placeholder, options }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel = useMemo(() => {
    if (!value) return "";
    const found = options.find((o) => getValue(o) === value);
    return found ? getLabel(found) : value;
  }, [value, options]);

  return (
    <div className="relative h-[50px] rounded-[8px] shrink-0 w-full" data-name="Depth 5, Frame 0">
      <div aria-hidden="true" className="absolute border-[var(--darkreader-border-243647,#2c4257)] inset-0 pointer-events-none rounded-[8px]" />
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-row items-center size-full w-full text-left"
      >
        <div className="content-stretch flex h-[50px] items-center justify-between p-[16px] relative w-full">
          <p
            className={`font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[28px] not-italic relative shrink-0 text-[14px] text-nowrap whitespace-pre ${
              value ? "text-[color:var(--darkreader-text-243647,#2c4257)]" : "text-[color:var(--darkreader-text-757575,#6b7478)]"
            }`}
          >
            {selectedLabel || placeholder}
          </p>
          <ChevronDown />
        </div>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-[45]" onClick={() => setIsOpen(false)} />
          <div className="absolute top-[52px] left-0 w-full bg-[var(--darkreader-background-ffffff,#dcdad7)] rounded-[8px] border-[var(--darkreader-border-243647,#2c4257)] border z-[60] max-h-[200px] overflow-y-auto">
            {options.map((option) => {
              const v = getValue(option);
              const l = getLabel(option);
              return (
                <button
                  key={v}             
                  type="button"
                  onClick={() => {
                    onChange(v);      
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-[16px] py-[12px] hover:bg-[var(--darkreader-background-f5f5f5,#d3d1cd)] font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] text-[14px] text-[color:var(--darkreader-text-243647,#2c4257)]"
                >
                  {l}                  
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
