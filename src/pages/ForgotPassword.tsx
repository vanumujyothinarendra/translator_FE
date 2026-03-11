import { useState } from "react";
import AuthForm from "@/components/AuthForm";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setTimeout(() => {
      setSent(true);
      setLoading(false);
    }, 1200);
  };

  if (sent) {
    return (
      <div className="gradient-bg flex min-h-screen items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card flex max-w-md flex-col items-center p-8 text-center"
        >
          <CheckCircle className="mb-4 h-16 w-16 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Check Your Email</h2>
          <p className="mt-2 text-muted-foreground">
            We've sent a password reset link to your email address.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <AuthForm
      title="Forgot Password"
      subtitle="Enter your email to reset your password"
      fields={[
        { name: "email", label: "Email", type: "email", placeholder: "you@example.com" },
      ]}
      submitLabel="Send Reset Link"
      onSubmit={handleSubmit}
      loading={loading}
      links={[{ label: "Back to Sign In", to: "/login" }]}
    />
  );
};

export default ForgotPassword;
