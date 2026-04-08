// src/pages/accounts/IncomeHead.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Save,
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

export default function IncomeHead() {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Mock Income Heads Data
  const [incomeHeads, setIncomeHeads] = useState([
    {
      id: 1,
      name: "Tuition Fees",
      code: "INC001",
      description: "Monthly tuition fees from students",
      totalIncome: 125000,
      status: "Active",
    },
    {
      id: 2,
      name: "Admission Fees",
      code: "INC002",
      description: "One-time admission fees",
      totalIncome: 50000,
      status: "Active",
    },
    {
      id: 3,
      name: "Exam Fees",
      code: "INC003",
      description: "Examination fees",
      totalIncome: 25000,
      status: "Active",
    },
    {
      id: 4,
      name: "Transport Fees",
      code: "INC004",
      description: "Bus transport fees",
      totalIncome: 30000,
      status: "Active",
    },
    {
      id: 5,
      name: "Library Fees",
      code: "INC005",
      description: "Library membership fees",
      totalIncome: 10000,
      status: "Active",
    },
    {
      id: 6,
      name: "Donations",
      code: "INC006",
      description: "Voluntary donations",
      totalIncome: 15000,
      status: "Inactive",
    },
  ]);

  const [newHead, setNewHead] = useState({
    name: "",
    code: "",
    description: "",
  });
  const [editHead, setEditHead] = useState(null);

  const filteredHeads = incomeHeads.filter(
    (head) =>
      head.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      head.code.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddHead = () => {
    if (!newHead.name) return;
    const newId = Math.max(...incomeHeads.map((h) => h.id), 0) + 1;
    setIncomeHeads([
      ...incomeHeads,
      {
        id: newId,
        name: newHead.name,
        code: newHead.code || `INC${String(newId).padStart(3, "0")}`,
        description: newHead.description,
        totalIncome: 0,
        status: "Active",
      },
    ]);
    setNewHead({ name: "", code: "", description: "" });
    setShowAddModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleEditHead = () => {
    if (!editHead.name) return;
    setIncomeHeads(
      incomeHeads.map((head) => (head.id === editHead.id ? editHead : head)),
    );
    setShowEditModal(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDeleteHead = () => {
    setIncomeHeads(incomeHeads.filter((head) => head.id !== showDeleteModal));
    setShowDeleteModal(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const stats = {
    total: incomeHeads.length,
    active: incomeHeads.filter((h) => h.status === "Active").length,
    totalIncome: incomeHeads.reduce((sum, h) => sum + h.totalIncome, 0),
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Income Head</h1>
          <p className="text-gray-500 mt-1">Manage income categories</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigate("/accounts")}
            className="flex items-center gap-2"
          >
            <X className="w-4 h-4" /> Back
          </Button>
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Income Head
          </Button>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-700 font-medium">
            Income head updated successfully!
          </span>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Heads</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Heads</p>
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
              <p className="text-gray-500 text-sm">Total Income</p>
              <p className="text-2xl font-bold">
                ₹{stats.totalIncome.toLocaleString()}
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

      {/* Income Heads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHeads.map((head) => (
          <Card key={head.id} className="overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-teal-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-6 h-6" />
                  <h3 className="text-xl font-bold">{head.name}</h3>
                </div>
                <Badge
                  className={
                    head.status === "Active"
                      ? "bg-green-500 text-white"
                      : "bg-gray-500 text-white"
                  }
                >
                  {head.status}
                </Badge>
              </div>
              <p className="text-white/80 text-sm mt-1">Code: {head.code}</p>
            </div>
            <div className="p-4">
              <p className="text-gray-600 text-sm mb-3">
                {head.description || "No description"}
              </p>
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-500 text-sm">
                  <DollarSign className="w-4 h-4 inline mr-1" /> Total Income:{" "}
                  <span className="font-bold">
                    ₹{head.totalIncome.toLocaleString()}
                  </span>
                </span>
              </div>
              <div className="flex gap-2 pt-3 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowEditModal(head)}
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 mr-1" /> Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDeleteModal(head.id)}
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
              <h2 className="text-xl font-semibold">Add Income Head</h2>
              <button onClick={() => setShowAddModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Head Name *
                </label>
                <Input
                  value={newHead.name}
                  onChange={(e) =>
                    setNewHead({ ...newHead, name: e.target.value })
                  }
                  placeholder="e.g., Tuition Fees"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Code</label>
                <Input
                  value={newHead.code}
                  onChange={(e) =>
                    setNewHead({ ...newHead, code: e.target.value })
                  }
                  placeholder="e.g., INC001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  rows="3"
                  value={newHead.description}
                  onChange={(e) =>
                    setNewHead({ ...newHead, description: e.target.value })
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
                onClick={handleAddHead}
                className="flex-1 bg-blue-600 text-white"
              >
                Add Head
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
              <h2 className="text-xl font-semibold">Edit Income Head</h2>
              <button onClick={() => setShowEditModal(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Head Name *
                </label>
                <Input
                  value={editHead.name}
                  onChange={(e) =>
                    setEditHead({ ...editHead, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Code</label>
                <Input
                  value={editHead.code}
                  onChange={(e) =>
                    setEditHead({ ...editHead, code: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  rows="3"
                  value={editHead.description}
                  onChange={(e) =>
                    setEditHead({ ...editHead, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={editHead.status}
                  onChange={(e) =>
                    setEditHead({ ...editHead, status: e.target.value })
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
                onClick={handleEditHead}
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
            <h3 className="text-lg font-semibold mb-2">Delete Income Head</h3>
            <p className="text-gray-500 mb-6">
              Are you sure you want to delete this income head?
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteModal(null)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteHead}
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
            <p className="font-medium text-blue-800">About Income Heads</p>
            <p className="text-sm text-blue-700">
              Income heads are categories for all incoming money like fees,
              donations, grants, etc. Create heads before adding income entries.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
