// src/pages/attendance/StaffAttendance.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  Calendar,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Save,
  X,
  AlertCircle,
  Building2,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function StaffAttendance() {
  const navigate = useNavigate();
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [staff, setStaff] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock Departments
  const departments = [
    "Accounts",
    "Library",
    "Security",
    "Administration",
    "Transport",
    "Front Office",
    "Medical",
  ];

  // Mock Staff Data
  const staffData = {
    Accounts: [
      { id: 1, name: "John Smith", empId: "STF001", status: "present" },
      { id: 2, name: "Robert Taylor", empId: "STF012", status: "present" },
    ],
    Library: [
      { id: 3, name: "Mary Johnson", empId: "STF002", status: "absent" },
    ],
    Security: [
      { id: 4, name: "Robert Brown", empId: "STF003", status: "present" },
      { id: 5, name: "William Clark", empId: "STF013", status: "late" },
    ],
    Transport: [
      { id: 6, name: "Michael Wilson", empId: "STF005", status: "present" },
    ],
  };

  const handleLoadStaff = () => {
    if (selectedDepartment) {
      const deptStaff = staffData[selectedDepartment] || [];
      setStaff(deptStaff.map((s) => ({ ...s, status: s.status || "present" })));
    }
  };

  const handleStatusChange = (staffId, newStatus) => {
    setStaff((prev) =>
      prev.map((s) => (s.id === staffId ? { ...s, status: newStatus } : s)),
    );
  };

  const handleMarkAll = (status) => {
    setStaff((prev) => prev.map((s) => ({ ...s, status })));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const presentCount = staff.filter((s) => s.status === "present").length;
  const absentCount = staff.filter((s) => s.status === "absent").length;
  const lateCount = staff.filter((s) => s.status === "late").length;
  const attendancePercent =
    staff.length > 0 ? ((presentCount / staff.length) * 100).toFixed(1) : 0;

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Staff Attendance</h1>
          <p className="text-gray-500 mt-1">Mark daily staff attendance</p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/attendance")}
          className="flex items-center gap-2"
        >
          <X className="w-4 h-4" /> Back
        </Button>
      </div>

      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-700">Attendance saved successfully!</span>
        </div>
      )}

      <Card className="p-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="">Select Department</option>
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <Button
            onClick={handleLoadStaff}
            disabled={!selectedDepartment}
            className="bg-blue-600 text-white"
          >
            <Search className="w-4 h-4 mr-2" /> Load Staff
          </Button>
        </div>
      </Card>

      {staff.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
            <Card className="p-3 text-center bg-green-50">
              <p className="text-2xl font-bold text-green-600">
                {presentCount}
              </p>
              <p className="text-xs text-gray-600">Present</p>
            </Card>
            <Card className="p-3 text-center bg-red-50">
              <p className="text-2xl font-bold text-red-600">{absentCount}</p>
              <p className="text-xs text-gray-600">Absent</p>
            </Card>
            <Card className="p-3 text-center bg-yellow-50">
              <p className="text-2xl font-bold text-yellow-600">{lateCount}</p>
              <p className="text-xs text-gray-600">Late</p>
            </Card>
            <Card className="p-3 text-center bg-blue-50">
              <p className="text-2xl font-bold text-blue-600">
                {attendancePercent}%
              </p>
              <p className="text-xs text-gray-600">Attendance %</p>
            </Card>
          </div>

          <Card className="p-4 mb-6">
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => handleMarkAll("present")}
                variant="outline"
                className="bg-green-50 text-green-600"
              >
                <CheckCircle className="w-4 h-4 mr-2" /> All Present
              </Button>
              <Button
                onClick={() => handleMarkAll("absent")}
                variant="outline"
                className="bg-red-50 text-red-600"
              >
                <XCircle className="w-4 h-4 mr-2" /> All Absent
              </Button>
              <Button
                onClick={() => handleMarkAll("late")}
                variant="outline"
                className="bg-yellow-50 text-yellow-600"
              >
                <Clock className="w-4 h-4 mr-2" /> All Late
              </Button>
            </div>
          </Card>

          <Card className="p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left px-4 py-3 text-xs font-semibold">
                      Employee ID
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold">
                      Staff Name
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold">
                      Attendance
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {staff.map((s) => (
                    <tr key={s.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-600">{s.empId}</td>
                      <td className="px-4 py-3 font-medium">{s.name}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleStatusChange(s.id, "present")}
                            className={`px-3 py-1 rounded-lg text-sm flex items-center gap-1 ${s.status === "present" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-green-100"}`}
                          >
                            <CheckCircle className="w-3 h-3" /> Present
                          </button>
                          <button
                            onClick={() => handleStatusChange(s.id, "absent")}
                            className={`px-3 py-1 rounded-lg text-sm flex items-center gap-1 ${s.status === "absent" ? "bg-red-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-red-100"}`}
                          >
                            <XCircle className="w-3 h-3" /> Absent
                          </button>
                          <button
                            onClick={() => handleStatusChange(s.id, "late")}
                            className={`px-3 py-1 rounded-lg text-sm flex items-center gap-1 ${s.status === "late" ? "bg-yellow-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-yellow-100"}`}
                          >
                            <Clock className="w-3 h-3" /> Late
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t bg-gray-50 flex justify-end">
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-green-600 text-white"
              >
                {isSubmitting ? (
                  "Saving..."
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" /> Save Attendance
                  </>
                )}
              </Button>
            </div>
          </Card>
        </>
      )}

      <Card className="mt-6 p-4 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-medium text-blue-800">About Staff Attendance</p>
            <p className="text-sm text-blue-700">
              Mark daily attendance for non-teaching staff department-wise.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
