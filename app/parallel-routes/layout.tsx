import React from "react";

export default function ParallelRoutesLayout({
  children,
  analytics,
  team,
  notifications,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  team: React.ReactNode;
  notifications: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg p-8">
          {children}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {/* Slot Analytics */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
              {analytics}
            </div>

            {/* Slot Team */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
              {team}
            </div>

            {/* Slot Notifications */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
              {notifications}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
