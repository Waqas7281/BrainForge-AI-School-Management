// src/pages/staff/StaffRoles.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Users,
  Key,
  Lock,
  Unlock,
  Search,
  Briefcase,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function StaffRoles() {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Mock Roles Data
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "Admin Staff",
      description: "Full administrative access",
      staffCount: 2,
      permissions: ["all_access", "manage_staff", "manage_accounts", "reports"],
      status: "Active",
    },
    {
      id: 2,
      name: "Accountant",
      description: "Manages fees, expenses, and financial records",
      staffCount: 1,
      permissions: [
        "manage_fees",
        "manage_expenses",
        "view_reports",
        "generate_invoices",
      ],
      status: "Active",
    },
    {
      id: 3,
      name: "Librarian",
      description: "Manages library books and members",
      staffCount: 1,
      permissions: [
        "manage_books",
        "issue_books",
        "return_books",
        "manage_members",
      ],
      status: "Active",
    },
    {
      id: 4,
      name: "Receptionist",
      description: "Front office and visitor management",
      staffCount: 1,
      permissions: [
        "manage_visitors",
        "manage_calls",
        "view_notices",
        "admission_enquiry",
      ],
      status: "Active",
    },
    {
      id: 5,
      name: "Security Staff",
      description: "Security and access control",
      staffCount: 3,
      permissions: ["manage_visitors", "view_students", "view_staff"],
      status: "Active",
    },
    {
      id: 6,
      name: "Transport Staff",
      description: "Manages vehicles and routes",
      staffCount: 2,
      permissions: ["manage_vehicles", "manage_routes", "view_students"],
      status: "Active",
    },
    {
      id: 7,
      name: "Lab Assistant",
      description: "Manages laboratory equipment",
      staffCount: 2,
      permissions: ["manage_inventory", "view_students", "assist_teachers"],
      status: "Inactive",
    },
  ]);

  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    permissions: [],
  });
  const [editRole, setEditRole] = useState(null);

  const allPermissions = [
    { id: "all_access", label: "All Access", category: "Admin" },
    { id: "manage_staff", label: "Manage Staff", category: "HR" },
    { id: "manage_accounts", label: "Manage Accounts", category: "Finance" },
    { id: "manage_fees", label: "Manage Fees", category: "Finance" },
    { id: "manage_expenses", label: "Manage Expenses", category: "Finance" },
    { id: "manage_books", label: "Manage Books", category: "Library" },
    { id: "issue_books", label: "Issue Books", category: "Library" },
    { id: "return_books", label: "Return Books", category: "Library" },
    { id: "manage_members", label: "Manage Members", category: "Library" },
    { id: "manage_vehicles", label: "Manage Vehicles", category: "Transport" },
    { id: "manage_routes", label: "Manage Routes", category: "Transport" },
    {
      id: "manage_visitors",
      label: "Manage Visitors",
      category: "Front Office",
    },
    { id: "manage_calls", label: "Manage Calls", category: "Front Office" },
    { id: "manage_inventory", label: "Manage Inventory", category: "Store" },
    { id: "view_reports", label: "View Reports", category: "Reports" },
    { id: "view_students", label: "View Students", category: "View Only" },
    { id: "view_staff", label: "View Staff", category: "View Only" },
    { id: "view_notices", label: "View Notices", category: "Communication" },
    {
      id: "admission_enquiry",
      label: "Admission Enquiry",
      category: "Front Office",
    },
    {
      id: "generate_invoices",
      label: "Generate Invoices",
      category: "Finance",
    },
    { id: "assist_teachers", label: "Assist Teachers", category: "Academic" },
  ];

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddRole = () => {
    if (!newRole.name) return;
    const newId = Math.max(...roles.map((r) => r.id), 0) + 1;
    setRoles([
      ...roles,
      {
        id: newId,
        name: newRole.name,
        description: newRole.description,
        staffCount: 0,
        permissions: newRole.permissions,
        status: "Active",
      },
    ]);
    setNewRole({ name: "", description: "", permissions: [] });
    setShowAddModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleEditRole = () => {
    if (!editRole.name) return;
    setRoles(roles.map((role) => (role.id === editRole.id ? editRole : role)));
    setShowEditModal(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDeleteRole = () => {
    setRoles(roles.filter((role) => role.id !== showDeleteModal));
    setShowDeleteModal(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const togglePermission = (
    permissionId,
    isEdit = true,
    currentPermissions = [],
  ) => {
    if (isEdit && editRole) {
      const updatedPermissions = editRole.permissions.includes(permissionId)
        ? editRole.permissions.filter((p) => p !== permissionId)
        : [...editRole.permissions, permissionId];
      setEditRole({ ...editRole, permissions: updatedPermissions });
    } else if (!isEdit) {
      const updatedPermissions = newRole.permissions.includes(permissionId)
        ? newRole.permissions.filter((p) => p !== permissionId)
        : [...newRole.permissions, permissionId];
      setNewRole({ ...newRole, permissions: updatedPermissions });
    }
  };

  const getPermissionColor = (permId) => {
    if (permId === "all_access") return "bg-red-100 text-red-700";
    if (permId.includes("manage")) return "bg-blue-100 text-blue-700";
    if (permId.includes("view")) return "bg-gray-100 text-gray-700";
    return "bg-green-100 text-green-700";
  };

  const stats = {
    total: roles.length,
    active: roles.filter((r) => r.status === "Active").length,
    totalStaff: roles.reduce((sum, r) => sum + r.staffCount, 0),
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Staff Roles</h1>
          <p className="text-gray-500 mt-1">
            Manage roles and permissions for staff members
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigate("/staff")}
            className="flex items-center gap-2"
          >
            <X className="w-4 h-4" /> Back
          </Button>
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Role
          </Button>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-700 font-medium">
            Role updated successfully!
          </span>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Roles</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Roles</p>
              <p className="text-2xl font-bold">{stats.active}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Staff Assigned</p>
              <p className="text-2xl font-bold">{stats.totalStaff}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search roles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </Card>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRoles.map((role) => (
          <Card key={role.id} className="overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="w-6 h-6" />
                  <h3 className="text-xl font-bold">{role.name}</h3>
                </div>
                <Badge
                  className={
                    role.status === "Active"
                      ? "bg-green-500 text-white"
                      : "bg-gray-500 text-white"
                  }
                >
                  {role.status}
                </Badge>
              </div>
            </div>
            <div className="p-4">
              <p className="text-gray-600 text-sm mb-3">{role.description}</p>
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-500 text-sm">
                  <Users className="w-4 h-4 inline mr-1" /> Staff:{" "}
                  {role.staffCount}
                </span>
              </div>
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-500 mb-2">
                  Permissions:
                </p>
                <div className="flex flex-wrap gap-1">
                  {role.permissions.slice(0, 3).map((perm) => (
                    <Badge key={perm} className={getPermissionColor(perm)}>
                      {perm.replace(/_/g, " ")}
                    </Badge>
                  ))}
                  {role.permissions.length > 3 && (
                    <Badge className="bg-gray-100">
                      +{role.permissions.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex gap-2 pt-3 border-t border-gray-100">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowEditModal(role)}
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 mr-1" /> Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDeleteModal(role.id)}
                  className="text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Role Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-xl w-full max-w-2xl mx-4 my-8">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Add New Role</h2>
                <button onClick={() => setShowAddModal(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Role Name *
                </label>
                <Input
                  value={newRole.name}
                  onChange={(e) =>
                    setNewRole({ ...newRole, name: e.target.value })
                  }
                  placeholder="e.g., Office Manager"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  rows="2"
                  value={newRole.description}
                  onChange={(e) =>
                    setNewRole({ ...newRole, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Role description..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Permissions
                </label>
                <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto border rounded-lg p-3">
                  {allPermissions.map((perm) => (
                    <label
                      key={perm.id}
                      className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={newRole.permissions.includes(perm.id)}
                        onChange={() => togglePermission(perm.id, false)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{perm.label}</span>
                      <Badge className="ml-auto text-xs">{perm.category}</Badge>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6 border-t flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleAddRole}
                className="bg-blue-600 text-white"
              >
                Create Role
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Role Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-xl w-full max-w-2xl mx-4 my-8">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Edit Role</h2>
                <button onClick={() => setShowEditModal(null)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Role Name *
                </label>
                <Input
                  value={editRole.name}
                  onChange={(e) =>
                    setEditRole({ ...editRole, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  rows="2"
                  value={editRole.description}
                  onChange={(e) =>
                    setEditRole({ ...editRole, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Permissions
                </label>
                <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto border rounded-lg p-3">
                  {allPermissions.map((perm) => (
                    <label
                      key={perm.id}
                      className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={editRole.permissions.includes(perm.id)}
                        onChange={() => togglePermission(perm.id, true)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{perm.label}</span>
                      <Badge className="ml-auto text-xs">{perm.category}</Badge>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  value={editRole.status}
                  onChange={(e) =>
                    setEditRole({ ...editRole, status: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="p-6 border-t flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowEditModal(null)}>
                Cancel
              </Button>
              <Button
                onClick={handleEditRole}
                className="bg-blue-600 text-white"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Delete Role</h3>
            <p className="text-gray-500 mb-6">
              Are you sure you want to delete this role? Staff with this role
              will be affected.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteModal(null)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteRole}
                className="bg-red-600 text-white"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Info Box */}
      <Card className="mt-6 p-4 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-medium text-blue-800">About Staff Roles</p>
            <p className="text-sm text-blue-700">
              Roles define what actions a staff member can perform. Each role
              has specific permissions. Assign roles to staff to control access
              to different modules.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
