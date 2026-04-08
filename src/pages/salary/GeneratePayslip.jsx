// src/pages/salary/GeneratePayslip.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Receipt,
  Search,
  UserCheck,
  Calendar,
  X,
  Printer,
  Download,
  AlertCircle,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function GeneratePayslip() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [showPayslip, setShowPayslip] = useState(false);

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

  const employees = [
    {
      id: "EMP001",
      name: "Dr. Sarah Wilson",
      type: "Teacher",
      department: "Mathematics",
      salary: 75000,
      bankAccount: "XXXX1234",
      pan: "ABCDE1234F",
    },
    {
      id: "EMP002",
      name: "Prof. James Brown",
      type: "Teacher",
      department: "English",
      salary: 48000,
      bankAccount: "XXXX5678",
      pan: "FGHIJ5678K",
    },
    {
      id: "EMP003",
      name: "Ms. Emily Davis",
      type: "Teacher",
      department: "Science",
      salary: 37000,
      bankAccount: "XXXX9012",
      pan: "KLMNO9012P",
    },
  ];

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleGenerate = () => {
    if (selectedEmployee && selectedMonth) {
      setShowPayslip(true);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Generate Payslip</h1>
          <p className="text-gray-500 mt-1">
            Download salary slips for employees
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/salary")}
          className="flex items-center gap-2"
        >
          <X className="w-4 h-4" /> Back
        </Button>
      </div>

      {!showPayslip ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-4 lg:col-span-1">
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
            <div className="space-y-2">
              {filteredEmployees.map((emp) => (
                <button
                  key={emp.id}
                  onClick={() => setSelectedEmployee(emp)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg ${selectedEmployee?.id === emp.id ? "bg-blue-50 border-blue-300 border" : "hover:bg-gray-50 border border-transparent"}`}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                    {emp.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{emp.name}</p>
                    <p className="text-xs text-gray-500">
                      {emp.id} | {emp.type}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          <Card className="p-6 lg:col-span-2">
            <h2 className="text-lg font-semibold mb-4">Payslip Details</h2>
            {!selectedEmployee ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Select an employee first</p>
              </div>
            ) : (
              <div className="space-y-4">
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
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Employee:</span>
                    <span className="font-semibold">
                      {selectedEmployee.name}
                    </span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-gray-600">ID:</span>
                    <span>{selectedEmployee.id}</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-gray-600">Department:</span>
                    <span>{selectedEmployee.department}</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-gray-600">Salary:</span>
                    <span className="font-bold text-green-600">
                      ₹{selectedEmployee.salary.toLocaleString()}
                    </span>
                  </div>
                </div>
                <Button
                  onClick={handleGenerate}
                  disabled={!selectedMonth}
                  className="w-full bg-blue-600 text-white py-3"
                >
                  Generate Payslip
                </Button>
              </div>
            )}
          </Card>
        </div>
      ) : (
        <Card className="p-6 max-w-2xl mx-auto" id="payslip">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Receipt className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Salary Payslip</h2>
            <p className="text-gray-500">Payment Confirmation</p>
          </div>
          <div className="border-t border-b py-4 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Employee Name:</span>
              <span className="font-semibold">{selectedEmployee.name}</span>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-gray-600">Employee ID:</span>
              <span>{selectedEmployee.id}</span>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-gray-600">Department:</span>
              <span>{selectedEmployee.department}</span>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-gray-600">PAN Number:</span>
              <span>{selectedEmployee.pan}</span>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-gray-600">Month:</span>
              <span className="font-semibold">
                {selectedMonth} {currentYear}
              </span>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 mb-2">Salary Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Basic Salary:</span>
                <span>
                  ₹{Math.round(selectedEmployee.salary * 0.5).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Dearness Allowance (DA):</span>
                <span>
                  ₹{Math.round(selectedEmployee.salary * 0.2).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>House Rent Allowance (HRA):</span>
                <span>
                  ₹{Math.round(selectedEmployee.salary * 0.15).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Travel Allowance (TA):</span>
                <span>
                  ₹{Math.round(selectedEmployee.salary * 0.05).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="font-bold">Gross Salary:</span>
                <span className="font-bold text-green-600">
                  ₹{selectedEmployee.salary.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">TDS Deduction:</span>
                <span className="text-red-600">
                  -₹{Math.round(selectedEmployee.salary * 0.1).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">PF Deduction:</span>
                <span className="text-red-600">
                  -₹
                  {Math.round(selectedEmployee.salary * 0.12).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="font-bold">Net Salary:</span>
                <span className="font-bold text-green-600 text-xl">
                  ₹{Math.round(selectedEmployee.salary * 0.78).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
          <div className="text-center text-gray-400 text-sm">
            This is a computer generated payslip
          </div>
          <div className="flex gap-3 mt-6">
            <Button variant="outline" onClick={handlePrint} className="flex-1">
              <Printer className="w-4 h-4 mr-2" /> Print
            </Button>
            <Button variant="outline" className="flex-1">
              <Download className="w-4 h-4 mr-2" /> Download PDF
            </Button>
          </div>
        </Card>
      )}

      <Card className="mt-6 p-4 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-medium text-blue-800">About Payslip</p>
            <p className="text-sm text-blue-700">
              Generate and download salary slips for employees. Payslip includes
              all earnings and deductions.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
