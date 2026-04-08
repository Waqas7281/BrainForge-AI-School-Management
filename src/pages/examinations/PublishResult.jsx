// src/pages/examinations/PublishResult.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Send,
  CheckCircle,
  X,
  AlertCircle,
  Globe,
  Eye,
  Users,
  Calendar,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function PublishResult() {
  const navigate = useNavigate();
  const [selectedExam, setSelectedExam] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [publishedResults, setPublishedResults] = useState([
    {
      id: 1,
      exam: "Mid Term 2024",
      class: "Class 1",
      publishDate: "2024-03-15",
      status: "Published",
    },
    {
      id: 2,
      exam: "Mid Term 2024",
      class: "Class 2",
      publishDate: "2024-03-15",
      status: "Published",
    },
  ]);

  const exams = [
    "Mid Term 2024",
    "Final Term 2024",
    "Half Yearly 2024",
    "Annual 2024",
  ];
  const classes = ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5"];

  const handlePublish = async () => {
    if (!selectedExam || !selectedClass) return;
    setIsPublishing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setPublishedResults([
      ...publishedResults,
      {
        id: Date.now(),
        exam: selectedExam,
        class: selectedClass,
        publishDate: new Date().toISOString().split("T")[0],
        status: "Published",
      },
    ]);
    setIsPublishing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    setSelectedExam("");
    setSelectedClass("");
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Publish Result</h1>
          <p className="text-gray-500 mt-1">
            Publish examination results for students
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/examinations")}
          className="flex items-center gap-2"
        >
          <X className="w-4 h-4" /> Back
        </Button>
      </div>

      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-700">
            Result published successfully! Students can now view their results.
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Send className="w-5 h-5 text-blue-600" /> Publish New Result
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Select Exam
              </label>
              <select
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="">Choose Exam</option>
                {exams.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Select Class
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="">Choose Class</option>
                {classes.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <Button
              onClick={handlePublish}
              disabled={!selectedExam || !selectedClass || isPublishing}
              className="w-full bg-green-600 text-white py-3"
            >
              {isPublishing ? (
                "Publishing..."
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" /> Publish Result
                </>
              )}
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-600" /> Published Results
          </h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {publishedResults.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No results published yet</p>
              </div>
            ) : (
              publishedResults.map((result) => (
                <div
                  key={result.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{result.exam}</p>
                    <p className="text-sm text-gray-500">
                      {result.class} | Published: {result.publishDate}
                    </p>
                  </div>
                  <Badge className="bg-green-100 text-green-700">
                    <CheckCircle className="w-3 h-3 mr-1" /> {result.status}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      <Card className="mt-6 p-4 bg-yellow-50 border-yellow-200">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600" />
          <div>
            <p className="font-medium text-yellow-800">Important Note</p>
            <p className="text-sm text-yellow-700">
              Once a result is published, students and parents can view it.
              Published results cannot be edited.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
