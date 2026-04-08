// src/pages/timetable/ClassTimetable.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Calendar,
  Search,
  Printer,
  Download,
  X,
  Clock,
  UserCheck,
  AlertCircle,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function ClassTimetable() {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const classes = ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5"];
  const sections = ["A", "B", "C"];
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

  // Mock Timetable Data
  const timetableData = {
    "Class 1_A": {
      Monday: {
        "09:00 AM - 10:00 AM": {
          subject: "Mathematics",
          teacher: "Dr. Sarah Wilson",
          room: "101",
        },
        "10:00 AM - 11:00 AM": {
          subject: "English",
          teacher: "Prof. James Brown",
          room: "102",
        },
        "11:00 AM - 12:00 PM": {
          subject: "Science",
          teacher: "Ms. Emily Davis",
          room: "103",
        },
        "12:00 PM - 01:00 PM": {
          subject: "Social Studies",
          teacher: "Mrs. Lisa Anderson",
          room: "104",
        },
        "01:00 PM - 02:00 PM": {
          subject: "Lunch Break",
          teacher: "-",
          room: "-",
        },
        "02:00 PM - 03:00 PM": {
          subject: "Computer Science",
          teacher: "Mr. Michael Lee",
          room: "Lab",
        },
        "03:00 PM - 04:00 PM": {
          subject: "Physical Education",
          teacher: "Mr. Robert Johnson",
          room: "Ground",
        },
      },
      Tuesday: {
        "09:00 AM - 10:00 AM": {
          subject: "Science",
          teacher: "Ms. Emily Davis",
          room: "103",
        },
        "10:00 AM - 11:00 AM": {
          subject: "Mathematics",
          teacher: "Dr. Sarah Wilson",
          room: "101",
        },
        "11:00 AM - 12:00 PM": {
          subject: "English",
          teacher: "Prof. James Brown",
          room: "102",
        },
        "12:00 PM - 01:00 PM": {
          subject: "Urdu",
          teacher: "Ms. Jennifer Garcia",
          room: "105",
        },
        "01:00 PM - 02:00 PM": {
          subject: "Lunch Break",
          teacher: "-",
          room: "-",
        },
        "02:00 PM - 03:00 PM": {
          subject: "Islamic Studies",
          teacher: "Mr. David Miller",
          room: "106",
        },
        "03:00 PM - 04:00 PM": {
          subject: "Art",
          teacher: "Ms. Patricia White",
          room: "Art Room",
        },
      },
    },
  };

  const currentTimetable =
    timetableData[`${selectedClass}_${selectedSection}`] || {};

  const handlePrint = () => window.print();

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Class Timetable</h1>
          <p className="text-gray-500 mt-1">View class-wise timetable</p>
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

      {/* Class & Section Selector */}
      <Card className="p-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select Class</option>
            {classes.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg"
            disabled={!selectedClass}
          >
            <option value="">Select Section</option>
            {sections.map((s) => (
              <option key={s} value={s}>
                Section {s}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Timetable Display */}
      {selectedClass && selectedSection && (
        <Card className="p-0 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white">
            <h2 className="text-xl font-bold">
              {selectedClass} - Section {selectedSection}
            </h2>
            <p className="text-white/80 text-sm">Academic Year: 2024-25</p>
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
                            <div className="p-2 bg-blue-50 rounded-lg">
                              <p className="font-medium text-gray-800">
                                {entry.subject}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <UserCheck className="w-3 h-3 text-gray-400" />
                                <span className="text-xs text-gray-500">
                                  {entry.teacher}
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
      {(!selectedClass || !selectedSection) && (
        <Card className="p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">
            Select Class & Section
          </h3>
          <p className="text-gray-500">
            Choose a class and section to view timetable
          </p>
        </Card>
      )}

      {/* Info Box */}
      <Card className="mt-6 p-4 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-medium text-blue-800">About Class Timetable</p>
            <p className="text-sm text-blue-700">
              View complete timetable for each class including subject, teacher,
              and room information.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
