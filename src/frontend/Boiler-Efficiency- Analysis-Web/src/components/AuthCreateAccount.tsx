import { useState } from 'react';
import svgPaths from "../imports/svg-90sdba9uax";

interface AuthCreateAccountProps {
  onBack: () => void;
  onCreateAccount: (username: string, password: string) => void;
}

function ArrowLeft({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="relative shrink-0 size-[30px] cursor-pointer hover:opacity-70 transition-opacity" data-name="Arrow left">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="Arrow left">
          <path d={svgPaths.p119e4880} id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </button>
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

function Frame5({ onBack }: { onBack: () => void }) {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[440px]">
      <ArrowLeft onClick={onBack} />
      <p className="font-['Noto_Sans_KR:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[30px] text-[color:var(--darkreader-text-292929,#35393c)] text-center text-nowrap whitespace-pre">Create Account</p>
      <ArrowLeft1 />
    </div>
  );
}

function Frame3({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] content-stretch flex flex-col h-[69px] items-start justify-center px-[20px] py-0 relative rounded-[8px] shrink-0 w-[440px]">
      <div aria-hidden="true" className="absolute border-[var(--darkreader-border-334d66,#37546f)] inset-0 pointer-events-none rounded-[8px]" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="User Name"
        className="bg-transparent font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[20px] text-[color:var(--darkreader-text-757575,#6b7478)] w-full outline-none"
      />
    </div>
  );
}

function Frame6({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] content-stretch flex flex-col h-[69px] items-start justify-center px-[20px] py-0 relative rounded-[8px] shrink-0 w-[440px]">
      <div aria-hidden="true" className="absolute border-[var(--darkreader-border-334d66,#37546f)] inset-0 pointer-events-none rounded-[8px]" />
      <input
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Password"
        className="bg-transparent font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[20px] text-[color:var(--darkreader-text-757575,#6b7478)] w-full outline-none"
      />
    </div>
  );
}

function Frame4({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] content-stretch flex flex-col h-[69px] items-start justify-center px-[20px] py-0 relative rounded-[8px] shrink-0 w-[440px]">
      <div aria-hidden="true" className="absolute border-[var(--darkreader-border-334d66,#37546f)] inset-0 pointer-events-none rounded-[8px]" />
      <input
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Verify Password"
        className="bg-transparent font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[20px] text-[color:var(--darkreader-text-757575,#6b7478)] w-full outline-none"
      />
    </div>
  );
}

function Frame2({ username, password, verifyPassword, onUsernameChange, onPasswordChange, onVerifyPasswordChange }: { username: string; password: string; verifyPassword: string; onUsernameChange: (value: string) => void; onPasswordChange: (value: string) => void; onVerifyPasswordChange: (value: string) => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0">
      <Frame3 value={username} onChange={onUsernameChange} />
      <Frame6 value={password} onChange={onPasswordChange} />
      <Frame4 value={verifyPassword} onChange={onVerifyPasswordChange} />
    </div>
  );
}

function Frame({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-[var(--darkreader-background-0366ff,#0060f5)] content-stretch flex flex-col h-[62px] items-center justify-center px-[123px] py-[17px] relative rounded-[8px] shrink-0 w-[312px] cursor-pointer hover:opacity-90 transition-opacity"
    >
      <p className="font-['Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[20px] text-[color:var(--darkreader-text-ffffff,#dcdad7)] text-nowrap whitespace-pre">회원가입</p>
    </button>
  );
}

function Frame1({ username, password, verifyPassword, onUsernameChange, onPasswordChange, onVerifyPasswordChange, onBack, onCreateAccount }: { username: string; password: string; verifyPassword: string; onUsernameChange: (value: string) => void; onPasswordChange: (value: string) => void; onVerifyPasswordChange: (value: string) => void; onBack: () => void; onCreateAccount: () => void }) {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] content-stretch flex flex-col gap-[32px] h-[500px] items-center justify-center relative rounded-[24px] shrink-0 w-[560px]">
      <Frame5 onBack={onBack} />
      <Frame2 username={username} password={password} verifyPassword={verifyPassword} onUsernameChange={onUsernameChange} onPasswordChange={onPasswordChange} onVerifyPasswordChange={onVerifyPasswordChange} />
      <Frame onClick={onCreateAccount} />
    </div>
  );
}

export default function AuthCreateAccount({ onBack, onCreateAccount }: AuthCreateAccountProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');

  const handleCreateAccount = () => {
    if (username && password && password === verifyPassword) {
      onCreateAccount(username, password);
    } else if (password !== verifyPassword) {
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <div className="bg-[var(--darkreader-background-f9f9f9,#d8d6d2)] relative min-h-screen w-full" data-name="Auth/create_account">
      <div className="flex flex-row items-center justify-center min-h-screen w-full">
        <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
          <Frame1
            username={username}
            password={password}
            verifyPassword={verifyPassword}
            onUsernameChange={setUsername}
            onPasswordChange={setPassword}
            onVerifyPasswordChange={setVerifyPassword}
            onBack={onBack}
            onCreateAccount={handleCreateAccount}
          />
        </div>
      </div>
    </div>
  );
}
