// Simula um delay de 7 segundos para demonstrar carregamento paralelo
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function NotificationsSlot() {
  await delay(7000); // 7 segundos de delay

  const notifications = [
    {
      id: 1,
      message: "New deployment successful",
      time: "5 min ago",
      type: "success",
    },
    {
      id: 2,
      message: "Server usage at 80%",
      time: "15 min ago",
      type: "warning",
    },
    { id: 3, message: "New user registered", time: "1 hour ago", type: "info" },
    {
      id: 4,
      message: "Backup completed",
      time: "2 hours ago",
      type: "success",
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-purple-600">
        🔔 Notifications
      </h2>
      <div className="space-y-3 [&_p]:text-gray-600">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="border-l-4 border-purple-500 pl-3 py-2"
          >
            <p className="text-sm font-medium">{notification.message}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-500">{notification.time}</span>
              <span
                className={`text-xs px-2 py-1 rounded ${getTypeColor(notification.type)}`}
              >
                {notification.type}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
