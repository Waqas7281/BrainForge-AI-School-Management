import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { Plus, Search, Filter, Download, Mail, Phone } from "lucide-react";

const students = [
  {
    id: "STU001",
    name: "Alice Johnson",
    class: "Grade 10-A",
    email: "alice.j@school.edu",
    phone: "(555) 123-4567",
    status: "Active",
    gpa: "3.8",
  },
  {
    id: "STU002",
    name: "Bob Smith",
    class: "Grade 9-B",
    email: "bob.s@school.edu",
    phone: "(555) 234-5678",
    status: "Active",
    gpa: "3.5",
  },
  {
    id: "STU003",
    name: "Charlie Davis",
    class: "Grade 11-A",
    email: "charlie.d@school.edu",
    phone: "(555) 345-6789",
    status: "Active",
    gpa: "3.9",
  },
  {
    id: "STU004",
    name: "Diana Prince",
    class: "Grade 10-B",
    email: "diana.p@school.edu",
    phone: "(555) 456-7890",
    status: "Active",
    gpa: "4.0",
  },
  {
    id: "STU005",
    name: "Ethan Hunt",
    class: "Grade 12-A",
    email: "ethan.h@school.edu",
    phone: "(555) 567-8901",
    status: "Inactive",
    gpa: "3.7",
  },
  {
    id: "STU006",
    name: "Fiona Green",
    class: "Grade 9-A",
    email: "fiona.g@school.edu",
    phone: "(555) 678-9012",
    status: "Active",
    gpa: "3.6",
  },
  {
    id: "STU007",
    name: "George Wilson",
    class: "Grade 11-B",
    email: "george.w@school.edu",
    phone: "(555) 789-0123",
    status: "Active",
    gpa: "3.4",
  },
  {
    id: "STU008",
    name: "Hannah Lee",
    class: "Grade 10-A",
    email: "hannah.l@school.edu",
    phone: "(555) 890-1234",
    status: "Active",
    gpa: "3.9",
  },
];

export default function Students() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Students</h1>
          <p
            className="text-gray-500 mt-2"
            style={{ fontSize: "var(--text-body)" }}
          >
            Manage student information and records
          </p>
        </div>
        <Button className="bg-primary-blue hover:bg-primary-dark text-white flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Student
        </Button>
      </div>

      {/* Filters and Actions */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <Input
              type="search"
              placeholder="Search students by name, ID, or class..."
              className="pl-10 bg-gray-50 border-gray-300"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </Card>

      {/* Students Table */}
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>GPA</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <span
                      className="font-mono text-gray-900"
                      style={{ fontSize: "var(--text-small)" }}
                    >
                      {student.id}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center">
                        <span className="text-primary-blue font-medium">
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <div
                          className="text-gray-900 font-medium"
                          style={{ fontSize: "var(--text-body)" }}
                        >
                          {student.name}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className="text-gray-700"
                      style={{ fontSize: "var(--text-body)" }}
                    >
                      {student.class}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div
                        className="flex items-center gap-2 text-gray-700"
                        style={{ fontSize: "var(--text-small)" }}
                      >
                        <Mail className="w-3 h-3" />
                        {student.email}
                      </div>
                      <div
                        className="flex items-center gap-2 text-gray-700"
                        style={{ fontSize: "var(--text-small)" }}
                      >
                        <Phone className="w-3 h-3" />
                        {student.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className="text-gray-900 font-medium"
                      style={{ fontSize: "var(--text-body)" }}
                    >
                      {student.gpa}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        student.status === "Active"
                          ? "bg-success-green/10 text-success-green border-success-green/20"
                          : "bg-gray-100 text-gray-700 border-gray-300"
                      }
                    >
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary-blue hover:text-primary-dark"
                      >
                        View
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-700 hover:text-gray-900"
                      >
                        Edit
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-gray-500" style={{ fontSize: "var(--text-small)" }}>
          Showing 1 to 8 of 2,847 students
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-primary-blue text-white"
          >
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
