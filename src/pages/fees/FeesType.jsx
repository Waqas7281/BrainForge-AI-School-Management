// src/pages/fees/FeesType.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Tag,
  Plus,
  Edit,
  Trash2,
  X,
  CheckCircle,
  AlertCircle,
  Search,
  DollarSign,
  Calendar,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function FeesType() {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("all");

  // Mock Fees Groups
  const feesGroups = [
    { id: 1, name: "Tuition Fees" },
    { id: 2, name: "Transport Fees" },
    { id: 3, name: "Library Fees" },
    { id: 4, name: "Exam Fees" },
  ];

  // Mock Fees Types Data
  const [feesTypes, setFeesTypes] = useState([
    {
      id: 1,
      name: "Monthly Tuition",
      code: "TUI-MON",
      group: "Tuition Fees",
      amount: 5000,
      frequency: "Monthly",
      status: "Active",
    },
    {
      id: 2,
      name: "Quarterly Tuition",
      code: "TUI-QTR",
      group: "Tuition Fees",
      amount: 13500,
      frequency: "Quarterly",
      status: "Active",
    },
    {
      id: 3,
      name: "Annual Tuition",
      code: "TUI-ANN",
      group: "Tuition Fees",
      amount: 48000,
      frequency: "Yearly",
      status: "Active",
    },
    {
      id: 4,
      name: "Bus Transport",
      code: "TRP-BUS",
      group: "Transport Fees",
      amount: 2000,
      frequency: "Monthly",
      status: "Active",
    },
    {
      id: 5,
      name: "Van Transport",
      code: "TRP-VAN",
      group: "Transport Fees",
      amount: 1500,
      frequency: "Monthly",
      status: "Inactive",
    },
    {
      id: 6,
      name: "Library Membership",
      code: "LIB-MEM",
      group: "Library Fees",
      amount: 1000,
      frequency: "Yearly",
      status: "Active",
    },
    {
      id: 7,
      name: "Half Yearly Exam",
      code: "EXM-HALF",
      group: "Exam Fees",
      amount: 2500,
      frequency: "Half Yearly",
      status: "Active",
    },
    {
      id: 8,
      name: "Annual Exam",
      code: "EXM-ANN",
      group: "Exam Fees",
      amount: 5000,
      frequency: "Yearly",
      status: "Active",
    },
  ]);

  const [newType, setNewType] = useState({
    name: "",
    code: "",
    group: "",
    amount: "",
    frequency: "Monthly",
    description: "",
  });
  const [editType, setEditType] = useState(null);

  const frequencies = [
    "Monthly",
    "Quarterly",
    "Half Yearly",
    "Yearly",
    "One Time",
  ];

  const filteredTypes = feesTypes.filter((type) => {
    const matchesSearch =
      type.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      type.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup =
      selectedGroup === "all" || type.group === selectedGroup;
    return matchesSearch && matchesGroup;
  });

  const handleAddType = () => {
    if (!newType.name || !newType.group || !newType.amount) return;
    const newId = Math.max(...feesTypes.map((t) => t.id), 0) + 1;
    setFeesTypes([
      ...feesTypes,
      {
        id: newId,
        name: newType.name,
        code:
          newType.code || newType.name.substring(0, 3).toUpperCase() + newId,
        group: newType.group,
        amount: parseInt(newType.amount),
        frequency: newType.frequency,
        description: newType.description,
        status: "Active",
      },
    ]);
    setNewType({
      name: "",
      code: "",
      group: "",
      amount: "",
      frequency: "Monthly",
      description: "",
    });
    setShowAddModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleEditType = () => {
    if (!editType.name || !editType.amount) return;
    setFeesTypes(
      feesTypes.map((type) => (type.id === editType.id ? editType : type)),
    );
    setShowEditModal(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDeleteType = () => {
    setFeesTypes(feesTypes.filter((type) => type.id !== showDeleteModal));
    setShowDeleteModal(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const stats = {
    total: feesTypes.length,
    active: feesTypes.filter((t) => t.status === "Active").length,
    totalAmount: feesTypes.reduce((sum, t) => sum + t.amount, 0),
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Fees Type</h1>
          <p className="text-gray-500 mt-1">
            Manage individual fee types under groups
          </p>
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
            <Plus className="w-4 h-4" /> Add Fees Type
          </Button>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-700 font-medium">
            Fees type updated successfully!
          </span>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Types</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Tag className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Types</p>
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
              <p className="text-gray-500 text-sm">Total Amount</p>
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

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="all">All Groups</option>
            {feesGroups.map((g) => (
              <option key={g.id} value={g.name}>
                {g.name}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Fees Types Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  Name
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  Code
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  Group
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  Amount
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  Frequency
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
              {filteredTypes.map((type) => (
                <tr
                  key={type.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {type.name}
                  </td>
                  <td className="px-4 py-3 font-mono text-sm">{type.code}</td>
                  <td className="px-4 py-3">
                    <Badge className="bg-blue-100 text-blue-700">
                      {type.group}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 font-bold text-green-600">
                    ₹{type.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <Badge className="bg-purple-100 text-purple-700">
                      {type.frequency}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      className={
                        type.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }
                    >
                      {type.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setShowEditModal(type)}
                        className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setShowDeleteModal(type.id)}
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
      </Card>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md mx-4 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add Fees Type</h2>
              <button onClick={() => setShowAddModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Type Name *
                </label>
                <Input
                  value={newType.name}
                  onChange={(e) =>
                    setNewType({ ...newType, name: e.target.value })
                  }
                  placeholder="e.g., Monthly Tuition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Code</label>
                <Input
                  value={newType.code}
                  onChange={(e) =>
                    setNewType({ ...newType, code: e.target.value })
                  }
                  placeholder="e.g., TUI-MON"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Group *
                </label>
                <select
                  value={newType.group}
                  onChange={(e) =>
                    setNewType({ ...newType, group: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="">Select Group</option>
                  {feesGroups.map((g) => (
                    <option key={g.id} value={g.name}>
                      {g.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Amount *
                </label>
                <Input
                  type="number"
                  value={newType.amount}
                  onChange={(e) =>
                    setNewType({ ...newType, amount: e.target.value })
                  }
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Frequency
                </label>
                <select
                  value={newType.frequency}
                  onChange={(e) =>
                    setNewType({ ...newType, frequency: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  {frequencies.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  rows="2"
                  value={newType.description}
                  onChange={(e) =>
                    setNewType({ ...newType, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
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
                onClick={handleAddType}
                className="flex-1 bg-blue-600 text-white"
              >
                Add Type
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
              <h2 className="text-xl font-semibold">Edit Fees Type</h2>
              <button onClick={() => setShowEditModal(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Type Name
                </label>
                <Input
                  value={editType.name}
                  onChange={(e) =>
                    setEditType({ ...editType, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Code</label>
                <Input
                  value={editType.code}
                  onChange={(e) =>
                    setEditType({ ...editType, code: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Group</label>
                <select
                  value={editType.group}
                  onChange={(e) =>
                    setEditType({ ...editType, group: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  {feesGroups.map((g) => (
                    <option key={g.id} value={g.name}>
                      {g.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Amount</label>
                <Input
                  type="number"
                  value={editType.amount}
                  onChange={(e) =>
                    setEditType({ ...editType, amount: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Frequency
                </label>
                <select
                  value={editType.frequency}
                  onChange={(e) =>
                    setEditType({ ...editType, frequency: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  {frequencies.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={editType.status}
                  onChange={(e) =>
                    setEditType({ ...editType, status: e.target.value })
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
                onClick={handleEditType}
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
            <h3 className="text-lg font-semibold mb-2">Delete Fees Type</h3>
            <p className="text-gray-500 mb-6">
              Are you sure you want to delete this fees type?
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteModal(null)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteType}
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
            <p className="font-medium text-blue-800">About Fees Type</p>
            <p className="text-sm text-blue-700">
              Fees types are individual fee items under a group. Each type has
              its own amount and frequency.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
