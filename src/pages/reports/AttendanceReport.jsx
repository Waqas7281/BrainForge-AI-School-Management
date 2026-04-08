// src/pages/reports/AttendanceReport.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCheck, Download, Printer, X } from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";

export default function AttendanceReport() {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [showReport, setShowReport] = useState(false);

  const classes = [
    "all",
    "Class 1",
    "Class 2",
    "Class 3",
    "Class 4",
    "Class 5",
  ];
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

  // Mock Attendance Data
  const attendanceData = {
    "Class 1": [
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
    ],
    "Class 2": [
      {
        name: "Diana Prince",
        rollNo: "201",
        present: 24,
        absent: 0,
        late: 1,
        percentage: 96,
      },
      {
        name: "Ethan Hunt",
        rollNo: "202",
        present: 18,
        absent: 6,
        late: 1,
        percentage: 72,
      },
    ],
  };

  const currentData =
    selectedClass !== "all"
      ? attendanceData[selectedClass] || []
      : Object.values(attendanceData).flat();

  const totalStudents = currentData.length;
  const avgAttendance =
    currentData.length > 0
      ? (
          currentData.reduce((sum, s) => sum + s.percentage, 0) / totalStudents
        ).toFixed(1)
      : 0;
  const above75 = currentData.filter((s) => s.percentage >= 75).length;
  const below75 = currentData.filter((s) => s.percentage < 75).length;

  const handlePrint = () => window.print();
  const handleExport = () => alert("Exporting attendance report...");

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Attendance Report
          </h1>
          <p className="text-gray-500 mt-1">View student attendance summary</p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/reports")}
          className="flex items-center gap-2"
        >
          <X className="w-4 h-4" /> Back
        </Button>
      </div>

      <Card className="p-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            {classes.map((c) => (
              <option key={c} value={c}>
                {c === "all" ? "All Classes" : c}
              </option>
            ))}
          </select>
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
            onClick={() => setShowReport(true)}
            disabled={!selectedMonth}
            className="bg-blue-600 text-white"
          >
            Generate Report
          </Button>
        </div>
      </Card>

      {showReport && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
            <Card className="p-4 text-center">
              <p className="text-3xl font-bold text-blue-600">
                {totalStudents}
              </p>
              <p className="text-gray-500">Total Students</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-3xl font-bold text-green-600">
                {avgAttendance}%
              </p>
              <p className="text-gray-500">Average Attendance</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-3xl font-bold text-green-600">{above75}</p>
              <p className="text-gray-500">Above 75%</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-3xl font-bold text-red-600">{below75}</p>
              <p className="text-gray-500">Below 75%</p>
            </Card>
          </div>

          <Card className="p-0 overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b bg-gray-50">
              <h3 className="font-semibold">
                Attendance Details - {selectedMonth}
              </h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleExport}>
                  <Download className="w-4 h-4 mr-1" /> Export
                </Button>
                <Button variant="outline" size="sm" onClick={handlePrint}>
                  <Printer className="w-4 h-4 mr-1" /> Print
                </Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left px-4 py-3">Roll No</th>
                    <th className="text-left px-4 py-3">Student Name</th>
                    <th className="text-left px-4 py-3">Present</th>
                    <th className="text-left px-4 py-3">Absent</th>
                    <th className="text-left px-4 py-3">Late</th>
                    <th className="text-left px-4 py-3">Percentage</th>
                    <th className="text-left px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((student, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="px-4 py-3">{student.rollNo}</td>
                      <td className="px-4 py-3 font-medium">{student.name}</td>
                      <td className="px-4 py-3 text-green-600">
                        {student.present}
                      </td>
                      <td className="px-4 py-3 text-red-600">
                        {student.absent}
                      </td>
                      <td className="px-4 py-3 text-yellow-600">
                        {student.late}
                      </td>
                      <td className="px-4 py-3 font-bold">
                        {student.percentage}%
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          className={
                            student.percentage >= 75
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }
                        >
                          {student.percentage >= 75
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
          <UserCheck className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-medium text-blue-800">About Attendance Report</p>
            <p className="text-sm text-blue-700">
              Generate monthly attendance reports for students.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
