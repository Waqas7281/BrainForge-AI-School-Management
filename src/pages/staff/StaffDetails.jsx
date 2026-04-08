// src/pages/staff/StaffDetails.jsx

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
  DollarSign,
  UserCheck,
  Clock,
  CheckCircle,
  AlertCircle,
  CreditCard,
  Building2,
  Users,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";

// Mock Staff Data
const staffData = {
  id: "STF001",
  name: "John Smith",
  firstName: "John",
  lastName: "Smith",
  dateOfBirth: "1985-05-15",
  gender: "Male",
  bloodGroup: "O+",

  // Contact
  email: "john.smith@school.edu",
  phone: "(555) 111-2222",
  alternatePhone: "(555) 111-2223",
  address: "123 Main Street",
  city: "New York",
  state: "NY",

  // Professional
  employeeId: "STF001",
  role: "Accountant",
  department: "Accounts",
  joiningDate: "2022-01-15",
  qualification: "B.Com",
  experience: "5 years",

  // Salary
  basicSalary: 35000,
  allowances: 5000,
  deductions: 3000,
  bankName: "Bank of America",
  accountNumber: "****1234",
  ifscCode: "BOFA123456",

  // Status
  status: "Active",
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

export default function StaffDetails() {
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
    staffData.basicSalary + staffData.allowances - staffData.deductions;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate("/staff")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Staff Details</h1>
            <p className="text-gray-500 mt-1">
              Complete staff information and records
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
            <Edit className="w-4 h-4" /> Edit Staff
          </Button>
        </div>
      </div>

      {/* Staff Header Card */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <div className="w-28 h-28 bg-gradient-to-br from-gray-500 to-gray-700 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
              {staffData.firstName.charAt(0)}
              {staffData.lastName.charAt(0)}
            </div>
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {staffData.name}
                </h2>
                <p className="text-gray-500">
                  Employee ID: {staffData.employeeId}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge className="bg-blue-100 text-blue-700">
                    {staffData.role}
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-700">
                    {staffData.department}
                  </Badge>
                  <Badge className="bg-green-100 text-green-700">
                    {staffData.status}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Experience</p>
                <p className="text-xl font-bold text-gray-800">
                  {staffData.experience}
                </p>
                <p className="text-sm text-gray-500 mt-2">Joining Date</p>
                <p className="text-lg font-semibold text-gray-700">
                  {staffData.joiningDate}
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
                <span className="font-medium">{staffData.name}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Date of Birth:</span>
                <span>{staffData.dateOfBirth}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Gender:</span>
                <span>{staffData.gender}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Blood Group:</span>
                <span>{staffData.bloodGroup}</span>
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
                <span>{staffData.email}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Phone:</span>
                <span>{staffData.phone}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Alternate Phone:</span>
                <span>{staffData.alternatePhone}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Address:</span>
                <span>
                  {staffData.address}, {staffData.city}, {staffData.state}
                </span>
              </div>
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
                <span className="font-medium">{staffData.employeeId}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Role:</span>
                <span>{staffData.role}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Department:</span>
                <span>{staffData.department}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Qualification:</span>
                <span>{staffData.qualification}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Experience:</span>
                <span>{staffData.experience}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Joining Date:</span>
                <span>{staffData.joiningDate}</span>
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
                <span>{staffData.bankName}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">Account Number:</span>
                <span>{staffData.accountNumber}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-500">IFSC Code:</span>
                <span>{staffData.ifscCode}</span>
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
                    <td className="py-2">{item.present}</td>
                    <td className="py-2">{item.total}</td>
                    <td className="py-2">{item.percentage}%</td>
                    <td className="py-2">
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
                    <td className="py-2">{leave.fromDate}</td>
                    <td className="py-2">{leave.toDate}</td>
                    <td className="py-2">{leave.days}</td>
                    <td className="py-2">
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
              <span className="font-medium">₹{staffData.basicSalary}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-500">Allowances:</span>
              <span>₹{staffData.allowances}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-500">Deductions:</span>
              <span className="text-red-600">-₹{staffData.deductions}</span>
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
