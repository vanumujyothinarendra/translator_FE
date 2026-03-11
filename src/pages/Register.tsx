import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/AuthForm";

interface RegisterProps {
  onLogin: (user: { username: string; email: string; token: string }) => void;
}

const Register = ({ onLogin }: RegisterProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (values: Record<string, string>) => {
    setLoading(true);
    setError("");
    if (values.password !== values.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }
    setTimeout(() => {
      onLogin({
        username: values.username,
        email: values.email,
        token: "demo-token-" + Date.now(),
      });
      navigate("/");
      setLoading(false);
    }, 1000);
  };

  return (
    <AuthForm
      title="Create Account"
      subtitle="Join us and start translating"
      fields={[
        { name: "username", label: "Username", type: "text", placeholder: "johndoe" },
        { name: "email", label: "Email", type: "email", placeholder: "you@example.com" },
        { name: "password", label: "Password", type: "password", placeholder: "••••••••" },
        { name: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "••••••••" },
      ]}
      submitLabel="Create Account"
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      links={[{ label: "Already have an account? Sign in", to: "/login" }]}
    />
  );
};

export default Register;
