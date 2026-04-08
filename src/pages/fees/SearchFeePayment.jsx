// src/pages/fees/SearchFeePayment.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Receipt,
  User,
  DollarSign,
  Calendar,
  X,
  Eye,
  Printer,
  Download,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function SearchFeePayment() {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState("receipt");
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Mock Payment Data
  const paymentsData = [
    {
      receiptNo: "RCP001",
      studentId: "STU001",
      studentName: "Alice Johnson",
      class: "Class 1",
      rollNo: "101",
      amount: 8000,
      date: "2024-04-01",
      paymentMode: "Cash",
      status: "Verified",
      fees: [
        { type: "Monthly Tuition", amount: 5000 },
        { type: "Bus Transport", amount: 2000 },
        { type: "Library Fees", amount: 1000 },
      ],
    },
    {
      receiptNo: "RCP002",
      studentId: "STU002",
      studentName: "Bob Smith",
      class: "Class 1",
      rollNo: "102",
      amount: 5000,
      date: "2024-04-05",
      paymentMode: "Bank Transfer",
      status: "Verified",
      fees: [{ type: "Monthly Tuition", amount: 5000 }],
    },
    {
      receiptNo: "RCP003",
      studentId: "STU003",
      studentName: "Charlie Davis",
      class: "Class 2",
      rollNo: "201",
      amount: 7500,
      date: "2024-04-10",
      paymentMode: "Cash",
      status: "Verified",
      fees: [
        { type: "Monthly Tuition", amount: 5500 },
        { type: "Bus Transport", amount: 2000 },
      ],
    },
    {
      receiptNo: "RCP004",
      studentId: "STU001",
      studentName: "Alice Johnson",
      class: "Class 1",
      rollNo: "101",
      amount: 5000,
      date: "2024-03-01",
      paymentMode: "Cheque",
      status: "Verified",
      fees: [{ type: "Monthly Tuition", amount: 5000 }],
    },
  ];

  const handleSearch = async () => {
    if (!searchValue.trim()) return;

    setIsSearching(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    let result = null;
    if (searchType === "receipt") {
      result = paymentsData.find(
        (p) => p.receiptNo.toLowerCase() === searchValue.toLowerCase(),
      );
    } else if (searchType === "student") {
      const studentPayments = paymentsData.filter(
        (p) =>
          p.studentId.toLowerCase().includes(searchValue.toLowerCase()) ||
          p.studentName.toLowerCase().includes(searchValue.toLowerCase()) ||
          p.rollNo.includes(searchValue),
      );
      if (studentPayments.length > 0) result = studentPayments;
    }

    setSearchResult(result);
    setIsSearching(false);
  };

  const handleViewDetails = (payment) => {
    setSearchResult(payment);
    setShowDetails(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Search Fee Payment
          </h1>
          <p className="text-gray-500 mt-1">
            Search and view fee payment records
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/fees")}
          className="flex items-center gap-2"
        >
          <X className="w-4 h-4" /> Back
        </Button>
      </div>

      {/* Search Box */}
      <Card className="p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg w-full sm:w-40"
          >
            <option value="receipt">Receipt Number</option>
            <option value="student">Student ID / Name / Roll No</option>
          </select>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder={
                searchType === "receipt"
                  ? "Enter receipt number..."
                  : "Enter student ID, name, or roll number..."
              }
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-9"
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
          <Button
            onClick={handleSearch}
            disabled={isSearching || !searchValue.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isSearching ? "Searching..." : "Search"}
          </Button>
        </div>
      </Card>

      {/* Search Result */}
      {searchResult && !showDetails && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Receipt className="w-5 h-5 text-blue-600" /> Search Results
          </h2>

          {Array.isArray(searchResult) ? (
            // Multiple Results (Student search)
            <div className="space-y-3">
              {searchResult.map((payment, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {payment.studentName}
                    </p>
                    <p className="text-sm text-gray-500">
                      Receipt: {payment.receiptNo} | Date: {payment.date}
                    </p>
                    <p className="text-sm text-gray-500">
                      Amount: ₹{payment.amount.toLocaleString()} | Mode:{" "}
                      {payment.paymentMode}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(payment)}
                    >
                      <Eye className="w-4 h-4 mr-1" /> View
                    </Button>
                    <Button variant="outline" size="sm" onClick={handlePrint}>
                      <Printer className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Single Result (Receipt search)
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-sm">Receipt No:</p>
                  <p className="font-semibold">{searchResult.receiptNo}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Date:</p>
                  <p className="font-semibold">{searchResult.date}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Student Name:</p>
                  <p className="font-semibold">{searchResult.studentName}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Student ID:</p>
                  <p className="font-semibold">{searchResult.studentId}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Class:</p>
                  <p className="font-semibold">
                    {searchResult.class} (Roll: {searchResult.rollNo})
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Amount:</p>
                  <p className="font-bold text-green-600">
                    ₹{searchResult.amount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Payment Mode:</p>
                  <p className="font-semibold">{searchResult.paymentMode}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Status:</p>
                  <Badge className="bg-green-100 text-green-700">
                    {searchResult.status}
                  </Badge>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t">
                <p className="font-medium text-gray-700 mb-2">Fee Breakdown:</p>
                <div className="space-y-1">
                  {searchResult.fees.map((fee, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span>{fee.type}</span>
                      <span>₹{fee.amount.toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-bold pt-2 border-t">
                    <span>Total</span>
                    <span>₹{searchResult.amount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <Button
                  variant="outline"
                  onClick={handlePrint}
                  className="flex-1"
                >
                  <Printer className="w-4 h-4 mr-2" /> Print Receipt
                </Button>
                <Button variant="outline" className="flex-1">
                  <Download className="w-4 h-4 mr-2" /> Download
                </Button>
              </div>
            </div>
          )}
        </Card>
      )}

      {/* No Result */}
      {searchResult === null && searchValue && !isSearching && (
        <Card className="p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">
            No Payment Found
          </h3>
          <p className="text-gray-500">No records found for "{searchValue}"</p>
        </Card>
      )}

      {/* Info Box */}
      <Card className="mt-6 p-4 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-medium text-blue-800">Search Tips</p>
            <p className="text-sm text-blue-700">
              You can search by Receipt Number or by Student Name/ID/Roll
              Number. For student search, all payments made by that student will
              be shown.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
