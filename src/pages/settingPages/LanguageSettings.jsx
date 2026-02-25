import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Globe, Check, Download, Upload } from "lucide-react";
import { useState } from "react";
import { Badge } from "../../components/ui/badge";

export default function LanguageSettings() {
  const [languages, setLanguages] = useState([
    {
      id: 1,
      name: "English",
      code: "en",
      flag: "🇺🇸",
      isActive: true,
      isDefault: true,
      isRTL: false,
    },
    {
      id: 2,
      name: "Spanish",
      code: "es",
      flag: "🇪🇸",
      isActive: true,
      isDefault: false,
      isRTL: false,
    },
    {
      id: 3,
      name: "French",
      code: "fr",
      flag: "🇫🇷",
      isActive: true,
      isDefault: false,
      isRTL: false,
    },
    {
      id: 4,
      name: "Arabic",
      code: "ar",
      flag: "🇸🇦",
      isActive: false,
      isDefault: false,
      isRTL: true,
    },
    {
      id: 5,
      name: "German",
      code: "de",
      flag: "🇩🇪",
      isActive: false,
      isDefault: false,
      isRTL: false,
    },
    {
      id: 6,
      name: "Chinese",
      code: "zh",
      flag: "🇨🇳",
      isActive: false,
      isDefault: false,
      isRTL: false,
    },
    {
      id: 7,
      name: "Hindi",
      code: "hi",
      flag: "🇮🇳",
      isActive: false,
      isDefault: false,
      isRTL: false,
    },
    {
      id: 8,
      name: "Portuguese",
      code: "pt",
      flag: "🇵🇹",
      isActive: false,
      isDefault: false,
      isRTL: false,
    },
    {
      id: 9,
      name: "Russian",
      code: "ru",
      flag: "🇷🇺",
      isActive: false,
      isDefault: false,
      isRTL: false,
    },
    {
      id: 10,
      name: "Japanese",
      code: "ja",
      flag: "🇯🇵",
      isActive: false,
      isDefault: false,
      isRTL: false,
    },
    {
      id: 11,
      name: "Urdu",
      code: "ur",
      flag: "🇵🇰",
      isActive: false,
      isDefault: false,
      isRTL: true,
    },
    {
      id: 12,
      name: "Italian",
      code: "it",
      flag: "🇮🇹",
      isActive: false,
      isDefault: false,
      isRTL: false,
    },
  ]);

  const handleToggleActive = (id) => {
    setLanguages(
      languages.map((lang) => {
        if (lang.id === id) {
          // Don't allow deactivating the default language
          if (lang.isDefault && lang.isActive) {
            alert("Cannot deactivate the default language!");
            return lang;
          }
          return { ...lang, isActive: !lang.isActive };
        }
        return lang;
      }),
    );
  };

  const handleSetDefault = (id) => {
    setLanguages(
      languages.map((lang) => ({
        ...lang,
        isDefault: lang.id === id,
        isActive: lang.id === id ? true : lang.isActive, // Auto-activate when set as default
      })),
    );
    alert("Default language changed successfully!");
  };

  const activeLanguages = languages.filter((lang) => lang.isActive);
  const inactiveLanguages = languages.filter((lang) => !lang.isActive);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Language Settings
          </h1>
          <p className="text-gray-500 mt-1">
            Manage languages and translations for your system
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="text-gray-700">
            <Download className="w-4 h-4 mr-2" />
            Export Translations
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Upload className="w-4 h-4 mr-2" />
            Import Translations
          </Button>
        </div>
      </div>

      {/* Current Language Info */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center text-3xl shadow-lg">
              {languages.find((lang) => lang.isDefault)?.flag}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Current System Language
              </h3>
              <p className="text-gray-600 mt-1">
                {languages.find((lang) => lang.isDefault)?.name} (
                {languages.find((lang) => lang.isDefault)?.code.toUpperCase()})
              </p>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-700 border-green-200 px-4 py-2">
            Default Language
          </Badge>
        </div>
      </Card>

      {/* Active Languages */}
      <Card>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Active Languages
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {activeLanguages.length} language(s) currently active
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeLanguages.map((lang) => (
              <div
                key={lang.id}
                className={`p-4 border rounded-xl transition-all ${
                  lang.isDefault
                    ? "border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-md"
                    : "border-gray-200 bg-white hover:shadow-sm"
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{lang.flag}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {lang.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {lang.code.toUpperCase()}
                        {lang.isRTL && " • RTL"}
                      </p>
                    </div>
                  </div>
                  {lang.isDefault && (
                    <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                      Default
                    </Badge>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-3 border-t border-gray-200">
                  {!lang.isDefault && (
                    <Button
                      onClick={() => handleSetDefault(lang.id)}
                      variant="outline"
                      size="sm"
                      className="flex-1 text-blue-600 hover:bg-blue-50 border-blue-200"
                    >
                      <Check className="w-3 h-3 mr-1" />
                      Set Default
                    </Button>
                  )}
                  <Button
                    onClick={() => handleToggleActive(lang.id)}
                    variant="outline"
                    size="sm"
                    className={`${
                      lang.isDefault ? "flex-1" : ""
                    } text-gray-600 hover:bg-gray-50`}
                    disabled={lang.isDefault}
                  >
                    Deactivate
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Available Languages */}
      <Card>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Available Languages
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Activate languages to make them available in your system
              </p>
            </div>
          </div>

          {inactiveLanguages.length === 0 ? (
            <div className="text-center py-8">
              <Globe className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">All languages are activated</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {inactiveLanguages.map((lang) => (
                <div
                  key={lang.id}
                  className="p-4 border border-gray-200 rounded-xl bg-gray-50 hover:bg-white transition-all"
                >
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-3xl opacity-50">{lang.flag}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {lang.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {lang.code.toUpperCase()}
                        {lang.isRTL && " • RTL"}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-gray-200">
                    <Button
                      onClick={() => handleToggleActive(lang.id)}
                      variant="outline"
                      size="sm"
                      className="w-full text-green-600 hover:bg-green-50 border-green-200"
                    >
                      <Check className="w-3 h-3 mr-1" />
                      Activate
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Language Guidelines */}
        <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Globe className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Language Guidelines
              </h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Default language cannot be deactivated</li>
                <li>• At least one language must be active</li>
                <li>• RTL languages require special handling</li>
                <li>• Activate only languages you have translations for</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Translation Status */}
        <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Check className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Translation Status
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Total Strings:</span>
                  <span className="font-semibold text-gray-900">1,250</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Translated:</span>
                  <span className="font-semibold text-green-600">1,180</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Missing:</span>
                  <span className="font-semibold text-red-600">70</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
