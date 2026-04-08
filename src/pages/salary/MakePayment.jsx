// src/pages/salary/MakePayment.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DollarSign,
  Search,
  UserCheck,
  Calendar,
  X,
  CheckCircle,
  AlertCircle,
  Printer,
  Download,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function MakePayment() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [paymentMode, setPaymentMode] = useState("Bank Transfer");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  const currentYear = new Date().getFullYear();

  // Mock Employees with Salary
  const employees = [
    {
      id: "EMP001",
      name: "Dr. Sarah Wilson",
      type: "Teacher",
      department: "Mathematics",
      salary: 75000,
      bankAccount: "XXXX1234",
      status: "Pending",
    },
    {
      id: "EMP002",
      name: "Prof. James Brown",
      type: "Teacher",
      department: "English",
      salary: 48000,
      bankAccount: "XXXX5678",
      status: "Pending",
    },
    {
      id: "EMP003",
      name: "Ms. Emily Davis",
      type: "Teacher",
      department: "Science",
      salary: 37000,
      bankAccount: "XXXX9012",
      status: "Paid",
    },
    {
      id: "STF001",
      name: "John Smith",
      type: "Staff",
      department: "Accounts",
      salary: 37000,
      bankAccount: "XXXX3456",
      status: "Pending",
    },
  ];

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handlePayment = async () => {
    if (!selectedEmployee || !selectedMonth) return;
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Make Payment</h1>
          <p className="text-gray-500 mt-1">Process monthly salary payments</p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/salary")}
          className="flex items-center gap-2"
        >
          <X className="w-4 h-4" /> Back
        </Button>
      </div>

      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-700">
            Salary payment processed successfully!
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Employee List */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-blue-600" /> Select Employee
          </h2>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredEmployees.map((emp) => (
              <button
                key={emp.id}
                onClick={() => setSelectedEmployee(emp)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg ${selectedEmployee?.id === emp.id ? "bg-blue-50 border-blue-300 border" : "hover:bg-gray-50 border border-transparent"}`}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                  {emp.name.charAt(0)}
                </div>
                <div className="text-left flex-1">
                  <p className="font-medium">{emp.name}</p>
                  <p className="text-xs text-gray-500">
                    {emp.id} | {emp.type} | {emp.department}
                  </p>
                  <p className="text-xs font-semibold text-green-600">
                    Salary: ₹{emp.salary.toLocaleString()}
                  </p>
                </div>
                <Badge
                  className={
                    emp.status === "Paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }
                >
                  {emp.status}
                </Badge>
              </button>
            ))}
          </div>
        </Card>

        {/* Right Panel - Payment */}
        <Card className="lg:col-span-2 p-6">
          {!selectedEmployee ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold">No Employee Selected</h3>
              <p className="text-gray-500">
                Select an employee from the left panel
              </p>
            </div>
          ) : (
            <>
              <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {selectedEmployee.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">
                      {selectedEmployee.name}
                    </h2>
                    <p className="text-gray-600">
                      {selectedEmployee.id} | {selectedEmployee.type} |{" "}
                      {selectedEmployee.department}
                    </p>
                    <p className="text-gray-500">
                      Bank Account: {selectedEmployee.bankAccount}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Select Month
                  </label>
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="">Choose Month</option>
                    {months.map((m) => (
                      <option key={m} value={m}>
                        {m} {currentYear}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Payment Mode
                  </label>
                  <select
                    value={paymentMode}
                    onChange={(e) => setPaymentMode(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Cash">Cash</option>
                    <option value="Cheque">Cheque</option>
                  </select>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Salary Amount:</span>
                  <span className="text-2xl font-bold text-green-600">
                    ₹{selectedEmployee.salary.toLocaleString()}
                  </span>
                </div>
              </div>

              <Button
                onClick={handlePayment}
                disabled={
                  !selectedMonth ||
                  isSubmitting ||
                  selectedEmployee.status === "Paid"
                }
                className="w-full bg-green-600 text-white py-3"
              >
                {isSubmitting
                  ? "Processing..."
                  : `Pay ₹${selectedEmployee.salary.toLocaleString()}`}
              </Button>
            </>
          )}
        </Card>
      </div>

      <Card className="mt-6 p-4 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-medium text-blue-800">About Salary Payment</p>
            <p className="text-sm text-blue-700">
              Process monthly salary payments for teachers and staff. Payments
              can be made via bank transfer, cash, or cheque.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
