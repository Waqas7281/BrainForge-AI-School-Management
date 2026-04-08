// src/pages/classes/AssignClassTeacher.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserCheck,
  Users,
  CheckCircle,
  X,
  Search,
  Mail,
  Phone,
  Calendar,
  Award,
  BookOpen,
  Plus,
  Trash2,
  Edit,
  Save,
  AlertCircle,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export default function AssignClassTeacher() {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showEditModal, setShowEditModal] = useState(null);
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

  // Mock Teachers Data
  const teachers = [
    {
      id: 1,
      name: "Dr. Sarah Wilson",
      email: "sarah.wilson@school.edu",
      phone: "(555) 123-4567",
      qualification: "Ph.D in Mathematics",
      experience: "12 years",
      subject: "Mathematics",
      status: "Active",
    },
    {
      id: 2,
      name: "Prof. James Brown",
      email: "james.brown@school.edu",
      phone: "(555) 234-5678",
      qualification: "M.A. in English",
      experience: "8 years",
      subject: "English",
      status: "Active",
    },
    {
      id: 3,
      name: "Ms. Emily Davis",
      email: "emily.davis@school.edu",
      phone: "(555) 345-6789",
      qualification: "M.Sc. in Physics",
      experience: "6 years",
      subject: "Science",
      status: "Active",
    },
    {
      id: 4,
      name: "Mrs. Lisa Anderson",
      email: "lisa.anderson@school.edu",
      phone: "(555) 456-7890",
      qualification: "M.A. in History",
      experience: "10 years",
      subject: "Social Studies",
      status: "Active",
    },
    {
      id: 5,
      name: "Mr. Robert Johnson",
      email: "robert.johnson@school.edu",
      phone: "(555) 567-8901",
      qualification: "M.Sc. in Chemistry",
      experience: "7 years",
      subject: "Chemistry",
      status: "Active",
    },
    {
      id: 6,
      name: "Ms. Patricia White",
      email: "patricia.white@school.edu",
      phone: "(555) 678-9012",
      qualification: "B.Ed in Early Childhood",
      experience: "5 years",
      subject: "Nursery",
      status: "Active",
    },
    {
      id: 7,
      name: "Mr. Michael Lee",
      email: "michael.lee@school.edu",
      phone: "(555) 789-0123",
      qualification: "M.Tech in CS",
      experience: "4 years",
      subject: "Computer Science",
      status: "Active",
    },
  ];

  // Mock Assigned Teachers Data
  const [assignedTeachers, setAssignedTeachers] = useState([
    {
      id: 1,
      class: "Class 1",
      section: "A",
      teacherId: 1,
      teacherName: "Dr. Sarah Wilson",
      assignedDate: "2024-01-15",
    },
    {
      id: 2,
      class: "Class 1",
      section: "B",
      teacherId: 2,
      teacherName: "Prof. James Brown",
      assignedDate: "2024-01-15",
    },
    {
      id: 3,
      class: "Class 2",
      section: "A",
      teacherId: 3,
      teacherName: "Ms. Emily Davis",
      assignedDate: "2024-01-15",
    },
    {
      id: 4,
      class: "Nursery",
      section: "A",
      teacherId: 6,
      teacherName: "Ms. Patricia White",
      assignedDate: "2024-01-15",
    },
  ]);

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.qualification.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAssign = async () => {
    if (!selectedClass || !selectedSection || !selectedTeacher) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const teacher = teachers.find((t) => t.id === parseInt(selectedTeacher));
    const newAssignment = {
      id: Date.now(),
      class: selectedClass,
      section: selectedSection,
      teacherId: parseInt(selectedTeacher),
      teacherName: teacher.name,
      assignedDate: new Date().toISOString().split("T")[0],
    };

    setAssignedTeachers([...assignedTeachers, newAssignment]);
    setIsSubmitting(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);

    // Reset form
    setSelectedClass("");
    setSelectedSection("");
    setSelectedTeacher("");
  };

  const handleDelete = (id) => {
    setAssignedTeachers(
      assignedTeachers.filter((assigned) => assigned.id !== id),
    );
    setShowEditModal(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const getAssignedTeacherForClass = (className, sectionName) => {
    return assignedTeachers.find(
      (assigned) =>
        assigned.class === className && assigned.section === sectionName,
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Assign Class Teacher
          </h1>
          <p className="text-gray-500 mt-1">
            Assign or change class teachers for each section
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
            Class teacher assigned successfully!
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Assignment Form */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                New Assignment
              </h2>
              <p className="text-gray-500 text-sm">
                Assign a teacher to a class section
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {/* Class Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Class <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
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

            {/* Section Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Section <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose a section</option>
                {sections.map((sec) => {
                  const isAssigned = getAssignedTeacherForClass(
                    selectedClass,
                    sec,
                  );
                  return (
                    <option key={sec} value={sec} disabled={isAssigned}>
                      Section {sec} {isAssigned ? "(Already Assigned)" : ""}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Teacher Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Teacher <span className="text-red-500">*</span>
              </label>
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search teachers by name or subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <select
                value={selectedTeacher}
                onChange={(e) => setSelectedTeacher(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                size="5"
              >
                <option value="">Select a teacher</option>
                {filteredTeachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name} - {teacher.subject}
                  </option>
                ))}
              </select>
            </div>

            {/* Selected Teacher Preview */}
            {selectedTeacher && (
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Selected Teacher Details:
                </p>
                {(() => {
                  const teacher = teachers.find(
                    (t) => t.id === parseInt(selectedTeacher),
                  );
                  return teacher ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-800">{teacher.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 text-sm">
                          {teacher.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 text-sm">
                          {teacher.qualification}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 text-sm">
                          Subject: {teacher.subject}
                        </span>
                      </div>
                    </div>
                  ) : null;
                })()}
              </div>
            )}

            {/* Assign Button */}
            <Button
              onClick={handleAssign}
              disabled={
                !selectedClass ||
                !selectedSection ||
                !selectedTeacher ||
                isSubmitting
              }
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 mt-4"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Assigning...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Assign Class Teacher
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Right Column - Current Assignments */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Current Assignments
              </h2>
              <p className="text-gray-500 text-sm">
                List of assigned class teachers
              </p>
            </div>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {assignedTeachers.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No assignments yet</p>
              </div>
            ) : (
              assignedTeachers.map((assignment) => (
                <div key={assignment.id} className="bg-gray-50 rounded-lg p-4">
                  {showEditModal === assignment.id ? (
                    // Edit Mode
                    <div className="space-y-3">
                      <select
                        value={assignment.teacherId}
                        onChange={(e) => {
                          const newTeacher = teachers.find(
                            (t) => t.id === parseInt(e.target.value),
                          );
                          setAssignedTeachers(
                            assignedTeachers.map((a) =>
                              a.id === assignment.id
                                ? {
                                    ...a,
                                    teacherId: newTeacher.id,
                                    teacherName: newTeacher.name,
                                  }
                                : a,
                            ),
                          );
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      >
                        {teachers.map((teacher) => (
                          <option key={teacher.id} value={teacher.id}>
                            {teacher.name} - {teacher.subject}
                          </option>
                        ))}
                      </select>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setShowEditModal(null)}
                          variant="outline"
                          size="sm"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={() => setShowEditModal(null)}
                          size="sm"
                          className="bg-green-600"
                        >
                          <Save className="w-3 h-3 mr-1" /> Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <BookOpen className="w-4 h-4 text-gray-400" />
                            <span className="font-semibold text-gray-800">
                              {assignment.class} - Section {assignment.section}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mb-1">
                            <UserCheck className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-700">
                              {assignment.teacherName}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-500 text-sm">
                              Assigned: {assignment.assignedDate}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => setShowEditModal(assignment.id)}
                            className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(assignment.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* Info Box */}
      <Card className="mt-6 p-4 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
          <div>
            <p className="font-medium text-blue-800">
              About Class Teacher Assignment
            </p>
            <p className="text-sm text-blue-700 mt-1">
              Each class section can have only one class teacher. Class teachers
              are responsible for student attendance, parent communication, and
              academic progress monitoring.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
