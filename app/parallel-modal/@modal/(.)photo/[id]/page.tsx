import Modal from "../../../components/Modal";

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

export default async function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const photo = photos.find((p) => p.id === Number(resolvedParams.id));

  if (!photo) {
    return (
      <Modal>
        <div className="p-8">
          <p>Foto não encontrada</p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal>
      <div className="w-[90vw] max-w-4xl">
        <img src={photo.url} alt={photo.title} className="w-full h-auto" />
        <div className="p-6 bg-white">
          <h2 className="text-2xl font-bold mb-2">{photo.title}</h2>
          <p className="text-gray-600">ID: {photo.id}</p>
          <p className="text-sm text-gray-500 mt-4">
            Esta imagem está sendo exibida em um modal usando Intercepting
            Routes
          </p>
        </div>
      </div>
    </Modal>
  );
}
