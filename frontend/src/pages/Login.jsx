import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
import { Sparkles as LucideSparkles, Shield, Eye, EyeOff, Mail, Lock } from 'lucide-react';

// ... existing imports

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      }, { timeout: 10000 });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("auth", "true");

      console.log('✅ Login success');
      navigate("/dashboard", { replace: true });
    } catch (err) {
      if (err.code === 'ECONNABORTED') {
        setError("Backend not running. Run: `cd backend && npm run dev`");
      } else if (err.response?.status === 401) {
        setError("❌ Wrong email/password");
      } else {
        setError("Login failed. Check backend.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-black text-white overflow-hidden">
      {/* COMPACT NAVBAR - DASHBOARD MATCH */}
      <nav className="w-full bg-black/95 backdrop-blur-xl border-b border-slate-800/50 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <LucideSparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                  Reality Auditor
                </h1>
                <p className="text-indigo-400 text-xs sm:text-sm font-bold">
                  Powered by <span className="text-indigo-300">Gemini 2.5 Flash</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="w-full max-w-md">
          {/* LOGIN CARD - DASHBOARD MATCH */}
          <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-8 sm:p-10 border border-slate-700/50 shadow-2xl">
            <div className="text-center mb-8 sm:mb-10">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-xl mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">
                Secure Login
              </h2>
              <p className="text-slate-400 text-sm sm:text-base">Access Gemini 2.5 Surveillance Dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-400 p-4 rounded-xl backdrop-blur-sm text-sm font-medium text-center">
                  {error}
                </div>
              )}

              {/* EMAIL */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-slate-700/50 rounded-xl backdrop-blur-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/70 focus:ring-2 focus:ring-indigo-500/30 transition-all text-sm sm:text-base"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-slate-700/50 rounded-xl backdrop-blur-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/70 focus:ring-2 focus:ring-indigo-500/30 transition-all text-sm sm:text-base pr-12"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-slate-400 hover:text-slate-200" />
                    ) : (
                      <Eye className="w-5 h-5 text-slate-400 hover:text-slate-200" />
                    )}
                  </button>
                </div>
              </div>

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-lg rounded-xl border-2 border-indigo-500/50 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <LucideSparkles className="w-5 h-5" />
                    Enter Platform
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* COMPACT FIXED FOOTER - DASHBOARD MATCH */}
      <footer className="w-full bg-black/95 backdrop-blur-xl border-t border-slate-800/50 fixed bottom-0 left-0 right-0 z-40 py-2.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
              <LucideSparkles className="w-3 h-3 text-white" />
            </div>
            <span className="text-slate-400 font-mono font-medium">Reality Auditor v2.0</span>
          </div>
          <div className="text-indigo-400 font-bold">Gemini 2.5 Flash</div>
          <div className="text-slate-500">AI Surveillance</div>
        </div>
      </footer>
    </div>
  );
}
