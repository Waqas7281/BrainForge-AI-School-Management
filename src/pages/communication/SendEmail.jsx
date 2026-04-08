// src/pages/communication/SendEmail.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Send,
  Users,
  User,
  X,
  CheckCircle,
  AlertCircle,
  Search,
  Paperclip,
  Clock,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function SendEmail() {
  const navigate = useNavigate();
  const [recipientType, setRecipientType] = useState("parent");
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [sendProgress, setSendProgress] = useState(0);

  // Mock Recipients Data
  const recipients = {
    parent: [
      {
        id: 1,
        name: "John Johnson",
        email: "john.j@example.com",
        student: "Alice Johnson",
        phone: "+1 234 567 8901",
      },
      {
        id: 2,
        name: "Mike Smith",
        email: "mike.s@example.com",
        student: "Bob Smith",
        phone: "+1 234 567 8902",
      },
      {
        id: 3,
        name: "Robert Davis",
        email: "robert.d@example.com",
        student: "Charlie Davis",
        phone: "+1 234 567 8903",
      },
    ],
    teacher: [
      {
        id: 4,
        name: "Dr. Sarah Wilson",
        email: "sarah.w@school.edu",
        department: "Mathematics",
        phone: "+1 234 567 8904",
      },
      {
        id: 5,
        name: "Prof. James Brown",
        email: "james.b@school.edu",
        department: "English",
        phone: "+1 234 567 8905",
      },
    ],
    staff: [
      {
        id: 6,
        name: "John Smith",
        email: "john.s@school.edu",
        department: "Accounts",
        phone: "+1 234 567 8906",
      },
    ],
  };

  const currentRecipients = recipients[recipientType] || [];

  const filteredRecipients = currentRecipients.filter(
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
    if (selectedRecipients.length === filteredRecipients.length) {
      setSelectedRecipients([]);
    } else {
      setSelectedRecipients([...filteredRecipients]);
    }
  };

  const handleSend = async () => {
    if (selectedRecipients.length === 0 || !subject.trim() || !message.trim())
      return;

    setIsSending(true);
    for (let i = 0; i <= selectedRecipients.length; i++) {
      setSendProgress(Math.round((i / selectedRecipients.length) * 100));
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    setIsSending(false);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setSubject("");
      setMessage("");
      setSelectedRecipients([]);
      setSendProgress(0);
    }, 3000);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Send Email</h1>
          <p className="text-gray-500 mt-1">
            Send emails to parents, teachers, and staff
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/communication")}
          className="flex items-center gap-2"
        >
          <X className="w-4 h-4" /> Back
        </Button>
      </div>

      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-700 font-medium">
            Emails sent successfully to {selectedRecipients.length} recipients!
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel */}
        <div className="space-y-6">
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-600" /> Recipient Type
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setRecipientType("parent");
                  setSelectedRecipients([]);
                  setSearchTerm("");
                }}
                className={`flex-1 py-2 rounded-lg transition-all ${recipientType === "parent" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}
              >
                Parents
              </button>
              <button
                onClick={() => {
                  setRecipientType("teacher");
                  setSelectedRecipients([]);
                  setSearchTerm("");
                }}
                className={`flex-1 py-2 rounded-lg transition-all ${recipientType === "teacher" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}
              >
                Teachers
              </button>
              <button
                onClick={() => {
                  setRecipientType("staff");
                  setSelectedRecipients([]);
                  setSearchTerm("");
                }}
                className={`flex-1 py-2 rounded-lg transition-all ${recipientType === "staff" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}
              >
                Staff
              </button>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Users className="w-5 h-5 text-green-600" /> Recipients
              </h2>
              <button
                onClick={handleSelectAll}
                className="text-sm text-blue-600"
              >
                Select All
              </button>
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
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${selectedRecipients.find((sr) => sr.id === r.id) ? "bg-blue-50 border border-blue-300" : "hover:bg-gray-50 border border-transparent"}`}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                    {r.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{r.name}</p>
                    <p className="text-xs text-gray-500">{r.email}</p>
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
                    <span>{r.name}</span>
                    <button
                      onClick={() =>
                        setSelectedRecipients(
                          selectedRecipients.filter((sr) => sr.id !== r.id),
                        )
                      }
                      className="text-red-500"
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
              <Mail className="w-5 h-5 text-purple-600" /> Compose Email
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Subject
                </label>
                <Input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Email subject"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  rows="8"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Write your message here..."
                />
              </div>
              <div className="flex items-center gap-2">
                <Paperclip className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-500">
                  Attachments (Max 5MB)
                </span>
                <Button variant="outline" size="sm">
                  Add File
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">
                  Sending to:{" "}
                  <span className="font-semibold text-blue-600">
                    {selectedRecipients.length}
                  </span>{" "}
                  recipients
                </p>
                <p className="text-xs text-gray-500">
                  Message length: {message.length} characters
                </p>
              </div>
              <Button
                onClick={handleSend}
                disabled={
                  selectedRecipients.length === 0 ||
                  !subject.trim() ||
                  !message.trim() ||
                  isSending
                }
                className="bg-blue-600 text-white"
              >
                {isSending ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" /> Sending...{" "}
                    {sendProgress}%
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" /> Send Email
                  </>
                )}
              </Button>
            </div>
            {isSending && (
              <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 rounded-full h-2 transition-all"
                  style={{ width: `${sendProgress}%` }}
                />
              </div>
            )}
          </Card>

          <Card className="p-4 bg-blue-50 border-blue-200">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-blue-800">About Email</p>
                <p className="text-sm text-blue-700">
                  Emails will be sent using the school's SMTP configuration.
                  Make sure email settings are configured in General Settings.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
