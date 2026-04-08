// src/pages/fees/FeesGroup.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Package,
  Plus,
  Edit,
  Trash2,
  X,
  CheckCircle,
  AlertCircle,
  Search,
  DollarSign,
  Calendar,
  Users,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function FeesGroup() {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Mock Fees Groups Data
  const [feesGroups, setFeesGroups] = useState([
    {
      id: 1,
      name: "Tuition Fees",
      code: "TUI",
      description: "Monthly tuition fees",
      totalAmount: 500000,
      status: "Active",
    },
    {
      id: 2,
      name: "Transport Fees",
      code: "TRP",
      description: "Bus transport fees",
      totalAmount: 120000,
      status: "Active",
    },
    {
      id: 3,
      name: "Library Fees",
      code: "LIB",
      description: "Library membership fees",
      totalAmount: 40000,
      status: "Active",
    },
    {
      id: 4,
      name: "Exam Fees",
      code: "EXM",
      description: "Examination fees",
      totalAmount: 80000,
      status: "Active",
    },
    {
      id: 5,
      name: "Development Fees",
      code: "DEV",
      description: "Annual development fund",
      totalAmount: 150000,
      status: "Inactive",
    },
  ]);

  const [newGroup, setNewGroup] = useState({
    name: "",
    code: "",
    description: "",
  });
  const [editGroup, setEditGroup] = useState(null);

  const filteredGroups = feesGroups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.code.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddGroup = () => {
    if (!newGroup.name) return;
    const newId = Math.max(...feesGroups.map((g) => g.id), 0) + 1;
    setFeesGroups([
      ...feesGroups,
      {
        id: newId,
        name: newGroup.name,
        code: newGroup.code || newGroup.name.substring(0, 3).toUpperCase(),
        description: newGroup.description,
        totalAmount: 0,
        status: "Active",
      },
    ]);
    setNewGroup({ name: "", code: "", description: "" });
    setShowAddModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleEditGroup = () => {
    if (!editGroup.name) return;
    setFeesGroups(
      feesGroups.map((group) =>
        group.id === editGroup.id ? editGroup : group,
      ),
    );
    setShowEditModal(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDeleteGroup = () => {
    setFeesGroups(feesGroups.filter((group) => group.id !== showDeleteModal));
    setShowDeleteModal(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const stats = {
    total: feesGroups.length,
    active: feesGroups.filter((g) => g.status === "Active").length,
    totalAmount: feesGroups.reduce((sum, g) => sum + g.totalAmount, 0),
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Fees Group</h1>
          <p className="text-gray-500 mt-1">Manage fee categories</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigate("/fees")}
            className="flex items-center gap-2"
          >
            <X className="w-4 h-4" /> Back
          </Button>
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Group
          </Button>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-700 font-medium">
            Fees group updated successfully!
          </span>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Groups</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Groups</p>
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
              <p className="text-gray-500 text-sm">Total Collection</p>
              <p className="text-2xl font-bold">
                ₹{stats.totalAmount.toLocaleString()}
              </p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-purple-600" />
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
            placeholder="Search by name or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </Card>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroups.map((group) => (
          <Card key={group.id} className="overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="w-6 h-6" />
                  <h3 className="text-xl font-bold">{group.name}</h3>
                </div>
                <Badge
                  className={
                    group.status === "Active"
                      ? "bg-green-500 text-white"
                      : "bg-gray-500 text-white"
                  }
                >
                  {group.status}
                </Badge>
              </div>
              <p className="text-white/80 text-sm mt-1">Code: {group.code}</p>
            </div>
            <div className="p-4">
              <p className="text-gray-600 text-sm mb-3">
                {group.description || "No description"}
              </p>
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-500 text-sm">
                  <DollarSign className="w-4 h-4 inline mr-1" /> Total
                  Collection:{" "}
                  <span className="font-bold">
                    ₹{group.totalAmount.toLocaleString()}
                  </span>
                </span>
              </div>
              <div className="flex gap-2 pt-3 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowEditModal(group)}
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 mr-1" /> Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDeleteModal(group.id)}
                  className="text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md mx-4 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add Fees Group</h2>
              <button onClick={() => setShowAddModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Group Name *
                </label>
                <Input
                  value={newGroup.name}
                  onChange={(e) =>
                    setNewGroup({ ...newGroup, name: e.target.value })
                  }
                  placeholder="e.g., Tuition Fees"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Code</label>
                <Input
                  value={newGroup.code}
                  onChange={(e) =>
                    setNewGroup({ ...newGroup, code: e.target.value })
                  }
                  placeholder="e.g., TUI"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  rows="3"
                  value={newGroup.description}
                  onChange={(e) =>
                    setNewGroup({ ...newGroup, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Description..."
                />
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
                onClick={handleAddGroup}
                className="flex-1 bg-blue-600 text-white"
              >
                Add Group
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md mx-4 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Edit Fees Group</h2>
              <button onClick={() => setShowEditModal(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Group Name *
                </label>
                <Input
                  value={editGroup.name}
                  onChange={(e) =>
                    setEditGroup({ ...editGroup, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Code</label>
                <Input
                  value={editGroup.code}
                  onChange={(e) =>
                    setEditGroup({ ...editGroup, code: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  rows="3"
                  value={editGroup.description}
                  onChange={(e) =>
                    setEditGroup({ ...editGroup, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={editGroup.status}
                  onChange={(e) =>
                    setEditGroup({ ...editGroup, status: e.target.value })
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
                onClick={handleEditGroup}
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
            <h3 className="text-lg font-semibold mb-2">Delete Fees Group</h3>
            <p className="text-gray-500 mb-6">
              Are you sure you want to delete this fees group?
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteModal(null)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteGroup}
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
            <p className="font-medium text-blue-800">About Fees Group</p>
            <p className="text-sm text-blue-700">
              Fees groups are main categories like Tuition Fees, Transport Fees,
              etc. Each group can have multiple fee types.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
