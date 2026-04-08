// src/pages/fees/CollectFees.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DollarSign,
  Search,
  User,
  BookOpen,
  Calendar,
  CreditCard,
  X,
  CheckCircle,
  AlertCircle,
  Printer,
  Download,
  Receipt,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function CollectFees() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedFees, setSelectedFees] = useState([]);
  const [paymentMode, setPaymentMode] = useState("Cash");
  const [receiptNo, setReceiptNo] = useState("");
  const [remarks, setRemarks] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock Students Data
  const students = [
    {
      id: "STU001",
      name: "Alice Johnson",
      class: "Class 1",
      rollNo: "101",
      fatherName: "John Johnson",
      phone: "(555) 123-4567",
    },
    {
      id: "STU002",
      name: "Bob Smith",
      class: "Class 1",
      rollNo: "102",
      fatherName: "Mike Smith",
      phone: "(555) 234-5678",
    },
    {
      id: "STU003",
      name: "Charlie Davis",
      class: "Class 2",
      rollNo: "201",
      fatherName: "Robert Davis",
      phone: "(555) 345-6789",
    },
    {
      id: "STU004",
      name: "Diana Prince",
      class: "Class 2",
      rollNo: "202",
      fatherName: "Thomas Prince",
      phone: "(555) 456-7890",
    },
  ];

  // Mock Fee Structure for selected student
  const feeStructure = {
    STU001: [
      {
        id: 1,
        name: "Monthly Tuition",
        amount: 5000,
        dueDate: "2024-04-10",
        status: "Pending",
        paidAmount: 0,
      },
      {
        id: 2,
        name: "Bus Transport",
        amount: 2000,
        dueDate: "2024-04-10",
        status: "Pending",
        paidAmount: 0,
      },
      {
        id: 3,
        name: "Library Fees",
        amount: 1000,
        dueDate: "2024-04-10",
        status: "Pending",
        paidAmount: 0,
      },
    ],
    STU002: [
      {
        id: 1,
        name: "Monthly Tuition",
        amount: 5000,
        dueDate: "2024-04-10",
        status: "Partially Paid",
        paidAmount: 2000,
      },
      {
        id: 2,
        name: "Bus Transport",
        amount: 2000,
        dueDate: "2024-04-10",
        status: "Pending",
        paidAmount: 0,
      },
      {
        id: 3,
        name: "Library Fees",
        amount: 1000,
        dueDate: "2024-04-10",
        status: "Paid",
        paidAmount: 1000,
      },
    ],
    STU003: [
      {
        id: 1,
        name: "Monthly Tuition",
        amount: 5500,
        dueDate: "2024-04-10",
        status: "Pending",
        paidAmount: 0,
      },
      {
        id: 2,
        name: "Bus Transport",
        amount: 2000,
        dueDate: "2024-04-10",
        status: "Pending",
        paidAmount: 0,
      },
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
    const fees = feeStructure[student.id] || [];
    setSelectedFees(fees.map((f) => ({ ...f, selected: f.status !== "Paid" })));
    setReceiptNo(`RCP${Date.now()}`);
  };

  const toggleFeeSelection = (feeId) => {
    setSelectedFees((prev) =>
      prev.map((fee) =>
        fee.id === feeId ? { ...fee, selected: !fee.selected } : fee,
      ),
    );
  };

  const toggleSelectAll = () => {
    const allSelected = selectedFees.every((f) => f.selected);
    setSelectedFees((prev) =>
      prev.map((fee) => ({ ...fee, selected: !allSelected })),
    );
  };

  const totalAmount = selectedFees
    .filter((f) => f.selected)
    .reduce((sum, f) => sum + (f.amount - f.paidAmount), 0);

  const handleSubmit = async () => {
    if (totalAmount === 0) return;
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    setShowReceipt(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Collect Fees</h1>
          <p className="text-gray-500 mt-1">
            Receive fee payments from students
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

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-700 font-medium">
            Fee collected successfully! Receipt generated.
          </span>
        </div>
      )}

      {!showReceipt ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Student Search */}
          <Card className="p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Search className="w-5 h-5 text-blue-600" /> Search Student
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
                  onClick={() => handleStudentSelect(student)}
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

          {/* Right Panel - Fee Collection */}
          <Card className="lg:col-span-2 p-6">
            {!selectedStudent ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  No Student Selected
                </h3>
                <p className="text-gray-500">
                  Select a student from the left panel to collect fees
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
                        ID: {selectedStudent.id} | Class:{" "}
                        {selectedStudent.class} | Roll: {selectedStudent.rollNo}
                      </p>
                      <p className="text-gray-500 text-sm">
                        Father: {selectedStudent.fatherName} | Phone:{" "}
                        {selectedStudent.phone}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Fee Items Table */}
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Fee Details
                </h3>
                <div className="overflow-x-auto mb-6">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="text-left py-2 px-3">
                          <input
                            type="checkbox"
                            checked={
                              selectedFees.length > 0 &&
                              selectedFees.every((f) => f.selected)
                            }
                            onChange={toggleSelectAll}
                            className="w-4 h-4"
                          />
                        </th>
                        <th className="text-left py-2 px-3">Fee Type</th>
                        <th className="text-left py-2 px-3">Total Amount</th>
                        <th className="text-left py-2 px-3">Paid Amount</th>
                        <th className="text-left py-2 px-3">Due Amount</th>
                        <th className="text-left py-2 px-3">Due Date</th>
                        <th className="text-left py-2 px-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedFees.map((fee) => (
                        <tr key={fee.id} className="border-b hover:bg-gray-50">
                          <td className="py-2 px-3">
                            <input
                              type="checkbox"
                              checked={fee.selected}
                              onChange={() => toggleFeeSelection(fee.id)}
                              disabled={fee.status === "Paid"}
                              className="w-4 h-4"
                            />
                          </td>
                          <td className="py-2 px-3 font-medium">{fee.name}</td>
                          <td className="py-2 px-3">
                            ₹{fee.amount.toLocaleString()}
                          </td>
                          <td className="py-2 px-3 text-green-600">
                            ₹{fee.paidAmount.toLocaleString()}
                          </td>
                          <td className="py-2 px-3 font-bold text-red-600">
                            ₹{(fee.amount - fee.paidAmount).toLocaleString()}
                          </td>
                          <td className="py-2 px-3 text-gray-600">
                            {fee.dueDate}
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
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Payment Details */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Payment Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Total Amount to Pay
                      </label>
                      <p className="text-2xl font-bold text-green-600">
                        ₹{totalAmount.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Payment Mode
                      </label>
                      <select
                        value={paymentMode}
                        onChange={(e) => setPaymentMode(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                      >
                        <option value="Cash">Cash</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="Cheque">Cheque</option>
                        <option value="Online">Online</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Receipt Number
                      </label>
                      <Input
                        value={receiptNo}
                        onChange={(e) => setReceiptNo(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Remarks
                      </label>
                      <Input
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        placeholder="Optional"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    onClick={handleSubmit}
                    disabled={totalAmount === 0 || isSubmitting}
                    className="flex-1 bg-green-600 text-white py-3"
                  >
                    {isSubmitting
                      ? "Processing..."
                      : `Pay ₹${totalAmount.toLocaleString()}`}
                  </Button>
                </div>
              </>
            )}
          </Card>
        </div>
      ) : (
        /* Receipt */
        <Card className="p-6 max-w-2xl mx-auto" id="receipt">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Receipt className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Fee Receipt</h2>
            <p className="text-gray-500">Payment Confirmation</p>
          </div>
          <div className="border-t border-b py-4 mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Receipt No:</span>
              <span className="font-semibold">{receiptNo}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Date:</span>
              <span className="font-semibold">
                {new Date().toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Mode:</span>
              <span className="font-semibold">{paymentMode}</span>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 mb-2">
              Student Details
            </h3>
            <p>
              <span className="text-gray-600">Name:</span>{" "}
              {selectedStudent.name}
            </p>
            <p>
              <span className="text-gray-600">Class:</span>{" "}
              {selectedStudent.class} (Roll: {selectedStudent.rollNo})
            </p>
            <p>
              <span className="text-gray-600">Student ID:</span>{" "}
              {selectedStudent.id}
            </p>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 mb-2">
              Payment Details
            </h3>
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-1">Fee Type</th>
                  <th className="text-right py-1">Amount</th>
                </tr>
              </thead>
              <tbody>
                {selectedFees
                  .filter((f) => f.selected)
                  .map((fee) => (
                    <tr key={fee.id} className="border-b">
                      <td className="py-1">{fee.name}</td>
                      <td className="py-1 text-right">
                        ₹{(fee.amount - fee.paidAmount).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                <tr className="font-bold">
                  <td className="py-2">Total</td>
                  <td className="py-2 text-right">
                    ₹{totalAmount.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {remarks && (
            <div className="mb-4 p-3 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">Remarks: {remarks}</p>
            </div>
          )}
          <div className="text-center text-gray-400 text-sm">
            Thank you for your payment!
          </div>
          <div className="flex gap-3 mt-6">
            <Button variant="outline" onClick={handlePrint} className="flex-1">
              <Printer className="w-4 h-4 mr-2" /> Print
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setShowReceipt(false);
                setSelectedStudent(null);
                setSelectedFees([]);
              }}
              className="flex-1"
            >
              Collect More
            </Button>
          </div>
        </Card>
      )}

      {/* Info Box */}
      <Card className="mt-6 p-4 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-medium text-blue-800">About Fee Collection</p>
            <p className="text-sm text-blue-700">
              Select student, choose fee types to collect, and generate receipt.
              Partial payments are supported.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
