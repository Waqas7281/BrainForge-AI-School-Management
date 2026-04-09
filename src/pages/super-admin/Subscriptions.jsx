// src/pages/super-admin/Subscriptions.jsx

import { useState } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Search,
  DollarSign,
  Calendar,
  CheckCircle,
  XCircle,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";

export default function Subscriptions() {
  const [searchTerm, setSearchTerm] = useState("");

  const [plans] = useState([
    {
      id: 1,
      name: "Basic",
      price: 4999,
      duration: "Monthly",
      features: ["Up to 500 students", "Basic Reports", "Email Support"],
      students: 500,
      popular: false,
    },
    {
      id: 2,
      name: "Standard",
      price: 9999,
      duration: "Monthly",
      features: [
        "Up to 2000 students",
        "Advanced Reports",
        "Priority Support",
        "WhatsApp Integration",
      ],
      students: 2000,
      popular: true,
    },
    {
      id: 3,
      name: "Premium",
      price: 19999,
      duration: "Monthly",
      features: [
        "Unlimited students",
        "All Features",
        "24/7 Support",
        "Custom Development",
      ],
      students: "Unlimited",
      popular: false,
    },
    {
      id: 4,
      name: "Enterprise",
      price: 49999,
      duration: "Yearly",
      features: [
        "Custom Solutions",
        "Dedicated Support",
        "API Access",
        "White Label",
      ],
      students: "Unlimited",
      popular: false,
    },
  ]);

  const [subscriptions] = useState([
    {
      id: 1,
      school: "BrainForge School",
      plan: "Premium",
      startDate: "2024-01-01",
      expiry: "2025-12-31",
      status: "Active",
      amount: 19999,
      paid: true,
    },
    {
      id: 2,
      school: "Sunrise Academy",
      plan: "Standard",
      startDate: "2024-01-15",
      expiry: "2025-06-30",
      status: "Active",
      amount: 9999,
      paid: true,
    },
    {
      id: 3,
      school: "Elite Public School",
      plan: "Basic",
      startDate: "2024-01-10",
      expiry: "2024-12-31",
      status: "Expired",
      amount: 4999,
      paid: false,
    },
    {
      id: 4,
      school: "Smart Kids School",
      plan: "Premium",
      startDate: "2024-03-01",
      expiry: "2025-02-28",
      status: "Active",
      amount: 19999,
      paid: true,
    },
  ]);

  const filteredSubscriptions = subscriptions.filter(
    (sub) =>
      sub.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.plan.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalRevenue = subscriptions
    .filter((s) => s.paid)
    .reduce((sum, s) => sum + s.amount, 0);
  const activeSubscriptions = subscriptions.filter(
    (s) => s.status === "Active",
  ).length;
  const expiringSoon = subscriptions.filter((s) => {
    const expiryDate = new Date(s.expiry);
    const today = new Date();
    const daysLeft = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
    return daysLeft <= 30 && daysLeft > 0;
  }).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Subscriptions</h1>
          <p className="text-gray-500 mt-1">
            Manage school subscriptions and plans
          </p>
        </div>
        <Button className="bg-blue-600 text-white">
          <Plus className="w-4 h-4 mr-2" /> Create Plan
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold text-green-600">
                ₹{totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Subscriptions</p>
              <p className="text-2xl font-bold text-blue-600">
                {activeSubscriptions}
              </p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Expiring Soon</p>
              <p className="text-2xl font-bold text-orange-600">
                {expiringSoon}
              </p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Plans</p>
              <p className="text-2xl font-bold text-purple-600">
                {plans.length}
              </p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Pricing Plans */}
      <h2 className="text-xl font-semibold text-gray-800 mt-4">
        Pricing Plans
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`p-6 ${plan.popular ? "border-2 border-blue-500 shadow-lg relative" : ""}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                Most Popular
              </div>
            )}
            <h3 className="text-xl font-bold text-gray-800">{plan.name}</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              ₹{plan.price}
              <span className="text-sm text-gray-500">/{plan.duration}</span>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Up to {plan.students} students
            </p>
            <ul className="mt-4 space-y-2">
              {plan.features.map((f, i) => (
                <li
                  key={i}
                  className="text-sm text-gray-600 flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4 text-green-500" /> {f}
                </li>
              ))}
            </ul>
            <Button className="w-full mt-6 bg-blue-600 text-white">
              Select Plan
            </Button>
          </Card>
        ))}
      </div>

      {/* Search */}
      <Card className="p-4 mt-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search subscriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </Card>

      {/* Subscriptions Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  School Name
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  Plan
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  Start Date
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  Expiry Date
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  Amount
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  Status
                </th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredSubscriptions.map((sub) => (
                <tr key={sub.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {sub.school}
                  </td>
                  <td className="px-4 py-3">{sub.plan}</td>
                  <td className="px-4 py-3 text-gray-600">{sub.startDate}</td>
                  <td className="px-4 py-3 text-gray-600">{sub.expiry}</td>
                  <td className="px-4 py-3 font-semibold text-green-600">
                    ₹{sub.amount}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${sub.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                    >
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex gap-2 justify-end">
                      <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Info Box */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <DollarSign className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-medium text-blue-800">About Subscriptions</p>
            <p className="text-sm text-blue-700">
              Manage school subscriptions, pricing plans, and payment tracking.
              Schools with expired subscriptions will have limited access.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
