// src/pages/system/Backup.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Database,
  Download,
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  Clock,
  Trash2,
  Calendar,
  HardDrive,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function Backup() {
  const navigate = useNavigate();
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [backupProgress, setBackupProgress] = useState(0);

  // Mock Backup History
  const [backups, setBackups] = useState([
    {
      id: 1,
      name: "full_backup_2024_04_01.sql",
      size: "245 MB",
      date: "2024-04-01 10:30 AM",
      type: "Full",
      status: "Completed",
    },
    {
      id: 2,
      name: "full_backup_2024_03_25.sql",
      size: "238 MB",
      date: "2024-03-25 10:30 AM",
      type: "Full",
      status: "Completed",
    },
    {
      id: 3,
      name: "incremental_backup_2024_03_20.sql",
      size: "45 MB",
      date: "2024-03-20 10:30 AM",
      type: "Incremental",
      status: "Completed",
    },
    {
      id: 4,
      name: "full_backup_2024_03_15.sql",
      size: "230 MB",
      date: "2024-03-15 10:30 AM",
      type: "Full",
      status: "Completed",
    },
  ]);

  const handleCreateBackup = async () => {
    setIsBackingUp(true);
    for (let i = 0; i <= 100; i += 10) {
      setBackupProgress(i);
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
    setIsBackingUp(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    setBackupProgress(0);
  };

  const handleRestore = (backup) => {
    setIsRestoring(true);
    setTimeout(() => {
      setIsRestoring(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 2000);
  };

  const handleDeleteBackup = (backupId) => {
    setBackups(backups.filter((b) => b.id !== backupId));
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert(`Uploading ${file.name} for restoration...`);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Backup & Restore</h1>
          <p className="text-gray-500 mt-1">
            Manage database backups and restoration
          </p>
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
            Operation completed successfully!
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Backup Actions */}
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Database className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Create Backup
                </h2>
                <p className="text-sm text-gray-500">Full database backup</p>
              </div>
            </div>
            <Button
              onClick={handleCreateBackup}
              disabled={isBackingUp}
              className="w-full bg-blue-600 text-white py-3"
            >
              {isBackingUp ? (
                <>
                  <Clock className="w-4 h-4 mr-2 animate-spin" /> Creating
                  Backup... {backupProgress}%
                </>
              ) : (
                <>
                  <Database className="w-4 h-4 mr-2" /> Create Backup
                </>
              )}
            </Button>
            {isBackingUp && (
              <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 rounded-full h-2 transition-all"
                  style={{ width: `${backupProgress}%` }}
                />
              </div>
            )}
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Upload className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Restore from File
                </h2>
                <p className="text-sm text-gray-500">Upload backup file</p>
              </div>
            </div>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
              <input
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                id="backup-file"
                accept=".sql,.zip"
              />
              <label htmlFor="backup-file" className="cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  Click to upload backup file
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  SQL or ZIP (Max 50MB)
                </p>
              </label>
            </div>
          </Card>

          <Card className="p-4 bg-yellow-50 border-yellow-200">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="font-medium text-yellow-800">Backup Schedule</p>
                <p className="text-sm text-yellow-700">
                  Automatic backups: Daily at 2 AM
                </p>
                <p className="text-sm text-yellow-700">
                  Retention period: 30 days
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Panel - Backup History */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <HardDrive className="w-5 h-5 text-blue-600" /> Backup History
            </h2>
            <Badge className="bg-blue-100 text-blue-700">
              {backups.length} Backups
            </Badge>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {backups.map((backup) => (
              <div
                key={backup.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Database className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{backup.name}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {backup.date}
                      </span>
                      <span className="text-xs text-gray-500">
                        {backup.size}
                      </span>
                      <Badge className="text-xs">{backup.type}</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRestore(backup)}
                    disabled={isRestoring}
                  >
                    <Upload className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteBackup(backup.id)}
                    className="text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {backups.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                No backups found
              </h3>
              <p className="text-gray-500">
                Click "Create Backup" to create your first backup
              </p>
            </div>
          )}
        </Card>
      </div>

      {/* Info Box */}
      <Card className="mt-6 p-4 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-medium text-blue-800">About Backup</p>
            <p className="text-sm text-blue-700">
              Regular backups ensure your data is safe. Download backups to your
              local system for extra security.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
