import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/AuthForm";

interface LoginProps {
  onLogin: (user: { username: string; email: string; token: string }) => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (values: Record<string, string>) => {
    setLoading(true);
    setError("");
    // Simulate API call — replace with actual backend call
    setTimeout(() => {
      if (values.email && values.password) {
        onLogin({
          username: values.email.split("@")[0],
          email: values.email,
          token: "demo-token-" + Date.now(),
        });
        navigate("/");
      } else {
        setError("Please fill in all fields.");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <AuthForm
      title="Welcome Back"
      subtitle="Sign in to continue translating"
      fields={[
        { name: "email", label: "Email", type: "email", placeholder: "you@example.com" },
        { name: "password", label: "Password", type: "password", placeholder: "••••••••" },
      ]}
      submitLabel="Sign In"
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      links={[
        { label: "Create an account", to: "/register" },
        { label: "Forgot password?", to: "/forgot-password" },
      ]}
    />
  );
};

export default Login;
