import { useState } from "react";
import { Users, CheckCircle, Clock } from "lucide-react";

export default function TeacherMyStudents() {
  const [students] = useState([
    {
      id: 1,
      name: "Ahmed Khan",
      class: "Class 1-A",
      rollNo: "001",
      attendance: 95,
      status: "Active",
    },
    {
      id: 2,
      name: "Ayesha Malik",
      class: "Class 1-A",
      rollNo: "002",
      attendance: 88,
      status: "Active",
    },
    {
      id: 3,
      name: "Bilal Ahmed",
      class: "Class 2-B",
      rollNo: "015",
      attendance: 92,
      status: "Active",
    },
    {
      id: 4,
      name: "Fatima Zahra",
      class: "Class 2-B",
      rollNo: "016",
      attendance: 78,
      status: "Warning",
    },
  ]);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">My Students</h1>
        <p className="text-gray-500">Students assigned to your classes</p>
      </div>

      <div className="bg-white shadow-md rounded-lg border p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-gray-50 rounded-lg text-center">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800">{students.length}</p>
            <p className="text-sm text-gray-500">Total Students</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg text-center">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800">
              {students.filter((s) => s.attendance >= 90).length}
            </p>
            <p className="text-sm text-gray-500">High Attendance</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg text-center">
            <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800">
              {students.filter((s) => s.attendance < 85).length}
            </p>
            <p className="text-sm text-gray-500">Needs Attention</p>
          </div>
        </div>

        <table className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Student</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Class</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Roll No</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Attendance</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 border-b">{student.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900 border-b">{student.class}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900 border-b">{student.rollNo}</td>
                <td className="px-6 py-4 whitespace-nowrap border-b">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    student.attendance >= 90 ? 'bg-green-100 text-green-800' :
                    student.attendance >= 85 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {student.attendance}%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    student.status === 'Active' ? 'bg-green-100 text-green-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {student.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900 border-b">
                  <div className="flex gap-2">
                    <button className="text-blue-600 hover:underline text-sm font-medium">Details</button>
                    <button className="text-green-600 hover:underline text-sm font-medium">Marks</button>
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
