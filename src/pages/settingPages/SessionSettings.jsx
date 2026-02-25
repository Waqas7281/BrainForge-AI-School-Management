import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Clock, Plus, Edit, Trash2, Check, X, Calendar } from "lucide-react";
import { useState } from "react";
import { Badge } from "../../components/ui/badge";

export default function SessionSettings() {
  const [sessions, setSessions] = useState([
    {
      id: 1,
      name: "Morning Session",
      startTime: "08:00",
      endTime: "13:00",
      breakTime: "10:30",
      breakDuration: "30",
      isActive: true,
    },
    {
      id: 2,
      name: "Afternoon Session",
      startTime: "13:00",
      endTime: "18:00",
      breakTime: "15:30",
      breakDuration: "30",
      isActive: false,
    },
    {
      id: 3,
      name: "Evening Session",
      startTime: "18:00",
      endTime: "21:00",
      breakTime: "19:30",
      breakDuration: "15",
      isActive: false,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    startTime: "",
    endTime: "",
    breakTime: "",
    breakDuration: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      // Update existing session
      setSessions(
        sessions.map((session) =>
          session.id === editingId ? { ...session, ...formData } : session,
        ),
      );
      alert("Session updated successfully!");
    } else {
      // Add new session
      const newSession = {
        id: Date.now(),
        ...formData,
        isActive: false,
      };
      setSessions([...sessions, newSession]);
      alert("Session added successfully!");
    }

    // Reset form
    setFormData({
      name: "",
      startTime: "",
      endTime: "",
      breakTime: "",
      breakDuration: "",
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (session) => {
    setFormData({
      name: session.name,
      startTime: session.startTime,
      endTime: session.endTime,
      breakTime: session.breakTime,
      breakDuration: session.breakDuration,
    });
    setEditingId(session.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this session?")) {
      setSessions(sessions.filter((session) => session.id !== id));
      alert("Session deleted successfully!");
    }
  };

  const handleSetActive = (id) => {
    setSessions(
      sessions.map((session) => ({
        ...session,
        isActive: session.id === id,
      })),
    );
    alert("Active session changed successfully!");
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      name: "",
      startTime: "",
      endTime: "",
      breakTime: "",
      breakDuration: "",
    });
  };

  // Calculate duration
  const calculateDuration = (start, end) => {
    if (!start || !end) return "0 hrs";
    const [startHour, startMin] = start.split(":").map(Number);
    const [endHour, endMin] = end.split(":").map(Number);
    const totalMinutes = endHour * 60 + endMin - (startHour * 60 + startMin);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Session Settings</h1>
          <p className="text-gray-500 mt-1">
            Manage school sessions and timings
          </p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Session
        </Button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <Card className="p-6 border-blue-200 bg-blue-50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {editingId ? "Edit Session" : "Add New Session"}
              </h2>
              <p className="text-sm text-gray-500">
                {editingId
                  ? "Update session details"
                  : "Create a new session timing"}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {/* Session Name */}
              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Session Name <span className="text-red-500">*</span>
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g., Morning Session"
                  required
                />
              </div>

              {/* Start Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Time <span className="text-red-500">*</span>
                </label>
                <Input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) =>
                    setFormData({ ...formData, startTime: e.target.value })
                  }
                  required
                />
              </div>

              {/* End Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Time <span className="text-red-500">*</span>
                </label>
                <Input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) =>
                    setFormData({ ...formData, endTime: e.target.value })
                  }
                  required
                />
              </div>

              {/* Duration Display */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration
                </label>
                <div className="px-3 py-2 bg-gray-100 rounded-lg text-gray-700 font-medium">
                  {calculateDuration(formData.startTime, formData.endTime)}
                </div>
              </div>

              {/* Break Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Break Time
                </label>
                <Input
                  type="time"
                  value={formData.breakTime}
                  onChange={(e) =>
                    setFormData({ ...formData, breakTime: e.target.value })
                  }
                />
              </div>

              {/* Break Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Break Duration (minutes)
                </label>
                <Input
                  type="number"
                  value={formData.breakDuration}
                  onChange={(e) =>
                    setFormData({ ...formData, breakDuration: e.target.value })
                  }
                  placeholder="30"
                  min="0"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3">
              <Button type="button" variant="outline" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Check className="w-4 h-4 mr-2" />
                {editingId ? "Update" : "Save"}
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Sessions List */}
      <Card>
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Sessions List
          </h2>

          {sessions.length === 0 ? (
            <div className="text-center py-12">
              <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Sessions Found
              </h3>
              <p className="text-gray-500 mb-4">
                Get started by adding your first session
              </p>
              <Button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Session
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className={`p-5 border rounded-xl transition-all ${
                    session.isActive
                      ? "border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-md"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                  }`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          session.isActive
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        <Clock className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {session.name}
                        </h3>
                        {session.isActive && (
                          <Badge className="bg-green-100 text-green-700 border-green-200 mt-1">
                            Active
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Time Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Start Time:</span>
                      <span className="font-semibold text-gray-900">
                        {session.startTime}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">End Time:</span>
                      <span className="font-semibold text-gray-900">
                        {session.endTime}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-semibold text-blue-600">
                        {calculateDuration(session.startTime, session.endTime)}
                      </span>
                    </div>
                    {session.breakTime && (
                      <>
                        <div className="border-t border-gray-200 pt-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Break Time:</span>
                            <span className="font-semibold text-gray-900">
                              {session.breakTime}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Break Duration:</span>
                          <span className="font-semibold text-gray-900">
                            {session.breakDuration} minutes
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-3 border-t border-gray-200">
                    {!session.isActive && (
                      <Button
                        onClick={() => handleSetActive(session.id)}
                        variant="outline"
                        size="sm"
                        className="flex-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200"
                      >
                        <Check className="w-4 h-4 mr-1" />
                        Set Active
                      </Button>
                    )}
                    <Button
                      onClick={() => handleEdit(session)}
                      variant="outline"
                      size="sm"
                      className="text-gray-600 hover:text-gray-700"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => handleDelete(session.id)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                      disabled={session.isActive}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Info Card */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Session Guidelines
            </h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>
                • Sessions define the daily timing structure of your school
              </li>
              <li>• Only one session can be active at a time</li>
              <li>• Active sessions cannot be deleted</li>
              <li>• Break time is optional but recommended</li>
              <li>• Make sure session times don't overlap</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
