import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import {
  Database,
  Download,
  Upload,
  Clock,
  Trash2,
  HardDrive,
  AlertCircle,
  CheckCircle,
  FileArchive,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "../../components/ui/badge";

export default function BackupRestore() {
  const [backups, setBackups] = useState([
    {
      id: 1,
      name: "backup_2026_02_25_10_30.sql",
      date: "2026-02-25",
      time: "10:30 AM",
      size: "45.6 MB",
      type: "Full Backup",
      status: "completed",
    },
    {
      id: 2,
      name: "backup_2026_02_20_14_15.sql",
      date: "2026-02-20",
      time: "02:15 PM",
      size: "43.2 MB",
      type: "Full Backup",
      status: "completed",
    },
    {
      id: 3,
      name: "backup_2026_02_15_09_00.sql",
      date: "2026-02-15",
      time: "09:00 AM",
      size: "41.8 MB",
      type: "Scheduled Backup",
      status: "completed",
    },
    {
      id: 4,
      name: "backup_2026_02_10_11_45.sql",
      date: "2026-02-10",
      time: "11:45 AM",
      size: "40.5 MB",
      type: "Manual Backup",
      status: "completed",
    },
  ]);

  const [isCreatingBackup, setIsCreatingBackup] = useState(false);
  const [backupResult, setBackupResult] = useState(null);

  const handleCreateBackup = () => {
    setIsCreatingBackup(true);
    setBackupResult(null);

    // Simulate backup creation
    setTimeout(() => {
      const newBackup = {
        id: Date.now(),
        name: `backup_${new Date().toISOString().split("T")[0].replace(/-/g, "_")}_${new Date().toTimeString().slice(0, 5).replace(":", "_")}.sql`,
        date: new Date().toISOString().split("T")[0],
        time: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        size: "46.2 MB",
        type: "Manual Backup",
        status: "completed",
      };

      setBackups([newBackup, ...backups]);
      setIsCreatingBackup(false);
      setBackupResult({
        success: true,
        message: "Database backup created successfully!",
      });
    }, 3000);
  };

  const handleDownload = (backup) => {
    alert(`Downloading: ${backup.name}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this backup?")) {
      setBackups(backups.filter((backup) => backup.id !== id));
      alert("Backup deleted successfully!");
    }
  };

  const handleRestore = (backup) => {
    if (
      window.confirm(
        `Are you sure you want to restore from "${backup.name}"? This will overwrite current data!`,
      )
    ) {
      alert("Restore process initiated. This may take a few minutes...");
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Backup & Restore</h1>
          <p className="text-gray-500 mt-1">
            Manage database backups and restore points
          </p>
        </div>
      </div>

      {/* Storage Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <HardDrive className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Storage</p>
              <h3 className="text-2xl font-bold text-gray-900">500 GB</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
              <Database className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Used Storage</p>
              <h3 className="text-2xl font-bold text-gray-900">171 MB</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
              <FileArchive className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Backups</p>
              <h3 className="text-2xl font-bold text-gray-900">
                {backups.length}
              </h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Create Backup */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Database className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Create Database Backup
            </h2>
            <p className="text-sm text-gray-500">
              Create a full backup of your database
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">
                Manual Backup
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Create a backup of your entire database including all tables,
                data, and settings. This process may take a few minutes
                depending on database size.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Estimated time: 2-5 minutes</span>
              </div>
            </div>
            <Button
              onClick={handleCreateBackup}
              disabled={isCreatingBackup}
              className="bg-blue-600 hover:bg-blue-700 text-white w-full md:w-auto"
            >
              {isCreatingBackup ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Creating Backup...
                </>
              ) : (
                <>
                  <Database className="w-4 h-4 mr-2" />
                  Create Backup Now
                </>
              )}
            </Button>
          </div>

          {/* Backup Result */}
          {backupResult && (
            <div
              className={`mt-4 p-4 rounded-lg ${
                backupResult.success
                  ? "bg-green-100 border border-green-200"
                  : "bg-red-100 border border-red-200"
              }`}
            >
              <div className="flex items-start gap-3">
                {backupResult.success ? (
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <h4
                    className={`font-semibold ${
                      backupResult.success ? "text-green-900" : "text-red-900"
                    }`}
                  >
                    {backupResult.success ? "Success!" : "Error!"}
                  </h4>
                  <p
                    className={`text-sm mt-1 ${
                      backupResult.success ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {backupResult.message}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Restore from File */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <Upload className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Restore from File
            </h2>
            <p className="text-sm text-gray-500">
              Upload and restore database from backup file
            </p>
          </div>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-500 transition-colors cursor-pointer bg-gradient-to-r from-green-50 to-emerald-50">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Upload Backup File
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Click to browse or drag and drop your backup file here
          </p>
          <p className="text-xs text-gray-500 mb-4">
            Supported formats: .sql, .zip (Max size: 100MB)
          </p>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            <Upload className="w-4 h-4 mr-2" />
            Choose File
          </Button>
          <input type="file" className="hidden" accept=".sql,.zip" />
        </div>
      </Card>

      {/* Backup History */}
      <Card>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Backup History
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {backups.length} backup(s) available
              </p>
            </div>
          </div>

          {backups.length === 0 ? (
            <div className="text-center py-12">
              <Database className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Backups Found
              </h3>
              <p className="text-gray-500 mb-4">
                Create your first backup to get started
              </p>
              <Button
                onClick={handleCreateBackup}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Database className="w-4 h-4 mr-2" />
                Create Backup
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {backups.map((backup) => (
                <div
                  key={backup.id}
                  className="p-5 border border-gray-200 rounded-xl bg-white hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    {/* Left Section */}
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileArchive className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1 truncate">
                          {backup.name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>
                              {backup.date} at {backup.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <HardDrive className="w-4 h-4" />
                            <span>{backup.size}</span>
                          </div>
                          <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                            {backup.type}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Right Section - Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button
                        onClick={() => handleDownload(backup)}
                        variant="outline"
                        size="sm"
                        className="text-blue-600 hover:bg-blue-50 border-blue-200"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => handleRestore(backup)}
                        variant="outline"
                        size="sm"
                        className="text-green-600 hover:bg-green-50 border-green-200"
                      >
                        <Upload className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => handleDelete(backup.id)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:bg-red-50 border-red-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Automatic Backup Schedule */}
      <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Clock className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Automatic Backup Schedule
            </h2>
            <p className="text-sm text-gray-500">
              Configure automatic backup frequency
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { value: "daily", label: "Daily", desc: "Every day at 2:00 AM" },
            {
              value: "weekly",
              label: "Weekly",
              desc: "Every Sunday at 2:00 AM",
            },
            {
              value: "monthly",
              label: "Monthly",
              desc: "1st day of month at 2:00 AM",
            },
          ].map((schedule) => (
            <button
              key={schedule.value}
              className="p-4 bg-white rounded-lg border border-purple-200 hover:border-purple-400 transition-all text-left"
            >
              <h3 className="font-semibold text-gray-900 mb-1">
                {schedule.label}
              </h3>
              <p className="text-sm text-gray-600">{schedule.desc}</p>
            </button>
          ))}
        </div>

        <div className="mt-4 p-4 bg-white rounded-lg border border-purple-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  Current Schedule: Weekly
                </p>
                <p className="text-sm text-gray-500">
                  Next backup: Sunday, 2:00 AM
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="text-purple-600 hover:bg-purple-50 border-purple-200"
            >
              Change Schedule
            </Button>
          </div>
        </div>
      </Card>

      {/* Important Notes */}
      <Card className="p-6 bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Important Backup Guidelines
            </h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Create regular backups to prevent data loss</li>
              <li>• Store backups in multiple locations (local + cloud)</li>
              <li>• Test restore process regularly to ensure backups work</li>
              <li>
                • Restoring will overwrite current database - use with caution
              </li>
              <li>• Keep at least 3-5 recent backups for safety</li>
              <li>• Delete old backups to free up storage space</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
