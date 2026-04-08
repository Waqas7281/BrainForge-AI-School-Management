// src/pages/attendance/TeacherAttendance.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserCheck,
  Calendar,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Save,
  X,
  AlertCircle,
  Users,
  Building2,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function TeacherAttendance() {
  const navigate = useNavigate();
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [teachers, setTeachers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock Departments
  const departments = [
    "Mathematics",
    "Science",
    "Languages",
    "Social Studies",
    "Computer Science",
    "Arts",
  ];

  // Mock Teachers Data
  const teachersData = {
    Mathematics: [
      { id: 1, name: "Dr. Sarah Wilson", empId: "EMP001", status: "present" },
      { id: 2, name: "Mr. Robert Johnson", empId: "EMP005", status: "present" },
    ],
    Science: [
      { id: 3, name: "Ms. Emily Davis", empId: "EMP003", status: "absent" },
      { id: 4, name: "Mr. David Miller", empId: "EMP009", status: "present" },
    ],
    Languages: [
      { id: 5, name: "Prof. James Brown", empId: "EMP002", status: "present" },
      { id: 6, name: "Ms. Jennifer Garcia", empId: "EMP010", status: "late" },
    ],
    "Computer Science": [
      { id: 7, name: "Mr. Michael Lee", empId: "EMP006", status: "present" },
    ],
  };

  const handleLoadTeachers = () => {
    if (selectedDepartment) {
      const deptTeachers = teachersData[selectedDepartment] || [];
      setTeachers(
        deptTeachers.map((t) => ({ ...t, status: t.status || "present" })),
      );
    }
  };

  const handleStatusChange = (teacherId, newStatus) => {
    setTeachers((prev) =>
      prev.map((teacher) =>
        teacher.id === teacherId ? { ...teacher, status: newStatus } : teacher,
      ),
    );
  };

  const handleMarkAll = (status) => {
    setTeachers((prev) => prev.map((teacher) => ({ ...teacher, status })));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const presentCount = teachers.filter((t) => t.status === "present").length;
  const absentCount = teachers.filter((t) => t.status === "absent").length;
  const lateCount = teachers.filter((t) => t.status === "late").length;
  const attendancePercent =
    teachers.length > 0
      ? ((presentCount / teachers.length) * 100).toFixed(1)
      : 0;

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Teacher Attendance
          </h1>
          <p className="text-gray-500 mt-1">Mark daily teacher attendance</p>
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
            onClick={handleLoadTeachers}
            disabled={!selectedDepartment}
            className="bg-blue-600 text-white"
          >
            <Search className="w-4 h-4 mr-2" /> Load Teachers
          </Button>
        </div>
      </Card>

      {teachers.length > 0 && (
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
                      Teacher Name
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold">
                      Attendance
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((teacher) => (
                    <tr key={teacher.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-600">
                        {teacher.empId}
                      </td>
                      <td className="px-4 py-3 font-medium">{teacher.name}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              handleStatusChange(teacher.id, "present")
                            }
                            className={`px-3 py-1 rounded-lg text-sm flex items-center gap-1 ${teacher.status === "present" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-green-100"}`}
                          >
                            <CheckCircle className="w-3 h-3" /> Present
                          </button>
                          <button
                            onClick={() =>
                              handleStatusChange(teacher.id, "absent")
                            }
                            className={`px-3 py-1 rounded-lg text-sm flex items-center gap-1 ${teacher.status === "absent" ? "bg-red-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-red-100"}`}
                          >
                            <XCircle className="w-3 h-3" /> Absent
                          </button>
                          <button
                            onClick={() =>
                              handleStatusChange(teacher.id, "late")
                            }
                            className={`px-3 py-1 rounded-lg text-sm flex items-center gap-1 ${teacher.status === "late" ? "bg-yellow-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-yellow-100"}`}
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
            <p className="font-medium text-blue-800">
              About Teacher Attendance
            </p>
            <p className="text-sm text-blue-700">
              Mark daily attendance for teachers department-wise.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
