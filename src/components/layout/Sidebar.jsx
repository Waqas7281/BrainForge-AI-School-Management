import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  GraduationCap,
  UserCheck,
  BookOpen,
  ClipboardCheck,
  FileText,
  BookCopy,
  DollarSign,
  Library,
  Bus,
  Bell,
  BarChart3,
  Settings,
  Bot,
} from "lucide-react";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/students", label: "Students", icon: GraduationCap },
  { path: "/teachers", label: "Teachers", icon: UserCheck },
  { path: "/classes", label: "Classes", icon: BookOpen },
  { path: "/attendance", label: "Attendance", icon: ClipboardCheck },
  { path: "/examinations", label: "Examinations", icon: FileText },
  { path: "/assignments", label: "Assignments", icon: BookCopy },
  { path: "/fees", label: "Fees", icon: DollarSign },
  { path: "/library", label: "Library", icon: Library },
  { path: "/transport", label: "Transport", icon: Bus },
  { path: "/notices", label: "Notices", icon: Bell },
  { path: "/reports", label: "Reports", icon: BarChart3 },
  { path: "/settings", label: "Settings", icon: Settings },
  { path: "/ai-assistant", label: "AI Assistant", icon: Bot },
];

export function Sidebar() {
  return (
    <aside className="w-60 bg-white border-r border-gray-300 h-screen sticky top-0 flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-gray-300">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary-blue flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span
            className="font-semibold text-gray-900"
            style={{ fontSize: "var(--text-h4)" }}
          >
            EduManage
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      isActive
                        ? "bg-primary-blue text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  <Icon className="w-5 h-5" strokeWidth={2} />
                  <span style={{ fontSize: "var(--text-body)" }}>
                    {item.label}
                  </span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-300">
        <div
          className="text-center"
          style={{ fontSize: "var(--text-tiny)", color: "var(--gray-500)" }}
        >
          © 2026 EduManage
        </div>
      </div>
    </aside>
  );
}
