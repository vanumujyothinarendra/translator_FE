import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/AuthForm";
import { registerUser } from "@/lib/auth";

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

    try {
      const res = await registerUser({
        username: values.username,
        email: values.email,
        password: values.password,
        confirm_password: values.confirmPassword,
      });

      console.log("Register success:", res.data);

      // Redirect to login after successful registration
      navigate("/login");

    } catch (err: any) {
      console.error(err);
      setError("Registration failed. Try again.");
    }

    setLoading(false);
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