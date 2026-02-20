// Simula um delay de 1 segundo para demonstrar carregamento paralelo
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function AnalyticsSlot() {
  await delay(3000);

  const stats = {
    visitors: "12,345",
    pageViews: "45,678",
    bounceRate: "32%",
    avgDuration: "3m 42s",
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-blue-600">📊 Analytics</h2>
      <div className="space-y-3 [&_p+p]:text-gray-600">
        <div>
          <p className="text-sm text-gray-500">Visitors</p>
          <p className="text-2xl font-bold">{stats.visitors}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Page Views</p>
          <p className="text-2xl font-bold">{stats.pageViews}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Bounce Rate</p>
          <p className="text-2xl font-bold">{stats.bounceRate}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Avg Duration</p>
          <p className="text-2xl font-bold">{stats.avgDuration}</p>
        </div>
      </div>
    </div>
  );
}
