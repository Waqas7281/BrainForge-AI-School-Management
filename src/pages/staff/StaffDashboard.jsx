// src/pages/staff/StaffDashboard.jsx

import { useState } from "react";
import { Card } from "../../components/ui/card";
import {
  Briefcase,
  Calendar,
  Clock,
  CheckCircle,
  DollarSign,
  Users,
} from "lucide-react";

export default function StaffDashboard() {
  const [stats] = useState({
    attendance: 95,
    pendingLeaves: 2,
    tasksCompleted: 12,
    salary: 35000,
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Staff Dashboard</h1>
        <p className="text-gray-500 mt-1">Manage your daily activities</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Attendance</p>
              <p className="text-2xl font-bold text-green-600">
                {stats.attendance}%
              </p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Pending Leaves</p>
              <p className="text-2xl font-bold text-amber-600">
                {stats.pendingLeaves}
              </p>
            </div>
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-amber-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Tasks Completed</p>
              <p className="text-2xl font-bold text-blue-600">
                {stats.tasksCompleted}
              </p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Monthly Salary</p>
              <p className="text-2xl font-bold text-purple-600">
                ₹{stats.salary}
              </p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Today's Tasks */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Today's Tasks
        </h2>
        <div className="space-y-3">
          {[
            {
              task: "Submit monthly report",
              status: "Pending",
              time: "05:00 PM",
            },
            { task: "Staff meeting", status: "Completed", time: "10:00 AM" },
            {
              task: "Update inventory",
              status: "In Progress",
              time: "02:00 PM",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-800">{item.task}</p>
                <p className="text-sm text-gray-500">Due: {item.time}</p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : item.status === "Pending"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Activities */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Activities
        </h2>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Inventory updated - Stationery stock added</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="w-4 h-4 text-blue-500" />
            <span>Staff meeting scheduled for tomorrow</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Briefcase className="w-4 h-4 text-purple-500" />
            <span>Monthly report submitted to admin</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
