import Link from "next/link";

export default function ParallelRoutesPage() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/" className="text-blue-600 hover:text-blue-800 text-sm">
          ← Voltar
        </Link>
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-2">
        🔀 Parallel Routes - Dashboard
      </h1>
      <p className="text-gray-600 mb-8">
        Renderizando múltiplas páginas simultaneamente com slots nomeados
      </p>

      {/* Explicação */}
      <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          💡 Como Funciona
        </h2>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="text-indigo-500 mr-2">✓</span>
            <span>
              As seções abaixo (Analytics, Team e Notifications) são
              renderizadas em <strong>paralelo</strong>
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-indigo-500 mr-2">✓</span>
            <span>
              Cada slot usa uma pasta nomeada:{" "}
              <code className="bg-white px-2 py-1 rounded text-sm">
                @analytics
              </code>
              ,{" "}
              <code className="bg-white px-2 py-1 rounded text-sm">@team</code>,{" "}
              <code className="bg-white px-2 py-1 rounded text-sm">
                @notifications
              </code>
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-indigo-500 mr-2">✓</span>
            <span>
              Cada slot pode ter seu próprio estado de loading, erro e navegação
              independente
            </span>
          </li>
        </ul>
      </div>

      {/* Navegação */}
      <div className="flex gap-4">
        <Link
          href="/parallel-routes/settings"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
        >
          Ir para Configurações →
        </Link>
      </div>
    </div>
  );
}
