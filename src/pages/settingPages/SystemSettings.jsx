// src/pages/settingPages/SystemSettings.jsx

import { useState } from "react";
import {
  Settings,
  Shield,
  Database,
  Package,
  FileText,
  DollarSign,
  Globe,
  Bell,
  Lock,
  Key,
  Users,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock,
  Mail,
  Smartphone,
  Server,
  Cloud,
  Activity,
  Zap,
  Moon,
  Sun,
  Monitor,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function SystemSettings() {
  const [activeTab, setActiveTab] = useState("general");
  const [showApiKey, setShowApiKey] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form States
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "BrainForge School",
    siteTagline: "Empowering Minds, Building Futures",
    siteEmail: "admin@brainforge.edu",
    sitePhone: "+1 (555) 123-4567",
    siteAddress: "123 Education Street, Learning City, LC 12345",
    timezone: "America/New_York",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12h",
    weekStart: "monday",
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiryDays: 90,
    maxLoginAttempts: 5,
    lockoutDuration: 30,
    requireStrongPassword: true,
  });

  const [apiSettings, setApiSettings] = useState({
    googleMapsKey: "AIzaSyXXXXXXXXXXXX",
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    smtpUser: "noreply@brainforge.edu",
    smtpPass: "••••••••",
    smtpEncryption: "tls",
  });

  const [moduleSettings, setModuleSettings] = useState({
    onlineExam: true,
    hostel: true,
    transport: true,
    library: true,
    inventory: true,
    canteen: false,
    liveClass: true,
    whatsapp: false,
    pos: false,
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "security", label: "Security", icon: Shield },
    { id: "api", label: "API Keys", icon: Key },
    { id: "modules", label: "Modules", icon: Package },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "localization", label: "Localization", icon: Globe },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">System Settings</h1>
          <p className="text-gray-500 mt-1">
            Configure system-wide settings, security, modules, and integrations
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Reset
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Success Toast */}
      {saveSuccess && (
        <div className="fixed top-20 right-6 z-50 animate-in slide-in-from-top-2 fade-in duration-300">
          <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 flex items-center gap-3 shadow-lg">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-700 font-medium">
              Settings saved successfully!
            </span>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-1 overflow-x-auto pb-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all
                  ${
                    isActive
                      ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* ==================== GENERAL SETTINGS TAB ==================== */}
        {activeTab === "general" && (
          <>
            {/* Basic Information */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Settings className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Basic Information
                  </h2>
                  <p className="text-sm text-gray-500">
                    General school information and branding
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Name
                  </label>
                  <Input
                    value={generalSettings.siteName}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        siteName: e.target.value,
                      })
                    }
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Tagline
                  </label>
                  <Input
                    value={generalSettings.siteTagline}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        siteTagline: e.target.value,
                      })
                    }
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Email
                  </label>
                  <Input
                    type="email"
                    value={generalSettings.siteEmail}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        siteEmail: e.target.value,
                      })
                    }
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Phone
                  </label>
                  <Input
                    value={generalSettings.sitePhone}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        sitePhone: e.target.value,
                      })
                    }
                    className="w-full"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Address
                  </label>
                  <Input
                    value={generalSettings.siteAddress}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        siteAddress: e.target.value,
                      })
                    }
                    className="w-full"
                  />
                </div>
              </div>
            </Card>

            {/* Date & Time Settings */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Date & Time Settings
                  </h2>
                  <p className="text-sm text-gray-500">
                    Configure date, time, and timezone preferences
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timezone
                  </label>
                  <select
                    value={generalSettings.timezone}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        timezone: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="America/New_York">
                      Eastern Time (US & Canada)
                    </option>
                    <option value="America/Chicago">
                      Central Time (US & Canada)
                    </option>
                    <option value="America/Denver">
                      Mountain Time (US & Canada)
                    </option>
                    <option value="America/Los_Angeles">
                      Pacific Time (US & Canada)
                    </option>
                    <option value="Asia/Kolkata">India Standard Time</option>
                    <option value="Asia/Dubai">Gulf Standard Time</option>
                    <option value="Europe/London">GMT (London)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Format
                  </label>
                  <select
                    value={generalSettings.dateFormat}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        dateFormat: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY (12/31/2024)</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY (31/12/2024)</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD (2024-12-31)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Format
                  </label>
                  <select
                    value={generalSettings.timeFormat}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        timeFormat: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="12h">12-hour (02:30 PM)</option>
                    <option value="24h">24-hour (14:30)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Week Start Day
                  </label>
                  <select
                    value={generalSettings.weekStart}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        weekStart: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="sunday">Sunday</option>
                    <option value="monday">Monday</option>
                    <option value="saturday">Saturday</option>
                  </select>
                </div>
              </div>
            </Card>
          </>
        )}

        {/* ==================== SECURITY TAB ==================== */}
        {activeTab === "security" && (
          <>
            {/* Authentication Settings */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Lock className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Authentication & Security
                  </h2>
                  <p className="text-sm text-gray-500">
                    Configure login security and authentication policies
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {/* 2FA Toggle */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-800">
                        Two-Factor Authentication (2FA)
                      </p>
                      <p className="text-sm text-gray-500">
                        Require 2FA for all admin users
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      setSecuritySettings({
                        ...securitySettings,
                        twoFactorAuth: !securitySettings.twoFactorAuth,
                      })
                    }
                    className={`
                      relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                      ${securitySettings.twoFactorAuth ? "bg-blue-600" : "bg-gray-300"}
                    `}
                  >
                    <span
                      className={`
                        inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                        ${securitySettings.twoFactorAuth ? "translate-x-6" : "translate-x-1"}
                      `}
                    />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Session Timeout (minutes)
                    </label>
                    <Input
                      type="number"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) =>
                        setSecuritySettings({
                          ...securitySettings,
                          sessionTimeout: parseInt(e.target.value),
                        })
                      }
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Auto logout after inactivity
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password Expiry (days)
                    </label>
                    <Input
                      type="number"
                      value={securitySettings.passwordExpiryDays}
                      onChange={(e) =>
                        setSecuritySettings({
                          ...securitySettings,
                          passwordExpiryDays: parseInt(e.target.value),
                        })
                      }
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      0 = never expires
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Login Attempts
                    </label>
                    <Input
                      type="number"
                      value={securitySettings.maxLoginAttempts}
                      onChange={(e) =>
                        setSecuritySettings({
                          ...securitySettings,
                          maxLoginAttempts: parseInt(e.target.value),
                        })
                      }
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lockout Duration (minutes)
                    </label>
                    <Input
                      type="number"
                      value={securitySettings.lockoutDuration}
                      onChange={(e) =>
                        setSecuritySettings({
                          ...securitySettings,
                          lockoutDuration: parseInt(e.target.value),
                        })
                      }
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Password Requirements */}
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                    <p className="font-medium text-amber-800">
                      Password Requirements
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="strongPassword"
                      checked={securitySettings.requireStrongPassword}
                      onChange={(e) =>
                        setSecuritySettings({
                          ...securitySettings,
                          requireStrongPassword: e.target.checked,
                        })
                      }
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <label
                      htmlFor="strongPassword"
                      className="text-sm text-gray-700"
                    >
                      Require strong password (min 8 chars, 1 uppercase, 1
                      number, 1 special)
                    </label>
                  </div>
                </div>
              </div>
            </Card>

            {/* Password Change */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Key className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Change Admin Password
                  </h2>
                  <p className="text-sm text-gray-500">
                    Update your account password
                  </p>
                </div>
              </div>

              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <Input type="password" placeholder="Enter current password" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <Input type="password" placeholder="Enter new password" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <Input type="password" placeholder="Confirm new password" />
                </div>
                <Button variant="outline" className="w-full">
                  Update Password
                </Button>
              </div>
            </Card>
          </>
        )}

        {/* ==================== API KEYS TAB ==================== */}
        {activeTab === "api" && (
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Key className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  API & Integration Keys
                </h2>
                <p className="text-sm text-gray-500">
                  Configure third-party API integrations
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Google Maps API */}
              <div className="border-b border-gray-200 pb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-medium text-gray-800">
                      Google Maps API Key
                    </p>
                    <p className="text-sm text-gray-500">
                      Used for location services and maps
                    </p>
                  </div>
                  <Badge className="bg-green-100 text-green-700">Active</Badge>
                </div>
                <div className="flex gap-2">
                  <Input
                    value={apiSettings.googleMapsKey}
                    onChange={(e) =>
                      setApiSettings({
                        ...apiSettings,
                        googleMapsKey: e.target.value,
                      })
                    }
                    className="flex-1 font-mono text-sm"
                  />
                  <Button variant="outline">Test</Button>
                </div>
              </div>

              {/* SMTP Settings */}
              <div className="border-b border-gray-200 pb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-medium text-gray-800">
                      SMTP Email Configuration
                    </p>
                    <p className="text-sm text-gray-500">
                      Used for sending system emails
                    </p>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-700">
                    Configured
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      SMTP Host
                    </label>
                    <Input
                      value={apiSettings.smtpHost}
                      onChange={(e) =>
                        setApiSettings({
                          ...apiSettings,
                          smtpHost: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      SMTP Port
                    </label>
                    <Input
                      value={apiSettings.smtpPort}
                      onChange={(e) =>
                        setApiSettings({
                          ...apiSettings,
                          smtpPort: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Username
                    </label>
                    <Input
                      value={apiSettings.smtpUser}
                      onChange={(e) =>
                        setApiSettings({
                          ...apiSettings,
                          smtpUser: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Input
                        type={showApiKey ? "text" : "password"}
                        value={apiSettings.smtpPass}
                        onChange={(e) =>
                          setApiSettings({
                            ...apiSettings,
                            smtpPass: e.target.value,
                          })
                        }
                      />
                      <button
                        type="button"
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        {showApiKey ? (
                          <EyeOff className="w-4 h-4 text-gray-400" />
                        ) : (
                          <Eye className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Encryption
                    </label>
                    <select
                      value={apiSettings.smtpEncryption}
                      onChange={(e) =>
                        setApiSettings({
                          ...apiSettings,
                          smtpEncryption: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="none">None</option>
                      <option value="tls">TLS</option>
                      <option value="ssl">SSL</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* API Keys List */}
              <div>
                <h3 className="font-medium text-gray-800 mb-3">
                  Generated API Keys
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-mono text-sm text-gray-600">
                        sk_live_••••••••••••••••••••••••
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Created: Jan 15, 2024 • Last used: Today
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-red-600">
                      Revoke
                    </Button>
                  </div>
                </div>
                <Button className="mt-4" variant="outline">
                  + Generate New API Key
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* ==================== MODULES TAB ==================== */}
        {activeTab === "modules" && (
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Module Manager
                </h2>
                <p className="text-sm text-gray-500">
                  Enable or disable system modules
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(moduleSettings).map(([module, enabled]) => (
                <div
                  key={module}
                  className={`
                    p-4 rounded-lg border transition-all
                    ${enabled ? "bg-white border-blue-200" : "bg-gray-50 border-gray-200 opacity-70"}
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`
                        w-8 h-8 rounded-lg flex items-center justify-center
                        ${enabled ? "bg-blue-100" : "bg-gray-200"}
                      `}
                      >
                        {module === "onlineExam" && (
                          <FileText className="w-4 h-4 text-blue-600" />
                        )}
                        {module === "hostel" && (
                          <Package className="w-4 h-4 text-blue-600" />
                        )}
                        {module === "transport" && (
                          <Package className="w-4 h-4 text-blue-600" />
                        )}
                        {module === "library" && (
                          <Package className="w-4 h-4 text-blue-600" />
                        )}
                        {module === "inventory" && (
                          <Package className="w-4 h-4 text-blue-600" />
                        )}
                        {module === "canteen" && (
                          <Package className="w-4 h-4 text-blue-600" />
                        )}
                        {module === "liveClass" && (
                          <Package className="w-4 h-4 text-blue-600" />
                        )}
                        {module === "whatsapp" && (
                          <Package className="w-4 h-4 text-blue-600" />
                        )}
                        {module === "pos" && (
                          <Package className="w-4 h-4 text-blue-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 capitalize">
                          {module.replace(/([A-Z])/g, " $1").trim()}
                        </p>
                        <p className="text-xs text-gray-500">
                          {enabled ? "Active" : "Disabled"}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        setModuleSettings({
                          ...moduleSettings,
                          [module]: !enabled,
                        })
                      }
                      className={`
                        relative inline-flex h-5 w-10 items-center rounded-full transition-colors
                        ${enabled ? "bg-blue-600" : "bg-gray-300"}
                      `}
                    >
                      <span
                        className={`
                          inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform
                          ${enabled ? "translate-x-5.5" : "translate-x-1"}
                        `}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* ==================== NOTIFICATIONS TAB ==================== */}
        {activeTab === "notifications" && (
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-pink-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Notification Settings
                </h2>
                <p className="text-sm text-gray-500">
                  Configure email, SMS, and push notifications
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                {
                  id: "emailNotif",
                  label: "Email Notifications",
                  icon: Mail,
                  desc: "Receive system updates via email",
                },
                {
                  id: "smsNotif",
                  label: "SMS Notifications",
                  icon: Smartphone,
                  desc: "Receive alerts via SMS",
                },
                {
                  id: "pushNotif",
                  label: "Push Notifications",
                  icon: Bell,
                  desc: "Receive browser push notifications",
                },
                {
                  id: "dailyDigest",
                  label: "Daily Digest",
                  icon: Activity,
                  desc: "Receive daily summary of activities",
                },
              ].map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <item.icon className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{item.label}</p>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                  <button
                    className={`
                      relative inline-flex h-5 w-10 items-center rounded-full transition-colors
                      ${true ? "bg-blue-600" : "bg-gray-300"}
                    `}
                  >
                    <span className="inline-block h-3.5 w-3.5 transform translate-x-5.5 rounded-full bg-white transition-transform" />
                  </button>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* ==================== LOCALIZATION TAB ==================== */}
        {activeTab === "localization" && (
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Localization Settings
                </h2>
                <p className="text-sm text-gray-500">
                  Configure language, currency, and regional settings
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Language
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="en">English (US)</option>
                  <option value="en-gb">English (UK)</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="ar">Arabic</option>
                  <option value="hi">Hindi</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Currency
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="INR">INR (₹)</option>
                  <option value="AED">AED (د.إ)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number Format
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="us">1,234,567.89 (US)</option>
                  <option value="eu">1.234.567,89 (EU)</option>
                  <option value="in">12,34,567.89 (India)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Day of Week
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="sunday">Sunday</option>
                  <option value="monday">Monday</option>
                  <option value="saturday">Saturday</option>
                </select>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
