import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import Classes from "./pages/Classes";
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
import SchoolSettings from './pages/settingPages/SchoolSettings'
import AcademicYear from "./pages/settingPages/AcademicYear";
import SessionSettings from "./pages/settingPages/SessionSettings";
import LanguageSettings from "./pages/settingPages/LanguageSettings";
import TimezoneSettings from "./pages/settingPages/TimezoneSettings";
import EmailSettings from "./pages/settingPages/EmailSettings";
import BackupRestore from "./pages/settingPages/BackupRestore";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="classes" element={<Classes />} />
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
          <Route path="/settings/school" element={<SchoolSettings />} />
          <Route path="/settings/academic-year" element={<AcademicYear />} />
          <Route path="/settings/session" element={<SessionSettings />} />
          <Route path="/settings/language" element={<LanguageSettings />} />
          <Route path = "/settings/timezone" element={<TimezoneSettings/>}/>
          <Route path = "/settings/email" element={<EmailSettings/>}/>
          <Route path ="/settings/backup" element={<BackupRestore/>}/>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
