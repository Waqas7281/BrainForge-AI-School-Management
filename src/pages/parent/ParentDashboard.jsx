// src/pages/parent/ParentDashboard.jsx

import { useState } from "react";
import { Card } from "../../components/ui/card";
import {
  User,
  Calendar,
  DollarSign,
  Award,
  TrendingUp,
  Bell,
  Eye,
} from "lucide-react";

export default function ParentDashboard() {
  // Single child data (mock - will come from API based on logged in parent)
  const [child] = useState({
    id: "STU001",
    name: "Alice Johnson",
    class: "Class 5-A",
    rollNo: "101",
    fatherName: "John Johnson",
    motherName: "Sarah Johnson",
    bloodGroup: "O+",
    admissionDate: "2024-01-15",
  });

  const [stats] = useState({
    attendance: 92,
    feesPaid: 45000,
    feesTotal: 50000,
    marks: 85,
    rank: 5,
  });

  const [recentResults] = useState([
    {
      subject: "Mathematics",
      marks: 85,
      totalMarks: 100,
      grade: "A",
      status: "Pass",
    },
    {
      subject: "Science",
      marks: 92,
      totalMarks: 100,
      grade: "A+",
      status: "Pass",
    },
    {
      subject: "English",
      marks: 78,
      totalMarks: 100,
      grade: "B+",
      status: "Pass",
    },
  ]);

  const [attendanceData] = useState([
    { month: "January", present: 22, total: 24, percentage: 92 },
    { month: "February", present: 20, total: 22, percentage: 91 },
    { month: "March", present: 23, total: 25, percentage: 92 },
  ]);

  const [notices] = useState([
    { title: "Parent-Teacher Meeting", date: "May 20, 2024", important: true },
    { title: "Annual Sports Day", date: "May 25, 2024", important: false },
    { title: "Summer Vacation", date: "June 1, 2024", important: false },
  ]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Parent Dashboard</h1>
        <p className="text-gray-500 mt-1">View your child's progress</p>
      </div>

      {/* Child Profile Card - Read Only */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {child.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">{child.name}</h2>
              <p className="text-gray-600">
                {child.class} | Roll No: {child.rollNo}
              </p>
              <p className="text-sm text-gray-500">
                Father: {child.fatherName} | Mother: {child.motherName}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">
              Blood Group: {child.bloodGroup}
            </p>
            <p className="text-sm text-gray-500">
              Admission Date: {child.admissionDate}
            </p>
          </div>
        </div>
      </Card>

      {/* Stats Cards - Read Only */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Attendance</p>
              <p className="text-2xl font-bold text-green-600">
                {stats.attendance}%
              </p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Fees Paid</p>
              <p className="text-2xl font-bold text-blue-600">
                ₹{stats.feesPaid.toLocaleString()}
              </p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Average Marks</p>
              <p className="text-2xl font-bold text-purple-600">
                {stats.marks}%
              </p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Class Rank</p>
              <p className="text-2xl font-bold text-orange-600">{stats.rank}</p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Results - Read Only */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-blue-600" /> Recent Results
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 text-sm font-medium text-gray-500">
                  Subject
                </th>
                <th className="text-left py-2 text-sm font-medium text-gray-500">
                  Marks
                </th>
                <th className="text-left py-2 text-sm font-medium text-gray-500">
                  Grade
                </th>
                <th className="text-left py-2 text-sm font-medium text-gray-500">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {recentResults.map((result, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-2 text-gray-700">{result.subject}</td>
                  <td className="py-2">
                    {result.marks}/{result.totalMarks}
                  </td>
                  <td className="py-2 font-semibold text-blue-600">
                    {result.grade}
                  </td>
                  <td className="py-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                      {result.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-center">
          <button className="text-sm text-blue-600 hover:underline flex items-center gap-1 justify-center">
            <Eye className="w-3 h-3" /> View Full Results
          </button>
        </div>
      </Card>

      {/* Attendance Summary - Read Only */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-green-600" /> Attendance Summary
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 text-sm font-medium text-gray-500">
                  Month
                </th>
                <th className="text-left py-2 text-sm font-medium text-gray-500">
                  Present
                </th>
                <th className="text-left py-2 text-sm font-medium text-gray-500">
                  Total
                </th>
                <th className="text-left py-2 text-sm font-medium text-gray-500">
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((item, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-2 text-gray-700">{item.month}</td>
                  <td className="py-2">{item.present}</td>
                  <td className="py-2">{item.total}</td>
                  <td className="py-2">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 rounded-full h-2"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm">{item.percentage}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-center">
          <button className="text-sm text-blue-600 hover:underline flex items-center gap-1 justify-center">
            <Eye className="w-3 h-3" /> View Full Attendance
          </button>
        </div>
      </Card>

      {/* Fee Status - Read Only */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-green-600" /> Fee Status
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total Fees:</span>
            <span className="font-semibold">
              ₹{stats.feesTotal.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Paid:</span>
            <span className="font-semibold text-green-600">
              ₹{stats.feesPaid.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Pending:</span>
            <span className="font-semibold text-red-600">
              ₹{(stats.feesTotal - stats.feesPaid).toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-green-500 rounded-full h-2"
              style={{ width: `${(stats.feesPaid / stats.feesTotal) * 100}%` }}
            />
          </div>
        </div>
        <div className="mt-4 text-center">
          <button className="text-sm text-blue-600 hover:underline flex items-center gap-1 justify-center">
            <Eye className="w-3 h-3" /> View Fee Statement
          </button>
        </div>
      </Card>

      {/* Notices - Read Only */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-purple-600" /> Recent Notices
        </h2>
        <div className="space-y-3">
          {notices.map((notice, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg ${notice.important ? "bg-red-50 border-l-4 border-l-red-500" : "bg-gray-50"}`}
            >
              <p className="font-medium text-gray-800">{notice.title}</p>
              <p className="text-sm text-gray-500">{notice.date}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <button className="text-sm text-blue-600 hover:underline flex items-center gap-1 justify-center">
            <Eye className="w-3 h-3" /> View All Notices
          </button>
        </div>
      </Card>

      {/* Footer Note */}
      <div className="text-center text-xs text-gray-400 py-4">
        <p>
          This is a read-only view. For any changes, please contact the school
          administration.
        </p>
      </div>
    </div>
  );
}
