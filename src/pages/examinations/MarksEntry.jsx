// src/pages/examinations/MarksEntry.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Search,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Users,
  BookOpen,
  Trophy,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function MarksEntry() {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedExam, setSelectedExam] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [students, setStudents] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const classes = ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5"];
  const exams = ["Mid Term", "Final Term", "Half Yearly", "Annual"];
  const subjects = [
    "Mathematics",
    "English",
    "Science",
    "Social Studies",
    "Urdu",
    "Islamic Studies",
  ];

  const studentsData = {
    "Class 1": [
      {
        id: 1,
        name: "Alice Johnson",
        rollNo: "101",
        marks: "",
        isAbsent: false,
      },
      { id: 2, name: "Bob Smith", rollNo: "102", marks: "", isAbsent: false },
      {
        id: 3,
        name: "Charlie Davis",
        rollNo: "103",
        marks: "",
        isAbsent: false,
      },
      {
        id: 4,
        name: "Diana Prince",
        rollNo: "104",
        marks: "",
        isAbsent: false,
      },
      { id: 5, name: "Ethan Hunt", rollNo: "105", marks: "", isAbsent: false },
    ],
    "Class 2": [
      { id: 6, name: "Fiona Green", rollNo: "201", marks: "", isAbsent: false },
      {
        id: 7,
        name: "George Wilson",
        rollNo: "202",
        marks: "",
        isAbsent: false,
      },
    ],
  };

  const handleLoadStudents = () => {
    if (selectedClass && selectedExam && selectedSubject) {
      const classStudents = studentsData[selectedClass] || [];
      setStudents(
        classStudents.map((s) => ({ ...s, marks: "", isAbsent: false })),
      );
    }
  };

  const handleMarksChange = (studentId, value) => {
    const marksValue = value === "" ? "" : parseInt(value);
    if (marksValue !== "" && (marksValue < 0 || marksValue > 100)) return;
    setStudents((prev) =>
      prev.map((student) =>
        student.id === studentId ? { ...student, marks: value } : student,
      ),
    );
  };

  const handleAbsentToggle = (studentId) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === studentId
          ? {
              ...student,
              isAbsent: !student.isAbsent,
              marks: student.isAbsent ? "" : student.marks,
            }
          : student,
      ),
    );
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Marks Entry</h1>
          <p className="text-gray-500 mt-1">
            Enter student marks for examinations
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/examinations")}
          className="flex items-center gap-2"
        >
          <X className="w-4 h-4" /> Back
        </Button>
      </div>

      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-700 font-medium">
            Marks saved successfully!
          </span>
        </div>
      )}

      <Card className="p-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Class</option>
            {classes.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Exam</option>
            {exams.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Subject</option>
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <Button
            onClick={handleLoadStudents}
            disabled={!selectedClass || !selectedExam || !selectedSubject}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Search className="w-4 h-4 mr-2" /> Load Students
          </Button>
        </div>
      </Card>

      {students.length > 0 && (
        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                    Roll No
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                    Student Name
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                    Marks (Out of 100)
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr
                    key={student.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 text-gray-600">
                      {student.rollNo}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {student.name}
                    </td>
                    <td className="px-4 py-3">
                      <Input
                        type="number"
                        value={student.marks}
                        onChange={(e) =>
                          handleMarksChange(student.id, e.target.value)
                        }
                        disabled={student.isAbsent}
                        className="w-24"
                        placeholder="0-100"
                        min="0"
                        max="100"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleAbsentToggle(student.id)}
                        className={`px-3 py-1 rounded-lg text-sm transition-all ${
                          student.isAbsent
                            ? "bg-red-600 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {student.isAbsent ? "Absent" : "Present"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {isSubmitting ? (
                "Saving..."
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" /> Save Marks
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
            <p className="font-medium text-blue-800">About Marks Entry</p>
            <p className="text-sm text-blue-700">
              Enter marks for each student per subject. Marks will be
              automatically calculated for grade and percentage.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
