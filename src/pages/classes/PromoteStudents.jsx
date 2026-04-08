// src/pages/classes/PromoteStudents.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TrendingUp,
  Users,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  X,
  GraduationCap,
  Calendar,
  Filter,
  RefreshCw,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export default function PromoteStudents() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedFromClass, setSelectedFromClass] = useState("");
  const [selectedToClass, setSelectedToClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isPromoting, setIsPromoting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock Data
  const classes = ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5"];
  const sections = ["A", "B", "C"];

  const studentsData = {
    "Class 1": {
      A: [
        {
          id: 1,
          name: "Alice Johnson",
          rollNo: "101",
          attendance: 95,
          marks: 85,
        },
        { id: 2, name: "Bob Smith", rollNo: "102", attendance: 88, marks: 78 },
        {
          id: 3,
          name: "Charlie Davis",
          rollNo: "103",
          attendance: 92,
          marks: 82,
        },
        {
          id: 4,
          name: "Diana Prince",
          rollNo: "104",
          attendance: 78,
          marks: 75,
        },
        { id: 5, name: "Ethan Hunt", rollNo: "105", attendance: 96, marks: 90 },
      ],
      B: [
        {
          id: 6,
          name: "Fiona Green",
          rollNo: "106",
          attendance: 85,
          marks: 80,
        },
        {
          id: 7,
          name: "George Wilson",
          rollNo: "107",
          attendance: 90,
          marks: 88,
        },
      ],
    },
    "Class 2": {
      A: [
        { id: 8, name: "Hannah Lee", rollNo: "201", attendance: 92, marks: 86 },
        { id: 9, name: "Ian Baker", rollNo: "202", attendance: 87, marks: 79 },
      ],
    },
  };

  const getNextClass = (currentClass) => {
    const index = classes.indexOf(currentClass);
    if (index !== -1 && index < classes.length - 1) {
      return classes[index + 1];
    }
    return "";
  };

  const handleFromClassChange = (cls) => {
    setSelectedFromClass(cls);
    setSelectedToClass(getNextClass(cls));
    setSelectedSection("");
    setSelectedStudents([]);
    setSelectAll(false);
  };

  const handleSectionChange = (section) => {
    setSelectedSection(section);
    const students = studentsData[selectedFromClass]?.[section] || [];
    setSelectedStudents(students.map((s) => ({ ...s, selected: false })));
    setSelectAll(false);
  };

  const toggleStudentSelection = (studentId) => {
    setSelectedStudents((prev) =>
      prev.map((student) =>
        student.id === studentId
          ? { ...student, selected: !student.selected }
          : student,
      ),
    );
  };

  const toggleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setSelectedStudents((prev) =>
      prev.map((student) => ({ ...student, selected: newSelectAll })),
    );
  };

  const handlePromote = async () => {
    const selectedCount = selectedStudents.filter((s) => s.selected).length;
    if (selectedCount === 0) return;

    setIsPromoting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsPromoting(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);

    // Reset form
    setSelectedFromClass("");
    setSelectedToClass("");
    setSelectedSection("");
    setSelectedStudents([]);
    setSelectAll(false);
    setStep(1);
  };

  const selectedCount = selectedStudents.filter((s) => s.selected).length;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Promote Students</h1>
          <p className="text-gray-500 mt-1">
            Move students to the next academic level
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/classes")}
          className="flex items-center gap-2"
        >
          <X className="w-4 h-4" />
          Back to Classes
        </Button>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-700 font-medium">
            {selectedCount} students promoted successfully to {selectedToClass}!
          </span>
        </div>
      )}

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8 max-w-2xl mx-auto">
        <div className="flex items-center flex-1">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}`}
          >
            1
          </div>
          <div
            className={`flex-1 h-1 mx-2 ${step >= 2 ? "bg-blue-600" : "bg-gray-200"}`}
          />
        </div>
        <div className="flex items-center flex-1">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}`}
          >
            2
          </div>
          <div
            className={`flex-1 h-1 mx-2 ${step >= 3 ? "bg-blue-600" : "bg-gray-200"}`}
          />
        </div>
        <div className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= 3 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}`}
          >
            3
          </div>
        </div>
      </div>

      {/* Step 1: Select Classes */}
      {step === 1 && (
        <Card className="p-6 max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Select Classes
              </h2>
              <p className="text-gray-500 text-sm">
                Choose from and to classes for promotion
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From Class <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedFromClass}
                onChange={(e) => handleFromClassChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Class</option>
                {classes.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-center">
              <ArrowRight className="w-6 h-6 text-gray-400" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To Class <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={selectedToClass}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              />
              <p className="text-xs text-gray-500 mt-1">
                Auto-populated based on class hierarchy
              </p>
            </div>

            <Button
              onClick={() => setStep(2)}
              disabled={!selectedFromClass || !selectedToClass}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
            >
              Next: Select Students
            </Button>
          </div>
        </Card>
      )}

      {/* Step 2: Select Students */}
      {step === 2 && selectedFromClass && (
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Select Students
                  </h2>
                  <p className="text-gray-500 text-sm">
                    {selectedFromClass} → {selectedToClass}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={selectedCount === 0}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Next: Review ({selectedCount} selected)
                </Button>
              </div>
            </div>

            {/* Section Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Section
              </label>
              <div className="flex gap-3 flex-wrap">
                {sections.map((section) => (
                  <button
                    key={section}
                    onClick={() => handleSectionChange(section)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedSection === section
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Section {section}
                  </button>
                ))}
              </div>
            </div>

            {/* Students Table */}
            {selectedSection &&
            studentsData[selectedFromClass]?.[selectedSection] ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4">
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={toggleSelectAll}
                          className="w-4 h-4 rounded border-gray-300"
                        />
                      </th>
                      <th className="text-left py-3 px-4">Roll No</th>
                      <th className="text-left py-3 px-4">Student Name</th>
                      <th className="text-left py-3 px-4">Attendance</th>
                      <th className="text-left py-3 px-4">Marks</th>
                      <th className="text-left py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedStudents.map((student) => (
                      <tr
                        key={student.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4">
                          <input
                            type="checkbox"
                            checked={student.selected}
                            onChange={() => toggleStudentSelection(student.id)}
                            className="w-4 h-4 rounded border-gray-300"
                          />
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {student.rollNo}
                        </td>
                        <td className="py-3 px-4 font-medium text-gray-800">
                          {student.name}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              student.attendance >= 75
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {student.attendance}%
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`font-medium ${
                              student.marks >= 80
                                ? "text-green-600"
                                : student.marks >= 60
                                  ? "text-yellow-600"
                                  : "text-red-600"
                            }`}
                          >
                            {student.marks}%
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {student.selected ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              selectedSection && (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    No students found in this section
                  </p>
                </div>
              )
            )}
          </Card>
        </div>
      )}

      {/* Step 3: Review & Confirm */}
      {step === 3 && (
        <Card className="p-6 max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Review & Confirm
              </h2>
              <p className="text-gray-500 text-sm">
                Verify promotion details before proceeding
              </p>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500">From Class:</span>
                <span className="font-semibold text-gray-800">
                  {selectedFromClass}
                </span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500">To Class:</span>
                <span className="font-semibold text-gray-800">
                  {selectedToClass}
                </span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500">Section:</span>
                <span className="font-semibold text-gray-800">
                  Section {selectedSection}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                <span className="text-gray-500">Students to Promote:</span>
                <span className="font-bold text-blue-600 text-lg">
                  {selectedCount}
                </span>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-yellow-800">Important Note</p>
                  <p className="text-sm text-yellow-700 mt-1">
                    This action will promote selected students to{" "}
                    {selectedToClass}. Their records will be updated in the new
                    class. This cannot be undone.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setStep(2)}
              className="flex-1"
            >
              Back
            </Button>
            <Button
              onClick={handlePromote}
              disabled={isPromoting}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              {isPromoting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                  Promoting...
                </>
              ) : (
                <>
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Confirm Promotion
                </>
              )}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
