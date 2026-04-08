// src/pages/certificates/GenerateCertificate.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Award,
  Plus,
  X,
  CheckCircle,
  AlertCircle,
  Search,
  User,
  Calendar,
  GraduationCap,
  Download,
  Printer,
  Eye,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function GenerateCertificatePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState("standard");
  const [searchTerm, setSearchTerm] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [certificateData, setCertificateData] = useState({
    issueDate: new Date().toISOString().split("T")[0],
    certificateNo: `CERT${Date.now()}`,
    reason: "",
  });

  // Mock Students Data
  const students = [
    {
      id: "STU001",
      name: "Alice Johnson",
      class: "Class 5",
      rollNo: "101",
      fatherName: "John Johnson",
      passingYear: "2024",
      percentage: "85%",
    },
    {
      id: "STU002",
      name: "Bob Smith",
      class: "Class 5",
      rollNo: "102",
      fatherName: "Mike Smith",
      passingYear: "2024",
      percentage: "78%",
    },
    {
      id: "STU003",
      name: "Charlie Davis",
      class: "Class 5",
      rollNo: "103",
      fatherName: "Robert Davis",
      passingYear: "2024",
      percentage: "82%",
    },
    {
      id: "STU004",
      name: "Diana Prince",
      class: "Class 10",
      rollNo: "201",
      fatherName: "Thomas Prince",
      passingYear: "2024",
      percentage: "92%",
    },
  ];

  // Mock Templates
  const templates = [
    {
      id: "standard",
      name: "Standard",
      color: "from-blue-500 to-indigo-600",
      border: "border-blue-200",
    },
    {
      id: "premium",
      name: "Premium",
      color: "from-purple-500 to-pink-600",
      border: "border-purple-200",
    },
    {
      id: "simple",
      name: "Simple",
      color: "from-gray-500 to-gray-700",
      border: "border-gray-200",
    },
    {
      id: "elegant",
      name: "Elegant",
      color: "from-emerald-500 to-teal-600",
      border: "border-emerald-200",
    },
  ];

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.rollNo.includes(searchTerm),
  );

  const handleGenerate = async () => {
    if (!selectedStudent) return;
    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsGenerating(false);
    setShowPreview(true);
  };

  const handleDownload = () => {
    alert("Certificate downloaded successfully!");
  };

  const handlePrint = () => {
    window.print();
  };

  const selectedTemplateData = templates.find((t) => t.id === selectedTemplate);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Generate Certificate
          </h1>
          <p className="text-gray-500 mt-1">Create student certificates</p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/certificates")}
          className="flex items-center gap-2"
        >
          <X className="w-4 h-4" /> Back
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
                Choose a student for certificate
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
                onClick={() => {
                  setSelectedStudent(student);
                  setStep(2);
                }}
                className="w-full flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                  {student.name.charAt(0)}
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-gray-800">{student.name}</p>
                  <p className="text-sm text-gray-500">
                    ID: {student.id} | Roll: {student.rollNo} | Class:{" "}
                    {student.class}
                  </p>
                </div>
                <Badge className="bg-green-100 text-green-700">
                  {student.percentage}
                </Badge>
              </button>
            ))}
          </div>
        </Card>
      )}

      {/* Step 2: Select Template */}
      {!showPreview && step === 2 && selectedStudent && (
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Select Template
                </h2>
                <p className="text-gray-500 text-sm">
                  Choose certificate design
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`p-4 border-2 rounded-xl text-center transition-all ${
                    selectedTemplate === template.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <div
                    className={`w-full h-20 rounded-lg bg-gradient-to-r ${template.color} flex items-center justify-center mb-2`}
                  >
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <p
                    className={`font-semibold ${selectedTemplate === template.id ? "text-blue-600" : "text-gray-700"}`}
                  >
                    {template.name}
                  </p>
                </button>
              ))}
            </div>

            {/* Certificate Preview */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-3">Preview</h3>
              <div
                className={`border-2 ${selectedTemplateData?.border} rounded-xl p-6 bg-white shadow-lg`}
              >
                <div className="text-center">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${selectedTemplateData?.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Certificate of Achievement
                  </h2>
                  <p className="text-gray-600 mb-4">This is to certify that</p>
                  <h3 className="text-2xl font-bold text-blue-600 mb-2">
                    {selectedStudent.name}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    has successfully completed{" "}
                    <span className="font-semibold">
                      {selectedStudent.class}
                    </span>
                  </p>
                  <p className="text-gray-600 mb-4">
                    with{" "}
                    <span className="font-semibold">
                      {selectedStudent.percentage}
                    </span>{" "}
                    marks
                  </p>
                  <div className="flex justify-between mt-6 pt-4">
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
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                ← Back
              </Button>
              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="bg-green-600 text-white"
              >
                {isGenerating ? "Generating..." : "Generate Certificate"}
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Preview & Download */}
      {showPreview && selectedStudent && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Certificate Generated
                </h2>
                <p className="text-gray-500 text-sm">
                  Download or print certificate
                </p>
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
                className="bg-green-600 text-white flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Download PDF
              </Button>
            </div>
          </div>

          <div
            className={`border-2 ${selectedTemplateData?.border} rounded-xl p-8 bg-white`}
            id="certificate"
          >
            <div className="text-center">
              <div
                className={`w-20 h-20 bg-gradient-to-r ${selectedTemplateData?.color} rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Certificate of Achievement
              </h1>
              <p className="text-gray-500 mb-6">(Affiliated to CBSE Board)</p>
              <div className="border-t-2 border-gray-300 w-24 mx-auto mb-6"></div>
              <p className="text-lg text-gray-700 mb-4">
                This is to certify that
              </p>
              <h3 className="text-3xl font-bold text-blue-600 mb-2">
                {selectedStudent.name}
              </h3>
              <p className="text-gray-700 mb-2">
                son/daughter of{" "}
                <span className="font-semibold">
                  {selectedStudent.fatherName}
                </span>
              </p>
              <p className="text-gray-700 mb-2">
                has successfully completed{" "}
                <span className="font-semibold">{selectedStudent.class}</span>{" "}
                from this institution
              </p>
              <p className="text-gray-700 mb-4">
                with Roll Number{" "}
                <span className="font-semibold">{selectedStudent.rollNo}</span>
              </p>
              <p className="text-gray-700 mb-4">
                securing{" "}
                <span className="font-semibold">
                  {selectedStudent.percentage}
                </span>{" "}
                marks
              </p>
              <div className="flex justify-between mt-8 pt-8">
                <div className="text-center">
                  <div className="border-t-2 border-gray-400 w-32 pt-2">
                    Principal
                  </div>
                </div>
                <div className="text-center">
                  <div className="border-t-2 border-gray-400 w-32 pt-2">
                    Date: {new Date().toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4">
                <p className="text-gray-400 text-sm">
                  Certificate No: {certificateData.certificateNo}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <Button
              onClick={() => {
                setShowPreview(false);
                setStep(1);
                setSelectedStudent(null);
              }}
              className="bg-blue-600 text-white"
            >
              Generate Another
            </Button>
          </div>
        </Card>
      )}

      {/* Info Box */}
      <Card className="mt-6 p-4 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-medium text-blue-800">
              About Certificate Generation
            </p>
            <p className="text-sm text-blue-700">
              Generate certificates for students. Choose from multiple templates
              and download as PDF.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
