import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Clock, Search, Check, Globe, MapPin } from "lucide-react";
import { useState } from "react";
import { Badge } from "../../components/ui/badge";

export default function TimezoneSettings() {
  const timezones = [
    {
      id: 1,
      name: "Pacific/Midway",
      offset: "-11:00",
      region: "Midway Island",
    },
    { id: 2, name: "Pacific/Honolulu", offset: "-10:00", region: "Hawaii" },
    { id: 3, name: "America/Anchorage", offset: "-09:00", region: "Alaska" },
    {
      id: 4,
      name: "America/Los_Angeles",
      offset: "-08:00",
      region: "Pacific Time (US & Canada)",
    },
    {
      id: 5,
      name: "America/Denver",
      offset: "-07:00",
      region: "Mountain Time (US & Canada)",
    },
    {
      id: 6,
      name: "America/Chicago",
      offset: "-06:00",
      region: "Central Time (US & Canada)",
    },
    {
      id: 7,
      name: "America/New_York",
      offset: "-05:00",
      region: "Eastern Time (US & Canada)",
    },
    {
      id: 8,
      name: "America/Caracas",
      offset: "-04:00",
      region: "Caracas, La Paz",
    },
    {
      id: 9,
      name: "America/Argentina/Buenos_Aires",
      offset: "-03:00",
      region: "Buenos Aires, Georgetown",
    },
    {
      id: 10,
      name: "Atlantic/South_Georgia",
      offset: "-02:00",
      region: "Mid-Atlantic",
    },
    { id: 11, name: "Atlantic/Azores", offset: "-01:00", region: "Azores" },
    {
      id: 12,
      name: "Europe/London",
      offset: "+00:00",
      region: "London, Dublin, Edinburgh",
    },
    {
      id: 13,
      name: "Europe/Paris",
      offset: "+01:00",
      region: "Paris, Amsterdam, Berlin",
    },
    {
      id: 14,
      name: "Europe/Athens",
      offset: "+02:00",
      region: "Athens, Cairo, Jerusalem",
    },
    {
      id: 15,
      name: "Europe/Moscow",
      offset: "+03:00",
      region: "Moscow, Kuwait, Riyadh",
    },
    {
      id: 16,
      name: "Asia/Dubai",
      offset: "+04:00",
      region: "Dubai, Abu Dhabi, Muscat",
    },
    {
      id: 17,
      name: "Asia/Karachi",
      offset: "+05:00",
      region: "Islamabad, Karachi, Tashkent",
    },
    { id: 18, name: "Asia/Dhaka", offset: "+06:00", region: "Dhaka, Colombo" },
    {
      id: 19,
      name: "Asia/Bangkok",
      offset: "+07:00",
      region: "Bangkok, Hanoi, Jakarta",
    },
    {
      id: 20,
      name: "Asia/Shanghai",
      offset: "+08:00",
      region: "Beijing, Hong Kong, Singapore",
    },
    {
      id: 21,
      name: "Asia/Tokyo",
      offset: "+09:00",
      region: "Tokyo, Seoul, Osaka",
    },
    {
      id: 22,
      name: "Australia/Sydney",
      offset: "+10:00",
      region: "Sydney, Melbourne, Brisbane",
    },
    {
      id: 23,
      name: "Pacific/Noumea",
      offset: "+11:00",
      region: "New Caledonia",
    },
    {
      id: 24,
      name: "Pacific/Auckland",
      offset: "+12:00",
      region: "Auckland, Wellington",
    },
  ];

  const [selectedTimezone, setSelectedTimezone] = useState(timezones[6]); // Default: America/New_York
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY");
  const [timeFormat, setTimeFormat] = useState("12");

  const filteredTimezones = timezones.filter(
    (tz) =>
      tz.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tz.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tz.offset.includes(searchQuery),
  );

  const handleTimezoneSelect = (timezone) => {
    setSelectedTimezone(timezone);
  };

  const handleSave = () => {
    alert("Timezone settings saved successfully!");
  };

  // Get current time in selected timezone
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: timeFormat === "12",
    });
  };

  const getCurrentDate = () => {
    const now = new Date();
    if (dateFormat === "MM/DD/YYYY") {
      return now.toLocaleDateString("en-US");
    } else if (dateFormat === "DD/MM/YYYY") {
      return now.toLocaleDateString("en-GB");
    } else {
      return now.toLocaleDateString("en-CA");
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Timezone Settings
          </h1>
          <p className="text-gray-500 mt-1">
            Configure timezone and date/time formats
          </p>
        </div>
        <Button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Check className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
      </div>

      {/* Current Timezone Display */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Current Timezone
              </h3>
              <p className="text-gray-600 mt-1">
                {selectedTimezone.region} (UTC {selectedTimezone.offset})
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {selectedTimezone.name}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {getCurrentTime()}
            </div>
            <div className="text-sm text-gray-600">{getCurrentDate()}</div>
          </div>
        </div>
      </Card>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timezone Selection */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                Select Timezone
              </h2>
              <p className="text-sm text-gray-500">
                Choose your school's timezone
              </p>
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search timezone by region or offset..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Timezone List */}
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
              {filteredTimezones.map((tz) => (
                <button
                  key={tz.id}
                  onClick={() => handleTimezoneSelect(tz)}
                  className={`w-full p-4 rounded-lg border transition-all text-left ${
                    selectedTimezone.id === tz.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <h3 className="font-semibold text-gray-900">
                          {tz.region}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-500 mt-1 ml-6">
                        {tz.name}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        className={`${
                          tz.offset.startsWith("-")
                            ? "bg-red-100 text-red-700 border-red-200"
                            : "bg-green-100 text-green-700 border-green-200"
                        }`}
                      >
                        UTC {tz.offset}
                      </Badge>
                      {selectedTimezone.id === tz.id && (
                        <Check className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {filteredTimezones.length === 0 && (
              <div className="text-center py-12">
                <Globe className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No timezones found</p>
              </div>
            )}
          </Card>
        </div>

        {/* Date & Time Format */}
        <div className="space-y-6">
          {/* Date Format */}
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                Date Format
              </h2>
              <p className="text-sm text-gray-500">
                Choose date display format
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  value: "MM/DD/YYYY",
                  label: "MM/DD/YYYY",
                  example: "12/25/2026",
                },
                {
                  value: "DD/MM/YYYY",
                  label: "DD/MM/YYYY",
                  example: "25/12/2026",
                },
                {
                  value: "YYYY-MM-DD",
                  label: "YYYY-MM-DD",
                  example: "2026-12-25",
                },
              ].map((format) => (
                <button
                  key={format.value}
                  onClick={() => setDateFormat(format.value)}
                  className={`w-full p-4 rounded-lg border transition-all text-left ${
                    dateFormat === format.value
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {format.label}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Example: {format.example}
                      </p>
                    </div>
                    {dateFormat === format.value && (
                      <Check className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* Time Format */}
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                Time Format
              </h2>
              <p className="text-sm text-gray-500">
                Choose time display format
              </p>
            </div>

            <div className="space-y-3">
              {[
                { value: "12", label: "12 Hour", example: "02:30 PM" },
                { value: "24", label: "24 Hour", example: "14:30" },
              ].map((format) => (
                <button
                  key={format.value}
                  onClick={() => setTimeFormat(format.value)}
                  className={`w-full p-4 rounded-lg border transition-all text-left ${
                    timeFormat === format.value
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {format.label}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Example: {format.example}
                      </p>
                    </div>
                    {timeFormat === format.value && (
                      <Check className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* Preview */}
          <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Preview</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Current Date:</span>
                    <span className="font-semibold text-gray-900">
                      {getCurrentDate()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Current Time:</span>
                    <span className="font-semibold text-gray-900">
                      {getCurrentTime()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Timezone:</span>
                    <span className="font-semibold text-gray-900">
                      UTC {selectedTimezone.offset}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Info Card */}
      <Card className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Globe className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Important Information
            </h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>
                • Timezone affects all date and time displays in the system
              </li>
              <li>• Changing timezone will update all schedules and reports</li>
              <li>
                • Make sure to select the correct timezone for your location
              </li>
              <li>• Date and time formats are applied system-wide</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
