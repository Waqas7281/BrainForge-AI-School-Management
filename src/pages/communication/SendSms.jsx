// src/pages/communication/SendSms.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MessageSquare,
  Send,
  Users,
  X,
  CheckCircle,
  AlertCircle,
  Search,
  Clock,
  Phone,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function SendSms() {
  const navigate = useNavigate();
  const [recipientType, setRecipientType] = useState("parent");
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [sendProgress, setSendProgress] = useState(0);

  // Mock Recipients Data with phone numbers
  const recipients = {
    parent: [
      {
        id: 1,
        name: "John Johnson",
        phone: "+1 234 567 8901",
        student: "Alice Johnson",
      },
      {
        id: 2,
        name: "Mike Smith",
        phone: "+1 234 567 8902",
        student: "Bob Smith",
      },
      {
        id: 3,
        name: "Robert Davis",
        phone: "+1 234 567 8903",
        student: "Charlie Davis",
      },
    ],
    teacher: [
      {
        id: 4,
        name: "Dr. Sarah Wilson",
        phone: "+1 234 567 8904",
        department: "Mathematics",
      },
      {
        id: 5,
        name: "Prof. James Brown",
        phone: "+1 234 567 8905",
        department: "English",
      },
    ],
    staff: [
      {
        id: 6,
        name: "John Smith",
        phone: "+1 234 567 8906",
        department: "Accounts",
      },
    ],
  };

  const currentRecipients = recipients[recipientType] || [];
  const messageLength = message.length;
  const maxLength = 160;
  const smsCount = Math.ceil(messageLength / maxLength);

  const filteredRecipients = currentRecipients.filter(
    (r) =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.phone.includes(searchTerm) ||
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
    if (selectedRecipients.length === 0 || !message.trim()) return;

    setIsSending(true);
    for (let i = 0; i <= selectedRecipients.length; i++) {
      setSendProgress(Math.round((i / selectedRecipients.length) * 100));
      await new Promise((resolve) => setTimeout(resolve, 100));
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
          <h1 className="text-2xl font-bold text-gray-800">Send SMS</h1>
          <p className="text-gray-500 mt-1">
            Send SMS alerts to parents, teachers, and staff
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

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-700 font-medium">
            SMS sent successfully to {selectedRecipients.length} recipients!
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel */}
        <div className="space-y-6">
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-green-600" /> Recipient
              Type
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setRecipientType("parent");
                  setSelectedRecipients([]);
                  setSearchTerm("");
                }}
                className={`flex-1 py-2 rounded-lg transition-all ${recipientType === "parent" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600"}`}
              >
                Parents
              </button>
              <button
                onClick={() => {
                  setRecipientType("teacher");
                  setSelectedRecipients([]);
                  setSearchTerm("");
                }}
                className={`flex-1 py-2 rounded-lg transition-all ${recipientType === "teacher" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600"}`}
              >
                Teachers
              </button>
              <button
                onClick={() => {
                  setRecipientType("staff");
                  setSelectedRecipients([]);
                  setSearchTerm("");
                }}
                className={`flex-1 py-2 rounded-lg transition-all ${recipientType === "staff" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600"}`}
              >
                Staff
              </button>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" /> Recipients
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
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                    selectedRecipients.find((sr) => sr.id === r.id)
                      ? "bg-green-50 border border-green-300"
                      : "hover:bg-gray-50 border border-transparent"
                  }`}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                    {r.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{r.name}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Phone className="w-3 h-3" /> {r.phone}
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
              <MessageSquare className="w-5 h-5 text-purple-600" /> Compose SMS
            </h2>
            <div className="space-y-4">
              <textarea
                rows="5"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Type your SMS message here... Max 160 characters per SMS"
                maxLength={160 * 3}
              />
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm ${messageLength > maxLength ? "text-red-500" : "text-gray-500"}`}
                  >
                    {messageLength} / {maxLength} characters
                  </span>
                  <Badge
                    className={
                      smsCount > 1
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }
                  >
                    {smsCount} SMS
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                    Fee Reminder
                  </button>
                  <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                    Attendance Alert
                  </button>
                  <button className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                    Holiday Notice
                  </button>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">
                  Sending SMS to:{" "}
                  <span className="font-semibold text-green-600">
                    {selectedRecipients.length}
                  </span>{" "}
                  recipients
                </p>
                <p className="text-xs text-gray-500">
                  Estimated cost: {selectedRecipients.length * smsCount} SMS
                  credits
                </p>
              </div>
              <Button
                onClick={handleSend}
                disabled={
                  selectedRecipients.length === 0 ||
                  !message.trim() ||
                  isSending
                }
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {isSending ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" /> Sending...{" "}
                    {sendProgress}%
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" /> Send SMS
                  </>
                )}
              </Button>
            </div>
            {isSending && (
              <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
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
                <p className="font-medium text-blue-800">About SMS</p>
                <p className="text-sm text-blue-700">
                  SMS will be sent using the configured SMS gateway. Each SMS
                  can have up to 160 characters. Longer messages will be split
                  into multiple SMS.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
