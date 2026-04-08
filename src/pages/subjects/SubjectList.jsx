// src/pages/subjects/SubjectList.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  BookOpen,
  Search,
  Users,
  Clock,
  Code,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

// Mock Data
const mockSubjects = [
  {
    id: 1,
    name: "Mathematics",
    code: "MATH101",
    class: "Class 1",
    teacher: "Mr. Robert Johnson",
    creditHours: 5,
    status: "Active",
    students: 32,
  },
  {
    id: 2,
    name: "English",
    code: "ENG101",
    class: "Class 1",
    teacher: "Ms. Sarah Wilson",
    creditHours: 4,
    status: "Active",
    students: 32,
  },
  {
    id: 3,
    name: "Science",
    code: "SCI101",
    class: "Class 1",
    teacher: "Mrs. Lisa Anderson",
    creditHours: 5,
    status: "Active",
    students: 32,
  },
  {
    id: 4,
    name: "Mathematics",
    code: "MATH201",
    class: "Class 2",
    teacher: "Mr. Robert Johnson",
    creditHours: 5,
    status: "Active",
    students: 29,
  },
  {
    id: 5,
    name: "English",
    code: "ENG201",
    class: "Class 2",
    teacher: "Ms. Emily Davis",
    creditHours: 4,
    status: "Active",
    students: 29,
  },
  {
    id: 6,
    name: "Computer Science",
    code: "CS101",
    class: "Class 2",
    teacher: "Mr. Michael Lee",
    creditHours: 3,
    status: "Inactive",
    students: 29,
  },
];

export default function SubjectList() {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState(mockSubjects);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(null);

  const filteredSubjects = subjects.filter(
    (sub) =>
      sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.teacher.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDelete = (id) => {
    setSubjects(subjects.filter((sub) => sub.id !== id));
    setShowDeleteModal(null);
  };

  const stats = {
    total: subjects.length,
    active: subjects.filter((s) => s.status === "Active").length,
    totalStudents: subjects.reduce((sum, s) => sum + s.students, 0),
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">All Subjects</h1>
          <p className="text-gray-500 mt-1">
            Manage subjects, codes, and assigned teachers
          </p>
        </div>
        <Button
          onClick={() => navigate("/subjects/add")}
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add New Subject
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Subjects</p>
              <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Subjects</p>
              <p className="text-2xl font-bold text-gray-800">{stats.active}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Enrollments</p>
              <p className="text-2xl font-bold text-gray-800">
                {stats.totalStudents}
              </p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Search Bar */}
      <Card className="p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by subject name, code, or teacher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </Card>

      {/* Subjects Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  SUBJECT
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  CODE
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  CLASS
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  TEACHER
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  CREDIT HRS
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  STATUS
                </th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredSubjects.map((sub) => (
                <tr
                  key={sub.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="font-medium text-gray-800">
                        {sub.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {sub.code}
                    </code>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{sub.class}</td>
                  <td className="px-4 py-3 text-gray-600">{sub.teacher}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-gray-600">{sub.creditHours}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      className={
                        sub.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }
                    >
                      {sub.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setShowDeleteModal(sub.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredSubjects.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800">
              No subjects found
            </h3>
            <p className="text-gray-500 mt-1">
              Click "Add New Subject" to create one
            </p>
          </div>
        )}
      </Card>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md mx-4 p-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Delete Subject
              </h3>
              <p className="text-gray-500 mb-6">
                Are you sure you want to delete this subject?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(null)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(showDeleteModal)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
