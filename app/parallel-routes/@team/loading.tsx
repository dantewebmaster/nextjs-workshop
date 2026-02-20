export default function TeamLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-32"></div>
            </div>
            <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
