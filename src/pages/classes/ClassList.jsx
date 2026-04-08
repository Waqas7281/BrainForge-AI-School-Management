// src/pages/classes/ClassList.jsx

import { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Users,
  BookOpen,
  Search,
  Download,
  Printer,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

// Mock Data - Baad mein API se replace karna
const mockClasses = [
  {
    id: 1,
    name: "Nursery",
    section: "A",
    studentCount: 25,
    classTeacher: "Ms. Sarah Wilson",
    roomNo: "101",
    status: "Active",
  },
  {
    id: 2,
    name: "LKG",
    section: "A",
    studentCount: 28,
    classTeacher: "Ms. Emily Davis",
    roomNo: "102",
    status: "Active",
  },
  {
    id: 3,
    name: "UKG",
    section: "A",
    studentCount: 30,
    classTeacher: "Mr. James Brown",
    roomNo: "103",
    status: "Active",
  },
  {
    id: 4,
    name: "Class 1",
    section: "A",
    studentCount: 32,
    classTeacher: "Mrs. Lisa Anderson",
    roomNo: "201",
    status: "Active",
  },
  {
    id: 5,
    name: "Class 1",
    section: "B",
    studentCount: 31,
    classTeacher: "Mr. Michael Lee",
    roomNo: "202",
    status: "Active",
  },
];

export default function ClassList() {
  const [classes, setClasses] = useState(mockClasses);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(null);

  const filteredClasses = classes.filter(
    (cls) =>
      cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.classTeacher.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDelete = (id) => {
    setClasses(classes.filter((cls) => cls.id !== id));
    setShowDeleteModal(null);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">All Classes</h1>
          <p className="text-gray-500 mt-1">
            Manage classes, sections, and class teachers
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add New Class
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Classes</p>
              <p className="text-2xl font-bold text-gray-800">
                {classes.length}
              </p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Sections</p>
              <p className="text-2xl font-bold text-gray-800">
                {classes.length}
              </p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Students</p>
              <p className="text-2xl font-bold text-gray-800">
                {classes.reduce((sum, cls) => sum + cls.studentCount, 0)}
              </p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Classes</p>
              <p className="text-2xl font-bold text-gray-800">
                {classes.filter((cls) => cls.status === "Active").length}
              </p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-orange-600" />
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
            placeholder="Search by class name, section, or teacher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </Card>

      {/* Classes Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  CLASS NAME
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  SECTION
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  CLASS TEACHER
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  STUDENTS
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  ROOM NO.
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
              {filteredClasses.map((cls) => (
                <tr
                  key={cls.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {cls.name}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold">
                      {cls.section}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {cls.classTeacher}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {cls.studentCount}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{cls.roomNo}</td>
                  <td className="px-4 py-3">
                    <Badge className="bg-green-100 text-green-700">
                      Active
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
                        onClick={() => setShowDeleteModal(cls.id)}
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

        {filteredClasses.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800">
              No classes found
            </h3>
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
                Delete Class
              </h3>
              <p className="text-gray-500 mb-6">
                Are you sure you want to delete this class?
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
