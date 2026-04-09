import { useState } from "react";
import { BookOpen, Users } from "lucide-react";

export default function TeacherMyClasses() {
  const [classes] = useState([
    {
      id: 1,
      name: "Class 1-A",
      section: "A",
      subject: "Mathematics",
      totalStudents: 35,
      nextClass: "Tomorrow 09:00 AM",
    },
    {
      id: 2,
      name: "Class 2-B",
      section: "B",
      subject: "Science",
      totalStudents: 32,
      nextClass: "Today 11:00 AM",
    },
    {
      id: 3,
      name: "Class 3-A",
      section: "A",
      subject: "English",
      totalStudents: 38,
      nextClass: "Friday 10:00 AM",
    },
  ]);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">My Classes</h1>
        <p className="text-gray-500">Classes you are assigned to teach</p>
      </div>

      <div className="bg-white shadow-md rounded-lg border p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-gray-50 rounded-lg text-center">
            <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800">{classes.length}</p>
            <p className="text-sm text-gray-500">Total Classes</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg text-center">
            <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800">
              {classes.reduce((sum, c) => sum + c.totalStudents, 0)}
            </p>
            <p className="text-sm text-gray-500">Total Students</p>
          </div>
        </div>

        <table className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Class</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Students</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Next Class</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((cls) => (
              <tr key={cls.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 border-b">
                  {cls.name} ({cls.section})
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900 border-b">{cls.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900 border-b">{cls.totalStudents}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900 border-b">{cls.nextClass}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900 border-b">
                  <div className="flex gap-2">
                    <button className="text-blue-600 hover:underline text-sm font-medium">Students</button>
                    <button className="text-green-600 hover:underline text-sm font-medium">Attendance</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
