import { useNavigate } from "react-router-dom";
import { ShieldX } from "lucide-react";
import { Button } from "../components/ui/button";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShieldX className="w-10 h-10 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
        <p className="text-gray-500 mb-6">
          You don't have permission to access this page.
        </p>
        <Button onClick={() => navigate(-1)} className="bg-blue-600 text-white">
          Go Back
        </Button>
      </div>
    </div>
  );
}
