// src/pages/examinations/ResultCard.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Trophy,
  Search,
  Printer,
  Download,
  X,
  AlertCircle,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function ResultCard() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedExam, setSelectedExam] = useState("");
  const [resultData, setResultData] = useState(null);

  const exams = ["Mid Term 2024", "Final Term 2024"];

  const students = [
    {
      id: "STU001",
      name: "Alice Johnson",
      class: "Class 1",
      rollNo: "101",
      fatherName: "John Johnson",
    },
    {
      id: "STU002",
      name: "Bob Smith",
      class: "Class 1",
      rollNo: "102",
      fatherName: "Mike Smith",
    },
    {
      id: "STU003",
      name: "Charlie Davis",
      class: "Class 2",
      rollNo: "201",
      fatherName: "Robert Davis",
    },
  ];

  const mockResultData = {
    "STU001_Mid Term 2024": {
      student: {
        name: "Alice Johnson",
        class: "Class 1",
        rollNo: "101",
        fatherName: "John Johnson",
      },
      subjects: [
        {
          name: "Mathematics",
          marks: 85,
          totalMarks: 100,
          grade: "A",
          status: "Pass",
        },
        {
          name: "English",
          marks: 78,
          totalMarks: 100,
          grade: "B+",
          status: "Pass",
        },
        {
          name: "Science",
          marks: 92,
          totalMarks: 100,
          grade: "A+",
          status: "Pass",
        },
        {
          name: "Social Studies",
          marks: 80,
          totalMarks: 100,
          grade: "A-",
          status: "Pass",
        },
        {
          name: "Urdu",
          marks: 75,
          totalMarks: 100,
          grade: "B",
          status: "Pass",
        },
      ],
      totalMarks: 410,
      totalPossible: 500,
      percentage: 82,
      grade: "A",
      result: "Pass",
    },
    "STU001_Final Term 2024": {
      student: {
        name: "Alice Johnson",
        class: "Class 1",
        rollNo: "101",
        fatherName: "John Johnson",
      },
      subjects: [
        {
          name: "Mathematics",
          marks: 88,
          totalMarks: 100,
          grade: "A",
          status: "Pass",
        },
        {
          name: "English",
          marks: 82,
          totalMarks: 100,
          grade: "A-",
          status: "Pass",
        },
        {
          name: "Science",
          marks: 95,
          totalMarks: 100,
          grade: "A+",
          status: "Pass",
        },
        {
          name: "Social Studies",
          marks: 85,
          totalMarks: 100,
          grade: "A",
          status: "Pass",
        },
        {
          name: "Urdu",
          marks: 80,
          totalMarks: 100,
          grade: "A-",
          status: "Pass",
        },
      ],
      totalMarks: 430,
      totalPossible: 500,
      percentage: 86,
      grade: "A",
      result: "Pass",
    },
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleViewResult = () => {
    if (selectedStudent && selectedExam) {
      const result = mockResultData[`${selectedStudent.id}_${selectedExam}`];
      setResultData(result);
    }
  };

  const handlePrint = () => window.print();

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Result Card</h1>
          <p className="text-gray-500 mt-1">View student result cards</p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/examinations")}
          className="flex items-center gap-2"
        >
          <X className="w-4 h-4" /> Back
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Student List */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Search className="w-5 h-5 text-blue-600" /> Select Student
          </h2>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredStudents.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setSelectedStudent(s);
                  setResultData(null);
                  setSelectedExam("");
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                  selectedStudent?.id === s.id
                    ? "bg-blue-50 border-blue-300 border"
                    : "hover:bg-gray-50 border border-transparent"
                }`}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                  {s.name.charAt(0)}
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-800">{s.name}</p>
                  <p className="text-xs text-gray-500">
                    {s.class} | Roll: {s.rollNo}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Right Panel - Result Display */}
        <Card className="lg:col-span-2 p-6">
          {!selectedStudent ? (
            <div className="text-center py-12">
              <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800">
                No Student Selected
              </h3>
              <p className="text-gray-500">
                Select a student from the left panel
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Exam
                </label>
                <select
                  value={selectedExam}
                  onChange={(e) => {
                    setSelectedExam(e.target.value);
                    setResultData(null);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Choose Exam</option>
                  {exams.map((e) => (
                    <option key={e} value={e}>
                      {e}
                    </option>
                  ))}
                </select>
                <Button
                  onClick={handleViewResult}
                  disabled={!selectedExam}
                  className="mt-4 w-full bg-blue-600 text-white"
                >
                  View Result
                </Button>
              </div>

              {resultData && (
                <div className="border rounded-lg p-4" id="result-card">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto">
                      <Trophy className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mt-2">
                      Result Card
                    </h2>
                    <p className="text-gray-500">{selectedExam}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <div className="grid grid-cols-2 gap-2">
                      <p>
                        <span className="text-gray-500">Name:</span>{" "}
                        <span className="font-medium">
                          {resultData.student.name}
                        </span>
                      </p>
                      <p>
                        <span className="text-gray-500">Class:</span>{" "}
                        <span className="font-medium">
                          {resultData.student.class}
                        </span>
                      </p>
                      <p>
                        <span className="text-gray-500">Roll No:</span>{" "}
                        <span className="font-medium">
                          {resultData.student.rollNo}
                        </span>
                      </p>
                      <p>
                        <span className="text-gray-500">Father's Name:</span>{" "}
                        <span className="font-medium">
                          {resultData.student.fatherName}
                        </span>
                      </p>
                    </div>
                  </div>

                  <table className="w-full mb-4">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Subject</th>
                        <th className="text-left py-2">Marks</th>
                        <th className="text-left py-2">Grade</th>
                        <th className="text-left py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resultData.subjects.map((sub, idx) => (
                        <tr key={idx} className="border-b">
                          <td className="py-2">{sub.name}</td>
                          <td className="py-2">
                            {sub.marks}/{sub.totalMarks}
                          </td>
                          <td className="py-2">{sub.grade}</td>
                          <td className="py-2">
                            <Badge className="bg-green-100 text-green-700">
                              {sub.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t font-bold">
                        <td className="py-2">Total</td>
                        <td className="py-2">
                          {resultData.totalMarks}/{resultData.totalPossible}
                        </td>
                        <td className="py-2">{resultData.grade}</td>
                        <td className="py-2">
                          <Badge className="bg-blue-100 text-blue-700">
                            {resultData.result}
                          </Badge>
                        </td>
                      </tr>
                    </tfoot>
                  </table>

                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                      {resultData.percentage}%
                    </p>
                    <p className="text-gray-500">Overall Percentage</p>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Button
                      variant="outline"
                      onClick={handlePrint}
                      className="flex-1"
                    >
                      <Printer className="w-4 h-4 mr-2" /> Print
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Download className="w-4 h-4 mr-2" /> Download
                    </Button>
                  </div>
                </div>
              )}

              {selectedExam && !resultData && (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">
                    No result found for {selectedStudent.name} in {selectedExam}
                  </p>
                </div>
              )}
            </>
          )}
        </Card>
      </div>

      {/* Info Box */}
      <Card className="mt-6 p-4 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-medium text-blue-800">About Result Card</p>
            <p className="text-sm text-blue-700">
              View complete result card with subject-wise marks, grades, and
              overall percentage.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
