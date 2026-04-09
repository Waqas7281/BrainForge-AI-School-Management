// src/pages/teacher/TeacherTimetable.jsx

import { useState } from "react";
import { Card } from "../../components/ui/card";
import { Calendar, Clock, BookOpen } from "lucide-react";

export default function TeacherTimetable() {
  const timeSlots = [
    "09:00-10:00",
    "10:00-11:00",
    "11:00-12:00",
    "12:00-13:00",
    "14:00-15:00",
    "15:00-16:00",
  ];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const timetable = {
    Monday: {
      "09:00-10:00": {
        subject: "Mathematics",
        class: "Class 1-A",
        room: "101",
      },
      "10:00-11:00": {
        subject: "Mathematics",
        class: "Class 2-A",
        room: "201",
      },
    },
    Tuesday: {
      "09:00-10:00": { subject: "Science", class: "Class 3-A", room: "301" },
      "11:00-12:00": { subject: "Science", class: "Class 1-B", room: "102" },
    },
    Wednesday: {
      "10:00-11:00": { subject: "English", class: "Class 2-B", room: "202" },
    },
    Thursday: {
      "09:00-10:00": {
        subject: "Mathematics",
        class: "Class 1-A",
        room: "101",
      },
    },
    Friday: {
      "11:00-12:00": { subject: "Science", class: "Class 3-A", room: "301" },
    },
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">My Timetable</h1>
        <p className="text-gray-500">Your weekly schedule</p>
      </div>
      <Card className="overflow-x-auto p-4">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Day/Time</th>
              {timeSlots.map((slot) => (
                <th key={slot} className="text-left p-2 text-sm">
                  {slot}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((day) => (
              <tr key={day} className="border-b">
                <td className="p-2 font-medium bg-gray-50">{day}</td>
                {timeSlots.map((slot) => {
                  const entry = timetable[day]?.[slot];
                  return (
                    <td key={slot} className="p-2">
                      {entry ? (
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <p className="font-medium text-sm">{entry.subject}</p>
                          <p className="text-xs text-gray-500">
                            {entry.class} | Room {entry.room}
                          </p>
                        </div>
                      ) : (
                        <span className="text-gray-300">-</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
