import { Card } from "../components/ui/card";
import { useState } from "react";
import {
  Users,
  Briefcase,
  DollarSign,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const stats = [
  {
    label: "Total Students",
    value: "0",
    thisMonth: "0",
    color: "bg-gradient-to-br from-purple-500 to-purple-600",
    icon: Users,
  },
  {
    label: "Total Employees",
    value: "0",
    thisMonth: "0",
    color: "bg-gradient-to-br from-purple-300 to-purple-400",
    icon: Briefcase,
  },
  {
    label: "Revenue",
    value: "$0",
    thisMonth: "$0",
    color: "bg-gradient-to-br from-pink-400 to-pink-500",
    icon: DollarSign,
  },
  {
    label: "Total Profit",
    value: "$0",
    thisMonth: "$0",
    color: "bg-gradient-to-br from-blue-400 to-blue-500",
    icon: DollarSign,
  },
];

const statisticsData = [
  { month: "Sep 2025", expenses: 0, income: 0 },
  { month: "Oct 2025", expenses: 0, income: 0 },
  { month: "Nov 2025", expenses: 0, income: 0 },
  { month: "Dec 2025", expenses: 0, income: 0 },
  { month: "Jan 2026", expenses: 0, income: 0 },
  { month: "Feb 2026", expenses: 0, income: 0 },
];

const studentsData = [
  { label: "0.1", value: 0 },
  { label: "0.2", value: 0 },
  { label: "0.3", value: 0 },
  { label: "0.4", value: 0 },
  { label: "0.5", value: 0 },
  { label: "0.6", value: 0 },
  { label: "0.7", value: 0 },
  { label: "0.8", value: 0 },
  { label: "0.9", value: 0 },
  { label: "1.0", value: 0 },
];

// Real Calendar Component
function RealCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthNames = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];

  const dayNames = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

  // Get current month/year
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const today = new Date();

  // Get first day of month and number of days
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  // Build calendar grid
  const calendarDays = [];

  // Previous month days
  for (let i = firstDay - 1; i >= 0; i--) {
    calendarDays.push({
      day: daysInPrevMonth - i,
      isCurrentMonth: false,
      isToday: false,
    });
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday =
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear();

    calendarDays.push({
      day: day,
      isCurrentMonth: true,
      isToday: isToday,
    });
  }

  // Next month days to fill grid
  const remainingDays = 42 - calendarDays.length; // 6 rows * 7 days
  for (let day = 1; day <= remainingDays; day++) {
    calendarDays.push({
      day: day,
      isCurrentMonth: false,
      isToday: false,
    });
  }

  const goToPrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Format current date display
  const currentDateDisplay = new Date(year, month, today.getDate());
  const formattedDate = currentDateDisplay
    .toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "2-digit",
      year: "numeric",
    })
    .toUpperCase();

  return (
    <Card>
      <div className="p-4">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={goToPrevMonth}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="text-center">
            <h3 className="font-bold text-purple-500 text-lg">
              {monthNames[month]}
            </h3>
            <p className="text-sm text-gray-500">{year}</p>
            <p className="text-xs text-gray-400 mt-0.5">{formattedDate}</p>
          </div>
          <button
            onClick={goToNextMonth}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Today Button */}
        <button
          onClick={goToToday}
          className="w-full mb-3 px-3 py-1.5 text-xs font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
        >
          Go to Today
        </button>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Day Names */}
          {dayNames.map((day) => (
            <div
              key={day}
              className="text-center text-xs font-semibold text-gray-500 py-2"
            >
              {day}
            </div>
          ))}

          {/* Calendar Days */}
          {calendarDays.map((dayInfo, index) => (
            <div
              key={index}
              className={`
                aspect-square flex items-center justify-center text-sm rounded-lg cursor-pointer transition-colors
                ${!dayInfo.isCurrentMonth ? "text-gray-300" : "text-gray-700"}
                ${
                  dayInfo.isToday
                    ? "bg-purple-500 text-white font-bold shadow-md"
                    : dayInfo.isCurrentMonth
                      ? "hover:bg-purple-50"
                      : ""
                }
              `}
            >
              {dayInfo.day}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-gray-500">
          <div className="w-3 h-3 bg-purple-500 rounded"></div>
          <span>Today</span>
        </div>
      </div>
    </Card>
  );
}

export default function Dashboard() {
  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Alert Banner */}
      <div className="bg-pink-50 border border-pink-200 rounded-xl p-4 flex items-center gap-4">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
            <span className="text-3xl">👩‍💼</span>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">
            Welcome to Admin Dashboard
          </h3>
          <p className="text-sm text-gray-600">
            Your Account is not Verified yet! Please Verify your email address.{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Verify now
            </a>
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-4 lg:space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={stat.label}
                  className={`${stat.color} text-white border-0 shadow-lg`}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-white/90 text-sm mb-2">
                          {stat.label}
                        </p>
                        <Icon className="w-8 h-8 text-white/80" />
                      </div>
                      <div className="text-right">
                        <div className="text-4xl font-bold">{stat.value}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/80">This Month</span>
                      <span className="font-medium">{stat.thisMonth}</span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Statistics Chart */}
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Statistics
                </h3>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <div className="mb-4 flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-pink-400 rounded"></div>
                  <span className="text-gray-600">Expenses</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-400 rounded"></div>
                  <span className="text-gray-600">Income</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={statisticsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis
                    dataKey="month"
                    stroke="#9CA3AF"
                    style={{ fontSize: "12px" }}
                  />
                  <YAxis stroke="#9CA3AF" style={{ fontSize: "12px" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="expenses"
                    stroke="#F472B6"
                    strokeWidth={2}
                    dot={{ fill: "#F472B6", r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="#60A5FA"
                    strokeWidth={2}
                    dot={{ fill: "#60A5FA", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Students Statistics */}
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Statistics
                </h3>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <div className="mb-4 flex items-center gap-2 text-sm">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className="text-gray-600">Students</span>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={studentsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis
                    dataKey="label"
                    stroke="#9CA3AF"
                    style={{ fontSize: "12px" }}
                  />
                  <YAxis stroke="#9CA3AF" style={{ fontSize: "12px" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Today Absent Students */}
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-pink-400">
                  Today Absent Students
                </h3>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-3xl">😔</span>
                </div>
                <p className="text-pink-400 text-sm">
                  Attendance Not Marked Yet !
                </p>
              </div>
            </div>
          </Card>

          {/* Today Present Employees */}
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-blue-500">
                  Today Present Employees
                </h3>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-3xl">😔</span>
                </div>
                <p className="text-blue-500 text-sm">
                  Attendance Not Marked Yet !
                </p>
              </div>
            </div>
          </Card>

          {/* New Admissions */}
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-blue-500">
                  New Admissions
                </h3>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-3xl">📋</span>
                </div>
                <p className="text-gray-500 text-sm">
                  No New Admissions This Month
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Sidebar - 1/3 width */}
        <div className="space-y-4 lg:space-y-6">
          {/* Estimated Fee */}
          <Card>
            <div className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">👩‍💼</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Estimated Fee This Month
                  </h3>
                  <div className="flex items-center gap-1 text-pink-400 text-sm mb-2">
                    <span>🎯</span>
                    <span>Estimation</span>
                  </div>
                  <div className="text-3xl font-bold text-pink-400">$ 0</div>
                </div>
              </div>
              <div className="space-y-3 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">$ 0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-500 text-sm flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    Collections
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-900 font-semibold">$ 0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-red-500 text-sm flex items-center gap-1">
                    <span>⬇</span>
                    Remainings
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Free SMS Gateway */}
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-lg mb-1">Free SMS Gateway</h3>
                  <p className="text-white/80 text-sm">
                    Send Unlimited Free SMS on Mobile Numbers.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <span className="text-4xl">🎁</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Stats Cards */}
          <div className="space-y-3">
            <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">
                    Today Present Students
                  </span>
                  <span className="text-2xl font-bold text-blue-600">0%</span>
                </div>
              </div>
            </Card>
            <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">
                    Today Absent Students
                  </span>
                  <span className="text-2xl font-bold text-red-600">0%</span>
                </div>
              </div>
            </Card>
            <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">
                    This Month Fee Collection
                  </span>
                  <span className="text-2xl font-bold text-green-600">0%</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Desktop Version Promo */}
          <Card className="bg-gradient-to-br from-pink-400 to-pink-500 text-white border-0 overflow-hidden relative">
            <div className="p-6">
              <h3 className="font-bold text-lg mb-2">Desktop Version</h3>
              <p className="text-white/90 text-sm mb-4">
                Download & install eskool on your PC
              </p>
              <div className="flex gap-2">
                <button className="bg-white/20 hover:bg-white/30 px-3 py-2 rounded text-xs flex items-center gap-2">
                  <span>🪟</span>
                  Download for Windows
                </button>
                <button className="bg-white/20 hover:bg-white/30 px-3 py-2 rounded text-xs flex items-center gap-2">
                  <span>🍎</span>
                  Download for MacOS
                </button>
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4">
              <span className="text-8xl opacity-20">💻</span>
            </div>
          </Card>

          {/* REAL CALENDAR - WORKING! */}
          <RealCalendar />
        </div>
      </div>
    </div>
  );
}
