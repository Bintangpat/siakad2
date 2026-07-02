import React, { useState } from "react";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  LogIn,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { api } from "@/lib/api";

export const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await api.post("/auth/login/admin", {
        username,
        password,
      });

      if (response.data) {
        setStatus("success");
        // Redirect to dashboard after a short delay
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setStatus("idle");
      alert("Login failed. Please check your username and password.");
    }
  };

  return (
    <div className="bg-background flex flex-col justify-center-safe items-center-safe w-full border border-outline-variant p-8 rounded-lg shadow-md">
      <form className="space-y-6 w-120" onSubmit={handleSubmit}>
        {/* Username Input */}
        <div className="space-y-1">
          <label
            className="text-sm font-semibold text-on-surface-variant"
            htmlFor="username"
          >
            Username / NIM
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
              <User className="w-5 h-5" />
            </div>
            <input
              className="w-full pl-12 pr-4 py-3 bg-surface-container border border-outline-variant rounded focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-base"
              id="username"
              type="text"
              placeholder="Enter your ID"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label
              className="text-sm font-semibold text-on-surface-variant"
              htmlFor="password"
            >
              Password
            </label>
            <a
              className="text-xs font-semibold text-primary hover:underline"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
              <Lock className="w-5 h-5" />
            </div>
            <input
              className="w-full pl-12 pr-12 py-3 bg-surface-container border border-outline-variant rounded focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-base"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-outline hover:text-primary transition-colors cursor-pointer"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center gap-2">
          <input
            className="w-4 h-4 text-primary bg-surface-container border border-outline-variant rounded focus:ring-primary accent-primary"
            id="remember"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label
            className="text-sm text-on-surface-variant select-none"
            htmlFor="remember"
          >
            Remember me on this device
          </label>
        </div>

        {/* Submit Button */}
        <button
          className={`w-full py-3 font-semibold text-sm rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
            status === "loading"
              ? "bg-primary/80 text-on-primary cursor-not-allowed"
              : status === "success"
                ? "bg-emerald-800 text-white"
                : "bg-primary text-on-primary hover:bg-primary-container active:scale-[0.98]"
          }`}
          type="submit"
          disabled={status !== "idle"}
        >
          {status === "idle" && (
            <>
              <span>Sign In</span>
              <LogIn className="w-4 h-4" />
            </>
          )}
          {status === "loading" && (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Authenticating...</span>
            </>
          )}
          {status === "success" && (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Success</span>
            </>
          )}
        </button>
      </form>

      {/* Secure Notice */}
      <div className="mt-8 pt-4 border-t border-outline-variant text-center">
        <p className="text-xs text-on-surface-variant flex items-center justify-center gap-1">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          Authorized Access Only. All activities are logged.
        </p>
      </div>
    </div>
  );
};
