// src/pages/auth/ForgotPassword.jsx

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForgotPasswordMutation } from "../../store/api/authApi";
import { addNotification } from "../../store/slices/uiSlice";
import { GraduationCap, Mail, ArrowLeft, Send } from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      await forgotPassword({ email }).unwrap();
      setIsSubmitted(true);
      dispatch(
        addNotification({
          message: "Reset link sent to your email!",
          type: "success",
        }),
      );
    } catch (error) {
      dispatch(
        addNotification({
          message: error.data?.message || "Failed to send reset link",
          type: "error",
        }),
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Forgot Password</h1>
          <p className="text-gray-500 mt-1">Reset your password</p>
        </div>

        {!isSubmitted ? (
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                We'll send a password reset link to this email
              </p>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2"
            >
              {isLoading ? (
                "Sending..."
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" /> Send Reset Link
                </>
              )}
            </Button>

            <div className="text-center">
              <Link
                to="/login"
                className="text-sm text-blue-600 hover:underline flex items-center justify-center gap-1"
              >
                <ArrowLeft className="w-3 h-3" /> Back to Login
              </Link>
            </div>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Mail className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              Check Your Email
            </h2>
            <p className="text-gray-500">
              We've sent a password reset link to{" "}
              <span className="font-medium text-gray-700">{email}</span>
            </p>
            <p className="text-sm text-gray-400">
              Didn't receive the email? Check your spam folder.
            </p>
            <Button
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              className="w-full"
            >
              Try Again
            </Button>
            <Link
              to="/login"
              className="block text-sm text-blue-600 hover:underline"
            >
              Back to Login
            </Link>
          </div>
        )}
      </Card>
    </div>
  );
}
