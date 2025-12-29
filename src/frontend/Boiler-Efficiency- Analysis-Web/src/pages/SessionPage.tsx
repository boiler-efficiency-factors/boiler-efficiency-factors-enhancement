import Session from "../components/Session";
import type { Workspace } from "../types/workspace";

export default function SessionPage({
  username,
  workspace,
  onBack,
}: {
  username: string;
  workspace: Workspace;
  onBack: () => void;
}) {
  return <Session username={username} workspace={workspace} onBack={onBack} />;
}
