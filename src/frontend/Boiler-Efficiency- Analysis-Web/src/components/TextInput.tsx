interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export default function TextInput({ value, onChange, placeholder }: TextInputProps) {
  return (
    <div className="h-[50px] relative rounded-[8px] shrink-0 w-full" data-name="Depth 5, Frame 0">
      <div aria-hidden="true" className="absolute border-[var(--darkreader-border-243647,#2c4257)] inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[50px] items-center p-[16px] relative w-full">
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="bg-transparent font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[28px] not-italic text-[14px] text-[color:var(--darkreader-text-243647,#2c4257)] w-full outline-none placeholder:text-[color:var(--darkreader-text-757575,#6b7478)]"
          />
        </div>
      </div>
    </div>
  );
}
