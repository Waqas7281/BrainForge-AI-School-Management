// src/pages/parent/ParentDashboard.jsx

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card } from "../../components/ui/card";
import { useGetChildDataQuery } from "../../store/api/parentApi";
import {
  User,
  Calendar,
  DollarSign,
  Award,
  TrendingUp,
  Bell,
  Eye,
  Loader2,
} from "lucide-react";

export default function ParentDashboard() {
  // Dummy data (no backend needed)
  const child = {
    name: "Ahmed Khan",
    class: "Class 1-A",
    rollNo: "001",
    fatherName: "Khan Ahmed",
    motherName: "Fatima Khan",
  };

  const stats = {
    attendance: 95,
    feesPaid: 15000,
    feesTotal: 20000,
    marks: 88,
    rank: 3,
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Parent Dashboard
        </h1>
        <p className="text-gray-500">Track your child's progress</p>
      </div>

      <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {child.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                {child.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {child.class} | Roll No: {child.rollNo}
              </p>
              <p className="text-sm text-gray-500">
                Father: {child.fatherName} | Mother: {child.motherName}
              </p>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex justify-between">
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
          <div className="flex justify-between">
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
          <div className="flex justify-between">
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
          <div className="flex justify-between">
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
    </div>
  );
}
