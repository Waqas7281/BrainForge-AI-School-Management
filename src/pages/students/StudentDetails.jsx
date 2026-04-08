// src/pages/students/StudentDetails.jsx

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Edit,
  Printer,
  Download,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Users,
  BookOpen,
  DollarSign,
  UserCheck,
  Award,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  Heart,
  Home,
  CreditCard,
  User,
  Briefcase,
  Upload,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";

// Mock Student Data
const studentData = {
  id: "STU001",
  name: "Alice Johnson",
  firstName: "Alice",
  lastName: "Johnson",
  dateOfBirth: "2015-05-15",
  gender: "Female",
  bloodGroup: "O+",
  nationality: "American",
  
  // Contact
  email: "alice.j@school.edu",
  phone: "(555) 123-4567",
  alternatePhone: "(555) 123-4568",
  address: "123 Main Street",
  city: "New York",
  state: "NY",
  zipCode: "10001",
  
  // Academic
  admissionNo: "20240001",
  rollNo: "101",
  class: "Class 1",
  section: "A",
  session: "2024-25",
  previousSchool: "Sunrise Preschool",
  
  // Parents
  fatherName: "John Johnson",
  fatherOccupation: "Engineer",
  fatherPhone: "(555) 123-4569",
  motherName: "Sarah Johnson",
  motherOccupation: "Doctor",
  motherPhone: "(555) 123-4570",
  
  // Medical
  medicalInfo: "No known allergies",
  
  // Status
  status: "Active",
  feeStatus: "Paid",
  
  // Dates
  admissionDate: "2024-01-15",
  lastUpdated: "2024-12-01",
};

// Mock Fee History
const feeHistory = [
  { id: 1, month: "January 2024", amount: 5000, status: "Paid", date: "2024-01-10" },
  { id: 2, month: "February 2024", amount: 5000, status: "Paid", date: "2024-02-05" },
  { id: 3, month: "March 2024", amount: 5000, status: "Paid", date: "2024-03-08" },
  { id: 4, month: "April 2024", amount: 5000, status: "Paid", date: "2024-04-12" },
  { id: 5, month: "May 2024", amount: 5000, status: "Pending", date: null },
];

// Mock Exam Results
const examResults = [
  { id: 1, exam: "Mid Term", subject: "Mathematics", marks: 85, totalMarks: 100, grade: "A" },
  { id: 2, exam: "Mid Term", subject: "English", marks: 78, totalMarks: 100, grade: "B+" },
  { id: 3, exam: "Mid Term", subject: "Science", marks: 92, totalMarks: 100, grade: "A+" },
  { id: 4, exam: "Mid Term", subject: "Social Studies", marks: 80, totalMarks: 100, grade: "A-" },
  { id: 5, exam: "Final Term", subject: "Mathematics", marks: 88, totalMarks: 100, grade: "A" },
  { id: 6, exam: "Final Term", subject: "English", marks: 82, totalMarks: 100, grade: "A-" },
  { id: 7, exam: "Final Term", subject: "Science", marks: 95, totalMarks: 100, grade: "A+" },
];

// Mock Attendance
const attendanceData = [
  { month: "Jan", present: 22, total: 24, percentage: 92 },
  { month: "Feb", present: 20, total: 22, percentage: 91 },
  { month: "Mar", present: 23, total: 25, percentage: 92 },
  { month: "Apr", present: 21, total: 23, percentage: 91 },
  { month: "May", present: 18, total: 20, percentage: 90 },
];

// Mock Documents
const documents = [
  { id: 1, name: "Birth Certificate.pdf", type: "PDF", size: "2.5 MB", uploadDate: "2024-01-15" },
  { id: 2, name: "Previous School Report.pdf", type: "PDF", size: "1.8 MB", uploadDate: "2024-01-15" },
  { id: 3, name: "Medical Certificate.jpg", type: "Image", size: "0.5 MB", uploadDate: "2024-01-16" },
];

export default function StudentDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: UserCheck },
    { id: "academic", label: "Academic", icon: GraduationCap },
    { id: "fees", label: "Fees", icon: DollarSign },
    { id: "exams", label: "Exams", icon: Award },
    { id: "attendance", label: "Attendance", icon: Clock },
    { id: "documents", label: "Documents", icon: FileText },
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Paid":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getGradeColor = (grade) => {
    if (grade.includes("A")) return "text-green-600 font-bold";
    if (grade.includes("B")) return "text-blue-600";
    if (grade.includes("C")) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate("/students")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Student Details</h1>
            <p className="text-gray-500 mt-1">Complete student information and records</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Printer className="w-4 h-4" />
            Print
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download
          </Button>
          <Button 
            onClick={() => navigate(`/students/edit/${id}`)}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            Edit Student
          </Button>
        </div>
      </div>

      {/* Student Header Card */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-28 h-28 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
              {studentData.firstName.charAt(0)}{studentData.lastName.charAt(0)}
            </div>
          </div>
          
          {/* Student Info */}
          <div className="flex-1">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{studentData.name}</h2>
                <p className="text-gray-500">Student ID: {studentData.id}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge className="bg-blue-100 text-blue-700">
                    {studentData.class} - Section {studentData.section}
                  </Badge>
                  <Badge className={getStatusBadge(studentData.status)}>
                    {studentData.status}
                  </Badge>
                  <Badge className={getStatusBadge(studentData.feeStatus)}>
                    Fee: {studentData.feeStatus}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Roll Number</p>
                <p className="text-xl font-bold text-gray-800">{studentData.rollNo}</p>
                <p className="text-sm text-gray-500 mt-2">Admission No</p>
                <p className="text-lg font-semibold text-gray-700">{studentData.admissionNo}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-1 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all whitespace-nowrap
                  ${isActive
                    ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}
                `}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* ==================== PROFILE TAB ==================== */}
      {activeTab === "profile" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Basic Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Full Name:</span>
                <span className="text-gray-800 font-medium">{studentData.name}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Date of Birth:</span>
                <span className="text-gray-800">{studentData.dateOfBirth}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Gender:</span>
                <span className="text-gray-800">{studentData.gender}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Blood Group:</span>
                <span className="text-gray-800">{studentData.bloodGroup}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Nationality:</span>
                <span className="text-gray-800">{studentData.nationality}</span>
              </div>
            </div>
          </Card>

          {/* Contact Information */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-600" />
              Contact Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Email:</span>
                <span className="text-gray-800">{studentData.email}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Phone:</span>
                <span className="text-gray-800">{studentData.phone}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Alternate Phone:</span>
                <span className="text-gray-800">{studentData.alternatePhone}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Address:</span>
                <span className="text-gray-800">{studentData.address}, {studentData.city}, {studentData.state} - {studentData.zipCode}</span>
              </div>
            </div>
          </Card>

          {/* Parent Information */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Parent Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Father's Name:</span>
                <span className="text-gray-800 font-medium">{studentData.fatherName}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Father's Occupation:</span>
                <span className="text-gray-800">{studentData.fatherOccupation}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Father's Phone:</span>
                <span className="text-gray-800">{studentData.fatherPhone}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Mother's Name:</span>
                <span className="text-gray-800 font-medium">{studentData.motherName}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Mother's Occupation:</span>
                <span className="text-gray-800">{studentData.motherOccupation}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Mother's Phone:</span>
                <span className="text-gray-800">{studentData.motherPhone}</span>
              </div>
            </div>
          </Card>

          {/* Medical Information */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-blue-600" />
              Medical Information
            </h3>
            <div className="space-y-3">
              <div className="py-2">
                <p className="text-gray-500 mb-1">Medical Conditions / Allergies:</p>
                <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">{studentData.medicalInfo}</p>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Admission Date:</span>
                <span className="text-gray-800">{studentData.admissionDate}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Last Updated:</span>
                <span className="text-gray-800">{studentData.lastUpdated}</span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* ==================== ACADEMIC TAB ==================== */}
      {activeTab === "academic" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-600" />
              Academic Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Admission Number:</span>
                <span className="text-gray-800 font-medium">{studentData.admissionNo}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Roll Number:</span>
                <span className="text-gray-800">{studentData.rollNo}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Class:</span>
                <span className="text-gray-800">{studentData.class}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Section:</span>
                <span className="text-gray-800">{studentData.section}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Session:</span>
                <span className="text-gray-800">{studentData.session}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Previous School:</span>
                <span className="text-gray-800">{studentData.previousSchool}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Subjects Enrolled
            </h3>
            <div className="space-y-2">
              {["Mathematics", "English", "Science", "Social Studies", "Computer Science"].map((subject, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-800">{subject}</span>
                  <Badge className="bg-green-100 text-green-700">Active</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* ==================== FEES TAB ==================== */}
      {activeTab === "fees" && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              Fee Payment History
            </h3>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Pay Now
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Month</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Amount</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Payment Date</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Receipt</th>
                 </tr>
              </thead>
              <tbody>
                {feeHistory.map((fee) => (
                  <tr key={fee.id} className="border-b border-gray-100">
                    <td className="px-4 py-3 text-gray-800">{fee.month}</td>
                    <td className="px-4 py-3 text-gray-800">₹{fee.amount}</td>
                    <td className="px-4 py-3 text-gray-500">{fee.date || "-"}</td>
                    <td className="px-4 py-3">
                      <Badge className={fee.status === "Paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}>
                        {fee.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      {fee.status === "Paid" && (
                        <Button variant="ghost" size="sm" className="text-blue-600">
                          Download
                        </Button>
                      )}
                    </td>
                   </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Fee Summary */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Fees:</span>
              <span className="text-xl font-bold text-gray-800">₹25,000</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-gray-600">Total Paid:</span>
              <span className="text-xl font-bold text-green-600">₹20,000</span>
            </div>
            <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
              <span className="text-gray-600">Balance Due:</span>
              <span className="text-xl font-bold text-red-600">₹5,000</span>
            </div>
          </div>
        </Card>
      )}

      {/* ==================== EXAMS TAB ==================== */}
      {activeTab === "exams" && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-600" />
            Examination Results
          </h3>
          
          <div className="space-y-6">
            {["Mid Term", "Final Term"].map((examType) => (
              <div key={examType}>
                <h4 className="font-semibold text-gray-700 mb-3">{examType}</h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Subject</th>
                        <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Marks Obtained</th>
                        <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Total Marks</th>
                        <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Percentage</th>
                        <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Grade</th>
                       </tr>
                    </thead>
                    <tbody>
                      {examResults.filter(e => e.exam === examType).map((result) => (
                        <tr key={result.id} className="border-b border-gray-100">
                          <td className="px-4 py-2 text-gray-800">{result.subject}</td>
                          <td className="px-4 py-2 text-gray-800">{result.marks}</td>
                          <td className="px-4 py-2 text-gray-800">{result.totalMarks}</td>
                          <td className="px-4 py-2 text-gray-800">{((result.marks / result.totalMarks) * 100).toFixed(1)}%</td>
                          <td className={`px-4 py-2 ${getGradeColor(result.grade)}`}>{result.grade}</td>
                         </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-gray-50">
                        <td className="px-4 py-2 font-semibold">Total</td>
                        <td className="px-4 py-2 font-semibold">
                          {examResults.filter(e => e.exam === examType).reduce((sum, r) => sum + r.marks, 0)}
                        </td>
                        <td className="px-4 py-2 font-semibold">
                          {examResults.filter(e => e.exam === examType).reduce((sum, r) => sum + r.totalMarks, 0)}
                        </td>
                        <td className="px-4 py-2 font-semibold">
                          {((examResults.filter(e => e.exam === examType).reduce((sum, r) => sum + r.marks, 0) / 
                            examResults.filter(e => e.exam === examType).reduce((sum, r) => sum + r.totalMarks, 0)) * 100).toFixed(1)}%
                        </td>
                        <td className="px-4 py-2"></td>
                       </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* ==================== ATTENDANCE TAB ==================== */}
      {activeTab === "attendance" && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            Attendance Summary
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Attendance Stats */}
            <div className="space-y-4">
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-green-600">91.2%</p>
                <p className="text-gray-600">Overall Attendance</p>
              </div>
              
              <div className="bg-yellow-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-yellow-600">2</p>
                <p className="text-gray-600">Total Absent Days</p>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-blue-600">104</p>
                <p className="text-gray-600">Total Present Days</p>
              </div>
            </div>

            {/* Monthly Attendance Table */}
            <div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500">Month</th>
                      <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500">Present</th>
                      <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500">Total</th>
                      <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500">%</th>
                     </tr>
                  </thead>
                  <tbody>
                    {attendanceData.map((item, idx) => (
                      <tr key={idx} className="border-b border-gray-100">
                        <td className="px-3 py-2 text-gray-800">{item.month}</td>
                        <td className="px-3 py-2 text-gray-800">{item.present}</td>
                        <td className="px-3 py-2 text-gray-800">{item.total}</td>
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div className="bg-green-500 rounded-full h-2" style={{ width: `${item.percentage}%` }} />
                            </div>
                            <span className="text-sm">{item.percentage}%</span>
                          </div>
                        </td>
                       </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* ==================== DOCUMENTS TAB ==================== */}
      {activeTab === "documents" && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Student Documents
            </h3>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload Document
            </Button>
          </div>

          <div className="space-y-3">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-blue-500" />
                  <div>
                    <p className="font-medium text-gray-800">{doc.name}</p>
                    <p className="text-xs text-gray-500">{doc.type} • {doc.size} • Uploaded: {doc.uploadDate}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600">
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}