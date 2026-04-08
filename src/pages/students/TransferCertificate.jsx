// src/pages/students/TransferCertificate.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Send,
  Download,
  Printer,
  X,
  CheckCircle,
  Search,
  User,
  Calendar,
  GraduationCap,
  FileText,
  AlertCircle,
  RefreshCw,
  ArrowRight,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function TransferCertificate() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    leavingDate: "",
    reason: "",
    newSchool: "",
    newBoard: "",
    conduct: "Good",
    remarks: "",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [errors, setErrors] = useState({});

  // Mock Students Data (only those who can get TC)
  const students = [
    {
      id: "STU001",
      name: "Alice Johnson",
      class: "Class 5",
      rollNo: "101",
      admissionNo: "20240001",
      fatherName: "John Johnson",
      admissionDate: "2024-01-15",
      leavingReason: "Family relocation",
    },
    {
      id: "STU002",
      name: "Bob Smith",
      class: "Class 5",
      rollNo: "102",
      admissionNo: "20240002",
      fatherName: "Mike Smith",
      admissionDate: "2024-01-15",
      leavingReason: "Changing school",
    },
    {
      id: "STU003",
      name: "Charlie Davis",
      class: "Class 8",
      rollNo: "201",
      admissionNo: "20220001",
      fatherName: "Robert Davis",
      admissionDate: "2022-06-10",
      leavingReason: "Moving to another city",
    },
    {
      id: "STU004",
      name: "Diana Prince",
      class: "Class 10",
      rollNo: "301",
      admissionNo: "20210001",
      fatherName: "Thomas Prince",
      admissionDate: "2021-06-15",
      leavingReason: "Completed studies",
    },
  ];

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.includes(searchTerm),
  );

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    setFormData((prev) => ({
      ...prev,
      leavingDate: new Date().toISOString().split("T")[0],
      reason: student.leavingReason || "",
    }));
    setStep(2);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.leavingDate) newErrors.leavingDate = "Leaving date required";
    if (!formData.reason) newErrors.reason = "Reason required";
    if (!formData.newSchool) newErrors.newSchool = "New school name required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGenerate = async () => {
    if (!validateForm()) return;
    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsGenerating(false);
    setShowPreview(true);
  };

  const handleDownload = () => {
    alert("Transfer Certificate downloaded successfully!");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Transfer Certificate
          </h1>
          <p className="text-gray-500 mt-1">
            Generate TC for students leaving the school
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/students")}
          className="flex items-center gap-2"
        >
          <X className="w-4 h-4" />
          Back to Students
        </Button>
      </div>

      {/* Step 1: Select Student */}
      {!showPreview && step === 1 && (
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Select Student
              </h2>
              <p className="text-gray-500 text-sm">
                Choose a student for transfer certificate
              </p>
            </div>
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name, ID, or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredStudents.map((student) => (
              <button
                key={student.id}
                onClick={() => handleStudentSelect(student)}
                className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold">
                    {student.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-800">
                      {student.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      ID: {student.id} | Roll: {student.rollNo} | Class:{" "}
                      {student.class}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </button>
            ))}
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No students found</p>
            </div>
          )}
        </Card>
      )}

      {/* Step 2: TC Details Form */}
      {!showPreview && step === 2 && selectedStudent && (
        <Card className="p-6 max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Transfer Certificate Details
              </h2>
              <p className="text-gray-500 text-sm">
                Enter TC information for {selectedStudent.name}
              </p>
            </div>
          </div>

          {/* Student Info Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-500">Student Name:</span>{" "}
                <span className="font-medium">{selectedStudent.name}</span>
              </div>
              <div>
                <span className="text-gray-500">Student ID:</span>{" "}
                <span className="font-medium">{selectedStudent.id}</span>
              </div>
              <div>
                <span className="text-gray-500">Class:</span>{" "}
                <span className="font-medium">{selectedStudent.class}</span>
              </div>
              <div>
                <span className="text-gray-500">Roll No:</span>{" "}
                <span className="font-medium">{selectedStudent.rollNo}</span>
              </div>
              <div>
                <span className="text-gray-500">Father's Name:</span>{" "}
                <span className="font-medium">
                  {selectedStudent.fatherName}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Admission Date:</span>{" "}
                <span className="font-medium">
                  {selectedStudent.admissionDate}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Leaving Date *
              </label>
              <Input
                type="date"
                name="leavingDate"
                value={formData.leavingDate}
                onChange={handleChange}
                className={errors.leavingDate ? "border-red-500" : ""}
              />
              {errors.leavingDate && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.leavingDate}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Leaving *
              </label>
              <select
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg ${errors.reason ? "border-red-500" : "border-gray-300"}`}
              >
                <option value="">Select reason</option>
                <option value="Family relocation">Family relocation</option>
                <option value="Changing school">Changing school</option>
                <option value="Moving to another city">
                  Moving to another city
                </option>
                <option value="Completed studies">Completed studies</option>
                <option value="Financial reasons">Financial reasons</option>
                <option value="Health issues">Health issues</option>
                <option value="Other">Other</option>
              </select>
              {errors.reason && (
                <p className="text-red-500 text-xs mt-1">{errors.reason}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New School Name *
              </label>
              <Input
                name="newSchool"
                value={formData.newSchool}
                onChange={handleChange}
                placeholder="Enter school name"
                className={errors.newSchool ? "border-red-500" : ""}
              />
              {errors.newSchool && (
                <p className="text-red-500 text-xs mt-1">{errors.newSchool}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Board
              </label>
              <select
                name="newBoard"
                value={formData.newBoard}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select board</option>
                <option value="CBSE">CBSE</option>
                <option value="ICSE">ICSE</option>
                <option value="State Board">State Board</option>
                <option value="IB">IB</option>
                <option value="IGCSE">IGCSE</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Conduct
              </label>
              <select
                name="conduct"
                value={formData.conduct}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Satisfactory">Satisfactory</option>
                <option value="Average">Average</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Remarks
              </label>
              <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Any additional comments..."
              ></textarea>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={() => setStep(1)}>
              ← Back
            </Button>
            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Generating...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Generate TC
                </>
              )}
            </Button>
          </div>
        </Card>
      )}

      {/* Step 3: TC Preview */}
      {showPreview && selectedStudent && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Transfer Certificate
                </h2>
                <p className="text-gray-500 text-sm">Preview and download</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handlePrint}
                className="flex items-center gap-2"
              >
                <Printer className="w-4 h-4" /> Print
              </Button>
              <Button
                onClick={handleDownload}
                className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Download PDF
              </Button>
            </div>
          </div>

          {/* TC Certificate Preview */}
          <div
            className="border-2 border-gray-200 rounded-xl p-8 bg-white"
            id="tc-preview"
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                BrainForge School
              </h1>
              <p className="text-gray-500">(Affiliated to CBSE Board)</p>
              <p className="text-gray-500">
                123 Education Street, Learning City
              </p>

              <div className="border-t-2 border-gray-300 my-6"></div>

              <h2 className="text-2xl font-bold text-blue-600 mb-6">
                TRANSFER CERTIFICATE
              </h2>

              <p className="text-lg text-gray-700 mb-4">
                This is to certify that
              </p>

              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {selectedStudent.name}
              </h3>

              <p className="text-gray-700 mb-4">
                son/daughter of{" "}
                <span className="font-semibold">
                  {selectedStudent.fatherName}
                </span>
              </p>

              <div className="text-left max-w-md mx-auto space-y-2 mb-6">
                <p className="flex justify-between">
                  <span className="text-gray-600">Admission Number:</span>
                  <span className="font-semibold">
                    {selectedStudent.admissionNo}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Roll Number:</span>
                  <span className="font-semibold">
                    {selectedStudent.rollNo}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Class:</span>
                  <span className="font-semibold">{selectedStudent.class}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Date of Admission:</span>
                  <span className="font-semibold">
                    {selectedStudent.admissionDate}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Date of Leaving:</span>
                  <span className="font-semibold">{formData.leavingDate}</span>
                </p>
              </div>

              <p className="text-gray-700 mb-2">
                Reason for leaving:{" "}
                <span className="font-semibold">{formData.reason}</span>
              </p>
              <p className="text-gray-700 mb-2">
                Conduct:{" "}
                <span className="font-semibold">{formData.conduct}</span>
              </p>
              {formData.newSchool && (
                <p className="text-gray-700 mb-2">
                  Admitted to:{" "}
                  <span className="font-semibold">{formData.newSchool}</span>
                </p>
              )}
              {formData.remarks && (
                <p className="text-gray-700 mt-3 italic">
                  Remarks: {formData.remarks}
                </p>
              )}

              <div className="flex justify-between mt-8 pt-8">
                <div className="text-center">
                  <div className="border-t-2 border-gray-400 w-32 pt-2">
                    Principal
                  </div>
                </div>
                <div className="text-center">
                  <div className="border-t-2 border-gray-400 w-32 pt-2">
                    Date: {formData.leavingDate}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4">
                <p className="text-gray-400 text-sm">School Seal</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <Button
              onClick={() => {
                setShowPreview(false);
                setStep(1);
                setSelectedStudent(null);
                setFormData({
                  leavingDate: "",
                  reason: "",
                  newSchool: "",
                  newBoard: "",
                  conduct: "Good",
                  remarks: "",
                });
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Generate Another TC
            </Button>
          </div>
        </Card>
      )}

      {/* Info Box */}
      <Card className="mt-6 p-4 bg-yellow-50 border-yellow-200">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600" />
          <div>
            <p className="font-medium text-yellow-800">Important Note</p>
            <p className="text-sm text-yellow-700">
              Transfer Certificate (TC) is issued when a student leaves the
              school. Once TC is generated, the student will be marked as
              "Transferred" and moved to alumni section.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
