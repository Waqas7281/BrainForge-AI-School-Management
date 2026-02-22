import { Card } from "../components/ui/card";
import {
  Users,
  GraduationCap,
  UserCheck,
  BookOpen,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const stats = [
  {
    label: "Total Students",
    value: "2,847",
    change: "+12.5%",
    trend: "up",
    icon: GraduationCap,
    color: "bg-primary-blue",
  },
  {
    label: "Total Teachers",
    value: "142",
    change: "+3.2%",
    trend: "up",
    icon: UserCheck,
    color: "bg-success-green",
  },
  {
    label: "Total Classes",
    value: "68",
    change: "+5.1%",
    trend: "up",
    icon: BookOpen,
    color: "bg-info-purple",
  },
  {
    label: "Active Users",
    value: "2,412",
    change: "-2.3%",
    trend: "down",
    icon: Users,
    color: "bg-teal",
  },
];

const attendanceData = [
  { month: "Jan", attendance: 92 },
  { month: "Feb", attendance: 88 },
  { month: "Mar", attendance: 95 },
  { month: "Apr", attendance: 91 },
  { month: "May", attendance: 93 },
  { month: "Jun", attendance: 89 },
];

const performanceData = [
  { month: "Jan", score: 78 },
  { month: "Feb", score: 82 },
  { month: "Mar", score: 79 },
  { month: "Apr", score: 85 },
  { month: "May", score: 88 },
  { month: "Jun", score: 92 },
];

const classDistribution = [
  { name: "Grade 1-4", value: 920, color: "#2563EB" },
  { name: "Grade 5-8", value: 1124, color: "#10B981" },
  { name: "Grade 9-12", value: 803, color: "#8B5CF6" },
];

const recentActivities = [
  {
    id: 1,
    action: "New student enrolled",
    student: "John Smith",
    time: "5 minutes ago",
  },
  {
    id: 2,
    action: "Assignment submitted",
    student: "Emma Wilson",
    time: "12 minutes ago",
  },
  {
    id: 3,
    action: "Fee payment received",
    student: "Michael Brown",
    time: "1 hour ago",
  },
  {
    id: 4,
    action: "Teacher marked attendance",
    student: "Class 10-A",
    time: "2 hours ago",
  },
  {
    id: 5,
    action: "New notice published",
    student: "Annual Day Event",
    time: "3 hours ago",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1>Dashboard Overview</h1>
        <p
          className="text-gray-500 mt-2"
          style={{ fontSize: "var(--text-body)" }}
        >
          Welcome back! Here's what's happening with your school today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;
          return (
            <Card key={stat.label} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p
                    className="text-gray-500"
                    style={{ fontSize: "var(--text-small)" }}
                  >
                    {stat.label}
                  </p>
                  <h3 className="mt-2">{stat.value}</h3>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendIcon
                      className={`w-4 h-4 ${
                        stat.trend === "up"
                          ? "text-success-green"
                          : "text-error-red"
                      }`}
                    />
                    <span
                      className={`${
                        stat.trend === "up"
                          ? "text-success-green"
                          : "text-error-red"
                      }`}
                      style={{ fontSize: "var(--text-small)" }}
                    >
                      {stat.change}
                    </span>
                    <span
                      className="text-gray-500"
                      style={{ fontSize: "var(--text-small)" }}
                    >
                      vs last month
                    </span>
                  </div>
                </div>
                <div
                  className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Chart */}
        <Card className="p-6">
          <h3 className="mb-4">Monthly Attendance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="month"
                stroke="#6B7280"
                style={{ fontSize: "12px" }}
              />
              <YAxis stroke="#6B7280" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #D1D5DB",
                  borderRadius: "8px",
                  fontSize: "14px",
                }}
              />
              <Bar dataKey="attendance" fill="#2563EB" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Performance Chart */}
        <Card className="p-6">
          <h3 className="mb-4">Average Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="month"
                stroke="#6B7280"
                style={{ fontSize: "12px" }}
              />
              <YAxis stroke="#6B7280" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #D1D5DB",
                  borderRadius: "8px",
                  fontSize: "14px",
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#10B981"
                strokeWidth={3}
                dot={{ fill: "#10B981", r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Class Distribution */}
        <Card className="p-6">
          <h3 className="mb-4">Class Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={classDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {classDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #D1D5DB",
                  borderRadius: "8px",
                  fontSize: "14px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {classDistribution.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span
                    className="text-gray-700"
                    style={{ fontSize: "var(--text-body)" }}
                  >
                    {item.name}
                  </span>
                </div>
                <span
                  className="text-gray-900 font-medium"
                  style={{ fontSize: "var(--text-body)" }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activities */}
        <Card className="p-6 lg:col-span-2">
          <h3 className="mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 pb-4 border-b border-gray-200 last:border-0"
              >
                <div className="w-2 h-2 rounded-full bg-primary-blue mt-2"></div>
                <div className="flex-1">
                  <p
                    className="text-gray-900"
                    style={{ fontSize: "var(--text-body)" }}
                  >
                    {activity.action}
                  </p>
                  <p
                    className="text-gray-500 mt-1"
                    style={{ fontSize: "var(--text-small)" }}
                  >
                    {activity.student}
                  </p>
                </div>
                <span
                  className="text-gray-500"
                  style={{ fontSize: "var(--text-small)" }}
                >
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
