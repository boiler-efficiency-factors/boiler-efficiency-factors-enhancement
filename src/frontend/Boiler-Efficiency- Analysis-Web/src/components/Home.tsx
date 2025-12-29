import type { Workspace } from "../types/workspace";
import WorkspaceTable from "./WorkspaceTable";
import Pagination from "./Pagination";

interface HomeProps {
  username: string;
  onAddWorkspace: () => void;
  onWorkspaceClick: (workspaceId: string) => void;
  workspaces: Workspace[];
  currentPage: number;
  totalPages: number;

  onNext: () => void;
  onPrev: () => void;
  nextDisabled: boolean;
  prevDisabled: boolean;

  onPageChange: (page: number) => void;
}

function Button({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-[var(--darkreader-background-243647,#2c4257)] content-stretch flex h-[40px] items-center justify-center px-[16px] py-[11px] relative rounded-[4px] shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
      data-name="Button"
    >
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--darkreader-text-ffffff,#dcdad7)] text-nowrap whitespace-pre">
        + Add WorkSpace
      </p>
    </button>
  );
}

function Frame3({ onAddWorkspace }: { onAddWorkspace: () => void }) {
  return (
    <div className="content-stretch flex h-[37px] items-center justify-between overflow-clip px-0 py-[4px] relative shrink-0 w-[872px]">
      <p className="font-['Noto_Sans_KR:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[24px] text-[color:var(--darkreader-text-243647,#2c4257)] text-nowrap whitespace-pre">
        Home
      </p>
      <Button onClick={onAddWorkspace} />
    </div>
  );
}

function Frame2({
  onAddWorkspace,
  onWorkspaceClick,
  workspaces,
  currentPage,
  totalPages,
  onPageChange,
  onNext,
  onPrev,
  nextDisabled,
  prevDisabled,
}: {
  onAddWorkspace: () => void;
  onWorkspaceClick: (workspaceId: string) => void;
  workspaces: Workspace[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onNext: () => void;
  onPrev: () => void;
  nextDisabled: boolean;
  prevDisabled: boolean;
}) {
  return (
    <div className="absolute bg-[var(--darkreader-background-ffffff,#dcdad7)] content-stretch flex flex-col gap-[8px] items-center justify-center left-1/2 px-0 py-[40px] rounded-[24px] top-1/2 translate-x-[-50%] translate-y-[-50%] w-[1000px]">
      <Frame3 onAddWorkspace={onAddWorkspace} />
      <WorkspaceTable workspaces={workspaces} onWorkspaceClick={onWorkspaceClick} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        onNext={onNext}
        onPrev={onPrev}
        nextDisabled={nextDisabled}
        prevDisabled={prevDisabled}
      />
    </div>
  );
}

function NavBar({ username }: { username: string }) {
  return (
    <div className="absolute contents left-0 top-0" data-name="Nav-bar">
      <div className="absolute bg-[var(--darkreader-background-ffffff,#dcdad7)] h-[72px] left-0 top-0 w-[1440px]" data-name="Base" />
      <div className="absolute bg-[var(--darkreader-background-dcdcdc,#c3c0bb)] h-px left-0 top-[71px] w-[1440px]" data-name="Line" />
      <p className="absolute font-['Noto_Sans_KR:Bold',sans-serif] font-bold leading-[20px] left-[1214px] text-[20px] text-[color:var(--darkreader-text-243647,#2c4257)] text-nowrap top-[26px] whitespace-pre">
        {`${username}의 연구실`}
      </p>
    </div>
  );
}

export default function Home({
  username,
  onAddWorkspace,
  onWorkspaceClick,
  workspaces,
  currentPage,
  totalPages,
  onPageChange,
  onNext,
  onPrev,
  nextDisabled,
  prevDisabled,
}: HomeProps) {
  return (
    <div className="bg-[var(--darkreader-background-f9f9f9,#d8d6d2)] relative min-h-screen w-full" data-name="Home">
      <Frame2
        onAddWorkspace={onAddWorkspace}
        onWorkspaceClick={onWorkspaceClick}
        workspaces={workspaces}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        onNext={onNext}
        onPrev={onPrev}
        nextDisabled={nextDisabled}
        prevDisabled={prevDisabled}
      />
      <NavBar username={username} />
    </div>
  );
}
