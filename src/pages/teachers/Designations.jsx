// src/pages/teachers/Designations.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Award,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Users,
  TrendingUp,
  Search,
  DollarSign,
  Calendar,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function Designations() {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Mock Designations Data
  const [designations, setDesignations] = useState([
    {
      id: 1,
      name: "Principal",
      level: "Top Management",
      teachersCount: 1,
      minSalary: 80000,
      maxSalary: 120000,
      responsibilities: "Overall school administration",
      status: "Active",
    },
    {
      id: 2,
      name: "Vice Principal",
      level: "Senior Management",
      teachersCount: 1,
      minSalary: 60000,
      maxSalary: 90000,
      responsibilities: "Academic coordination",
      status: "Active",
    },
    {
      id: 3,
      name: "Senior Teacher",
      level: "Senior",
      teachersCount: 8,
      minSalary: 45000,
      maxSalary: 65000,
      responsibilities: "Subject department head",
      status: "Active",
    },
    {
      id: 4,
      name: "PGT Teacher",
      level: "Senior",
      teachersCount: 12,
      minSalary: 35000,
      maxSalary: 50000,
      responsibilities: "Post graduate teaching",
      status: "Active",
    },
    {
      id: 5,
      name: "TGT Teacher",
      level: "Middle",
      teachersCount: 20,
      minSalary: 28000,
      maxSalary: 40000,
      responsibilities: "Trained graduate teaching",
      status: "Active",
    },
    {
      id: 6,
      name: "PRT Teacher",
      level: "Junior",
      teachersCount: 15,
      minSalary: 22000,
      maxSalary: 32000,
      responsibilities: "Primary teaching",
      status: "Active",
    },
    {
      id: 7,
      name: "Assistant Teacher",
      level: "Junior",
      teachersCount: 10,
      minSalary: 18000,
      maxSalary: 25000,
      responsibilities: "Teaching assistance",
      status: "Active",
    },
    {
      id: 8,
      name: "Trainee Teacher",
      level: "Trainee",
      teachersCount: 5,
      minSalary: 12000,
      maxSalary: 18000,
      responsibilities: "Teacher under training",
      status: "Inactive",
    },
  ]);

  const [newDesignation, setNewDesignation] = useState({
    name: "",
    level: "",
    minSalary: "",
    maxSalary: "",
    responsibilities: "",
  });
  const [editDesignation, setEditDesignation] = useState(null);

  const levels = [
    "Top Management",
    "Senior Management",
    "Senior",
    "Middle",
    "Junior",
    "Trainee",
  ];

  const filteredDesignations = designations.filter(
    (des) =>
      des.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      des.level.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddDesignation = () => {
    if (!newDesignation.name) return;
    const newId = Math.max(...designations.map((d) => d.id), 0) + 1;
    setDesignations([
      ...designations,
      {
        id: newId,
        name: newDesignation.name,
        level: newDesignation.level,
        teachersCount: 0,
        minSalary: parseInt(newDesignation.minSalary) || 0,
        maxSalary: parseInt(newDesignation.maxSalary) || 0,
        responsibilities: newDesignation.responsibilities,
        status: "Active",
      },
    ]);
    setNewDesignation({
      name: "",
      level: "",
      minSalary: "",
      maxSalary: "",
      responsibilities: "",
    });
    setShowAddModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleEditDesignation = () => {
    if (!editDesignation.name) return;
    setDesignations(
      designations.map((des) =>
        des.id === editDesignation.id ? editDesignation : des,
      ),
    );
    setShowEditModal(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDeleteDesignation = () => {
    setDesignations(designations.filter((des) => des.id !== showDeleteModal));
    setShowDeleteModal(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const stats = {
    total: designations.length,
    active: designations.filter((d) => d.status === "Active").length,
    totalTeachers: designations.reduce((sum, d) => sum + d.teachersCount, 0),
  };

  const getLevelBadge = (level) => {
    switch (level) {
      case "Top Management":
        return "bg-red-100 text-red-700";
      case "Senior Management":
        return "bg-purple-100 text-purple-700";
      case "Senior":
        return "bg-blue-100 text-blue-700";
      case "Middle":
        return "bg-green-100 text-green-700";
      case "Junior":
        return "bg-yellow-100 text-yellow-700";
      case "Trainee":
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
          <h1 className="text-2xl font-bold text-gray-800">Designations</h1>
          <p className="text-gray-500 mt-1">
            Manage teacher designations and salary scales
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigate("/teachers")}
            className="flex items-center gap-2"
          >
            <X className="w-4 h-4" /> Back
          </Button>
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Designation
          </Button>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-700 font-medium">
            Designation updated successfully!
          </span>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Designations</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Designations</p>
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
              <p className="text-gray-500 text-sm">Total Teachers</p>
              <p className="text-2xl font-bold">{stats.totalTeachers}</p>
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
            placeholder="Search by designation name or level..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </Card>

      {/* Designations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDesignations.map((des) => (
          <Card key={des.id} className="overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-6 h-6" />
                  <h3 className="text-xl font-bold">{des.name}</h3>
                </div>
                <Badge
                  className={
                    des.status === "Active"
                      ? "bg-green-500 text-white"
                      : "bg-gray-500 text-white"
                  }
                >
                  {des.status}
                </Badge>
              </div>
              <p className="text-white/80 text-sm mt-1">Level: {des.level}</p>
            </div>
            <div className="p-4">
              <div className="mb-3">
                <p className="text-sm text-gray-600">
                  <Users className="w-4 h-4 inline mr-1" /> Teachers:{" "}
                  <span className="font-medium">{des.teachersCount}</span>
                </p>
              </div>
              <div className="mb-3">
                <p className="text-sm text-gray-600">
                  <DollarSign className="w-4 h-4 inline mr-1" /> Salary Range:{" "}
                  <span className="font-medium">
                    ₹{des.minSalary.toLocaleString()} - ₹
                    {des.maxSalary.toLocaleString()}
                  </span>
                </p>
              </div>
              <div className="mb-3">
                <p className="text-sm text-gray-600">
                  <Calendar className="w-4 h-4 inline mr-1" /> Responsibilities:{" "}
                  <span className="font-medium">{des.responsibilities}</span>
                </p>
              </div>
              <div className="flex gap-2 pt-3 border-t border-gray-100">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowEditModal(des)}
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 mr-1" /> Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDeleteModal(des.id)}
                  className="text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Designation Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md mx-4 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add Designation</h2>
              <button onClick={() => setShowAddModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Designation Name *
                </label>
                <Input
                  value={newDesignation.name}
                  onChange={(e) =>
                    setNewDesignation({
                      ...newDesignation,
                      name: e.target.value,
                    })
                  }
                  placeholder="e.g., Senior Teacher"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Level *
                </label>
                <select
                  value={newDesignation.level}
                  onChange={(e) =>
                    setNewDesignation({
                      ...newDesignation,
                      level: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="">Select Level</option>
                  {levels.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Min Salary (₹)
                  </label>
                  <Input
                    type="number"
                    value={newDesignation.minSalary}
                    onChange={(e) =>
                      setNewDesignation({
                        ...newDesignation,
                        minSalary: e.target.value,
                      })
                    }
                    placeholder="e.g., 25000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Max Salary (₹)
                  </label>
                  <Input
                    type="number"
                    value={newDesignation.maxSalary}
                    onChange={(e) =>
                      setNewDesignation({
                        ...newDesignation,
                        maxSalary: e.target.value,
                      })
                    }
                    placeholder="e.g., 40000"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Responsibilities
                </label>
                <textarea
                  rows="2"
                  value={newDesignation.responsibilities}
                  onChange={(e) =>
                    setNewDesignation({
                      ...newDesignation,
                      responsibilities: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Key responsibilities..."
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
                onClick={handleAddDesignation}
                className="flex-1 bg-blue-600 text-white"
              >
                Add Designation
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Designation Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md mx-4 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Edit Designation</h2>
              <button onClick={() => setShowEditModal(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Designation Name *
                </label>
                <Input
                  value={editDesignation.name}
                  onChange={(e) =>
                    setEditDesignation({
                      ...editDesignation,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Level *
                </label>
                <select
                  value={editDesignation.level}
                  onChange={(e) =>
                    setEditDesignation({
                      ...editDesignation,
                      level: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  {levels.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Min Salary (₹)
                  </label>
                  <Input
                    type="number"
                    value={editDesignation.minSalary}
                    onChange={(e) =>
                      setEditDesignation({
                        ...editDesignation,
                        minSalary: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Max Salary (₹)
                  </label>
                  <Input
                    type="number"
                    value={editDesignation.maxSalary}
                    onChange={(e) =>
                      setEditDesignation({
                        ...editDesignation,
                        maxSalary: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Responsibilities
                </label>
                <textarea
                  rows="2"
                  value={editDesignation.responsibilities}
                  onChange={(e) =>
                    setEditDesignation({
                      ...editDesignation,
                      responsibilities: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={editDesignation.status}
                  onChange={(e) =>
                    setEditDesignation({
                      ...editDesignation,
                      status: e.target.value,
                    })
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
                onClick={handleEditDesignation}
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
            <h3 className="text-lg font-semibold mb-2">Delete Designation</h3>
            <p className="text-gray-500 mb-6">
              Are you sure you want to delete this designation? Teachers with
              this designation will be affected.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteModal(null)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteDesignation}
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
            <p className="font-medium text-blue-800">About Designations</p>
            <p className="text-sm text-blue-700">
              Designations define the role and seniority level of teachers. Each
              designation has a salary range and responsibilities. Assign
              designations to teachers during onboarding.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
