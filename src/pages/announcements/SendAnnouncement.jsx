// src/pages/announcements/SendAnnouncement.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Send,
  Bell,
  X,
  CheckCircle,
  AlertCircle,
  Mail,
  MessageSquare,
  Users,
  Search,
  Phone,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function SendAnnouncement() {
  const navigate = useNavigate();
  const [selectedAnnouncement, setSelectedAnnouncement] = useState("");
  const [sendMethod, setSendMethod] = useState("email");
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [sendProgress, setSendProgress] = useState(0);

  // Mock Announcements
  const announcements = [
    {
      id: 1,
      title: "School Closed Tomorrow",
      content: "Due to heavy rainfall, school will remain closed tomorrow.",
      priority: "Urgent",
    },
    {
      id: 2,
      title: "PTM Schedule",
      content: "Parent-Teacher Meeting scheduled for May 20, 2024.",
      priority: "High",
    },
    {
      id: 3,
      title: "Fee Submission Deadline",
      content: "Last date for fee submission is May 30, 2024.",
      priority: "Normal",
    },
  ];

  // Mock Recipients
  const recipients = {
    parents: [
      {
        id: 1,
        name: "John Johnson",
        email: "john@example.com",
        phone: "+1 234 567 8901",
        student: "Alice Johnson",
      },
      {
        id: 2,
        name: "Mike Smith",
        email: "mike@example.com",
        phone: "+1 234 567 8902",
        student: "Bob Smith",
      },
    ],
    teachers: [
      {
        id: 3,
        name: "Dr. Sarah Wilson",
        email: "sarah@school.edu",
        phone: "+1 234 567 8904",
        department: "Mathematics",
      },
      {
        id: 4,
        name: "Prof. James Brown",
        email: "james@school.edu",
        phone: "+1 234 567 8905",
        department: "English",
      },
    ],
    staff: [
      {
        id: 5,
        name: "John Smith",
        email: "john.s@school.edu",
        phone: "+1 234 567 8906",
        department: "Accounts",
      },
    ],
  };

  const allRecipients = [
    ...recipients.parents,
    ...recipients.teachers,
    ...recipients.staff,
  ];

  const filteredRecipients = allRecipients.filter(
    (r) =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.student && r.student.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  const handleSelectRecipient = (recipient) => {
    if (selectedRecipients.find((r) => r.id === recipient.id)) {
      setSelectedRecipients(
        selectedRecipients.filter((r) => r.id !== recipient.id),
      );
    } else {
      setSelectedRecipients([...selectedRecipients, recipient]);
    }
  };

  const handleSelectAll = () => {
    if (
      selectedRecipients.length === filteredRecipients.length &&
      filteredRecipients.length > 0
    ) {
      setSelectedRecipients([]);
    } else {
      setSelectedRecipients([...filteredRecipients]);
    }
  };

  const handleSend = async () => {
    if (!selectedAnnouncement || selectedRecipients.length === 0) return;

    setIsSending(true);
    for (let i = 0; i <= selectedRecipients.length; i++) {
      setSendProgress(Math.round((i / selectedRecipients.length) * 100));
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    setIsSending(false);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setSelectedAnnouncement("");
      setSelectedRecipients([]);
      setSendProgress(0);
    }, 3000);
  };

  const selectedAnnouncementData = announcements.find(
    (a) => a.id === parseInt(selectedAnnouncement),
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Send Announcement
          </h1>
          <p className="text-gray-500 mt-1">
            Broadcast announcements via email or SMS
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/announcements")}
          className="flex items-center gap-2"
        >
          <X className="w-4 h-4" /> Back
        </Button>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-700 font-medium">
            Announcement sent successfully to {selectedRecipients.length}{" "}
            recipients!
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel */}
        <div className="space-y-6">
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-600" /> Select Announcement
            </h2>
            <select
              value={selectedAnnouncement}
              onChange={(e) => setSelectedAnnouncement(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose Announcement</option>
              {announcements.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.title}
                </option>
              ))}
            </select>
          </Card>

          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Send className="w-5 h-5 text-green-600" /> Send Method
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setSendMethod("email")}
                className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 transition-all ${
                  sendMethod === "email"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Mail className="w-4 h-4" /> Email
              </button>
              <button
                onClick={() => setSendMethod("sms")}
                className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 transition-all ${
                  sendMethod === "sms"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <MessageSquare className="w-4 h-4" /> SMS
              </button>
              <button
                onClick={() => setSendMethod("both")}
                className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 transition-all ${
                  sendMethod === "both"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Both
              </button>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-600" /> Recipients
              </h2>
              {filteredRecipients.length > 0 && (
                <button
                  onClick={handleSelectAll}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  {selectedRecipients.length === filteredRecipients.length
                    ? "Deselect All"
                    : "Select All"}
                </button>
              )}
            </div>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredRecipients.map((r) => (
                <div
                  key={r.id}
                  onClick={() => handleSelectRecipient(r)}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                    selectedRecipients.find((sr) => sr.id === r.id)
                      ? "bg-blue-50 border border-blue-300"
                      : "hover:bg-gray-50 border border-transparent"
                  }`}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                    {r.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{r.name}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      {sendMethod === "sms" ? (
                        <Phone className="w-3 h-3" />
                      ) : (
                        <Mail className="w-3 h-3" />
                      )}
                      {sendMethod === "sms" ? r.phone : r.email}
                    </p>
                    {r.student && (
                      <p className="text-xs text-gray-400">
                        Student: {r.student}
                      </p>
                    )}
                  </div>
                  {selectedRecipients.find((sr) => sr.id === r.id) && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                </div>
              ))}
            </div>
            {filteredRecipients.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No recipients found
              </div>
            )}
          </Card>

          {selectedRecipients.length > 0 && (
            <Card className="p-4">
              <h2 className="text-lg font-semibold mb-3">
                Selected ({selectedRecipients.length})
              </h2>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {selectedRecipients.map((r) => (
                  <div
                    key={r.id}
                    className="flex justify-between items-center text-sm"
                  >
                    <span className="text-gray-700">{r.name}</span>
                    <button
                      onClick={() =>
                        setSelectedRecipients(
                          selectedRecipients.filter((sr) => sr.id !== r.id),
                        )
                      }
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Right Panel */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Bell className="w-5 h-5 text-purple-600" /> Announcement Preview
            </h2>
            {selectedAnnouncementData ? (
              <div
                className={`p-4 rounded-lg border ${
                  selectedAnnouncementData.priority === "Urgent"
                    ? "bg-red-50 border-red-200"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge
                    className={
                      selectedAnnouncementData.priority === "Urgent"
                        ? "bg-red-100 text-red-700"
                        : selectedAnnouncementData.priority === "High"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-blue-100 text-blue-700"
                    }
                  >
                    {selectedAnnouncementData.priority}
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {selectedAnnouncementData.title}
                </h3>
                <p className="text-gray-700">
                  {selectedAnnouncementData.content}
                </p>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Select an announcement to preview
              </div>
            )}
          </Card>

          <Card className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">
                  Sending via:{" "}
                  <span className="font-semibold">
                    {sendMethod.toUpperCase()}
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  Recipients:{" "}
                  <span className="font-semibold text-blue-600">
                    {selectedRecipients.length}
                  </span>
                </p>
              </div>
              <Button
                onClick={handleSend}
                disabled={
                  !selectedAnnouncement ||
                  selectedRecipients.length === 0 ||
                  isSending
                }
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isSending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />{" "}
                    Sending... {sendProgress}%
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" /> Send Announcement
                  </>
                )}
              </Button>
            </div>
            {isSending && (
              <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 rounded-full h-2 transition-all duration-300"
                  style={{ width: `${sendProgress}%` }}
                />
              </div>
            )}
          </Card>

          {/* Info Box */}
          <Card className="p-4 bg-blue-50 border-blue-200">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-blue-800">About Broadcast</p>
                <p className="text-sm text-blue-700">
                  Send announcements to selected recipients via email and/or
                  SMS. Make sure contact details are updated.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
