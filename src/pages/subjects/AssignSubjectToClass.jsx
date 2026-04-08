// src/pages/subjects/AssignSubjectToClass.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Plus,
  Trash2,
  X,
  CheckCircle,
  AlertCircle,
  Search,
  Users,
  Clock,
  Save,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export default function AssignSubjectToClass() {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock Classes Data
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

  // Mock Subjects Data
  const allSubjects = [
    {
      id: 1,
      name: "Mathematics",
      code: "MATH101",
      creditHours: 5,
      type: "Core",
    },
    { id: 2, name: "English", code: "ENG101", creditHours: 4, type: "Core" },
    { id: 3, name: "Science", code: "SCI101", creditHours: 5, type: "Core" },
    {
      id: 4,
      name: "Computer Science",
      code: "CS101",
      creditHours: 3,
      type: "Elective",
    },
    {
      id: 5,
      name: "Social Studies",
      code: "SOC101",
      creditHours: 3,
      type: "Core",
    },
    { id: 6, name: "Urdu", code: "URD101", creditHours: 3, type: "Language" },
    {
      id: 7,
      name: "Islamic Studies",
      code: "ISL101",
      creditHours: 2,
      type: "Core",
    },
    { id: 8, name: "Physics", code: "PHY101", creditHours: 4, type: "Science" },
    {
      id: 9,
      name: "Chemistry",
      code: "CHE101",
      creditHours: 4,
      type: "Science",
    },
    {
      id: 10,
      name: "Biology",
      code: "BIO101",
      creditHours: 4,
      type: "Science",
    },
  ];

  // Mock Assigned Subjects Data
  const [assignedSubjects, setAssignedSubjects] = useState({
    "Class 1": {
      A: [1, 2, 3, 5],
      B: [1, 2, 3],
      C: [1, 2],
    },
    "Class 2": {
      A: [1, 2, 3, 4],
      B: [1, 2, 3],
    },
    "Class 3": {
      A: [1, 2, 3, 8, 9, 10],
    },
  });

  const getAssignedSubjects = () => {
    if (!selectedClass || !selectedSection) return [];
    const classSubjects = assignedSubjects[selectedClass] || {};
    const subjectIds = classSubjects[selectedSection] || [];
    return allSubjects.filter((sub) => subjectIds.includes(sub.id));
  };

  const getUnassignedSubjects = () => {
    if (!selectedClass || !selectedSection) return allSubjects;
    const assignedIds =
      assignedSubjects[selectedClass]?.[selectedSection] || [];
    return allSubjects.filter((sub) => !assignedIds.includes(sub.id));
  };

  const handleAssignSubject = (subjectId) => {
    const currentAssigned =
      assignedSubjects[selectedClass]?.[selectedSection] || [];
    const updatedAssigned = [...currentAssigned, subjectId];

    setAssignedSubjects((prev) => ({
      ...prev,
      [selectedClass]: {
        ...prev[selectedClass],
        [selectedSection]: updatedAssigned,
      },
    }));
  };

  const handleRemoveSubject = (subjectId) => {
    const currentAssigned =
      assignedSubjects[selectedClass]?.[selectedSection] || [];
    const updatedAssigned = currentAssigned.filter((id) => id !== subjectId);

    setAssignedSubjects((prev) => ({
      ...prev,
      [selectedClass]: {
        ...prev[selectedClass],
        [selectedSection]: updatedAssigned,
      },
    }));
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const filteredUnassignedSubjects = getUnassignedSubjects().filter(
    (sub) =>
      sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.code.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const assignedList = getAssignedSubjects();
  const totalCreditHours = assignedList.reduce(
    (sum, sub) => sum + sub.creditHours,
    0,
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Assign Subject to Class
          </h1>
          <p className="text-gray-500 mt-1">
            Map subjects to specific classes and sections
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/subjects")}
          className="flex items-center gap-2"
        >
          <X className="w-4 h-4" />
          Back to Subjects
        </Button>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-700 font-medium">
            Subjects assigned successfully!
          </span>
        </div>
      )}

      {/* Class & Section Selector */}
      <Card className="p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Class <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedClass}
              onChange={(e) => {
                setSelectedClass(e.target.value);
                setSelectedSection("");
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose a class</option>
              {classes.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Section <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              disabled={!selectedClass}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            >
              <option value="">Choose a section</option>
              {sections.map((sec) => (
                <option key={sec} value={sec}>
                  Section {sec}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {selectedClass && selectedSection && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Unassigned Subjects */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Available Subjects
                  </h2>
                  <p className="text-sm text-gray-500">
                    Click + to add to curriculum
                  </p>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {filteredUnassignedSubjects.length} subjects available
              </div>
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search subjects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Subjects List */}
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {filteredUnassignedSubjects.map((subject) => (
                <div
                  key={subject.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-blue-500" />
                      <span className="font-medium text-gray-800">
                        {subject.name}
                      </span>
                      <span className="text-xs text-gray-400">
                        {subject.code}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {subject.creditHours} hrs
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          subject.type === "Core"
                            ? "bg-green-100 text-green-700"
                            : subject.type === "Elective"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {subject.type}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAssignSubject(subject.id)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              ))}

              {filteredUnassignedSubjects.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    No subjects available to assign
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Right Column - Assigned Subjects */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {selectedClass} - Section {selectedSection}
                  </h2>
                  <p className="text-sm text-gray-500">Assigned subjects</p>
                </div>
              </div>
              <div className="text-sm font-medium text-blue-600">
                Total: {totalCreditHours} Credits
              </div>
            </div>

            {/* Assigned Subjects List */}
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {assignedList.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">No subjects assigned yet</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Add subjects from the left panel
                  </p>
                </div>
              ) : (
                assignedList.map((subject) => (
                  <div
                    key={subject.id}
                    className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-100"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-gray-800">
                          {subject.name}
                        </span>
                        <span className="text-xs text-gray-400">
                          {subject.code}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {subject.creditHours}{" "}
                          hrs
                        </span>
                        <span className="text-xs text-gray-500">
                          Type: {subject.type}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveSubject(subject.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Summary */}
            {assignedList.length > 0 && (
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Total Subjects:</span>
                    <span className="font-semibold text-gray-800">
                      {assignedList.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Total Credit Hours:</span>
                    <span className="font-semibold text-blue-600">
                      {totalCreditHours}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Weekly Load:</span>
                    <span className="font-semibold text-gray-800">
                      {totalCreditHours} hours/week
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <Button
              onClick={handleSave}
              disabled={isSubmitting || assignedList.length === 0}
              className="w-full mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white flex items-center justify-center gap-2 py-3"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Assignments
                </>
              )}
            </Button>
          </Card>
        </div>
      )}

      {/* Info Box when no class selected */}
      {!selectedClass && (
        <Card className="p-8 text-center bg-gray-50">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-10 h-10 text-gray-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Select a Class & Section
          </h3>
          <p className="text-gray-500">
            Choose a class and section to assign subjects
          </p>
        </Card>
      )}

      {/* Info Box */}
      <Card className="mt-6 p-4 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
          <div>
            <p className="font-medium text-blue-800">
              About Subject Assignment
            </p>
            <p className="text-sm text-blue-700 mt-1">
              Each class section can have multiple subjects. Core subjects are
              mandatory, while elective subjects can be chosen based on student
              preferences. Total credit hours determine the weekly academic
              load.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
