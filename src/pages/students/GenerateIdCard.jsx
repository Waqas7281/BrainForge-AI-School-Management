// src/pages/students/GenerateIdCard.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CreditCard,
  Download,
  Printer,
  X,
  CheckCircle,
  Search,
  User,
  Calendar,
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Users,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function GenerateIdCard() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Mock Students Data
  const studentsList = [
    {
      id: "STU001",
      name: "Alice Johnson",
      class: "Class 5",
      section: "A",
      rollNo: "101",
      admissionNo: "20240001",
      fatherName: "John Johnson",
      phone: "(555) 123-4567",
      email: "alice.j@school.edu",
      bloodGroup: "O+",
      address: "123 Main St, NY",
    },
    {
      id: "STU002",
      name: "Bob Smith",
      class: "Class 5",
      section: "A",
      rollNo: "102",
      admissionNo: "20240002",
      fatherName: "Mike Smith",
      phone: "(555) 234-5678",
      email: "bob.s@school.edu",
      bloodGroup: "A+",
      address: "456 Oak Ave, NY",
    },
    {
      id: "STU003",
      name: "Charlie Davis",
      class: "Class 5",
      section: "B",
      rollNo: "103",
      admissionNo: "20240003",
      fatherName: "Robert Davis",
      phone: "(555) 345-6789",
      email: "charlie.d@school.edu",
      bloodGroup: "B+",
      address: "789 Pine Rd, NY",
    },
    {
      id: "STU004",
      name: "Diana Prince",
      class: "Class 10",
      section: "A",
      rollNo: "201",
      admissionNo: "20190001",
      fatherName: "Thomas Prince",
      phone: "(555) 456-7890",
      email: "diana.p@school.edu",
      bloodGroup: "AB+",
      address: "321 Elm St, NY",
    },
    {
      id: "STU005",
      name: "Ethan Hunt",
      class: "Class 10",
      section: "A",
      rollNo: "202",
      admissionNo: "20190002",
      fatherName: "Jim Hunt",
      phone: "(555) 567-8901",
      email: "ethan.h@school.edu",
      bloodGroup: "O-",
      address: "654 Cedar Ln, NY",
    },
    {
      id: "STU006",
      name: "Fiona Green",
      class: "Class 8",
      section: "B",
      rollNo: "301",
      admissionNo: "20220001",
      fatherName: "William Green",
      phone: "(555) 678-9012",
      email: "fiona.g@school.edu",
      bloodGroup: "A-",
      address: "987 Birch Dr, NY",
    },
    {
      id: "STU007",
      name: "George Wilson",
      class: "Class 8",
      section: "B",
      rollNo: "302",
      admissionNo: "20220002",
      fatherName: "Henry Wilson",
      phone: "(555) 789-0123",
      email: "george.w@school.edu",
      bloodGroup: "B-",
      address: "147 Spruce Way, NY",
    },
    {
      id: "STU008",
      name: "Hannah Lee",
      class: "Class 8",
      section: "C",
      rollNo: "303",
      admissionNo: "20220003",
      fatherName: "David Lee",
      phone: "(555) 890-1234",
      email: "hannah.l@school.edu",
      bloodGroup: "AB-",
      address: "258 Maple Ave, NY",
    },
  ];

  const templates = [
    {
      id: "modern",
      name: "Modern",
      color: "from-blue-500 to-indigo-600",
      textColor: "text-white",
    },
    {
      id: "classic",
      name: "Classic",
      color: "from-green-500 to-teal-600",
      textColor: "text-white",
    },
    {
      id: "premium",
      name: "Premium",
      color: "from-purple-500 to-pink-600",
      textColor: "text-white",
    },
    {
      id: "simple",
      name: "Simple",
      color: "from-gray-700 to-gray-900",
      textColor: "text-white",
    },
  ];

  const filteredStudents = studentsList.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.includes(searchTerm) ||
      student.class.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toggleStudentSelection = (studentId) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId],
    );
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map((s) => s.id));
    }
    setSelectAll(!selectAll);
  };

  const handleGenerate = async () => {
    if (selectedStudents.length === 0) return;
    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsGenerating(false);
    setShowPreview(true);
  };

  const handleDownload = () => {
    alert(`${selectedStudents.length} ID Cards downloaded successfully!`);
  };

  const handlePrint = () => {
    window.print();
  };

  const getStudentDetails = (id) => studentsList.find((s) => s.id === id);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Generate ID Card</h1>
          <p className="text-gray-500 mt-1">Create student identity cards</p>
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

      {/* Step 1: Select Students */}
      {!showPreview && step === 1 && (
        <>
          <Card className="p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Select Students
                </h2>
                <p className="text-gray-500 text-sm">
                  Choose students for ID card generation
                </p>
              </div>
            </div>

            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by name, ID, roll number, or class..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-3 px-4">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={toggleSelectAll}
                        className="w-4 h-4"
                      />
                    </th>
                    <th className="text-left py-3 px-4">ID</th>
                    <th className="text-left py-3 px-4">Student Name</th>
                    <th className="text-left py-3 px-4">Class</th>
                    <th className="text-left py-3 px-4">Roll No</th>
                    <th className="text-left py-3 px-4">Father's Name</th>
                    <th className="text-left py-3 px-4">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr
                      key={student.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4">
                        <input
                          type="checkbox"
                          checked={selectedStudents.includes(student.id)}
                          onChange={() => toggleStudentSelection(student.id)}
                          className="w-4 h-4"
                        />
                      </td>
                      <td className="py-3 px-4 text-gray-600">{student.id}</td>
                      <td className="py-3 px-4 font-medium text-gray-800">
                        {student.name}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {student.class} - {student.section}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {student.rollNo}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {student.fatherName}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {student.phone}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredStudents.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No students found</p>
              </div>
            )}

            <div className="mt-6 flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Selected:{" "}
                <span className="font-semibold text-blue-600">
                  {selectedStudents.length}
                </span>{" "}
                students
              </p>
              <Button
                onClick={() => setStep(2)}
                disabled={selectedStudents.length === 0}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Next: Select Template →
              </Button>
            </div>
          </Card>
        </>
      )}

      {/* Step 2: Select Template */}
      {!showPreview && step === 2 && (
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Select ID Card Template
              </h2>
              <p className="text-gray-500 text-sm">
                Choose a design for the ID cards
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
                  className={`w-full h-32 rounded-lg bg-gradient-to-r ${template.color} flex items-center justify-center mb-3`}
                >
                  <CreditCard className="w-8 h-8 text-white" />
                </div>
                <p
                  className={`font-semibold ${selectedTemplate === template.id ? "text-blue-600" : "text-gray-700"}`}
                >
                  {template.name}
                </p>
              </button>
            ))}
          </div>

          {/* Preview of selected template */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">Preview</h3>
            <div className="flex justify-center">
              {selectedStudents.slice(0, 1).map((studentId) => {
                const student = getStudentDetails(studentId);
                const template = templates.find(
                  (t) => t.id === selectedTemplate,
                );
                return (
                  <div
                    key={studentId}
                    className={`w-96 rounded-xl overflow-hidden shadow-lg bg-gradient-to-r ${template.color}`}
                  >
                    <div className="p-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                          <GraduationCap className="w-10 h-10 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">
                            {student.name}
                          </h3>
                          <p className="text-white/80 text-sm">
                            Student ID: {student.id}
                          </p>
                        </div>
                      </div>
                      <div className="bg-white/10 rounded-lg p-3 space-y-1">
                        <div className="flex justify-between text-white text-sm">
                          <span>Class:</span>
                          <span className="font-semibold">
                            {student.class} - {student.section}
                          </span>
                        </div>
                        <div className="flex justify-between text-white text-sm">
                          <span>Roll No:</span>
                          <span className="font-semibold">
                            {student.rollNo}
                          </span>
                        </div>
                        <div className="flex justify-between text-white text-sm">
                          <span>Blood Group:</span>
                          <span className="font-semibold">
                            {student.bloodGroup}
                          </span>
                        </div>
                        <div className="flex justify-between text-white text-sm">
                          <span>Father:</span>
                          <span className="font-semibold">
                            {student.fatherName}
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 text-center text-white/70 text-xs">
                        Valid till: {new Date().getFullYear() + 1}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between">
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
                <>Generate ID Cards ({selectedStudents.length})</>
              )}
            </Button>
          </div>
        </Card>
      )}

      {/* Preview & Download */}
      {showPreview && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  ID Cards Generated
                </h2>
                <p className="text-gray-500 text-sm">
                  {selectedStudents.length} ID cards ready
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handlePrint}
                className="flex items-center gap-2"
              >
                <Printer className="w-4 h-4" /> Print All
              </Button>
              <Button
                onClick={handleDownload}
                className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Download All
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto p-2">
            {selectedStudents.map((studentId) => {
              const student = getStudentDetails(studentId);
              const template = templates.find((t) => t.id === selectedTemplate);
              return (
                <div
                  key={studentId}
                  className={`rounded-xl overflow-hidden shadow-lg bg-gradient-to-r ${template.color}`}
                >
                  <div className="p-3">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                        <GraduationCap className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">
                          {student.name}
                        </h3>
                        <p className="text-white/80 text-xs">
                          ID: {student.id}
                        </p>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-2 space-y-0.5 text-xs">
                      <div className="flex justify-between text-white">
                        <span>Class:</span>
                        <span className="font-semibold">
                          {student.class}-{student.section}
                        </span>
                      </div>
                      <div className="flex justify-between text-white">
                        <span>Roll No:</span>
                        <span className="font-semibold">{student.rollNo}</span>
                      </div>
                      <div className="flex justify-between text-white">
                        <span>Blood:</span>
                        <span className="font-semibold">
                          {student.bloodGroup}
                        </span>
                      </div>
                      <div className="flex justify-between text-white">
                        <span>Father:</span>
                        <span className="font-semibold truncate ml-2">
                          {student.fatherName}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center mt-6">
            <Button
              onClick={() => {
                setShowPreview(false);
                setStep(1);
                setSelectedStudents([]);
                setSelectAll(false);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Generate More
            </Button>
          </div>
        </Card>
      )}

      {/* Info Box */}
      <Card className="mt-6 p-4 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-medium text-blue-800">About ID Cards</p>
            <p className="text-sm text-blue-700">
              ID cards can be printed directly or downloaded as PDF. Each card
              includes student photo placeholder, name, class, roll number, and
              blood group.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
