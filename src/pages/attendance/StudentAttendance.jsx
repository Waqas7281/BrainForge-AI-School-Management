// src/pages/attendance/StudentAttendance.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Calendar,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Save,
  X,
  AlertCircle,
  Users,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function StudentAttendance() {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [students, setStudents] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock Classes
  const classes = [
    "Nursery",
    "LKG",
    "UKG",
    "Class 1",
    "Class 2",
    "Class 3",
    "Class 4",
    "Class 5",
  ];
  const sections = ["A", "B", "C"];

  // Mock Students Data
  const studentsData = {
    "Class 1": {
      A: [
        { id: 1, name: "Alice Johnson", rollNo: "101", status: "present" },
        { id: 2, name: "Bob Smith", rollNo: "102", status: "present" },
        { id: 3, name: "Charlie Davis", rollNo: "103", status: "absent" },
        { id: 4, name: "Diana Prince", rollNo: "104", status: "present" },
        { id: 5, name: "Ethan Hunt", rollNo: "105", status: "late" },
      ],
      B: [
        { id: 6, name: "Fiona Green", rollNo: "106", status: "present" },
        { id: 7, name: "George Wilson", rollNo: "107", status: "absent" },
      ],
    },
    "Class 2": {
      A: [
        { id: 8, name: "Hannah Lee", rollNo: "201", status: "present" },
        { id: 9, name: "Ian Baker", rollNo: "202", status: "present" },
      ],
    },
  };

  const handleLoadStudents = () => {
    if (selectedClass && selectedSection) {
      const classStudents =
        studentsData[selectedClass]?.[selectedSection] || [];
      setStudents(
        classStudents.map((s) => ({ ...s, status: s.status || "present" })),
      );
    }
  };

  const handleStatusChange = (studentId, newStatus) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === studentId ? { ...student, status: newStatus } : student,
      ),
    );
  };

  const handleMarkAll = (status) => {
    setStudents((prev) => prev.map((student) => ({ ...student, status })));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const presentCount = students.filter((s) => s.status === "present").length;
  const absentCount = students.filter((s) => s.status === "absent").length;
  const lateCount = students.filter((s) => s.status === "late").length;
  const attendancePercent =
    students.length > 0
      ? ((presentCount / students.length) * 100).toFixed(1)
      : 0;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Student Attendance
          </h1>
          <p className="text-gray-500 mt-1">Mark daily student attendance</p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/attendance")}
          className="flex items-center gap-2"
        >
          <X className="w-4 h-4" /> Back
        </Button>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-700 font-medium">
            Attendance saved successfully!
          </span>
        </div>
      )}

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select Class</option>
            {classes.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg"
            disabled={!selectedClass}
          >
            <option value="">Select Section</option>
            {sections.map((s) => (
              <option key={s} value={s}>
                Section {s}
              </option>
            ))}
          </select>
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2"
          />
          <Button
            onClick={handleLoadStudents}
            disabled={!selectedClass || !selectedSection}
            className="bg-blue-600 text-white"
          >
            <Search className="w-4 h-4 mr-2" /> Load Students
          </Button>
        </div>
      </Card>

      {/* Attendance Summary */}
      {students.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <Card className="p-3 text-center bg-green-50">
            <p className="text-2xl font-bold text-green-600">{presentCount}</p>
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
      )}

      {/* Bulk Actions */}
      {students.length > 0 && (
        <Card className="p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => handleMarkAll("present")}
              variant="outline"
              className="bg-green-50 border-green-200 text-green-600"
            >
              <CheckCircle className="w-4 h-4 mr-2" /> Mark All Present
            </Button>
            <Button
              onClick={() => handleMarkAll("absent")}
              variant="outline"
              className="bg-red-50 border-red-200 text-red-600"
            >
              <XCircle className="w-4 h-4 mr-2" /> Mark All Absent
            </Button>
            <Button
              onClick={() => handleMarkAll("late")}
              variant="outline"
              className="bg-yellow-50 border-yellow-200 text-yellow-600"
            >
              <Clock className="w-4 h-4 mr-2" /> Mark All Late
            </Button>
          </div>
        </Card>
      )}

      {/* Students Table */}
      {students.length > 0 && (
        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                    Roll No
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                    Student Name
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                    Attendance
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-600">
                      {student.rollNo}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {student.name}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleStatusChange(student.id, "present")
                          }
                          className={`px-3 py-1 rounded-lg text-sm transition-all flex items-center gap-1 ${
                            student.status === "present"
                              ? "bg-green-600 text-white shadow-md"
                              : "bg-gray-100 text-gray-600 hover:bg-green-100"
                          }`}
                        >
                          <CheckCircle className="w-3 h-3" /> Present
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(student.id, "absent")
                          }
                          className={`px-3 py-1 rounded-lg text-sm transition-all flex items-center gap-1 ${
                            student.status === "absent"
                              ? "bg-red-600 text-white shadow-md"
                              : "bg-gray-100 text-gray-600 hover:bg-red-100"
                          }`}
                        >
                          <XCircle className="w-3 h-3" /> Absent
                        </button>
                        <button
                          onClick={() => handleStatusChange(student.id, "late")}
                          className={`px-3 py-1 rounded-lg text-sm transition-all flex items-center gap-1 ${
                            student.status === "late"
                              ? "bg-yellow-600 text-white shadow-md"
                              : "bg-gray-100 text-gray-600 hover:bg-yellow-100"
                          }`}
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
      )}

      {/* Info Box */}
      <Card className="mt-6 p-4 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-medium text-blue-800">
              About Student Attendance
            </p>
            <p className="text-sm text-blue-700">
              Mark daily attendance for students. You can mark individual or
              bulk attendance.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
