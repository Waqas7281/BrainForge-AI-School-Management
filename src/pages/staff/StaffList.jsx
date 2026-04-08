// src/pages/staff/StaffList.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  Plus,
  Search,
  Download,
  Eye,
  Edit,
  Trash2,
  X,
  Mail,
  Phone,
  UserCheck,
  Award,
  Users,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

// Mock Staff Data
const staffData = [
  {
    id: "STF001",
    name: "John Smith",
    role: "Accountant",
    department: "Accounts",
    email: "john.smith@school.edu",
    phone: "(555) 111-2222",
    joiningDate: "2022-01-15",
    salary: 35000,
    status: "Active",
  },
  {
    id: "STF002",
    name: "Mary Johnson",
    role: "Librarian",
    department: "Library",
    email: "mary.johnson@school.edu",
    phone: "(555) 333-4444",
    joiningDate: "2021-06-10",
    salary: 32000,
    status: "Active",
  },
  {
    id: "STF003",
    name: "Robert Brown",
    role: "Security Guard",
    department: "Security",
    email: "robert.brown@school.edu",
    phone: "(555) 555-6666",
    joiningDate: "2023-01-20",
    salary: 18000,
    status: "Active",
  },
  {
    id: "STF004",
    name: "Patricia Davis",
    role: "Peon",
    department: "Administration",
    email: "patricia.davis@school.edu",
    phone: "(555) 777-8888",
    joiningDate: "2020-08-05",
    salary: 15000,
    status: "Active",
  },
  {
    id: "STF005",
    name: "Michael Wilson",
    role: "Driver",
    department: "Transport",
    email: "michael.wilson@school.edu",
    phone: "(555) 999-0000",
    joiningDate: "2021-11-12",
    salary: 20000,
    status: "Inactive",
  },
  {
    id: "STF006",
    name: "Jennifer Martinez",
    role: "Receptionist",
    department: "Front Office",
    email: "jennifer.martinez@school.edu",
    phone: "(555) 111-3333",
    joiningDate: "2022-03-18",
    salary: 25000,
    status: "Active",
  },
];

export default function StaffList() {
  const navigate = useNavigate();
  const [staff, setStaff] = useState(staffData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const itemsPerPage = 6;

  const departments = ["all", ...new Set(staff.map((s) => s.department))];

  const filteredStaff = staff.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept =
      selectedDepartment === "all" || member.department === selectedDepartment;
    const matchesStatus =
      selectedStatus === "all" || member.status === selectedStatus;

    return matchesSearch && matchesDept && matchesStatus;
  });

  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);
  const paginatedStaff = filteredStaff.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const stats = {
    total: staff.length,
    active: staff.filter((s) => s.status === "Active").length,
    departments: new Set(staff.map((s) => s.department)).size,
  };

  const handleDelete = () => {
    if (showDeleteModal) {
      setStaff(staff.filter((s) => s.id !== showDeleteModal));
      setShowDeleteModal(null);
    }
  };

  const getStatusBadge = (status) => {
    return status === "Active"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Staff Management</h1>
          <p className="text-gray-500 mt-1">
            Manage all non-teaching staff members
          </p>
        </div>
        <Button
          onClick={() => navigate("/staff/add")}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add New Staff
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Staff</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Staff</p>
              <p className="text-2xl font-bold">{stats.active}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Departments</p>
              <p className="text-2xl font-bold">{stats.departments}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Monthly Salary</p>
              <p className="text-2xl font-bold">
                ₹
                {(staff.reduce((sum, s) => sum + s.salary, 0) / 1000).toFixed(
                  0,
                )}
                K
              </p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name, ID, role, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          >
            {departments.map((d) => (
              <option key={d} value={d}>
                {d === "all" ? "All Departments" : d}
              </option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" /> Export
          </Button>
        </div>
      </Card>

      {/* Staff Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  Staff
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  Role
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  Department
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  Contact
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  Joining Date
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  Salary
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
              {paginatedStaff.map((member) => (
                <tr
                  key={member.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-700 rounded-full flex items-center justify-center text-white font-bold">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">
                          {member.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          ID: {member.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-800">{member.role}</td>
                  <td className="px-4 py-3">
                    <Badge className="bg-blue-100 text-blue-700">
                      {member.department}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 text-sm">
                      <Mail className="w-3 h-3" />
                      {member.email}
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Phone className="w-3 h-3" />
                      {member.phone}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {member.joiningDate}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    ₹{member.salary.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <Badge className={getStatusBadge(member.status)}>
                      {member.status}
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
                        onClick={() => setShowDeleteModal(member.id)}
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

        {filteredStaff.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800">
              No staff found
            </h3>
          </div>
        )}

        {/* Pagination */}
        {filteredStaff.length > 0 && (
          <div className="px-4 py-3 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredStaff.length)} of{" "}
              {filteredStaff.length} staff
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Delete Staff</h3>
            <p className="text-gray-500 mb-6">
              Are you sure you want to delete this staff member?
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteModal(null)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                className="flex-1 bg-red-600 text-white"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
