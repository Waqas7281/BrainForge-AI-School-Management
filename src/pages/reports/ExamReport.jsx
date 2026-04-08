// src/pages/reports/ExamReport.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardList, Download, Printer, X } from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";

export default function ExamReport() {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedExam, setSelectedExam] = useState("");
  const [showReport, setShowReport] = useState(false);

  const classes = [
    "all",
    "Class 1",
    "Class 2",
    "Class 3",
    "Class 4",
    "Class 5",
  ];
  const exams = ["Mid Term 2024", "Final Term 2024"];

  // Mock Exam Results Data
  const examResults = {
    "Class 1": {
      "Mid Term 2024": [
        {
          name: "Alice Johnson",
          rollNo: "101",
          total: 410,
          percentage: 82,
          grade: "A",
          rank: 1,
        },
        {
          name: "Bob Smith",
          rollNo: "102",
          total: 390,
          percentage: 78,
          grade: "B+",
          rank: 2,
        },
        {
          name: "Charlie Davis",
          rollNo: "103",
          total: 370,
          percentage: 74,
          grade: "B",
          rank: 3,
        },
      ],
      "Final Term 2024": [
        {
          name: "Alice Johnson",
          rollNo: "101",
          total: 430,
          percentage: 86,
          grade: "A",
          rank: 1,
        },
        {
          name: "Bob Smith",
          rollNo: "102",
          total: 410,
          percentage: 82,
          grade: "A-",
          rank: 2,
        },
        {
          name: "Charlie Davis",
          rollNo: "103",
          total: 395,
          percentage: 79,
          grade: "B+",
          rank: 3,
        },
      ],
    },
  };

  const currentData =
    selectedClass !== "all" && selectedExam
      ? examResults[selectedClass]?.[selectedExam] || []
      : [];

  const classAverage =
    currentData.length > 0
      ? (
          currentData.reduce((sum, s) => sum + s.percentage, 0) /
          currentData.length
        ).toFixed(1)
      : 0;
  const topper =
    currentData.length > 0
      ? currentData.reduce(
          (max, s) => (s.percentage > max.percentage ? s : max),
          currentData[0],
        )
      : null;

  const handlePrint = () => window.print();
  const handleExport = () => alert("Exporting exam report...");

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Exam Report</h1>
          <p className="text-gray-500 mt-1">
            View examination results and performance
          </p>
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
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="">Select Exam</option>
            {exams.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
          <Button
            onClick={() => setShowReport(true)}
            disabled={!selectedExam || selectedClass === "all"}
            className="bg-blue-600 text-white"
          >
            Generate Report
          </Button>
        </div>
      </Card>

      {showReport && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Card className="p-4 text-center">
              <p className="text-3xl font-bold text-blue-600">
                {currentData.length}
              </p>
              <p className="text-gray-500">Total Students</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-3xl font-bold text-green-600">
                {classAverage}%
              </p>
              <p className="text-gray-500">Class Average</p>
            </Card>
            {topper && (
              <Card className="p-4 text-center bg-yellow-50">
                <p className="text-3xl font-bold text-yellow-600">
                  {topper.name}
                </p>
                <p className="text-gray-500">Topper ({topper.percentage}%)</p>
              </Card>
            )}
          </div>

          <Card className="p-0 overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b bg-gray-50">
              <h3 className="font-semibold">
                Exam Results - {selectedExam} - {selectedClass}
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
                    <th className="text-left px-4 py-3">Rank</th>
                    <th className="text-left px-4 py-3">Roll No</th>
                    <th className="text-left px-4 py-3">Student Name</th>
                    <th className="text-left px-4 py-3">Total Marks</th>
                    <th className="text-left px-4 py-3">Percentage</th>
                    <th className="text-left px-4 py-3">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((student) => (
                    <tr key={student.rollNo} className="border-b">
                      <td className="px-4 py-3 font-bold">{student.rank}</td>
                      <td className="px-4 py-3">{student.rollNo}</td>
                      <td className="px-4 py-3 font-medium">{student.name}</td>
                      <td className="px-4 py-3">{student.total}</td>
                      <td className="px-4 py-3 font-bold">
                        {student.percentage}%
                      </td>
                      <td className="px-4 py-3">
                        <Badge className="bg-purple-100 text-purple-700">
                          {student.grade}
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
          <ClipboardList className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-medium text-blue-800">About Exam Report</p>
            <p className="text-sm text-blue-700">
              Generate exam result reports with rankings and class averages.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
