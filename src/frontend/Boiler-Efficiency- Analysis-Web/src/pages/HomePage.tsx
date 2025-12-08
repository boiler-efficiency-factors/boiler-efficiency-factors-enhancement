import Home from "../components/Home";
import HomePopupAddWorkspace from "../components/HomePopupAddWorkspace";
import type { Workspace } from "../types/workspace";

export default function HomePage({
  username,
  workspaces,
  currentPage,
  totalPages,
  onAddWorkspace,
  onClosePopup,
  showPopup,
  onCreateWorkspace,
  onWorkspaceClick,
  onDeleteWorkspace,
  onPageChange,
  onLogout,
}: {
  username: string;
  workspaces: Workspace[];
  currentPage: number;
  totalPages: number;
  showPopup: boolean;
  onAddWorkspace: () => void;
  onClosePopup: () => void;
  onCreateWorkspace: (data: any) => void;
  onWorkspaceClick: (workspaceId: string) => void;
  onDeleteWorkspace: (id: string) => void;
  onPageChange: (page: number) => void;
  onLogout: () => void;
}) {
  return (
    <>
      <Home
        username={username}
        onAddWorkspace={onAddWorkspace}
        onWorkspaceClick={onWorkspaceClick}
        workspaces={workspaces}
        onDeleteWorkspace={onDeleteWorkspace}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        onLogout={onLogout}
      />
      {showPopup && (
        <HomePopupAddWorkspace onClose={onClosePopup} onCreateWorkspace={onCreateWorkspace} />
      )}
    </>
  );
}
