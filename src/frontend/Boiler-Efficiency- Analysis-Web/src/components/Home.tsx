// src/components/Home.tsx
/*
import type { Workspace } from "../types/workspace";
import WorkspaceTable from "./WorkspaceTable";
import Pagination from "./Pagination";

interface HomeProps {
  username: string;
  onAddWorkspace: () => void;
  onOpenCompare: () => void;

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

function PrimaryButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className="bg-[var(--darkreader-background-243647,#2c4257)] content-stretch flex h-[40px] items-center justify-center px-[16px] py-[11px] relative rounded-[4px] shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
    >
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--darkreader-text-ffffff,#dcdad7)] text-nowrap whitespace-pre">
        {label}
      </p>
    </button>
  );
}

function Frame3({ onAddWorkspace, onOpenCompare }: { onAddWorkspace: () => void; onOpenCompare: () => void }) {
  return (
    <div className="content-stretch flex h-[37px] items-center justify-between overflow-clip px-0 py-[4px] relative shrink-0 w-[872px]">
      <p className="font-['Noto_Sans_KR:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[24px] text-[color:var(--darkreader-text-243647,#2c4257)] text-nowrap whitespace-pre">
        Home
      </p>

      <div className="flex items-center gap-[10px]">
        <PrimaryButton onClick={onOpenCompare} label="워크스페이스 비교" />
        <PrimaryButton onClick={onAddWorkspace} label="+ Add WorkSpace" />
      </div>
    </div>
  );
}

function Frame2({
  onAddWorkspace,
  onOpenCompare,
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
  onOpenCompare: () => void;
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
      <Frame3 onAddWorkspace={onAddWorkspace} onOpenCompare={onOpenCompare} />
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
  onOpenCompare,
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
        onOpenCompare={onOpenCompare}
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
  */

// src/components/Home.tsx
import type { Workspace } from "../types/workspace";
import WorkspaceTable from "./WorkspaceTable";
import Pagination from "./Pagination";

interface HomeProps {
  username: string;
  onAddWorkspace: () => void;
  onOpenCompare: () => void;

  onWorkspaceClick: (workspaceId: string) => void;
  workspaces: Workspace[];
  currentPage: number;
  totalPages: number;

  onNext: () => void;
  onPrev: () => void;
  nextDisabled: boolean;
  prevDisabled: boolean;

  onPageChange: (page: number) => void;

  // 추가: 삭제/선택 기능
  selectedWorkspaceIds: string[];
  onToggleWorkspaceSelect: (workspaceId: string) => void;
  onRequestDeleteSelected: () => void;
}

function PrimaryButton({
  onClick,
  label,
  disabled,
}: {
  onClick: () => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={!!disabled}
      className={`bg-[var(--darkreader-background-243647,#2c4257)] content-stretch flex h-[40px] items-center justify-center px-[16px] py-[11px] relative rounded-[4px] shrink-0 transition-opacity ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:opacity-90"
      }`}
    >
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--darkreader-text-ffffff,#dcdad7)] text-nowrap whitespace-pre">
        {label}
      </p>
    </button>
  );
}

function Frame3({
  onAddWorkspace,
  onOpenCompare,
  onRequestDeleteSelected,
  deleteDisabled,
}: {
  onAddWorkspace: () => void;
  onOpenCompare: () => void;
  onRequestDeleteSelected: () => void;
  deleteDisabled: boolean;
}) {
  return (
    <div className="content-stretch flex h-[37px] items-center justify-between overflow-clip px-0 py-[4px] relative shrink-0 w-[872px]">
      <p className="font-['Noto_Sans_KR:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[24px] text-[color:var(--darkreader-text-243647,#2c4257)] text-nowrap whitespace-pre">
        Home
      </p>

      <div className="flex items-center gap-[10px]">
        <PrimaryButton onClick={onOpenCompare} label="워크스페이스 비교" />
        <PrimaryButton onClick={onAddWorkspace} label="+ Add WorkSpace" />
        <PrimaryButton onClick={onRequestDeleteSelected} label="워크스페이스 삭제" disabled={deleteDisabled} />
      </div>
    </div>
  );
}

function Frame2({
  onAddWorkspace,
  onOpenCompare,
  onRequestDeleteSelected,
  deleteDisabled,
  onWorkspaceClick,
  workspaces,
  currentPage,
  totalPages,
  onPageChange,
  onNext,
  onPrev,
  nextDisabled,
  prevDisabled,
  selectedWorkspaceIds,
  onToggleWorkspaceSelect,
}: {
  onAddWorkspace: () => void;
  onOpenCompare: () => void;
  onRequestDeleteSelected: () => void;
  deleteDisabled: boolean;

  onWorkspaceClick: (workspaceId: string) => void;
  workspaces: Workspace[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onNext: () => void;
  onPrev: () => void;
  nextDisabled: boolean;
  prevDisabled: boolean;

  selectedWorkspaceIds: string[];
  onToggleWorkspaceSelect: (workspaceId: string) => void;
}) {
  return (
    <div className="absolute bg-[var(--darkreader-background-ffffff,#dcdad7)] content-stretch flex flex-col gap-[8px] items-center justify-center left-1/2 px-0 py-[40px] rounded-[24px] top-1/2 translate-x-[-50%] translate-y-[-50%] w-[1000px]">
      <Frame3
        onAddWorkspace={onAddWorkspace}
        onOpenCompare={onOpenCompare}
        onRequestDeleteSelected={onRequestDeleteSelected}
        deleteDisabled={deleteDisabled}
      />

      <WorkspaceTable
        workspaces={workspaces}
        onWorkspaceClick={onWorkspaceClick}
        selectedWorkspaceIds={selectedWorkspaceIds}
        onToggleWorkspaceSelect={onToggleWorkspaceSelect}
      />

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
  onOpenCompare,
  onWorkspaceClick,
  workspaces,
  currentPage,
  totalPages,
  onPageChange,
  onNext,
  onPrev,
  nextDisabled,
  prevDisabled,
  selectedWorkspaceIds,
  onToggleWorkspaceSelect,
  onRequestDeleteSelected,
}: HomeProps) {
  const deleteDisabled = selectedWorkspaceIds.length === 0;

  return (
    <div className="bg-[var(--darkreader-background-f9f9f9,#d8d6d2)] relative min-h-screen w-full" data-name="Home">
      <Frame2
        onAddWorkspace={onAddWorkspace}
        onOpenCompare={onOpenCompare}
        onRequestDeleteSelected={onRequestDeleteSelected}
        deleteDisabled={deleteDisabled}
        onWorkspaceClick={onWorkspaceClick}
        workspaces={workspaces}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        onNext={onNext}
        onPrev={onPrev}
        nextDisabled={nextDisabled}
        prevDisabled={prevDisabled}
        selectedWorkspaceIds={selectedWorkspaceIds}
        onToggleWorkspaceSelect={onToggleWorkspaceSelect}
      />
      <NavBar username={username} />
    </div>
  );
}

