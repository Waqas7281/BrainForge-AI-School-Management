// src/pages/students/StudentDocuments.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  Download,
  Trash2,
  X,
  CheckCircle,
  Search,
  User,
  FileText,
  Image,
  File,
  AlertCircle,
  Eye,
  FolderOpen,
  Plus,
  Calendar,
  Clock,
  Users,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function StudentDocuments() {
  const navigate = useNavigate();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [newDocument, setNewDocument] = useState({
    name: "",
    category: "Academic",
    file: null,
  });

  // Mock Students Data
  const students = [
    { id: "STU001", name: "Alice Johnson", class: "Class 5", rollNo: "101" },
    { id: "STU002", name: "Bob Smith", class: "Class 5", rollNo: "102" },
    { id: "STU003", name: "Charlie Davis", class: "Class 8", rollNo: "201" },
    { id: "STU004", name: "Diana Prince", class: "Class 10", rollNo: "301" },
  ];

  // Mock Documents Data
  const [documents, setDocuments] = useState({
    STU001: [
      {
        id: 1,
        name: "Birth Certificate.pdf",
        category: "Identity",
        size: "2.5 MB",
        uploadDate: "2024-01-15",
        type: "pdf",
      },
      {
        id: 2,
        name: "Previous School Report.pdf",
        category: "Academic",
        size: "1.8 MB",
        uploadDate: "2024-01-15",
        type: "pdf",
      },
      {
        id: 3,
        name: "Medical Certificate.jpg",
        category: "Medical",
        size: "0.5 MB",
        uploadDate: "2024-01-16",
        type: "image",
      },
      {
        id: 4,
        name: "Aadhar Card.pdf",
        category: "Identity",
        size: "0.3 MB",
        uploadDate: "2024-01-16",
        type: "pdf",
      },
    ],
    STU002: [
      {
        id: 5,
        name: "Birth Certificate.pdf",
        category: "Identity",
        size: "2.1 MB",
        uploadDate: "2024-01-20",
        type: "pdf",
      },
      {
        id: 6,
        name: "Transfer Certificate.pdf",
        category: "Academic",
        size: "1.2 MB",
        uploadDate: "2024-01-20",
        type: "pdf",
      },
    ],
    STU003: [
      {
        id: 7,
        name: "Birth Certificate.pdf",
        category: "Identity",
        size: "2.3 MB",
        uploadDate: "2022-06-10",
        type: "pdf",
      },
    ],
  });

  const categories = ["All", "Academic", "Identity", "Medical", "Other"];

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewDocument({ ...newDocument, file, name: file.name });
    }
  };

  const handleUpload = async () => {
    if (!newDocument.file || !newDocument.name) return;

    setUploading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newDoc = {
      id: Date.now(),
      name: newDocument.name,
      category: newDocument.category,
      size: `${(newDocument.file.size / (1024 * 1024)).toFixed(1)} MB`,
      uploadDate: new Date().toISOString().split("T")[0],
      type: newDocument.file.type.includes("image") ? "image" : "pdf",
    };

    setDocuments((prev) => ({
      ...prev,
      [selectedStudent.id]: [...(prev[selectedStudent.id] || []), newDoc],
    }));

    setUploading(false);
    setShowUploadModal(false);
    setShowSuccess(true);
    setNewDocument({ name: "", category: "Academic", file: null });
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDelete = (docId) => {
    setDocuments((prev) => ({
      ...prev,
      [selectedStudent.id]: prev[selectedStudent.id].filter(
        (doc) => doc.id !== docId,
      ),
    }));
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDownload = (doc) => {
    alert(`Downloading ${doc.name}`);
  };

  const handlePreview = (doc) => {
    alert(`Previewing ${doc.name}`);
  };

  const getFileIcon = (type) => {
    if (type === "pdf") return <FileText className="w-8 h-8 text-red-500" />;
    if (type === "image") return <Image className="w-8 h-8 text-blue-500" />;
    return <File className="w-8 h-8 text-gray-500" />;
  };

  const studentDocs = selectedStudent
    ? documents[selectedStudent.id] || []
    : [];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Student Documents
          </h1>
          <p className="text-gray-500 mt-1">
            Manage student documents and records
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

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-700 font-medium">
            Document uploaded successfully!
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Student List */}
        <Card className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">Students</h2>
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search student..."
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
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                  selectedStudent?.id === student.id
                    ? "bg-blue-50 border-blue-300 border"
                    : "hover:bg-gray-50 border border-transparent"
                }`}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                  {student.name.charAt(0)}
                </div>
                <div className="text-left flex-1">
                  <p className="font-medium text-gray-800">{student.name}</p>
                  <p className="text-xs text-gray-500">
                    {student.class} | Roll: {student.rollNo}
                  </p>
                </div>
                <Badge className="bg-gray-100 text-gray-600">
                  {documents[student.id]?.length || 0}
                </Badge>
              </button>
            ))}
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No students found</p>
            </div>
          )}
        </Card>

        {/* Right Panel - Documents */}
        <Card className="lg:col-span-2 p-6">
          {!selectedStudent ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FolderOpen className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                No Student Selected
              </h3>
              <p className="text-gray-500">
                Select a student from the left panel to view documents
              </p>
            </div>
          ) : (
            <>
              {/* Student Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {selectedStudent.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {selectedStudent.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      ID: {selectedStudent.id} | Class: {selectedStudent.class}{" "}
                      | Roll: {selectedStudent.rollNo}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => setShowUploadModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Upload Document
                </Button>
              </div>

              {/* Documents Stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {studentDocs.length}
                  </p>
                  <p className="text-xs text-gray-600">Total Documents</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {
                      studentDocs.filter((d) => d.category === "Academic")
                        .length
                    }
                  </p>
                  <p className="text-xs text-gray-600">Academic</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-purple-600">
                    {
                      studentDocs.filter((d) => d.category === "Identity")
                        .length
                    }
                  </p>
                  <p className="text-xs text-gray-600">Identity</p>
                </div>
              </div>

              {/* Documents List */}
              {studentDocs.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">No documents uploaded yet</p>
                  <Button
                    variant="outline"
                    onClick={() => setShowUploadModal(true)}
                    className="mt-3"
                  >
                    <Upload className="w-4 h-4 mr-2" /> Upload First Document
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {studentDocs.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-4">
                        {getFileIcon(doc.type)}
                        <div>
                          <p className="font-medium text-gray-800">
                            {doc.name}
                          </p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <FolderOpen className="w-3 h-3" /> {doc.category}
                            </span>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Calendar className="w-3 h-3" /> {doc.uploadDate}
                            </span>
                            <span className="text-xs text-gray-500">
                              {doc.size}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handlePreview(doc)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="Preview"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDownload(doc)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                          title="Download"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(doc.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </Card>
      </div>

      {/* Upload Modal */}
      {showUploadModal && selectedStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md mx-4 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Upload Document
              </h2>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Document Category
                </label>
                <select
                  value={newDocument.category}
                  onChange={(e) =>
                    setNewDocument({ ...newDocument, category: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="Academic">Academic</option>
                  <option value="Identity">Identity</option>
                  <option value="Medical">Medical</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select File
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      PDF, JPG, PNG, DOC (Max 5MB)
                    </p>
                  </label>
                </div>
                {newDocument.file && (
                  <p className="text-sm text-green-600 mt-2">
                    Selected: {newDocument.file.name}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowUploadModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpload}
                disabled={!newDocument.file || uploading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                {uploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />{" "}
                    Uploading...
                  </>
                ) : (
                  <>Upload</>
                )}
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
            <p className="font-medium text-blue-800">Document Management</p>
            <p className="text-sm text-blue-700">
              Upload important student documents like birth certificate,
              previous school records, medical certificates, etc. All documents
              are securely stored.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
