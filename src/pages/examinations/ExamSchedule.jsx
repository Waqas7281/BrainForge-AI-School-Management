// src/pages/examinations/ExamSchedule.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Edit,
  Trash2,
  X,
  CheckCircle,
  AlertCircle,
  Search,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function ExamSchedule() {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");

  const classes = [
    "all",
    "Class 1",
    "Class 2",
    "Class 3",
    "Class 4",
    "Class 5",
  ];

  const [exams, setExams] = useState([
    {
      id: 1,
      examName: "Mid Term",
      class: "Class 1",
      subject: "Mathematics",
      date: "2024-04-15",
      startTime: "09:00 AM",
      endTime: "12:00 PM",
      room: "101",
      status: "Scheduled",
    },
    {
      id: 2,
      examName: "Mid Term",
      class: "Class 1",
      subject: "English",
      date: "2024-04-16",
      startTime: "09:00 AM",
      endTime: "12:00 PM",
      room: "102",
      status: "Scheduled",
    },
    {
      id: 3,
      examName: "Mid Term",
      class: "Class 1",
      subject: "Science",
      date: "2024-04-17",
      startTime: "09:00 AM",
      endTime: "12:00 PM",
      room: "103",
      status: "Scheduled",
    },
    {
      id: 4,
      examName: "Final Term",
      class: "Class 2",
      subject: "Mathematics",
      date: "2024-05-10",
      startTime: "09:00 AM",
      endTime: "12:00 PM",
      room: "201",
      status: "Scheduled",
    },
    {
      id: 5,
      examName: "Final Term",
      class: "Class 2",
      subject: "English",
      date: "2024-05-11",
      startTime: "09:00 AM",
      endTime: "12:00 PM",
      room: "202",
      status: "Scheduled",
    },
  ]);

  const [newExam, setNewExam] = useState({
    examName: "",
    class: "",
    subject: "",
    date: "",
    startTime: "",
    endTime: "",
    room: "",
  });
  const [editExam, setEditExam] = useState(null);

  const subjects = [
    "Mathematics",
    "English",
    "Science",
    "Social Studies",
    "Urdu",
    "Islamic Studies",
    "Computer Science",
  ];

  const filteredExams = exams.filter((exam) => {
    const matchesSearch =
      exam.examName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass =
      selectedClass === "all" || exam.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  const handleAddExam = () => {
    if (!newExam.examName || !newExam.class || !newExam.subject) return;
    const newId = Math.max(...exams.map((e) => e.id), 0) + 1;
    setExams([...exams, { ...newExam, id: newId, status: "Scheduled" }]);
    setNewExam({
      examName: "",
      class: "",
      subject: "",
      date: "",
      startTime: "",
      endTime: "",
      room: "",
    });
    setShowAddModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleEditExam = () => {
    if (!editExam.examName) return;
    setExams(exams.map((exam) => (exam.id === editExam.id ? editExam : exam)));
    setShowEditModal(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDeleteExam = () => {
    setExams(exams.filter((exam) => exam.id !== showDeleteModal));
    setShowDeleteModal(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Exam Schedule</h1>
          <p className="text-gray-500 mt-1">Manage examination schedule</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigate("/examinations")}
            className="flex items-center gap-2"
          >
            <X className="w-4 h-4" /> Back
          </Button>
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Exam
          </Button>
        </div>
      </div>

      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-700">
            Exam schedule updated successfully!
          </span>
        </div>
      )}

      <Card className="p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by exam name or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
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
        </div>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left px-4 py-3 text-xs font-semibold">
                  Exam Name
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold">
                  Class
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold">
                  Subject
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold">
                  Date
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold">
                  Time
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold">
                  Room
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold">
                  Status
                </th>
                <th className="text-right px-4 py-3 text-xs font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredExams.map((exam) => (
                <tr key={exam.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{exam.examName}</td>
                  <td className="px-4 py-3">{exam.class}</td>
                  <td className="px-4 py-3">{exam.subject}</td>
                  <td className="px-4 py-3">{exam.date}</td>
                  <td className="px-4 py-3">
                    {exam.startTime} - {exam.endTime}
                  </td>
                  <td className="px-4 py-3">{exam.room}</td>
                  <td className="px-4 py-3">
                    <Badge className="bg-green-100 text-green-700">
                      {exam.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => setShowEditModal(exam)}
                        className="p-1 text-amber-600 hover:bg-amber-50 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setShowDeleteModal(exam.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
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
      </Card>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md mx-4 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add Exam Schedule</h2>
              <button onClick={() => setShowAddModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Exam Name
                </label>
                <Input
                  value={newExam.examName}
                  onChange={(e) =>
                    setNewExam({ ...newExam, examName: e.target.value })
                  }
                  placeholder="e.g., Mid Term, Final Term"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Class</label>
                <select
                  value={newExam.class}
                  onChange={(e) =>
                    setNewExam({ ...newExam, class: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="">Select Class</option>
                  <option value="Class 1">Class 1</option>
                  <option value="Class 2">Class 2</option>
                  <option value="Class 3">Class 3</option>
                  <option value="Class 4">Class 4</option>
                  <option value="Class 5">Class 5</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Subject
                </label>
                <select
                  value={newExam.subject}
                  onChange={(e) =>
                    setNewExam({ ...newExam, subject: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="">Select Subject</option>
                  {subjects.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <Input
                  type="date"
                  value={newExam.date}
                  onChange={(e) =>
                    setNewExam({ ...newExam, date: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Start Time
                  </label>
                  <Input
                    type="time"
                    value={newExam.startTime}
                    onChange={(e) =>
                      setNewExam({ ...newExam, startTime: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    End Time
                  </label>
                  <Input
                    type="time"
                    value={newExam.endTime}
                    onChange={(e) =>
                      setNewExam({ ...newExam, endTime: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Room Number
                </label>
                <Input
                  value={newExam.room}
                  onChange={(e) =>
                    setNewExam({ ...newExam, room: e.target.value })
                  }
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
                onClick={handleAddExam}
                className="flex-1 bg-blue-600 text-white"
              >
                Add Exam
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
              <h2 className="text-xl font-semibold">Edit Exam Schedule</h2>
              <button onClick={() => setShowEditModal(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Exam Name
                </label>
                <Input
                  value={editExam.examName}
                  onChange={(e) =>
                    setEditExam({ ...editExam, examName: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Class</label>
                <select
                  value={editExam.class}
                  onChange={(e) =>
                    setEditExam({ ...editExam, class: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="Class 1">Class 1</option>
                  <option value="Class 2">Class 2</option>
                  <option value="Class 3">Class 3</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Subject
                </label>
                <select
                  value={editExam.subject}
                  onChange={(e) =>
                    setEditExam({ ...editExam, subject: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  {subjects.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <Input
                  type="date"
                  value={editExam.date}
                  onChange={(e) =>
                    setEditExam({ ...editExam, date: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={editExam.status}
                  onChange={(e) =>
                    setEditExam({ ...editExam, status: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="Scheduled">Scheduled</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
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
                onClick={handleEditExam}
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
            <h3 className="text-lg font-semibold mb-2">Delete Exam Schedule</h3>
            <p className="text-gray-500 mb-6">
              Are you sure you want to delete this exam schedule?
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteModal(null)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteExam}
                className="bg-red-600 text-white"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      <Card className="mt-6 p-4 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-medium text-blue-800">About Exam Schedule</p>
            <p className="text-sm text-blue-700">
              Create and manage exam schedules for all classes. Each exam
              includes subject, date, time, and room allocation.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
