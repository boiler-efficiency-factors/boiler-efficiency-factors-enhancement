import { useState } from 'react';

interface AuthLoginProps {
  onCreateAccount: () => void;
  onLogin: (username: string, password: string) => void;
}

function Frame4({ value, onChange }: { value: string; onChange: (value: string) => void }) {
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

function Frame5({ value, onChange }: { value: string; onChange: (value: string) => void }) {
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

function Frame2({ username, password, onUsernameChange, onPasswordChange }: { username: string; password: string; onUsernameChange: (value: string) => void; onPasswordChange: (value: string) => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0">
      <Frame4 value={username} onChange={onUsernameChange} />
      <Frame5 value={password} onChange={onPasswordChange} />
    </div>
  );
}

function Frame({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-[var(--darkreader-background-0366ff,#0060f5)] content-stretch flex flex-col h-[62px] items-center justify-center px-[123px] py-[17px] relative rounded-[8px] shrink-0 w-[312px] cursor-pointer hover:opacity-90 transition-opacity"
    >
      <p className="font-['Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[20px] text-[color:var(--darkreader-text-ffffff,#dcdad7)] text-nowrap whitespace-pre">로그인</p>
    </button>
  );
}

function Frame3({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="content-stretch flex items-center justify-center relative shrink-0 cursor-pointer hover:opacity-70 transition-opacity"
    >
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[16px] text-[color:var(--darkreader-text-4f4f4f,#50575a)] text-nowrap whitespace-pre">Create Account</p>
    </button>
  );
}

function Frame1({ username, password, onUsernameChange, onPasswordChange, onLogin, onCreateAccount }: { username: string; password: string; onUsernameChange: (value: string) => void; onPasswordChange: (value: string) => void; onLogin: () => void; onCreateAccount: () => void }) {
  return (
    <div className="bg-[var(--darkreader-background-ffffff,#dcdad7)] content-stretch flex flex-col gap-[32px] h-[500px] items-center justify-center relative rounded-[24px] shrink-0 w-[560px]">
      <div className="font-['Inter:Bold',sans-serif] font-bold leading-[0] not-italic relative shrink-0 text-[0px] text-[color:var(--darkreader-text-292929,#35393c)] text-center text-nowrap whitespace-pre">
        <p className="font-['Noto_Sans_KR:Bold',sans-serif] leading-[normal] mb-0 text-[30px]">대림로얄이엔피</p>
        <p className="font-['Noto_Sans_KR:Regular',sans-serif] font-normal leading-[30px] text-[20px]">보일러 영향 인자 AI 모델 연구</p>
      </div>
      <Frame2 username={username} password={password} onUsernameChange={onUsernameChange} onPasswordChange={onPasswordChange} />
      <Frame onClick={onLogin} />
      <Frame3 onClick={onCreateAccount} />
    </div>
  );
}

export default function AuthLogin({ onCreateAccount, onLogin }: AuthLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username && password) {
      onLogin(username, password);
    }
  };

  return (
    <div className="bg-[var(--darkreader-background-f9f9f9,#d8d6d2)] relative min-h-screen w-full" data-name="Auth/login">
      <div className="flex flex-row items-center justify-center min-h-screen w-full">
        <div className="content-stretch flex items-center justify-center p-[10px] relative w-full">
          <Frame1
            username={username}
            password={password}
            onUsernameChange={setUsername}
            onPasswordChange={setPassword}
            onLogin={handleLogin}
            onCreateAccount={onCreateAccount}
          />
        </div>
      </div>
    </div>
  );
}
