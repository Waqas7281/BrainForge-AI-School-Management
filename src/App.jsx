import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import Attendance from "./pages/Attendance";
import Examinations from "./pages/Examinations";
import Assignments from "./pages/Assignments";
import Fees from "./pages/Fees";
import Library from "./pages/Library";
import Transport from "./pages/Transport";
import Notices from "./pages/Notices";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import AIAssistant from "./pages/AIAssistant";
import NotFound from "./pages/NotFound";

// Settings Pages
import SchoolSettings from "./pages/settingPages/SchoolSettings";
import AcademicYear from "./pages/settingPages/AcademicYear";
import SessionSettings from "./pages/settingPages/SessionSettings";
import LanguageSettings from "./pages/settingPages/LanguageSettings";
import TimezoneSettings from "./pages/settingPages/TimezoneSettings";
import EmailSettings from "./pages/settingPages/EmailSettings";
import BackupRestore from "./pages/settingPages/BackupRestore";
import SystemSettings from "./pages/settingPages/SystemSettings";

// Classes Pages
import ClassList from "./pages/classes/ClassList";
import AddClass from "./pages/classes/AddClass";
import ClassSections from "./pages/classes/ClassSections";
import PromoteStudents from "./pages/classes/PromoteStudents";
import AssignClassTeacher from "./pages/classes/AssignClassTeacher";

// Subjects Pages
import SubjectList from "./pages/subjects/SubjectList";
import AddSubject from "./pages/subjects/AddSubject";
import AssignSubjectToClass from "./pages/subjects/AssignSubjectToClass";
import AssignSubjectToTeacher from "./pages/subjects/AssignSubjectToTeacher";

// Students Pages
import AddStudent from "./pages/students/AddStudent";
import StudentDetails from "./pages/students/StudentDetails";
import StudentAdmission from "./pages/students/StudentAdmission";
import GenerateCertificate from "./pages/students/GenerateCertificate";
import GenerateIdCard from "./pages/students/GenerateIdCard";
import TransferCertificate from "./pages/students/TransferCertificate";
import StudentDocuments from "./pages/students/StudentDocuments";
import StudentHistory from "./pages/students/StudentHistory";
import DisabledStudents from "./pages/students/DisabledStudents";
import Alumni from "./pages/students/Alumni";

//teachers Pages
import AddTeacher from "./pages/teachers/AddTeacher";
import TeacherDetails from "./pages/teachers/TeacherDetails";
import Departments from "./pages/teachers/Departments";
import Designations from "./pages/teachers/Designations";
import TeacherIdCard from "./pages/teachers/TeacherIdCard";
import DisabledTeachers from "./pages/teachers/DisabledTeachers";

//staff Pages
import StaffList from "./pages/staff/StaffList";
import AddStaff from "./pages/staff/AddStaff";
import StaffDetails from "./pages/staff/StaffDetails";
import StaffRoles from "./pages/staff/StaffRoles";
import DisabledStaff from "./pages/staff/DisabledStaff";

// accounts pages
import IncomeHead from "./pages/accounts/IncomeHead";
import ExpenseHead from "./pages/accounts/ExpenseHead";
import Income from "./pages/accounts/Income";
import Expense from "./pages/accounts/Expense";
import Ledger from "./pages/accounts/Ledger";

//Fee Pages
import FeesGroup from "./pages/fees/FeesGroup";
import FeesType from "./pages/fees/FeesType";
import FeesMaster from "./pages/fees/FeesMaster";
import CollectFees from "./pages/fees/CollectFees";
import SearchDueFees from "./pages/fees/SearchDueFees";
import FeesStatement from "./pages/fees/FeesStatement";
import SearchFeePayment from "./pages/fees/SearchFeePayment";

//Salary Pages
import SalaryGrade from "./pages/salary/SalaryGrade";
import AssignSalary from "./pages/salary/AssignSalary";
import MakePayment from "./pages/salary/MakePayment";
import GeneratePayslip from "./pages/salary/GeneratePayslip";
import SearchPayment from "./pages/salary/SearchPayment";

//Attendence Routes
import StudentAttendance from "./pages/attendance/StudentAttendance";
import TeacherAttendance from "./pages/attendance/TeacherAttendance";
import StaffAttendance from "./pages/attendance/StaffAttendance";
import AttendanceReport from "./pages/attendance/AttendanceReport";


//timeTable
import AssignSubject from "./pages/timetable/AssignSubject";
import ClassTimetable from "./pages/timetable/ClassTimetable";
import TeacherTimetable from "./pages/timetable/TeacherTimetable";

// examination pages
import MarksGrade from './pages/examinations/MarksGrade';
import ExamSchedule from './pages/examinations/ExamSchedule';
import MarksEntry from './pages/examinations/MarksEntry';
import ResultCard from './pages/examinations/ResultCard';
import PublishResult from './pages/examinations/PublishResult';
//whatsapp
import WhatsApp from "./pages/WhatsApp";

//communication
import NoticeBoard from "./pages/communication/NoticeBoard";
import SendEmail from "./pages/communication/SendEmail";
import SendSms from "./pages/communication/SendSms";

// events
import AddEvent from "./pages/events/AddEvent";
import EventList from "./pages/events/EventList";
import EventCalendar from "./pages/events/EventCalendar";

// announcements
import AddAnnouncement from './pages/announcements/AddAnnouncement';
import AllAnnouncements from './pages/announcements/AllAnnouncements';
import SendAnnouncement from './pages/announcements/SendAnnouncement';

// ==================== REPORTS ====================
import StudentReport from './pages/reports/StudentReport';
import AttendanceReportPage from './pages/reports/AttendanceReport';
import FeesReport from './pages/reports/FeesReport';
import ExamReport from './pages/reports/ExamReport';
import FinancialReport from './pages/reports/FinancialReport';

// ==================== CERTIFICATES ====================
import GenerateCertificatePage from './pages/certificates/GenerateCertificate';
import StudentCertificate from './pages/certificates/StudentCertificate';
import CertificateDesign from './pages/certificates/CertificateDesign';

// ==================== SYSTEM SETTINGS ====================
import RolesPermissions from './pages/system/RolesPermissions';
import ModuleManager from './pages/system/ModuleManager';
import Backup from './pages/system/Backup';




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Dashboard */}
          <Route index element={<Dashboard />} />
          {/* Student Management */}
          <Route path="students" element={<Students />} />
          <Route path="students/add" element={<AddStudent />} />
          <Route path="students/:id" element={<StudentDetails />} />
          <Route path="students/admission" element={<StudentAdmission />} />
          <Route path="students/promote" element={<PromoteStudents />} />
          <Route
            path="students/certificate"
            element={<GenerateCertificate />}
          />
          <Route path="students/id-card" element={<GenerateIdCard />} />
          <Route path="students/transfer" element={<TransferCertificate />} />
          <Route path="students/documents" element={<StudentDocuments />} />
          <Route path="students/history" element={<StudentHistory />} />
          <Route path="students/disable" element={<DisabledStudents />} />
          <Route path="students/alumni" element={<Alumni />} />
          {/* Teacher Management */}
          <Route path="teachers" element={<Teachers />} />
          <Route path="teachers/add" element={<AddTeacher />} />
          <Route path="teachers/:id" element={<TeacherDetails />} />
          <Route path="teachers/departments" element={<Departments />} />
          <Route path="teachers/designations" element={<Designations />} />
          <Route path="teachers/id-card" element={<TeacherIdCard />} />
          <Route path="teachers/disabled" element={<DisabledTeachers />} />
          //Staff Management
          <Route path="staff" element={<StaffList />} />
          <Route path="staff/add" element={<AddStaff />} />
          <Route path="staff/:id" element={<StaffDetails />} />
          <Route path="staff/roles" element={<StaffRoles />} />
          <Route path="staff/disabled" element={<DisabledStaff />} />
          //Attendance Routes
          <Route path="attendance/student" element={<StudentAttendance />} />
          <Route path="attendance/teacher" element={<TeacherAttendance />} />
          <Route path="attendance/staff" element={<StaffAttendance />} />
          <Route path="attendance/report" element={<AttendanceReport />} />
          //Timetable Routes
          <Route path="timetable/assign" element={<AssignSubject />} />
          <Route path="timetable/class" element={<ClassTimetable />} />
          <Route path="timetable/teacher" element={<TeacherTimetable />} />
          // examination Routes
          <Route path="exams/marks-grade" element={<MarksGrade />} />
          <Route path="exams/exam-schedule" element={<ExamSchedule />} />
          <Route path="exams/marks-entry" element={<MarksEntry />} />
          <Route path="exams/result-card" element={<ResultCard />} />
          <Route path="exams/result-publish" element={<PublishResult />} />
          //whatsapp
          <Route path="whatsapp" element={<WhatsApp />} />
          //communication
          <Route path="communication/notice" element={<NoticeBoard />} />
          <Route path="communication/send-email" element={<SendEmail />} />
          <Route path="communication/send-sms" element={<SendSms />} />
          // events
          <Route path="events/add" element={<AddEvent />} />
          <Route path="events/list" element={<EventList />} />
          <Route path="events/calendar" element={<EventCalendar />} />
          //announcements Routes
          <Route path="announcements/add" element={<AddAnnouncement />} />
          <Route path="announcements/list" element={<AllAnnouncements />} />
          <Route path="announcements/send" element={<SendAnnouncement />} />
          // ==================== REPORTS ROUTES ====================
          <Route path="reports/student" element={<StudentReport />} />
          <Route path="reports/attendance" element={<AttendanceReportPage />} />
          <Route path="reports/fees" element={<FeesReport />} />
          <Route path="reports/exam" element={<ExamReport />} />
          <Route path="reports/financial" element={<FinancialReport />} />
          // ==================== CERTIFICATES ROUTES ====================
          <Route
            path="certificates/generate"
            element={<GenerateCertificatePage />}
          />
          <Route path="certificates/student" element={<StudentCertificate />} />
          <Route path="certificates/design" element={<CertificateDesign />} />
          // ==================== SYSTEM SETTINGS ROUTES ====================
          <Route path="system/roles" element={<RolesPermissions />} />
          <Route path="system/modules" element={<ModuleManager />} />
          <Route path="system/backup" element={<Backup />} />
          {/* Class Management */}
          <Route path="classes" element={<ClassList />} />
          <Route path="classes/add" element={<AddClass />} />
          <Route path="classes/sections" element={<ClassSections />} />
          <Route path="classes/promote" element={<PromoteStudents />} />
          <Route
            path="classes/assign-teacher"
            element={<AssignClassTeacher />}
          />
          //Fee Pages
          <Route path="fees/group" element={<FeesGroup />} />
          <Route path="fees/type" element={<FeesType />} />
          <Route path="fees/master" element={<FeesMaster />} />
          <Route path="fees/collect" element={<CollectFees />} />
          <Route path="fees/search-due" element={<SearchDueFees />} />
          <Route path="fees/statement" element={<FeesStatement />} />
          <Route path="fees/search-payment" element={<SearchFeePayment />} />
          // accounts pages
          <Route path="accounts/income-head" element={<IncomeHead />} />
          <Route path="accounts/expense-head" element={<ExpenseHead />} />
          <Route path="accounts/income" element={<Income />} />
          <Route path="accounts/expense" element={<Expense />} />
          <Route path="accounts/ledger" element={<Ledger />} />
          // Salary Pages
          <Route path="salary/grade" element={<SalaryGrade />} />
          <Route path="salary/assign" element={<AssignSalary />} />
          <Route path="salary/payment" element={<MakePayment />} />
          <Route path="salary/payslip" element={<GeneratePayslip />} />
          <Route path="salary/search" element={<SearchPayment />} />
          {/* Subject Management */}
          <Route path="subjects" element={<SubjectList />} />
          <Route path="subjects/add" element={<AddSubject />} />
          <Route path="subjects/assign" element={<AssignSubjectToClass />} />
          <Route
            path="subjects/teachers"
            element={<AssignSubjectToTeacher />}
          />
          {/* Other Modules */}
          <Route path="attendance" element={<Attendance />} />
          <Route path="examinations" element={<Examinations />} />
          <Route path="assignments" element={<Assignments />} />
          <Route path="fees" element={<Fees />} />
          <Route path="library" element={<Library />} />
          <Route path="transport" element={<Transport />} />
          <Route path="notices" element={<Notices />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="ai-assistant" element={<AIAssistant />} />
          {/* General Settings Routes */}
          <Route path="/settings/school" element={<SchoolSettings />} />
          <Route path="/settings/academic-year" element={<AcademicYear />} />
          <Route path="/settings/session" element={<SessionSettings />} />
          <Route path="/settings/language" element={<LanguageSettings />} />
          <Route path="/settings/timezone" element={<TimezoneSettings />} />
          <Route path="/settings/email" element={<EmailSettings />} />
          <Route path="/settings/backup" element={<BackupRestore />} />
          <Route path="/settings/system" element={<SystemSettings />} />
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
