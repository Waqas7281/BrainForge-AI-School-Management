// src/pages/attendance/AttendanceReport.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Download, Printer, X, AlertCircle } from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";

export default function AttendanceReport() {
  const navigate = useNavigate();
  const [reportType, setReportType] = useState("student");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [showReport, setShowReport] = useState(false);

  const classes = ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Mock Report Data
  const reportData = {
    student: [
      {
        name: "Alice Johnson",
        rollNo: "101",
        present: 22,
        absent: 2,
        late: 1,
        percentage: 88,
      },
      {
        name: "Bob Smith",
        rollNo: "102",
        present: 20,
        absent: 4,
        late: 1,
        percentage: 80,
      },
      {
        name: "Charlie Davis",
        rollNo: "103",
        present: 23,
        absent: 1,
        late: 1,
        percentage: 92,
      },
      {
        name: "Diana Prince",
        rollNo: "104",
        present: 24,
        absent: 0,
        late: 1,
        percentage: 96,
      },
      {
        name: "Ethan Hunt",
        rollNo: "105",
        present: 18,
        absent: 6,
        late: 1,
        percentage: 72,
      },
    ],
    teacher: [
      {
        name: "Dr. Sarah Wilson",
        empId: "EMP001",
        present: 24,
        absent: 1,
        late: 0,
        percentage: 96,
      },
      {
        name: "Prof. James Brown",
        empId: "EMP002",
        present: 22,
        absent: 2,
        late: 1,
        percentage: 88,
      },
      {
        name: "Ms. Emily Davis",
        empId: "EMP003",
        present: 23,
        absent: 1,
        late: 1,
        percentage: 92,
      },
    ],
    staff: [
      {
        name: "John Smith",
        empId: "STF001",
        present: 24,
        absent: 1,
        late: 0,
        percentage: 96,
      },
      {
        name: "Mary Johnson",
        empId: "STF002",
        present: 20,
        absent: 4,
        late: 1,
        percentage: 80,
      },
      {
        name: "Robert Brown",
        empId: "STF003",
        present: 22,
        absent: 2,
        late: 1,
        percentage: 88,
      },
    ],
  };

  const currentData = reportData[reportType];
  const totalStudents = currentData.length;
  const avgAttendance = (
    currentData.reduce((sum, s) => sum + s.percentage, 0) / totalStudents
  ).toFixed(1);

  const handleGenerate = () => {
    if (reportType === "student" && !selectedClass) return;
    setShowReport(true);
  };

  const getPercentageColor = (percentage) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Attendance Report
          </h1>
          <p className="text-gray-500 mt-1">View attendance reports</p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/attendance")}
          className="flex items-center gap-2"
        >
          <X className="w-4 h-4" /> Back
        </Button>
      </div>

      <Card className="p-6 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="student">Student Report</option>
            <option value="teacher">Teacher Report</option>
            <option value="staff">Staff Report</option>
          </select>
          {reportType === "student" && (
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-3 py-2 border rounded-lg"
            >
              <option value="">Select Class</option>
              {classes.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          )}
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="">Select Month</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <Button
            onClick={handleGenerate}
            disabled={reportType === "student" && !selectedClass}
            className="bg-blue-600 text-white"
          >
            <Search className="w-4 h-4 mr-2" /> Generate Report
          </Button>
        </div>
      </Card>

      {showReport && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Card className="p-4 text-center">
              <p className="text-3xl font-bold text-blue-600">
                {totalStudents}
              </p>
              <p className="text-gray-500">
                Total{" "}
                {reportType === "student"
                  ? "Students"
                  : reportType === "teacher"
                    ? "Teachers"
                    : "Staff"}
              </p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-3xl font-bold text-green-600">
                {avgAttendance}%
              </p>
              <p className="text-gray-500">Average Attendance</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-3xl font-bold text-yellow-600">
                {currentData.filter((s) => s.percentage < 75).length}
              </p>
              <p className="text-gray-500">Below 75%</p>
            </Card>
          </div>

          <Card className="p-0 overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b bg-gray-50">
              <h3 className="font-semibold">
                Attendance Details - {selectedMonth || "Current Month"}
              </h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" /> Export
                </Button>
                <Button variant="outline" size="sm">
                  <Printer className="w-4 h-4 mr-1" /> Print
                </Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left px-4 py-3 text-xs font-semibold">
                      {reportType === "student" ? "Roll No" : "Employee ID"}
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold">
                      Name
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold">
                      Present
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold">
                      Absent
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold">
                      Late
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold">
                      Percentage
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((item, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-600">
                        {item.rollNo || item.empId}
                      </td>
                      <td className="px-4 py-3 font-medium">{item.name}</td>
                      <td className="px-4 py-3 text-green-600">
                        {item.present}
                      </td>
                      <td className="px-4 py-3 text-red-600">{item.absent}</td>
                      <td className="px-4 py-3 text-yellow-600">{item.late}</td>
                      <td
                        className={`px-4 py-3 font-bold ${getPercentageColor(item.percentage)}`}
                      >
                        {item.percentage}%
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          className={
                            item.percentage >= 90
                              ? "bg-green-100 text-green-700"
                              : item.percentage >= 75
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                          }
                        >
                          {item.percentage >= 90
                            ? "Excellent"
                            : item.percentage >= 75
                              ? "Good"
                              : "Needs Improvement"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}

      <Card className="mt-6 p-4 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-medium text-blue-800">About Attendance Report</p>
            <p className="text-sm text-blue-700">
              Generate monthly attendance reports for students, teachers, and
              staff.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
