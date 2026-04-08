// src/pages/examinations/MarksGrade.jsx

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
  Search,
  TrendingUp,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function MarksGrade() {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Mock Grade System
  const [grades, setGrades] = useState([
    {
      id: 1,
      gradeName: "A+",
      minMarks: 90,
      maxMarks: 100,
      gradePoint: 4.0,
      description: "Excellent",
      status: "Active",
    },
    {
      id: 2,
      gradeName: "A",
      minMarks: 80,
      maxMarks: 89,
      gradePoint: 3.7,
      description: "Very Good",
      status: "Active",
    },
    {
      id: 3,
      gradeName: "B+",
      minMarks: 70,
      maxMarks: 79,
      gradePoint: 3.3,
      description: "Good",
      status: "Active",
    },
    {
      id: 4,
      gradeName: "B",
      minMarks: 60,
      maxMarks: 69,
      gradePoint: 3.0,
      description: "Above Average",
      status: "Active",
    },
    {
      id: 5,
      gradeName: "C+",
      minMarks: 50,
      maxMarks: 59,
      gradePoint: 2.7,
      description: "Average",
      status: "Active",
    },
    {
      id: 6,
      gradeName: "C",
      minMarks: 40,
      maxMarks: 49,
      gradePoint: 2.3,
      description: "Below Average",
      status: "Active",
    },
    {
      id: 7,
      gradeName: "D",
      minMarks: 33,
      maxMarks: 39,
      gradePoint: 2.0,
      description: "Pass",
      status: "Active",
    },
    {
      id: 8,
      gradeName: "F",
      minMarks: 0,
      maxMarks: 32,
      gradePoint: 0.0,
      description: "Fail",
      status: "Active",
    },
  ]);

  const [newGrade, setNewGrade] = useState({
    gradeName: "",
    minMarks: "",
    maxMarks: "",
    gradePoint: "",
    description: "",
  });
  const [editGrade, setEditGrade] = useState(null);

  const filteredGrades = grades.filter((grade) =>
    grade.gradeName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddGrade = () => {
    if (!newGrade.gradeName || !newGrade.minMarks || !newGrade.maxMarks) return;
    const newId = Math.max(...grades.map((g) => g.id), 0) + 1;
    setGrades([
      ...grades,
      {
        id: newId,
        gradeName: newGrade.gradeName,
        minMarks: parseInt(newGrade.minMarks),
        maxMarks: parseInt(newGrade.maxMarks),
        gradePoint: parseFloat(newGrade.gradePoint),
        description: newGrade.description,
        status: "Active",
      },
    ]);
    setNewGrade({
      gradeName: "",
      minMarks: "",
      maxMarks: "",
      gradePoint: "",
      description: "",
    });
    setShowAddModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleEditGrade = () => {
    if (!editGrade.gradeName) return;
    setGrades(
      grades.map((grade) => (grade.id === editGrade.id ? editGrade : grade)),
    );
    setShowEditModal(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDeleteGrade = () => {
    setGrades(grades.filter((grade) => grade.id !== showDeleteModal));
    setShowDeleteModal(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Marks Grade</h1>
          <p className="text-gray-500 mt-1">
            Define grading system for examinations
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigate("/examinations")}
            className="flex items-center gap-2"
          >
            <X className="w-4 h-4" /> Back
          </Button>
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Grade
          </Button>
        </div>
      </div>

      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-700">
            Grade system updated successfully!
          </span>
        </div>
      )}

      <Card className="p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by grade name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGrades.map((grade) => (
          <Card key={grade.id} className="overflow-hidden">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-4 text-white">
              <div className="flex justify-between">
                <h3 className="text-2xl font-bold">{grade.gradeName}</h3>
                <Badge className="bg-green-500">{grade.status}</Badge>
              </div>
              <p className="text-white/80 text-sm">
                {grade.minMarks}% - {grade.maxMarks}%
              </p>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Grade Point:</span>
                  <span className="font-bold">{grade.gradePoint}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Description:</span>
                  <span>{grade.description}</span>
                </div>
              </div>
              <div className="flex gap-2 mt-4 pt-3 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowEditModal(grade)}
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 mr-1" /> Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDeleteModal(grade.id)}
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
              <h2 className="text-xl font-semibold">Add Grade</h2>
              <button onClick={() => setShowAddModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Grade Name *
                </label>
                <Input
                  value={newGrade.gradeName}
                  onChange={(e) =>
                    setNewGrade({ ...newGrade, gradeName: e.target.value })
                  }
                  placeholder="e.g., A+, B, C"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Min Marks (%)
                  </label>
                  <Input
                    type="number"
                    value={newGrade.minMarks}
                    onChange={(e) =>
                      setNewGrade({ ...newGrade, minMarks: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Max Marks (%)
                  </label>
                  <Input
                    type="number"
                    value={newGrade.maxMarks}
                    onChange={(e) =>
                      setNewGrade({ ...newGrade, maxMarks: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Grade Point
                </label>
                <Input
                  type="number"
                  step="0.1"
                  value={newGrade.gradePoint}
                  onChange={(e) =>
                    setNewGrade({ ...newGrade, gradePoint: e.target.value })
                  }
                  placeholder="e.g., 4.0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <Input
                  value={newGrade.description}
                  onChange={(e) =>
                    setNewGrade({ ...newGrade, description: e.target.value })
                  }
                  placeholder="e.g., Excellent"
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
                onClick={handleAddGrade}
                className="flex-1 bg-blue-600 text-white"
              >
                Add Grade
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
              <h2 className="text-xl font-semibold">Edit Grade</h2>
              <button onClick={() => setShowEditModal(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Grade Name
                </label>
                <Input
                  value={editGrade.gradeName}
                  onChange={(e) =>
                    setEditGrade({ ...editGrade, gradeName: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Min Marks (%)
                  </label>
                  <Input
                    type="number"
                    value={editGrade.minMarks}
                    onChange={(e) =>
                      setEditGrade({ ...editGrade, minMarks: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Max Marks (%)
                  </label>
                  <Input
                    type="number"
                    value={editGrade.maxMarks}
                    onChange={(e) =>
                      setEditGrade({ ...editGrade, maxMarks: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Grade Point
                </label>
                <Input
                  type="number"
                  step="0.1"
                  value={editGrade.gradePoint}
                  onChange={(e) =>
                    setEditGrade({ ...editGrade, gradePoint: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <Input
                  value={editGrade.description}
                  onChange={(e) =>
                    setEditGrade({ ...editGrade, description: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={editGrade.status}
                  onChange={(e) =>
                    setEditGrade({ ...editGrade, status: e.target.value })
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
                onClick={handleEditGrade}
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
            <h3 className="text-lg font-semibold mb-2">Delete Grade</h3>
            <p className="text-gray-500 mb-6">
              Are you sure you want to delete this grade?
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteModal(null)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteGrade}
                className="bg-red-600 text-white"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      <Card className="mt-6 p-4 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-medium text-blue-800">About Marks Grade</p>
            <p className="text-sm text-blue-700">
              Define grade system for marks calculation. Grades will be
              automatically assigned based on percentage.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
