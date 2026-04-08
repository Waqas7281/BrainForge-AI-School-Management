// src/pages/events/EventCalendar.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  X,
  Eye,
  Plus,
  MapPin,
  Clock,
  Users,
  AlertCircle,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";

export default function EventCalendar() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);

  // Mock Events Data
  const events = [
    {
      id: 1,
      title: "Annual Sports Day",
      date: "2024-05-25",
      type: "Sports",
      venue: "School Ground",
      time: "09:00 - 17:00",
      audience: "All",
    },
    {
      id: 2,
      title: "Parent-Teacher Meeting",
      date: "2024-05-20",
      type: "Meeting",
      venue: "Auditorium",
      time: "10:00 - 14:00",
      audience: "Parents",
    },
    {
      id: 3,
      title: "Summer Vacation",
      date: "2024-06-01",
      type: "Holiday",
      venue: "-",
      time: "All Day",
      audience: "All",
    },
    {
      id: 4,
      title: "Independence Day",
      date: "2024-08-15",
      type: "Holiday",
      venue: "School Ground",
      time: "08:00 - 11:00",
      audience: "All",
    },
    {
      id: 5,
      title: "Science Exhibition",
      date: "2024-05-18",
      type: "Academic",
      venue: "Science Lab",
      time: "10:00 - 15:00",
      audience: "Students",
    },
    {
      id: 6,
      title: "Teacher's Day",
      date: "2024-09-05",
      type: "Cultural",
      venue: "Auditorium",
      time: "09:00 - 12:00",
      audience: "All",
    },
    {
      id: 7,
      title: "Diwali Break",
      date: "2024-11-01",
      type: "Holiday",
      venue: "-",
      time: "All Day",
      audience: "All",
    },
    {
      id: 8,
      title: "Winter Vacation",
      date: "2024-12-25",
      type: "Holiday",
      venue: "-",
      time: "All Day",
      audience: "All",
    },
  ];

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const getEventsForDate = (date) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
    return events.filter((event) => event.date === dateStr);
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

  const goToPrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const goToNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToToday = () => setCurrentDate(new Date());

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Event Calendar</h1>
          <p className="text-gray-500 mt-1">View events in calendar view</p>
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

      {/* Calendar Header */}
      <Card className="p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={goToPrevMonth}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold text-gray-800">
              {monthNames[month]} {year}
            </h2>
            <button
              onClick={goToNextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <Button onClick={goToToday} variant="outline">
            Today
          </Button>
        </div>
      </Card>

      {/* Calendar Grid */}
      <Card className="p-4 overflow-x-auto">
        <div className="min-w-[600px]">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div
                key={day}
                className="text-center py-2 text-sm font-semibold text-gray-500"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="h-28 bg-gray-50 rounded-lg border border-gray-100"
              ></div>
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const date = i + 1;
              const dateEvents = getEventsForDate(date);
              const isToday =
                date === new Date().getDate() &&
                month === new Date().getMonth() &&
                year === new Date().getFullYear();
              return (
                <div
                  key={date}
                  className={`h-28 p-2 rounded-lg border ${isToday ? "border-blue-500 bg-blue-50" : "border-gray-200"} overflow-y-auto`}
                >
                  <div
                    className={`text-right text-sm font-semibold ${isToday ? "text-blue-600" : "text-gray-600"}`}
                  >
                    {date}
                  </div>
                  <div className="space-y-1 mt-1">
                    {dateEvents.map((event) => (
                      <div
                        key={event.id}
                        onClick={() => handleEventClick(event)}
                        className={`text-xs p-1 rounded cursor-pointer truncate ${getEventTypeColor(event.type)}`}
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Event Details Modal */}
      {showEventModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md mx-4 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {selectedEvent.title}
              </h2>
              <button onClick={() => setShowEventModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-gray-400" />
                <span>{selectedEvent.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>{selectedEvent.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>{selectedEvent.venue}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-400" />
                <span>{selectedEvent.audience}</span>
              </div>
              <div>
                <Badge className={getEventTypeColor(selectedEvent.type)}>
                  {selectedEvent.type}
                </Badge>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowEventModal(false)}
                className="flex-1"
              >
                Close
              </Button>
              <Button
                onClick={() => navigate("/events/add")}
                className="flex-1 bg-blue-600 text-white"
              >
                Add Event
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
            <p className="font-medium text-blue-800">About Calendar</p>
            <p className="text-sm text-blue-700">
              Click on any event to view details. Events are color-coded by
              type.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
