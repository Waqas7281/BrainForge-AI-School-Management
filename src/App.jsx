// src/App.jsx

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MainLayout } from "./components/layout/MainLayout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Unauthorized from "./pages/Unauthorized";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// ==================== COMMON IMPORTS ====================
import Dashboard from "./pages/Dashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import ParentDashboard from "./pages/parent/ParentDashboard";
import StaffDashboard from "./pages/staff/StaffDashboard";
import AccountantDashboard from "./pages/accountant/AccountantDashboard";

// Students
import Students from "./pages/Students";
import AddStudent from "./pages/students/AddStudent";
import StudentDetails from "./pages/students/StudentDetails";
import StudentAdmission from "./pages/students/StudentAdmission";
import PromoteStudents from "./pages/classes/PromoteStudents";
import DisabledStudents from "./pages/students/DisabledStudents";
import Alumni from "./pages/students/Alumni";

// Teachers & Staff
import Teachers from "./pages/Teachers";
import AddTeacher from "./pages/teachers/AddTeacher";
import TeacherDetails from "./pages/teachers/TeacherDetails";
import StaffList from "./pages/staff/StaffList";
import AddStaff from "./pages/staff/AddStaff";

// Classes & Subjects
import ClassList from "./pages/classes/ClassList";
import AddClass from "./pages/classes/AddClass";
import SubjectList from "./pages/subjects/SubjectList";
import AddSubject from "./pages/subjects/AddSubject";

// Attendance
import StudentAttendance from "./pages/attendance/StudentAttendance";
import TeacherAttendance from "./pages/attendance/TeacherAttendance";
import StaffAttendance from "./pages/attendance/StaffAttendance";
import AttendanceReport from "./pages/attendance/AttendanceReport";

// Examinations
import ExamSchedule from "./pages/examinations/ExamSchedule";
import MarksEntry from "./pages/examinations/MarksEntry";
import ResultCard from "./pages/examinations/ResultCard";
import PublishResult from "./pages/examinations/PublishResult";

// Fees
import FeesMaster from "./pages/fees/FeesMaster";
import CollectFees from "./pages/fees/CollectFees";
import SearchDueFees from "./pages/fees/SearchDueFees";
import FeesStatement from "./pages/fees/FeesStatement";

// Accounts
import Income from "./pages/accounts/Income";
import Expense from "./pages/accounts/Expense";
import Ledger from "./pages/accounts/Ledger";

// Payroll
import SalaryGrade from "./pages/salary/SalaryGrade";
import AssignSalary from "./pages/salary/AssignSalary";
import MakePayment from "./pages/salary/MakePayment";
import GeneratePayslip from "./pages/salary/GeneratePayslip";

// Communication
import NoticeBoard from "./pages/communication/NoticeBoard";
import SendEmail from "./pages/communication/SendEmail";
import SendSms from "./pages/communication/SendSms";
import WhatsApp from "./pages/WhatsApp";

// Events & Announcements
import EventList from "./pages/events/EventList";
import AddEvent from "./pages/events/AddEvent";
import EventCalendar from "./pages/events/EventCalendar";
import AddAnnouncement from "./pages/announcements/AddAnnouncement";
import AllAnnouncements from "./pages/announcements/AllAnnouncements";

// Reports
import StudentReport from "./pages/reports/StudentReport";
import AttendanceReportPage from "./pages/reports/AttendanceReport";
import FeesReport from "./pages/reports/FeesReport";
import ExamReport from "./pages/reports/ExamReport";
import FinancialReport from "./pages/reports/FinancialReport";

// Settings
import SchoolSettings from "./pages/settingPages/SchoolSettings";
import AcademicYear from "./pages/settingPages/AcademicYear";
import SessionSettings from "./pages/settingPages/SessionSettings";
import SystemSettings from "./pages/settingPages/SystemSettings";

// System
import RolesPermissions from "./pages/system/RolesPermissions";
import ModuleManager from "./pages/system/ModuleManager";
import Backup from "./pages/system/Backup";

// Other
import AIAssistant from "./pages/AIAssistant";
import NotFound from "./pages/NotFound";

function App() {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  // Role-based root redirect
  const getRootPath = () => {
    switch (role) {
      case "super_admin":
        return "/schools";
      case "school_admin":
        return "/dashboard";
      case "teacher":
        return "/teacher/dashboard";
      case "parent":
        return "/parent/dashboard";
      case "accountant":
        return "/accountant/dashboard";
      case "staff":
        return "/staff/dashboard";
      default:
        return "/dashboard";
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Root Redirect */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to={getRootPath()} replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* ==================== SUPER ADMIN ROUTES ==================== */}
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={["super_admin"]}>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="schools" element={<SchoolSettings />} />
          <Route path="subscriptions" element={<div>Subscriptions</div>} />
          <Route path="system/roles" element={<RolesPermissions />} />
          <Route path="system/modules" element={<ModuleManager />} />
          <Route path="system/backup" element={<Backup />} />
          <Route path="settings/system" element={<SystemSettings />} />
        </Route>

        {/* ==================== SCHOOL ADMIN ROUTES ==================== */}
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={["school_admin"]}>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />

          {/* Students */}
          <Route path="students" element={<Students />} />
          <Route path="students/add" element={<AddStudent />} />
          <Route path="students/:id" element={<StudentDetails />} />
          <Route path="students/admission" element={<StudentAdmission />} />
          <Route path="students/promote" element={<PromoteStudents />} />
          <Route path="students/disable" element={<DisabledStudents />} />
          <Route path="students/alumni" element={<Alumni />} />

          {/* Teachers & Staff */}
          <Route path="teachers" element={<Teachers />} />
          <Route path="teachers/add" element={<AddTeacher />} />
          <Route path="teachers/:id" element={<TeacherDetails />} />
          <Route path="staff" element={<StaffList />} />
          <Route path="staff/add" element={<AddStaff />} />

          {/* Classes & Subjects */}
          <Route path="classes" element={<ClassList />} />
          <Route path="classes/add" element={<AddClass />} />
          <Route path="subjects" element={<SubjectList />} />
          <Route path="subjects/add" element={<AddSubject />} />

          {/* Attendance */}
          <Route path="attendance/student" element={<StudentAttendance />} />
          <Route path="attendance/teacher" element={<TeacherAttendance />} />
          <Route path="attendance/staff" element={<StaffAttendance />} />
          <Route path="attendance/report" element={<AttendanceReport />} />

          {/* Examinations */}
          <Route path="exams/schedule" element={<ExamSchedule />} />
          <Route path="exams/marks-entry" element={<MarksEntry />} />
          <Route path="exams/result-card" element={<ResultCard />} />
          <Route path="exams/publish" element={<PublishResult />} />

          {/* Fees */}
          <Route path="fees/master" element={<FeesMaster />} />
          <Route path="fees/collect" element={<CollectFees />} />
          <Route path="fees/search-due" element={<SearchDueFees />} />
          <Route path="fees/statement" element={<FeesStatement />} />

          {/* Accounts */}
          <Route path="accounts/income" element={<Income />} />
          <Route path="accounts/expense" element={<Expense />} />
          <Route path="accounts/ledger" element={<Ledger />} />

          {/* Payroll */}
          <Route path="salary/grade" element={<SalaryGrade />} />
          <Route path="salary/assign" element={<AssignSalary />} />
          <Route path="salary/payment" element={<MakePayment />} />
          <Route path="salary/payslip" element={<GeneratePayslip />} />

          {/* Communication */}
          <Route path="communication/notice" element={<NoticeBoard />} />
          <Route path="communication/send-email" element={<SendEmail />} />
          <Route path="communication/send-sms" element={<SendSms />} />
          <Route path="whatsapp" element={<WhatsApp />} />

          {/* Events & Announcements */}
          <Route path="events" element={<EventList />} />
          <Route path="events/add" element={<AddEvent />} />
          <Route path="events/calendar" element={<EventCalendar />} />
          <Route path="announcements" element={<AllAnnouncements />} />
          <Route path="announcements/add" element={<AddAnnouncement />} />

          {/* Reports */}
          <Route path="reports/student" element={<StudentReport />} />
          <Route path="reports/attendance" element={<AttendanceReportPage />} />
          <Route path="reports/fees" element={<FeesReport />} />
          <Route path="reports/exam" element={<ExamReport />} />
          <Route path="reports/financial" element={<FinancialReport />} />

          {/* Settings */}
          <Route path="settings/school" element={<SchoolSettings />} />
          <Route path="settings/academic-year" element={<AcademicYear />} />
          <Route path="settings/session" element={<SessionSettings />} />
          <Route path="settings/general" element={<SchoolSettings />} />

          {/* AI Assistant */}
          <Route path="ai-assistant" element={<AIAssistant />} />
        </Route>

        {/* ==================== TEACHER ROUTES ==================== */}
        <Route
          path="/teacher"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<TeacherDashboard />} />
          <Route path="my-classes" element={<ClassList />} />
          <Route path="my-students" element={<Students />} />
          <Route path="attendance/mark" element={<StudentAttendance />} />
          <Route path="attendance/view" element={<AttendanceReportPage />} />
          <Route path="exams/marks-entry" element={<MarksEntry />} />
          <Route path="exams/results" element={<ResultCard />} />
          <Route path="timetable/my" element={<div>My Timetable</div>} />
          <Route path="communication/notice" element={<NoticeBoard />} />
          <Route path="whatsapp" element={<WhatsApp />} />
        </Route>

        {/* ==================== PARENT ROUTES ==================== */}
        <Route
          path="/parent"
          element={
            <ProtectedRoute allowedRoles={["parent"]}>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<ParentDashboard />} />
          <Route path="child/profile" element={<StudentDetails />} />
          <Route path="child/attendance" element={<AttendanceReportPage />} />
          <Route path="child/results" element={<ResultCard />} />
          <Route path="child/fees" element={<FeesStatement />} />
          <Route path="communication/notice" element={<NoticeBoard />} />
          <Route path="events" element={<EventList />} />
          <Route path="whatsapp" element={<WhatsApp />} />
        </Route>

        {/* ==================== ACCOUNTANT ROUTES ==================== */}
        <Route
          path="/accountant"
          element={
            <ProtectedRoute allowedRoles={["accountant"]}>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AccountantDashboard />} />
          <Route path="fees/collect" element={<CollectFees />} />
          <Route path="fees/search-due" element={<SearchDueFees />} />
          <Route path="fees/statement" element={<FeesStatement />} />
          <Route path="accounts/income" element={<Income />} />
          <Route path="accounts/expense" element={<Expense />} />
          <Route path="accounts/ledger" element={<Ledger />} />
          <Route path="salary/payment" element={<MakePayment />} />
          <Route path="salary/payslip" element={<GeneratePayslip />} />
          <Route path="reports/financial" element={<FinancialReport />} />
          <Route path="reports/fees" element={<FeesReport />} />
          <Route path="whatsapp" element={<WhatsApp />} />
        </Route>

        {/* ==================== STAFF ROUTES ==================== */}
        <Route
          path="/staff"
          element={
            <ProtectedRoute allowedRoles={["staff"]}>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<StaffDashboard />} />
          <Route path="attendance/my" element={<StaffAttendance />} />
          <Route path="salary/payslip" element={<GeneratePayslip />} />
          <Route path="communication/notice" element={<NoticeBoard />} />
          <Route path="whatsapp" element={<WhatsApp />} />
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
