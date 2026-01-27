
/*
import { useMemo, useState } from "react";
import type { Workspace, WorkspaceCreateInput } from "../types/workspace";
import Home from "../components/Home";
import HomePopupAddWorkspace from "../components/HomePopupAddWorkspace";
import HomePopupCompareSelect from "../components/HomePopupCompareSelect";
import CompareWorkspaceResult from "../components/CompareWorkspaceResult";

interface HomePageProps {
  username: string;
  workspaces: Workspace[];
  currentPage: number;
  totalPages: number;

  onAddWorkspace: () => void;
  onClosePopup: () => void;
  showPopup: boolean;

  onCreateWorkspace: (data: WorkspaceCreateInput) => Promise<any>;
  onWorkspaceClick: (workspaceId: string) => void;
  onDeleteWorkspace: (modelId: string) => void;

  onPageChange: (page: number) => void;
  nextDisabled: boolean;
  prevDisabled: boolean;
  onNext: () => void;
  onPrev: () => void;

  onLogout: () => void;
}

export default function HomePage(props: HomePageProps) {
  const [showCompareSelect, setShowCompareSelect] = useState(false);
  const [showCompareResult, setShowCompareResult] = useState(false);
  const [compareIds, setCompareIds] = useState<string[]>([]);

  // HomePopupCompareSelect는 내부에서 completed만 다시 필터링하지만,
  // 여기서도 필요한 경우 completed만 넘겨도 됩니다.
  const listForCompare = useMemo(() => props.workspaces, [props.workspaces]);

  const openCompare = () => setShowCompareSelect(true);
  const closeCompare = () => setShowCompareSelect(false);

  const startCompare = (ids: string[]) => {
    setCompareIds(ids);
    setShowCompareSelect(false);
    setShowCompareResult(true);
  };

  return (
    <div className="relative min-h-screen w-full">
      <Home
        username={props.username}
        onAddWorkspace={props.onAddWorkspace}
        onOpenCompare={openCompare}
        onWorkspaceClick={props.onWorkspaceClick}
        workspaces={props.workspaces}
        currentPage={props.currentPage}
        totalPages={props.totalPages}
        onPageChange={props.onPageChange}
        nextDisabled={props.nextDisabled}
        prevDisabled={props.prevDisabled}
        onNext={props.onNext}
        onPrev={props.onPrev}
      />

      {props.showPopup && (
        <HomePopupAddWorkspace onClose={props.onClosePopup} onCreateWorkspace={props.onCreateWorkspace} />
      )}

      {showCompareSelect && (
        <HomePopupCompareSelect
          workspaces={listForCompare}
          onClose={closeCompare}
          onConfirm={startCompare}
        />
      )}

      {showCompareResult && (
        <CompareWorkspaceResult
          workspaceIds={compareIds}
          onClose={() => setShowCompareResult(false)}
        />
      )}
    </div>
  );
}
  */

// src/pages/HomePage.tsx
import { useMemo, useState, useEffect } from "react";
import type { Workspace, WorkspaceCreateInput } from "../types/workspace";
import Home from "../components/Home";
import HomePopupAddWorkspace from "../components/HomePopupAddWorkspace";
import HomePopupCompareSelect from "../components/HomePopupCompareSelect";
import CompareWorkspaceResult from "../components/CompareWorkspaceResult";
import Dashboard30Days from "../components/dashboard/DashBoard30Days";


interface HomePageProps {
  username: string;
  workspaces: Workspace[];
  currentPage: number;
  totalPages: number;

  onAddWorkspace: () => void;
  onClosePopup: () => void;
  showPopup: boolean;

  onCreateWorkspace: (data: WorkspaceCreateInput) => Promise<any>;
  onWorkspaceClick: (workspaceId: string) => void;

  onDeleteWorkspace: (modelId: string) => void;

  onPageChange: (page: number) => void;
  nextDisabled: boolean;
  prevDisabled: boolean;
  onNext: () => void;
  onPrev: () => void;

  onLogout: () => void;
}

function ConfirmDeleteModal({
  count,
  onCancel,
  onConfirm,
  isDeleting,
}: {
  count: number;
  onCancel: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div
        className="absolute inset-0 z-0 backdrop-blur-[2px]"
        style={{ backgroundColor: "rgba(0,0,0,0.70)" }}
        onClick={onCancel}
      />
      <div
        className="
          relative z-10
          rounded-[16px]
          w-[560px]
          p-[32px]
          border-[3px] border-[#2c4257]
          shadow-[0_18px_45px_rgba(0,0,0,0.28)]
        "
        style={{ backgroundColor: "#ffffff" }}
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-['Noto_Sans_KR:Medium',sans-serif] font-medium text-[18px] text-[color:var(--darkreader-text-243647,#2c4257)]">
          워크스페이스 삭제
        </p>

        <p className="mt-[12px] font-['Roboto:Light','Noto_Sans_KR:Light',sans-serif] font-light text-[14px] leading-[20px] text-[color:var(--darkreader-text-454b54,#4e5558)]">
          선택한 워크스페이스 {count}개를 삭제하시겠습니까?
          <br />
          삭제된 워크스페이스는 복구할 수 없습니다.
        </p>
        <div className="mt-[20px] flex items-center justify-end gap-[12px]">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className={
              isDeleting
                ? "inline-flex items-center justify-center rounded-[10px] border border-[#2c4257] bg-[#e2e8f0] px-[22px] py-[10px] opacity-60 cursor-not-allowed min-w-[92px]"
                : "inline-flex items-center justify-center rounded-[10px] border border-[#2c4257] bg-[#e2e8f0] px-[22px] py-[10px] hover:bg-[#cbd5e1] cursor-pointer min-w-[92px]"
            }
          >
            <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[16px] text-[#0f172a]">
              취소
            </span>
          </button>

          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className={
              isDeleting
                ? "inline-flex items-center justify-center rounded-[10px] bg-[#dc2626] px-[22px] py-[10px] opacity-60 cursor-not-allowed min-w-[92px]"
                : "inline-flex items-center justify-center rounded-[10px] bg-[#dc2626] px-[22px] py-[10px] hover:bg-[#991b1b] cursor-pointer min-w-[92px]"
            }
          >
            <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[16px] text-white">
              삭제
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

// <div className="bg-red-600 text-white p-4">TEST</div>


export default function HomePage(props: HomePageProps) {
  const [showCompareSelect, setShowCompareSelect] = useState(false);
  const [showCompareResult, setShowCompareResult] = useState(false);
  const [compareIds, setCompareIds] = useState<string[]>([]);

  const [selectedWorkspaceIds, setSelectedWorkspaceIds] = useState<string[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setSelectedWorkspaceIds([]);
    setShowDeleteConfirm(false);
    setIsDeleting(false);
  }, [props.currentPage]);

  const listForCompare = useMemo(() => props.workspaces, [props.workspaces]);

  const openCompare = () => setShowCompareSelect(true);
  const closeCompare = () => setShowCompareSelect(false);

  const resolveModelId = (workspaceId: string) => {
    const ws = props.workspaces.find((w: any) => (w.id ?? w.workspace_id) === workspaceId);
    return (ws as any)?.model_id ?? (ws as any)?.modelId ?? workspaceId;
  };

  type HomeTab = "workspaces" | "dashboard";
  const [activeTab, setActiveTab] = useState<HomeTab>("workspaces");

  const tabButtonClass = (tab: HomeTab) => {
    const base = "px-4 py-2 text-sm font-semibold rounded-md border transition";
    const isActive = activeTab === tab;
    return isActive
      ? `${base} bg-slate-800 text-white border-slate-800`
      : `${base} bg-white text-slate-700 border-slate-200 hover:bg-slate-50`;
  };


  const startCompare = (ids: string[]) => {
    const modelIds = ids.map(resolveModelId);

    setCompareIds(modelIds);
    setShowCompareSelect(false);
    setShowCompareResult(true);
  };
    

  const toggleWorkspaceSelect = (workspaceId: string) => {
    const modelId = resolveModelId(workspaceId);

    setSelectedWorkspaceIds((prev) =>
      prev.includes(modelId) ? prev.filter((id) => id !== modelId) : [...prev, modelId]
    );
  };


  const requestDeleteSelected = () => {
    if (selectedWorkspaceIds.length === 0) {
      alert("삭제할 워크스페이스를 선택해 주세요.");
      return;
    }
    setShowDeleteConfirm(true);
  };

  const confirmDeleteSelected = async () => {
    if (selectedWorkspaceIds.length === 0) {
      setShowDeleteConfirm(false);
      return;
    }

    setIsDeleting(true);

    const failed: string[] = [];
    for (const id of selectedWorkspaceIds) {
      try {
        await Promise.resolve(props.onDeleteWorkspace(id) as any);
      } catch {
        failed.push(id);
      }
    }

    setIsDeleting(false);
    setShowDeleteConfirm(false);
    setSelectedWorkspaceIds([]);

    if (failed.length > 0) {
      alert(`일부 워크스페이스 삭제에 실패했습니다: ${failed.join(", ")}`);
    }
  };

return (
  <div className="relative min-h-screen w-full">

    <div className="max-w-6xl mx-auto px-6 pt-8">
      <div className="flex items-center gap-2">
        <button
          className={tabButtonClass("workspaces")}
          onClick={() => setActiveTab("workspaces")}
        >
          워크스페이스
        </button>

        <button
          className={tabButtonClass("dashboard")}
          onClick={() => setActiveTab("dashboard")}
        >
          최근 30일 운영 대시보드
        </button>
      </div>
    </div>

    {activeTab === "workspaces" ? (
      <>
        <Home
          username={props.username}
          onAddWorkspace={props.onAddWorkspace}
          onOpenCompare={openCompare}
          onWorkspaceClick={props.onWorkspaceClick}
          workspaces={props.workspaces}
          currentPage={props.currentPage}
          totalPages={props.totalPages}
          onPageChange={props.onPageChange}
          nextDisabled={props.nextDisabled}
          prevDisabled={props.prevDisabled}
          onNext={props.onNext}
          onPrev={props.onPrev}
          selectedWorkspaceIds={selectedWorkspaceIds}
          onToggleWorkspaceSelect={toggleWorkspaceSelect}
          onRequestDeleteSelected={requestDeleteSelected}
        />
        {props.showPopup && (
          <HomePopupAddWorkspace
            onClose={props.onClosePopup}
            onCreateWorkspace={props.onCreateWorkspace}
          />
        )}

        {showCompareSelect && (
          <HomePopupCompareSelect
            workspaces={listForCompare}
            onClose={closeCompare}
            onConfirm={startCompare}
          />
        )}

        {showCompareResult && (
          <CompareWorkspaceResult
            workspaceIds={compareIds}
            onClose={() => setShowCompareResult(false)}
          />
        )}

        {showDeleteConfirm && (
          <ConfirmDeleteModal
            count={selectedWorkspaceIds.length}
            onCancel={() => setShowDeleteConfirm(false)}
            onConfirm={confirmDeleteSelected}
            isDeleting={isDeleting}
          />
        )}
      </>
    ) : (
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-[#efece8] rounded-2xl shadow-sm border border-slate-200 p-8">
          <Dashboard30Days />
        </div>
      </div>
    )}
  </div>
);
}

