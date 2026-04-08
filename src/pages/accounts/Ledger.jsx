// src/pages/accounts/Ledger.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Search,
  Download,
  Printer,
  X,
  TrendingUp,
  CreditCard,
  DollarSign,
  Calendar,
  Filter,
  Eye,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function Ledger() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Mock Ledger Data (Combined Income + Expense)
  const [ledgerEntries, setLedgerEntries] = useState([
    { id: 1, date: "2024-04-01", type: "Income", head: "Tuition Fees", amount: 125000, voucherNo: "RCP001", paymentMode: "Cash", description: "Monthly tuition fees collection", status: "Verified" },
    { id: 2, date: "2024-04-01", type: "Expense", head: "Staff Salary", amount: 250000, voucherNo: "VCH001", paymentMode: "Bank Transfer", description: "Monthly staff salaries", status: "Verified" },
    { id: 3, date: "2024-04-05", type: "Income", head: "Admission Fees", amount: 50000, voucherNo: "RCP002", paymentMode: "Bank Transfer", description: "New student admissions", status: "Verified" },
    { id: 4, date: "2024-04-05", type: "Expense", head: "Electricity Bill", amount: 35000, voucherNo: "VCH002", paymentMode: "Bank Transfer", description: "April electricity bill", status: "Verified" },
    { id: 5, date: "2024-04-10", type: "Income", head: "Exam Fees", amount: 25000, voucherNo: "RCP003", paymentMode: "Cash", description: "Half yearly exam fees", status: "Pending" },
    { id: 6, date: "2024-04-10", type: "Expense", head: "Water Bill", amount: 5000, voucherNo: "VCH003", paymentMode: "Cash", description: "Monthly water charges", status: "Pending" },
    { id: 7, date: "2024-04-15", type: "Income", head: "Transport Fees", amount: 30000, voucherNo: "RCP004", paymentMode: "Bank Transfer", description: "Monthly bus fees", status: "Verified" },
    { id: 8, date: "2024-04-15", type: "Expense", head: "Maintenance", amount: 15000, voucherNo: "VCH004", paymentMode: "Cash", description: "Building repair", status: "Verified" },
    { id: 9, date: "2024-04-20", type: "Income", head: "Library Fees", amount: 10000, voucherNo: "RCP005", paymentMode: "Cash", description: "Annual library fees", status: "Verified" },
    { id: 10, date: "2024-04-20", type: "Expense", head: "Stationery", amount: 8000, voucherNo: "VCH005", paymentMode: "Cash", description: "Office stationery", status: "Verified" },
  ]);

  // Calculate totals
  const totalIncome = ledgerEntries.filter(e => e.type === "Income").reduce((sum, e) => sum + e.amount, 0);
  const totalExpense = ledgerEntries.filter(e => e.type === "Expense").reduce((sum, e) => sum + e.amount, 0);
  const balance = totalIncome - totalExpense;

  // Filter entries
  const filteredEntries = ledgerEntries.filter(entry => {
    const matchesSearch = entry.head.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.voucherNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || entry.type === selectedType;
    const matchesStartDate = !startDate || entry.date >= startDate;
    const matchesEndDate = !endDate || entry.date <= endDate;
    return matchesSearch && matchesType && matchesStartDate && matchesEndDate;
  });

  // Sort by date (newest first)
  const sortedEntries = [...filteredEntries].sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleViewDetails = (entry) => {
    setSelectedEntry(entry);
    setShowDetailsModal(true);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">General Ledger</h1>
          <p className="text-gray-500 mt-1">Complete record of all financial transactions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate("/accounts")} className="flex items-center gap-2"><X className="w-4 h-4" /> Back</Button>
          <Button variant="outline" className="flex items-center gap-2"><Download className="w-4 h-4" /> Export</Button>
          <Button variant="outline" className="flex items-center gap-2"><Printer className="w-4 h-4" /> Print</Button>
        </div>
      </div>

      {/* Balance Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card className="p-4 bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <div className="flex justify-between items-center">
            <div><p className="text-gray-600 text-sm">Total Income</p><p className="text-2xl font-bold text-green-600">₹{totalIncome.toLocaleString()}</p></div>
            <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center"><TrendingUp className="w-6 h-6 text-green-600" /></div>
          </div>
        </Card>
        <Card className="p-4 bg-gradient-to-r from-red-50 to-red-100 border-red-200">
          <div className="flex justify-between items-center">
            <div><p className="text-gray-600 text-sm">Total Expense</p><p className="text-2xl font-bold text-red-600">₹{totalExpense.toLocaleString()}</p></div>
            <div className="w-12 h-12 bg-red-200 rounded-full flex items-center justify-center"><CreditCard className="w-6 h-6 text-red-600" /></div>
          </div>
        </Card>
        <Card className={`p-4 bg-gradient-to-r ${balance >= 0 ? 'from-blue-50 to-blue-100 border-blue-200' : 'from-orange-50 to-orange-100 border-orange-200'}`}>
          <div className="flex justify-between items-center">
            <div><p className="text-gray-600 text-sm">Net Balance</p><p className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>₹{balance.toLocaleString()}</p></div>
            <div className={`w-12 h-12 ${balance >= 0 ? 'bg-blue-200' : 'bg-orange-200'} rounded-full flex items-center justify-center`}><DollarSign className={`w-6 h-6 ${balance >= 0 ? 'text-blue-600' : 'text-orange-600'}`} /></div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9" />
          </div>
          <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg">
            <option value="all">All Transactions</option>
            <option value="Income">Income Only</option>
            <option value="Expense">Expense Only</option>
          </select>
          <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} placeholder="Start Date" />
          <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder="End Date" />
          <Button variant="outline" onClick={() => { setSearchTerm(""); setSelectedType("all"); setStartDate(""); setEndDate(""); }} className="flex items-center gap-2"><Filter className="w-4 h-4" /> Reset</Button>
        </div>
      </Card>

      {/* Ledger Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Date</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Voucher No</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Type</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Head</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Description</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Payment Mode</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500">Debit (₹)</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500">Credit (₹)</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedEntries.map((entry) => (
                <tr key={entry.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-600">{entry.date}</td>
                  <td className="px-4 py-3 font-mono text-sm">{entry.voucherNo}</td>
                  <td className="px-4 py-3">
                    <Badge className={entry.type === "Income" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>{entry.type}</Badge>
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800">{entry.head}</td>
                  <td className="px-4 py-3 text-gray-500 max-w-xs truncate">{entry.description}</td>
                  <td className="px-4 py-3"><Badge className="bg-blue-100 text-blue-700">{entry.paymentMode}</Badge></td>
                  <td className="px-4 py-3 text-right font-medium text-red-600">{entry.type === "Expense" ? `₹${entry.amount.toLocaleString()}` : "-"}</td>
                  <td className="px-4 py-3 text-right font-medium text-green-600">{entry.type === "Income" ? `₹${entry.amount.toLocaleString()}` : "-"}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => handleViewDetails(entry)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"><Eye className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50 border-t border-gray-200">
              <tr>
                <td colSpan="6" className="px-4 py-3 text-right font-semibold text-gray-800">Total:</td>
                <td className="px-4 py-3 text-right font-bold text-red-600">₹{sortedEntries.filter(e => e.type === "Expense").reduce((sum, e) => sum + e.amount, 0).toLocaleString()}</td>
                <td className="px-4 py-3 text-right font-bold text-green-600">₹{sortedEntries.filter(e => e.type === "Income").reduce((sum, e) => sum + e.amount, 0).toLocaleString()}</td>
                <td className="px-4 py-3"></td>
              </tr>
            </tfoot>
          </table>
        </div>

        {sortedEntries.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"><BookOpen className="w-8 h-8 text-gray-400" /></div>
            <h3 className="text-lg font-medium text-gray-800">No transactions found</h3>
          </div>
        )}
      </Card>

      {/* Transaction Details Modal */}
      {showDetailsModal && selectedEntry && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md mx-4 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Transaction Details</h2>
              <button onClick={() => setShowDetailsModal(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b"><span className="text-gray-500">Date:</span><span className="font-medium">{selectedEntry.date}</span></div>
              <div className="flex justify-between py-2 border-b"><span className="text-gray-500">Voucher No:</span><span className="font-mono">{selectedEntry.voucherNo}</span></div>
              <div className="flex justify-between py-2 border-b"><span className="text-gray-500">Type:</span><Badge className={selectedEntry.type === "Income" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>{selectedEntry.type}</Badge></div>
              <div className="flex justify-between py-2 border-b"><span className="text-gray-500">Head:</span><span className="font-medium">{selectedEntry.head}</span></div>
              <div className="flex justify-between py-2 border-b"><span className="text-gray-500">Amount:</span><span className={`font-bold text-lg ${selectedEntry.type === "Income" ? "text-green-600" : "text-red-600"}`}>₹{selectedEntry.amount.toLocaleString()}</span></div>
              <div className="flex justify-between py-2 border-b"><span className="text-gray-500">Payment Mode:</span><span>{selectedEntry.paymentMode}</span></div>
              <div className="flex justify-between py-2 border-b"><span className="text-gray-500">Status:</span><Badge className={selectedEntry.status === "Verified" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}>{selectedEntry.status}</Badge></div>
              <div className="py-2"><span className="text-gray-500">Description:</span><p className="mt-1 text-gray-700">{selectedEntry.description}</p></div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="outline" onClick={() => setShowDetailsModal(false)} className="flex-1">Close</Button>
              <Button className="flex-1 bg-blue-600 text-white">Print Receipt</Button>
            </div>
          </div>
        </div>
      )}

      {/* Info Box */}
      <Card className="mt-6 p-4 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-medium text-blue-800">About General Ledger</p>
            <p className="text-sm text-blue-700">The general ledger shows all financial transactions in one place. Debit (Expense) and Credit (Income) entries help track the financial health of the school.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
