// src/pages/events/EventList.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Edit,
  Trash2,
  Eye,
  X,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  Download,
  Plus,
  Clock,
  MapPin,
  Users,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function EventList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock Events Data
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Annual Sports Day",
      description: "Annual sports competition for all students",
      eventType: "Sports",
      startDate: "2024-05-25",
      endDate: "2024-05-26",
      startTime: "09:00",
      endTime: "17:00",
      venue: "School Ground",
      targetAudience: "All",
      isImportant: true,
      isHoliday: false,
      status: "Upcoming",
    },
    {
      id: 2,
      title: "Parent-Teacher Meeting",
      description: "Quarterly parent-teacher meeting",
      eventType: "Meeting",
      startDate: "2024-05-20",
      endDate: "2024-05-20",
      startTime: "10:00",
      endTime: "14:00",
      venue: "School Auditorium",
      targetAudience: "Parents",
      isImportant: true,
      isHoliday: false,
      status: "Upcoming",
    },
    {
      id: 3,
      title: "Summer Vacation",
      description: "School closed for summer break",
      eventType: "Holiday",
      startDate: "2024-06-01",
      endDate: "2024-06-30",
      startTime: "00:00",
      endTime: "23:59",
      venue: "-",
      targetAudience: "All",
      isImportant: false,
      isHoliday: true,
      status: "Upcoming",
    },
    {
      id: 4,
      title: "Independence Day Celebration",
      description: "Celebration of Independence Day",
      eventType: "Cultural",
      startDate: "2024-08-15",
      endDate: "2024-08-15",
      startTime: "08:00",
      endTime: "11:00",
      venue: "School Ground",
      targetAudience: "All",
      isImportant: true,
      isHoliday: true,
      status: "Upcoming",
    },
  ]);

  const eventTypes = [
    "all",
    "Academic",
    "Cultural",
    "Sports",
    "Meeting",
    "Holiday",
    "Workshop",
  ];

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      selectedType === "all" || event.eventType === selectedType;
    return matchesSearch && matchesType;
  });

  const handleDelete = () => {
    setEvents(events.filter((event) => event.id !== showDeleteModal));
    setShowDeleteModal(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case "Sports":
        return "bg-green-100 text-green-700";
      case "Meeting":
        return "bg-purple-100 text-purple-700";
      case "Holiday":
        return "bg-red-100 text-red-700";
      case "Cultural":
        return "bg-pink-100 text-pink-700";
      case "Academic":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Event List</h1>
          <p className="text-gray-500 mt-1">Manage all school events</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => navigate("/events/add")}
            className="bg-blue-600 text-white flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Event
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/events")}
            className="flex items-center gap-2"
          >
            <X className="w-4 h-4" /> Back
          </Button>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-700 font-medium">
            Event deleted successfully!
          </span>
        </div>
      )}

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          >
            {eventTypes.map((t) => (
              <option key={t} value={t}>
                {t === "all" ? "All Types" : t}
              </option>
            ))}
          </select>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" /> Export
          </Button>
        </div>
      </Card>

      {/* Events List */}
      <div className="space-y-4">
        {filteredEvents.map((event) => (
          <Card
            key={event.id}
            className={`p-5 ${event.isImportant ? "border-l-4 border-l-red-500" : ""}`}
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <Badge className={getEventTypeColor(event.eventType)}>
                    {event.eventType}
                  </Badge>
                  {event.isImportant && (
                    <Badge className="bg-red-100 text-red-700">Important</Badge>
                  )}
                  {event.isHoliday && (
                    <Badge className="bg-orange-100 text-orange-700">
                      Holiday
                    </Badge>
                  )}
                  <Badge className="bg-blue-100 text-blue-700">
                    {event.status}
                  </Badge>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {event.title}
                </h3>
                <p className="text-gray-600 mb-3">{event.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> {event.startDate} -{" "}
                    {event.endDate}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" /> {event.startTime} -{" "}
                    {event.endTime}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> {event.venue}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" /> {event.targetAudience}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg">
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setShowDeleteModal(event.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <Card className="p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">
            No events found
          </h3>
          <p className="text-gray-500">
            Click "Add Event" to create your first event
          </p>
        </Card>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Delete Event</h3>
            <p className="text-gray-500 mb-6">
              Are you sure you want to delete this event?
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteModal(null)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                className="flex-1 bg-red-600 text-white"
              >
                Delete
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
            <p className="font-medium text-blue-800">About Events</p>
            <p className="text-sm text-blue-700">
              View and manage all school events. Important events are
              highlighted.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
