import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Sprout, Menu, X, Trophy } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useCarbonCalculator } from "../context/AppContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { userXP } = useCarbonCalculator();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/calculator", label: "Calculator" },
    { to: "/insights", label: "Insights" },
    { to: "/tracker", label: "Habits" },
    { to: "/learn", label: "Learn" },
    { to: "/history", label: "History" },
    { to: "/settings", label: "Settings" }
  ];

  const activeStyle = ({ isActive }) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition-all ${
      isActive
        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60 hover:text-emerald-500 dark:hover:text-emerald-400"
    }`;

  const activeMobileStyle = ({ isActive }) =>
    `block px-3 py-2 rounded-lg text-base font-medium transition-all ${
      isActive
        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-emerald-500 dark:hover:text-emerald-400"
    }`;

  return (
    <nav className="sticky top-0 z-40 glass-nav transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-1.5 bg-emerald-500 text-white rounded-lg group-hover:rotate-12 transition-transform duration-300 shadow-md shadow-emerald-500/20 border border-emerald-600">
              <Sprout className="h-5 w-5" />
            </div>
            <span className="text-xl font-black bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300 bg-clip-text text-transparent tracking-tight">
              EcoXP AI
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map(link => (
              <NavLink key={link.to} to={link.to} className={activeStyle}>
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right Controls */}
          <div className="hidden md:flex items-center gap-4">
            {/* XP Badge */}
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-400 text-gray-950 font-extrabold text-xs border-2 border-gray-950 dark:border-gray-800 shadow-[2.5px_2.5px_0px_0px_rgba(9,9,11,1)]">
              <Trophy className="h-3.5 w-3.5 fill-current animate-bounce" />
              <span>{userXP} XP</span>
            </div>
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-400 text-gray-950 font-extrabold text-xs border border-gray-950 dark:border-gray-800 shadow-[1.5px_1.5px_0px_0px_rgba(9,9,11,1)]">
              <Trophy className="h-3 w-3 fill-current" />
              <span>{userXP} XP</span>
            </div>
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-900 transition-colors">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={activeMobileStyle}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
