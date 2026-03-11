import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

interface Field {
  name: string;
  label: string;
  type: string;
  placeholder: string;
}

interface AuthFormProps {
  title: string;
  subtitle: string;
  fields: Field[];
  submitLabel: string;
  onSubmit: (values: Record<string, string>) => void;
  loading?: boolean;
  error?: string;
  links?: { label: string; to: string }[];
}

const AuthForm = ({ title, subtitle, fields, submitLabel, onSubmit, loading, error, links }: AuthFormProps) => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <div className="gradient-bg flex min-h-screen items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="glass-card w-full max-w-md p-8"
      >
        <div className="mb-8 text-center">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-foreground"
          >
            {title}
          </motion.h1>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {fields.map((field, i) => (
            <motion.div
              key={field.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * (i + 1) }}
            >
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                {field.label}
              </label>
              <div className="relative">
                <input
                  type={
                    field.type === "password"
                      ? showPasswords[field.name] ? "text" : "password"
                      : field.type
                  }
                  placeholder={field.placeholder}
                  value={values[field.name] || ""}
                  onChange={(e) => setValues({ ...values, [field.name]: e.target.value })}
                  className="input-glass w-full text-foreground placeholder:text-muted-foreground"
                  required
                />
                {field.type === "password" && (
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords({ ...showPasswords, [field.name]: !showPasswords[field.name] })
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {showPasswords[field.name] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                )}
              </div>
            </motion.div>
          ))}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-gradient flex w-full items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {submitLabel}
          </motion.button>
        </form>

        {links && links.length > 0 && (
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-primary transition-colors hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AuthForm;
