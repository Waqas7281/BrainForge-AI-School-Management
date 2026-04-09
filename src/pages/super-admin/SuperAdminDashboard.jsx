// src/pages/super-admin/SuperAdminDashboard.jsx

import { useState } from "react";
import { Card } from "../../components/ui/card";
import {
  Building2,
  DollarSign,
  Users,
  Activity,
  TrendingUp,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function SuperAdminDashboard() {
  const [stats] = useState({
    totalSchools: 25,
    activeSchools: 22,
    totalRevenue: 1250000,
    activeSubscriptions: 22,
    expiredSubscriptions: 3,
    totalUsers: 1250,
  });

  const [recentSchools] = useState([
    {
      id: 1,
      name: "BrainForge School",
      status: "Active",
      subscription: "Premium",
      expiry: "2025-12-31",
    },
    {
      id: 2,
      name: "Sunrise Academy",
      status: "Active",
      subscription: "Standard",
      expiry: "2025-06-30",
    },
    {
      id: 3,
      name: "Elite Public School",
      status: "Expired",
      subscription: "Basic",
      expiry: "2024-12-31",
    },
    {
      id: 4,
      name: "Smart Kids School",
      status: "Active",
      subscription: "Premium",
      expiry: "2025-11-30",
    },
  ]);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Super Admin Dashboard
        </h1>
        <p className="text-gray-500 mt-1">Platform Overview & Management</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Schools</p>
              <p className="text-2xl font-bold">{stats.totalSchools}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Schools</p>
              <p className="text-2xl font-bold text-green-600">
                {stats.activeSchools}
              </p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold text-purple-600">
                ₹{stats.totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Users</p>
              <p className="text-2xl font-bold">{stats.totalUsers}</p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Schools
          </h2>
          <div className="space-y-3">
            {recentSchools.map((school) => (
              <div
                key={school.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium">{school.name}</p>
                  <p className="text-xs text-gray-500">
                    Expires: {school.expiry}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${school.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                  >
                    {school.status}
                  </span>
                  <span className="text-xs text-gray-500">
                    {school.subscription}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Platform Activity
          </h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Activity className="w-4 h-4 text-green-500" />
              <span className="text-sm">
                5 new schools registered this month
              </span>
            </div>
            <div className="flex items-center gap-3">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              <span className="text-sm">Revenue increased by 15%</span>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-4 h-4 text-purple-500" />
              <span className="text-sm">
                1200+ active users across platform
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
