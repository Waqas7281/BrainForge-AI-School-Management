// src/components/layout/Sidebar.jsx

import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  LayoutDashboard,
  Settings,
  BookOpen,
  FileText,
  GraduationCap,
  Users,
  Wallet,
  DollarSign,
  UserCheck,
  Calendar,
  BookMarked,
  Eye,
  MessageSquare,
  Mail,
  ClipboardList,
  Trophy,
  Award,
  Plus,
  Minus,
  X,
  Search,
  Building2,
  Globe,
  Bell,
  Database,
  Upload,
  Download,
  BarChart3,
  TrendingUp,
  CreditCard,
  Receipt,
  Banknote,
  Briefcase,
  UserPlus,
  UserMinus,
  History,
  Clock,
  MapPin,
  Car,
  Home,
  Package,
  ShoppingCart,
  Tag,
  Percent,
  Send,
  Inbox,
  Star,
  Flag,
  Shield,
  Key,
  Zap,
  Image,
  Film,
  Newspaper,
  GitBranch,
} from "lucide-react";

// ==================== ROLE-BASED MENU ACCESS ====================

// Super Admin - Full Access
const superAdminMenu = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  {
    label: "System Management",
    icon: Settings,
    hasSubmenu: true,
    submenu: [
      { path: "/schools", label: "Schools", icon: Building2 },
      { path: "/subscriptions", label: "Subscriptions", icon: DollarSign },
      { path: "/system/roles", label: "Roles & Permissions", icon: Shield },
      { path: "/system/modules", label: "Module Manager", icon: Package },
      { path: "/system/backup", label: "Backup", icon: Database },
    ],
  },
  {
    label: "Settings",
    icon: Settings,
    hasSubmenu: true,
    submenu: [
      { path: "/settings/school", label: "School Settings", icon: Building2 },
      {
        path: "/settings/academic-year",
        label: "Academic Year",
        icon: Calendar,
      },
      { path: "/settings/session", label: "Session Settings", icon: Clock },
      { path: "/settings/language", label: "Language", icon: Globe },
      { path: "/settings/email", label: "Email Settings", icon: Mail },
      { path: "/settings/system", label: "System Settings", icon: Settings },
    ],
  },
];

// School Admin - Full School Management
const schoolAdminMenu = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  {
    label: "Academics",
    icon: BookOpen,
    hasSubmenu: true,
    submenu: [
      { path: "/classes", label: "Classes", icon: BookOpen },
      { path: "/subjects", label: "Subjects", icon: FileText },
      { path: "/timetable/class", label: "Timetable", icon: Calendar },
    ],
  },
  {
    label: "Students",
    icon: GraduationCap,
    hasSubmenu: true,
    submenu: [
      { path: "/students", label: "All Students", icon: GraduationCap },
      { path: "/students/add", label: "Add Student", icon: UserPlus },
      { path: "/students/admission", label: "Admission", icon: Plus },
      { path: "/students/promote", label: "Promote", icon: TrendingUp },
      { path: "/students/disable", label: "Disabled", icon: UserMinus },
      { path: "/students/alumni", label: "Alumni", icon: Users },
    ],
  },
  {
    label: "Employees",
    icon: Users,
    hasSubmenu: true,
    submenu: [
      { path: "/teachers", label: "Teachers", icon: UserCheck },
      { path: "/teachers/add", label: "Add Teacher", icon: UserPlus },
      { path: "/staff", label: "Staff", icon: Briefcase },
      { path: "/staff/add", label: "Add Staff", icon: UserPlus },
    ],
  },
  {
    label: "Attendance",
    icon: UserCheck,
    hasSubmenu: true,
    submenu: [
      { path: "/attendance/student", label: "Student", icon: GraduationCap },
      { path: "/attendance/teacher", label: "Teacher", icon: UserCheck },
      { path: "/attendance/staff", label: "Staff", icon: Briefcase },
      { path: "/attendance/report", label: "Report", icon: BarChart3 },
    ],
  },
  {
    label: "Examinations",
    icon: ClipboardList,
    hasSubmenu: true,
    submenu: [
      { path: "/exams/schedule", label: "Exam Schedule", icon: Calendar },
      { path: "/exams/marks-entry", label: "Marks Entry", icon: FileText },
      { path: "/exams/result-card", label: "Result Card", icon: Trophy },
      { path: "/exams/publish", label: "Publish Result", icon: Send },
    ],
  },
  {
    label: "Fees & Accounts",
    icon: DollarSign,
    hasSubmenu: true,
    submenu: [
      { path: "/fees/master", label: "Fees Master", icon: Database },
      { path: "/fees/collect", label: "Collect Fees", icon: DollarSign },
      { path: "/fees/search-due", label: "Due Fees", icon: Clock },
      { path: "/fees/statement", label: "Statement", icon: Receipt },
      { path: "/accounts/income", label: "Income", icon: TrendingUp },
      { path: "/accounts/expense", label: "Expense", icon: CreditCard },
      { path: "/accounts/ledger", label: "Ledger", icon: BookOpen },
    ],
  },
  {
    label: "Payroll",
    icon: Banknote,
    hasSubmenu: true,
    submenu: [
      { path: "/salary/grade", label: "Salary Grade", icon: Award },
      { path: "/salary/assign", label: "Assign Salary", icon: Users },
      { path: "/salary/payment", label: "Make Payment", icon: DollarSign },
      { path: "/salary/payslip", label: "Payslip", icon: Receipt },
    ],
  },
  {
    label: "Communication",
    icon: Mail,
    hasSubmenu: true,
    submenu: [
      { path: "/communication/notice", label: "Notice Board", icon: Bell },
      { path: "/communication/send-email", label: "Send Email", icon: Send },
      {
        path: "/communication/send-sms",
        label: "Send SMS",
        icon: MessageSquare,
      },
      { path: "/whatsapp", label: "WhatsApp", icon: MessageSquare },
    ],
  },
  {
    label: "Reports",
    icon: BarChart3,
    hasSubmenu: true,
    submenu: [
      {
        path: "/reports/student",
        label: "Student Report",
        icon: GraduationCap,
      },
      { path: "/reports/attendance", label: "Attendance", icon: UserCheck },
      { path: "/reports/fees", label: "Fees Report", icon: Receipt },
      { path: "/reports/exam", label: "Exam Report", icon: ClipboardList },
      { path: "/reports/financial", label: "Financial", icon: DollarSign },
    ],
  },
  {
    label: "Settings",
    icon: Settings,
    hasSubmenu: true,
    submenu: [
      { path: "/settings/general", label: "General", icon: Settings },
      {
        path: "/settings/academic-year",
        label: "Academic Year",
        icon: Calendar,
      },
      { path: "/settings/session", label: "Session", icon: Clock },
    ],
  },
];

// Teacher Menu - Limited Access
const teacherMenu = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  {
    label: "My Classes",
    icon: BookOpen,
    hasSubmenu: true,
    submenu: [
      { path: "/my-classes", label: "Class List", icon: BookOpen },
      { path: "/my-students", label: "My Students", icon: GraduationCap },
    ],
  },
  {
    label: "Attendance",
    icon: UserCheck,
    hasSubmenu: true,
    submenu: [
      { path: "/attendance/mark", label: "Mark Attendance", icon: UserCheck },
      { path: "/attendance/view", label: "View Attendance", icon: Eye },
    ],
  },
  {
    label: "Examinations",
    icon: ClipboardList,
    hasSubmenu: true,
    submenu: [
      { path: "/exams/marks-entry", label: "Enter Marks", icon: FileText },
      { path: "/exams/results", label: "View Results", icon: Trophy },
    ],
  },
  {
    label: "Timetable",
    icon: Calendar,
    hasSubmenu: true,
    submenu: [{ path: "/timetable/my", label: "My Timetable", icon: Calendar }],
  },
  {
    label: "Communication",
    icon: Mail,
    hasSubmenu: true,
    submenu: [
      { path: "/communication/notice", label: "Notices", icon: Bell },
      { path: "/whatsapp", label: "WhatsApp", icon: MessageSquare },
    ],
  },
];

// Parent Menu - View Only (Child specific)
const parentMenu = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  {
    label: "My Child",
    icon: GraduationCap,
    hasSubmenu: true,
    submenu: [
      { path: "/child/profile", label: "Profile", icon: User },
      { path: "/child/attendance", label: "Attendance", icon: UserCheck },
      { path: "/child/results", label: "Results", icon: Trophy },
      { path: "/child/fees", label: "Fees", icon: DollarSign },
    ],
  },
  {
    label: "School",
    icon: Building2,
    hasSubmenu: true,
    submenu: [
      { path: "/communication/notice", label: "Notices", icon: Bell },
      { path: "/events", label: "Events", icon: Calendar },
      { path: "/whatsapp", label: "WhatsApp", icon: MessageSquare },
    ],
  },
];

// Accountant Menu - Finance Only
const accountantMenu = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  {
    label: "Fees",
    icon: DollarSign,
    hasSubmenu: true,
    submenu: [
      { path: "/fees/collect", label: "Collect Fees", icon: DollarSign },
      { path: "/fees/search-due", label: "Due Fees", icon: Clock },
      { path: "/fees/statement", label: "Statement", icon: Receipt },
    ],
  },
  {
    label: "Accounts",
    icon: Wallet,
    hasSubmenu: true,
    submenu: [
      { path: "/accounts/income", label: "Income", icon: TrendingUp },
      { path: "/accounts/expense", label: "Expense", icon: CreditCard },
      { path: "/accounts/ledger", label: "Ledger", icon: BookOpen },
    ],
  },
  {
    label: "Payroll",
    icon: Banknote,
    hasSubmenu: true,
    submenu: [
      { path: "/salary/payment", label: "Salary Payment", icon: DollarSign },
      { path: "/salary/payslip", label: "Payslip", icon: Receipt },
    ],
  },
  {
    label: "Reports",
    icon: BarChart3,
    hasSubmenu: true,
    submenu: [
      { path: "/reports/financial", label: "Financial", icon: DollarSign },
      { path: "/reports/fees", label: "Fees Report", icon: Receipt },
    ],
  },
  {
    label: "Communication",
    icon: Mail,
    hasSubmenu: true,
    submenu: [{ path: "/whatsapp", label: "WhatsApp", icon: MessageSquare }],
  },
];

// Staff Menu - Limited
const staffMenu = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  {
    label: "My Work",
    icon: Briefcase,
    hasSubmenu: true,
    submenu: [
      { path: "/attendance/my", label: "My Attendance", icon: UserCheck },
      { path: "/salary/payslip", label: "Payslip", icon: Receipt },
    ],
  },
  {
    label: "Communication",
    icon: Mail,
    hasSubmenu: true,
    submenu: [
      { path: "/communication/notice", label: "Notices", icon: Bell },
      { path: "/whatsapp", label: "WhatsApp", icon: MessageSquare },
    ],
  },
];

// Get menu based on role
const getMenuByRole = (role) => {
  switch (role) {
    case "super_admin":
      return superAdminMenu;
    case "school_admin":
      return schoolAdminMenu;
    case "teacher":
      return teacherMenu;
    case "parent":
      return parentMenu;
    case "accountant":
      return accountantMenu;
    case "staff":
      return staffMenu;
    default:
      return schoolAdminMenu;
  }
};

export function Sidebar({ isOpen, setIsOpen }) {
  const { role } = useSelector((state) => state.auth);
  const [expandedMenus, setExpandedMenus] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const menuItems = getMenuByRole(role);

  const toggleMenu = (label) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const filteredNavItems = menuItems.filter((item) => {
    const matchesLabel = item.label
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesSubmenu = item.submenu?.some((sub) =>
      sub.label.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    return matchesLabel || matchesSubmenu;
  });

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          w-64 bg-white border-r border-gray-200 h-screen flex flex-col z-50 shadow-lg
          fixed lg:sticky top-0
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              BrainForge
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1.5 hover:bg-white/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Search Box */}
        <div className="p-3 border-b border-gray-200 bg-gray-50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Menu Label */}
        <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            {role === "super_admin"
              ? "Super Admin"
              : role === "school_admin"
                ? "School Admin"
                : role === "teacher"
                  ? "Teacher Panel"
                  : role === "parent"
                    ? "Parent Panel"
                    : role === "accountant"
                      ? "Accountant Panel"
                      : role === "staff"
                        ? "Staff Panel"
                        : "Main Menu"}
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-2 px-2">
          <ul className="space-y-0.5">
            {filteredNavItems.map((item) => {
              const Icon = item.icon;
              const isExpanded = expandedMenus[item.label];

              if (item.hasSubmenu) {
                return (
                  <li key={item.label}>
                    <button
                      onClick={() => toggleMenu(item.label)}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                      </div>
                      {isExpanded ? (
                        <Minus className="w-3.5 h-3.5 text-gray-400" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 text-gray-400" />
                      )}
                    </button>

                    {isExpanded && (
                      <ul className="mt-1 ml-7 space-y-0.5 border-l-2 border-blue-100 pl-3">
                        {item.submenu.map((subItem) => {
                          const SubIcon = subItem.icon;
                          return (
                            <li key={subItem.path}>
                              <NavLink
                                to={subItem.path}
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) =>
                                  `flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                                    isActive
                                      ? "text-white bg-gradient-to-r from-blue-500 to-indigo-600 font-medium shadow-md"
                                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                                  }`
                                }
                              >
                                {SubIcon && <SubIcon className="w-3.5 h-3.5" />}
                                {subItem.label}
                              </NavLink>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              }

              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                          : "text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50"
                      }`
                    }
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Role Display */}
        <div className="border-t border-gray-200 p-4 bg-gradient-to-b from-white to-gray-50">
          <div className="text-center text-xs text-gray-400">
            Logged in as:{" "}
            <span className="font-semibold text-gray-600 capitalize">
              {role?.replace("_", " ")}
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
