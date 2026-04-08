// src/pages/classes/AddClass.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Save,
  X,
  BookOpen,
  UserCheck,
  AlertCircle,
  CheckCircle,
  Users,
  MapPin,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export default function AddClass() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    className: "",
    section: "",
    classTeacher: "",
    roomNo: "",
    capacity: "",
    description: "",
  });

  // Error state
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.className.trim())
      newErrors.className = "Class name is required";
    if (!formData.section.trim()) newErrors.section = "Section is required";
    if (!formData.classTeacher.trim())
      newErrors.classTeacher = "Class teacher is required";
    if (!formData.roomNo.trim()) newErrors.roomNo = "Room number is required";
    if (
      formData.capacity &&
      (formData.capacity < 1 || formData.capacity > 100)
    ) {
      newErrors.capacity = "Capacity must be between 1 and 100";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setShowSuccess(true);

    // Reset form
    setFormData({
      className: "",
      section: "",
      classTeacher: "",
      roomNo: "",
      capacity: "",
      description: "",
    });

    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Add New Class</h1>
          <p className="text-gray-500 mt-1">Create a new class or section</p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/classes")}
          className="flex items-center gap-2"
        >
          <X className="w-4 h-4" />
          Cancel
        </Button>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-700 font-medium">
            Class added successfully!
          </span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Basic Information
                  </h2>
                  <p className="text-sm text-gray-500">
                    Enter class details and section information
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Class Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Class Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="className"
                    value={formData.className}
                    onChange={handleChange}
                    placeholder="e.g., Nursery, LKG, Class 1, Class 2"
                    className={errors.className ? "border-red-500" : ""}
                  />
                  {errors.className && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.className}
                    </p>
                  )}
                </div>

                {/* Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Section <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="section"
                    value={formData.section}
                    onChange={handleChange}
                    placeholder="e.g., A, B, C"
                    className={errors.section ? "border-red-500" : ""}
                  />
                  {errors.section && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.section}
                    </p>
                  )}
                </div>

                {/* Class Teacher */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Class Teacher <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="classTeacher"
                    value={formData.classTeacher}
                    onChange={handleChange}
                    placeholder="Enter teacher name"
                    className={errors.classTeacher ? "border-red-500" : ""}
                  />
                  {errors.classTeacher && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.classTeacher}
                    </p>
                  )}
                </div>

                {/* Room Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Number <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="roomNo"
                    value={formData.roomNo}
                    onChange={handleChange}
                    placeholder="e.g., 101, 202"
                    className={errors.roomNo ? "border-red-500" : ""}
                  />
                  {errors.roomNo && (
                    <p className="text-red-500 text-xs mt-1">{errors.roomNo}</p>
                  )}
                </div>

                {/* Capacity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Capacity
                  </label>
                  <Input
                    name="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={handleChange}
                    placeholder="e.g., 40"
                  />
                  {errors.capacity && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.capacity}
                    </p>
                  )}
                </div>
              </div>
            </Card>

            {/* Additional Information */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Additional Information
                  </h2>
                  <p className="text-sm text-gray-500">
                    Optional details about the class
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter any additional information about this class..."
                />
              </div>
            </Card>
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-6">
            {/* Preview Card */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Preview</h2>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-center mb-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-gray-800 text-lg">
                    {formData.className || "Class Name"}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Section {formData.section || "?"}
                  </p>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                      Teacher: {formData.classTeacher || "Not assigned"}
                    </p>
                    <p className="text-xs text-gray-500">
                      Room: {formData.roomNo || "Not assigned"}
                    </p>
                    {formData.capacity && (
                      <p className="text-xs text-gray-500">
                        Capacity: {formData.capacity} students
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* Submit Button */}
            <Card className="p-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white flex items-center justify-center gap-2 py-6"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating Class...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Create Class
                  </>
                )}
              </Button>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
