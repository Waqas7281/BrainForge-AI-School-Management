// src/pages/staff/AddStaff.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Save,
  X,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  User,
  Building2,
  CreditCard,
  Users,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export default function AddStaff() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("basic");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    // Basic Information
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    bloodGroup: "",

    // Contact Information
    email: "",
    phone: "",
    alternatePhone: "",
    address: "",
    city: "",
    state: "",

    // Professional Information
    employeeId: "",
    role: "",
    department: "",
    joiningDate: "",
    qualification: "",
    experience: "",

    // Salary Information
    basicSalary: "",
    allowances: "",
    deductions: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",

    // Login Information
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // Mock Data
  const roles = [
    "Accountant",
    "Librarian",
    "Security Guard",
    "Peon",
    "Driver",
    "Receptionist",
    "Lab Assistant",
    "Nurse",
    "Clerk",
    "Office Assistant",
  ];
  const departments = [
    "Accounts",
    "Library",
    "Security",
    "Administration",
    "Transport",
    "Front Office",
    "Science",
    "Medical",
    "IT",
  ];
  const genders = ["Male", "Female", "Other"];
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const generateEmployeeId = () => {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 1000);
    const employeeId = `STF${year}${random.toString().padStart(3, "0")}`;
    setFormData((prev) => ({ ...prev, employeeId }));
  };

  const generateUsername = () => {
    if (formData.firstName && formData.lastName) {
      const username = `${formData.firstName.toLowerCase()}.${formData.lastName.toLowerCase()}${Math.floor(Math.random() * 100)}`;
      setFormData((prev) => ({ ...prev, username }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name required";
    if (!formData.lastName) newErrors.lastName = "Last name required";
    if (!formData.email) newErrors.email = "Email required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email";
    if (!formData.phone) newErrors.phone = "Phone required";
    if (!formData.role) newErrors.role = "Role required";
    if (!formData.department) newErrors.department = "Department required";
    if (!formData.username) newErrors.username = "Username required";
    if (!formData.password) newErrors.password = "Password required";
    else if (formData.password.length < 6)
      newErrors.password = "Password min 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      navigate("/staff");
    }, 2000);
  };

  const tabs = [
    { id: "basic", label: "Basic Info", icon: User },
    { id: "professional", label: "Professional", icon: Briefcase },
    { id: "salary", label: "Salary & Bank", icon: DollarSign },
    { id: "login", label: "Login", icon: CreditCard },
  ];

  const netSalary =
    (parseInt(formData.basicSalary) || 0) +
    (parseInt(formData.allowances) || 0) -
    (parseInt(formData.deductions) || 0);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Add New Staff</h1>
          <p className="text-gray-500 mt-1">Register a new staff member</p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/staff")}
          className="flex items-center gap-2"
        >
          <X className="w-4 h-4" /> Cancel
        </Button>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-700 font-medium">
            Staff added successfully!
          </span>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex gap-1 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all whitespace-nowrap ${isActive ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`}
              >
                <Icon className="w-4 h-4" /> {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Basic Information Tab */}
        {activeTab === "basic" && (
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  First Name *
                </label>
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={errors.firstName ? "border-red-500" : ""}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Last Name *
                </label>
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={errors.lastName ? "border-red-500" : ""}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Date of Birth
                </label>
                <Input
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="">Select</option>
                  {genders.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Blood Group
                </label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="">Select</option>
                  {bloodGroups.map((bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email *
                </label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Phone *
                </label>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Alternate Phone
                </label>
                <Input
                  name="alternatePhone"
                  value={formData.alternatePhone}
                  onChange={handleChange}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Address
                </label>
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">City</label>
                <Input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">State</label>
                <Input
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>
            </div>
          </Card>
        )}

        {/* Professional Information Tab */}
        {activeTab === "professional" && (
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Employee ID
                </label>
                <div className="flex gap-2">
                  <Input
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleChange}
                    placeholder="Auto-generated"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={generateEmployeeId}
                  >
                    Generate
                  </Button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Joining Date
                </label>
                <Input
                  name="joiningDate"
                  type="date"
                  value={formData.joiningDate}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Role *</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg ${errors.role ? "border-red-500" : "border-gray-300"}`}
                >
                  <option value="">Select Role</option>
                  {roles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                {errors.role && (
                  <p className="text-red-500 text-xs mt-1">{errors.role}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Department *
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg ${errors.department ? "border-red-500" : "border-gray-300"}`}
                >
                  <option value="">Select Department</option>
                  {departments.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                {errors.department && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.department}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Qualification
                </label>
                <Input
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  placeholder="e.g., Graduate, Post Graduate"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Experience (Years)
                </label>
                <Input
                  name="experience"
                  type="number"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="e.g., 5"
                />
              </div>
            </div>
          </Card>
        )}

        {/* Salary & Bank Tab */}
        {activeTab === "salary" && (
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Basic Salary (₹)
                </label>
                <Input
                  name="basicSalary"
                  type="number"
                  value={formData.basicSalary}
                  onChange={handleChange}
                  placeholder="Monthly salary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Allowances (₹)
                </label>
                <Input
                  name="allowances"
                  type="number"
                  value={formData.allowances}
                  onChange={handleChange}
                  placeholder="HRA, DA, etc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Deductions (₹)
                </label>
                <Input
                  name="deductions"
                  type="number"
                  value={formData.deductions}
                  onChange={handleChange}
                  placeholder="PF, TDS, etc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Bank Name
                </label>
                <Input
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Account Number
                </label>
                <Input
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  IFSC Code
                </label>
                <Input
                  name="ifscCode"
                  value={formData.ifscCode}
                  onChange={handleChange}
                />
              </div>
            </div>

            {(formData.basicSalary ||
              formData.allowances ||
              formData.deductions) && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">Salary Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Basic Salary:</span>
                    <span>₹{parseInt(formData.basicSalary) || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Allowances:</span>
                    <span>₹{parseInt(formData.allowances) || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Deductions:</span>
                    <span>₹{parseInt(formData.deductions) || 0}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="font-semibold">Net Salary:</span>
                    <span className="font-bold text-green-600">
                      ₹{netSalary}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </Card>
        )}

        {/* Login Tab */}
        {activeTab === "login" && (
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Username *
                </label>
                <div className="flex gap-2">
                  <Input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`flex-1 ${errors.username ? "border-red-500" : ""}`}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={generateUsername}
                  >
                    Generate
                  </Button>
                </div>
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Password *
                </label>
                <div className="relative">
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    className={
                      errors.password ? "border-red-500 pr-10" : "pr-10"
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Minimum 6 characters
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              const idx = tabs.findIndex((t) => t.id === activeTab);
              if (idx > 0) setActiveTab(tabs[idx - 1].id);
            }}
            disabled={activeTab === tabs[0].id}
          >
            Previous
          </Button>
          {activeTab !== tabs[tabs.length - 1].id ? (
            <Button
              type="button"
              onClick={() => {
                const idx = tabs.findIndex((t) => t.id === activeTab);
                if (idx < tabs.length - 1) setActiveTab(tabs[idx + 1].id);
              }}
              className="bg-blue-600 text-white"
            >
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600 text-white flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />{" "}
                  Registering...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" /> Register Staff
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
