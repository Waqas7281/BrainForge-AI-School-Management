// src/pages/subjects/AssignSubjectToTeacher.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserCheck,
  BookOpen,
  Plus,
  Trash2,
  X,
  CheckCircle,
  AlertCircle,
  Search,
  Mail,
  Phone,
  Award,
  Clock,
  Save,
  Users,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export default function AssignSubjectToTeacher() {
  const navigate = useNavigate();
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock Teachers Data
  const teachers = [
    {
      id: 1,
      name: "Dr. Sarah Wilson",
      email: "sarah.wilson@school.edu",
      phone: "(555) 123-4567",
      qualification: "Ph.D in Mathematics",
      experience: "12 years",
      department: "Mathematics",
      specialization: "Algebra & Calculus",
    },
    {
      id: 2,
      name: "Prof. James Brown",
      email: "james.brown@school.edu",
      phone: "(555) 234-5678",
      qualification: "M.A. in English",
      experience: "8 years",
      department: "Languages",
      specialization: "Literature & Grammar",
    },
    {
      id: 3,
      name: "Ms. Emily Davis",
      email: "emily.davis@school.edu",
      phone: "(555) 345-6789",
      qualification: "M.Sc. in Physics",
      experience: "6 years",
      department: "Science",
      specialization: "Physics",
    },
    {
      id: 4,
      name: "Mrs. Lisa Anderson",
      email: "lisa.anderson@school.edu",
      phone: "(555) 456-7890",
      qualification: "M.A. in History",
      experience: "10 years",
      department: "Social Studies",
      specialization: "World History",
    },
    {
      id: 5,
      name: "Mr. Robert Johnson",
      email: "robert.johnson@school.edu",
      phone: "(555) 567-8901",
      qualification: "M.Sc. in Chemistry",
      experience: "7 years",
      department: "Science",
      specialization: "Organic Chemistry",
    },
    {
      id: 6,
      name: "Mr. Michael Lee",
      email: "michael.lee@school.edu",
      phone: "(555) 789-0123",
      qualification: "M.Tech in CS",
      experience: "4 years",
      department: "Computer Science",
      specialization: "Programming & Web Development",
    },
  ];

  // Mock Subjects Data
  const allSubjects = [
    {
      id: 1,
      name: "Mathematics",
      code: "MATH101",
      creditHours: 5,
      type: "Core",
      class: "Class 1",
    },
    {
      id: 2,
      name: "Mathematics",
      code: "MATH201",
      creditHours: 5,
      type: "Core",
      class: "Class 2",
    },
    {
      id: 3,
      name: "Mathematics",
      code: "MATH301",
      creditHours: 5,
      type: "Core",
      class: "Class 3",
    },
    {
      id: 4,
      name: "English",
      code: "ENG101",
      creditHours: 4,
      type: "Core",
      class: "Class 1",
    },
    {
      id: 5,
      name: "English",
      code: "ENG201",
      creditHours: 4,
      type: "Core",
      class: "Class 2",
    },
    {
      id: 6,
      name: "Science",
      code: "SCI101",
      creditHours: 5,
      type: "Core",
      class: "Class 1",
    },
    {
      id: 7,
      name: "Science",
      code: "SCI201",
      creditHours: 5,
      type: "Core",
      class: "Class 2",
    },
    {
      id: 8,
      name: "Computer Science",
      code: "CS101",
      creditHours: 3,
      type: "Elective",
      class: "Class 2",
    },
    {
      id: 9,
      name: "Physics",
      code: "PHY101",
      creditHours: 4,
      type: "Science",
      class: "Class 3",
    },
    {
      id: 10,
      name: "Chemistry",
      code: "CHE101",
      creditHours: 4,
      type: "Science",
      class: "Class 3",
    },
  ];

  // Mock Teacher-Subject Assignments
  const [assignments, setAssignments] = useState({
    1: [1, 4], // Dr. Sarah Wilson teaches MATH101, ENG101
    2: [4, 5], // Prof. James Brown teaches ENG101, ENG201
    3: [6, 7, 9], // Ms. Emily Davis teaches SCI101, SCI201, PHY101
    5: [10], // Mr. Robert Johnson teaches CHE101
    6: [8], // Mr. Michael Lee teaches CS101
  });

  const getTeacherSubjects = () => {
    if (!selectedTeacher) return [];
    const subjectIds = assignments[parseInt(selectedTeacher)] || [];
    return allSubjects.filter((sub) => subjectIds.includes(sub.id));
  };

  const getUnassignedSubjects = () => {
    if (!selectedTeacher) return allSubjects;
    const assignedIds = assignments[parseInt(selectedTeacher)] || [];
    return allSubjects.filter((sub) => !assignedIds.includes(sub.id));
  };

  const handleAssignSubject = (subjectId) => {
    const teacherId = parseInt(selectedTeacher);
    const currentAssigned = assignments[teacherId] || [];
    const updatedAssigned = [...currentAssigned, subjectId];

    setAssignments((prev) => ({
      ...prev,
      [teacherId]: updatedAssigned,
    }));
  };

  const handleRemoveSubject = (subjectId) => {
    const teacherId = parseInt(selectedTeacher);
    const currentAssigned = assignments[teacherId] || [];
    const updatedAssigned = currentAssigned.filter((id) => id !== subjectId);

    setAssignments((prev) => ({
      ...prev,
      [teacherId]: updatedAssigned,
    }));
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const selectedTeacherData = teachers.find(
    (t) => t.id === parseInt(selectedTeacher),
  );
  const assignedSubjects = getTeacherSubjects();
  const unassignedSubjects = getUnassignedSubjects();
  const totalCreditHours = assignedSubjects.reduce(
    (sum, sub) => sum + sub.creditHours,
    0,
  );
  const totalSubjects = assignedSubjects.length;

  const filteredUnassignedSubjects = unassignedSubjects.filter(
    (sub) =>
      sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.class.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Assign Subject to Teacher
          </h1>
          <p className="text-gray-500 mt-1">
            Map subjects to teachers based on expertise
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

      {/* Teacher Selector */}
      <Card className="p-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Teacher <span className="text-red-500">*</span>
          </label>
          <select
            value={selectedTeacher}
            onChange={(e) => setSelectedTeacher(e.target.value)}
            className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Choose a teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name} - {teacher.department} ({teacher.experience})
              </option>
            ))}
          </select>
        </div>
      </Card>

      {selectedTeacher && selectedTeacherData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Teacher Info & Unassigned Subjects */}
          <div className="space-y-6">
            {/* Teacher Information */}
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <UserCheck className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800">
                    {selectedTeacherData.name}
                  </h2>
                  <p className="text-gray-500">
                    {selectedTeacherData.department}
                  </p>
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      {selectedTeacherData.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      {selectedTeacherData.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Award className="w-4 h-4" />
                      {selectedTeacherData.qualification}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      Experience: {selectedTeacherData.experience}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Available Subjects */}
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
                      Click + to assign to teacher
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
                  placeholder="Search by subject name, code, or class..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>

              {/* Subjects List */}
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
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
                        <span className="text-xs text-gray-500">
                          Class: {subject.class}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {subject.creditHours}{" "}
                          hrs
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
          </div>

          {/* Right Column - Assigned Subjects */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Assigned Subjects
                  </h2>
                  <p className="text-sm text-gray-500">
                    Currently teaching subjects
                  </p>
                </div>
              </div>
              <div className="text-sm font-medium text-blue-600">
                Total: {totalCreditHours} Credits
              </div>
            </div>

            {/* Assigned Subjects List */}
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {assignedSubjects.length === 0 ? (
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
                assignedSubjects.map((subject) => (
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
                        <span className="text-xs text-gray-500">
                          Class: {subject.class}
                        </span>
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
            {assignedSubjects.length > 0 && (
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Total Subjects:</span>
                    <span className="font-semibold text-gray-800">
                      {totalSubjects}
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
              disabled={isSubmitting}
              className="w-full mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white flex items-center justify-center gap-2 py-3"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving Assignments...
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

      {/* Info Box when no teacher selected */}
      {!selectedTeacher && (
        <Card className="p-8 text-center bg-gray-50">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserCheck className="w-10 h-10 text-gray-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Select a Teacher
          </h3>
          <p className="text-gray-500">Choose a teacher to assign subjects</p>
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
              Each teacher can be assigned multiple subjects based on their
              qualification and expertise. The total credit hours determine the
              teacher's weekly workload. Make sure to balance the load
              appropriately across all teachers.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
