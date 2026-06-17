import React from "react";
import { Link } from "react-router-dom";
import { Sprout, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-950/40 border-t border-gray-100 dark:border-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="p-1 bg-emerald-500 text-white rounded">
                <Sprout className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                EcoXP AI
              </span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed">
              Empowering individuals to understand, track, and systematically reduce their personal carbon footprint through educational insights and automated recommendations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wider mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/calculator" className="text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-500 transition-colors">
                  Carbon Calculator
                </Link>
              </li>
              <li>
                <Link to="/insights" className="text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-500 transition-colors">
                  Personal Insights
                </Link>
              </li>
              <li>
                <Link to="/tracker" className="text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-500 transition-colors">
                  Habits Tracker
                </Link>
              </li>
              <li>
                <Link to="/learn" className="text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-500 transition-colors">
                  Learn Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://www.epa.gov/climate-indicators"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-500 transition-colors"
                >
                  EPA Climate Data
                </a>
              </li>
              <li>
                <a
                  href="https://www.ipcc.ch/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-500 transition-colors"
                >
                  IPCC Reports
                </a>
              </li>
              <li>
                <Link to="/settings" className="text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-500 transition-colors">
                  Settings & Data Reset
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center justify-center gap-1">
            Made with <Heart className="h-3 w-3 text-rose-500 fill-rose-500 animate-pulse" /> for Hack2Skill.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            &copy; {new Date().getFullYear()} EcoXP AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
