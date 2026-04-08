
// src/pages/announcements/AllAnnouncements.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
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
  Calendar,
  Users,
  Flag,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function AllAnnouncements() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  // Mock Announcements Data
  const [announcements, setAnnouncements] = useState([
    { 
      id: 1, 
      title: "School Closed Tomorrow", 
      content: "Due to heavy rainfall, school will remain closed tomorrow. All exams are postponed.",
      priority: "Urgent",
      targetAudience: "All",
      publishDate: "2024-05-15",
      expiryDate: "2024-05-16",
      status: "Active",
      createdBy: "Admin",
    },
    { 
      id: 2, 
      title: "PTM Schedule", 
      content: "Parent-Teacher Meeting scheduled for May 20, 2024. Please attend.",
      priority: "High",
      targetAudience: "Parents",
      publishDate: "2024-05-10",
      expiryDate: "2024-05-20",
      status: "Active",
      createdBy: "Admin",
    },
    { 
      id: 3, 
      title: "Fee Submission Deadline", 
      content: "Last date for fee submission is May 30, 2024. Late fee will be charged.",
      priority: "Normal",
      targetAudience: "Parents",
      publishDate: "2024-05-01",
      expiryDate: "2024-05-30",
      status: "Active",
      createdBy: "Admin",
    },
    { 
      id: 4, 
      title: "Holiday Notice", 
      content: "School will remain closed on May 1st for Labor Day.",
      priority: "Low",
      targetAudience: "All",
      publishDate: "2024-04-25",
      expiryDate: "2024-05-01",
      status: "Expired",
      createdBy: "Admin",
    },
  ]);

  const priorities = ["all", "Urgent", "High", "Normal", "Low"];

  const filteredAnnouncements = announcements.filter(ann => {
    const matchesSearch = ann.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ann.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = selectedPriority === "all" || ann.priority === selectedPriority;
    return matchesSearch && matchesPriority;
  });

  const handleDelete = () => {
    setAnnouncements(announcements.filter(ann => ann.id !== showDeleteModal));
    setShowDeleteModal(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const getPriorityBadge = (priority) => {
    switch(priority) {
      case "Urgent": return "bg-red-100 text-red-700";
      case "High": return "bg-orange-100 text-orange-700";
      case "Normal": return "bg-blue-100 text-blue-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">All Announcements</h1>
          <p className="text-gray-500 mt-1">Manage all announcements</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => navigate("/announcements/add")} className="bg-blue-600 text-white flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Announcement
          </Button>
          <Button variant="outline" onClick={() => navigate("/announcements")} className="flex items-center gap-2">
            <X className="w-4 h-4" /> Back
          </Button>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-700 font-medium">Announcement deleted successfully!</span>
        </div>
      )}

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input type="text" placeholder="Search announcements..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9" />
          </div>
          <select value={selectedPriority} onChange={(e) => setSelectedPriority(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg">
            {priorities.map(p => <option key={p} value={p}>{p === "all" ? "All Priorities" : p}</option>)}
          </select>
          <Button variant="outline" className="flex items-center gap-2"><Download className="w-4 h-4" /> Export</Button>
        </div>
      </Card>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.map((ann) => (
          <Card key={ann.id} className={`p-5 ${ann.priority === "Urgent" ? "border-l-4 border-l-red-500" : ""}`}>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <Badge className={getPriorityBadge(ann.priority)}>{ann.priority}</Badge>
                  <Badge className="bg-purple-100 text-purple-700">{ann.targetAudience}</Badge>
                  <Badge className={ann.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}>{ann.status}</Badge>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{ann.title}</h3>
                <p className="text-gray-600 mb-3">{ann.content}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Published: {ann.publishDate}</span>
                  {ann.expiryDate && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Expires: {ann.expiryDate}</span>}
                  <span>By: {ann.createdBy}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setSelectedAnnouncement(ann); setShowViewModal(true); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Eye className="w-4 h-4" /></button>
                <button className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg"><Edit className="w-4 h-4" /></button>
                <button onClick={() => setShowDeleteModal(ann.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredAnnouncements.length === 0 && (
        <Card className="p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"><Bell className="w-8 h-8 text-gray-400" /></div>
          <h3 className="text-lg font-semibold text-gray-800">No announcements found</h3>
          <p className="text-gray-500">Click "Add Announcement" to create your first announcement</p>
        </Card>
      )}

      {/* View Modal */}
      {showViewModal && selectedAnnouncement && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-2xl mx-4 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">{selectedAnnouncement.title}</h2>
              <button onClick={() => setShowViewModal(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div className="flex gap-2 flex-wrap"><Badge className={getPriorityBadge(selectedAnnouncement.priority)}>{selectedAnnouncement.priority}</Badge><Badge className="bg-purple-100 text-purple-700">{selectedAnnouncement.targetAudience}</Badge></div>
              <p className="text-gray-700">{selectedAnnouncement.content}</p>
              <div className="bg-gray-50 rounded-lg p-3"><div className="flex justify-between text-sm"><span className="text-gray-500">Published:</span><span>{selectedAnnouncement.publishDate}</span></div><div className="flex justify-between text-sm mt-1"><span className="text-gray-500">Expires:</span><span>{selectedAnnouncement.expiryDate || "Never"}</span></div><div className="flex justify-between text-sm mt-1"><span className="text-gray-500">Created By:</span><span>{selectedAnnouncement.createdBy}</span></div></div>
            </div>
            <div className="flex gap-3 mt-6"><Button variant="outline" onClick={() => setShowViewModal(false)} className="flex-1">Close</Button><Button className="flex-1 bg-blue-600 text-white">Send Notification</Button></div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><Trash2 className="w-6 h-6 text-red-600" /></div>
            <h3 className="text-lg font-semibold mb-2">Delete Announcement</h3>
            <p className="text-gray-500 mb-6">Are you sure you want to delete this announcement?</p>
            <div className="flex gap-3"><Button variant="outline" onClick={() => setShowDeleteModal(null)} className="flex-1">Cancel</Button><Button onClick={handleDelete} className="flex-1 bg-red-600 text-white">Delete</Button></div>
          </div>
        </div>
      )}

      {/* Info Box */}
      <Card className="mt-6 p-4 bg-blue-50 border-blue-200">
        <div className="flex gap-3"><AlertCircle className="w-5 h-5 text-blue-600" /><div><p className="font-medium text-blue-800">About Announcements</p><p className="text-sm text-blue-700">View and manage all announcements. Urgent announcements are highlighted.</p></div></div>
      </Card>
    </div>
  );
}