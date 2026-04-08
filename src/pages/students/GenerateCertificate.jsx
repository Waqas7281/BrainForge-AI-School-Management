// src/pages/students/GenerateCertificate.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Award,
  Download,
  Printer,
  X,
  CheckCircle,
  Search,
  User,
  Calendar,
  GraduationCap,
  FileText,
  Star,
  Users,
  BookOpen,
  AlertCircle,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function GenerateCertificate() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Mock Students Data
  const students = [
    { id: "STU001", name: "Alice Johnson", class: "Class 5", rollNo: "101", admissionNo: "20240001", fatherName: "John Johnson", passingYear: "2024", percentage: "85%" },
    { id: "STU002", name: "Bob Smith", class: "Class 5", rollNo: "102", admissionNo: "20240002", fatherName: "Mike Smith", passingYear: "2024", percentage: "78%" },
    { id: "STU003", name: "Charlie Davis", class: "Class 5", rollNo: "103", admissionNo: "20240003", fatherName: "Robert Davis", passingYear: "2024", percentage: "82%" },
    { id: "STU004", name: "Diana Prince", class: "Class 10", rollNo: "201", admissionNo: "20190001", fatherName: "Thomas Prince", passingYear: "2024", percentage: "92%" },
    { id: "STU005", name: "Ethan Hunt", class: "Class 10", rollNo: "202", admissionNo: "20190002", fatherName: "Jim Hunt", passingYear: "2024", percentage: "88%" },
  ];

  const certificateTypes = [
    { id: "tc", name: "Transfer Certificate", icon: FileText, description: "For students leaving the school" },
    { id: "mc", name: "Migration Certificate", icon: GraduationCap, description: "For students moving to another board" },
    { id: "cc", name: "Character Certificate", icon: Star, description: "Certificate of good conduct" },
    { id: "sc", name: "Scholarship Certificate", icon: Award, description: "For meritorious students" },
    { id: "pc", name: "Participation Certificate", icon: Users, description: "For extracurricular activities" },
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNo.includes(searchTerm)
  );

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    setStep(2);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsGenerating(false);
    setShowPreview(true);
  };

  const handleDownload = () => {
    // In real app, this would download PDF
    alert("Certificate downloaded successfully!");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Generate Certificate</h1>
          <p className="text-gray-500 mt-1">Create and download student certificates</p>
        </div>
        <Button variant="outline" onClick={() => navigate("/students")} className="flex items-center gap-2">
          <X className="w-4 h-4" />
          Back to Students
        </Button>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8 max-w-2xl mx-auto">
        <div className="flex items-center flex-1">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>1</div>
          <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
        </div>
        <div className="flex items-center flex-1">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>2</div>
          <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`} />
        </div>
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>3</div>
        </div>
      </div>

      {/* Step 1: Select Student */}
      {step === 1 && (
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Select Student</h2>
              <p className="text-gray-500 text-sm">Choose a student to generate certificate</p>
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
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                    {student.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-800">{student.name}</p>
                    <p className="text-sm text-gray-500">ID: {student.id} | Roll: {student.rollNo}</p>
                  </div>
                </div>
                <Badge className="bg-blue-100 text-blue-700">{student.class}</Badge>
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

      {/* Step 2: Select Certificate Type */}
      {step === 2 && selectedStudent && (
        <div className="space-y-6">
          {/* Student Info */}
          <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {selectedStudent.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">{selectedStudent.name}</h3>
                <p className="text-gray-600">ID: {selectedStudent.id} | Roll No: {selectedStudent.rollNo} | Class: {selectedStudent.class}</p>
                <p className="text-gray-500 text-sm">Father: {selectedStudent.fatherName}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Select Certificate Type</h2>
                <p className="text-gray-500 text-sm">Choose the type of certificate to generate</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certificateTypes.map((cert) => (
                <button
                  key={cert.id}
                  onClick={() => setSelectedCertificate(cert.id)}
                  className={`p-4 border-2 rounded-lg text-left transition-all ${selectedCertificate === cert.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${selectedCertificate === cert.id ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
                      <cert.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{cert.name}</p>
                      <p className="text-sm text-gray-500">{cert.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setStep(1)}>← Back</Button>
              <Button onClick={() => setStep(3)} disabled={!selectedCertificate} className="bg-blue-600 hover:bg-blue-700 text-white">
                Next: Generate →
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Step 3: Generate & Preview */}
      {step === 3 && selectedStudent && selectedCertificate && (
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Generate Certificate</h2>
                  <p className="text-gray-500 text-sm">Preview and download</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handlePrint} className="flex items-center gap-2">
                  <Printer className="w-4 h-4" /> Print
                </Button>
                <Button onClick={handleDownload} className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2">
                  <Download className="w-4 h-4" /> Download PDF
                </Button>
              </div>
            </div>

            {/* Certificate Preview */}
            <div className="border-2 border-gray-200 rounded-xl p-8 bg-white" id="certificate-preview">
              <div className="text-center">
                {/* School Logo Placeholder */}
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-10 h-10 text-white" />
                </div>
                
                <h1 className="text-3xl font-bold text-gray-800 mb-2">BrainForge School</h1>
                <p className="text-gray-500">(Affiliated to CBSE Board)</p>
                <p className="text-gray-500">123 Education Street, Learning City</p>
                
                <div className="border-t-2 border-gray-300 my-6"></div>
                
                <h2 className="text-2xl font-bold text-blue-600 mb-6">
                  {certificateTypes.find(c => c.id === selectedCertificate)?.name}
                </h2>
                
                <p className="text-lg text-gray-700 mb-4">This is to certify that</p>
                
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedStudent.name}</h3>
                
                <p className="text-gray-700 mb-4">
                  son/daughter of <span className="font-semibold">{selectedStudent.fatherName}</span>
                </p>
                
                <p className="text-gray-700 mb-2">
                  has successfully completed <span className="font-semibold">{selectedStudent.class}</span> from this institution
                </p>
                
                <p className="text-gray-700 mb-2">
                  with Roll Number <span className="font-semibold">{selectedStudent.rollNo}</span>
                </p>
                
                {selectedStudent.percentage && (
                  <p className="text-gray-700 mb-4">
                    securing <span className="font-semibold">{selectedStudent.percentage}</span> marks
                  </p>
                )}
                
                <div className="flex justify-between mt-8 pt-8">
                  <div className="text-center">
                    <div className="border-t-2 border-gray-400 w-32 pt-2">Principal</div>
                  </div>
                  <div className="text-center">
                    <div className="border-t-2 border-gray-400 w-32 pt-2">Date: {new Date().toLocaleDateString()}</div>
                  </div>
                </div>
                
                <div className="mt-6 pt-4">
                  <p className="text-gray-400 text-sm">School Seal</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setStep(2)}>← Back</Button>
              <Button onClick={() => setStep(1)} className="bg-blue-600 hover:bg-blue-700 text-white">
                Generate Another
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Info Box */}
      <Card className="mt-6 p-4 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-medium text-blue-800">About Certificates</p>
            <p className="text-sm text-blue-700">Certificates can be downloaded as PDF and printed. Make sure to verify all student information before generating.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}