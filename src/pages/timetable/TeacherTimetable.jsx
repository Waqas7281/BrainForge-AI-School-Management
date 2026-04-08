// src/pages/timetable/TeacherTimetable.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserCheck,
  Calendar,
  Search,
  Printer,
  Download,
  X,
  Clock,
  BookOpen,
  AlertCircle,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function TeacherTimetable() {
  const navigate = useNavigate();
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const timeSlots = [
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 01:00 PM",
    "01:00 PM - 02:00 PM",
    "02:00 PM - 03:00 PM",
    "03:00 PM - 04:00 PM",
  ];
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Mock Teachers
  const teachers = [
    {
      id: 1,
      name: "Dr. Sarah Wilson",
      department: "Mathematics",
      designation: "Senior Teacher",
    },
    {
      id: 2,
      name: "Prof. James Brown",
      department: "English",
      designation: "PGT Teacher",
    },
    {
      id: 3,
      name: "Ms. Emily Davis",
      department: "Science",
      designation: "TGT Teacher",
    },
    {
      id: 4,
      name: "Mrs. Lisa Anderson",
      department: "Social Studies",
      designation: "PRT Teacher",
    },
    {
      id: 5,
      name: "Mr. Michael Lee",
      department: "Computer Science",
      designation: "TGT Teacher",
    },
  ];

  // Mock Teacher Timetable
  const teacherTimetable = {
    1: {
      // Dr. Sarah Wilson
      Monday: {
        "09:00 AM - 10:00 AM": {
          subject: "Mathematics",
          class: "Class 1-A",
          room: "101",
        },
        "10:00 AM - 11:00 AM": {
          subject: "Mathematics",
          class: "Class 2-A",
          room: "201",
        },
        "11:00 AM - 12:00 PM": {
          subject: "Mathematics",
          class: "Class 3-A",
          room: "301",
        },
        "12:00 PM - 01:00 PM": {
          subject: "Mathematics",
          class: "Class 1-B",
          room: "102",
        },
        "02:00 PM - 03:00 PM": {
          subject: "Mathematics",
          class: "Class 2-B",
          room: "202",
        },
      },
      Tuesday: {
        "09:00 AM - 10:00 AM": {
          subject: "Mathematics",
          class: "Class 3-B",
          room: "302",
        },
        "10:00 AM - 11:00 AM": {
          subject: "Mathematics",
          class: "Class 1-A",
          room: "101",
        },
        "11:00 AM - 12:00 PM": {
          subject: "Mathematics",
          class: "Class 2-A",
          room: "201",
        },
        "02:00 PM - 03:00 PM": {
          subject: "Mathematics",
          class: "Class 1-B",
          room: "102",
        },
      },
    },
    2: {
      // Prof. James Brown
      Monday: {
        "09:00 AM - 10:00 AM": {
          subject: "English",
          class: "Class 1-A",
          room: "102",
        },
        "10:00 AM - 11:00 AM": {
          subject: "English",
          class: "Class 2-A",
          room: "202",
        },
        "11:00 AM - 12:00 PM": {
          subject: "English",
          class: "Class 3-A",
          room: "302",
        },
      },
      Tuesday: {
        "09:00 AM - 10:00 AM": {
          subject: "English",
          class: "Class 1-B",
          room: "103",
        },
        "10:00 AM - 11:00 AM": {
          subject: "English",
          class: "Class 2-B",
          room: "203",
        },
      },
    },
  };

  const filteredTeachers = teachers.filter((t) =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const currentTimetable = teacherTimetable[selectedTeacher] || {};

  const handlePrint = () => window.print();
  const selectedTeacherData = teachers.find(
    (t) => t.id === parseInt(selectedTeacher),
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Teacher Timetable
          </h1>
          <p className="text-gray-500 mt-1">View teacher-wise timetable</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigate("/timetable")}
            className="flex items-center gap-2"
          >
            <X className="w-4 h-4" /> Back
          </Button>
          <Button
            variant="outline"
            onClick={handlePrint}
            className="flex items-center gap-2"
          >
            <Printer className="w-4 h-4" /> Print
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" /> Download
          </Button>
        </div>
      </div>

      {/* Teacher Selector */}
      <Card className="p-4 mb-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search teacher by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {filteredTeachers.map((teacher) => (
            <button
              key={teacher.id}
              onClick={() => setSelectedTeacher(teacher.id)}
              className={`p-3 rounded-lg text-center transition-all ${
                selectedTeacher === teacher.id
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-blue-100"
              }`}
            >
              <p className="font-medium text-sm">{teacher.name}</p>
              <p className="text-xs opacity-80">{teacher.department}</p>
            </button>
          ))}
        </div>
      </Card>

      {/* Timetable Display */}
      {selectedTeacher && selectedTeacherData && (
        <Card className="p-0 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-4 text-white">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
                {selectedTeacherData.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-bold">
                  {selectedTeacherData.name}
                </h2>
                <p className="text-white/80 text-sm">
                  {selectedTeacherData.designation} |{" "}
                  {selectedTeacherData.department}
                </p>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                    Day / Time
                  </th>
                  {timeSlots.map((slot, idx) => (
                    <th
                      key={idx}
                      className="text-left px-4 py-3 text-xs font-semibold text-gray-500"
                    >
                      {slot}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {days.map((day) => (
                  <tr key={day} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-800 bg-gray-50">
                      {day}
                    </td>
                    {timeSlots.map((slot) => {
                      const entry = currentTimetable[day]?.[slot];
                      return (
                        <td key={slot} className="px-4 py-3">
                          {entry ? (
                            <div className="p-2 bg-purple-50 rounded-lg">
                              <p className="font-medium text-gray-800">
                                {entry.subject}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <BookOpen className="w-3 h-3 text-gray-400" />
                                <span className="text-xs text-gray-500">
                                  {entry.class}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <Clock className="w-3 h-3 text-gray-400" />
                                <span className="text-xs text-gray-500">
                                  Room: {entry.room}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <span className="text-gray-300 text-sm">-</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* No Selection */}
      {!selectedTeacher && (
        <Card className="p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserCheck className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">
            Select a Teacher
          </h3>
          <p className="text-gray-500">
            Choose a teacher from above to view their timetable
          </p>
        </Card>
      )}

      {/* Info Box */}
      <Card className="mt-6 p-4 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-medium text-blue-800">About Teacher Timetable</p>
            <p className="text-sm text-blue-700">
              View complete timetable for each teacher including subjects,
              classes, and room numbers.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
