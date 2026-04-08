// src/pages/staff/DisabledStaff.jsx

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
  Briefcase,
  Mail,
  Phone,
  User,
  Clock,
  Building2,
  Download,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function DisabledStaff() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedReason, setSelectedReason] = useState("all");
  const [showRestoreModal, setShowRestoreModal] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock Disabled Staff Data
  const [disabledStaff, setDisabledStaff] = useState([
    {
      id: "STF005",
      name: "Michael Wilson",
      role: "Driver",
      department: "Transport",
      email: "michael.w@school.edu",
      phone: "(555) 999-0000",
      joiningDate: "2021-11-12",
      disabledDate: "2024-02-15",
      disabledReason: "Resigned",
      status: "Resigned",
    },
    {
      id: "STF009",
      name: "Sarah Johnson",
      role: "Nurse",
      department: "Medical",
      email: "sarah.j@school.edu",
      phone: "(555) 222-3333",
      joiningDate: "2020-08-20",
      disabledDate: "2024-01-10",
      disabledReason: "Medical Leave",
      status: "Medical Leave",
    },
    {
      id: "STF010",
      name: "Thomas Brown",
      role: "Security Guard",
      department: "Security",
      email: "thomas.b@school.edu",
      phone: "(555) 444-5555",
      joiningDate: "2019-06-15",
      disabledDate: "2023-12-05",
      disabledReason: "Terminated",
      status: "Terminated",
    },
    {
      id: "STF011",
      name: "Lisa Anderson",
      role: "Receptionist",
      department: "Front Office",
      email: "lisa.a@school.edu",
      phone: "(555) 666-7777",
      joiningDate: "2022-03-10",
      disabledDate: "2024-01-25",
      disabledReason: "Family Relocation",
      status: "Relocated",
    },
  ]);

  const departments = [
    "all",
    ...new Set(disabledStaff.map((s) => s.department)),
  ];
  const reasons = [
    "all",
    "Resigned",
    "Medical Leave",
    "Terminated",
    "Relocated",
    "Retired",
  ];

  const filteredStaff = disabledStaff.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.role.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept =
      selectedDepartment === "all" || staff.department === selectedDepartment;
    const matchesReason =
      selectedReason === "all" || staff.disabledReason === selectedReason;

    return matchesSearch && matchesDept && matchesReason;
  });

  const handleRestore = (staffId) => {
    setDisabledStaff(disabledStaff.filter((s) => s.id !== staffId));
    setShowRestoreModal(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const stats = {
    total: disabledStaff.length,
    resigned: disabledStaff.filter((s) => s.status === "Resigned").length,
    medical: disabledStaff.filter((s) => s.status === "Medical Leave").length,
    terminated: disabledStaff.filter((s) => s.status === "Terminated").length,
  };

  const getReasonBadge = (reason) => {
    switch (reason) {
      case "Resigned":
        return "bg-blue-100 text-blue-700";
      case "Medical Leave":
        return "bg-yellow-100 text-yellow-700";
      case "Terminated":
        return "bg-red-100 text-red-700";
      case "Relocated":
        return "bg-purple-100 text-purple-700";
      case "Retired":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Disabled Staff</h1>
          <p className="text-gray-500 mt-1">
            Manage inactive, resigned, or terminated staff members
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/staff")}
          className="flex items-center gap-2"
        >
          <X className="w-4 h-4" /> Back to Staff
        </Button>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-700 font-medium">
            Staff restored successfully!
          </span>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Disabled</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <UserMinus className="w-5 h-5 text-red-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Resigned</p>
              <p className="text-2xl font-bold">{stats.resigned}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Medical Leave</p>
              <p className="text-2xl font-bold">{stats.medical}</p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Terminated</p>
              <p className="text-2xl font-bold">{stats.terminated}</p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-orange-600" />
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
              placeholder="Search by name, ID, or role..."
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
                  Disabled Date
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  Reason
                </th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredStaff.map((staff) => (
                <tr
                  key={staff.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-700 rounded-full flex items-center justify-center text-white font-bold">
                        {staff.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">
                          {staff.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          ID: {staff.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-800">{staff.role}</td>
                  <td className="px-4 py-3">
                    <Badge className="bg-blue-100 text-blue-700">
                      {staff.department}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 text-sm">
                      <Mail className="w-3 h-3" />
                      {staff.email}
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Phone className="w-3 h-3" />
                      {staff.phone}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {staff.joiningDate}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {staff.disabledDate}
                  </td>
                  <td className="px-4 py-3">
                    <Badge className={getReasonBadge(staff.disabledReason)}>
                      {staff.disabledReason}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setShowRestoreModal(staff.id)}
                        className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg"
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

        {filteredStaff.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserMinus className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800">
              No disabled staff found
            </h3>
          </div>
        )}
      </Card>

      {/* Restore Modal */}
      {showRestoreModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <RefreshCw className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Restore Staff</h3>
            <p className="text-gray-500 mb-6">
              Are you sure you want to restore this staff member? They will
              become active again.
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
                className="flex-1 bg-green-600 text-white"
              >
                Restore
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Info Box */}
      <Card className="mt-6 p-4 bg-orange-50 border-orange-200">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-orange-600" />
          <div>
            <p className="font-medium text-orange-800">About Disabled Staff</p>
            <p className="text-sm text-orange-700">
              Disabled staff members are those who have resigned, are on medical
              leave, or have been terminated. You can restore them to active
              status at any time.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
