import Link from "next/link";

export default function ParallelModalPage() {
  const photos = [
    {
      id: 1,
      title: "Montanha ao Pôr do Sol",
      url: "https://picsum.photos/400/300?random=1",
    },
    {
      id: 2,
      title: "Praia Tropical",
      url: "https://picsum.photos/400/300?random=2",
    },
    {
      id: 3,
      title: "Cidade à Noite",
      url: "https://picsum.photos/400/300?random=3",
    },
    {
      id: 4,
      title: "Floresta Nebulosa",
      url: "https://picsum.photos/400/300?random=4",
    },
    {
      id: 5,
      title: "Lago Sereno",
      url: "https://picsum.photos/400/300?random=5",
    },
    {
      id: 6,
      title: "Aurora Boreal",
      url: "https://picsum.photos/400/300?random=6",
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <Link href="/" className="text-blue-600 hover:text-blue-800 text-sm">
          ← Voltar
        </Link>
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-2">
        🖼️ Parallel + Intercepting Routes
      </h1>
      <p className="text-gray-600 mb-8">
        Galeria de fotos com modal usando combinação de rotas paralelas
      </p>

      {/* Explicação */}
      <div className="bg-violet-50 border-l-4 border-violet-500 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          💡 Como Funciona
        </h2>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="text-violet-500 mr-2">✓</span>
            <span>
              <strong>Clique na foto</strong>: abre em modal sobre a galeria
              (soft navigation)
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-violet-500 mr-2">✓</span>
            <span>
              <strong>Recarregue a página</strong>: abre a página completa da
              foto
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-violet-500 mr-2">✓</span>
            <span>URL compartilhável funciona em ambos os casos</span>
          </li>
        </ul>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Galeria de Fotos
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <Link
            key={photo.id}
            href={`/parallel-modal/photo/${photo.id}`}
            className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <img
              src={photo.url}
              alt={photo.title}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <h3 className="text-white font-semibold">{photo.title}</h3>
              <p className="text-gray-300 text-sm">ID: {photo.id}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
