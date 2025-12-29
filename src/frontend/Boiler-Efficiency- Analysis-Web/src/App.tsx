import { useEffect, useState } from "react";
import type { Workspace, WorkspaceCreateInput } from "./types/workspace";
import LoginPage from "./pages/LoginPage";
import CreateAccountPage from "./pages/CreateAccountPage";
import HomePage from "./pages/HomePage";
import SessionPage from "./pages/SessionPage";
import { getWorkspacePaging, deleteWorkspace } from "./api/workspace";

import { token } from "./auth/token";
import { session } from "./auth/session";
import { getUserIdFromAccess } from "./auth/jwt";

import * as authApi from "./api/auth";
import * as wsApi from "./api/workspace";

type Screen = "login" | "createAccount" | "home" | "session";

export default function App() {
  const [nextDisabled, setNextDisabled] = useState(true);
  const [prevDisabled, setPrevDisabled] = useState(true);
  const pageSize = 10;
  const [currentScreen, setCurrentScreen] = useState<Screen>("login");
  const [username, setUserName] = useState<string>("");
  const [showPopup, setShowPopup] = useState(false);

  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(null);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [prevUrl, setPrevUrl] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadWorkspaces = async (page: number) => {
    const data: any = await getWorkspacePaging(page);
    const toWorkspace = (raw: any): Workspace => ({
      id: String(raw?.id ?? raw?.model_id ?? raw?.workspace_id ?? ""),
      name: String(raw?.name ?? raw?.workspace ?? raw?.title ?? "-"),
      model: String(raw?.model ?? raw?.selected_model ?? "-"),
      startDate: String(raw?.startDate ?? raw?.start_date ?? raw?.start ?? "-"),
      endDate: String(raw?.endDate ?? raw?.end_date ?? raw?.end ?? "-"),
      createdAt: String(raw?.createdAt ?? raw?.created_at ?? raw?.created ?? "-"),
      status: String(raw?.status ?? raw?.state ?? raw?.session_status ?? "pending"),
    });
    const resultsRaw: any[] =
      Array.isArray(data?.results) ? data.results :
      Array.isArray(data?.results?.results) ? data.results.results :   // ✅ 추가 (중요)
      Array.isArray(data?.page?.items) ? data.page.items :
      [];

    const results: Workspace[] = resultsRaw.map(toWorkspace);
    setWorkspaces(results);
    const detailSettled = await Promise.allSettled(
      results.map(async (w) => {
        const s = await wsApi.getWorkspaceSession(w.id); // <- 이 함수는 api/workspace에 새로 만들어야 함
        const status = s?.state ?? s?.status ?? s?.session_state;
        return { id: w.id, status };
      })
    );


    const statusMap = new Map<string, unknown>();
    for (const r of detailSettled) {
      if (r.status === "fulfilled" && r.value?.id) {
        statusMap.set(r.value.id, r.value.status);
      }
    }

    setWorkspaces((prev) =>
      prev.map((w) => {
        const s = statusMap.get(w.id);
        return s == null ? w : { ...w, status: String(s) };
      })
    );

    const count: number =
      typeof data?.count === "number" ? data.count :
      typeof data?.results?.count === "number" ? data.results.count :   // ✅ 추가
      typeof data?.page?.count === "number" ? data.page.count :
      resultsRaw.length;

    setNextDisabled(!(data?.next ?? data?.results?.next ?? data?.page?.next));
    setPrevDisabled(!(data?.previous ?? data?.results?.previous ?? data?.page?.previous));

    setTotalPages(Math.max(1, Math.ceil(count / pageSize)));
  };

  useEffect(() => {
    const access = token.getAccess();
    if (access) {
      setUserName(session.getUserName() ?? "");
      setCurrentScreen("home");
      loadWorkspaces(1).catch(() => {
        token.clear();
        session.clear();
        setCurrentScreen("login");
      });
    }
  }, []);

  useEffect(() => {
    if (currentScreen !== "home") return;

    const id = window.setInterval(() => {
      loadWorkspaces(currentPage).catch(() => {
      });
    }, 8000);

    return () => window.clearInterval(id);
  }, [currentScreen, currentPage]);
  
  
  const handleLogin = async (user: string, password: string) => {
    try {
      await authApi.login(user, password);
      session.setUserName(user);
      setUserName(user);
      setCurrentScreen("home");
      await loadWorkspaces(1);
    } catch (e: any) {
      alert(`로그인 실패: ${e?.message ?? "unknown error"}`);
    }
  };

  const handleCreateAccount = async (user: string, password: string) => {
    try {
      await authApi.register(user, password);
      await handleLogin(user, password); 
    } catch (e: any) {
      alert(`회원가입 실패: ${e?.message ?? "unknown error"}`);
    }
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } finally {
      session.clear();
      setUserName("");
      setWorkspaces([]);
      setSelectedWorkspace(null);
      setCurrentScreen("login");
    }
  };

  const handleCreateWorkspace = async (data: WorkspaceCreateInput) => {
    try {
      await wsApi.createWorkspace(data);
      setShowPopup(false);
      await loadWorkspaces(1);
    } catch (e: any) {
      alert(`워크스페이스 생성 실패: ${e?.message ?? "unknown error"}`);
    }
  };

  const handleWorkspaceClick = (workspaceId: string) => {
    const ws = workspaces.find((w) => w.id === workspaceId) ?? null;
    setSelectedWorkspace(ws);
    setCurrentScreen("session");
  };

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    await loadWorkspaces(page);
  };

  const handleNext = async () => {
    if (nextDisabled) return;
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    await loadWorkspaces(nextPage);
  };

  const handlePrev = async () => {
    if (prevDisabled) return;
    const prevPage = currentPage - 1;
    setCurrentPage(prevPage);
    await loadWorkspaces(prevPage);
  };

  const handleDeleteWorkspace = async (modelId: string) => {
    await deleteWorkspace(modelId);
    await loadWorkspaces(currentPage);
  };

  return (
    <div className="min-h-screen w-full">
      {currentScreen === "login" && (
        <LoginPage
          onLogin={handleLogin}
          onCreateAccount={() => setCurrentScreen("createAccount")}
        />
      )}

      {currentScreen === "createAccount" && (
        <CreateAccountPage
          onBack={() => setCurrentScreen("login")}
          onCreateAccount={handleCreateAccount}
        />
      )}

      {currentScreen === "home" && (
        <HomePage
          username={username}
          workspaces={workspaces}
          currentPage={currentPage}
          totalPages={totalPages}
          onAddWorkspace={() => setShowPopup(true)}
          onClosePopup={() => setShowPopup(false)}
          showPopup={showPopup}
          onCreateWorkspace={handleCreateWorkspace}
          onWorkspaceClick={handleWorkspaceClick}
          //onDeleteWorkspace={handleDeleteWorkspace}
          onDeleteWorkspace={() => {}}
          onPageChange={handlePageChange}
          nextDisabled={nextDisabled}
          prevDisabled={prevDisabled}
          onNext={handleNext}
          onPrev={handlePrev}
          onLogout={handleLogout}
        />
      )}

      {currentScreen === "session" && selectedWorkspace && (
        <SessionPage
          username={username}
          workspace={selectedWorkspace}
          onBack={() => setCurrentScreen("home")}
        />
      )}
    </div>
  );
}
