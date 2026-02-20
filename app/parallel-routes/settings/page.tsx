import Link from "next/link";

export default function SettingsPage() {
  return (
    <div>
      <div className="mb-6">
        <Link
          href="/parallel-routes"
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          ← Voltar ao Dashboard
        </Link>
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-2">
        ⚙️ Configurações
      </h1>
      <p className="text-gray-600 mb-8">
        Página de navegação dentro do exemplo de Parallel Routes
      </p>

      {/* Explicação */}
      <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">🔍 Observe</h2>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="text-indigo-500 mr-2">✓</span>
            <span>
              Apenas o conteúdo principal mudou ao navegar para esta página
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-indigo-500 mr-2">✓</span>
            <span>
              Os slots (Analytics, Team, Notifications) permanecem visíveis e
              mantêm seus estados
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-indigo-500 mr-2">✓</span>
            <span>
              Isso demonstra como diferentes partes da UI podem navegar
              independentemente
            </span>
          </li>
        </ul>
      </div>

      {/* Exemplo de conteúdo */}
      <div className="space-y-6 grid md:grid-cols-3 gap-4 [&_h3]:text-gray-700 [&>div]:max-h-28">
        <div className="border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">
            Configuração de Exemplo 1
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Ativar notificações</span>
            <input type="checkbox" className="w-5 h-5" defaultChecked />
          </div>
        </div>

        <div className="border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">
            Configuração de Exemplo 2
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Modo escuro</span>
            <input type="checkbox" className="w-5 h-5" />
          </div>
        </div>

        <div className="border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">
            Configuração de Exemplo 3
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Sincronização automática</span>
            <input type="checkbox" className="w-5 h-5" defaultChecked />
          </div>
        </div>
      </div>
    </div>
  );
}
