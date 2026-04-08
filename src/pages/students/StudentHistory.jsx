// src/pages/students/StudentHistory.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  History,
  Search,
  User,
  Calendar,
  BookOpen,
  DollarSign,
  Award,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Download,
  Printer,
  X,
  TrendingUp,
  Users,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function StudentHistory() {
  const navigate = useNavigate();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("academic");

  // Mock Students Data
  const students = [
    {
      id: "STU001",
      name: "Alice Johnson",
      class: "Class 5",
      rollNo: "101",
      admissionNo: "20240001",
      status: "Active",
    },
    {
      id: "STU002",
      name: "Bob Smith",
      class: "Class 5",
      rollNo: "102",
      admissionNo: "20240002",
      status: "Active",
    },
    {
      id: "STU003",
      name: "Charlie Davis",
      class: "Class 8",
      rollNo: "201",
      admissionNo: "20220001",
      status: "Active",
    },
    {
      id: "STU004",
      name: "Diana Prince",
      class: "Class 10",
      rollNo: "301",
      admissionNo: "20210001",
      status: "Transferred",
    },
    {
      id: "STU005",
      name: "Ethan Hunt",
      class: "Class 10",
      rollNo: "302",
      admissionNo: "20210002",
      status: "Alumni",
    },
  ];

  // Mock History Data
  const academicHistory = {
    STU001: [
      {
        year: "2023-24",
        class: "Class 4",
        section: "A",
        result: "Promoted",
        percentage: "85%",
      },
      {
        year: "2022-23",
        class: "Class 3",
        section: "A",
        result: "Promoted",
        percentage: "82%",
      },
      {
        year: "2021-22",
        class: "Class 2",
        section: "B",
        result: "Promoted",
        percentage: "78%",
      },
    ],
    STU004: [
      {
        year: "2023-24",
        class: "Class 9",
        section: "A",
        result: "Promoted",
        percentage: "88%",
      },
      {
        year: "2022-23",
        class: "Class 8",
        section: "A",
        result: "Promoted",
        percentage: "85%",
      },
      {
        year: "2021-22",
        class: "Class 7",
        section: "B",
        result: "Promoted",
        percentage: "80%",
      },
    ],
  };

  const feeHistory = {
    STU001: [
      { month: "April 2024", amount: 5000, status: "Paid", date: "2024-04-05" },
      { month: "May 2024", amount: 5000, status: "Paid", date: "2024-05-10" },
      { month: "June 2024", amount: 5000, status: "Paid", date: "2024-06-08" },
      { month: "July 2024", amount: 5000, status: "Pending", date: null },
    ],
    STU004: [
      { month: "April 2024", amount: 6000, status: "Paid", date: "2024-04-05" },
      { month: "May 2024", amount: 6000, status: "Paid", date: "2024-05-10" },
      { month: "June 2024", amount: 6000, status: "Overdue", date: null },
    ],
  };

  const examHistory = {
    STU001: [
      {
        exam: "Mid Term 2024",
        subjects: 5,
        totalMarks: 425,
        percentage: "85%",
        grade: "A",
        rank: 5,
      },
      {
        exam: "Final Term 2024",
        subjects: 5,
        totalMarks: 430,
        percentage: "86%",
        grade: "A",
        rank: 4,
      },
      {
        exam: "Mid Term 2023",
        subjects: 5,
        totalMarks: 410,
        percentage: "82%",
        grade: "B+",
        rank: 8,
      },
    ],
    STU004: [
      {
        exam: "Mid Term 2024",
        subjects: 6,
        totalMarks: 520,
        percentage: "86.7%",
        grade: "A",
        rank: 3,
      },
      {
        exam: "Final Term 2024",
        subjects: 6,
        totalMarks: 530,
        percentage: "88.3%",
        grade: "A",
        rank: 2,
      },
    ],
  };

  const attendanceHistory = {
    STU001: [
      { month: "January 2024", present: 22, total: 24, percentage: 91.7 },
      { month: "February 2024", present: 20, total: 22, percentage: 90.9 },
      { month: "March 2024", present: 23, total: 25, percentage: 92.0 },
      { month: "April 2024", present: 21, total: 23, percentage: 91.3 },
    ],
    STU004: [
      { month: "January 2024", present: 23, total: 24, percentage: 95.8 },
      { month: "February 2024", present: 21, total: 22, percentage: 95.5 },
      { month: "March 2024", present: 24, total: 25, percentage: 96.0 },
    ],
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.includes(searchTerm),
  );

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    setActiveTab("academic");
  };

  const tabs = [
    { id: "academic", label: "Academic", icon: BookOpen },
    { id: "fees", label: "Fee History", icon: DollarSign },
    { id: "exams", label: "Exam History", icon: Award },
    { id: "attendance", label: "Attendance", icon: Clock },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Overdue":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Student History</h1>
          <p className="text-gray-500 mt-1">
            View complete student academic records
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Student List */}
        <Card className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <History className="w-5 h-5 text-blue-600" />
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
                <Badge
                  className={
                    student.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }
                >
                  {student.status}
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

        {/* Right Panel - History Details */}
        <Card className="lg:col-span-2 p-6">
          {!selectedStudent ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <History className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                No Student Selected
              </h3>
              <p className="text-gray-500">
                Select a student from the left panel to view history
              </p>
            </div>
          ) : (
            <>
              {/* Student Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {selectedStudent.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      {selectedStudent.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      ID: {selectedStudent.id} | Class: {selectedStudent.class}{" "}
                      | Roll: {selectedStudent.rollNo}
                    </p>
                    <p className="text-xs text-gray-400">
                      Admission No: {selectedStudent.admissionNo}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Printer className="w-4 h-4" /> Print
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Download className="w-4 h-4" /> Export
                  </Button>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <nav className="flex gap-1 overflow-x-auto">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all ${
                          isActive
                            ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50"
                            : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Academic History Tab */}
              {activeTab === "academic" && (
                <div>
                  {(academicHistory[selectedStudent.id] || []).length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No academic history found</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {academicHistory[selectedStudent.id].map(
                        (record, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <BookOpen className="w-6 h-6 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-semibold text-gray-800">
                                  Academic Year: {record.year}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Class: {record.class} - Section{" "}
                                  {record.section}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Percentage: {record.percentage}
                                </p>
                              </div>
                            </div>
                            <Badge className="bg-green-100 text-green-700">
                              {record.result}
                            </Badge>
                          </div>
                        ),
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Fee History Tab */}
              {activeTab === "fees" && (
                <div>
                  {(feeHistory[selectedStudent.id] || []).length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No fee history found</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200 bg-gray-50">
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                              Month
                            </th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                              Amount
                            </th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                              Payment Date
                            </th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                              Status
                            </th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                              Receipt
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {feeHistory[selectedStudent.id].map((fee, idx) => (
                            <tr key={idx} className="border-b border-gray-100">
                              <td className="px-4 py-3 text-gray-800">
                                {fee.month}
                              </td>
                              <td className="px-4 py-3 text-gray-800">
                                ₹{fee.amount}
                              </td>
                              <td className="px-4 py-3 text-gray-500">
                                {fee.date || "-"}
                              </td>
                              <td className="px-4 py-3">
                                <Badge className={getStatusColor(fee.status)}>
                                  {fee.status}
                                </Badge>
                              </td>
                              <td className="px-4 py-3">
                                {fee.status === "Paid" && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-blue-600"
                                  >
                                    Download
                                  </Button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Exam History Tab */}
              {activeTab === "exams" && (
                <div>
                  {(examHistory[selectedStudent.id] || []).length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No exam history found</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200 bg-gray-50">
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                              Exam Name
                            </th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                              Subjects
                            </th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                              Total Marks
                            </th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                              Percentage
                            </th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                              Grade
                            </th>
                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                              Rank
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {examHistory[selectedStudent.id].map((exam, idx) => (
                            <tr key={idx} className="border-b border-gray-100">
                              <td className="px-4 py-3 font-medium text-gray-800">
                                {exam.exam}
                              </td>
                              <td className="px-4 py-3 text-gray-600">
                                {exam.subjects}
                              </td>
                              <td className="px-4 py-3 text-gray-600">
                                {exam.totalMarks}
                              </td>
                              <td className="px-4 py-3 font-semibold text-gray-800">
                                {exam.percentage}
                              </td>
                              <td className="px-4 py-3">
                                <Badge className="bg-purple-100 text-purple-700">
                                  {exam.grade}
                                </Badge>
                              </td>
                              <td className="px-4 py-3 text-gray-600">
                                {exam.rank}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Attendance History Tab */}
              {activeTab === "attendance" && (
                <div>
                  {(attendanceHistory[selectedStudent.id] || []).length ===
                  0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">
                        No attendance history found
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {attendanceHistory[selectedStudent.id].map(
                        (record, idx) => (
                          <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-800">
                                {record.month}
                              </span>
                              <span className="text-sm text-gray-600">
                                Present: {record.present} / {record.total} days
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-500 rounded-full h-2"
                                style={{ width: `${record.percentage}%` }}
                              />
                            </div>
                            <div className="flex justify-between mt-2">
                              <span className="text-xs text-gray-500">
                                Attendance: {record.percentage}%
                              </span>
                              <span
                                className={`text-xs font-medium ${record.percentage >= 90 ? "text-green-600" : record.percentage >= 75 ? "text-yellow-600" : "text-red-600"}`}
                              >
                                {record.percentage >= 90
                                  ? "Excellent"
                                  : record.percentage >= 75
                                    ? "Good"
                                    : "Needs Improvement"}
                              </span>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </Card>
      </div>

      {/* Info Box */}
      <Card className="mt-6 p-4 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-medium text-blue-800">Student History</p>
            <p className="text-sm text-blue-700">
              Complete academic records including class promotions, fee
              payments, exam results, and attendance history for each student.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
