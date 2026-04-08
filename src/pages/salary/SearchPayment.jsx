// src/pages/salary/SearchPayment.jsx

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
  AlertCircle,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function SearchPayment() {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState("employee");
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Mock Payment History
  const payments = [
    {
      id: 1,
      employeeId: "EMP001",
      employeeName: "Dr. Sarah Wilson",
      month: "April 2024",
      amount: 75000,
      paymentMode: "Bank Transfer",
      date: "2024-04-05",
      receiptNo: "SLIP001",
      status: "Paid",
    },
    {
      id: 2,
      employeeId: "EMP001",
      employeeName: "Dr. Sarah Wilson",
      month: "March 2024",
      amount: 75000,
      paymentMode: "Bank Transfer",
      date: "2024-03-05",
      receiptNo: "SLIP002",
      status: "Paid",
    },
    {
      id: 3,
      employeeId: "EMP002",
      employeeName: "Prof. James Brown",
      month: "April 2024",
      amount: 48000,
      paymentMode: "Bank Transfer",
      date: "2024-04-05",
      receiptNo: "SLIP003",
      status: "Paid",
    },
    {
      id: 4,
      employeeId: "STF001",
      employeeName: "John Smith",
      month: "April 2024",
      amount: 37000,
      paymentMode: "Cash",
      date: "2024-04-10",
      receiptNo: "SLIP004",
      status: "Paid",
    },
  ];

  const handleSearch = () => {
    if (!searchValue.trim()) return;
    let result = null;
    if (searchType === "employee") {
      result = payments.filter(
        (p) =>
          p.employeeName.toLowerCase().includes(searchValue.toLowerCase()) ||
          p.employeeId.toLowerCase().includes(searchValue.toLowerCase()),
      );
    } else if (searchType === "receipt") {
      result = payments.find(
        (p) => p.receiptNo.toLowerCase() === searchValue.toLowerCase(),
      );
    } else if (searchType === "month") {
      result = payments.filter((p) =>
        p.month.toLowerCase().includes(searchValue.toLowerCase()),
      );
    }
    setSearchResult(result);
    setShowDetails(false);
  };

  const handlePrint = () => window.print();

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Search Payment</h1>
          <p className="text-gray-500 mt-1">Search salary payment records</p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/salary")}
          className="flex items-center gap-2"
        >
          <X className="w-4 h-4" /> Back
        </Button>
      </div>

      <Card className="p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="px-3 py-2 border rounded-lg w-full sm:w-40"
          >
            <option value="employee">Employee Name/ID</option>
            <option value="receipt">Receipt Number</option>
            <option value="month">Month</option>
          </select>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder={
                searchType === "employee"
                  ? "Enter employee name or ID..."
                  : searchType === "receipt"
                    ? "Enter receipt number..."
                    : "Enter month (e.g., April 2024)..."
              }
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-9"
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
          <Button
            onClick={handleSearch}
            disabled={!searchValue.trim()}
            className="bg-blue-600 text-white"
          >
            Search
          </Button>
        </div>
      </Card>

      {searchResult && !showDetails && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Receipt className="w-5 h-5 text-blue-600" /> Search Results
          </h2>
          {Array.isArray(searchResult) ? (
            searchResult.map((p, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 border rounded-lg mb-2"
              >
                <div>
                  <p className="font-medium">{p.employeeName}</p>
                  <p className="text-sm text-gray-500">
                    {p.month} | Receipt: {p.receiptNo}
                  </p>
                  <p className="text-sm font-semibold text-green-600">
                    ₹{p.amount.toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" /> View
                  </Button>
                  <Button variant="outline" size="sm" onClick={handlePrint}>
                    <Printer className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
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
                  <p className="text-gray-500 text-sm">Employee:</p>
                  <p className="font-semibold">{searchResult.employeeName}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Month:</p>
                  <p className="font-semibold">{searchResult.month}</p>
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

      {searchResult === null && searchValue && !Array.isArray(searchResult) && (
        <Card className="p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold">No Payment Found</h3>
          <p className="text-gray-500">No records found for "{searchValue}"</p>
        </Card>
      )}

      <Card className="mt-6 p-4 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-medium text-blue-800">Search Tips</p>
            <p className="text-sm text-blue-700">
              Search by employee name/ID, receipt number, or month to view
              payment history.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
