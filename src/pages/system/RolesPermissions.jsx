// src/pages/system/RolesPermissions.jsx

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
  Search,
  Users,
  Key,
  Lock,
  Unlock,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function RolesPermissions() {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);

  // Mock Roles Data
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "Super Admin",
      description: "Full system access",
      usersCount: 1,
      permissions: [
        "all_access",
        "manage_users",
        "manage_settings",
        "manage_modules",
        "view_reports",
      ],
      status: "Active",
    },
    {
      id: 2,
      name: "School Admin",
      description: "School level administration",
      usersCount: 2,
      permissions: [
        "manage_students",
        "manage_teachers",
        "manage_staff",
        "manage_fees",
        "manage_attendance",
        "view_reports",
      ],
      status: "Active",
    },
    {
      id: 3,
      name: "Accountant",
      description: "Financial management",
      usersCount: 1,
      permissions: [
        "manage_fees",
        "manage_expenses",
        "view_reports",
        "generate_invoices",
      ],
      status: "Active",
    },
    {
      id: 4,
      name: "Teacher",
      description: "Teaching staff access",
      usersCount: 25,
      permissions: [
        "manage_attendance",
        "enter_marks",
        "manage_homework",
        "view_students",
      ],
      status: "Active",
    },
    {
      id: 5,
      name: "Librarian",
      description: "Library management",
      usersCount: 1,
      permissions: [
        "manage_books",
        "issue_books",
        "return_books",
        "manage_members",
      ],
      status: "Active",
    },
    {
      id: 6,
      name: "Parent",
      description: "Parent portal access",
      usersCount: 120,
      permissions: [
        "view_student_details",
        "view_fees",
        "view_attendance",
        "view_results",
      ],
      status: "Active",
    },
  ]);

  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    permissions: [],
  });
  const [editRole, setEditRole] = useState(null);

  const allPermissions = [
    {
      id: "all_access",
      label: "All Access",
      category: "Admin",
      description: "Full system access",
    },
    {
      id: "manage_users",
      label: "Manage Users",
      category: "Admin",
      description: "Create, edit, delete users",
    },
    {
      id: "manage_settings",
      label: "Manage Settings",
      category: "Admin",
      description: "System configuration",
    },
    {
      id: "manage_modules",
      label: "Manage Modules",
      category: "Admin",
      description: "Enable/disable modules",
    },
    {
      id: "manage_students",
      label: "Manage Students",
      category: "Students",
      description: "Student CRUD operations",
    },
    {
      id: "manage_teachers",
      label: "Manage Teachers",
      category: "Teachers",
      description: "Teacher CRUD operations",
    },
    {
      id: "manage_staff",
      label: "Manage Staff",
      category: "Staff",
      description: "Staff CRUD operations",
    },
    {
      id: "manage_fees",
      label: "Manage Fees",
      category: "Finance",
      description: "Fee collection and management",
    },
    {
      id: "manage_expenses",
      label: "Manage Expenses",
      category: "Finance",
      description: "Expense tracking",
    },
    {
      id: "manage_attendance",
      label: "Manage Attendance",
      category: "Academics",
      description: "Mark and view attendance",
    },
    {
      id: "enter_marks",
      label: "Enter Marks",
      category: "Academics",
      description: "Marks entry for exams",
    },
    {
      id: "manage_homework",
      label: "Manage Homework",
      category: "Academics",
      description: "Homework CRUD",
    },
    {
      id: "manage_books",
      label: "Manage Books",
      category: "Library",
      description: "Book CRUD operations",
    },
    {
      id: "issue_books",
      label: "Issue Books",
      category: "Library",
      description: "Issue books to students",
    },
    {
      id: "return_books",
      label: "Return Books",
      category: "Library",
      description: "Return book management",
    },
    {
      id: "view_reports",
      label: "View Reports",
      category: "Reports",
      description: "Access all reports",
    },
    {
      id: "view_students",
      label: "View Students",
      category: "View Only",
      description: "Read-only student access",
    },
    {
      id: "view_student_details",
      label: "View Student Details",
      category: "Parent",
      description: "Parent view of child",
    },
    {
      id: "view_fees",
      label: "View Fees",
      category: "Parent",
      description: "Parent view of fees",
    },
    {
      id: "view_attendance",
      label: "View Attendance",
      category: "Parent",
      description: "Parent view of attendance",
    },
    {
      id: "view_results",
      label: "View Results",
      category: "Parent",
      description: "Parent view of results",
    },
    {
      id: "generate_invoices",
      label: "Generate Invoices",
      category: "Finance",
      description: "Create fee invoices",
    },
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
        usersCount: 0,
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

  const togglePermission = (permissionId, isEdit = true) => {
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

  const groupedPermissions = allPermissions.reduce((acc, perm) => {
    if (!acc[perm.category]) acc[perm.category] = [];
    acc[perm.category].push(perm);
    return acc;
  }, {});

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Roles & Permissions
          </h1>
          <p className="text-gray-500 mt-1">
            Manage user roles and access permissions
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigate("/system")}
            className="flex items-center gap-2"
          >
            <X className="w-4 h-4" /> Back
          </Button>
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white flex items-center gap-2"
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
            Role saved successfully!
          </span>
        </div>
      )}

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
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-4 text-white">
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
              <p className="text-white/80 text-sm mt-1">{role.description}</p>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-500 text-sm">
                  <Users className="w-4 h-4 inline mr-1" /> Users:{" "}
                  {role.usersCount}
                </span>
              </div>
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-500 mb-2">
                  Permissions:
                </p>
                <div className="flex flex-wrap gap-1">
                  {role.permissions.slice(0, 4).map((perm) => (
                    <Badge key={perm} className={getPermissionColor(perm)}>
                      {perm.replace(/_/g, " ")}
                    </Badge>
                  ))}
                  {role.permissions.length > 4 && (
                    <Badge className="bg-gray-100">
                      +{role.permissions.length - 4}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex gap-2 pt-3 border-t">
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
          <div className="bg-white rounded-xl w-full max-w-2xl mx-4 my-8 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Role</h2>
              <button onClick={() => setShowAddModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
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
                <div className="max-h-96 overflow-y-auto border rounded-lg p-3">
                  {Object.entries(groupedPermissions).map(
                    ([category, perms]) => (
                      <div key={category} className="mb-4">
                        <h4 className="font-semibold text-gray-700 mb-2 border-b pb-1">
                          {category}
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {perms.map((perm) => (
                            <label
                              key={perm.id}
                              className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded"
                            >
                              <input
                                type="checkbox"
                                checked={newRole.permissions.includes(perm.id)}
                                onChange={() =>
                                  togglePermission(perm.id, false)
                                }
                                className="w-4 h-4"
                              />
                              <div>
                                <span className="text-sm">{perm.label}</span>
                                <p className="text-xs text-gray-400">
                                  {perm.description}
                                </p>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowAddModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddRole}
                className="flex-1 bg-blue-600 text-white"
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
          <div className="bg-white rounded-xl w-full max-w-2xl mx-4 my-8 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Edit Role</h2>
              <button onClick={() => setShowEditModal(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Role Name
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
                <div className="max-h-96 overflow-y-auto border rounded-lg p-3">
                  {Object.entries(groupedPermissions).map(
                    ([category, perms]) => (
                      <div key={category} className="mb-4">
                        <h4 className="font-semibold text-gray-700 mb-2 border-b pb-1">
                          {category}
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {perms.map((perm) => (
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
                              <div>
                                <span className="text-sm">{perm.label}</span>
                                <p className="text-xs text-gray-400">
                                  {perm.description}
                                </p>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
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
            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowEditModal(null)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleEditRole}
                className="flex-1 bg-blue-600 text-white"
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
              Are you sure you want to delete this role? Users with this role
              will be affected.
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
                onClick={handleDeleteRole}
                className="flex-1 bg-red-600 text-white"
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
            <p className="font-medium text-blue-800">
              About Roles & Permissions
            </p>
            <p className="text-sm text-blue-700">
              Define user roles and assign specific permissions to control
              access to different modules.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
