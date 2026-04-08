// src/pages/fees/FeesMaster.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Database,
  Plus,
  Edit,
  Trash2,
  X,
  CheckCircle,
  AlertCircle,
  Search,
  DollarSign,
  BookOpen,
  Users,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function FeesMaster() {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");

  // Mock Classes
  const classes = [
    "Nursery",
    "LKG",
    "UKG",
    "Class 1",
    "Class 2",
    "Class 3",
    "Class 4",
    "Class 5",
  ];

  // Mock Fees Types
  const feesTypes = [
    { id: 1, name: "Monthly Tuition", group: "Tuition Fees", amount: 5000 },
    { id: 2, name: "Bus Transport", group: "Transport Fees", amount: 2000 },
    { id: 3, name: "Library Membership", group: "Library Fees", amount: 1000 },
    { id: 4, name: "Half Yearly Exam", group: "Exam Fees", amount: 2500 },
  ];

  // Mock Fees Master Data
  const [feesMaster, setFeesMaster] = useState([
    {
      id: 1,
      className: "Class 1",
      feeType: "Monthly Tuition",
      amount: 5000,
      academicYear: "2024-25",
      status: "Active",
    },
    {
      id: 2,
      className: "Class 1",
      feeType: "Bus Transport",
      amount: 2000,
      academicYear: "2024-25",
      status: "Active",
    },
    {
      id: 3,
      className: "Class 1",
      feeType: "Library Membership",
      amount: 1000,
      academicYear: "2024-25",
      status: "Active",
    },
    {
      id: 4,
      className: "Class 2",
      feeType: "Monthly Tuition",
      amount: 5500,
      academicYear: "2024-25",
      status: "Active",
    },
    {
      id: 5,
      className: "Class 2",
      feeType: "Bus Transport",
      amount: 2000,
      academicYear: "2024-25",
      status: "Active",
    },
    {
      id: 6,
      className: "Class 3",
      feeType: "Monthly Tuition",
      amount: 6000,
      academicYear: "2024-25",
      status: "Inactive",
    },
  ]);

  const [newFee, setNewFee] = useState({
    className: "",
    feeType: "",
    amount: "",
    academicYear: "2024-25",
  });

  const filteredFees = feesMaster.filter((fee) => {
    const matchesSearch =
      fee.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fee.feeType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass =
      selectedClass === "all" || fee.className === selectedClass;
    return matchesSearch && matchesClass;
  });

  const handleAddFee = () => {
    if (!newFee.className || !newFee.feeType || !newFee.amount) return;
    const newId = Math.max(...feesMaster.map((f) => f.id), 0) + 1;
    setFeesMaster([
      ...feesMaster,
      {
        id: newId,
        className: newFee.className,
        feeType: newFee.feeType,
        amount: parseInt(newFee.amount),
        academicYear: newFee.academicYear,
        status: "Active",
      },
    ]);
    setNewFee({
      className: "",
      feeType: "",
      amount: "",
      academicYear: "2024-25",
    });
    setShowAddModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDeleteFee = () => {
    setFeesMaster(feesMaster.filter((fee) => fee.id !== showDeleteModal));
    setShowDeleteModal(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const getTotalByClass = (className) => {
    return feesMaster
      .filter((f) => f.className === className && f.status === "Active")
      .reduce((sum, f) => sum + f.amount, 0);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Fees Master</h1>
          <p className="text-gray-500 mt-1">Assign fees to classes</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigate("/fees")}
            className="flex items-center gap-2"
          >
            <X className="w-4 h-4" /> Back
          </Button>
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Assign Fee
          </Button>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-700 font-medium">
            Fee assigned successfully!
          </span>
        </div>
      )}

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by class or fee type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="all">All Classes</option>
            {classes.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Fees Master Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  Class
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  Fee Type
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  Amount
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  Academic Year
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
              {filteredFees.map((fee) => (
                <tr
                  key={fee.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {fee.className}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{fee.feeType}</td>
                  <td className="px-4 py-3 font-bold text-green-600">
                    ₹{fee.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {fee.academicYear}
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      className={
                        fee.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }
                    >
                      {fee.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setShowDeleteModal(fee.id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Class-wise Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {classes.map((cls) => {
          const total = getTotalByClass(cls);
          if (total === 0) return null;
          return (
            <Card key={cls} className="p-3 text-center">
              <p className="text-gray-500 text-sm">{cls}</p>
              <p className="text-xl font-bold text-blue-600">
                ₹{total.toLocaleString()}
              </p>
              <p className="text-xs text-gray-400">Total Fees</p>
            </Card>
          );
        })}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md mx-4 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Assign Fee to Class</h2>
              <button onClick={() => setShowAddModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Class *
                </label>
                <select
                  value={newFee.className}
                  onChange={(e) =>
                    setNewFee({ ...newFee, className: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="">Select Class</option>
                  {classes.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Fee Type *
                </label>
                <select
                  value={newFee.feeType}
                  onChange={(e) =>
                    setNewFee({ ...newFee, feeType: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="">Select Fee Type</option>
                  {feesTypes.map((t) => (
                    <option key={t.id} value={t.name}>
                      {t.name} (₹{t.amount})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Amount *
                </label>
                <Input
                  type="number"
                  value={newFee.amount}
                  onChange={(e) =>
                    setNewFee({ ...newFee, amount: e.target.value })
                  }
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Academic Year
                </label>
                <select
                  value={newFee.academicYear}
                  onChange={(e) =>
                    setNewFee({ ...newFee, academicYear: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="2023-24">2023-24</option>
                  <option value="2024-25">2024-25</option>
                  <option value="2025-26">2025-26</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowAddModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddFee}
                className="flex-1 bg-blue-600 text-white"
              >
                Assign Fee
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Remove Fee Assignment
            </h3>
            <p className="text-gray-500 mb-6">
              Are you sure you want to remove this fee assignment?
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteModal(null)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteFee}
                className="bg-red-600 text-white"
              >
                Remove
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Info Box */}
      <Card className="mt-6 p-4 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-medium text-blue-800">About Fees Master</p>
            <p className="text-sm text-blue-700">
              Fees Master is where you assign fee types to specific classes.
              Each class can have multiple fee types.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
