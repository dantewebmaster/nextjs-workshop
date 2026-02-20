// Simula um delay de 5 segundos para demonstrar carregamento paralelo
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function TeamSlot() {
  await delay(5000); // 5 segundos de delay

  const teamMembers = [
    { id: 1, name: "Alice Silva", role: "Developer", status: "online" },
    { id: 2, name: "Bob Santos", role: "Designer", status: "online" },
    { id: 3, name: "Carol Oliveira", role: "Product Manager", status: "away" },
    { id: 4, name: "David Costa", role: "Developer", status: "offline" },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-green-600">👥 Team</h2>
      <div className="space-y-3 [&_p]:text-gray-600 [&_p+p]:font-bold [&_p+p]:text-gray-600">
        {teamMembers.map((member) => (
          <div key={member.id} className="flex items-center justify-between">
            <div>
              <p className="font-medium">{member.name}</p>
              <p className="text-sm text-gray-500">{member.role}</p>
            </div>
            <span
              className={`inline-block w-3 h-3 rounded-full ${
                member.status === "online"
                  ? "bg-green-500"
                  : member.status === "away"
                    ? "bg-yellow-500"
                    : "bg-gray-400"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
