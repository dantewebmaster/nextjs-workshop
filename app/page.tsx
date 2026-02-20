import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4">
      <h1 className="text-5xl font-bold mb-4">Next.js Workshop</h1>
      <p className="text-gray-300 mb-12 text-center max-w-2xl">
        Aprenda sobre geração estática e revalidação no Next.js com exemplos
        práticos
      </p>

      <div className="max-w-4xl w-full space-y-6">
        {/* Divisor - Rendering Strategies */}
        <div className="text-center py-4">
          <h3 className="text-3xl font-semibold text-gray-200 mb-2">
            🎯 Estratégias de Renderização
          </h3>
          <p className="text-gray-300 text-xl">
            SSG, SSR e geração dinâmica de páginas estáticas
          </p>
        </div>

        {/* Grid com Rendering Strategies */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* SSG Básico */}
          <div className="border-2 border-blue-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-3">📄</div>
            <h3 className="text-xl font-semibold mb-2">SSG Básico</h3>
            <p className="text-gray-300 text-sm mb-4">
              Página estática única gerada no build
            </p>
            <Link
              href="/ssg-example"
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm w-full text-center"
            >
              Ver Exemplo →
            </Link>
          </div>

          {/* SSG com generateStaticParams */}
          <div className="border-2 border-emerald-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-3">📚</div>
            <h3 className="text-xl font-semibold mb-2">SSG com Params</h3>
            <p className="text-gray-300 text-sm mb-4">
              Múltiplas páginas estáticas de uma lista
            </p>
            <Link
              href="/ssg-params"
              className="inline-block bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors text-sm w-full text-center"
            >
              Ver Exemplo →
            </Link>
          </div>

          {/* SSR */}
          <div className="border-2 border-orange-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-3">🔄</div>
            <h3 className="text-xl font-semibold mb-2">SSR</h3>
            <p className="text-gray-300 text-sm mb-4">
              Renderizado a cada requisição no servidor
            </p>
            <Link
              href="/ssr-example"
              className="inline-block bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm w-full text-center"
            >
              Ver Exemplo →
            </Link>
          </div>
        </div>

        {/* Divisor - ISR */}
        <div className="text-center py-8">
          <h3 className="text-3xl font-semibold text-gray-200 mb-2">
            🔄 ISR - Incremental Static Regeneration
          </h3>
          <p className="text-gray-300 text-xl">
            Exemplos de revalidação: mantenha páginas estáticas sempre
            atualizadas
          </p>
        </div>

        {/* Grid com os 3 tipos de revalidação */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* Revalidação por Tempo */}
          <div className="border-2 border-blue-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-3">⏱️</div>
            <h3 className="text-xl font-semibold mb-2">Por Tempo</h3>
            <p className="text-gray-300 text-sm mb-4">
              Regenera automaticamente a cada X segundos
            </p>
            <Link
              href="/revalidate-time"
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm w-full text-center"
            >
              Ver Exemplo →
            </Link>
          </div>

          {/* Revalidação por Tag */}
          <div className="border-2 border-green-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-3">🏷️</div>
            <h3 className="text-xl font-semibold mb-2">Por Tag</h3>
            <p className="text-gray-300 text-sm mb-4">
              Revalida grupos específicos de dados
            </p>
            <Link
              href="/revalidate-tag"
              className="inline-block bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm w-full text-center"
            >
              Ver Exemplo →
            </Link>
          </div>

          {/* Revalidação por Path */}
          <div className="border-2 border-purple-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-3">🛣️</div>
            <h3 className="text-xl font-semibold mb-2">Por Path</h3>
            <p className="text-gray-300 text-sm mb-4">
              Revalida páginas inteiras via API ou server action
            </p>
            <Link
              href="/revalidate-path"
              className="inline-block bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors text-sm w-full text-center"
            >
              Ver Exemplo →
            </Link>
          </div>
        </div>
      </div>

      {/* Divisor - Components */}
      <div className="text-center py-8">
        <h3 className="text-3xl font-semibold text-gray-200 mb-2">
          ⚛️ Server vs Client Components
        </h3>
        <p className="text-gray-300 text-xl">
          Entenda as diferenças e como compor componentes eficientemente
        </p>
      </div>

      {/* Grid com Server e Client Components */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Server Component */}
        <div className="border-2 border-cyan-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
          <div className="text-3xl mb-3">🖥️</div>
          <h3 className="text-xl font-semibold mb-2">Server Component</h3>
          <p className="text-gray-300 text-sm mb-4">
            Renderizado no servidor, zero JS no cliente
          </p>
          <Link
            href="/server-component"
            className="inline-block bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition-colors text-sm w-full text-center"
          >
            Ver Exemplo →
          </Link>
        </div>

        {/* Client Component */}
        <div className="border-2 border-pink-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
          <div className="text-3xl mb-3">💻</div>
          <h3 className="text-xl font-semibold mb-2">Client Component</h3>
          <p className="text-gray-300 text-sm mb-4">
            Interatividade com hooks e event handlers
          </p>
          <Link
            href="/client-component"
            className="inline-block bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors text-sm w-full text-center"
          >
            Ver Exemplo →
          </Link>
        </div>

        {/* Composição */}
        <div className="border-2 border-orange-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
          <div className="text-3xl mb-3">🎨</div>
          <h3 className="text-xl font-semibold mb-2">Composição</h3>
          <p className="text-gray-300 text-sm mb-4">
            Como combinar Server e Client Components
          </p>
          <Link
            href="/components-composition"
            className="inline-block bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm w-full text-center"
          >
            Ver Exemplo →
          </Link>
        </div>
      </div>

      {/* Divisor - Parallel Routes */}
      <div className="text-center py-8">
        <h3 className="text-3xl font-semibold text-gray-200 mb-2">
          🧩 Parallel & Intercepting Routes
        </h3>
        <p className="text-gray-300 text-xl">
          Demonstrações de slots paralelos e modal com rotas interceptadas
        </p>
      </div>

      {/* Grid com demos de Parallel Routes */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Parallel Routes */}
        <div className="border-2 border-violet-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
          <div className="text-3xl mb-3">🗂️</div>
          <h3 className="text-xl font-semibold mb-2">Parallel Routes</h3>
          <p className="text-gray-300 text-sm mb-4">
            Slots paralelos com loading e fallback independentes
          </p>
          <Link
            href="/parallel-routes"
            className="inline-block bg-violet-500 text-white px-4 py-2 rounded-lg hover:bg-violet-600 transition-colors text-sm w-full text-center"
          >
            Ver Exemplo →
          </Link>
        </div>

        {/* Intercepting Route + Modal */}
        <div className="border-2 border-fuchsia-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
          <div className="text-3xl mb-3">🪟</div>
          <h3 className="text-xl font-semibold mb-2">Intercepting + Modal</h3>
          <p className="text-gray-300 text-sm mb-4">
            Navegação com modal mantendo contexto da rota atual
          </p>
          <Link
            href="/parallel-modal"
            className="inline-block bg-fuchsia-500 text-white px-4 py-2 rounded-lg hover:bg-fuchsia-600 transition-colors text-sm w-full text-center"
          >
            Ver Exemplo →
          </Link>
        </div>
      </div>
    </div>
  );
}
