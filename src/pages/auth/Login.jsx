// src/pages/auth/Login.jsx - MOCK VERSION (No backend needed)

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/slices/authSlice";
import { addNotification } from "../../store/slices/uiSlice";
import { GraduationCap, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

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

  // Mock credentials
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      dispatch(
        addNotification({ message: "Please fill all fields", type: "error" }),
      );
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

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

    // Store user data in Redux
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
    if (user.role === "super_admin") {
      navigate("/super-admin/dashboard");
    } else if (user.role === "school_admin") {
      navigate("/dashboard");
    } else if (user.role === "teacher") {
      navigate("/teacher/dashboard");
    } else if (user.role === "parent") {
      navigate("/parent/dashboard");
    } else if (user.role === "accountant") {
      navigate("/accountant/dashboard");
    } else {
      navigate("/dashboard");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <Card className="w-full max-w-md p-8 shadow-2xl border-0">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">BrainForge</h1>
          <p className="text-gray-500 mt-1">School Management System</p>
        </div>

        {/* Welcome Message */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Welcome Back!</h2>
          <p className="text-sm text-gray-400">Please login to your account</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
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
                className="pl-9 h-11 bg-gray-50 border-gray-200 focus:bg-white"
                required
              />
            </div>
          </div>

          {/* Password Field */}
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
                className="pl-9 pr-10 h-11 bg-gray-50 border-gray-200 focus:bg-white"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) =>
                  setFormData({ ...formData, rememberMe: e.target.checked })
                }
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2.5 text-base font-semibold"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>

          {/* Register Link */}
          <div className="text-center pt-2">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
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
