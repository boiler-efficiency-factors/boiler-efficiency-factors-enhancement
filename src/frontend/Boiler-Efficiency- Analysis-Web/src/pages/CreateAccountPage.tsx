import AuthCreateAccount from "../components/AuthCreateAccount";

export default function CreateAccountPage({
  onBack,
  onCreateAccount,
}: {
  onBack: () => void;
  onCreateAccount: (user: string, password: string) => void;
}) {
  return <AuthCreateAccount onBack={onBack} onCreateAccount={onCreateAccount} />;
}
