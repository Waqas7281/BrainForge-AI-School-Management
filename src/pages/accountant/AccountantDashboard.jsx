// src/pages/accountant/AccountantDashboard.jsx

import { useState } from "react";
import { Card } from "../../components/ui/card";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Receipt,
  Users,
  CheckCircle,
} from "lucide-react";

export default function AccountantDashboard() {
  const [stats] = useState({
    totalIncome: 245000,
    totalExpense: 125000,
    pendingFees: 75000,
    collectedFees: 170000,
    totalStudents: 320,
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Accountant Dashboard
        </h1>
        <p className="text-gray-500 mt-1">Financial overview</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-r from-green-50 to-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Income</p>
              <p className="text-2xl font-bold text-green-600">
                ₹{stats.totalIncome}
              </p>
            </div>
            <div className="w-10 h-10 bg-green-200 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-gradient-to-r from-red-50 to-red-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Expense</p>
              <p className="text-2xl font-bold text-red-600">
                ₹{stats.totalExpense}
              </p>
            </div>
            <div className="w-10 h-10 bg-red-200 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-red-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-gradient-to-r from-blue-50 to-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Collected Fees</p>
              <p className="text-2xl font-bold text-blue-600">
                ₹{stats.collectedFees}
              </p>
            </div>
            <div className="w-10 h-10 bg-blue-200 rounded-lg flex items-center justify-center">
              <Receipt className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-gradient-to-r from-amber-50 to-amber-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Pending Fees</p>
              <p className="text-2xl font-bold text-amber-600">
                ₹{stats.pendingFees}
              </p>
            </div>
            <div className="w-10 h-10 bg-amber-200 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-amber-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Transactions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Income
          </h2>
          <div className="space-y-3">
            {[
              { head: "Tuition Fees", amount: 125000, date: "2024-04-01" },
              { head: "Admission Fees", amount: 50000, date: "2024-04-05" },
              { head: "Transport Fees", amount: 30000, date: "2024-04-10" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 border-b"
              >
                <div>
                  <p className="font-medium text-gray-800">{item.head}</p>
                  <p className="text-xs text-gray-500">{item.date}</p>
                </div>
                <p className="font-bold text-green-600">+₹{item.amount}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Expenses
          </h2>
          <div className="space-y-3">
            {[
              { head: "Staff Salary", amount: 250000, date: "2024-04-01" },
              { head: "Electricity Bill", amount: 35000, date: "2024-04-05" },
              { head: "Maintenance", amount: 15000, date: "2024-04-10" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 border-b"
              >
                <div>
                  <p className="font-medium text-gray-800">{item.head}</p>
                  <p className="text-xs text-gray-500">{item.date}</p>
                </div>
                <p className="font-bold text-red-600">-₹{item.amount}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Summary */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Financial Summary
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Net Profit/Loss:</span>
            <span className="font-bold text-green-600">
              ₹{stats.totalIncome - stats.totalExpense}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Collection Rate:</span>
            <span className="font-bold text-blue-600">
              {Math.round(
                (stats.collectedFees /
                  (stats.collectedFees + stats.pendingFees)) *
                  100,
              )}
              %
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-green-500 rounded-full h-2"
              style={{
                width: `${(stats.collectedFees / (stats.collectedFees + stats.pendingFees)) * 100}%`,
              }}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
