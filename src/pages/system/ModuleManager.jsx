// src/pages/system/ModuleManager.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Package,
  X,
  CheckCircle,
  AlertCircle,
  Search,
  Settings,
  Users,
  BookOpen,
  GraduationCap,
  DollarSign,
  Calendar,
  Mail,
  Award,
  Car,
  Home,
  Utensils,
  ShoppingBag,
  Video,
  Download,
  Image,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function ModuleManager() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock Modules Data
  const [modules, setModules] = useState([
    {
      id: 1,
      name: "Students",
      icon: "GraduationCap",
      enabled: true,
      category: "Core",
      description: "Student management system",
    },
    {
      id: 2,
      name: "Teachers",
      icon: "Users",
      enabled: true,
      category: "Core",
      description: "Teacher management system",
    },
    {
      id: 3,
      name: "Staff",
      icon: "Users",
      enabled: true,
      category: "Core",
      description: "Staff management system",
    },
    {
      id: 4,
      name: "Classes",
      icon: "BookOpen",
      enabled: true,
      category: "Core",
      description: "Class and section management",
    },
    {
      id: 5,
      name: "Subjects",
      icon: "BookOpen",
      enabled: true,
      category: "Core",
      description: "Subject management",
    },
    {
      id: 6,
      name: "Attendance",
      icon: "Calendar",
      enabled: true,
      category: "Academic",
      description: "Student/Teacher attendance",
    },
    {
      id: 7,
      name: "Examinations",
      icon: "Award",
      enabled: true,
      category: "Academic",
      description: "Exam and results management",
    },
    {
      id: 8,
      name: "Fees Collection",
      icon: "DollarSign",
      enabled: true,
      category: "Finance",
      description: "Fee collection system",
    },
    {
      id: 9,
      name: "Accounts",
      icon: "DollarSign",
      enabled: true,
      category: "Finance",
      description: "Income/Expense tracking",
    },
    {
      id: 10,
      name: "Payroll",
      icon: "DollarSign",
      enabled: false,
      category: "Finance",
      description: "Staff salary management",
    },
    {
      id: 11,
      name: "Library",
      icon: "BookOpen",
      enabled: true,
      category: "Resource",
      description: "Library book management",
    },
    {
      id: 12,
      name: "Transport",
      icon: "Car",
      enabled: true,
      category: "Resource",
      description: "Vehicle and route management",
    },
    {
      id: 13,
      name: "Hostel",
      icon: "Home",
      enabled: false,
      category: "Resource",
      description: "Hostel management system",
    },
    {
      id: 14,
      name: "Inventory",
      icon: "Package",
      enabled: false,
      category: "Resource",
      description: "Stock and inventory",
    },
    {
      id: 15,
      name: "Canteen",
      icon: "Utensils",
      enabled: false,
      category: "Resource",
      description: "Canteen management",
    },
    {
      id: 16,
      name: "Communication",
      icon: "Mail",
      enabled: true,
      category: "Communication",
      description: "Email/SMS notifications",
    },
    {
      id: 17,
      name: "WhatsApp",
      icon: "Mail",
      enabled: true,
      category: "Communication",
      description: "WhatsApp integration",
    },
    {
      id: 18,
      name: "Online Store",
      icon: "ShoppingBag",
      enabled: false,
      category: "Ecommerce",
      description: "Online store and POS",
    },
    {
      id: 19,
      name: "Live Classes",
      icon: "Video",
      enabled: false,
      category: "Academic",
      description: "Zoom live classes",
    },
    {
      id: 20,
      name: "Download Center",
      icon: "Download",
      enabled: true,
      category: "Resource",
      description: "Study materials",
    },
    {
      id: 21,
      name: "Gallery",
      icon: "Image",
      enabled: false,
      category: "Media",
      description: "Photo/Video gallery",
    },
  ]);

  const categories = [
    "All",
    "Core",
    "Academic",
    "Finance",
    "Resource",
    "Communication",
    "Ecommerce",
    "Media",
  ];

  const filteredModules = modules.filter(
    (module) =>
      module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toggleModule = (moduleId) => {
    setModules(
      modules.map((module) =>
        module.id === moduleId
          ? { ...module, enabled: !module.enabled }
          : module,
      ),
    );
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case "GraduationCap":
        return <GraduationCap className="w-5 h-5" />;
      case "Users":
        return <Users className="w-5 h-5" />;
      case "BookOpen":
        return <BookOpen className="w-5 h-5" />;
      case "DollarSign":
        return <DollarSign className="w-5 h-5" />;
      case "Calendar":
        return <Calendar className="w-5 h-5" />;
      case "Award":
        return <Award className="w-5 h-5" />;
      case "Car":
        return <Car className="w-5 h-5" />;
      case "Home":
        return <Home className="w-5 h-5" />;
      case "Utensils":
        return <Utensils className="w-5 h-5" />;
      case "Mail":
        return <Mail className="w-5 h-5" />;
      case "ShoppingBag":
        return <ShoppingBag className="w-5 h-5" />;
      case "Video":
        return <Video className="w-5 h-5" />;
      case "Download":
        return <Download className="w-5 h-5" />;
      case "Image":
        return <Image className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  const enabledCount = modules.filter((m) => m.enabled).length;
  const disabledCount = modules.filter((m) => !m.enabled).length;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Module Manager</h1>
          <p className="text-gray-500 mt-1">Enable or disable system modules</p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/system")}
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
            Module status updated successfully!
          </span>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card className="p-4 text-center">
          <p className="text-3xl font-bold text-blue-600">{modules.length}</p>
          <p className="text-gray-500">Total Modules</p>
        </Card>
        <Card className="p-4 text-center bg-green-50">
          <p className="text-3xl font-bold text-green-600">{enabledCount}</p>
          <p className="text-gray-500">Enabled</p>
        </Card>
        <Card className="p-4 text-center bg-red-50">
          <p className="text-3xl font-bold text-red-600">{disabledCount}</p>
          <p className="text-gray-500">Disabled</p>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search modules..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </Card>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredModules.map((module) => (
          <Card
            key={module.id}
            className={`p-4 transition-all ${module.enabled ? "bg-white" : "bg-gray-50 opacity-70"}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${module.enabled ? "bg-blue-100 text-blue-600" : "bg-gray-200 text-gray-500"}`}
                >
                  {getIcon(module.icon)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{module.name}</h3>
                  <p className="text-xs text-gray-500">{module.description}</p>
                  <Badge className="mt-1 text-xs bg-gray-100 text-gray-600">
                    {module.category}
                  </Badge>
                </div>
              </div>
              <button
                onClick={() => toggleModule(module.id)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  module.enabled ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    module.enabled ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Info Box */}
      <Card className="mt-6 p-4 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-medium text-blue-800">About Module Manager</p>
            <p className="text-sm text-blue-700">
              Enable or disable system modules. Disabled modules will be hidden
              from the sidebar and inaccessible to users.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
