// src/pages/fees/FeesStatement.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Receipt,
  Search,
  User,
  BookOpen,
  DollarSign,
  X,
  CheckCircle,
  AlertCircle,
  Download,
  Printer,
  Calendar,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function FeesStatement() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Mock Students
  const students = [
    {
      id: "STU001",
      name: "Alice Johnson",
      class: "Class 1",
      rollNo: "101",
      fatherName: "John Johnson",
    },
    {
      id: "STU002",
      name: "Bob Smith",
      class: "Class 1",
      rollNo: "102",
      fatherName: "Mike Smith",
    },
    {
      id: "STU003",
      name: "Charlie Davis",
      class: "Class 2",
      rollNo: "201",
      fatherName: "Robert Davis",
    },
  ];

  // Mock Fee History
  const feeHistory = {
    STU001: [
      {
        id: 1,
        date: "2024-01-10",
        type: "Monthly Tuition",
        amount: 5000,
        status: "Paid",
        receiptNo: "RCP001",
      },
      {
        id: 2,
        date: "2024-02-10",
        type: "Monthly Tuition",
        amount: 5000,
        status: "Paid",
        receiptNo: "RCP002",
      },
      {
        id: 3,
        date: "2024-03-10",
        type: "Monthly Tuition",
        amount: 5000,
        status: "Paid",
        receiptNo: "RCP003",
      },
      {
        id: 4,
        date: "2024-04-10",
        type: "Monthly Tuition",
        amount: 5000,
        status: "Pending",
        receiptNo: null,
      },
      {
        id: 5,
        date: "2024-01-15",
        type: "Bus Transport",
        amount: 2000,
        status: "Paid",
        receiptNo: "RCP001",
      },
      {
        id: 6,
        date: "2024-02-15",
        type: "Bus Transport",
        amount: 2000,
        status: "Paid",
        receiptNo: "RCP002",
      },
      {
        id: 7,
        date: "2024-03-15",
        type: "Bus Transport",
        amount: 2000,
        status: "Paid",
        receiptNo: "RCP003",
      },
    ],
    STU002: [
      {
        id: 1,
        date: "2024-01-10",
        type: "Monthly Tuition",
        amount: 5000,
        status: "Paid",
        receiptNo: "RCP001",
      },
      {
        id: 2,
        date: "2024-02-10",
        type: "Monthly Tuition",
        amount: 5000,
        status: "Paid",
        receiptNo: "RCP002",
      },
      {
        id: 3,
        date: "2024-03-10",
        type: "Monthly Tuition",
        amount: 3000,
        status: "Partially Paid",
        receiptNo: "RCP003",
      },
      {
        id: 4,
        date: "2024-04-10",
        type: "Monthly Tuition",
        amount: 5000,
        status: "Pending",
        receiptNo: null,
      },
    ],
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.includes(searchTerm),
  );

  const getHistory = () => {
    if (!selectedStudent) return [];
    return feeHistory[selectedStudent.id] || [];
  };

  const history = getHistory();
  const totalPaid = history
    .filter((h) => h.status === "Paid")
    .reduce((sum, h) => sum + h.amount, 0);
  const totalPending = history
    .filter((h) => h.status === "Pending")
    .reduce((sum, h) => sum + h.amount, 0);
  const totalPartially = history
    .filter((h) => h.status === "Partially Paid")
    .reduce((sum, h) => sum + h.amount, 0);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Fees Statement</h1>
          <p className="text-gray-500 mt-1">
            View complete fee history of students
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/fees")}
          className="flex items-center gap-2"
        >
          <X className="w-4 h-4" /> Back
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Student List */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Search className="w-5 h-5 text-blue-600" /> Select Student
          </h2>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name, ID, or roll no..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredStudents.map((student) => (
              <button
                key={student.id}
                onClick={() => setSelectedStudent(student)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${selectedStudent?.id === student.id ? "bg-blue-50 border-blue-300 border" : "hover:bg-gray-50 border border-transparent"}`}
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
              </button>
            ))}
          </div>
        </Card>

        {/* Right Panel - Statement */}
        <Card className="lg:col-span-2 p-6">
          {!selectedStudent ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Receipt className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                No Student Selected
              </h3>
              <p className="text-gray-500">
                Select a student to view fee statement
              </p>
            </div>
          ) : (
            <>
              {/* Student Info */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {selectedStudent.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      {selectedStudent.name}
                    </h2>
                    <p className="text-gray-600">
                      ID: {selectedStudent.id} | Class: {selectedStudent.class}{" "}
                      | Roll: {selectedStudent.rollNo}
                    </p>
                    <p className="text-gray-500">
                      Father: {selectedStudent.fatherName}
                    </p>
                  </div>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-green-600">
                    ₹{totalPaid.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-600">Total Paid</p>
                </div>
                <div className="bg-red-50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-red-600">
                    ₹{totalPending.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-600">Total Pending</p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-yellow-600">
                    ₹{totalPartially.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-600">Partially Paid</p>
                </div>
              </div>

              {/* Fee History Table */}
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Fee History
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500">
                        Date
                      </th>
                      <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500">
                        Fee Type
                      </th>
                      <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500">
                        Amount
                      </th>
                      <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500">
                        Receipt No
                      </th>
                      <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500">
                        Status
                      </th>
                      <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((fee) => (
                      <tr key={fee.id} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-3 text-gray-600">{fee.date}</td>
                        <td className="py-2 px-3 text-gray-800">{fee.type}</td>
                        <td className="py-2 px-3 font-medium text-gray-800">
                          ₹{fee.amount.toLocaleString()}
                        </td>
                        <td className="py-2 px-3 font-mono text-gray-600">
                          {fee.receiptNo || "-"}
                        </td>
                        <td className="py-2 px-3">
                          <Badge
                            className={
                              fee.status === "Paid"
                                ? "bg-green-100 text-green-700"
                                : fee.status === "Partially Paid"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-red-100 text-red-700"
                            }
                          >
                            {fee.status}
                          </Badge>
                        </td>
                        <td className="py-2 px-3">
                          {fee.status === "Pending" && (
                            <Button
                              size="sm"
                              className="bg-blue-600 text-white"
                            >
                              Pay Now
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {history.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No fee records found</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <Button variant="outline" className="flex-1">
                  <Download className="w-4 h-4 mr-2" /> Download Statement
                </Button>
                <Button variant="outline" className="flex-1">
                  <Printer className="w-4 h-4 mr-2" /> Print Statement
                </Button>
              </div>
            </>
          )}
        </Card>
      </div>

      {/* Info Box */}
      <Card className="mt-6 p-4 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-medium text-blue-800">About Fees Statement</p>
            <p className="text-sm text-blue-700">
              Complete fee payment history of each student including paid,
              pending, and partially paid amounts.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
