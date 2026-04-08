// src/pages/accounts/Expense.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CreditCard,
  Plus,
  Edit,
  Trash2,
  Eye,
  X,
  CheckCircle,
  AlertCircle,
  Search,
  DollarSign,
  Download,
  Printer,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function Expense() {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHead, setSelectedHead] = useState("all");

  // Mock Expense Heads
  const expenseHeads = [
    { id: 1, name: "Staff Salary" },
    { id: 2, name: "Electricity Bill" },
    { id: 3, name: "Water Bill" },
    { id: 4, name: "Maintenance" },
    { id: 5, name: "Stationery" },
    { id: 6, name: "Transport Fuel" },
  ];

  // Mock Expense Entries
  const [expenseEntries, setExpenseEntries] = useState([
    {
      id: 1,
      head: "Staff Salary",
      amount: 250000,
      date: "2024-04-01",
      voucherNo: "VCH001",
      paymentMode: "Bank Transfer",
      description: "Monthly staff salaries",
      status: "Verified",
    },
    {
      id: 2,
      head: "Electricity Bill",
      amount: 35000,
      date: "2024-04-05",
      voucherNo: "VCH002",
      paymentMode: "Bank Transfer",
      description: "April electricity bill",
      status: "Verified",
    },
    {
      id: 3,
      head: "Water Bill",
      amount: 5000,
      date: "2024-04-10",
      voucherNo: "VCH003",
      paymentMode: "Cash",
      description: "Monthly water charges",
      status: "Pending",
    },
    {
      id: 4,
      head: "Maintenance",
      amount: 15000,
      date: "2024-04-15",
      voucherNo: "VCH004",
      paymentMode: "Cash",
      description: "Building repair",
      status: "Verified",
    },
    {
      id: 5,
      head: "Stationery",
      amount: 8000,
      date: "2024-04-20",
      voucherNo: "VCH005",
      paymentMode: "Cash",
      description: "Office stationery",
      status: "Verified",
    },
  ]);

  const [newEntry, setNewEntry] = useState({
    head: "",
    amount: "",
    date: "",
    voucherNo: "",
    paymentMode: "Cash",
    description: "",
  });
  const [editEntry, setEditEntry] = useState(null);

  const filteredEntries = expenseEntries.filter((entry) => {
    const matchesSearch =
      entry.head.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.voucherNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesHead = selectedHead === "all" || entry.head === selectedHead;
    return matchesSearch && matchesHead;
  });

  const handleAddEntry = () => {
    if (!newEntry.head || !newEntry.amount) return;
    const newId = Math.max(...expenseEntries.map((e) => e.id), 0) + 1;
    setExpenseEntries([
      ...expenseEntries,
      {
        id: newId,
        head: newEntry.head,
        amount: parseInt(newEntry.amount),
        date: newEntry.date || new Date().toISOString().split("T")[0],
        voucherNo: newEntry.voucherNo || `VCH${String(newId).padStart(3, "0")}`,
        paymentMode: newEntry.paymentMode,
        description: newEntry.description,
        status: "Pending",
      },
    ]);
    setNewEntry({
      head: "",
      amount: "",
      date: "",
      voucherNo: "",
      paymentMode: "Cash",
      description: "",
    });
    setShowAddModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleEditEntry = () => {
    if (!editEntry.head || !editEntry.amount) return;
    setExpenseEntries(
      expenseEntries.map((entry) =>
        entry.id === editEntry.id ? editEntry : entry,
      ),
    );
    setShowEditModal(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDeleteEntry = () => {
    setExpenseEntries(
      expenseEntries.filter((entry) => entry.id !== showDeleteModal),
    );
    setShowDeleteModal(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const stats = {
    total: expenseEntries.length,
    totalAmount: expenseEntries.reduce((sum, e) => sum + e.amount, 0),
    verified: expenseEntries
      .filter((e) => e.status === "Verified")
      .reduce((sum, e) => sum + e.amount, 0),
    pending: expenseEntries
      .filter((e) => e.status === "Pending")
      .reduce((sum, e) => sum + e.amount, 0),
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Expense</h1>
          <p className="text-gray-500 mt-1">Manage all expense transactions</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigate("/accounts")}
            className="flex items-center gap-2"
          >
            <X className="w-4 h-4" /> Back
          </Button>
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Expense
          </Button>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-700 font-medium">
            Expense entry saved successfully!
          </span>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Transactions</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Expense</p>
              <p className="text-2xl font-bold">
                ₹{stats.totalAmount.toLocaleString()}
              </p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-red-600" />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Verified</p>
              <p className="text-2xl font-bold">
                ₹{stats.verified.toLocaleString()}
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
              <p className="text-gray-500 text-sm">Pending</p>
              <p className="text-2xl font-bold">
                ₹{stats.pending.toLocaleString()}
              </p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by head or voucher no..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <select
            value={selectedHead}
            onChange={(e) => setSelectedHead(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="all">All Heads</option>
            {expenseHeads.map((h) => (
              <option key={h.id} value={h.name}>
                {h.name}
              </option>
            ))}
          </select>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" /> Export
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Printer className="w-4 h-4" /> Print
          </Button>
        </div>
      </Card>

      {/* Expense Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  Voucher No
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  Date
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  Expense Head
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  Amount
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  Payment Mode
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
              {filteredEntries.map((entry) => (
                <tr
                  key={entry.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-4 py-3 font-mono text-sm">
                    {entry.voucherNo}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{entry.date}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {entry.head}
                  </td>
                  <td className="px-4 py-3 font-bold text-red-600">
                    ₹{entry.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <Badge className="bg-blue-100 text-blue-700">
                      {entry.paymentMode}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      className={
                        entry.status === "Verified"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }
                    >
                      {entry.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setShowEditModal(entry)}
                        className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setShowDeleteModal(entry.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredEntries.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800">
              No expense entries found
            </h3>
          </div>
        )}
      </Card>

      {/* Add Expense Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-xl w-full max-w-md mx-4 my-8 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add Expense</h2>
              <button onClick={() => setShowAddModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Expense Head *
                </label>
                <select
                  value={newEntry.head}
                  onChange={(e) =>
                    setNewEntry({ ...newEntry, head: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="">Select Head</option>
                  {expenseHeads.map((h) => (
                    <option key={h.id} value={h.name}>
                      {h.name}
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
                  value={newEntry.amount}
                  onChange={(e) =>
                    setNewEntry({ ...newEntry, amount: e.target.value })
                  }
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <Input
                  type="date"
                  value={newEntry.date}
                  onChange={(e) =>
                    setNewEntry({ ...newEntry, date: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Voucher No
                </label>
                <Input
                  value={newEntry.voucherNo}
                  onChange={(e) =>
                    setNewEntry({ ...newEntry, voucherNo: e.target.value })
                  }
                  placeholder="Auto-generated"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Payment Mode
                </label>
                <select
                  value={newEntry.paymentMode}
                  onChange={(e) =>
                    setNewEntry({ ...newEntry, paymentMode: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="Cash">Cash</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Cheque">Cheque</option>
                  <option value="Online">Online</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  rows="2"
                  value={newEntry.description}
                  onChange={(e) =>
                    setNewEntry({ ...newEntry, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Optional description..."
                />
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
                onClick={handleAddEntry}
                className="flex-1 bg-red-600 text-white"
              >
                Save Expense
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md mx-4 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Edit Expense</h2>
              <button onClick={() => setShowEditModal(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Expense Head
                </label>
                <select
                  value={editEntry.head}
                  onChange={(e) =>
                    setEditEntry({ ...editEntry, head: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  {expenseHeads.map((h) => (
                    <option key={h.id} value={h.name}>
                      {h.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Amount</label>
                <Input
                  type="number"
                  value={editEntry.amount}
                  onChange={(e) =>
                    setEditEntry({ ...editEntry, amount: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <Input
                  type="date"
                  value={editEntry.date}
                  onChange={(e) =>
                    setEditEntry({ ...editEntry, date: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Payment Mode
                </label>
                <select
                  value={editEntry.paymentMode}
                  onChange={(e) =>
                    setEditEntry({ ...editEntry, paymentMode: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="Cash">Cash</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Cheque">Cheque</option>
                  <option value="Online">Online</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={editEntry.status}
                  onChange={(e) =>
                    setEditEntry({ ...editEntry, status: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="Pending">Pending</option>
                  <option value="Verified">Verified</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowEditModal(null)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleEditEntry}
                className="flex-1 bg-blue-600 text-white"
              >
                Save Changes
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
            <h3 className="text-lg font-semibold mb-2">Delete Expense Entry</h3>
            <p className="text-gray-500 mb-6">
              Are you sure you want to delete this expense entry?
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteModal(null)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteEntry}
                className="bg-red-600 text-white"
              >
                Delete
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
            <p className="font-medium text-blue-800">About Expense</p>
            <p className="text-sm text-blue-700">
              Record all outgoing money like salaries, bills, maintenance. Each
              expense entry must be linked to an expense head. Verified entries
              cannot be edited.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
