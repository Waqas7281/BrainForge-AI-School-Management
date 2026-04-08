// src/pages/certificates/StudentCertificate.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Search,
  Eye,
  Download,
  Printer,
  X,
  Calendar,
  Award,
  CheckCircle,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function StudentCertificate() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Mock Students with Certificates
  const students = [
    {
      id: "STU001",
      name: "Alice Johnson",
      class: "Class 5",
      rollNo: "101",
      fatherName: "John Johnson",
      certificates: [
        {
          id: 1,
          type: "Migration Certificate",
          issueDate: "2024-03-15",
          certificateNo: "MIG001",
          status: "Issued",
        },
        {
          id: 2,
          type: "Character Certificate",
          issueDate: "2024-03-15",
          certificateNo: "CHR001",
          status: "Issued",
        },
      ],
    },
    {
      id: "STU002",
      name: "Bob Smith",
      class: "Class 5",
      rollNo: "102",
      fatherName: "Mike Smith",
      certificates: [
        {
          id: 3,
          type: "Migration Certificate",
          issueDate: "2024-03-15",
          certificateNo: "MIG002",
          status: "Issued",
        },
      ],
    },
    {
      id: "STU004",
      name: "Diana Prince",
      class: "Class 10",
      rollNo: "201",
      fatherName: "Thomas Prince",
      certificates: [
        {
          id: 4,
          type: "Migration Certificate",
          issueDate: "2024-03-20",
          certificateNo: "MIG004",
          status: "Issued",
        },
        {
          id: 5,
          type: "Character Certificate",
          issueDate: "2024-03-20",
          certificateNo: "CHR004",
          status: "Issued",
        },
        {
          id: 6,
          type: "Scholarship Certificate",
          issueDate: "2024-03-20",
          certificateNo: "SCH004",
          status: "Issued",
        },
      ],
    },
  ];

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.rollNo.includes(searchTerm),
  );

  const handleViewCertificates = (student) => {
    setSelectedStudent(student);
    setShowDetails(true);
  };

  const handleDownload = (cert) => {
    alert(`Downloading ${cert.type} for ${selectedStudent.name}`);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Student Certificate
          </h1>
          <p className="text-gray-500 mt-1">
            View and download student certificates
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/certificates")}
          className="flex items-center gap-2"
        >
          <X className="w-4 h-4" /> Back
        </Button>
      </div>

      {/* Search */}
      <Card className="p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by student name, ID, or roll number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </Card>

      {/* Students List */}
      <div className="space-y-3">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                  {student.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{student.name}</p>
                  <p className="text-sm text-gray-500">
                    ID: {student.id} | Class: {student.class} | Roll:{" "}
                    {student.rollNo}
                  </p>
                  <p className="text-sm text-gray-500">
                    Father: {student.fatherName}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-700">
                  {student.certificates.length} Certificates
                </Badge>
                <Button
                  onClick={() => handleViewCertificates(student)}
                  variant="outline"
                  size="sm"
                >
                  <Eye className="w-4 h-4 mr-1" /> View
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <Card className="p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">
            No students found
          </h3>
        </Card>
      )}

      {/* Certificates Modal */}
      {showDetails && selectedStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-2xl mx-4 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Certificates - {selectedStudent.name}
              </h2>
              <button onClick={() => setShowDetails(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p>
                  <span className="text-gray-500">Student ID:</span>{" "}
                  {selectedStudent.id}
                </p>
                <p>
                  <span className="text-gray-500">Class:</span>{" "}
                  {selectedStudent.class}
                </p>
                <p>
                  <span className="text-gray-500">Roll No:</span>{" "}
                  {selectedStudent.rollNo}
                </p>
                <p>
                  <span className="text-gray-500">Father's Name:</span>{" "}
                  {selectedStudent.fatherName}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {selectedStudent.certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-800">{cert.type}</p>
                    <p className="text-xs text-gray-500">
                      Certificate No: {cert.certificateNo}
                    </p>
                    <p className="text-xs text-gray-500">
                      Issue Date: {cert.issueDate}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(cert)}
                    >
                      <Download className="w-4 h-4 mr-1" /> Download
                    </Button>
                    <Button variant="outline" size="sm">
                      <Printer className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowDetails(false)}
                className="flex-1"
              >
                Close
              </Button>
              <Button className="flex-1 bg-blue-600 text-white">
                Generate New Certificate
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Info Box */}
      <Card className="mt-6 p-4 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <Award className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-medium text-blue-800">
              About Student Certificates
            </p>
            <p className="text-sm text-blue-700">
              View and download all certificates issued to students.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
