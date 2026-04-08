// src/pages/salary/SalaryGrade.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Award,
  Plus,
  Edit,
  Trash2,
  X,
  CheckCircle,
  AlertCircle,
  Search,
  DollarSign,
  Users,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function SalaryGrade() {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Mock Salary Grades
  const [salaryGrades, setSalaryGrades] = useState([
    { id: 1, name: "Grade A", minSalary: 50000, maxSalary: 80000, da: 12000, hra: 8000, ta: 5000, employees: 5, status: "Active" },
    { id: 2, name: "Grade B", minSalary: 35000, maxSalary: 50000, da: 8000, hra: 5000, ta: 3000, employees: 12, status: "Active" },
    { id: 3, name: "Grade C", minSalary: 25000, maxSalary: 35000, da: 6000, hra: 4000, ta: 2000, employees: 20, status: "Active" },
    { id: 4, name: "Grade D", minSalary: 18000, maxSalary: 25000, da: 4000, hra: 3000, ta: 1500, employees: 15, status: "Active" },
    { id: 5, name: "Grade E", minSalary: 12000, maxSalary: 18000, da: 2000, hra: 2000, ta: 1000, employees: 8, status: "Inactive" },
  ]);

  const [newGrade, setNewGrade] = useState({ name: "", minSalary: "", maxSalary: "", da: "", hra: "", ta: "" });
  const [editGrade, setEditGrade] = useState(null);

  const filteredGrades = salaryGrades.filter(grade =>
    grade.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddGrade = () => {
    if (!newGrade.name || !newGrade.minSalary) return;
    const newId = Math.max(...salaryGrades.map(g => g.id), 0) + 1;
    setSalaryGrades([...salaryGrades, {
      id: newId,
      name: newGrade.name,
      minSalary: parseInt(newGrade.minSalary),
      maxSalary: parseInt(newGrade.maxSalary),
      da: parseInt(newGrade.da) || 0,
      hra: parseInt(newGrade.hra) || 0,
      ta: parseInt(newGrade.ta) || 0,
      employees: 0,
      status: "Active"
    }]);
    setNewGrade({ name: "", minSalary: "", maxSalary: "", da: "", hra: "", ta: "" });
    setShowAddModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleEditGrade = () => {
    if (!editGrade.name) return;
    setSalaryGrades(salaryGrades.map(grade => grade.id === editGrade.id ? editGrade : grade));
    setShowEditModal(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDeleteGrade = () => {
    setSalaryGrades(salaryGrades.filter(grade => grade.id !== showDeleteModal));
    setShowDeleteModal(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const stats = {
    total: salaryGrades.length,
    active: salaryGrades.filter(g => g.status === "Active").length,
    totalEmployees: salaryGrades.reduce((sum, g) => sum + g.employees, 0),
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div><h1 className="text-2xl font-bold text-gray-800">Salary Grade</h1><p className="text-gray-500 mt-1">Manage salary bands and allowances</p></div>
        <div className="flex gap-2"><Button variant="outline" onClick={() => navigate("/salary")} className="flex items-center gap-2"><X className="w-4 h-4" /> Back</Button><Button onClick={() => setShowAddModal(true)} className="bg-blue-600 text-white flex items-center gap-2"><Plus className="w-4 h-4" /> Add Grade</Button></div>
      </div>

      {showSuccess && (<div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3"><CheckCircle className="w-5 h-5 text-green-600" /><span className="text-green-700">Salary grade updated successfully!</span></div>)}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card className="p-4"><div className="flex justify-between"><div><p className="text-gray-500 text-sm">Total Grades</p><p className="text-2xl font-bold">{stats.total}</p></div><div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"><Award className="w-5 h-5 text-blue-600" /></div></div></Card>
        <Card className="p-4"><div className="flex justify-between"><div><p className="text-gray-500 text-sm">Active Grades</p><p className="text-2xl font-bold">{stats.active}</p></div><div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center"><CheckCircle className="w-5 h-5 text-green-600" /></div></div></Card>
        <Card className="p-4"><div className="flex justify-between"><div><p className="text-gray-500 text-sm">Total Employees</p><p className="text-2xl font-bold">{stats.totalEmployees}</p></div><div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center"><Users className="w-5 h-5 text-purple-600" /></div></div></Card>
      </div>

      <Card className="p-4 mb-6"><div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><Input type="text" placeholder="Search by grade name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9" /></div></Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGrades.map((grade) => (
          <Card key={grade.id} className="overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-4 text-white"><div className="flex justify-between"><h3 className="text-xl font-bold">{grade.name}</h3><Badge className={grade.status === "Active" ? "bg-green-500" : "bg-gray-500"}>{grade.status}</Badge></div></div>
            <div className="p-4"><div className="space-y-2"><div className="flex justify-between"><span className="text-gray-500">Salary Range:</span><span className="font-medium">₹{grade.minSalary.toLocaleString()} - ₹{grade.maxSalary.toLocaleString()}</span></div><div className="flex justify-between"><span className="text-gray-500">DA:</span><span>₹{grade.da.toLocaleString()}</span></div><div className="flex justify-between"><span className="text-gray-500">HRA:</span><span>₹{grade.hra.toLocaleString()}</span></div><div className="flex justify-between"><span className="text-gray-500">TA:</span><span>₹{grade.ta.toLocaleString()}</span></div><div className="flex justify-between pt-2 border-t"><span className="text-gray-500">Employees:</span><span className="font-bold">{grade.employees}</span></div></div>
            <div className="flex gap-2 mt-4 pt-3 border-t"><Button variant="outline" size="sm" onClick={() => setShowEditModal(grade)} className="flex-1"><Edit className="w-4 h-4 mr-1" /> Edit</Button><Button variant="outline" size="sm" onClick={() => setShowDeleteModal(grade.id)} className="text-red-600"><Trash2 className="w-4 h-4" /></Button></div></div>
          </Card>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"><div className="bg-white rounded-xl w-full max-w-md mx-4 p-6"><div className="flex justify-between items-center mb-4"><h2 className="text-xl font-semibold">Add Salary Grade</h2><button onClick={() => setShowAddModal(false)}><X className="w-5 h-5" /></button></div>
        <div className="space-y-4"><div><label className="block text-sm font-medium mb-1">Grade Name *</label><Input value={newGrade.name} onChange={(e) => setNewGrade({ ...newGrade, name: e.target.value })} placeholder="e.g., Grade A" /></div>
        <div className="grid grid-cols-2 gap-3"><div><label className="block text-sm font-medium mb-1">Min Salary</label><Input type="number" value={newGrade.minSalary} onChange={(e) => setNewGrade({ ...newGrade, minSalary: e.target.value })} placeholder="Min" /></div><div><label className="block text-sm font-medium mb-1">Max Salary</label><Input type="number" value={newGrade.maxSalary} onChange={(e) => setNewGrade({ ...newGrade, maxSalary: e.target.value })} placeholder="Max" /></div></div>
        <div className="grid grid-cols-3 gap-3"><div><label className="block text-sm font-medium mb-1">DA</label><Input type="number" value={newGrade.da} onChange={(e) => setNewGrade({ ...newGrade, da: e.target.value })} placeholder="DA" /></div><div><label className="block text-sm font-medium mb-1">HRA</label><Input type="number" value={newGrade.hra} onChange={(e) => setNewGrade({ ...newGrade, hra: e.target.value })} placeholder="HRA" /></div><div><label className="block text-sm font-medium mb-1">TA</label><Input type="number" value={newGrade.ta} onChange={(e) => setNewGrade({ ...newGrade, ta: e.target.value })} placeholder="TA" /></div></div></div>
        <div className="flex gap-3 mt-6"><Button variant="outline" onClick={() => setShowAddModal(false)} className="flex-1">Cancel</Button><Button onClick={handleAddGrade} className="flex-1 bg-blue-600 text-white">Add Grade</Button></div></div></div>)}

      {/* Edit Modal */}
      {showEditModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"><div className="bg-white rounded-xl w-full max-w-md mx-4 p-6"><div className="flex justify-between items-center mb-4"><h2 className="text-xl font-semibold">Edit Salary Grade</h2><button onClick={() => setShowEditModal(null)}><X className="w-5 h-5" /></button></div>
        <div className="space-y-4"><div><label className="block text-sm font-medium mb-1">Grade Name</label><Input value={editGrade.name} onChange={(e) => setEditGrade({ ...editGrade, name: e.target.value })} /></div>
        <div className="grid grid-cols-2 gap-3"><div><label className="block text-sm font-medium mb-1">Min Salary</label><Input type="number" value={editGrade.minSalary} onChange={(e) => setEditGrade({ ...editGrade, minSalary: e.target.value })} /></div><div><label className="block text-sm font-medium mb-1">Max Salary</label><Input type="number" value={editGrade.maxSalary} onChange={(e) => setEditGrade({ ...editGrade, maxSalary: e.target.value })} /></div></div>
        <div className="grid grid-cols-3 gap-3"><div><label className="block text-sm font-medium mb-1">DA</label><Input type="number" value={editGrade.da} onChange={(e) => setEditGrade({ ...editGrade, da: e.target.value })} /></div><div><label className="block text-sm font-medium mb-1">HRA</label><Input type="number" value={editGrade.hra} onChange={(e) => setEditGrade({ ...editGrade, hra: e.target.value })} /></div><div><label className="block text-sm font-medium mb-1">TA</label><Input type="number" value={editGrade.ta} onChange={(e) => setEditGrade({ ...editGrade, ta: e.target.value })} /></div></div>
        <div><label className="block text-sm font-medium mb-1">Status</label><select value={editGrade.status} onChange={(e) => setEditGrade({ ...editGrade, status: e.target.value })} className="w-full px-3 py-2 border rounded-lg"><option value="Active">Active</option><option value="Inactive">Inactive</option></select></div></div>
        <div className="flex gap-3 mt-6"><Button variant="outline" onClick={() => setShowEditModal(null)} className="flex-1">Cancel</Button><Button onClick={handleEditGrade} className="flex-1 bg-blue-600 text-white">Save Changes</Button></div></div></div>)}

      {/* Delete Modal */}
      {showDeleteModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"><div className="bg-white rounded-xl w-full max-w-md p-6 text-center"><div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><Trash2 className="w-6 h-6 text-red-600" /></div><h3 className="text-lg font-semibold mb-2">Delete Salary Grade</h3><p className="text-gray-500 mb-6">Are you sure you want to delete this salary grade?</p><div className="flex gap-3"><Button variant="outline" onClick={() => setShowDeleteModal(null)}>Cancel</Button><Button onClick={handleDeleteGrade} className="bg-red-600 text-white">Delete</Button></div></div></div>)}

      <Card className="mt-6 p-4 bg-blue-50 border-blue-200"><div className="flex gap-3"><AlertCircle className="w-5 h-5 text-blue-600" /><div><p className="font-medium text-blue-800">About Salary Grade</p><p className="text-sm text-blue-700">Salary grades define pay bands and allowances for different employee levels.</p></div></div></Card>
    </div>
  );
}
