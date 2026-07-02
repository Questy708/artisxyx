"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  RefreshCw, Users, DollarSign, FileText, Clock, Trash2,
  ChevronDown, ChevronUp, Mail, ShieldCheck, Building2, Globe,
  MapPin, Briefcase, Link2, Heart, ExternalLink, Download,
  Lock, LogOut, ArrowLeft, Eye, EyeOff, Loader2, Search,
  LayoutDashboard, TrendingUp, X, Home, Command,
} from "lucide-react";
import { Link } from "@/artemis/router";

/* ══════════════════════════════════════════════════════════════════════════
   TYPES
   ══════════════════════════════════════════════════════════════════════════ */
interface Subscriber { id: string; email: string; firstName: string | null; lastName: string | null; consent: boolean; source: string; createdAt: string; }
interface InvestmentInquiry { id: string; name: string; email: string; amount: number; tier: string; accredited: boolean; consent: boolean; status: string; createdAt: string; }
interface Application { id: string; type: string; firstName: string; lastName: string; email: string; referral: string | null; linkedinUrl: string | null; companyName: string | null; companyWebsite: string | null; location: string | null; role: string | null; pitchDeckUrl: string | null; motivation: string | null; orgName: string | null; orgWebsite: string | null; partnerRole: string | null; interest: string | null; description: string | null; status: string; notes: string | null; createdAt: string; }
interface JobApplication { id: string; firstName: string; lastName: string; email: string; phone: string | null; linkedinUrl: string | null; portfolioUrl: string | null; role: string; location: string | null; availability: string | null; motivation: string | null; referral: string | null; resumeUrl: string | null; status: string; notes: string | null; createdAt: string; }
interface ProgramApplication { id: string; programSlug: string; firstName: string; lastName: string; email: string; phone: string | null; linkedinUrl: string | null; location: string | null; currentRole: string | null; companyName: string | null; motivation: string | null; referral: string | null; status: string; notes: string | null; createdAt: string; }

interface Stats {
  totalSubscribers: number; totalInquiries: number; totalInvestmentAmount: number;
  totalApplications: number; founderCount: number; partnerCount: number;
  totalJobApplications: number; jobAppRoleCount: number;
  totalProgramApplications: number;
  applicationsByType: { type: string; _count: { type: number } }[];
  applicationsByStatus: { status: string; _count: { status: number } }[];
  programApplicationsByProgram: { programSlug: string; _count: { programSlug: number } }[];
  programApplicationsByStatus: { status: string; _count: { status: number } }[];
  pendingInquiries: number; pendingApplications: number; pendingJobApplications: number; pendingProgramApplications: number;
}

type Tab = "overview" | "subscribers" | "inquiries" | "applications" | "jobApplications" | "programApplications";

/* ══════════════════════════════════════════════════════════════════════════
   HELPERS
   ══════════════════════════════════════════════════════════════════════════ */
function formatCurrency(n: number): string { return "$" + (n ?? 0).toLocaleString("en-US"); }
function formatDate(dateStr: string): string {
  if (!dateStr) return "—";
  const date = new Date(dateStr); const now = new Date(); const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000); const diffMin = Math.floor(diffSec / 60); const diffHr = Math.floor(diffMin / 60); const diffDay = Math.floor(diffHr / 24);
  if (diffSec < 60) return "just now"; if (diffMin < 60) return `${diffMin}m ago`; if (diffHr < 24) return `${diffHr}h ago`; if (diffDay < 7) return `${diffDay}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
function formatTimestamp(dateStr: string): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

/* ══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════════════════════ */
export function AdminDashboard() {
  const [token, setToken] = useState<string | null>(null);
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);

  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [stats, setStats] = useState<Stats | null>(null);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [inquiries, setInquiries] = useState<InvestmentInquiry[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
  const [programApplications, setProgramApplications] = useState<ProgramApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [appFilter, setAppFilter] = useState<string>("all");
  const [programFilter, setProgramFilter] = useState<string>("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* ── Auth ── */
  useEffect(() => {
    const stored = localStorage.getItem("admin_token");
    if (!stored) { setAuthChecking(false); return; }
    fetch("/api/admin/auth", { headers: { Authorization: `Bearer ${stored}` } })
      .then(res => { if (res.ok) setToken(stored); else localStorage.removeItem("admin_token"); })
      .catch(() => localStorage.removeItem("admin_token"))
      .finally(() => setAuthChecking(false));
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginPassword) return;
    setLoginLoading(true); setLoginError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: loginPassword }),
      });
      const data = await res.json();
      if (res.ok && data.token) { localStorage.setItem("admin_token", data.token); setToken(data.token); }
      else setLoginError(data.error || "Login failed");
    } catch { setLoginError("Network error"); }
    finally { setLoginLoading(false); }
  };

  const handleLogout = () => { localStorage.removeItem("admin_token"); setToken(null); setLoginPassword(""); };

  const handleUnauthorized = useCallback(() => { localStorage.removeItem("admin_token"); setToken(null); }, []);

  const authedFetch = useCallback(async (url: string, options: RequestInit = {}) => {
    const headers: Record<string, string> = { ...options.headers as Record<string, string> };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const res = await fetch(url, { ...options, headers });
    if (res.status === 401) handleUnauthorized();
    return res;
  }, [token, handleUnauthorized]);

  /* ── Data fetching ── */
  const fetchStats = useCallback(async () => { const res = await authedFetch("/api/admin"); if (res.ok) setStats(await res.json()); }, [authedFetch]);
  const fetchSubscribers = useCallback(async () => { const res = await authedFetch("/api/admin?resource=subscribers"); if (res.ok) setSubscribers((await res.json()).subscribers || []); }, [authedFetch]);
  const fetchInquiries = useCallback(async () => { const res = await authedFetch("/api/admin?resource=inquiries"); if (res.ok) setInquiries((await res.json()).inquiries || []); }, [authedFetch]);
  const fetchApplications = useCallback(async () => { const res = await authedFetch("/api/admin?resource=applications"); if (res.ok) setApplications((await res.json()).applications || []); }, [authedFetch]);
  const fetchJobApplications = useCallback(async () => { const res = await authedFetch("/api/admin?resource=jobApplications"); if (res.ok) setJobApplications((await res.json()).jobApplications || []); }, [authedFetch]);
  const fetchProgramApplications = useCallback(async () => { const res = await authedFetch("/api/admin?resource=programApplications"); if (res.ok) setProgramApplications((await res.json()).programApplications || []); }, [authedFetch]);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    Promise.all([fetchStats(), fetchSubscribers(), fetchInquiries(), fetchApplications(), fetchJobApplications(), fetchProgramApplications()])
      .finally(() => { setLoading(false); setLastRefreshed(new Date()); });
  }, [token, fetchStats, fetchSubscribers, fetchInquiries, fetchApplications, fetchJobApplications, fetchProgramApplications]);

  const refreshAll = async () => {
    setRefreshing(true);
    await Promise.all([fetchStats(), fetchSubscribers(), fetchInquiries(), fetchApplications(), fetchJobApplications(), fetchProgramApplications()]);
    setRefreshing(false); setLastRefreshed(new Date());
  };

  const updateStatus = async (type: string, id: string, status: string) => {
    setUpdatingStatus(id);
    try {
      await authedFetch("/api/admin", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ resource: type, id, status }) });
      if (type === "inquiry") setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i));
      if (type === "application") setApplications(prev => prev.map(a => a.id === id ? { ...a, status } : a));
      if (type === "jobApplication") setJobApplications(prev => prev.map(j => j.id === id ? { ...j, status } : j));
      if (type === "programApplication") setProgramApplications(prev => prev.map(p => p.id === id ? { ...p, status } : p));
    } finally { setUpdatingStatus(null); }
  };

  const deleteRecord = async (type: string, id: string) => {
    if (!confirm("Delete this record? This cannot be undone.")) return;
    await authedFetch("/api/admin", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ resource: type, id }) });
    if (type === "subscriber") setSubscribers(prev => prev.filter(s => s.id !== id));
    if (type === "inquiry") setInquiries(prev => prev.filter(i => i.id !== id));
    if (type === "application") setApplications(prev => prev.filter(a => a.id !== id));
    if (type === "jobApplication") setJobApplications(prev => prev.filter(j => j.id !== id));
    if (type === "programApplication") setProgramApplications(prev => prev.filter(p => p.id !== id));
  };

  const handleExport = async (type: string) => {
    const res = await authedFetch(`/api/admin/export?section=${type}`);
    if (res.ok) { const blob = await res.blob(); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = `${type}.csv`; a.click(); URL.revokeObjectURL(url); }
  };

  /* ── Derived ── */
  const founderCount = applications.filter(a => a.type === "founder").length;
  const partnerCount = applications.filter(a => a.type === "partner").length;
  const jobAppRoleCount = new Set(jobApplications.map(j => j.role)).size;
  const programAppBreakdown = stats?.programApplicationsByProgram?.map(p => `${p.programSlug}: ${p._count.programSlug}`).join(" · ");
  const pendingTotal = stats ? stats.pendingInquiries + stats.pendingApplications + stats.pendingJobApplications + stats.pendingProgramApplications : 0;

  const filteredApps = applications.filter(a => appFilter === "all" || a.type === appFilter);
  const filteredProgramApps = programApplications.filter(p => programFilter === "all" || p.programSlug === programFilter);

  const navItems = [
    { key: "overview" as Tab, label: "Overview", icon: LayoutDashboard, count: null },
    { key: "subscribers" as Tab, label: "Subscribers", icon: Mail, count: subscribers.length },
    { key: "inquiries" as Tab, label: "Inquiries", icon: DollarSign, count: inquiries.length },
    { key: "applications" as Tab, label: "Join Apps", icon: FileText, count: applications.length },
    { key: "jobApplications" as Tab, label: "Job Apps", icon: Briefcase, count: jobApplications.length },
    { key: "programApplications" as Tab, label: "Program Apps", icon: Globe, count: programApplications.length },
  ];

  /* ══════════════════════════════════════════════════════════════════════════
     RENDER
     ══════════════════════════════════════════════════════════════════════════ */

  if (authChecking) {
    return (
      <div className="bg-[#0A0A0A] text-white min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#FF4D00]" />
      </div>
    );
  }

  if (!token) {
    return (
      <div className="bg-[#0A0A0A] text-white min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-11 h-11 bg-[#FF4D00] flex items-center justify-center rounded-xl">
                <span className="text-white font-bold text-lg">X</span>
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-[#FF4D00] block">xCelero Labs</span>
                <span className="text-sm font-semibold text-white/60">Admin Console</span>
              </div>
            </div>

            <h1 className="text-[28px] font-display font-medium tracking-tight mb-2">Sign in</h1>
            <p className="text-sm text-white/40 mb-8">Enter the admin password to continue.</p>

            {loginError && (
              <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                className="mb-5 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-[12px] font-medium">
                {loginError}
              </motion.div>
            )}

            <form onSubmit={handleLogin}>
              <div className="relative mb-5">
                <input
                  type={showPassword ? "text" : "password"}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  autoFocus
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-[14px] text-white placeholder:text-white/20 focus:outline-none focus:border-[#FF4D00]/50 focus:ring-2 focus:ring-[#FF4D00]/10 transition-all pr-12"
                  placeholder="Password"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <button type="submit" disabled={loginLoading || !loginPassword}
                className="w-full py-3.5 bg-[#FF4D00] text-white text-[13px] font-bold rounded-xl hover:bg-[#FF6A28] transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                {loginLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                {loginLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/5 text-center">
              <Link to="/" className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-white/30 hover:text-[#FF4D00] transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to site
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  /* ── Main Dashboard ── */
  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen flex">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-[#111] border-r border-white/5 z-50 flex flex-col transition-transform duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}>
        {/* Sidebar header */}
        <div className="p-5 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-[#FF4D00] flex items-center justify-center rounded-lg">
              <span className="text-white font-bold text-sm">X</span>
            </div>
            <div className="flex-1">
              <span className="text-[13px] font-bold tracking-tight uppercase block leading-tight">xCelero<span className="text-[#FF4D00]"> Labs</span></span>
              <span className="text-[9px] font-mono text-white/30 tracking-wider uppercase">Admin Console</span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden text-white/40 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => { setActiveTab(item.key); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all ${
                  isActive
                    ? "bg-[#FF4D00]/10 text-[#FF4D00]"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.count !== null && (
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    isActive ? "bg-[#FF4D00]/20 text-[#FF4D00]" : "bg-white/5 text-white/30"
                  }`}>{item.count}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar footer */}
        <div className="p-3 border-t border-white/5 space-y-1">
          <Link to="/" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium text-white/50 hover:text-white hover:bg-white/5 transition-all">
            <Home className="w-4 h-4" /> Back to Site
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium text-white/50 hover:text-red-400 hover:bg-red-500/5 transition-all">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/5 px-5 md:px-8 h-16 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden text-white/60">
            <Command className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <h2 className="text-[15px] font-semibold truncate">
              {navItems.find(n => n.key === activeTab)?.label}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-white/20 hidden sm:block">
              {formatTimestamp(lastRefreshed.toISOString())}
            </span>
            <button onClick={refreshAll} disabled={refreshing}
              className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors">
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            </button>
            <Link to="/" className="p-2 rounded-lg text-white/40 hover:text-[#FF4D00] hover:bg-white/5 transition-colors" title="Back to site">
              <Home className="w-4 h-4" />
            </Link>
            <button onClick={handleLogout} className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-white/5 transition-colors" title="Logout">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Content area */}
        <main className="p-5 md:p-8 max-w-[1400px] mx-auto">
          <AnimatePresence mode="wait">
            {/* OVERVIEW */}
            {activeTab === "overview" && (
              <motion.div key="overview" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-8">
                  <StatCard icon={<Mail className="w-4 h-4" />} label="Subscribers" value={stats?.totalSubscribers ?? "—"} loading={loading} delay={0} onClick={() => setActiveTab("subscribers")} />
                  <StatCard icon={<DollarSign className="w-4 h-4" />} label="Inquiries" value={stats?.totalInquiries ?? "—"} sub={stats ? formatCurrency(stats.totalInvestmentAmount) : undefined} loading={loading} delay={0.05} onClick={() => setActiveTab("inquiries")} />
                  <StatCard icon={<FileText className="w-4 h-4" />} label="Join Apps" value={stats?.totalApplications ?? "—"} sub={stats ? `${founderCount} founder · ${partnerCount} partner` : undefined} loading={loading} delay={0.1} onClick={() => setActiveTab("applications")} />
                  <StatCard icon={<Briefcase className="w-4 h-4" />} label="Job Apps" value={stats?.totalJobApplications ?? "—"} loading={loading} delay={0.15} onClick={() => setActiveTab("jobApplications")} />
                  <StatCard icon={<Globe className="w-4 h-4" />} label="Program Apps" value={stats?.totalProgramApplications ?? "—"} sub={programAppBreakdown} loading={loading} delay={0.2} onClick={() => setActiveTab("programApplications")} />
                  <StatCard icon={<Clock className="w-4 h-4" />} label="Pending" value={pendingTotal || "—"} sub={stats ? `${stats.pendingInquiries} inq · ${stats.pendingApplications} app` : undefined} loading={loading} delay={0.25} accent onClick={() => setActiveTab("inquiries")} />
                </div>

                {/* Recent activity */}
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 md:p-6">
                  <h3 className="text-[13px] font-semibold mb-4 text-white/80">Recent Subscribers</h3>
                  {loading ? <SkeletonRow /> : subscribers.length === 0 ? <EmptyState /> : (
                    <div className="space-y-2">
                      {subscribers.slice(0, 5).map(s => (
                        <div key={s.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-8 h-8 rounded-full bg-[#FF4D00]/20 flex items-center justify-center text-[11px] font-bold text-[#FF4D00] flex-shrink-0">
                              {(s.firstName?.[0] || s.email[0] || "?").toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <p className="text-[13px] font-medium truncate">{s.firstName || s.email}</p>
                              <p className="text-[11px] text-white/30 truncate">{s.email}</p>
                            </div>
                          </div>
                          <span className="text-[11px] text-white/30 flex-shrink-0">{formatDate(s.createdAt)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* SUBSCRIBERS */}
            {activeTab === "subscribers" && (
              <motion.div key="subscribers" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                <DataTable
                  title="Subscribers" data={subscribers} loading={loading}
                  onExport={() => handleExport("subscribers")}
                  onDelete={(id) => deleteRecord("subscriber", id)}
                  columns={[
                    { key: "email", label: "Email", primary: true },
                    { key: "firstName", label: "First Name" },
                    { key: "lastName", label: "Last Name" },
                    { key: "source", label: "Source" },
                    { key: "createdAt", label: "Date", format: formatDate },
                  ]}
                />
              </motion.div>
            )}

            {/* INQUIRIES */}
            {activeTab === "inquiries" && (
              <motion.div key="inquiries" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                <DataTable
                  title="Investment Inquiries" data={inquiries} loading={loading}
                  onExport={() => handleExport("inquiries")}
                  onDelete={(id) => deleteRecord("inquiry", id)}
                  onUpdateStatus={(id, status) => updateStatus("inquiry", id, status)}
                  updatingStatus={updatingStatus}
                  columns={[
                    { key: "name", label: "Name", primary: true },
                    { key: "email", label: "Email" },
                    { key: "amount", label: "Amount", format: (v: number) => formatCurrency(v) },
                    { key: "tier", label: "Tier" },
                    { key: "status", label: "Status", badge: true },
                    { key: "createdAt", label: "Date", format: formatDate },
                  ]}
                />
              </motion.div>
            )}

            {/* APPLICATIONS */}
            {activeTab === "applications" && (
              <motion.div key="applications" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                <DataTable
                  title="Join Applications" data={filteredApps} loading={loading}
                  onExport={() => handleExport("applications")}
                  onDelete={(id) => deleteRecord("application", id)}
                  onUpdateStatus={(id, status) => updateStatus("application", id, status)}
                  updatingStatus={updatingStatus}
                  columns={[
                    { key: "type", label: "Type", badge: true },
                    { key: "firstName", label: "Name", primary: true, format: (_v: string, row: Application) => `${row.firstName} ${row.lastName}` },
                    { key: "email", label: "Email" },
                    { key: "companyName", label: "Company" },
                    { key: "status", label: "Status", badge: true },
                    { key: "createdAt", label: "Date", format: formatDate },
                  ]}
                />
              </motion.div>
            )}

            {/* JOB APPLICATIONS */}
            {activeTab === "jobApplications" && (
              <motion.div key="jobApplications" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                <DataTable
                  title="Job Applications" data={jobApplications} loading={loading}
                  onExport={() => handleExport("jobApplications")}
                  onDelete={(id) => deleteRecord("jobApplication", id)}
                  onUpdateStatus={(id, status) => updateStatus("jobApplication", id, status)}
                  updatingStatus={updatingStatus}
                  columns={[
                    { key: "role", label: "Role", primary: true },
                    { key: "firstName", label: "Name", format: (_v: string, row: JobApplication) => `${row.firstName} ${row.lastName}` },
                    { key: "email", label: "Email" },
                    { key: "location", label: "Location" },
                    { key: "status", label: "Status", badge: true },
                    { key: "createdAt", label: "Date", format: formatDate },
                  ]}
                />
              </motion.div>
            )}

            {/* PROGRAM APPLICATIONS */}
            {activeTab === "programApplications" && (
              <motion.div key="programApplications" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                <DataTable
                  title="Program Applications" data={filteredProgramApps} loading={loading}
                  onExport={() => handleExport("programApplications")}
                  onDelete={(id) => deleteRecord("programApplication", id)}
                  onUpdateStatus={(id, status) => updateStatus("programApplication", id, status)}
                  updatingStatus={updatingStatus}
                  columns={[
                    { key: "programSlug", label: "Program", badge: true },
                    { key: "firstName", label: "Name", primary: true, format: (_v: string, row: ProgramApplication) => `${row.firstName} ${row.lastName}` },
                    { key: "email", label: "Email" },
                    { key: "currentRole", label: "Role" },
                    { key: "companyName", label: "Company" },
                    { key: "location", label: "Location" },
                    { key: "status", label: "Status", badge: true },
                    { key: "createdAt", label: "Date", format: formatDate },
                  ]}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   STAT CARD — Apple-style rounded card
   ══════════════════════════════════════════════════════════════════════════ */
function StatCard({ icon, label, value, sub, loading, delay = 0, accent = false, onClick }: {
  icon: React.ReactNode; label: string; value: string | number; sub?: string; loading: boolean; delay?: number; accent?: boolean; onClick?: () => void;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className={`text-left p-5 rounded-2xl border transition-all hover:scale-[1.02] ${
        accent ? "border-[#FF4D00]/20 bg-[#FF4D00]/5" : "border-white/5 bg-white/[0.02] hover:border-white/15"
      }`}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${accent ? "bg-[#FF4D00]/15 text-[#FF4D00]" : "bg-white/5 text-white/40"}`}>
          {icon}
        </div>
        <span className="text-[11px] font-medium text-white/40">{label}</span>
      </div>
      {loading ? <div className="h-7 w-16 bg-white/5 rounded animate-pulse" /> : <p className="text-[24px] font-display font-medium leading-none">{value}</p>}
      {sub && <p className="text-[10px] text-white/30 mt-1.5 truncate">{sub}</p>}
    </motion.button>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   DATA TABLE — Apple-style table with rounded container
   ══════════════════════════════════════════════════════════════════════════ */
interface Column {
  format?: (value: any, row?: any) => string;
}

function DataTable<T extends { id: string; status?: string }>({
  title, data, loading, columns, onExport, onDelete, onUpdateStatus, updatingStatus,
}: {
  title: string; data: T[]; loading: boolean; columns: Column[];
  onExport?: () => void; onDelete?: (id: string) => void;
  onUpdateStatus?: (id: string, status: string) => void; updatingStatus?: string | null;
}) {
  const [search, setSearch] = useState("");
  const [selectedRow, setSelectedRow] = useState<T | null>(null);

  const filtered = data.filter(row =>
    columns.some(col => String(row[col.key as keyof T] ?? "").toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden">
        {/* Table header */}
        <div className="flex items-center justify-between gap-3 p-4 border-b border-white/5">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <h3 className="text-[14px] font-semibold whitespace-nowrap">{title}</h3>
            <span className="text-[11px] font-mono text-white/30">({filtered.length})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20" />
              <input
                value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="bg-white/5 border border-white/5 rounded-lg pl-8 pr-3 py-1.5 text-[12px] text-white placeholder:text-white/20 focus:outline-none focus:border-[#FF4D00]/30 w-32 sm:w-48"
              />
            </div>
            {onExport && (
              <button onClick={onExport} className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors" title="Export CSV">
                <Download className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="p-6 space-y-3">
            {[...Array(4)].map((_, i) => <SkeletonRow key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-[13px] text-white/30">No records found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  {columns.map(col => (
                    <th key={col.key} className="text-left px-4 py-2.5 text-[10px] font-mono font-bold tracking-[0.1em] uppercase text-white/30 whitespace-nowrap">
                      {col.label}
                    </th>
                  ))}
                  {(onUpdateStatus || onDelete) && <th className="w-10" />}
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr
                    key={row.id}
                    onClick={() => setSelectedRow(row)}
                    className="border-b border-white/5 hover:bg-white/[0.04] transition-colors group cursor-pointer"
                  >
                    {columns.map(col => {
                      const rawValue = row[col.key as keyof T];
                      const formatted = col.format ? col.format(rawValue, row) : String(rawValue ?? "—");
                      return (
                        <td key={col.key} className={`px-4 py-3 text-[12px] ${col.primary ? "font-medium text-white" : "text-white/60"} whitespace-nowrap max-w-[220px] truncate`}>
                          {col.badge ? <StatusPill value={formatted} /> : formatted}
                        </td>
                      );
                    })}
                    {(onUpdateStatus || onDelete) && (
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {onUpdateStatus && row.status && (
                            <select
                              value={row.status}
                              onChange={(e) => onUpdateStatus(row.id, e.target.value)}
                              disabled={updatingStatus === row.id}
                              className="bg-white/5 border border-white/10 rounded text-[10px] text-white/60 px-1.5 py-1 focus:outline-none focus:border-[#FF4D00]/30"
                            >
                              <option value="pending">Pending</option>
                              <option value="reviewing">Reviewing</option>
                              <option value="contacted">Contacted</option>
                              <option value="accepted">Accepted</option>
                              <option value="declined">Declined</option>
                            </select>
                          )}
                          {onDelete && (
                            <button onClick={() => onDelete(row.id)} className="p-1 text-white/20 hover:text-red-400 transition-colors">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Record Detail Modal */}
      <AnimatePresence>
        {selectedRow && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedRow(null)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col"
            >
              {/* Modal header */}
              <div className="flex items-center justify-between p-5 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FF4D00]/20 flex items-center justify-center text-[14px] font-bold text-[#FF4D00]">
                    {(String(selectedRow[columns.find(c => c.primary)?.key as keyof T] ?? "?")[0] || "?").toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-[15px] font-semibold">
                      {columns.find(c => c.primary)
                        ? (columns.find(c => c.primary)!.format
                            ? columns.find(c => c.primary)!.format(selectedRow[columns.find(c => c.primary)!.key as keyof T], selectedRow)
                            : String(selectedRow[columns.find(c => c.primary)!.key as keyof T] ?? "Record"))
                        : "Record"}
                    </h3>
                    <span className="text-[11px] text-white/30">{title}</span>
                  </div>
                </div>
                <button onClick={() => setSelectedRow(null)} className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal body — all fields */}
              <div className="flex-1 overflow-y-auto p-5">
                <div className="space-y-3">
                  {Object.entries(selectedRow).map(([key, value]) => {
                    if (key === "id") return null;
                    const col = columns.find(c => c.key === key);
                    const displayValue = col?.format ? col.format(value, selectedRow) : String(value ?? "—");
                    const isLong = String(value ?? "").length > 80;
                    return (
                      <div key={key} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-2 border-b border-white/5">
                        <span className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-white/30 sm:w-40 flex-shrink-0 pt-0.5">
                          {key.replace(/([A-Z])/g, " $1").replace(/^./, c => c.toUpperCase())}
                        </span>
                        <span className={`text-[13px] ${isLong ? "text-white/70 leading-relaxed whitespace-pre-wrap" : "text-white/90 font-medium"} flex-1`}>
                          {col?.badge ? <StatusPill value={displayValue} /> : displayValue}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Modal footer — actions */}
              {(onUpdateStatus || onDelete) && (selectedRow as any).status && (
                <div className="flex items-center gap-2 p-4 border-t border-white/5 bg-white/[0.02]">
                  <span className="text-[11px] font-mono text-white/30 mr-2">Status:</span>
                  {onUpdateStatus && (
                    <select
                      value={(selectedRow as any).status}
                      onChange={(e) => {
                        onUpdateStatus(selectedRow.id, e.target.value);
                        setSelectedRow({ ...selectedRow, status: e.target.value } as T);
                      }}
                      disabled={updatingStatus === selectedRow.id}
                      className="bg-white/5 border border-white/10 rounded-lg text-[12px] text-white/80 px-3 py-2 focus:outline-none focus:border-[#FF4D00]/30"
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewing">Reviewing</option>
                      <option value="contacted">Contacted</option>
                      <option value="accepted">Accepted</option>
                      <option value="declined">Declined</option>
                    </select>
                  )}
                  <div className="flex-1" />
                  {onDelete && (
                    <button
                      onClick={() => { onDelete(selectedRow.id); setSelectedRow(null); }}
                      className="inline-flex items-center gap-1.5 px-3 py-2 text-[11px] font-semibold text-red-400/70 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ══════════════════════════════════════════════════════════════════════════ */
function StatusPill({ value }: { value: string }) {
  const styles: Record<string, string> = {
    pending: "bg-yellow-500/10 text-yellow-400/80",
    reviewing: "bg-blue-500/10 text-blue-400/80",
    contacted: "bg-purple-500/10 text-purple-400/80",
    accepted: "bg-green-500/10 text-green-400/80",
    declined: "bg-red-500/10 text-red-400/80",
    open: "bg-green-500/10 text-green-400/80",
    upcoming: "bg-blue-500/10 text-blue-400/80",
    closed: "bg-white/5 text-white/30",
  };
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold capitalize ${styles[value.toLowerCase()] || "bg-white/5 text-white/40"}`}>
      {value}
    </span>
  );
}

function SkeletonRow() {
  return <div className="h-10 bg-white/[0.02] rounded-lg animate-pulse" />;
}

function EmptyState() {
  return <p className="text-[13px] text-white/30 text-center py-8">No data yet.</p>;
}
