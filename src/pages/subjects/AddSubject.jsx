// src/pages/subjects/AddSubject.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Save,
  X,
  BookOpen,
  Code,
  Clock,
  Users,
  UserCheck,
  AlertCircle,
  CheckCircle,
  HelpCircle,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export default function AddSubject() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    subjectName: "",
    subjectCode: "",
    subjectType: "Theory",
    class: "",
    teacher: "",
    creditHours: "",
    maxMarks: "100",
    passingMarks: "33",
    description: "",
  });

  // Error state
  const [errors, setErrors] = useState({});

  // Mock Data
  const classes = [
    "Nursery",
    "LKG",
    "UKG",
    "Class 1",
    "Class 2",
    "Class 3",
    "Class 4",
    "Class 5",
    "Class 6",
    "Class 7",
    "Class 8",
    "Class 9",
    "Class 10",
  ];
  const teachers = [
    "Dr. Sarah Wilson",
    "Prof. James Brown",
    "Ms. Emily Davis",
    "Mrs. Lisa Anderson",
    "Mr. Robert Johnson",
    "Ms. Patricia White",
    "Mr. Michael Lee",
  ];
  const subjectTypes = [
    "Theory",
    "Practical",
    "Elective",
    "Core",
    "Language",
    "Vocational",
  ];

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Generate subject code automatically
  const generateCode = () => {
    if (formData.subjectName) {
      const code =
        formData.subjectName.substring(0, 3).toUpperCase() +
        Math.floor(Math.random() * 1000);
      setFormData((prev) => ({ ...prev, subjectCode: code }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.subjectName.trim())
      newErrors.subjectName = "Subject name is required";
    if (!formData.subjectCode.trim())
      newErrors.subjectCode = "Subject code is required";
    if (!formData.class) newErrors.class = "Please select a class";
    if (!formData.teacher) newErrors.teacher = "Please select a teacher";
    if (!formData.creditHours)
      newErrors.creditHours = "Credit hours are required";
    if (
      formData.creditHours &&
      (formData.creditHours < 1 || formData.creditHours > 10)
    ) {
      newErrors.creditHours = "Credit hours must be between 1 and 10";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setShowSuccess(true);

    // Reset form
    setFormData({
      subjectName: "",
      subjectCode: "",
      subjectType: "Theory",
      class: "",
      teacher: "",
      creditHours: "",
      maxMarks: "100",
      passingMarks: "33",
      description: "",
    });

    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Add New Subject</h1>
          <p className="text-gray-500 mt-1">
            Create a new subject for academic curriculum
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/subjects")}
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
            Subject added successfully!
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
                    Enter subject details and curriculum information
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Subject Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="subjectName"
                    value={formData.subjectName}
                    onChange={handleChange}
                    placeholder="e.g., Mathematics, Physics, English"
                    className={errors.subjectName ? "border-red-500" : ""}
                  />
                  {errors.subjectName && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.subjectName}
                    </p>
                  )}
                </div>

                {/* Subject Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject Code <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <Input
                      name="subjectCode"
                      value={formData.subjectCode}
                      onChange={handleChange}
                      placeholder="e.g., MATH101"
                      className={
                        errors.subjectCode ? "border-red-500 flex-1" : "flex-1"
                      }
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={generateCode}
                      className="px-3"
                    >
                      <Code className="w-4 h-4" />
                    </Button>
                  </div>
                  {errors.subjectCode && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.subjectCode}
                    </p>
                  )}
                </div>

                {/* Subject Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject Type
                  </label>
                  <select
                    name="subjectType"
                    value={formData.subjectType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {subjectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Class */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Class <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="class"
                    value={formData.class}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.class ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select Class</option>
                    {classes.map((cls) => (
                      <option key={cls} value={cls}>
                        {cls}
                      </option>
                    ))}
                  </select>
                  {errors.class && (
                    <p className="text-red-500 text-xs mt-1">{errors.class}</p>
                  )}
                </div>

                {/* Teacher */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assigned Teacher <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="teacher"
                    value={formData.teacher}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.teacher ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select Teacher</option>
                    {teachers.map((teacher) => (
                      <option key={teacher} value={teacher}>
                        {teacher}
                      </option>
                    ))}
                  </select>
                  {errors.teacher && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.teacher}
                    </p>
                  )}
                </div>

                {/* Credit Hours */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Credit Hours <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="creditHours"
                    type="number"
                    value={formData.creditHours}
                    onChange={handleChange}
                    placeholder="e.g., 3, 4, 5"
                    className={errors.creditHours ? "border-red-500" : ""}
                  />
                  {errors.creditHours && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.creditHours}
                    </p>
                  )}
                </div>
              </div>
            </Card>

            {/* Assessment Settings */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Assessment Settings
                  </h2>
                  <p className="text-sm text-gray-500">
                    Configure marks and grading criteria
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Marks
                  </label>
                  <Input
                    name="maxMarks"
                    type="number"
                    value={formData.maxMarks}
                    onChange={handleChange}
                    placeholder="e.g., 100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Passing Marks
                  </label>
                  <Input
                    name="passingMarks"
                    type="number"
                    value={formData.passingMarks}
                    onChange={handleChange}
                    placeholder="e.g., 33"
                  />
                </div>
              </div>
            </Card>

            {/* Description */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Description
                  </h2>
                  <p className="text-sm text-gray-500">
                    Additional information about the subject
                  </p>
                </div>
              </div>

              <div>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter subject syllabus, topics covered, or any additional information..."
                />
              </div>
            </Card>
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-6">
            {/* Preview Card */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Preview</h2>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-4">
                <div className="text-center mb-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-gray-800 text-lg">
                    {formData.subjectName || "Subject Name"}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {formData.subjectCode || "CODE"}
                  </p>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Class:</span>
                      <span className="text-gray-800 font-medium">
                        {formData.class || "Not selected"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-1">
                      <span className="text-gray-500">Teacher:</span>
                      <span className="text-gray-800 font-medium">
                        {formData.teacher || "Not assigned"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-1">
                      <span className="text-gray-500">Credit Hours:</span>
                      <span className="text-gray-800 font-medium">
                        {formData.creditHours || "-"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-1">
                      <span className="text-gray-500">Type:</span>
                      <span className="text-gray-800 font-medium">
                        {formData.subjectType}
                      </span>
                    </div>
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
                    Creating Subject...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Create Subject
                  </>
                )}
              </Button>
            </Card>

            {/* Info Box */}
            <Card className="p-4 bg-yellow-50 border-yellow-200">
              <div className="flex gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-yellow-800">
                  Subject code will be used for examination and report
                  generation. Make sure it's unique for each subject.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
