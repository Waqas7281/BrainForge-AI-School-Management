import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Mail,
  Send,
  Save,
  TestTube,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "../../components/ui/badge";

export default function EmailSettings() {
  const [formData, setFormData] = useState({
    protocol: "smtp",
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    smtpUser: "school@example.com",
    smtpPassword: "",
    encryption: "tls",
    fromEmail: "noreply@school.com",
    fromName: "School Management System",
    replyToEmail: "support@school.com",
  });

  const [testEmail, setTestEmail] = useState("");
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("Email settings saved successfully!");
  };

  const handleTestEmail = async () => {
    if (!testEmail) {
      alert("Please enter a test email address");
      return;
    }

    setIsTesting(true);
    setTestResult(null);

    // Simulate API call
    setTimeout(() => {
      setIsTesting(false);
      setTestResult({
        success: true,
        message: "Test email sent successfully! Please check your inbox.",
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Email Settings</h1>
          <p className="text-gray-500 mt-1">
            Configure SMTP settings for sending emails
          </p>
        </div>
        <Button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Email Protocol */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Email Protocol
              </h2>
              <p className="text-sm text-gray-500">
                Select email sending protocol
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                value: "smtp",
                label: "SMTP",
                desc: "Simple Mail Transfer Protocol",
              },
              {
                value: "sendmail",
                label: "Sendmail",
                desc: "Unix mail program",
              },
              { value: "mail", label: "PHP Mail", desc: "PHP mail() function" },
            ].map((protocol) => (
              <button
                key={protocol.value}
                type="button"
                onClick={() =>
                  setFormData({ ...formData, protocol: protocol.value })
                }
                className={`p-4 rounded-lg border transition-all text-left ${
                  formData.protocol === protocol.value
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">
                    {protocol.label}
                  </h3>
                  {formData.protocol === protocol.value && (
                    <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                      Selected
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-500">{protocol.desc}</p>
              </button>
            ))}
          </div>
        </Card>

        {/* SMTP Configuration */}
        {formData.protocol === "smtp" && (
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  SMTP Configuration
                </h2>
                <p className="text-sm text-gray-500">
                  Configure SMTP server details
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* SMTP Host */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SMTP Host <span className="text-red-500">*</span>
                </label>
                <Input
                  name="smtpHost"
                  value={formData.smtpHost}
                  onChange={handleChange}
                  placeholder="smtp.gmail.com"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Example: smtp.gmail.com, smtp.office365.com
                </p>
              </div>

              {/* SMTP Port */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SMTP Port <span className="text-red-500">*</span>
                </label>
                <Input
                  name="smtpPort"
                  value={formData.smtpPort}
                  onChange={handleChange}
                  placeholder="587"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Common: 587 (TLS), 465 (SSL), 25
                </p>
              </div>

              {/* Encryption */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Encryption <span className="text-red-500">*</span>
                </label>
                <select
                  name="encryption"
                  value={formData.encryption}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="tls">TLS</option>
                  <option value="ssl">SSL</option>
                  <option value="none">None</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Recommended: TLS for port 587
                </p>
              </div>

              {/* SMTP Username */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SMTP Username <span className="text-red-500">*</span>
                </label>
                <Input
                  name="smtpUser"
                  type="email"
                  value={formData.smtpUser}
                  onChange={handleChange}
                  placeholder="your-email@gmail.com"
                  required
                />
              </div>

              {/* SMTP Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SMTP Password <span className="text-red-500">*</span>
                </label>
                <Input
                  name="smtpPassword"
                  type="password"
                  value={formData.smtpPassword}
                  onChange={handleChange}
                  placeholder="••••••••••"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Use App Password for Gmail
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Sender Information */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Send className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Sender Information
              </h2>
              <p className="text-sm text-gray-500">
                Configure default sender details
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* From Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From Email <span className="text-red-500">*</span>
              </label>
              <Input
                name="fromEmail"
                type="email"
                value={formData.fromEmail}
                onChange={handleChange}
                placeholder="noreply@school.com"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Email address that appears in "From" field
              </p>
            </div>

            {/* From Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From Name <span className="text-red-500">*</span>
              </label>
              <Input
                name="fromName"
                value={formData.fromName}
                onChange={handleChange}
                placeholder="School Management System"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Name that appears in "From" field
              </p>
            </div>

            {/* Reply To Email */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reply-To Email
              </label>
              <Input
                name="replyToEmail"
                type="email"
                value={formData.replyToEmail}
                onChange={handleChange}
                placeholder="support@school.com"
              />
              <p className="text-xs text-gray-500 mt-1">
                Email address for replies (optional)
              </p>
            </div>
          </div>
        </Card>

        {/* Test Email */}
        <Card className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <TestTube className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Test Email Configuration
              </h2>
              <p className="text-sm text-gray-500">
                Send a test email to verify settings
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Input
                type="email"
                placeholder="Enter test email address"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
              />
            </div>
            <Button
              type="button"
              onClick={handleTestEmail}
              disabled={isTesting}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              {isTesting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Test Email
                </>
              )}
            </Button>
          </div>

          {/* Test Result */}
          {testResult && (
            <div
              className={`mt-4 p-4 rounded-lg ${
                testResult.success
                  ? "bg-green-100 border border-green-200"
                  : "bg-red-100 border border-red-200"
              }`}
            >
              <div className="flex items-start gap-3">
                {testResult.success ? (
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <h4
                    className={`font-semibold ${
                      testResult.success ? "text-green-900" : "text-red-900"
                    }`}
                  >
                    {testResult.success ? "Success!" : "Error!"}
                  </h4>
                  <p
                    className={`text-sm mt-1 ${
                      testResult.success ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {testResult.message}
                  </p>
                </div>
              </div>
            </div>
          )}
        </Card>
      </form>

      {/* Common SMTP Configurations */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Mail className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Common SMTP Configurations
            </h2>
            <p className="text-sm text-gray-500">
              Quick reference for popular email providers
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Gmail */}
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-xl">📧</span>
              Gmail
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Host:</span>
                <span className="font-mono text-gray-900">smtp.gmail.com</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Port:</span>
                <span className="font-mono text-gray-900">587 (TLS)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Encryption:</span>
                <span className="font-mono text-gray-900">TLS</span>
              </div>
            </div>
            <p className="text-xs text-amber-600 mt-3 p-2 bg-amber-50 rounded">
              ⚠️ Use App Password instead of regular password
            </p>
          </div>

          {/* Outlook/Office365 */}
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-xl">📨</span>
              Outlook / Office365
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Host:</span>
                <span className="font-mono text-gray-900">
                  smtp.office365.com
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Port:</span>
                <span className="font-mono text-gray-900">587 (TLS)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Encryption:</span>
                <span className="font-mono text-gray-900">TLS</span>
              </div>
            </div>
          </div>

          {/* Yahoo */}
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-xl">📬</span>
              Yahoo Mail
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Host:</span>
                <span className="font-mono text-gray-900">
                  smtp.mail.yahoo.com
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Port:</span>
                <span className="font-mono text-gray-900">587 (TLS)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Encryption:</span>
                <span className="font-mono text-gray-900">TLS</span>
              </div>
            </div>
          </div>

          {/* SendGrid */}
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-xl">⚡</span>
              SendGrid
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Host:</span>
                <span className="font-mono text-gray-900">
                  smtp.sendgrid.net
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Port:</span>
                <span className="font-mono text-gray-900">587 (TLS)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Encryption:</span>
                <span className="font-mono text-gray-900">TLS</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Important Notes */}
      <Card className="p-6 bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Important Security Notes
            </h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>
                • For Gmail, enable "2-Step Verification" and use App Password
              </li>
              <li>
                • Never share your SMTP credentials with unauthorized persons
              </li>
              <li>• Use TLS/SSL encryption for secure email transmission</li>
              <li>• Test email configuration before using in production</li>
              <li>
                • Some providers may require additional authentication setup
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
