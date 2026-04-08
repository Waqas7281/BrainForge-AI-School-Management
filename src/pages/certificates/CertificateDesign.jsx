// src/pages/certificates/CertificateDesign.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  Eye,
  Award,
  GraduationCap,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function CertificateDesign() {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  // Mock Templates
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: "Standard Certificate",
      type: "Migration",
      color: "blue",
      font: "Arial",
      watermark: "School Logo",
      status: "Active",
    },
    {
      id: 2,
      name: "Merit Certificate",
      type: "Achievement",
      color: "gold",
      font: "Georgia",
      watermark: "Merit",
      status: "Active",
    },
    {
      id: 3,
      name: "Character Certificate",
      type: "Character",
      color: "green",
      font: "Times New Roman",
      watermark: "Character",
      status: "Active",
    },
    {
      id: 4,
      name: "Scholarship Certificate",
      type: "Scholarship",
      color: "purple",
      font: "Verdana",
      watermark: "Scholarship",
      status: "Inactive",
    },
  ]);

  const [newTemplate, setNewTemplate] = useState({
    name: "",
    type: "Migration",
    color: "blue",
    font: "Arial",
    watermark: "",
  });

  const colors = ["blue", "gold", "green", "purple", "red", "orange"];
  const fonts = [
    "Arial",
    "Georgia",
    "Times New Roman",
    "Verdana",
    "Courier New",
  ];
  const types = [
    "Migration",
    "Character",
    "Achievement",
    "Scholarship",
    "Bonafide",
  ];

  const handleAddTemplate = () => {
    if (!newTemplate.name) return;
    const newId = Math.max(...templates.map((t) => t.id), 0) + 1;
    setTemplates([
      ...templates,
      { ...newTemplate, id: newId, status: "Active" },
    ]);
    setNewTemplate({
      name: "",
      type: "Migration",
      color: "blue",
      font: "Arial",
      watermark: "",
    });
    setShowAddModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleEditTemplate = () => {
    if (!showEditModal.name) return;
    setTemplates(
      templates.map((t) => (t.id === showEditModal.id ? showEditModal : t)),
    );
    setShowEditModal(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDeleteTemplate = () => {
    setTemplates(templates.filter((t) => t.id !== showDeleteModal));
    setShowDeleteModal(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const getColorClass = (color) => {
    switch (color) {
      case "blue":
        return "from-blue-500 to-indigo-600";
      case "gold":
        return "from-yellow-500 to-amber-600";
      case "green":
        return "from-green-500 to-emerald-600";
      case "purple":
        return "from-purple-500 to-pink-600";
      case "red":
        return "from-red-500 to-rose-600";
      case "orange":
        return "from-orange-500 to-amber-600";
      default:
        return "from-gray-500 to-gray-700";
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Certificate Design
          </h1>
          <p className="text-gray-500 mt-1">Manage certificate templates</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigate("/certificates")}
            className="flex items-center gap-2"
          >
            <X className="w-4 h-4" /> Back
          </Button>
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Template
          </Button>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-700 font-medium">
            Template saved successfully!
          </span>
        </div>
      )}

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="overflow-hidden">
            <div
              className={`bg-gradient-to-r ${getColorClass(template.color)} p-4 text-white`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-6 h-6" />
                  <h3 className="text-xl font-bold">{template.name}</h3>
                </div>
                <Badge
                  className={
                    template.status === "Active"
                      ? "bg-green-500 text-white"
                      : "bg-gray-500 text-white"
                  }
                >
                  {template.status}
                </Badge>
              </div>
              <p className="text-white/80 text-sm mt-1">
                Type: {template.type}
              </p>
            </div>
            <div className="p-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Font:</span>
                  <span className="font-medium">{template.font}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Color Theme:</span>
                  <span className="font-medium capitalize">
                    {template.color}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Watermark:</span>
                  <span className="font-medium">
                    {template.watermark || "None"}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 mt-4 pt-3 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedTemplate(template)}
                  className="flex-1"
                >
                  <Eye className="w-4 h-4 mr-1" /> Preview
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowEditModal(template)}
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 mr-1" /> Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDeleteModal(template.id)}
                  className="text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Preview Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-xl w-full max-w-2xl mx-4 my-8 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                Preview: {selectedTemplate.name}
              </h2>
              <button onClick={() => setSelectedTemplate(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div
              className={`border-2 border-${selectedTemplate.color}-200 rounded-xl p-8 bg-white`}
            >
              <div className="text-center">
                <div
                  className={`w-20 h-20 bg-gradient-to-r ${getColorClass(selectedTemplate.color)} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <GraduationCap className="w-10 h-10 text-white" />
                </div>
                <h1
                  className="text-3xl font-bold text-gray-800 mb-2"
                  style={{ fontFamily: selectedTemplate.font }}
                >
                  Certificate of Achievement
                </h1>
                <div className="border-t-2 border-gray-300 w-24 mx-auto my-4"></div>
                <p className="text-lg text-gray-700 mb-4">
                  This is to certify that
                </p>
                <h3
                  className="text-3xl font-bold text-blue-600 mb-2"
                  style={{ fontFamily: selectedTemplate.font }}
                >
                  Student Name
                </h3>
                <p className="text-gray-700 mb-4">
                  has successfully completed the course
                </p>
                <div className="flex justify-between mt-8 pt-8">
                  <div className="text-center">
                    <div className="border-t-2 border-gray-400 w-32 pt-2">
                      Principal
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="border-t-2 border-gray-400 w-32 pt-2">
                      Date
                    </div>
                  </div>
                </div>
                {selectedTemplate.watermark && (
                  <div className="mt-4 text-center text-gray-300 text-sm">
                    {selectedTemplate.watermark}
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setSelectedTemplate(null)}
                className="flex-1"
              >
                Close
              </Button>
              <Button className="flex-1 bg-blue-600 text-white">
                Use Template
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md mx-4 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add Template</h2>
              <button onClick={() => setShowAddModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Template Name
                </label>
                <Input
                  value={newTemplate.name}
                  onChange={(e) =>
                    setNewTemplate({ ...newTemplate, name: e.target.value })
                  }
                  placeholder="e.g., Merit Certificate"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Certificate Type
                </label>
                <select
                  value={newTemplate.type}
                  onChange={(e) =>
                    setNewTemplate({ ...newTemplate, type: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  {types.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Color Theme
                </label>
                <select
                  value={newTemplate.color}
                  onChange={(e) =>
                    setNewTemplate({ ...newTemplate, color: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  {colors.map((c) => (
                    <option key={c} value={c} className="capitalize">
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Font Style
                </label>
                <select
                  value={newTemplate.font}
                  onChange={(e) =>
                    setNewTemplate({ ...newTemplate, font: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  {fonts.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Watermark Text (Optional)
                </label>
                <Input
                  value={newTemplate.watermark}
                  onChange={(e) =>
                    setNewTemplate({
                      ...newTemplate,
                      watermark: e.target.value,
                    })
                  }
                  placeholder="e.g., School Logo"
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
                onClick={handleAddTemplate}
                className="flex-1 bg-blue-600 text-white"
              >
                Add Template
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
              <h2 className="text-xl font-semibold">Edit Template</h2>
              <button onClick={() => setShowEditModal(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Template Name
                </label>
                <Input
                  value={showEditModal.name}
                  onChange={(e) =>
                    setShowEditModal({ ...showEditModal, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Certificate Type
                </label>
                <select
                  value={showEditModal.type}
                  onChange={(e) =>
                    setShowEditModal({ ...showEditModal, type: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  {types.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Color Theme
                </label>
                <select
                  value={showEditModal.color}
                  onChange={(e) =>
                    setShowEditModal({
                      ...showEditModal,
                      color: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  {colors.map((c) => (
                    <option key={c} value={c} className="capitalize">
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Font Style
                </label>
                <select
                  value={showEditModal.font}
                  onChange={(e) =>
                    setShowEditModal({ ...showEditModal, font: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  {fonts.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Watermark Text
                </label>
                <Input
                  value={showEditModal.watermark}
                  onChange={(e) =>
                    setShowEditModal({
                      ...showEditModal,
                      watermark: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={showEditModal.status}
                  onChange={(e) =>
                    setShowEditModal({
                      ...showEditModal,
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
                onClick={handleEditTemplate}
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
            <h3 className="text-lg font-semibold mb-2">Delete Template</h3>
            <p className="text-gray-500 mb-6">
              Are you sure you want to delete this certificate template?
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
                onClick={handleDeleteTemplate}
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
              About Certificate Design
            </p>
            <p className="text-sm text-blue-700">
              Create and customize certificate templates. Choose colors, fonts,
              and watermarks.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
