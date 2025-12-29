import { useState } from 'react';

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export default function DatePicker({ value, onChange, placeholder }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (number | null)[] = [];
    
    // 빈 칸 추가 (첫 주의 이전 달 날짜들)
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // 실제 날짜 추가
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const handleDateClick = (day: number) => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const selectedDate = new Date(year, month, day);
    const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    onChange(formattedDate);
    setIsOpen(false);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const days = getDaysInMonth(currentMonth);
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  // 선택된 날짜 파싱
  const selectedDate = value ? new Date(value) : null;
  const isDateSelected = (day: number) => {
    if (!selectedDate || !value) return false;
    return (
      selectedDate.getFullYear() === year &&
      selectedDate.getMonth() === month &&
      selectedDate.getDate() === day
    );
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[var(--darkreader-background-ffffff00,rgba(220,218,215,0))] h-[50px] relative rounded-[8px] shrink-0 w-[230px]"
      >
        <div className="bg-clip-padding border-[transparent] content-stretch flex h-[50px] items-center justify-center overflow-clip px-[16px] relative rounded-[inherit] w-[230px]">
          <p className={`font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[24px] not-italic text-[14px] w-full text-left ${value ? "text-[color:var(--darkreader-text-243647,#2c4257)]" : "text-[color:var(--darkreader-text-757575,#6b7478)]"}`}>
            {value || placeholder}
          </p>
        </div>
        <div aria-hidden="true" className="absolute border-[var(--darkreader-border-243647,#2c4257)] inset-0 pointer-events-none rounded-[8px]" />
      </button>

      {isOpen && (
        <>
          {/* 배경 오버레이 */}
          <div
            className="fixed inset-0 z-[60]"
            onClick={() => setIsOpen(false)}
          />
          
          {/* 달력 팝업 */}
          <div className="absolute top-[52px] left-0 bg-[var(--darkreader-background-ffffff,#dcdad7)] rounded-[12px] shadow-lg z-[70] p-[16px] w-[280px]">
            {/* 헤더 - 년/월 선택 */}
            <div className="flex items-center justify-between mb-[16px]">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="p-[8px] hover:bg-[var(--darkreader-background-f5f5f5,#d3d1cd)] rounded-[4px] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 12L6 8L10 4" stroke="var(--darkreader-text-243647,#2c4257)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              <p className="font-['Noto_Sans_KR:Bold',sans-serif] font-bold text-[16px] text-[color:var(--darkreader-text-243647,#2c4257)]">
                {year}년 {monthNames[month]}
              </p>
              
              <button
                type="button"
                onClick={handleNextMonth}
                className="p-[8px] hover:bg-[var(--darkreader-background-f5f5f5,#d3d1cd)] rounded-[4px] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4L10 8L6 12" stroke="var(--darkreader-text-243647,#2c4257)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* 요일 헤더 */}
            <div className="grid grid-cols-7 gap-[4px] mb-[8px]">
              {daysOfWeek.map((day, index) => (
                <div
                  key={day}
                  className={`text-center font-['Noto_Sans_KR:Medium',sans-serif] font-medium text-[12px] py-[4px] ${
                    index === 0 ? 'text-[color:var(--darkreader-text-ff0000,#ff4d4d)]' : 
                    index === 6 ? 'text-[color:var(--darkreader-text-0000ff,#6666ff)]' : 
                    'text-[color:var(--darkreader-text-757575,#6b7478)]'
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* 날짜 그리드 */}
            <div className="grid grid-cols-7 gap-[4px]">
              {days.map((day, index) => {
                if (day === null) {
                  return <div key={`empty-${index}`} className="aspect-square" />;
                }

                const isSelected = isDateSelected(day);
                const isToday = 
                  new Date().getFullYear() === year &&
                  new Date().getMonth() === month &&
                  new Date().getDate() === day;

                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => handleDateClick(day)}
                    className={`aspect-square flex items-center justify-center rounded-[6px] font-['Inter:Regular',sans-serif] text-[14px] transition-colors ${
                      isSelected
                        ? 'bg-[var(--darkreader-background-243647,#2c4257)] text-[color:var(--darkreader-text-ffffff,#dcdad7)] font-bold'
                        : isToday
                        ? 'bg-[var(--darkreader-background-f5f5f5,#d3d1cd)] text-[color:var(--darkreader-text-243647,#2c4257)] font-medium'
                        : 'hover:bg-[var(--darkreader-background-f5f5f5,#d3d1cd)] text-[color:var(--darkreader-text-243647,#2c4257)]'
                    } ${
                      index % 7 === 0 && !isSelected ? 'text-[color:var(--darkreader-text-ff0000,#ff4d4d)]' :
                      index % 7 === 6 && !isSelected ? 'text-[color:var(--darkreader-text-0000ff,#6666ff)]' : ''
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* 오늘 버튼 */}
            <button
              type="button"
              onClick={() => {
                const today = new Date();
                const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
                onChange(formattedDate);
                setIsOpen(false);
              }}
              className="w-full mt-[12px] py-[8px] bg-[var(--darkreader-background-f5f5f5,#d3d1cd)] hover:bg-[var(--darkreader-background-e9e9e9,#cdcac5)] rounded-[6px] font-['Noto_Sans_KR:Medium',sans-serif] text-[14px] text-[color:var(--darkreader-text-243647,#2c4257)] transition-colors"
            >
              오늘
            </button>
          </div>
        </>
      )}
    </div>
  );
}
