// src/pages/reports/FinancialReport.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DollarSign,
  Download,
  Printer,
  X,
  TrendingUp,
  TrendingDown,
  PiggyBank,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export default function FinancialReport() {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [showReport, setShowReport] = useState(false);

  const years = ["2023", "2024", "2025"];
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

  // Mock Financial Data
  const incomeData = [
    { head: "Tuition Fees", amount: 125000, percentage: 62 },
    { head: "Admission Fees", amount: 50000, percentage: 25 },
    { head: "Transport Fees", amount: 30000, percentage: 15 },
    { head: "Library Fees", amount: 10000, percentage: 5 },
    { head: "Exam Fees", amount: 25000, percentage: 12 },
  ];

  const expenseData = [
    { head: "Staff Salary", amount: 250000, percentage: 65 },
    { head: "Electricity Bill", amount: 35000, percentage: 9 },
    { head: "Maintenance", amount: 15000, percentage: 4 },
    { head: "Stationery", amount: 8000, percentage: 2 },
    { head: "Transport Fuel", amount: 12000, percentage: 3 },
  ];

  const totalIncome = incomeData.reduce((sum, i) => sum + i.amount, 0);
  const totalExpense = expenseData.reduce((sum, e) => sum + e.amount, 0);
  const netProfit = totalIncome - totalExpense;
  const profitMargin =
    totalIncome > 0 ? ((netProfit / totalIncome) * 100).toFixed(1) : 0;

  const handlePrint = () => window.print();
  const handleExport = () => alert("Exporting financial report...");

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Financial Report</h1>
          <p className="text-gray-500 mt-1">View income and expense summary</p>
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
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="">Select Year</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
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
            disabled={!selectedMonth || !selectedYear}
            className="bg-blue-600 text-white"
          >
            Generate Report
          </Button>
        </div>
      </Card>

      {showReport && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Card className="p-4 text-center bg-green-50">
              <p className="text-3xl font-bold text-green-600">
                ₹{totalIncome.toLocaleString()}
              </p>
              <p className="text-gray-500">Total Income</p>
              <TrendingUp className="w-5 h-5 text-green-600 mx-auto mt-2" />
            </Card>
            <Card className="p-4 text-center bg-red-50">
              <p className="text-3xl font-bold text-red-600">
                ₹{totalExpense.toLocaleString()}
              </p>
              <p className="text-gray-500">Total Expense</p>
              <TrendingDown className="w-5 h-5 text-red-600 mx-auto mt-2" />
            </Card>
            <Card
              className={`p-4 text-center ${netProfit >= 0 ? "bg-blue-50" : "bg-orange-50"}`}
            >
              <p
                className={`text-3xl font-bold ${netProfit >= 0 ? "text-blue-600" : "text-orange-600"}`}
              >
                ₹{Math.abs(netProfit).toLocaleString()}
              </p>
              <p className="text-gray-500">
                {netProfit >= 0 ? "Net Profit" : "Net Loss"}
              </p>
              <PiggyBank
                className={`w-5 h-5 ${netProfit >= 0 ? "text-blue-600" : "text-orange-600"} mx-auto mt-2`}
              />
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Income Section */}
            <Card className="p-0 overflow-hidden">
              <div className="bg-green-600 p-3 text-white">
                <h3 className="font-semibold">Income Breakdown</h3>
              </div>
              <div className="p-4 space-y-3">
                {incomeData.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{item.head}</span>
                      <span className="font-semibold">
                        ₹{item.amount.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 rounded-full h-2"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Expense Section */}
            <Card className="p-0 overflow-hidden">
              <div className="bg-red-600 p-3 text-white">
                <h3 className="font-semibold">Expense Breakdown</h3>
              </div>
              <div className="p-4 space-y-3">
                {expenseData.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{item.head}</span>
                      <span className="font-semibold">
                        ₹{item.amount.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-red-500 rounded-full h-2"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card className="mt-6 p-4">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-semibold">
                Monthly Summary - {selectedMonth} {selectedYear}
              </h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleExport}>
                  <Download className="w-4 h-4 mr-1" /> Export
                </Button>
                <Button variant="outline" size="sm" onClick={handlePrint}>
                  <Printer className="w-4 h-4 mr-1" /> Print
                </Button>
              </div>
            </div>
            <div className="overflow-x-auto mt-4">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left px-4 py-2">Particulars</th>
                    <th className="text-right px-4 py-2">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-medium">Total Income</td>
                    <td className="px-4 py-2 text-right text-green-600">
                      ₹{totalIncome.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 font-medium">Total Expense</td>
                    <td className="px-4 py-2 text-right text-red-600">
                      ₹{totalExpense.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-2 font-bold">
                      Net {netProfit >= 0 ? "Profit" : "Loss"}
                    </td>
                    <td className="px-4 py-2 text-right font-bold">
                      {netProfit >= 0 ? "₹" : "-₹"}
                      {Math.abs(netProfit).toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Profit Margin</td>
                    <td className="px-4 py-2 text-right">{profitMargin}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}

      <Card className="mt-6 p-4 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <DollarSign className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-medium text-blue-800">About Financial Report</p>
            <p className="text-sm text-blue-700">
              Generate monthly/yearly financial reports with income and expense
              breakdowns.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
