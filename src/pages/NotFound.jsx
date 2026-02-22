import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary-blue">404</h1>
        <h2 className="mt-4 text-3xl font-semibold text-gray-900">
          Page Not Found
        </h2>
        <p
          className="mt-2 text-gray-500"
          style={{ fontSize: "var(--text-body)" }}
        >
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button
          onClick={() => navigate("/")}
          className="mt-6 bg-primary-blue hover:bg-primary-dark text-white flex items-center gap-2 mx-auto"
        >
          <Home className="w-4 h-4" />
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}
