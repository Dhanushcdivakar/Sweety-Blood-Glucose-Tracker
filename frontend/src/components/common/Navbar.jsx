import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Activity,
  Calendar,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  Droplet,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Dashboard", icon: LayoutDashboard },
    { to: "/readings", label: "Readings", icon: Activity },
    { to: "/reports", label: "Reports", icon: Calendar },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 to-primary-600 flex items-center justify-center text-white shadow-xs">
              <Droplet className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-700 to-rose-600 bg-clip-text text-transparent">
                Sweety
              </span>
              <span className="hidden sm:inline-block ml-1.5 text-xs text-slate-400 font-medium">
                Tracker
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(to)
                    ? "bg-primary-50 text-primary-700"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </nav>

          {/* User profile & Logout */}
          <div className="hidden md:flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs font-semibold text-slate-800">{user?.name || "Patient"}</p>
              <p className="text-[11px] text-slate-500">{user?.email}</p>
            </div>
            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors"
              title="Log out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log out</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                isActive(to)
                  ? "bg-primary-50 text-primary-700"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between px-3">
            <div>
              <p className="text-xs font-semibold text-slate-800">{user?.name}</p>
              <p className="text-[11px] text-slate-500">{user?.email}</p>
            </div>
            <button
              onClick={logout}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-rose-600 font-medium hover:bg-rose-50 rounded-md"
            >
              <LogOut className="w-3.5 h-3.5" />
              Log out
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;

