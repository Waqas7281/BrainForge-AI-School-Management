import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Calendar, Plus, Edit, Trash2, Check, X } from "lucide-react";
import { useState } from "react";
import { Badge } from "../../components/ui/badge";

export default function AcademicYear() {
  const [years, setYears] = useState([
    {
      id: 1,
      title: "2025-2026",
      startDate: "2025-04-01",
      endDate: "2026-03-31",
      isActive: true,
    },
    {
      id: 2,
      title: "2024-2025",
      startDate: "2024-04-01",
      endDate: "2025-03-31",
      isActive: false,
    },
    {
      id: 3,
      title: "2023-2024",
      startDate: "2023-04-01",
      endDate: "2024-03-31",
      isActive: false,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    endDate: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      // Update existing year
      setYears(
        years.map((year) =>
          year.id === editingId ? { ...year, ...formData } : year,
        ),
      );
      alert("Academic year updated successfully!");
    } else {
      // Add new year
      const newYear = {
        id: Date.now(),
        ...formData,
        isActive: false,
      };
      setYears([newYear, ...years]);
      alert("Academic year added successfully!");
    }

    // Reset form
    setFormData({ title: "", startDate: "", endDate: "" });
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (year) => {
    setFormData({
      title: year.title,
      startDate: year.startDate,
      endDate: year.endDate,
    });
    setEditingId(year.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this academic year?")) {
      setYears(years.filter((year) => year.id !== id));
      alert("Academic year deleted successfully!");
    }
  };

  const handleSetActive = (id) => {
    setYears(
      years.map((year) => ({
        ...year,
        isActive: year.id === id,
      })),
    );
    alert("Active academic year changed successfully!");
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ title: "", startDate: "", endDate: "" });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Academic Year</h1>
          <p className="text-gray-500 mt-1">
            Manage academic years and sessions
          </p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Academic Year
        </Button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <Card className="p-6 border-blue-200 bg-blue-50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {editingId ? "Edit Academic Year" : "Add New Academic Year"}
              </h2>
              <p className="text-sm text-gray-500">
                {editingId
                  ? "Update academic year details"
                  : "Create a new academic year"}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Academic Year Title <span className="text-red-500">*</span>
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="e.g., 2025-2026"
                  required
                />
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date <span className="text-red-500">*</span>
                </label>
                <Input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                  required
                />
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date <span className="text-red-500">*</span>
                </label>
                <Input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3">
              <Button type="button" variant="outline" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Check className="w-4 h-4 mr-2" />
                {editingId ? "Update" : "Save"}
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Academic Years List */}
      <Card>
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Academic Years List
          </h2>

          {years.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Academic Years
              </h3>
              <p className="text-gray-500 mb-4">
                Get started by adding your first academic year
              </p>
              <Button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Academic Year
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {years.map((year) => (
                <div
                  key={year.id}
                  className={`p-4 border rounded-lg flex items-center justify-between transition-all ${
                    year.isActive
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  {/* Left Section */}
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        year.isActive
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {year.title}
                        </h3>
                        {year.isActive && (
                          <Badge className="bg-green-100 text-green-700 border-green-200">
                            Active
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(year.startDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}{" "}
                        -{" "}
                        {new Date(year.endDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Right Section - Actions */}
                  <div className="flex items-center gap-2">
                    {!year.isActive && (
                      <Button
                        onClick={() => handleSetActive(year.id)}
                        variant="outline"
                        size="sm"
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        <Check className="w-4 h-4 mr-1" />
                        Set Active
                      </Button>
                    )}
                    <Button
                      onClick={() => handleEdit(year)}
                      variant="outline"
                      size="sm"
                      className="text-gray-600 hover:text-gray-700"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => handleDelete(year.id)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      disabled={year.isActive}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Info Card */}
      <Card className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Calendar className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Important Information
            </h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Only one academic year can be active at a time</li>
              <li>• Active academic year cannot be deleted</li>
              <li>
                • All students and classes will be linked to the active year
              </li>
              <li>• Make sure to set the correct start and end dates</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
