import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/AuthForm";
import { toast } from "@/hooks/use-toast";

const ResetPassword = () => {
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
      toast({ title: "Password reset successfully!" });
      navigate("/login");
      setLoading(false);
    }, 1000);
  };

  return (
    <AuthForm
      title="Reset Password"
      subtitle="Enter your new password"
      fields={[
        { name: "password", label: "New Password", type: "password", placeholder: "••••••••" },
        { name: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "••••••••" },
      ]}
      submitLabel="Reset Password"
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      links={[{ label: "Back to Sign In", to: "/login" }]}
    />
  );
};

export default ResetPassword;
