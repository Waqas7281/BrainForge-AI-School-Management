// src/pages/reports/FeesReport.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Receipt, Download, Printer, X } from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";

export default function FeesReport() {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [showReport, setShowReport] = useState(false);

  const classes = [
    "all",
    "Class 1",
    "Class 2",
    "Class 3",
    "Class 4",
    "Class 5",
  ];
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

  // Mock Fees Data
  const feesData = {
    "Class 1": [
      {
        name: "Alice Johnson",
        rollNo: "101",
        totalFees: 8000,
        paid: 8000,
        pending: 0,
        status: "Paid",
      },
      {
        name: "Bob Smith",
        rollNo: "102",
        totalFees: 8000,
        paid: 5000,
        pending: 3000,
        status: "Partial",
      },
      {
        name: "Charlie Davis",
        rollNo: "103",
        totalFees: 8000,
        paid: 0,
        pending: 8000,
        status: "Pending",
      },
    ],
    "Class 2": [
      {
        name: "Diana Prince",
        rollNo: "201",
        totalFees: 7500,
        paid: 7500,
        pending: 0,
        status: "Paid",
      },
      {
        name: "Ethan Hunt",
        rollNo: "202",
        totalFees: 7500,
        paid: 7500,
        pending: 0,
        status: "Paid",
      },
    ],
  };

  const currentData =
    selectedClass !== "all"
      ? feesData[selectedClass] || []
      : Object.values(feesData).flat();

  const totalFees = currentData.reduce((sum, s) => sum + s.totalFees, 0);
  const totalPaid = currentData.reduce((sum, s) => sum + s.paid, 0);
  const totalPending = currentData.reduce((sum, s) => sum + s.pending, 0);
  const collectionRate =
    totalFees > 0 ? ((totalPaid / totalFees) * 100).toFixed(1) : 0;

  const handlePrint = () => window.print();
  const handleExport = () => alert("Exporting fees report...");

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Fees Report</h1>
          <p className="text-gray-500 mt-1">View fee collection summary</p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/reports")}
          className="flex items-center gap-2"
        >
          <X className="w-4 h-4" /> Back
        </Button>
      </div>

      <Card className="p-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            {classes.map((c) => (
              <option key={c} value={c}>
                {c === "all" ? "All Classes" : c}
              </option>
            ))}
          </select>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="">Select Month</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <Button
            onClick={() => setShowReport(true)}
            disabled={!selectedMonth}
            className="bg-blue-600 text-white"
          >
            Generate Report
          </Button>
        </div>
      </Card>

      {showReport && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
            <Card className="p-4 text-center">
              <p className="text-3xl font-bold text-blue-600">
                ₹{totalFees.toLocaleString()}
              </p>
              <p className="text-gray-500">Total Fees</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-3xl font-bold text-green-600">
                ₹{totalPaid.toLocaleString()}
              </p>
              <p className="text-gray-500">Collected</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-3xl font-bold text-red-600">
                ₹{totalPending.toLocaleString()}
              </p>
              <p className="text-gray-500">Pending</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-3xl font-bold text-purple-600">
                {collectionRate}%
              </p>
              <p className="text-gray-500">Collection Rate</p>
            </Card>
          </div>

          <Card className="p-0 overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b bg-gray-50">
              <h3 className="font-semibold">Fee Details - {selectedMonth}</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleExport}>
                  <Download className="w-4 h-4 mr-1" /> Export
                </Button>
                <Button variant="outline" size="sm" onClick={handlePrint}>
                  <Printer className="w-4 h-4 mr-1" /> Print
                </Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left px-4 py-3">Roll No</th>
                    <th className="text-left px-4 py-3">Student Name</th>
                    <th className="text-left px-4 py-3">Total Fees</th>
                    <th className="text-left px-4 py-3">Paid</th>
                    <th className="text-left px-4 py-3">Pending</th>
                    <th className="text-left px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((student, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="px-4 py-3">{student.rollNo}</td>
                      <td className="px-4 py-3 font-medium">{student.name}</td>
                      <td className="px-4 py-3">
                        ₹{student.totalFees.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-green-600">
                        ₹{student.paid.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-red-600">
                        ₹{student.pending.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          className={
                            student.status === "Paid"
                              ? "bg-green-100 text-green-700"
                              : student.status === "Partial"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                          }
                        >
                          {student.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}

      <Card className="mt-6 p-4 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <Receipt className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-medium text-blue-800">About Fees Report</p>
            <p className="text-sm text-blue-700">
              Generate fee collection reports with class and month filters.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
