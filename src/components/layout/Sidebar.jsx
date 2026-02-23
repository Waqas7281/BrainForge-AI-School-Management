import { NavLink } from "react-router-dom";
import { useState } from "react";
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
  ShoppingBag,
  MessageSquare,
  Mail,
  Video,
  HelpCircle,
  FileQuestion,
  ClipboardList,
  Trophy,
  Award,
  Plus,
  Minus,
  X,
  Search,
} from "lucide-react";

const navItems = [
  {
    path: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "General Settings",
    icon: Settings,
    hasSubmenu: true,
    submenu: [
      { path: "/settings/general", label: "General" },
      { path: "/settings/school", label: "School Settings" },
      { path: "/settings/academic", label: "Academic Year" },
    ],
  },
  {
    label: "Classes",
    icon: BookOpen,
    hasSubmenu: true,
    submenu: [
      { path: "/classes/list", label: "Class List" },
      { path: "/classes/sections", label: "Sections" },
      { path: "/classes/assign", label: "Assign Teachers" },
    ],
  },
  {
    label: "Subjects",
    icon: FileText,
    hasSubmenu: true,
    submenu: [
      { path: "/subjects/list", label: "Subject List" },
      { path: "/subjects/assign", label: "Assign Subject" },
    ],
  },
  {
    label: "Students",
    icon: GraduationCap,
    hasSubmenu: true,
    submenu: [
      { path: "/students", label: "Student List" },
      { path: "/students/add", label: "Add Student" },
      { path: "/students/promote", label: "Promote Students" },
    ],
  },
  {
    label: "Employees",
    icon: Users,
    hasSubmenu: true,
    submenu: [
      { path: "/employees", label: "Employee List" },
      { path: "/employees/add", label: "Add Employee" },
      { path: "/employees/roles", label: "Employee Roles" },
    ],
  },
  {
    label: "Accounts",
    icon: Wallet,
    hasSubmenu: true,
    submenu: [
      { path: "/accounts/income", label: "Income" },
      { path: "/accounts/expense", label: "Expense" },
      { path: "/accounts/ledger", label: "Ledger" },
    ],
  },
  {
    label: "Fees",
    icon: DollarSign,
    hasSubmenu: true,
    submenu: [
      { path: "/fees/structure", label: "Fee Structure" },
      { path: "/fees/collect", label: "Collect Fees" },
      { path: "/fees/invoice", label: "Fee Invoice" },
    ],
  },
  {
    label: "Salary",
    icon: Wallet,
    hasSubmenu: true,
    submenu: [
      { path: "/salary/structure", label: "Salary Structure" },
      { path: "/salary/payment", label: "Salary Payment" },
      { path: "/salary/payslip", label: "Payslip" },
    ],
  },
  {
    label: "Attendance",
    icon: UserCheck,
    hasSubmenu: true,
    submenu: [
      { path: "/attendance/students", label: "Student Attendance" },
      { path: "/attendance/employees", label: "Employee Attendance" },
      { path: "/attendance/report", label: "Attendance Report" },
    ],
  },
  {
    label: "Timetable",
    icon: Calendar,
    hasSubmenu: true,
    submenu: [
      { path: "/timetable/create", label: "Create Timetable" },
      { path: "/timetable/view", label: "View Timetable" },
    ],
  },
  {
    label: "Homework",
    icon: BookMarked,
    hasSubmenu: true,
    submenu: [
      { path: "/homework/create", label: "Create Homework" },
      { path: "/homework/list", label: "Homework List" },
    ],
  },
  {
    label: "Behaviour & Skills",
    icon: Eye,
    hasSubmenu: true,
    submenu: [
      { path: "/behaviour/incidents", label: "Incidents" },
      { path: "/behaviour/skills", label: "Skills" },
    ],
  },
  {
    label: "Online Store & POS",
    icon: ShoppingBag,
    hasSubmenu: true,
    submenu: [
      { path: "/store/products", label: "Products" },
      { path: "/store/orders", label: "Orders" },
    ],
  },
  {
    path: "/whatsapp",
    label: "WhatsApp",
    icon: MessageSquare,
    badge: "New",
  },
  {
    label: "Messaging",
    icon: Mail,
    hasSubmenu: true,
    submenu: [
      { path: "/messaging/compose", label: "Compose" },
      { path: "/messaging/inbox", label: "Inbox" },
    ],
  },
  {
    label: "SMS Services",
    icon: MessageSquare,
    hasSubmenu: true,
    submenu: [
      { path: "/sms/send", label: "Send SMS" },
      { path: "/sms/history", label: "SMS History" },
    ],
  },
  {
    label: "Live Class",
    icon: Video,
    hasSubmenu: true,
    submenu: [
      { path: "/live/create", label: "Create Class" },
      { path: "/live/list", label: "Class List" },
    ],
  },
  {
    label: "Question Paper",
    icon: FileQuestion,
    hasSubmenu: true,
    submenu: [
      { path: "/question/create", label: "Create Paper" },
      { path: "/question/list", label: "Paper List" },
    ],
  },
  {
    label: "Exams",
    icon: ClipboardList,
    hasSubmenu: true,
    submenu: [
      { path: "/examinations", label: "Exam List" },
      { path: "/exams/schedule", label: "Exam Schedule" },
      { path: "/exams/marks", label: "Marks Entry" },
    ],
  },
  {
    label: "Class Tests",
    icon: FileText,
    hasSubmenu: true,
    submenu: [
      { path: "/tests/create", label: "Create Test" },
      { path: "/tests/list", label: "Test List" },
    ],
  },
  {
    label: "Reports",
    icon: FileText,
    hasSubmenu: true,
    submenu: [
      { path: "/reports", label: "All Reports" },
      { path: "/reports/attendance", label: "Attendance Report" },
      { path: "/reports/financial", label: "Financial Report" },
    ],
  },
  {
    label: "Certificates",
    icon: Award,
    hasSubmenu: true,
    submenu: [
      { path: "/certificates/templates", label: "Templates" },
      { path: "/certificates/generate", label: "Generate" },
    ],
  },
];

export function Sidebar({ isOpen, setIsOpen }) {
  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleMenu = (label) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          w-60 bg-white border-r border-gray-200 h-screen flex flex-col z-50
          fixed lg:sticky top-0
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo & Close Button */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              BrainForge
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Menu Label */}
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              menu
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-2 px-2">
          <ul className="space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isExpanded = expandedMenus[item.label];

              if (item.hasSubmenu) {
                return (
                  <li key={item.label}>
                    {/* Parent Menu Item */}
                    <button
                      onClick={() => toggleMenu(item.label)}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        {item.badge && (
                          <span className="px-1.5 py-0.5 bg-red-500 text-white text-xs rounded">
                            {item.badge}
                          </span>
                        )}
                        {isExpanded ? (
                          <Minus className="w-3.5 h-3.5 text-gray-400" />
                        ) : (
                          <Plus className="w-3.5 h-3.5 text-gray-400" />
                        )}
                      </div>
                    </button>

                    {/* Submenu */}
                    {isExpanded && (
                      <ul className="mt-1 ml-7 space-y-0.5 border-l-2 border-gray-100 pl-3">
                        {item.submenu.map((subItem) => (
                          <li key={subItem.path}>
                            <NavLink
                              to={subItem.path}
                              onClick={() => setIsOpen(false)}
                              className={({ isActive }) =>
                                `block px-3 py-2 rounded-lg text-sm transition-colors ${
                                  isActive
                                    ? "text-blue-600 bg-blue-50 font-medium"
                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                }`
                              }
                            >
                              {subItem.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              }

              // Regular menu item (no submenu)
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors group ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                          : "text-gray-700 hover:bg-gray-50"
                      }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 bg-red-500 text-white text-xs rounded">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 p-4">
          {/* Search */}
          <div className="mb-3">
            <button className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
              <Search className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Search</span>
            </button>
          </div>

          {/* Promo Box */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-4 text-white text-center">
            <h4 className="font-bold text-sm mb-1">Need More Advance?</h4>
            <p className="text-xs opacity-90 mb-3">
              Check our PRO version. An ultimate education management ERP with
              all advance features.
            </p>
            <button className="w-full bg-white text-purple-600 text-xs font-semibold py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors">
              Try Demo
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
