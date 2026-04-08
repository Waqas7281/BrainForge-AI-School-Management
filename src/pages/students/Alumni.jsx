// src/pages/students/Alumni.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Search,
  Eye,
  Download,
  Printer,
  X,
  Calendar,
  BookOpen,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Filter,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function Alumni() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("all");
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Mock Alumni Data
  const alumniData = [
    { 
      id: "ALU001", 
      name: "Diana Prince", 
      passingYear: "2024",
      lastClass: "Class 10",
      section: "A",
      rollNo: "301",
      email: "diana.p@alumni.edu",
      phone: "(555) 456-7890",
      address: "321 Elm St, NY",
      currentStatus: "University Student",
      institution: "Stanford University",
      course: "Computer Science",
      achievement: "School Topper 2024",
      bloodGroup: "AB+",
    },
    { 
      id: "ALU002", 
      name: "Ethan Hunt", 
      passingYear: "2024",
      lastClass: "Class 10",
      section: "B",
      rollNo: "302",
      email: "ethan.h@alumni.edu",
      phone: "(555) 567-8901",
      address: "654 Cedar Ln, NY",
      currentStatus: "Working Professional",
      institution: "Google Inc.",
      course: "Software Engineer",
      achievement: "Best Student Award",
      bloodGroup: "O+",
    },
    { 
      id: "ALU003", 
      name: "Fiona Green", 
      passingYear: "2023",
      lastClass: "Class 10",
      section: "A",
      rollNo: "201",
      email: "fiona.g@alumni.edu",
      phone: "(555) 678-9012",
      address: "987 Birch Dr, NY",
      currentStatus: "University Student",
      institution: "MIT",
      course: "Engineering",
      achievement: "Science Olympiad Winner",
      bloodGroup: "A+",
    },
    { 
      id: "ALU004", 
      name: "George Wilson", 
      passingYear: "2023",
      lastClass: "Class 10",
      section: "B",
      rollNo: "202",
      email: "george.w@alumni.edu",
      phone: "(555) 789-0123",
      address: "147 Spruce Way, NY",
      currentStatus: "Entrepreneur",
      institution: "Startup Founder",
      course: "Tech Startup",
      achievement: "Young Entrepreneur Award",
      bloodGroup: "B+",
    },
    { 
      id: "ALU005", 
      name: "Hannah Lee", 
      passingYear: "2022",
      lastClass: "Class 10",
      section: "C",
      rollNo: "101",
      email: "hannah.l@alumni.edu",
      phone: "(555) 890-1234",
      address: "258 Maple Ave, NY",
      currentStatus: "Medical Student",
      institution: "Harvard Medical School",
      course: "MBBS",
      achievement: "National Merit Scholar",
      bloodGroup: "O-",
    },
  ];

  const batches = ["all", ...new Set(alumniData.map(a => a.passingYear))];
  const classes = ["all", ...new Set(alumniData.map(a => a.lastClass))];

  const filteredAlumni = alumniData.filter((alumni) => {
    const matchesSearch = 
      alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.rollNo.includes(searchTerm);
    
    const matchesBatch = selectedBatch === "all" || alumni.passingYear === selectedBatch;
    const matchesClass = selectedClass === "all" || alumni.lastClass === selectedClass;
    
    return matchesSearch && matchesBatch && matchesClass;
  });

  const stats = {
    total: alumniData.length,
    university: alumniData.filter(a => a.currentStatus === "University Student").length,
    working: alumniData.filter(a => a.currentStatus === "Working Professional").length,
    entrepreneur: alumniData.filter(a => a.currentStatus === "Entrepreneur").length,
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case "University Student": return "bg-blue-100 text-blue-700";
      case "Working Professional": return "bg-green-100 text-green-700";
      case "Entrepreneur": return "bg-purple-100 text-purple-700";
      case "Medical Student": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const handleViewDetails = (alumni) => {
    setSelectedStudent(alumni);
    setShowDetailsModal(true);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Alumni</h1>
          <p className="text-gray-500 mt-1">Manage passed out students and their achievements</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2"><Printer className="w-4 h-4" /> Print</Button>
          <Button variant="outline" className="flex items-center gap-2"><Download className="w-4 h-4" /> Export</Button>
          <Button variant="outline" onClick={() => navigate("/students")} className="flex items-center gap-2"><X className="w-4 h-4" /> Back</Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div><p className="text-gray-500 text-sm">Total Alumni</p><p className="text-2xl font-bold text-gray-800">{stats.total}</p></div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"><Users className="w-5 h-5 text-blue-600" /></div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div><p className="text-gray-500 text-sm">University Students</p><p className="text-2xl font-bold text-gray-800">{stats.university}</p></div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center"><GraduationCap className="w-5 h-5 text-green-600" /></div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div><p className="text-gray-500 text-sm">Working Professionals</p><p className="text-2xl font-bold text-gray-800">{stats.working}</p></div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center"><Briefcase className="w-5 h-5 text-purple-600" /></div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div><p className="text-gray-500 text-sm">Entrepreneurs</p><p className="text-2xl font-bold text-gray-800">{stats.entrepreneur}</p></div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center"><Award className="w-5 h-5 text-orange-600" /></div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input type="text" placeholder="Search by name, ID, or roll number..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9" />
          </div>
          <select value={selectedBatch} onChange={(e) => setSelectedBatch(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg">
            {batches.map(b => <option key={b} value={b}>{b === "all" ? "All Batches" : `Batch ${b}`}</option>)}
          </select>
          <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg">
            {classes.map(c => <option key={c} value={c}>{c === "all" ? "All Classes" : c}</option>)}
          </select>
        </div>
      </Card>

      {/* Alumni Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Alumni</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Passing Year</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Last Class</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Contact</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Current Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Institution/Company</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAlumni.map((alumni) => (
                <tr key={alumni.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                        {alumni.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">{alumni.name}</div>
                        <div className="text-xs text-gray-500">ID: {alumni.id} | Roll: {alumni.rollNo}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge className="bg-blue-100 text-blue-700">{alumni.passingYear}</Badge>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{alumni.lastClass} - {alumni.section}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 text-sm text-gray-600"><Mail className="w-3 h-3" />{alumni.email}</div>
                    <div className="flex items-center gap-1 text-sm text-gray-600"><Phone className="w-3 h-3" />{alumni.phone}</div>
                   </td>
                  <td className="px-4 py-3"><Badge className={getStatusBadge(alumni.currentStatus)}>{alumni.currentStatus}</Badge></td>
                  <td className="px-4 py-3 text-gray-700">{alumni.institution}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => handleViewDetails(alumni)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg" title="View Details"><Eye className="w-4 h-4" /></button>
                  </td>
                 </tr>
              ))}
            </tbody>
           </table>
        </div>

        {filteredAlumni.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"><Users className="w-8 h-8 text-gray-400" /></div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">No alumni found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </Card>

      {/* Alumni Details Modal */}
      {showDetailsModal && selectedStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-xl w-full max-w-2xl mx-4 my-8 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 text-white">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
                    {selectedStudent.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedStudent.name}</h2>
                    <p className="text-white/80">Alumni ID: {selectedStudent.id}</p>
                  </div>
                </div>
                <button onClick={() => setShowDetailsModal(false)} className="p-1 hover:bg-white/20 rounded-lg"><X className="w-5 h-5" /></button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2"><UserCheck className="w-4 h-4 text-blue-600" /> Personal Information</h3>
                  <div className="space-y-2">
                    <p className="flex justify-between"><span className="text-gray-500">Full Name:</span><span className="font-medium">{selectedStudent.name}</span></p>
                    <p className="flex justify-between"><span className="text-gray-500">Blood Group:</span><span>{selectedStudent.bloodGroup}</span></p>
                    <p className="flex justify-between"><span className="text-gray-500">Email:</span><span>{selectedStudent.email}</span></p>
                    <p className="flex justify-between"><span className="text-gray-500">Phone:</span><span>{selectedStudent.phone}</span></p>
                    <p className="flex justify-between"><span className="text-gray-500">Address:</span><span>{selectedStudent.address}</span></p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2"><GraduationCap className="w-4 h-4 text-green-600" /> Academic Information</h3>
                  <div className="space-y-2">
                    <p className="flex justify-between"><span className="text-gray-500">Passing Year:</span><span className="font-medium">{selectedStudent.passingYear}</span></p>
                    <p className="flex justify-between"><span className="text-gray-500">Last Class:</span><span>{selectedStudent.lastClass} - Section {selectedStudent.section}</span></p>
                    <p className="flex justify-between"><span className="text-gray-500">Roll Number:</span><span>{selectedStudent.rollNo}</span></p>
                    <p className="flex justify-between"><span className="text-gray-500">Achievement:</span><span className="text-amber-600 font-medium">{selectedStudent.achievement}</span></p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2"><Briefcase className="w-4 h-4 text-purple-600" /> Current Status</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="flex justify-between"><span className="text-gray-500">Status:</span><Badge className={getStatusBadge(selectedStudent.currentStatus)}>{selectedStudent.currentStatus}</Badge></p>
                  <p className="flex justify-between mt-2"><span className="text-gray-500">Institution/Company:</span><span className="font-medium">{selectedStudent.institution}</span></p>
                  <p className="flex justify-between mt-2"><span className="text-gray-500">Course/Position:</span><span>{selectedStudent.course}</span></p>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-gray-50 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowDetailsModal(false)}>Close</Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Contact Alumni</Button>
            </div>
          </div>
        </div>
      )}

      {/* Info Box */}
      <Card className="mt-6 p-4 bg-purple-50 border-purple-200">
        <div className="flex gap-3">
          <Award className="w-5 h-5 text-purple-600" />
          <div>
            <p className="font-medium text-purple-800">Alumni Network</p>
            <p className="text-sm text-purple-700">Stay connected with passed out students. Track their achievements and maintain alumni relations for future collaborations.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}