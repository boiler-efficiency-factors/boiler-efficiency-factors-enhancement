import AuthLogin from "../components/AuthLogin";

export default function LoginPage({
  onLogin,
  onCreateAccount,
}: {
  onLogin: (user: string, password: string) => void;
  onCreateAccount: () => void;
}) {
  return <AuthLogin onLogin={onLogin} onCreateAccount={onCreateAccount} />;
}
