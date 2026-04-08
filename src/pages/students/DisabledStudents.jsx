// src/pages/students/DisabledStudents.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserMinus,
  Search,
  Eye,
  RefreshCw,
  X,
  CheckCircle,
  AlertCircle,
  Calendar,
  BookOpen,
  Mail,
  Phone,
  User,
  Clock,
  Filter,
  Download,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function DisabledStudents() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReason, setSelectedReason] = useState("all");
  const [selectedClass, setSelectedClass] = useState("all");
  const [showRestoreModal, setShowRestoreModal] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock Disabled Students Data
  const [disabledStudents, setDisabledStudents] = useState([
    {
      id: "STU005",
      name: "Ethan Hunt",
      class: "Class 10",
      section: "A",
      rollNo: "302",
      email: "ethan.h@school.edu",
      phone: "(555) 567-8901",
      fatherName: "Jim Hunt",
      disabledDate: "2024-03-15",
      disabledReason: "Transferred to another school",
      status: "Transferred",
    },
    {
      id: "STU008",
      name: "Hannah Lee",
      class: "Class 8",
      section: "C",
      rollNo: "303",
      email: "hannah.l@school.edu",
      phone: "(555) 890-1234",
      fatherName: "David Lee",
      disabledDate: "2024-02-20",
      disabledReason: "Family relocation",
      status: "Transferred",
    },
    {
      id: "STU010",
      name: "Ian Baker",
      class: "Class 7",
      section: "B",
      rollNo: "401",
      email: "ian.b@school.edu",
      phone: "(555) 901-2345",
      fatherName: "Robert Baker",
      disabledDate: "2024-01-10",
      disabledReason: "Academic suspension",
      status: "Suspended",
    },
    {
      id: "STU012",
      name: "Julia Roberts",
      class: "Class 9",
      section: "A",
      rollNo: "501",
      email: "julia.r@school.edu",
      phone: "(555) 012-3456",
      fatherName: "Mark Roberts",
      disabledDate: "2023-12-05",
      disabledReason: "Medical leave",
      status: "Medical Leave",
    },
  ]);

  const classes = ["all", ...new Set(disabledStudents.map((s) => s.class))];
  const reasons = [
    "all",
    "Transferred",
    "Suspended",
    "Medical Leave",
    "Family relocation",
    "Academic suspension",
  ];

  const filteredStudents = disabledStudents.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.includes(searchTerm);

    const matchesClass =
      selectedClass === "all" || student.class === selectedClass;
    const matchesReason =
      selectedReason === "all" || student.disabledReason === selectedReason;

    return matchesSearch && matchesClass && matchesReason;
  });

  const handleRestore = (studentId) => {
    setDisabledStudents(disabledStudents.filter((s) => s.id !== studentId));
    setShowRestoreModal(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const stats = {
    total: disabledStudents.length,
    transferred: disabledStudents.filter((s) => s.status === "Transferred")
      .length,
    suspended: disabledStudents.filter((s) => s.status === "Suspended").length,
    medical: disabledStudents.filter((s) => s.status === "Medical Leave")
      .length,
  };

  const getReasonBadge = (reason) => {
    switch (reason) {
      case "Transferred":
        return "bg-blue-100 text-blue-700";
      case "Suspended":
        return "bg-red-100 text-red-700";
      case "Medical Leave":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Disabled Students
          </h1>
          <p className="text-gray-500 mt-1">
            Manage inactive, transferred, or suspended students
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/students")}
          className="flex items-center gap-2"
        >
          <X className="w-4 h-4" />
          Back to Students
        </Button>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-700 font-medium">
            Student restored successfully!
          </span>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Disabled</p>
              <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <UserMinus className="w-5 h-5 text-red-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Transferred</p>
              <p className="text-2xl font-bold text-gray-800">
                {stats.transferred}
              </p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Suspended</p>
              <p className="text-2xl font-bold text-gray-800">
                {stats.suspended}
              </p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Medical Leave</p>
              <p className="text-2xl font-bold text-gray-800">
                {stats.medical}
              </p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name, ID, or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          >
            {classes.map((c) => (
              <option key={c} value={c}>
                {c === "all" ? "All Classes" : c}
              </option>
            ))}
          </select>
          <select
            value={selectedReason}
            onChange={(e) => setSelectedReason(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          >
            {reasons.map((r) => (
              <option key={r} value={r}>
                {r === "all" ? "All Reasons" : r}
              </option>
            ))}
          </select>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" /> Export
          </Button>
        </div>
      </Card>

      {/* Students Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  Student
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  Class
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  Contact
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  Father's Name
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  Disabled Date
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  Reason
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  Status
                </th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-700 rounded-full flex items-center justify-center text-white font-bold">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">
                          {student.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          ID: {student.id} | Roll: {student.rollNo}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-gray-800">{student.class}</div>
                    <div className="text-xs text-gray-500">
                      Section {student.section}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Mail className="w-3 h-3" />
                      {student.email}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Phone className="w-3 h-3" />
                      {student.phone}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {student.fatherName}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {student.disabledDate}
                  </td>
                  <td className="px-4 py-3">
                    <Badge className={getReasonBadge(student.disabledReason)}>
                      {student.disabledReason}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge className={getReasonBadge(student.status)}>
                      {student.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => navigate(`/students/${student.id}`)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setShowRestoreModal(student.id)}
                        className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg"
                        title="Restore Student"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserMinus className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">
              No disabled students found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </Card>

      {/* Restore Confirmation Modal */}
      {showRestoreModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md mx-4 p-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Restore Student
              </h3>
              <p className="text-gray-500 mb-6">
                Are you sure you want to restore this student? They will become
                active again.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowRestoreModal(null)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handleRestore(showRestoreModal)}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  Restore
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info Box */}
      <Card className="mt-6 p-4 bg-orange-50 border-orange-200">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-orange-600" />
          <div>
            <p className="font-medium text-orange-800">
              About Disabled Students
            </p>
            <p className="text-sm text-orange-700">
              Disabled students are those who have left the school, been
              suspended, or are on medical leave. You can restore them to active
              status at any time.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
