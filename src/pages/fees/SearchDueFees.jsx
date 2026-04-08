// src/pages/fees/SearchDueFees.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  Search,
  User,
  BookOpen,
  DollarSign,
  X,
  AlertCircle,
  Download,
  Printer,
  Eye,
  Bell,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function SearchDueFees() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("");

  // Mock Students with Due Fees
  const dueStudents = [
    {
      id: "STU001",
      name: "Alice Johnson",
      class: "Class 1",
      rollNo: "101",
      fatherName: "John Johnson",
      phone: "(555) 123-4567",
      dueAmount: 8000,
      dueMonths: ["April 2024", "May 2024"],
      lastPayment: "2024-03-10",
    },
    {
      id: "STU002",
      name: "Bob Smith",
      class: "Class 1",
      rollNo: "102",
      fatherName: "Mike Smith",
      phone: "(555) 234-5678",
      dueAmount: 3000,
      dueMonths: ["April 2024"],
      lastPayment: "2024-03-15",
    },
    {
      id: "STU005",
      name: "Ethan Hunt",
      class: "Class 3",
      rollNo: "301",
      fatherName: "Jim Hunt",
      phone: "(555) 567-8901",
      dueAmount: 11000,
      dueMonths: ["March 2024", "April 2024", "May 2024"],
      lastPayment: "2024-02-28",
    },
    {
      id: "STU006",
      name: "Fiona Green",
      class: "Class 3",
      rollNo: "302",
      fatherName: "William Green",
      phone: "(555) 678-9012",
      dueAmount: 5500,
      dueMonths: ["April 2024"],
      lastPayment: "2024-03-20",
    },
  ];

  const classes = ["all", ...new Set(dueStudents.map((s) => s.class))];

  const filteredStudents = dueStudents.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.includes(searchTerm);
    const matchesClass =
      selectedClass === "all" || student.class === selectedClass;
    const matchesMonth =
      !selectedMonth ||
      student.dueMonths.some((m) => m.includes(selectedMonth));
    return matchesSearch && matchesClass && matchesMonth;
  });

  const stats = {
    totalStudents: dueStudents.length,
    totalDue: dueStudents.reduce((sum, s) => sum + s.dueAmount, 0),
    avgDue: Math.round(
      dueStudents.reduce((sum, s) => sum + s.dueAmount, 0) / dueStudents.length,
    ),
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Search Due Fees</h1>
          <p className="text-gray-500 mt-1">
            View students with pending fee payments
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigate("/fees")}
            className="flex items-center gap-2"
          >
            <X className="w-4 h-4" /> Back
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" /> Export
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Printer className="w-4 h-4" /> Print
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Students with Due</p>
              <p className="text-2xl font-bold">{stats.totalStudents}</p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-red-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Due Amount</p>
              <p className="text-2xl font-bold text-red-600">
                ₹{stats.totalDue.toLocaleString()}
              </p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Average Due per Student</p>
              <p className="text-2xl font-bold">
                ₹{stats.avgDue.toLocaleString()}
              </p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name, ID, or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="all">All Classes</option>
            {classes.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">All Months</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("");
              setSelectedClass("all");
              setSelectedMonth("");
            }}
            className="flex items-center gap-2"
          >
            Reset
          </Button>
        </div>
      </Card>

      {/* Due Students Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left px-4 py-3 text-xs font-semibold">
                  Student
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold">
                  Class
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold">
                  Father's Name
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold">
                  Contact
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold">
                  Due Months
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold">
                  Due Amount
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold">
                  Last Payment
                </th>
                <th className="text-right px-4 py-3 text-xs font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-xs text-gray-500">
                          ID: {student.id} | Roll: {student.rollNo}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{student.class}</td>
                  <td className="px-4 py-3">{student.fatherName}</td>
                  <td className="px-4 py-3">{student.phone}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {student.dueMonths.map((m, i) => (
                        <Badge key={i} className="bg-red-100 text-red-700">
                          {m}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-bold text-red-600">
                    ₹{student.dueAmount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {student.lastPayment}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg">
                        <DollarSign className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-purple-600 hover:bg-purple-50 rounded-lg">
                        <Bell className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium">No due students found</h3>
          </div>
        )}
      </Card>

      {/* Info Box */}
      <Card className="mt-6 p-4 bg-red-50 border-red-200">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <div>
            <p className="font-medium text-red-800">About Due Fees</p>
            <p className="text-sm text-red-700">
              Students with pending fee payments are listed here. Send reminders
              or collect fees directly from this page.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
