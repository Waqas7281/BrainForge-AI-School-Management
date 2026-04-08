// src/pages/teachers/TeacherIdCard.jsx

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
  Briefcase,
  Mail,
  Phone,
  Users,
  AlertCircle,
  RefreshCw,
  Award,
  Building2,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function TeacherIdCard() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Mock Teachers Data
  const teachersList = [
    {
      id: "EMP001",
      name: "Dr. Sarah Wilson",
      designation: "Senior Teacher",
      department: "Mathematics",
      employeeId: "EMP001",
      phone: "(555) 123-4567",
      email: "sarah.w@school.edu",
      joiningDate: "2020-06-15",
      qualification: "Ph.D",
    },
    {
      id: "EMP002",
      name: "Prof. James Brown",
      designation: "PGT Teacher",
      department: "English",
      employeeId: "EMP002",
      phone: "(555) 234-5678",
      email: "james.b@school.edu",
      joiningDate: "2019-08-20",
      qualification: "M.A.",
    },
    {
      id: "EMP003",
      name: "Ms. Emily Davis",
      designation: "TGT Teacher",
      department: "Science",
      employeeId: "EMP003",
      phone: "(555) 345-6789",
      email: "emily.d@school.edu",
      joiningDate: "2021-01-10",
      qualification: "M.Sc.",
    },
    {
      id: "EMP004",
      name: "Mrs. Lisa Anderson",
      designation: "PRT Teacher",
      department: "Social Studies",
      employeeId: "EMP004",
      phone: "(555) 456-7890",
      email: "lisa.a@school.edu",
      joiningDate: "2020-11-05",
      qualification: "M.A.",
    },
    {
      id: "EMP005",
      name: "Mr. Robert Johnson",
      designation: "Senior Teacher",
      department: "Chemistry",
      employeeId: "EMP005",
      phone: "(555) 567-8901",
      email: "robert.j@school.edu",
      joiningDate: "2018-09-12",
      qualification: "Ph.D",
    },
    {
      id: "EMP006",
      name: "Mr. Michael Lee",
      designation: "TGT Teacher",
      department: "Computer Science",
      employeeId: "EMP006",
      phone: "(555) 678-9012",
      email: "michael.l@school.edu",
      joiningDate: "2021-03-18",
      qualification: "M.Tech",
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

  const filteredTeachers = teachersList.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.designation.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toggleTeacherSelection = (teacherId) => {
    setSelectedTeachers((prev) =>
      prev.includes(teacherId)
        ? prev.filter((id) => id !== teacherId)
        : [...prev, teacherId],
    );
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedTeachers([]);
    } else {
      setSelectedTeachers(filteredTeachers.map((t) => t.id));
    }
    setSelectAll(!selectAll);
  };

  const handleGenerate = async () => {
    if (selectedTeachers.length === 0) return;
    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsGenerating(false);
    setShowPreview(true);
  };

  const handleDownload = () => {
    alert(
      `${selectedTeachers.length} Teacher ID Cards downloaded successfully!`,
    );
  };

  const handlePrint = () => {
    window.print();
  };

  const getTeacherDetails = (id) => teachersList.find((t) => t.id === id);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Generate Teacher ID Card
          </h1>
          <p className="text-gray-500 mt-1">
            Create professional identity cards for teachers
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/teachers")}
          className="flex items-center gap-2"
        >
          <X className="w-4 h-4" /> Back to Teachers
        </Button>
      </div>

      {/* Step 1: Select Teachers */}
      {!showPreview && step === 1 && (
        <>
          <Card className="p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Select Teachers</h2>
                <p className="text-gray-500 text-sm">
                  Choose teachers for ID card generation
                </p>
              </div>
            </div>

            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by name, ID, department, or designation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left py-3 px-4">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={toggleSelectAll}
                        className="w-4 h-4"
                      />
                    </th>
                    <th className="text-left py-3 px-4">ID</th>
                    <th className="text-left py-3 px-4">Name</th>
                    <th className="text-left py-3 px-4">Designation</th>
                    <th className="text-left py-3 px-4">Department</th>
                    <th className="text-left py-3 px-4">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeachers.map((teacher) => (
                    <tr key={teacher.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <input
                          type="checkbox"
                          checked={selectedTeachers.includes(teacher.id)}
                          onChange={() => toggleTeacherSelection(teacher.id)}
                          className="w-4 h-4"
                        />
                      </td>
                      <td className="py-3 px-4 text-gray-600">{teacher.id}</td>
                      <td className="py-3 px-4 font-medium">{teacher.name}</td>
                      <td className="py-3 px-4">{teacher.designation}</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-blue-100">
                          {teacher.department}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">{teacher.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredTeachers.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No teachers found</p>
              </div>
            )}

            <div className="mt-6 flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Selected:{" "}
                <span className="font-semibold text-blue-600">
                  {selectedTeachers.length}
                </span>{" "}
                teachers
              </p>
              <Button
                onClick={() => setStep(2)}
                disabled={selectedTeachers.length === 0}
                className="bg-blue-600 text-white"
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
              <h2 className="text-xl font-semibold">Select ID Card Template</h2>
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
                className={`p-4 border-2 rounded-xl text-center transition-all ${selectedTemplate === template.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"}`}
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

          {/* Preview */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">Preview</h3>
            <div className="flex justify-center">
              {selectedTeachers.slice(0, 1).map((teacherId) => {
                const teacher = getTeacherDetails(teacherId);
                const template = templates.find(
                  (t) => t.id === selectedTemplate,
                );
                return (
                  <div
                    key={teacherId}
                    className={`w-96 rounded-xl overflow-hidden shadow-lg bg-gradient-to-r ${template.color}`}
                  >
                    <div className="p-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                          <Briefcase className="w-10 h-10 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">
                            {teacher.name}
                          </h3>
                          <p className="text-white/80 text-sm">
                            ID: {teacher.id}
                          </p>
                        </div>
                      </div>
                      <div className="bg-white/10 rounded-lg p-3 space-y-1">
                        <div className="flex justify-between text-white text-sm">
                          <span>Designation:</span>
                          <span className="font-semibold">
                            {teacher.designation}
                          </span>
                        </div>
                        <div className="flex justify-between text-white text-sm">
                          <span>Department:</span>
                          <span className="font-semibold">
                            {teacher.department}
                          </span>
                        </div>
                        <div className="flex justify-between text-white text-sm">
                          <span>Qualification:</span>
                          <span className="font-semibold">
                            {teacher.qualification}
                          </span>
                        </div>
                        <div className="flex justify-between text-white text-sm">
                          <span>Joining:</span>
                          <span className="font-semibold">
                            {teacher.joiningDate}
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
              className="bg-green-600 text-white flex items-center gap-2"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Generating...
                </>
              ) : (
                <>Generate ID Cards ({selectedTeachers.length})</>
              )}
            </Button>
          </div>
        </Card>
      )}

      {/* Preview & Download */}
      {showPreview && (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">ID Cards Generated</h2>
                <p className="text-gray-500 text-sm">
                  {selectedTeachers.length} ID cards ready
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handlePrint}>
                <Printer className="w-4 h-4 mr-2" /> Print All
              </Button>
              <Button
                onClick={handleDownload}
                className="bg-green-600 text-white"
              >
                <Download className="w-4 h-4 mr-2" /> Download All
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto p-2">
            {selectedTeachers.map((teacherId) => {
              const teacher = getTeacherDetails(teacherId);
              const template = templates.find((t) => t.id === selectedTemplate);
              return (
                <div
                  key={teacherId}
                  className={`rounded-xl overflow-hidden shadow-lg bg-gradient-to-r ${template.color}`}
                >
                  <div className="p-3">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                        <Award className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">
                          {teacher.name}
                        </h3>
                        <p className="text-white/80 text-xs">
                          ID: {teacher.id}
                        </p>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-2 space-y-0.5 text-xs">
                      <div className="flex justify-between text-white">
                        <span>Designation:</span>
                        <span className="font-semibold">
                          {teacher.designation}
                        </span>
                      </div>
                      <div className="flex justify-between text-white">
                        <span>Department:</span>
                        <span className="font-semibold">
                          {teacher.department}
                        </span>
                      </div>
                      <div className="flex justify-between text-white">
                        <span>Qualification:</span>
                        <span className="font-semibold">
                          {teacher.qualification}
                        </span>
                      </div>
                      <div className="flex justify-between text-white">
                        <span>Phone:</span>
                        <span className="font-semibold">{teacher.phone}</span>
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
                setSelectedTeachers([]);
                setSelectAll(false);
              }}
              className="bg-blue-600 text-white"
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
            <p className="font-medium text-blue-800">About Teacher ID Cards</p>
            <p className="text-sm text-blue-700">
              ID cards can be printed directly or downloaded as PDF. Each card
              includes teacher photo placeholder, name, designation, department,
              and employee ID.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
