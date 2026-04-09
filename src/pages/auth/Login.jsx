// src/pages/auth/Login.jsx - MOCK VERSION (No Backend Needed)

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/slices/authSlice";
import { addNotification } from "../../store/slices/uiSlice";
import { GraduationCap, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

// Mock Users Data
const mockUsers = {
  "admin@school.edu": {
    password: "admin123",
    role: "school_admin",
    name: "Admin User",
    schoolId: "school_001",
  },
  "teacher@school.edu": {
    password: "teacher123",
    role: "teacher",
    name: "Teacher User",
    schoolId: "school_001",
  },
  "parent@school.edu": {
    password: "parent123",
    role: "parent",
    name: "Parent User",
    schoolId: "school_001",
  },
  "accountant@school.edu": {
    password: "accountant123",
    role: "accountant",
    name: "Accountant User",
    schoolId: "school_001",
  },
  "staff@school.edu": {
    password: "staff123",
    role: "staff",
    name: "Staff User",
    schoolId: "school_001",
  },
  "superadmin@school.edu": {
    password: "super123",
    role: "super_admin",
    name: "Super Admin",
    schoolId: null,
  },
};

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      dispatch(
        addNotification({ message: "Please fill all fields", type: "error" }),
      );
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const user = mockUsers[formData.email];

    if (!user || user.password !== formData.password) {
      dispatch(
        addNotification({
          message: "Invalid email or password",
          type: "error",
        }),
      );
      setIsLoading(false);
      return;
    }

    dispatch(
      setCredentials({
        user: {
          id: "1",
          name: user.name,
          email: formData.email,
          role: user.role,
          schoolId: user.schoolId,
        },
        token: "mock_jwt_token_" + Date.now(),
        role: user.role,
        schoolId: user.schoolId,
        permissions: [],
      }),
    );

    dispatch(
      addNotification({
        message: "Login successful! Welcome back.",
        type: "success",
      }),
    );

    // Redirect based on role
    const redirectMap = {
      super_admin: "/super-admin/dashboard",
      school_admin: "/dashboard",
      teacher: "/teacher/dashboard",
      parent: "/parent/dashboard",
      accountant: "/accountant/dashboard",
      staff: "/staff/dashboard",
    };
    navigate(redirectMap[user.role] || "/dashboard");

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <Card className="w-full max-w-md p-8 shadow-2xl border-0">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">BrainForge</h1>
          <p className="text-gray-500 mt-1">School Management System</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="email"
                placeholder="admin@school.edu"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="pl-9 h-11 bg-gray-50 focus:bg-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="pl-9 pr-10 h-11 bg-gray-50 focus:bg-white"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-gray-400" />
                ) : (
                  <Eye className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) =>
                  setFormData({ ...formData, rememberMe: e.target.checked })
                }
                className="w-4 h-4 rounded border-gray-300"
              />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2.5"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>

          <div className="text-center pt-2">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 font-semibold hover:underline"
              >
                Register here
              </Link>
            </p>
          </div>
        </form>

        {/* Demo Credentials */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-center text-gray-400 mb-2">
            Demo Credentials
          </p>
          <div className="flex flex-col gap-1 text-xs text-center text-gray-400">
            <p>Admin: admin@school.edu / admin123</p>
            <p>Teacher: teacher@school.edu / teacher123</p>
            <p>Parent: parent@school.edu / parent123</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
