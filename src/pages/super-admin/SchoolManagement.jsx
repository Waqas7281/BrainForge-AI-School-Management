// src/pages/super-admin/SchoolManagement.jsx

import { useState } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react";

export default function SchoolManagement() {
  const [searchTerm, setSearchTerm] = useState("");

  const [schools] = useState([
    {
      id: 1,
      name: "BrainForge School",
      email: "admin@brainforge.edu",
      phone: "+1 234 567 8900",
      status: "Active",
      subscription: "Premium",
      users: 45,
    },
    {
      id: 2,
      name: "Sunrise Academy",
      email: "admin@sunrise.edu",
      phone: "+1 234 567 8901",
      status: "Active",
      subscription: "Standard",
      users: 32,
    },
    {
      id: 3,
      name: "Elite Public School",
      email: "admin@elite.edu",
      phone: "+1 234 567 8902",
      status: "Blocked",
      subscription: "Basic",
      users: 28,
    },
  ]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            School Management
          </h1>
          <p className="text-gray-500">Manage all schools on the platform</p>
        </div>
        <Button className="bg-blue-600 text-white">
          <Plus className="w-4 h-4 mr-2" /> Add School
        </Button>
      </div>

      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search schools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left px-4 py-3">School Name</th>
                <th className="text-left px-4 py-3">Email</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3">Subscription</th>
                <th className="text-left px-4 py-3">Users</th>
                <th className="text-right px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {schools.map((school) => (
                <tr key={school.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{school.name}</td>
                  <td className="px-4 py-3">{school.email}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${school.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                    >
                      {school.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{school.subscription}</td>
                  <td className="px-4 py-3">{school.users}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex gap-2 justify-end">
                      <button className="p-1 text-blue-600">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-amber-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-red-600">
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
    </div>
  );
}
