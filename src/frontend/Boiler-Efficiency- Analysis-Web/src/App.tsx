import { useEffect, useState } from 'react';
import AuthLogin from './components/AuthLogin';
import AuthCreateAccount from './components/AuthCreateAccount';
import Home from './components/Home';
import HomePopupAddWorkspace from './components/HomePopupAddWorkspace';
import Session from './components/Session';
import { login as apiLogin } from "./api/auth";


type Screen = 'login' | 'createAccount' | 'home' | 'session';

type LoginResponse = {
  access: string;
  refresh: string;
};

const ACCESS_KEY = 'access';
const REFRESH_KEY = 'refresh';
const USERNAME_KEY = 'user_name';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '');

async function postJSON<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  let data: any = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }

  if (!res.ok) {

    const msg = data?.detail || data?.message || `${res.status} ${res.statusText}`;
    throw new Error(msg);
  }

  return data as T;
}

function saveTokens(access: string, refresh: string, user_name: string) {
  localStorage.setItem(ACCESS_KEY, access);
  localStorage.setItem(REFRESH_KEY, refresh);
  localStorage.setItem(USERNAME_KEY, user_name);
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [username, setUsername] = useState<string>('');
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState<string>('');
  const [authBusy, setAuthBusy] = useState<boolean>(false);

  useEffect(() => {
    const access = localStorage.getItem(ACCESS_KEY);
    const savedUser = localStorage.getItem(USERNAME_KEY);
    if (access && savedUser) {
      setUsername(savedUser);
      setCurrentScreen('home');
    }
  }, []);

  const handleCreateAccountClick = () => {
    setCurrentScreen('createAccount');
  };

  const handleBackToLogin = () => {
    setCurrentScreen('login');
  };

  const handleLogin = async (user: string, password: string) => {
  try {
    setAuthBusy(true);
    await apiLogin(user, password);
    localStorage.setItem("user_name", user); 
    setUsername(user);
    setCurrentScreen("home");
    } catch (e: any) {
      alert(e?.response?.data?.detail ?? e?.message ?? "로그인 실패");
    } finally {
      setAuthBusy(false);
    }
  };


  const handleCreateAccount = async (user: string, password: string) => {
    if (authBusy) return;
    if (!API_BASE_URL) {
      alert('VITE_API_BASE_URL이 설정되어 있지 않습니다. (.env 확인)');
      return;
    }

    try {
      setAuthBusy(true);

      await postJSON<unknown>('/api/user/register/', {
        user_name: user,
        password,
        verify_password: password, 
      });


      const data = await postJSON<LoginResponse>('/api/auth/login/', {
        user_name: user,
        password,
      });

      saveTokens(data.access, data.refresh, user);
      setUsername(user);
      setCurrentScreen('home');
    } catch (e: any) {
      alert(e?.message ?? '회원가입 실패');
    } finally {
      setAuthBusy(false);
    }
  };

  const handleAddWorkspace = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleWorkspaceClick = (workspaceName: string) => {
    setSelectedWorkspace(workspaceName);
    setCurrentScreen('session');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
  };

  return (
    <>
      {currentScreen === 'login' && (
        <AuthLogin
          onCreateAccount={handleCreateAccountClick}
          onLogin={handleLogin}
        />
      )}
      {currentScreen === 'createAccount' && (
        <AuthCreateAccount
          onBack={handleBackToLogin}
          onCreateAccount={handleCreateAccount}
        />
      )}
      {currentScreen === 'home' && (
        <>
          <Home
            username={username}
            onAddWorkspace={handleAddWorkspace}
            onWorkspaceClick={handleWorkspaceClick}
          />
          {showPopup && <HomePopupAddWorkspace onClose={handleClosePopup} />}
        </>
      )}
      {currentScreen === 'session' && (
        <Session
          username={username}
          workspaceName={selectedWorkspace}
          onBack={handleBackToHome}
        />
      )}
    </>
  );
}
