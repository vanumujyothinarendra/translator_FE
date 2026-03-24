import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/AuthForm";
import { loginUser } from "@/lib/auth";

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

    try {
      const res = await loginUser({
        username_or_email: values.email,
        password: values.password,
      });

      const token = res.data.access;

      // store JWT token
      localStorage.setItem("token", token);

      onLogin({
        username: values.email.split("@")[0],
        email: values.email,
        token: token,
      });

      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    }

    setLoading(false);
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