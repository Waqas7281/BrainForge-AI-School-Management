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
  Building2,
  Globe,
  Bell,
  Lock,
  Database,
  Upload,
  Download,
  Printer,
  PieChart,
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
  Utensils,
  Heart,
  Stethoscope,
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
  PlayCircle,
  GitBranch,
} from "lucide-react";

const navItems = [
  {
    path: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
  },

  // ==================== GENERAL SETTINGS ====================
  {
    label: "General Settings",
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
      { path: "/settings/language", label: "Language Settings", icon: Globe },
      { path: "/settings/timezone", label: "Timezone", icon: Clock },
      { path: "/settings/email", label: "Email Settings", icon: Mail },
      { path: "/settings/backup", label: "Backup & Restore", icon: Database },
      { path: "/settings/system", label: "System Settings", icon: Settings },
    ],
  },

  // ==================== CLASSES ====================
  {
    label: "Classes",
    icon: BookOpen,
    hasSubmenu: true,
    submenu: [
      { path: "/classes", label: "All Classes", icon: BookOpen },
      { path: "/classes/add", label: "Add New Class", icon: Plus },
      { path: "/classes/sections", label: "Class Sections", icon: GitBranch },
      { path: "/classes/promote", label: "Promote Students", icon: TrendingUp },
      {
        path: "/classes/assign-teacher",
        label: "Assign Class Teacher",
        icon: UserCheck,
      },
    ],
  },

  // ==================== SUBJECTS ====================
  {
    label: "Subjects",
    icon: FileText,
    hasSubmenu: true,
    submenu: [
      { path: "/subjects", label: "All Subjects", icon: FileText },
      { path: "/subjects/add", label: "Add New Subject", icon: Plus },
      {
        path: "/subjects/assign",
        label: "Assign Subject to Class",
        icon: BookOpen,
      },
      {
        path: "/subjects/teachers",
        label: "Assign Subject to Teacher",
        icon: UserCheck,
      },
    ],
  },

  // ==================== STUDENTS ====================
  {
    label: "Students",
    icon: GraduationCap,
    hasSubmenu: true,
    submenu: [
      { path: "/students", label: "All Students", icon: GraduationCap },
      { path: "/students/add", label: "Add New Student", icon: UserPlus },
      { path: "/students/admission", label: "Student Admission", icon: Plus },
      {
        path: "/students/promote",
        label: "Promote Students",
        icon: TrendingUp,
      },
      {
        path: "/students/certificate",
        label: "Generate Certificate",
        icon: Award,
      },
      {
        path: "/students/id-card",
        label: "Generate ID Card",
        icon: CreditCard,
      },
      { path: "/students/transfer", label: "Transfer Certificate", icon: Send },
      { path: "/students/documents", label: "Student Documents", icon: Upload },
      { path: "/students/history", label: "Student History", icon: History },
      {
        path: "/students/disable",
        label: "Disabled Students",
        icon: UserMinus,
      },
      { path: "/students/alumni", label: "Alumni", icon: Users },
    ],
  },

  // ==================== PARENTS ====================
  {
    label: "Parents",
    icon: Users,
    hasSubmenu: true,
    submenu: [
      { path: "/parents", label: "All Parents", icon: Users },
      { path: "/parents/add", label: "Add New Parent", icon: UserPlus },
      {
        path: "/parents/mapping",
        label: "Parent-Student Mapping",
        icon: GitBranch,
      },
    ],
  },

  // ==================== TEACHERS / EMPLOYEES ====================
  {
    label: "Teachers",
    icon: UserCheck,
    hasSubmenu: true,
    submenu: [
      { path: "/teachers", label: "All Teachers", icon: UserCheck },
      { path: "/teachers/add", label: "Add New Teacher", icon: UserPlus },
      { path: "/teachers/roles", label: "Teacher Roles", icon: Shield },
      { path: "/teachers/departments", label: "Departments", icon: Building2 },
      { path: "/teachers/designations", label: "Designations", icon: Award },
      {
        path: "/teachers/id-card",
        label: "Generate ID Card",
        icon: CreditCard,
      },
      {
        path: "/teachers/disabled",
        label: "Disabled Teachers",
        icon: UserMinus,
      },
    ],
  },

  // ==================== STAFF ====================
  {
    label: "Staff",
    icon: Briefcase,
    hasSubmenu: true,
    submenu: [
      { path: "/staff", label: "All Staff", icon: Briefcase },
      { path: "/staff/add", label: "Add New Staff", icon: UserPlus },
      { path: "/staff/roles", label: "Staff Roles", icon: Shield },
      { path: "/staff/disabled", label: "Disabled Staff", icon: UserMinus },
    ],
  },

  // ==================== HUMAN RESOURCE ====================
  {
    label: "Human Resource",
    icon: Users,
    hasSubmenu: true,
    submenu: [
      { path: "/hr/leave-types", label: "Leave Types", icon: Calendar },
      { path: "/hr/leave-requests", label: "Leave Requests", icon: Clock },
      { path: "/hr/approve-leave", label: "Approve Leave", icon: UserCheck },
      {
        path: "/hr/leave-allocations",
        label: "Leave Allocations",
        icon: Package,
      },
      { path: "/hr/payroll", label: "Payroll", icon: Wallet },
    ],
  },

  // ==================== ACCOUNTS ====================
  {
    label: "Accounts",
    icon: Wallet,
    hasSubmenu: true,
    submenu: [
      { path: "/accounts/chart", label: "Chart of Accounts", icon: BarChart3 },
      { path: "/accounts/income", label: "Income", icon: TrendingUp },
      { path: "/accounts/income-head", label: "Income Head", icon: FileText },
      { path: "/accounts/expense", label: "Expense", icon: CreditCard },
      { path: "/accounts/expense-head", label: "Expense Head", icon: FileText },
      { path: "/accounts/ledger", label: "Ledger", icon: BookOpen },
      {
        path: "/accounts/balance-sheet",
        label: "Balance Sheet",
        icon: PieChart,
      },
      {
        path: "/accounts/trial-balance",
        label: "Trial Balance",
        icon: BarChart3,
      },
      {
        path: "/accounts/profit-loss",
        label: "Profit & Loss",
        icon: TrendingUp,
      },
    ],
  },

  // ==================== FEES ====================
  {
    label: "Fees Collection",
    icon: DollarSign,
    hasSubmenu: true,
    submenu: [
      { path: "/fees/master", label: "Fees Master", icon: Database },
      { path: "/fees/group", label: "Fees Group", icon: Package },
      { path: "/fees/type", label: "Fees Type", icon: Tag },
      { path: "/fees/discount", label: "Fees Discount", icon: Percent },
      { path: "/fees/carry-forward", label: "Fees Carry Forward", icon: Send },
      { path: "/fees/reminder", label: "Fees Reminder", icon: Bell },
      { path: "/fees/collect", label: "Collect Fees", icon: DollarSign },
      {
        path: "/fees/search-payment",
        label: "Search Fee Payment",
        icon: Search,
      },
      { path: "/fees/search-due", label: "Search Due Fees", icon: Clock },
      { path: "/fees/statement", label: "Fees Statement", icon: Receipt },
      { path: "/fees/balance", label: "Balance Fees Report", icon: Wallet },
    ],
  },

  // ==================== SALARY ====================
  {
    label: "Payroll",
    icon: Banknote,
    hasSubmenu: true,
    submenu: [
      { path: "/salary/grade", label: "Salary Grade", icon: Award },
      { path: "/salary/template", label: "Salary Template", icon: FileText },
      { path: "/salary/assign", label: "Assign Salary", icon: Users },
      { path: "/salary/payment", label: "Make Payment", icon: DollarSign },
      { path: "/salary/payslip", label: "Generate Payslip", icon: Receipt },
      { path: "/salary/search", label: "Search Payment", icon: Search },
    ],
  },

  // ==================== ATTENDANCE ====================
  {
    label: "Attendance",
    icon: UserCheck,
    hasSubmenu: true,
    submenu: [
      {
        path: "/attendance/student",
        label: "Student Attendance",
        icon: GraduationCap,
      },
      {
        path: "/attendance/student-approve",
        label: "Approve Leave (Student)",
        icon: UserCheck,
      },
      {
        path: "/attendance/teacher",
        label: "Teacher Attendance",
        icon: UserCheck,
      },
      { path: "/attendance/staff", label: "Staff Attendance", icon: Briefcase },
      {
        path: "/attendance/biometric",
        label: "Biometric Attendance",
        icon: Eye,
      },
      {
        path: "/attendance/report",
        label: "Attendance Report",
        icon: BarChart3,
      },
      {
        path: "/attendance/summary",
        label: "Attendance Summary",
        icon: PieChart,
      },
    ],
  },

  // ==================== TIMETABLE ====================
  {
    label: "Timetable",
    icon: Calendar,
    hasSubmenu: true,
    submenu: [
      { path: "/timetable/class", label: "Class Timetable", icon: BookOpen },
      {
        path: "/timetable/teacher",
        label: "Teacher Timetable",
        icon: UserCheck,
      },
      { path: "/timetable/assign", label: "Assign Subject", icon: FileText },
    ],
  },

  // ==================== HOMEWORK ====================
  {
    label: "Homework",
    icon: BookMarked,
    hasSubmenu: true,
    submenu: [
      { path: "/homework/add", label: "Add Homework", icon: Plus },
      { path: "/homework/list", label: "Homework List", icon: BookMarked },
      {
        path: "/homework/evaluate",
        label: "Evaluate Homework",
        icon: UserCheck,
      },
    ],
  },

  // ==================== ASSIGNMENTS ====================
  {
    label: "Assignments",
    icon: FileText,
    hasSubmenu: true,
    submenu: [
      { path: "/assignments/add", label: "Add Assignment", icon: Plus },
      { path: "/assignments/list", label: "Assignment List", icon: FileText },
      {
        path: "/assignments/submissions",
        label: "View Submissions",
        icon: Inbox,
      },
      { path: "/assignments/grade", label: "Grade Assignments", icon: Award },
    ],
  },

  // ==================== EXAMINATIONS ====================
  {
    label: "Examinations",
    icon: ClipboardList,
    hasSubmenu: true,
    submenu: [
      { path: "/exams/exam-group", label: "Exam Group", icon: Package },
      { path: "/exams/exam-schedule", label: "Exam Schedule", icon: Calendar },
      { path: "/exams/exam-hall", label: "Exam Hall", icon: Building2 },
      { path: "/exams/marks-grade", label: "Marks Grade", icon: Award },
      { path: "/exams/marks-entry", label: "Marks Entry", icon: FileText },
      {
        path: "/exams/marks-register",
        label: "Marks Register",
        icon: BookOpen,
      },
      { path: "/exams/result-card", label: "Result Card", icon: Trophy },
      { path: "/exams/result-publish", label: "Publish Result", icon: Send },
      { path: "/exams/admit-card", label: "Admit Card", icon: CreditCard },
      { path: "/exams/seat-plan", label: "Seat Plan", icon: MapPin },
    ],
  },

  // ==================== ONLINE EXAM ====================
  {
    label: "Online Exam",
    icon: FileQuestion,
    hasSubmenu: true,
    submenu: [
      {
        path: "/online-exam/question-bank",
        label: "Question Bank",
        icon: Database,
      },
      {
        path: "/online-exam/question-group",
        label: "Question Group",
        icon: Package,
      },
      { path: "/online-exam/create", label: "Create Online Exam", icon: Plus },
      {
        path: "/online-exam/list",
        label: "Online Exam List",
        icon: FileQuestion,
      },
      { path: "/online-exam/marks", label: "Online Exam Marks", icon: Award },
    ],
  },

  // ==================== BEHAVIOUR & SKILLS ====================
  {
    label: "Behaviour & Skills",
    icon: Eye,
    hasSubmenu: true,
    submenu: [
      { path: "/behaviour/assign", label: "Assign Incident", icon: Plus },
      { path: "/behaviour/incident-list", label: "Incident List", icon: Flag },
      { path: "/behaviour/report", label: "Incident Report", icon: BarChart3 },
      { path: "/behaviour/skills", label: "Skills", icon: Star },
      {
        path: "/behaviour/assign-skills",
        label: "Assign Skills",
        icon: UserCheck,
      },
    ],
  },

  // ==================== LIBRARY ====================
  {
    label: "Library",
    icon: BookOpen,
    hasSubmenu: true,
    submenu: [
      { path: "/library/books", label: "Book List", icon: BookOpen },
      { path: "/library/add-book", label: "Add New Book", icon: Plus },
      { path: "/library/categories", label: "Book Categories", icon: Package },
      { path: "/library/issue", label: "Issue Book", icon: Send },
      { path: "/library/return", label: "Return Book", icon: Download },
      { path: "/library/member", label: "Library Members", icon: Users },
      { path: "/library/card", label: "Library Card", icon: CreditCard },
    ],
  },

  // ==================== TRANSPORT ====================
  {
    label: "Transport",
    icon: Car,
    hasSubmenu: true,
    submenu: [
      { path: "/transport/routes", label: "Routes", icon: MapPin },
      { path: "/transport/vehicles", label: "Vehicles", icon: Car },
      { path: "/transport/assign", label: "Assign Vehicle", icon: UserCheck },
      { path: "/transport/driver", label: "Drivers", icon: Users },
    ],
  },

  // ==================== HOSTEL ====================
  {
    label: "Hostel",
    icon: Home,
    hasSubmenu: true,
    submenu: [
      { path: "/hostel/list", label: "Hostel List", icon: Home },
      { path: "/hostel/room-type", label: "Room Type", icon: Package },
      { path: "/hostel/rooms", label: "Hostel Rooms", icon: Building2 },
      { path: "/hostel/allocation", label: "Room Allocation", icon: UserCheck },
      { path: "/hostel/member", label: "Hostel Members", icon: Users },
    ],
  },

  // ==================== INVENTORY ====================
  {
    label: "Inventory",
    icon: Package,
    hasSubmenu: true,
    submenu: [
      { path: "/inventory/category", label: "Item Category", icon: Tag },
      { path: "/inventory/items", label: "Item List", icon: Package },
      { path: "/inventory/store", label: "Item Store", icon: Building2 },
      { path: "/inventory/supplier", label: "Item Supplier", icon: Users },
      {
        path: "/inventory/purchase",
        label: "Item Purchase",
        icon: ShoppingCart,
      },
      { path: "/inventory/issue", label: "Item Issue", icon: Send },
      { path: "/inventory/stock", label: "Item Stock", icon: Database },
    ],
  },

  // ==================== CANTEEN ====================
  {
    label: "Canteen",
    icon: Utensils,
    hasSubmenu: true,
    submenu: [
      { path: "/canteen/menu", label: "Canteen Menu", icon: FileText },
      { path: "/canteen/orders", label: "Orders", icon: ShoppingCart },
      { path: "/canteen/items", label: "Menu Items", icon: Package },
    ],
  },

  // ==================== FRONT OFFICE ====================
  {
    label: "Front Office",
    icon: Building2,
    hasSubmenu: true,
    submenu: [
      { path: "/front-office/visitor", label: "Visitor Book", icon: Users },
      {
        path: "/front-office/call-log",
        label: "Phone Call Log",
        icon: MessageSquare,
      },
      {
        path: "/front-office/postal-dispatch",
        label: "Postal Dispatch",
        icon: Send,
      },
      {
        path: "/front-office/postal-receive",
        label: "Postal Receive",
        icon: Inbox,
      },
      { path: "/front-office/complain", label: "Complain", icon: Flag },
      {
        path: "/front-office/admission-enquiry",
        label: "Admission Enquiry",
        icon: HelpCircle,
      },
    ],
  },

  // ==================== ONLINE STORE & POS ====================
  {
    label: "Online Store & POS",
    icon: ShoppingBag,
    hasSubmenu: true,
    submenu: [
      { path: "/store/categories", label: "Categories", icon: Package },
      { path: "/store/products", label: "Products", icon: ShoppingBag },
      { path: "/store/orders", label: "Orders", icon: ShoppingCart },
      { path: "/store/pos", label: "POS", icon: CreditCard },
    ],
  },

  // ==================== WHATSAPP ====================
  {
    path: "/whatsapp",
    label: "WhatsApp",
    icon: MessageSquare,
    badge: "New",
  },

  // ==================== COMMUNICATION ====================
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
      { path: "/communication/email-log", label: "Email Log", icon: History },
      { path: "/communication/sms-log", label: "SMS Log", icon: History },
    ],
  },

  // ==================== LIVE CLASS ====================
  {
    label: "Live Classes",
    icon: Video,
    hasSubmenu: true,
    submenu: [
      { path: "/live-class/zoom", label: "Zoom Live Class", icon: Video },
      { path: "/live-class/settings", label: "Settings", icon: Settings },
      { path: "/live-class/reports", label: "Class Reports", icon: BarChart3 },
    ],
  },

  // ==================== CONTENT ====================
  {
    label: "Download Center",
    icon: Download,
    hasSubmenu: true,
    submenu: [
      { path: "/download/content", label: "Upload Content", icon: Upload },
      { path: "/download/assignment", label: "Assignments", icon: FileText },
      {
        path: "/download/study-material",
        label: "Study Material",
        icon: BookOpen,
      },
      { path: "/download/syllabus", label: "Syllabus", icon: FileText },
      { path: "/download/other", label: "Other Downloads", icon: Download },
    ],
  },

  // ==================== GALLERY ====================
  {
    label: "Gallery",
    icon: Image,
    hasSubmenu: true,
    submenu: [
      { path: "/gallery/photo", label: "Photo Gallery", icon: Image },
      { path: "/gallery/video", label: "Video Gallery", icon: Film },
    ],
  },

  // ==================== EVENTS ====================
  {
    label: "Events",
    icon: Calendar,
    hasSubmenu: true,
    submenu: [
      { path: "/events/list", label: "Event List", icon: Calendar },
      { path: "/events/add", label: "Add Event", icon: Plus },
      { path: "/events/calendar", label: "Event Calendar", icon: Calendar },
    ],
  },

  // ==================== ANNOUNCEMENTS ====================
  {
    label: "Announcements",
    icon: Bell,
    hasSubmenu: true,
    submenu: [
      { path: "/announcements/list", label: "All Announcements", icon: Bell },
      { path: "/announcements/add", label: "Add Announcement", icon: Plus },
      { path: "/announcements/send", label: "Send Announcement", icon: Send },
    ],
  },

  // ==================== NEWS ====================
  {
    label: "News",
    icon: Newspaper,
    hasSubmenu: true,
    submenu: [
      { path: "/news/list", label: "News List", icon: Newspaper },
      { path: "/news/add", label: "Add News", icon: Plus },
      { path: "/news/categories", label: "News Categories", icon: Package },
    ],
  },

  // ==================== REPORTS ====================
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
      {
        path: "/reports/attendance",
        label: "Attendance Report",
        icon: UserCheck,
      },
      {
        path: "/reports/financial",
        label: "Financial Report",
        icon: DollarSign,
      },
      { path: "/reports/exam", label: "Exam Report", icon: ClipboardList },
      { path: "/reports/fees", label: "Fees Report", icon: Receipt },
      { path: "/reports/salary", label: "Salary Report", icon: Wallet },
      { path: "/reports/library", label: "Library Report", icon: BookOpen },
      { path: "/reports/inventory", label: "Inventory Report", icon: Package },
      { path: "/reports/transport", label: "Transport Report", icon: Car },
      { path: "/reports/custom", label: "Custom Report", icon: FileText },
    ],
  },

  // ==================== CERTIFICATES ====================
  {
    label: "Certificates",
    icon: Award,
    hasSubmenu: true,
    submenu: [
      {
        path: "/certificates/student",
        label: "Student Certificate",
        icon: GraduationCap,
      },
      {
        path: "/certificates/generate",
        label: "Generate Certificate",
        icon: Plus,
      },
      {
        path: "/certificates/design",
        label: "Certificate Design",
        icon: FileText,
      },
    ],
  },

  // ==================== SYSTEM SETTINGS ====================
  {
    label: "System Settings",
    icon: Settings,
    hasSubmenu: true,
    submenu: [
      { path: "/system/general", label: "General", icon: Settings },
      { path: "/system/roles", label: "Roles & Permissions", icon: Shield },
      { path: "/system/backup", label: "Backup", icon: Database },
      { path: "/system/modules", label: "Module Manager", icon: Package },
      { path: "/system/custom-fields", label: "Custom Fields", icon: FileText },
      { path: "/system/currency", label: "Currency", icon: DollarSign },
    ],
  },
];

export function Sidebar({ isOpen, setIsOpen }) {
  const [expandedMenus, setExpandedMenus] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = (label) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  // Filter menu items based on search
  const filteredNavItems = navItems.filter((item) => {
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
          w-64 bg-white border-r border-gray-200 h-screen flex flex-col z-50 shadow-lg
          fixed lg:sticky top-0
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo & Close Button */}
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
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Menu Label */}
        <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Main Menu
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-2 px-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <ul className="space-y-0.5">
            {filteredNavItems.map((item) => {
              const Icon = item.icon;
              const isExpanded = expandedMenus[item.label];

              if (item.hasSubmenu) {
                return (
                  <li key={item.label}>
                    {/* Parent Menu Item */}
                    <button
                      onClick={() => toggleMenu(item.label)}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-gray-500 group-hover:text-blue-600 transition-colors" />
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        {item.badge && (
                          <span className="px-2 py-0.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-semibold rounded-full shadow-sm">
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

              // Regular menu item (no submenu)
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2.5 rounded-lg transition-all group ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                          : "text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50"
                      }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="px-2 py-0.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-semibold rounded-full shadow-sm">
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
        <div className="border-t border-gray-200 p-4 bg-gradient-to-b from-white to-gray-50">
          {/* Promo Box */}
          <div className="bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600 rounded-xl p-4 text-white text-center shadow-lg">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-bold text-sm mb-1">Upgrade to PRO</h4>
            <p className="text-xs opacity-90 mb-3 leading-relaxed">
              Unlock all features with our PRO version
            </p>
            <button className="w-full bg-white text-purple-600 text-xs font-bold py-2.5 px-4 rounded-lg hover:bg-gray-50 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              Try Demo →
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
