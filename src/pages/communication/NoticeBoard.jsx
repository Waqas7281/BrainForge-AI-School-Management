// src/pages/communication/NoticeBoard.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Plus,
  Edit,
  Trash2,
  Eye,
  X,
  CheckCircle,
  AlertCircle,
  Search,
  Calendar,
  Users,
  Send,
  Pin,
  Clock,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function NoticeBoard() {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock Notices Data
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "School Closed for Summer Break",
      content:
        "School will remain closed from June 1 to June 30 for summer vacation.",
      category: "Holiday",
      targetAudience: "All",
      publishDate: "2024-05-25",
      expiryDate: "2024-06-30",
      isPinned: true,
      status: "Active",
      createdBy: "Admin",
    },
    {
      id: 2,
      title: "Parent-Teacher Meeting",
      content:
        "Parent-Teacher meeting will be held on May 20, 2024 at 10:00 AM in the school auditorium.",
      category: "Event",
      targetAudience: "Parents",
      publishDate: "2024-05-10",
      expiryDate: "2024-05-20",
      isPinned: true,
      status: "Active",
      createdBy: "Admin",
    },
    {
      id: 3,
      title: "Annual Sports Day",
      content:
        "Annual Sports Day will be celebrated on May 25, 2024. All students are requested to participate.",
      category: "Event",
      targetAudience: "Students",
      publishDate: "2024-05-15",
      expiryDate: "2024-05-25",
      isPinned: false,
      status: "Active",
      createdBy: "Admin",
    },
    {
      id: 4,
      title: "Fee Submission Deadline",
      content:
        "Last date for fee submission is May 30, 2024. Late fee will be charged after that.",
      category: "Academic",
      targetAudience: "Parents",
      publishDate: "2024-05-01",
      expiryDate: "2024-05-30",
      isPinned: false,
      status: "Active",
      createdBy: "Admin",
    },
  ]);

  const [newNotice, setNewNotice] = useState({
    title: "",
    content: "",
    category: "General",
    targetAudience: "All",
    publishDate: new Date().toISOString().split("T")[0],
    expiryDate: "",
    isPinned: false,
  });
  const [editNotice, setEditNotice] = useState(null);

  const categories = [
    "All",
    "General",
    "Academic",
    "Event",
    "Holiday",
    "Exam",
    "Urgent",
  ];
  const audiences = ["All", "Students", "Parents", "Teachers", "Staff"];

  const filteredNotices = notices.filter((notice) => {
    const matchesSearch =
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || notice.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddNotice = () => {
    if (!newNotice.title || !newNotice.content) return;
    const newId = Math.max(...notices.map((n) => n.id), 0) + 1;
    setNotices(
      [
        newNotice,
        ...notices.map((n) => ({
          ...n,
          isPinned: newNotice.isPinned ? false : n.isPinned,
        })),
      ].map((n, idx) => ({ ...n, id: idx === 0 ? newId : n.id })),
    );
    setNewNotice({
      title: "",
      content: "",
      category: "General",
      targetAudience: "All",
      publishDate: new Date().toISOString().split("T")[0],
      expiryDate: "",
      isPinned: false,
    });
    setShowAddModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleEditNotice = () => {
    if (!editNotice.title || !editNotice.content) return;
    setNotices(
      notices.map((notice) =>
        notice.id === editNotice.id ? editNotice : notice,
      ),
    );
    setShowEditModal(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDeleteNotice = () => {
    setNotices(notices.filter((notice) => notice.id !== showDeleteModal));
    setShowDeleteModal(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleTogglePin = (noticeId) => {
    setNotices(
      notices.map((notice) => ({
        ...notice,
        isPinned:
          notice.id === noticeId
            ? !notice.isPinned
            : notice.id === noticeId
              ? notice.isPinned
              : false,
      })),
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Notice Board</h1>
          <p className="text-gray-500 mt-1">
            Manage school notices and announcements
          </p>
        </div>
        <Button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Notice
        </Button>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-700 font-medium">
            Notice saved successfully!
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
              placeholder="Search notices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          >
            {categories.map((c) => (
              <option key={c} value={c === "All" ? "all" : c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Notices List */}
      <div className="space-y-4">
        {filteredNotices.map((notice) => (
          <Card
            key={notice.id}
            className={`p-5 ${notice.isPinned ? "border-l-4 border-l-yellow-500 bg-yellow-50/30" : ""}`}
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap mb-2">
                  {notice.isPinned && (
                    <Badge className="bg-yellow-100 text-yellow-700 flex items-center gap-1">
                      <Pin className="w-3 h-3" /> Pinned
                    </Badge>
                  )}
                  <Badge
                    className={
                      notice.category === "Urgent"
                        ? "bg-red-100 text-red-700"
                        : notice.category === "Event"
                          ? "bg-purple-100 text-purple-700"
                          : notice.category === "Holiday"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                    }
                  >
                    {notice.category}
                  </Badge>
                  <Badge className="bg-gray-100 text-gray-600 flex items-center gap-1">
                    <Users className="w-3 h-3" /> {notice.targetAudience}
                  </Badge>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {notice.title}
                </h3>
                <p className="text-gray-600 mb-3">{notice.content}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Published:{" "}
                    {notice.publishDate}
                  </span>
                  {notice.expiryDate && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Expires: {notice.expiryDate}
                    </span>
                  )}
                  <span>By: {notice.createdBy}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleTogglePin(notice.id)}
                  className={`p-2 rounded-lg transition-colors ${notice.isPinned ? "text-yellow-600 bg-yellow-50" : "text-gray-400 hover:text-yellow-600 hover:bg-yellow-50"}`}
                  title={notice.isPinned ? "Unpin" : "Pin"}
                >
                  <Pin className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setShowEditModal(notice)}
                  className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setShowDeleteModal(notice.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredNotices.length === 0 && (
        <Card className="p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bell className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">
            No notices found
          </h3>
          <p className="text-gray-500">
            Click "Add Notice" to create your first notice
          </p>
        </Card>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-xl w-full max-w-2xl mx-4 my-8 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add Notice</h2>
              <button onClick={() => setShowAddModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Title *
                </label>
                <Input
                  value={newNotice.title}
                  onChange={(e) =>
                    setNewNotice({ ...newNotice, title: e.target.value })
                  }
                  placeholder="Notice title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Content *
                </label>
                <textarea
                  rows="4"
                  value={newNotice.content}
                  onChange={(e) =>
                    setNewNotice({ ...newNotice, content: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Notice content..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Category
                  </label>
                  <select
                    value={newNotice.category}
                    onChange={(e) =>
                      setNewNotice({ ...newNotice, category: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    {categories
                      .filter((c) => c !== "All")
                      .map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Target Audience
                  </label>
                  <select
                    value={newNotice.targetAudience}
                    onChange={(e) =>
                      setNewNotice({
                        ...newNotice,
                        targetAudience: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    {audiences.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Publish Date
                  </label>
                  <Input
                    type="date"
                    value={newNotice.publishDate}
                    onChange={(e) =>
                      setNewNotice({
                        ...newNotice,
                        publishDate: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Expiry Date
                  </label>
                  <Input
                    type="date"
                    value={newNotice.expiryDate}
                    onChange={(e) =>
                      setNewNotice({ ...newNotice, expiryDate: e.target.value })
                    }
                  />
                </div>
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newNotice.isPinned}
                  onChange={(e) =>
                    setNewNotice({ ...newNotice, isPinned: e.target.checked })
                  }
                  className="w-4 h-4"
                />{" "}
                <span className="text-sm">
                  Pin this notice (appears at top)
                </span>
              </label>
            </div>
            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowAddModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddNotice}
                className="flex-1 bg-blue-600 text-white"
              >
                Publish Notice
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-2xl mx-4 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Edit Notice</h2>
              <button onClick={() => setShowEditModal(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <Input
                  value={editNotice.title}
                  onChange={(e) =>
                    setEditNotice({ ...editNotice, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Content
                </label>
                <textarea
                  rows="4"
                  value={editNotice.content}
                  onChange={(e) =>
                    setEditNotice({ ...editNotice, content: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Category
                  </label>
                  <select
                    value={editNotice.category}
                    onChange={(e) =>
                      setEditNotice({ ...editNotice, category: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    {categories
                      .filter((c) => c !== "All")
                      .map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Target Audience
                  </label>
                  <select
                    value={editNotice.targetAudience}
                    onChange={(e) =>
                      setEditNotice({
                        ...editNotice,
                        targetAudience: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    {audiences.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Publish Date
                  </label>
                  <Input
                    type="date"
                    value={editNotice.publishDate}
                    onChange={(e) =>
                      setEditNotice({
                        ...editNotice,
                        publishDate: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Expiry Date
                  </label>
                  <Input
                    type="date"
                    value={editNotice.expiryDate}
                    onChange={(e) =>
                      setEditNotice({
                        ...editNotice,
                        expiryDate: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={editNotice.status}
                  onChange={(e) =>
                    setEditNotice({ ...editNotice, status: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowEditModal(null)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleEditNotice}
                className="flex-1 bg-blue-600 text-white"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Delete Notice</h3>
            <p className="text-gray-500 mb-6">
              Are you sure you want to delete this notice?
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
                onClick={handleDeleteNotice}
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
            <p className="font-medium text-blue-800">About Notice Board</p>
            <p className="text-sm text-blue-700">
              Post important announcements for students, parents, and staff.
              Pinned notices appear at the top.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
