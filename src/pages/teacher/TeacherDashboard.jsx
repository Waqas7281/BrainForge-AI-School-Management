// src/pages/teacher/TeacherDashboard.jsx

import { useState } from "react";
import { Card } from "../../components/ui/card";
import {
  Users,
  BookOpen,
  Calendar,
  Clock,
  CheckCircle,
  TrendingUp,
} from "lucide-react";

export default function TeacherDashboard() {
  const [stats] = useState({
    totalStudents: 45,
    totalClasses: 3,
    todayClasses: 4,
    pendingAssignments: 8,
    attendanceRate: 92,
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Teacher Dashboard</h1>
        <p className="text-gray-500">
          Welcome back! Here's your teaching summary
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">My Students</p>
              <p className="text-2xl font-bold">{stats.totalStudents}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">My Classes</p>
              <p className="text-2xl font-bold">{stats.totalClasses}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Today's Classes</p>
              <p className="text-2xl font-bold">{stats.todayClasses}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Attendance Rate</p>
              <p className="text-2xl font-bold text-green-600">
                {stats.attendanceRate}%
              </p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Today's Schedule</h2>
        <div className="space-y-3">
          {[
            {
              subject: "Mathematics",
              class: "Class 1-A",
              time: "09:00 AM",
              room: "101",
            },
            {
              subject: "Science",
              class: "Class 2-B",
              time: "10:00 AM",
              room: "103",
            },
            {
              subject: "English",
              class: "Class 1-A",
              time: "11:00 AM",
              room: "102",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium">{item.subject}</p>
                <p className="text-sm text-gray-500">
                  {item.class} | Room: {item.room}
                </p>
              </div>
              <p className="text-sm">{item.time}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card className="p-6">
          <h2 className="font-semibold mb-3">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-2">
            <button className="p-2 bg-blue-50 rounded text-blue-600 text-sm">
              Mark Attendance
            </button>
            <button className="p-2 bg-green-50 rounded text-green-600 text-sm">
              Enter Marks
            </button>
          </div>
        </Card>
        <Card className="p-6">
          <h2 className="font-semibold mb-3">Recent Activities</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-3 h-3 text-green-500" /> Assignment
              submitted by Alice
            </div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-3 h-3 text-blue-500" /> Class 1-A
              attendance: 95%
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
