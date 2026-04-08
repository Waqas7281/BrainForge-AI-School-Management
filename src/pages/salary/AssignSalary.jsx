// src/pages/salary/AssignSalary.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Search,
  UserCheck,
  DollarSign,
  X,
  CheckCircle,
  AlertCircle,
  Save,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function AssignSalary() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock Employees (Teachers + Staff)
  const employees = [
    {
      id: "EMP001",
      name: "Dr. Sarah Wilson",
      type: "Teacher",
      department: "Mathematics",
      currentSalary: 65000,
      grade: "Grade A",
    },
    {
      id: "EMP002",
      name: "Prof. James Brown",
      type: "Teacher",
      department: "English",
      currentSalary: 45000,
      grade: "Grade B",
    },
    {
      id: "EMP003",
      name: "Ms. Emily Davis",
      type: "Teacher",
      department: "Science",
      currentSalary: 35000,
      grade: "Grade C",
    },
    {
      id: "STF001",
      name: "John Smith",
      type: "Staff",
      department: "Accounts",
      currentSalary: 35000,
      grade: "Grade C",
    },
    {
      id: "STF002",
      name: "Mary Johnson",
      type: "Staff",
      department: "Library",
      currentSalary: 32000,
      grade: "Grade D",
    },
    {
      id: "STF003",
      name: "Robert Brown",
      type: "Staff",
      department: "Security",
      currentSalary: 18000,
      grade: "Grade E",
    },
  ];

  // Mock Salary Grades
  const salaryGrades = [
    {
      id: 1,
      name: "Grade A",
      minSalary: 50000,
      maxSalary: 80000,
      da: 12000,
      hra: 8000,
      ta: 5000,
    },
    {
      id: 2,
      name: "Grade B",
      minSalary: 35000,
      maxSalary: 50000,
      da: 8000,
      hra: 5000,
      ta: 3000,
    },
    {
      id: 3,
      name: "Grade C",
      minSalary: 25000,
      maxSalary: 35000,
      da: 6000,
      hra: 4000,
      ta: 2000,
    },
    {
      id: 4,
      name: "Grade D",
      minSalary: 18000,
      maxSalary: 25000,
      da: 4000,
      hra: 3000,
      ta: 1500,
    },
    {
      id: 5,
      name: "Grade E",
      minSalary: 12000,
      maxSalary: 18000,
      da: 2000,
      hra: 2000,
      ta: 1000,
    },
  ];

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const selectedGradeData = salaryGrades.find((g) => g.name === selectedGrade);
  const calculatedSalary = selectedGradeData
    ? {
        basic: selectedGradeData.minSalary,
        da: selectedGradeData.da,
        hra: selectedGradeData.hra,
        ta: selectedGradeData.ta,
        total:
          selectedGradeData.minSalary +
          selectedGradeData.da +
          selectedGradeData.hra +
          selectedGradeData.ta,
      }
    : null;

  const handleAssign = async () => {
    if (!selectedEmployee || !selectedGrade) return;
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Assign Salary</h1>
          <p className="text-gray-500 mt-1">
            Assign salary grades to employees
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

      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-700">Salary assigned successfully!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Employee List */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" /> Select Employee
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
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                  {emp.name.charAt(0)}
                </div>
                <div className="text-left flex-1">
                  <p className="font-medium">{emp.name}</p>
                  <p className="text-xs text-gray-500">
                    {emp.id} | {emp.type} | {emp.department}
                  </p>
                  <p className="text-xs font-semibold text-green-600">
                    Current: ₹{emp.currentSalary.toLocaleString()}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Right Panel - Assignment */}
        <Card className="lg:col-span-2 p-6">
          {!selectedEmployee ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold">No Employee Selected</h3>
              <p className="text-gray-500">
                Select an employee from the left panel
              </p>
            </div>
          ) : (
            <>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
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
                      Current Salary:{" "}
                      <span className="font-semibold">
                        ₹{selectedEmployee.currentSalary.toLocaleString()}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Select Salary Grade
                </label>
                <select
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="">Choose Grade</option>
                  {salaryGrades.map((g) => (
                    <option key={g.id} value={g.name}>
                      {g.name} (₹{g.minSalary.toLocaleString()} - ₹
                      {g.maxSalary.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>

              {selectedGradeData && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Salary Breakdown
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Basic Salary:</span>
                      <span>₹{calculatedSalary.basic.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dearness Allowance (DA):</span>
                      <span>₹{calculatedSalary.da.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>House Rent Allowance (HRA):</span>
                      <span>₹{calculatedSalary.hra.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Travel Allowance (TA):</span>
                      <span>₹{calculatedSalary.ta.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t font-bold">
                      <span>Total Salary:</span>
                      <span className="text-green-600">
                        ₹{calculatedSalary.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <Button
                onClick={handleAssign}
                disabled={!selectedGrade || isSubmitting}
                className="w-full bg-green-600 text-white py-3"
              >
                {isSubmitting ? "Assigning..." : "Assign Salary"}
              </Button>
            </>
          )}
        </Card>
      </div>

      <Card className="mt-6 p-4 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-medium text-blue-800">About Salary Assignment</p>
            <p className="text-sm text-blue-700">
              Assign salary grades to teachers and staff. The salary will be
              calculated based on the grade selected.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
