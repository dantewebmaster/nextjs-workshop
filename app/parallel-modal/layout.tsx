export default function ParallelModalLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-fuchsia-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg p-8">{children}</div>
      </div>
      {modal}
    </div>
  );
}
