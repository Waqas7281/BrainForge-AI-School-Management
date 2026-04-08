// src/pages/reports/StudentReport.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Search, Download, Printer, X } from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function StudentReport() {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedSection, setSelectedSection] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showReport, setShowReport] = useState(false);

  const classes = [
    "all",
    "Class 1",
    "Class 2",
    "Class 3",
    "Class 4",
    "Class 5",
  ];
  const sections = ["all", "A", "B", "C"];

  // Mock Student Data
  const students = [
    {
      id: "STU001",
      name: "Alice Johnson",
      class: "Class 1",
      section: "A",
      rollNo: "101",
      fatherName: "John Johnson",
      phone: "(555) 123-4567",
      email: "alice@school.edu",
      admissionDate: "2024-01-15",
      status: "Active",
    },
    {
      id: "STU002",
      name: "Bob Smith",
      class: "Class 1",
      section: "A",
      rollNo: "102",
      fatherName: "Mike Smith",
      phone: "(555) 234-5678",
      email: "bob@school.edu",
      admissionDate: "2024-01-15",
      status: "Active",
    },
    {
      id: "STU003",
      name: "Charlie Davis",
      class: "Class 1",
      section: "B",
      rollNo: "103",
      fatherName: "Robert Davis",
      phone: "(555) 345-6789",
      email: "charlie@school.edu",
      admissionDate: "2024-01-15",
      status: "Active",
    },
    {
      id: "STU004",
      name: "Diana Prince",
      class: "Class 2",
      section: "A",
      rollNo: "201",
      fatherName: "Thomas Prince",
      phone: "(555) 456-7890",
      email: "diana@school.edu",
      admissionDate: "2024-01-15",
      status: "Active",
    },
    {
      id: "STU005",
      name: "Ethan Hunt",
      class: "Class 2",
      section: "A",
      rollNo: "202",
      fatherName: "Jim Hunt",
      phone: "(555) 567-8901",
      email: "ethan@school.edu",
      admissionDate: "2024-01-15",
      status: "Inactive",
    },
  ];

  const filteredStudents = students.filter((student) => {
    const matchesClass =
      selectedClass === "all" || student.class === selectedClass;
    const matchesSection =
      selectedSection === "all" || student.section === selectedSection;
    const matchesStatus =
      selectedStatus === "all" || student.status === selectedStatus;
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesClass && matchesSection && matchesStatus && matchesSearch;
  });

  const stats = {
    total: filteredStudents.length,
    active: filteredStudents.filter((s) => s.status === "Active").length,
    inactive: filteredStudents.filter((s) => s.status === "Inactive").length,
  };

  const handlePrint = () => window.print();
  const handleExport = () => alert("Exporting student report...");

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Student Report</h1>
          <p className="text-gray-500 mt-1">
            View and export student details report
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/reports")}
          className="flex items-center gap-2"
        >
          <X className="w-4 h-4" /> Back
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            {classes.map((c) => (
              <option key={c} value={c}>
                {c === "all" ? "All Classes" : c}
              </option>
            ))}
          </select>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            {sections.map((s) => (
              <option key={s} value={s}>
                {s === "all" ? "All Sections" : `Section ${s}`}
              </option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button
            onClick={() => setShowReport(true)}
            className="bg-blue-600 text-white"
          >
            Generate Report
          </Button>
        </div>
      </Card>

      {/* Report Content */}
      {showReport && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Card className="p-4 text-center">
              <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
              <p className="text-gray-500">Total Students</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-3xl font-bold text-green-600">
                {stats.active}
              </p>
              <p className="text-gray-500">Active</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-3xl font-bold text-red-600">
                {stats.inactive}
              </p>
              <p className="text-gray-500">Inactive</p>
            </Card>
          </div>

          {/* Student Table */}
          <Card className="p-0 overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b bg-gray-50">
              <h3 className="font-semibold">Student Details</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleExport}>
                  <Download className="w-4 h-4 mr-1" /> Export
                </Button>
                <Button variant="outline" size="sm" onClick={handlePrint}>
                  <Printer className="w-4 h-4 mr-1" /> Print
                </Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left px-4 py-3 text-xs font-semibold">
                      ID
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold">
                      Name
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold">
                      Class
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold">
                      Section
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold">
                      Roll No
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold">
                      Father's Name
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold">
                      Phone
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-600">{student.id}</td>
                      <td className="px-4 py-3 font-medium">{student.name}</td>
                      <td className="px-4 py-3">{student.class}</td>
                      <td className="px-4 py-3">{student.section}</td>
                      <td className="px-4 py-3">{student.rollNo}</td>
                      <td className="px-4 py-3">{student.fatherName}</td>
                      <td className="px-4 py-3">{student.phone}</td>
                      <td className="px-4 py-3">
                        <Badge
                          className={
                            student.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }
                        >
                          {student.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}

      <Card className="mt-6 p-4 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <GraduationCap className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-medium text-blue-800">About Student Report</p>
            <p className="text-sm text-blue-700">
              Generate student reports with filters by class, section, and
              status.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
