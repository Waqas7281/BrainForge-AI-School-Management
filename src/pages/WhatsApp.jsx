// src/pages/WhatsApp.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MessageSquare,
  Send,
  Users,
  User,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Search,
  X,
  Plus,
  Trash2,
  Copy,
  Save,
} from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";

export default function WhatsApp() {
  const navigate = useNavigate();
  const [messageType, setMessageType] = useState("single");
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [sendProgress, setSendProgress] = useState(0);

  // Mock Parents/Students Data
  const contacts = [
    { id: 1, name: "John Johnson", role: "Parent", student: "Alice Johnson", phone: "+1 234 567 8901", status: "active" },
    { id: 2, name: "Mike Smith", role: "Parent", student: "Bob Smith", phone: "+1 234 567 8902", status: "active" },
    { id: 3, name: "Robert Davis", role: "Parent", student: "Charlie Davis", phone: "+1 234 567 8903", status: "active" },
    { id: 4, name: "Dr. Sarah Wilson", role: "Teacher", department: "Mathematics", phone: "+1 234 567 8904", status: "active" },
    { id: 5, name: "Prof. James Brown", role: "Teacher", department: "English", phone: "+1 234 567 8905", status: "active" },
    { id: 6, name: "John Smith", role: "Staff", department: "Accounts", phone: "+1 234 567 8906", status: "active" },
  ];

  // Mock Templates
  const templates = [
    { id: 1, name: "Fee Reminder", content: "Dear Parent, This is a reminder that the school fees for the month is due on {date}. Please pay at the earliest. Thank you." },
    { id: 2, name: "Attendance Alert", content: "Dear Parent, Your child {student_name} was absent on {date}. Please ensure regular attendance." },
    { id: 3, name: "Exam Result", content: "Dear Parent, The results for {exam_name} have been published. Your child {student_name} has scored {percentage}%." },
    { id: 4, name: "Event Notice", content: "Dear Parent, {event_name} will be held on {date} at {time}. Your presence is requested." },
    { id: 5, name: "Holiday Notice", content: "Dear Parent, School will remain closed on {date} on account of {occasion}. Happy Holidays!" },
  ];

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.student?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm)
  );

  const handleSelectRecipient = (contact) => {
    if (selectedRecipients.find(r => r.id === contact.id)) {
      setSelectedRecipients(selectedRecipients.filter(r => r.id !== contact.id));
    } else {
      setSelectedRecipients([...selectedRecipients, contact]);
    }
  };

  const handleSelectAll = () => {
    if (selectedRecipients.length === filteredContacts.length) {
      setSelectedRecipients([]);
    } else {
      setSelectedRecipients([...filteredContacts]);
    }
  };

  const handleUseTemplate = (template) => {
    setMessage(template.content);
  };

  const handleSend = async () => {
    if (selectedRecipients.length === 0 || !message.trim()) return;
    
    setIsSending(true);
    for (let i = 0; i <= selectedRecipients.length; i++) {
      setSendProgress(Math.round((i / selectedRecipients.length) * 100));
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    setIsSending(false);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
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
          <h1 className="text-2xl font-bold text-gray-800">WhatsApp</h1>
          <p className="text-gray-500 mt-1">Send WhatsApp messages to parents, teachers, and staff</p>
        </div>
        <Button variant="outline" onClick={() => navigate("/")} className="flex items-center gap-2">
          <X className="w-4 h-4" /> Back
        </Button>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-700 font-medium">Messages sent successfully to {selectedRecipients.length} recipients!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Message Type & Recipients */}
        <div className="space-y-6">
          {/* Message Type */}
          <Card className="p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-green-600" /> Message Type
            </h2>
            <div className="flex gap-3">
              <button
                onClick={() => setMessageType("single")}
                className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg transition-all ${
                  messageType === "single"
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <User className="w-4 h-4" /> Single
              </button>
              <button
                onClick={() => setMessageType("bulk")}
                className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg transition-all ${
                  messageType === "bulk"
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Users className="w-4 h-4" /> Bulk
              </button>
            </div>
          </Card>

          {/* Search & Contacts */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" /> Contacts
              </h2>
              {messageType === "bulk" && (
                <button
                  onClick={handleSelectAll}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  {selectedRecipients.length === filteredContacts.length ? "Deselect All" : "Select All"}
                </button>
              )}
            </div>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by name, student, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => {
                    if (messageType === "single") {
                      setSelectedRecipients([contact]);
                    } else {
                      handleSelectRecipient(contact);
                    }
                  }}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                    selectedRecipients.find(r => r.id === contact.id)
                      ? "bg-green-50 border border-green-300"
                      : "hover:bg-gray-50 border border-transparent"
                  }`}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                    {contact.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{contact.name}</p>
                    <p className="text-xs text-gray-500">
                      {contact.role} | {contact.student || contact.department || contact.phone}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{contact.phone}</span>
                  </div>
                  {selectedRecipients.find(r => r.id === contact.id) && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                </div>
              ))}
            </div>
            {filteredContacts.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No contacts found</p>
              </div>
            )}
          </Card>

          {/* Selected Recipients Summary */}
          {selectedRecipients.length > 0 && (
            <Card className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Users className="w-5 h-5 text-green-600" /> Selected ({selectedRecipients.length})
              </h2>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {selectedRecipients.map((recipient) => (
                  <div key={recipient.id} className="flex items-center justify-between text-sm">
                    <span>{recipient.name}</span>
                    <button
                      onClick={() => setSelectedRecipients(selectedRecipients.filter(r => r.id !== recipient.id))}
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

        {/* Right Panel - Message Composition */}
        <div className="lg:col-span-2 space-y-6">
          {/* Templates */}
          <Card className="p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Copy className="w-5 h-5 text-purple-600" /> Quick Templates
            </h2>
            <div className="flex flex-wrap gap-2">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleUseTemplate(template)}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
                >
                  {template.name}
                </button>
              ))}
            </div>
          </Card>

          {/* Message Composition */}
          <Card className="p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" /> Message
            </h2>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="8"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Type your message here... Use {name} for recipient name, {student_name} for student name"
            />
            <div className="mt-2 text-xs text-gray-500">
              <p>Tips: Use variables like &#123;name&#125;, &#123;student_name&#125;, &#123;date&#125;, &#123;percentage&#125;</p>
            </div>
          </Card>

          {/* Send Button & Progress */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-gray-600">
                  Sending to: <span className="font-semibold text-green-600">{selectedRecipients.length}</span> recipients
                </p>
                <p className="text-xs text-gray-500">
                  Message length: {message.length} characters
                </p>
              </div>
              <Button
                onClick={handleSend}
                disabled={selectedRecipients.length === 0 || !message.trim() || isSending}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
              >
                {isSending ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Sending... {sendProgress}%
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Messages
                  </>
                )}
              </Button>
            </div>
            {isSending && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 rounded-full h-2 transition-all duration-300"
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
                <p className="font-medium text-blue-800">About WhatsApp Messaging</p>
                <p className="text-sm text-blue-700">Messages will be sent via WhatsApp Business API. Make sure recipient numbers are registered on WhatsApp.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}