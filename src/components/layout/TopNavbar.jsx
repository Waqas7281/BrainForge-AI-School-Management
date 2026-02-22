import { Search, Bell, User } from "lucide-react";
import { Input } from "../ui/input";

export function TopNavbar() {
  return (
    <header className="h-16 bg-white border-b border-gray-300 px-6 flex items-center justify-between sticky top-0 z-10">
      {/* Left side - Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <Input
            type="search"
            placeholder="Search students, classes..."
            className="pl-10 bg-gray-50 border-gray-300"
          />
        </div>
      </div>

      {/* Right side - Icons and User */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-gray-700" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-error-red rounded-full"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-gray-300">
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900">Admin User</div>
            <div className="text-xs text-gray-500">School Admin</div>
          </div>
          <div className="w-9 h-9 rounded-full bg-primary-light flex items-center justify-center">
            <User className="w-5 h-5 text-primary-blue" />
          </div>
        </div>
      </div>
    </header>
  );
}
