import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, CheckCircle, AlertCircle, Shield } from "lucide-react";
import GoBackButton from "./GoBackButton";
import MobileNav from "./MobileNav";

const Notifications = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("epay_notifications")) || [];
    setNotifications(stored);
  }, []);

  const markAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem("epay_notifications", JSON.stringify(updated));
  };

  const filteredNotifications =
    activeTab === "All"
      ? notifications
      : notifications.filter((n) => n.type === activeTab);

  const getIcon = (type) => {
    if (type === "Security") return <Shield className="text-orange-500" />;
    if (type === "Transactions")
      return <CheckCircle className="text-green-500" />;
    if (type === "System")
      return <AlertCircle className="text-red-500" />;
    return <Bell className="text-gray-500" />;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <GoBackButton />
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => navigate("/dashboard")}>
          <Bell className="w-6 h-6 text-gray-700" />
        </button>

        <h1 className="text-xl font-bold">Notifications</h1>

        <button
          onClick={markAllAsRead}
          className="text-orange-500 text-sm border border-orange-500 px-3 py-1 rounded-lg"
        >
          Mark all as read
        </button>
      </div>

      {/* TABS */}
      <div className="flex gap-2 overflow-x-auto mb-4">
        {["All", "Security", "Transactions", "Account", "System"].map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                activeTab === tab
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-600 border"
              }`}
            >
              {tab}
            </button>
          )
        )}
      </div>

      {/* DARK INFO CARD */}
      <div className="bg-gray-900 text-white rounded-2xl p-4 mb-4">
        <p className="font-semibold">Notifications</p>
        <p className="text-sm text-gray-300">
          Stay updated with your account activity
        </p>
      </div>

      {/* NOTIFICATION LIST */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">
            No notifications yet
          </p>
        ) : (
          filteredNotifications.map((note, index) => (
            <div
              key={index}
              className={`bg-white p-4 rounded-xl shadow flex gap-3 ${
                !note.read ? "border-l-4 border-orange-500" : ""
              }`}
            >
              <div>{getIcon(note.type)}</div>

              <div className="flex-1">
                <p className="font-semibold">{note.title}</p>
                <p className="text-sm text-gray-500">{note.message}</p>
                <p className="text-xs text-gray-400 mt-1">{note.time}</p>
              </div>

              {!note.read && (
                <span className="w-2 h-2 bg-orange-500 rounded-full mt-2"></span>
              )}
            </div>
          ))
        )}
      </div>
      <MobileNav />
    </div>
  );
};

export default Notifications;