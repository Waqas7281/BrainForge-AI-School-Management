// src/pages/timetable/AssignSubject.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Calendar,
  Clock,
  BookOpen,
  UserCheck,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Trash2,
  Plus,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function AssignSubject() {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock Data
  const classes = ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5"];
  const sections = ["A", "B", "C"];
  const timeSlots = [
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 01:00 PM",
    "01:00 PM - 02:00 PM (Lunch)",
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

  const subjects = [
    {
      id: 1,
      name: "Mathematics",
      code: "MATH101",
      teacher: "Dr. Sarah Wilson",
    },
    { id: 2, name: "English", code: "ENG101", teacher: "Prof. James Brown" },
    { id: 3, name: "Science", code: "SCI101", teacher: "Ms. Emily Davis" },
    {
      id: 4,
      name: "Social Studies",
      code: "SOC101",
      teacher: "Mrs. Lisa Anderson",
    },
    {
      id: 5,
      name: "Computer Science",
      code: "CS101",
      teacher: "Mr. Michael Lee",
    },
    { id: 6, name: "Urdu", code: "URD101", teacher: "Ms. Jennifer Garcia" },
    {
      id: 7,
      name: "Islamic Studies",
      code: "ISL101",
      teacher: "Mr. David Miller",
    },
    {
      id: 8,
      name: "Physical Education",
      code: "PE101",
      teacher: "Mr. Robert Johnson",
    },
  ];

  // Mock Timetable Data
  const [timetable, setTimetable] = useState({});

  const [newAssignment, setNewAssignment] = useState({
    day: "",
    timeSlot: "",
    subject: "",
    teacher: "",
  });

  const getCurrentTimetable = () => {
    if (!selectedClass || !selectedSection) return {};
    return timetable[`${selectedClass}_${selectedSection}`] || {};
  };

  const currentTimetable = getCurrentTimetable();

  const handleAddAssignment = () => {
    if (!newAssignment.day || !newAssignment.timeSlot || !newAssignment.subject)
      return;
    const subjectData = subjects.find(
      (s) => s.id === parseInt(newAssignment.subject),
    );
    const dayKey = newAssignment.day;
    const timeKey = newAssignment.timeSlot;

    const updatedTimetable = { ...currentTimetable };
    if (!updatedTimetable[dayKey]) updatedTimetable[dayKey] = {};
    updatedTimetable[dayKey][timeKey] = {
      subjectId: parseInt(newAssignment.subject),
      subjectName: subjectData.name,
      teacher: subjectData.teacher,
    };

    setTimetable((prev) => ({
      ...prev,
      [`${selectedClass}_${selectedSection}`]: updatedTimetable,
    }));

    setNewAssignment({ day: "", timeSlot: "", subject: "", teacher: "" });
    setShowAddModal(false);
  };

  const handleRemoveAssignment = (day, timeSlot) => {
    const updatedTimetable = { ...currentTimetable };
    if (updatedTimetable[day] && updatedTimetable[day][timeSlot]) {
      delete updatedTimetable[day][timeSlot];
      setTimetable((prev) => ({
        ...prev,
        [`${selectedClass}_${selectedSection}`]: updatedTimetable,
      }));
    }
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Assign Subject (Timetable)
          </h1>
          <p className="text-gray-500 mt-1">
            Create class timetable by assigning subjects to time slots
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/timetable")}
          className="flex items-center gap-2"
        >
          <X className="w-4 h-4" /> Back
        </Button>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-700 font-medium">
            Timetable saved successfully!
          </span>
        </div>
      )}

      {/* Class & Section Selector */}
      <Card className="p-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
          <Button
            onClick={() => setShowAddModal(true)}
            disabled={!selectedClass || !selectedSection}
            className="bg-blue-600 text-white flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Subject
          </Button>
        </div>
      </Card>

      {/* Timetable Display */}
      {selectedClass && selectedSection && (
        <Card className="p-0 overflow-hidden">
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
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {days.map((day) => (
                  <tr key={day} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-800 bg-gray-50">
                      {day}
                    </td>
                    {timeSlots.map((slot) => {
                      const assignment = currentTimetable[day]?.[slot];
                      return (
                        <td key={slot} className="px-4 py-3">
                          {assignment ? (
                            <div className="p-2 bg-blue-50 rounded-lg">
                              <p className="font-medium text-gray-800">
                                {assignment.subjectName}
                              </p>
                              <p className="text-xs text-gray-500">
                                {assignment.teacher}
                              </p>
                            </div>
                          ) : (
                            <span className="text-gray-300 text-sm">-</span>
                          )}
                        </td>
                      );
                    })}
                    <td className="px-4 py-3">
                      {Object.keys(currentTimetable[day] || {}).length > 0 && (
                        <button
                          onClick={() => {
                            Object.keys(currentTimetable[day] || {}).forEach(
                              (slot) => {
                                handleRemoveAssignment(day, slot);
                              },
                            );
                          }}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t bg-gray-50 flex justify-end">
            <Button
              onClick={handleSave}
              disabled={isSubmitting}
              className="bg-green-600 text-white"
            >
              {isSubmitting ? (
                "Saving..."
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" /> Save Timetable
                </>
              )}
            </Button>
          </div>
        </Card>
      )}

      {/* Add Assignment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md mx-4 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                Add Subject to Timetable
              </h2>
              <button onClick={() => setShowAddModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Day</label>
                <select
                  value={newAssignment.day}
                  onChange={(e) =>
                    setNewAssignment({ ...newAssignment, day: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="">Select Day</option>
                  {days.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Time Slot
                </label>
                <select
                  value={newAssignment.timeSlot}
                  onChange={(e) =>
                    setNewAssignment({
                      ...newAssignment,
                      timeSlot: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="">Select Time Slot</option>
                  {timeSlots.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Subject
                </label>
                <select
                  value={newAssignment.subject}
                  onChange={(e) => {
                    const subject = subjects.find(
                      (s) => s.id === parseInt(e.target.value),
                    );
                    setNewAssignment({
                      ...newAssignment,
                      subject: e.target.value,
                      teacher: subject ? subject.teacher : "",
                    });
                  }}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="">Select Subject</option>
                  {subjects.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} - {s.teacher}
                    </option>
                  ))}
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
                onClick={handleAddAssignment}
                className="flex-1 bg-blue-600 text-white"
              >
                Add
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
            <p className="font-medium text-blue-800">
              About Timetable Assignment
            </p>
            <p className="text-sm text-blue-700">
              Assign subjects to specific time slots for each class and section.
              The timetable will be visible to students and teachers.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
