import { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  required?: boolean;
  children: ReactNode;
}

export default function FormField({ label, required = false, children }: FormFieldProps) {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Depth 4, Frame 1">
        <p className="font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[28px] not-italic relative shrink-0 text-[22px] text-[color:var(--darkreader-text-243647,#2c4257)] w-full">
          {label}{required && '*'}
        </p>
      </div>
      {children}
    </div>
  );
}
