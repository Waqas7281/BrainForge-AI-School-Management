// src/pages/classes/ClassSections.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Users,
  BookOpen,
  UserCheck,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export default function ClassSections() {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState("Class 1");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [newSection, setNewSection] = useState({
    name: "",
    teacher: "",
    capacity: "",
  });
  const [editSection, setEditSection] = useState(null);

  // Mock Classes Data
  const classes = [
    "Nursery",
    "LKG",
    "UKG",
    "Class 1",
    "Class 2",
    "Class 3",
    "Class 4",
    "Class 5",
  ];

  // Mock Sections Data
  const [sections, setSections] = useState({
    "Class 1": [
      {
        id: 1,
        name: "A",
        teacher: "Ms. Sarah Wilson",
        capacity: 35,
        students: 32,
      },
      {
        id: 2,
        name: "B",
        teacher: "Mr. James Brown",
        capacity: 35,
        students: 31,
      },
      {
        id: 3,
        name: "C",
        teacher: "Ms. Emily Davis",
        capacity: 35,
        students: 28,
      },
    ],
    "Class 2": [
      {
        id: 4,
        name: "A",
        teacher: "Mrs. Lisa Anderson",
        capacity: 35,
        students: 29,
      },
      {
        id: 5,
        name: "B",
        teacher: "Mr. Michael Lee",
        capacity: 35,
        students: 30,
      },
    ],
    "Class 3": [
      {
        id: 6,
        name: "A",
        teacher: "Mr. Robert Johnson",
        capacity: 35,
        students: 27,
      },
    ],
    Nursery: [
      {
        id: 7,
        name: "A",
        teacher: "Ms. Patricia White",
        capacity: 25,
        students: 25,
      },
    ],
    LKG: [
      {
        id: 8,
        name: "A",
        teacher: "Ms. Jennifer Garcia",
        capacity: 28,
        students: 28,
      },
    ],
    UKG: [
      {
        id: 9,
        name: "A",
        teacher: "Mr. David Miller",
        capacity: 30,
        students: 30,
      },
    ],
  });

  const currentSections = sections[selectedClass] || [];

  // Add Section
  const handleAddSection = () => {
    if (!newSection.name.trim()) return;

    const newId = Date.now();
    const updatedSections = {
      ...sections,
      [selectedClass]: [
        ...currentSections,
        {
          id: newId,
          name: newSection.name.toUpperCase(),
          teacher: newSection.teacher || "Not Assigned",
          capacity: parseInt(newSection.capacity) || 40,
          students: 0,
        },
      ],
    };
    setSections(updatedSections);
    setNewSection({ name: "", teacher: "", capacity: "" });
    setShowAddModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  // Edit Section
  const handleEditSection = () => {
    if (!editSection.name.trim()) return;

    const updatedSections = {
      ...sections,
      [selectedClass]: currentSections.map((sec) =>
        sec.id === editSection.id
          ? {
              ...sec,
              name: editSection.name.toUpperCase(),
              teacher: editSection.teacher,
              capacity: parseInt(editSection.capacity),
            }
          : sec,
      ),
    };
    setSections(updatedSections);
    setEditSection(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  // Delete Section
  const handleDeleteSection = (id) => {
    const updatedSections = {
      ...sections,
      [selectedClass]: currentSections.filter((sec) => sec.id !== id),
    };
    setSections(updatedSections);
    setShowDeleteModal(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Class Sections</h1>
          <p className="text-gray-500 mt-1">Manage sections for each class</p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/classes")}
          className="flex items-center gap-2"
        >
          <X className="w-4 h-4" />
          Back to Classes
        </Button>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-700 font-medium">
            Section updated successfully!
          </span>
        </div>
      )}

      {/* Class Selector */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Class
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {classes.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add New Section
          </Button>
        </div>
      </Card>

      {/* Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentSections.map((section) => (
          <Card key={section.id} className="overflow-hidden">
            {editSection?.id === section.id ? (
              // Edit Mode
              <div className="p-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Section Name
                  </label>
                  <Input
                    value={editSection.name}
                    onChange={(e) =>
                      setEditSection({ ...editSection, name: e.target.value })
                    }
                    placeholder="e.g., A, B, C"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Class Teacher
                  </label>
                  <Input
                    value={editSection.teacher}
                    onChange={(e) =>
                      setEditSection({
                        ...editSection,
                        teacher: e.target.value,
                      })
                    }
                    placeholder="Teacher name"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Capacity
                  </label>
                  <Input
                    type="number"
                    value={editSection.capacity}
                    onChange={(e) =>
                      setEditSection({
                        ...editSection,
                        capacity: e.target.value,
                      })
                    }
                    placeholder="Max students"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleEditSection}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <Save className="w-4 h-4 mr-1" /> Save
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setEditSection(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              // View Mode
              <>
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">
                        Section {section.name}
                      </h2>
                      <p className="text-white/80 text-sm mt-1">
                        {selectedClass}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <BookOpen className="w-6 h-6" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-sm">
                        Class Teacher
                      </span>
                      <div className="flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-800 font-medium">
                          {section.teacher}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-sm">Capacity</span>
                      <span className="text-gray-800 font-medium">
                        {section.capacity} students
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-sm">Enrolled</span>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-800 font-medium">
                          {section.students} students
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-green-500 rounded-full h-2"
                        style={{
                          width: `${(section.students / section.capacity) * 100}%`,
                        }}
                      />
                    </div>
                    <div className="flex gap-2 pt-3">
                      <Button
                        onClick={() => setEditSection(section)}
                        variant="outline"
                        className="flex-1"
                      >
                        <Edit className="w-4 h-4 mr-1" /> Edit
                      </Button>
                      <Button
                        onClick={() => setShowDeleteModal(section.id)}
                        variant="outline"
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {currentSections.length === 0 && (
        <Card className="p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            No Sections Found
          </h3>
          <p className="text-gray-500 mb-4">
            {selectedClass} has no sections yet. Click "Add New Section" to
            create one.
          </p>
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add First Section
          </Button>
        </Card>
      )}

      {/* Add Section Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md mx-4 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Add New Section
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Section Name <span className="text-red-500">*</span>
                </label>
                <Input
                  value={newSection.name}
                  onChange={(e) =>
                    setNewSection({ ...newSection, name: e.target.value })
                  }
                  placeholder="e.g., A, B, C"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Class Teacher
                </label>
                <Input
                  value={newSection.teacher}
                  onChange={(e) =>
                    setNewSection({ ...newSection, teacher: e.target.value })
                  }
                  placeholder="Enter teacher name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Maximum Capacity
                </label>
                <Input
                  type="number"
                  value={newSection.capacity}
                  onChange={(e) =>
                    setNewSection({ ...newSection, capacity: e.target.value })
                  }
                  placeholder="e.g., 40"
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
                onClick={handleAddSection}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Add Section
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md mx-4 p-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Delete Section
              </h3>
              <p className="text-gray-500 mb-6">
                Are you sure you want to delete this section? This action cannot
                be undone.
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
                  onClick={() => handleDeleteSection(showDeleteModal)}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
