// src/pages/teachers/TeacherDetails.jsx

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
  Briefcase,
  Award,
  BookOpen,
  DollarSign,
  UserCheck,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Heart,
  Home,
  CreditCard,
  GraduationCap,
  Users,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";

// Mock Teacher Data
const teacherData = {
  id: "EMP2024001",
  name: "Dr. Sarah Wilson",
  firstName: "Sarah",
  lastName: "Wilson",
  dateOfBirth: "1985-05-15",
  gender: "Female",
  bloodGroup: "O+",
  nationality: "American",
  maritalStatus: "Married",

  // Contact
  email: "sarah.wilson@school.edu",
  phone: "(555) 123-4567",
  alternatePhone: "(555) 123-4568",
  address: "123 Main Street",
  city: "New York",
  state: "NY",
  zipCode: "10001",
  emergencyContact: "John Wilson",
  emergencyPhone: "(555) 123-4569",

  // Professional
  employeeId: "EMP2024001",
  department: "Mathematics",
  designation: "Senior Teacher",
  qualification: "Ph.D in Mathematics",
  experience: "12 years",
  specialization: "Algebra & Calculus",
  joiningDate: "2020-06-15",

  // Bank
  bankName: "Bank of America",
  accountNumber: "****1234",
  ifscCode: "BOFA123456",
  panNumber: "ABCDE1234F",

  // Salary
  basicSalary: 50000,
  allowances: 15000,
  deductions: 8000,

  // Status
  status: "Active",

  // Subjects Teaching
  subjects: [
    "Mathematics - Class 1",
    "Mathematics - Class 2",
    "Algebra - Class 3",
  ],

  // Classes Assigned
  classes: [
    { class: "Class 1", section: "A", role: "Class Teacher" },
    { class: "Class 2", section: "A", role: "Subject Teacher" },
  ],
};

// Mock Attendance
const attendanceData = [
  { month: "Jan", present: 22, total: 24, percentage: 92 },
  { month: "Feb", present: 20, total: 22, percentage: 91 },
  { month: "Mar", present: 23, total: 25, percentage: 92 },
  { month: "Apr", present: 21, total: 23, percentage: 91 },
  { month: "May", present: 18, total: 20, percentage: 90 },
];

// Mock Leave History
const leaveHistory = [
  {
    id: 1,
    type: "Sick Leave",
    fromDate: "2024-01-10",
    toDate: "2024-01-12",
    days: 3,
    status: "Approved",
  },
  {
    id: 2,
    type: "Casual Leave",
    fromDate: "2024-02-15",
    toDate: "2024-02-16",
    days: 2,
    status: "Approved",
  },
  {
    id: 3,
    type: "Emergency Leave",
    fromDate: "2024-03-20",
    toDate: "2024-03-20",
    days: 1,
    status: "Pending",
  },
];

export default function TeacherDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: UserCheck },
    { id: "professional", label: "Professional", icon: Briefcase },
    { id: "attendance", label: "Attendance", icon: Clock },
    { id: "leave", label: "Leave", icon: Calendar },
    { id: "salary", label: "Salary", icon: DollarSign },
  ];

  const netSalary =
    teacherData.basicSalary + teacherData.allowances - teacherData.deductions;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate("/teachers")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Teacher Details
            </h1>
            <p className="text-gray-500 mt-1">
              Complete teacher information and records
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Printer className="w-4 h-4" /> Print
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" /> Download
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center gap-2">
            <Edit className="w-4 h-4" /> Edit Teacher
          </Button>
        </div>
      </div>

      {/* Teacher Header Card */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <div className="w-28 h-28 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
              {teacherData.firstName.charAt(0)}
              {teacherData.lastName.charAt(0)}
            </div>
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {teacherData.name}
                </h2>
                <p className="text-gray-500">
                  Employee ID: {teacherData.employeeId}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge className="bg-blue-100 text-blue-700">
                    {teacherData.department}
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-700">
                    {teacherData.designation}
                  </Badge>
                  <Badge className="bg-green-100 text-green-700">
                    {teacherData.status}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Experience</p>
                <p className="text-xl font-bold text-gray-800">
                  {teacherData.experience}
                </p>
                <p className="text-sm text-gray-500 mt-2">Joining Date</p>
                <p className="text-lg font-semibold text-gray-700">
                  {teacherData.joiningDate}
                </p>
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
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all whitespace-nowrap ${isActive ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}
              >
                <Icon className="w-4 h-4" /> {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-blue-600" /> Basic Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Full Name:</span>
                <span className="font-medium">{teacherData.name}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Date of Birth:</span>
                <span>{teacherData.dateOfBirth}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Gender:</span>
                <span>{teacherData.gender}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Blood Group:</span>
                <span>{teacherData.bloodGroup}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Nationality:</span>
                <span>{teacherData.nationality}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Marital Status:</span>
                <span>{teacherData.maritalStatus}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-600" /> Contact Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Email:</span>
                <span>{teacherData.email}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Phone:</span>
                <span>{teacherData.phone}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Alternate Phone:</span>
                <span>{teacherData.alternatePhone}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Address:</span>
                <span>
                  {teacherData.address}, {teacherData.city}, {teacherData.state}{" "}
                  - {teacherData.zipCode}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Emergency Contact:</span>
                <span>
                  {teacherData.emergencyContact} ({teacherData.emergencyPhone})
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" /> Subjects Teaching
            </h3>
            <div className="space-y-2">
              {teacherData.subjects.map((subject, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-2 border-b"
                >
                  <span>{subject}</span>
                  <Badge className="bg-green-100 text-green-700">Active</Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" /> Classes Assigned
            </h3>
            <div className="space-y-2">
              {teacherData.classes.map((cls, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-2 border-b"
                >
                  <span>
                    {cls.class} - Section {cls.section}
                  </span>
                  <Badge className="bg-purple-100 text-purple-700">
                    {cls.role}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Professional Tab */}
      {activeTab === "professional" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-600" /> Employment Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Employee ID:</span>
                <span className="font-medium">{teacherData.employeeId}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Department:</span>
                <span>{teacherData.department}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Designation:</span>
                <span>{teacherData.designation}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Qualification:</span>
                <span>{teacherData.qualification}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Experience:</span>
                <span>{teacherData.experience}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Specialization:</span>
                <span>{teacherData.specialization}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Joining Date:</span>
                <span>{teacherData.joiningDate}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-600" /> Bank Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Bank Name:</span>
                <span>{teacherData.bankName}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Account Number:</span>
                <span>{teacherData.accountNumber}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">IFSC Code:</span>
                <span>{teacherData.ifscCode}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">PAN Number:</span>
                <span>{teacherData.panNumber}</span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Attendance Tab */}
      {activeTab === "attendance" && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" /> Attendance Summary
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Month</th>
                  <th className="text-left py-2">Present</th>
                  <th className="text-left py-2">Total</th>
                  <th className="text-left py-2">Percentage</th>
                  <th className="text-left py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((item, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="py-2">{item.month}</td>
                    <td>{item.present}</td>
                    <td>{item.total}</td>
                    <td>{item.percentage}%</td>
                    <td>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 rounded-full h-2"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Leave Tab */}
      {activeTab === "leave" && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" /> Leave History
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Type</th>
                  <th className="text-left py-2">From Date</th>
                  <th className="text-left py-2">To Date</th>
                  <th className="text-left py-2">Days</th>
                  <th className="text-left py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {leaveHistory.map((leave) => (
                  <tr key={leave.id} className="border-b">
                    <td className="py-2">{leave.type}</td>
                    <td>{leave.fromDate}</td>
                    <td>{leave.toDate}</td>
                    <td>{leave.days}</td>
                    <td>
                      <Badge
                        className={
                          leave.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }
                      >
                        {leave.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Salary Tab */}
      {activeTab === "salary" && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-blue-600" /> Salary Details
          </h3>
          <div className="space-y-3 max-w-md">
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-500">Basic Salary:</span>
              <span className="font-medium">₹{teacherData.basicSalary}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-500">Allowances (HRA, DA, etc.):</span>
              <span>₹{teacherData.allowances}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-500">Deductions (PF, TDS, etc.):</span>
              <span className="text-red-600">-₹{teacherData.deductions}</span>
            </div>
            <div className="flex justify-between py-3 bg-gray-50 rounded-lg px-4">
              <span className="font-semibold">Net Salary:</span>
              <span className="font-bold text-green-600 text-xl">
                ₹{netSalary}
              </span>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
