import Link from "next/link";

const photos = [
  {
    id: 1,
    title: "Montanha ao Pôr do Sol",
    url: "https://picsum.photos/800/600?random=1",
  },
  {
    id: 2,
    title: "Praia Tropical",
    url: "https://picsum.photos/800/600?random=2",
  },
  {
    id: 3,
    title: "Cidade à Noite",
    url: "https://picsum.photos/800/600?random=3",
  },
  {
    id: 4,
    title: "Floresta Nebulosa",
    url: "https://picsum.photos/800/600?random=4",
  },
  {
    id: 5,
    title: "Lago Sereno",
    url: "https://picsum.photos/800/600?random=5",
  },
  {
    id: 6,
    title: "Aurora Boreal",
    url: "https://picsum.photos/800/600?random=6",
  },
];

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const photo = photos.find((p) => p.id === Number(resolvedParams.id));

  if (!photo) {
    return (
      <div className="min-h-screen p-8 bg-gray-50">
        <h1 className="text-3xl font-bold mb-4">Foto não encontrada</h1>
        <Link href="/parallel-modal" className="text-blue-600 hover:underline">
          ← Voltar para galeria
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/parallel-modal"
          className="text-blue-600 hover:underline mb-4 inline-block"
        >
          ← Voltar para galeria
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img src={photo.url} alt={photo.title} className="w-full h-auto" />
          <div className="p-6">
            <h1 className="text-3xl text-gray-700 font-bold mb-2">
              {photo.title}
            </h1>
            <p className="text-gray-600 mb-4">ID: {photo.id}</p>
            <p className="text-gray-600">
              Esta é a página dedicada da foto. Quando você navega diretamente
              para esta URL ou recarrega a página, você vê esta versão completa
              ao invés do modal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
