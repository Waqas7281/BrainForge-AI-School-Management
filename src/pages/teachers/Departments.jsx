// src/pages/teachers/Departments.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Users,
  BookOpen,
  Search,
  UserCheck,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function Departments() {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Mock Departments Data
  const [departments, setDepartments] = useState([
    { id: 1, name: "Mathematics", code: "MATH", hod: "Dr. Sarah Wilson", teachersCount: 8, studentsCount: 320, status: "Active" },
    { id: 2, name: "Science", code: "SCI", hod: "Ms. Emily Davis", teachersCount: 10, studentsCount: 380, status: "Active" },
    { id: 3, name: "Languages", code: "LANG", hod: "Prof. James Brown", teachersCount: 6, studentsCount: 350, status: "Active" },
    { id: 4, name: "Social Studies", code: "SOC", hod: "Mrs. Lisa Anderson", teachersCount: 5, studentsCount: 340, status: "Active" },
    { id: 5, name: "Computer Science", code: "CS", hod: "Mr. Michael Lee", teachersCount: 4, studentsCount: 180, status: "Active" },
    { id: 6, name: "Arts", code: "ART", hod: "Ms. Patricia White", teachersCount: 3, studentsCount: 120, status: "Inactive" },
    { id: 7, name: "Physical Education", code: "PE", hod: "Mr. Robert Johnson", teachersCount: 3, studentsCount: 400, status: "Active" },
  ]);

  const [newDept, setNewDept] = useState({ name: "", code: "", hod: "" });
  const [editDept, setEditDept] = useState(null);

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.hod.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDept = () => {
    if (!newDept.name) return;
    const newId = Math.max(...departments.map(d => d.id), 0) + 1;
    setDepartments([...departments, {
      id: newId,
      name: newDept.name,
      code: newDept.code,
      hod: newDept.hod || "Not Assigned",
      teachersCount: 0,
      studentsCount: 0,
      status: "Active"
    }]);
    setNewDept({ name: "", code: "", hod: "" });
    setShowAddModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleEditDept = () => {
    if (!editDept.name) return;
    setDepartments(departments.map(dept => dept.id === editDept.id ? editDept : dept));
    setShowEditModal(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDeleteDept = () => {
    setDepartments(departments.filter(dept => dept.id !== showDeleteModal));
    setShowDeleteModal(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const stats = {
    total: departments.length,
    active: departments.filter(d => d.status === "Active").length,
    totalTeachers: departments.reduce((sum, d) => sum + d.teachersCount, 0),
    totalStudents: departments.reduce((sum, d) => sum + d.studentsCount, 0),
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Departments</h1>
          <p className="text-gray-500 mt-1">Manage academic departments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate("/teachers")} className="flex items-center gap-2"><X className="w-4 h-4" /> Back</Button>
          <Button onClick={() => setShowAddModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"><Plus className="w-4 h-4" /> Add Department</Button>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (<div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-600" /><span className="text-green-700 font-medium">Department updated successfully!</span></div>)}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <Card className="p-4"><div className="flex justify-between"><div><p className="text-gray-500 text-sm">Total Departments</p><p className="text-2xl font-bold">{stats.total}</p></div><div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"><Building2 className="w-5 h-5 text-blue-600" /></div></div></Card>
        <Card className="p-4"><div className="flex justify-between"><div><p className="text-gray-500 text-sm">Active Departments</p><p className="text-2xl font-bold">{stats.active}</p></div><div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center"><CheckCircle className="w-5 h-5 text-green-600" /></div></div></Card>
        <Card className="p-4"><div className="flex justify-between"><div><p className="text-gray-500 text-sm">Total Teachers</p><p className="text-2xl font-bold">{stats.totalTeachers}</p></div><div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center"><UserCheck className="w-5 h-5 text-purple-600" /></div></div></Card>
        <Card className="p-4"><div className="flex justify-between"><div><p className="text-gray-500 text-sm">Total Students</p><p className="text-2xl font-bold">{stats.totalStudents}</p></div><div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center"><Users className="w-5 h-5 text-orange-600" /></div></div></Card>
      </div>

      {/* Search */}
      <Card className="p-4 mb-6">
        <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><Input type="text" placeholder="Search by department name, code, or HOD..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9" /></div>
      </Card>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDepartments.map((dept) => (
          <Card key={dept.id} className="overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2"><Building2 className="w-6 h-6" /><h3 className="text-xl font-bold">{dept.name}</h3></div>
                <Badge className={dept.status === "Active" ? "bg-green-500 text-white" : "bg-gray-500 text-white"}>{dept.status}</Badge>
              </div>
              <p className="text-white/80 text-sm mt-1">Code: {dept.code}</p>
            </div>
            <div className="p-4">
              <div className="mb-3"><p className="text-sm text-gray-600"><UserCheck className="w-4 h-4 inline mr-1" /> Head of Department: <span className="font-medium">{dept.hod}</span></p></div>
              <div className="flex justify-between mb-3"><span className="text-gray-500 text-sm"><Users className="w-4 h-4 inline mr-1" /> Teachers: {dept.teachersCount}</span><span className="text-gray-500 text-sm"><BookOpen className="w-4 h-4 inline mr-1" /> Students: {dept.studentsCount}</span></div>
              <div className="flex gap-2 pt-3 border-t border-gray-100"><Button variant="outline" size="sm" onClick={() => setShowEditModal(dept)} className="flex-1"><Edit className="w-4 h-4 mr-1" /> Edit</Button><Button variant="outline" size="sm" onClick={() => setShowDeleteModal(dept.id)} className="text-red-600"><Trash2 className="w-4 h-4" /></Button></div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Department Modal */}
      {showAddModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"><div className="bg-white rounded-xl w-full max-w-md mx-4 p-6"><div className="flex justify-between items-center mb-4"><h2 className="text-xl font-semibold">Add Department</h2><button onClick={() => setShowAddModal(false)}><X className="w-5 h-5" /></button></div>
        <div className="space-y-4"><div><label className="block text-sm font-medium mb-1">Department Name *</label><Input value={newDept.name} onChange={(e) => setNewDept({ ...newDept, name: e.target.value })} placeholder="e.g., Mathematics" /></div>
        <div><label className="block text-sm font-medium mb-1">Department Code *</label><Input value={newDept.code} onChange={(e) => setNewDept({ ...newDept, code: e.target.value })} placeholder="e.g., MATH" /></div>
        <div><label className="block text-sm font-medium mb-1">Head of Department</label><Input value={newDept.hod} onChange={(e) => setNewDept({ ...newDept, hod: e.target.value })} placeholder="Select teacher" /></div></div>
        <div className="flex gap-3 mt-6"><Button variant="outline" onClick={() => setShowAddModal(false)} className="flex-1">Cancel</Button><Button onClick={handleAddDept} className="flex-1 bg-blue-600 text-white">Add Department</Button></div></div></div>)}

      {/* Edit Department Modal */}
      {showEditModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"><div className="bg-white rounded-xl w-full max-w-md mx-4 p-6"><div className="flex justify-between items-center mb-4"><h2 className="text-xl font-semibold">Edit Department</h2><button onClick={() => setShowEditModal(null)}><X className="w-5 h-5" /></button></div>
        <div className="space-y-4"><div><label className="block text-sm font-medium mb-1">Department Name *</label><Input value={editDept.name} onChange={(e) => setEditDept({ ...editDept, name: e.target.value })} /></div>
        <div><label className="block text-sm font-medium mb-1">Department Code *</label><Input value={editDept.code} onChange={(e) => setEditDept({ ...editDept, code: e.target.value })} /></div>
        <div><label className="block text-sm font-medium mb-1">Head of Department</label><Input value={editDept.hod} onChange={(e) => setEditDept({ ...editDept, hod: e.target.value })} /></div>
        <div><label className="block text-sm font-medium mb-1">Status</label><select value={editDept.status} onChange={(e) => setEditDept({ ...editDept, status: e.target.value })} className="w-full px-3 py-2 border rounded-lg"><option value="Active">Active</option><option value="Inactive">Inactive</option></select></div></div>
        <div className="flex gap-3 mt-6"><Button variant="outline" onClick={() => setShowEditModal(null)} className="flex-1">Cancel</Button><Button onClick={handleEditDept} className="flex-1 bg-blue-600 text-white">Save Changes</Button></div></div></div>)}

      {/* Delete Modal */}
      {showDeleteModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"><div className="bg-white rounded-xl w-full max-w-md p-6 text-center"><div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><Trash2 className="w-6 h-6 text-red-600" /></div><h3 className="text-lg font-semibold mb-2">Delete Department</h3><p className="text-gray-500 mb-6">Are you sure you want to delete this department? Teachers and subjects in this department will be affected.</p><div className="flex gap-3"><Button variant="outline" onClick={() => setShowDeleteModal(null)}>Cancel</Button><Button onClick={handleDeleteDept} className="bg-red-600 text-white">Delete</Button></div></div></div>)}

      {/* Info Box */}
      <Card className="mt-6 p-4 bg-blue-50 border-blue-200"><div className="flex gap-3"><AlertCircle className="w-5 h-5 text-blue-600" /><div><p className="font-medium text-blue-800">About Departments</p><p className="text-sm text-blue-700">Departments organize teachers by subject specialization. Each department has a Head of Department (HOD) who manages the department.</p></div></div></Card>
    </div>
  );
}
