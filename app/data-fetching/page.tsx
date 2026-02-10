// Data Fetching Overview - Página principal
import Link from 'next/link';

export default function DataFetchingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg p-8">
          <div className="mb-6">
            <Link href="/" className="text-indigo-600 hover:text-indigo-800 text-sm">
              ← Voltar
            </Link>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            📡 Data Fetching no Next.js
          </h1>
          <p className="text-gray-600 mb-8">
            Diferentes estratégias para buscar dados no Next.js 15
          </p>

          {/* Introdução */}
          <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              🎯 Extended Fetch API
            </h2>
            <p className="text-gray-700 mb-3">
              O Next.js estende a API nativa <code className="bg-indigo-100 px-2 py-1 rounded">fetch()</code> do
              Web para adicionar opções avançadas de cache e revalidação.
            </p>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">✓</span>
                <span>Deduplicação de requisições automática</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">✓</span>
                <span>Suporte a revalidação baseada em tempo e tags</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">✓</span>
                <span>Controle granular de cache (force-cache, no-store, revalidate)</span>
              </li>
            </ul>
          </div>

          {/* Warning sobre Next.js 15 */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              ⚠️ Mudança Importante - Next.js 15
            </h2>
            <p className="text-gray-700 mb-2">
              <strong>Padrão mudou:</strong> <code className="bg-yellow-100 px-2 py-1 rounded">fetch()</code> agora usa <code className="bg-yellow-100 px-2 py-1 rounded">cache: 'no-store'</code> por padrão!
            </p>
            <div className="text-sm text-gray-600 space-y-1">
              <p>• <strong>Next.js 14:</strong> <code className="bg-yellow-100 px-1 rounded">fetch(url)</code> = <code className="bg-yellow-100 px-1 rounded">cache: 'force-cache'</code> (cache automático)</p>
              <p>• <strong>Next.js 15:</strong> <code className="bg-yellow-100 px-1 rounded">fetch(url)</code> = <code className="bg-yellow-100 px-1 rounded">cache: 'no-store'</code> (sem cache)</p>
              <p className="text-yellow-700 mt-2">💡 Para cachear, você precisa especificar <code className="bg-yellow-100 px-1 rounded">cache: 'force-cache'</code> explicitamente!</p>
            </div>
          </div>

          {/* Grid com os 4 tipos */}
          <div className="space-y-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800">
              Estratégias de Caching
            </h2>

            {/* Fetch Padrão */}
            <div className="border-2 border-blue-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">📦</span>
                    <h3 className="text-xl font-semibold text-gray-800">
                      1. force-cache (Cache Estático)
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">
                    Cache indefinido - dados são buscados uma vez no build e reutilizados.
                  </p>
                  <div className="bg-gray-50 rounded p-3 mb-3">
                    <code className="text-sm text-gray-800">
                      fetch(url, {'{'} cache: 'force-cache' {'}'})
                    </code>
                  </div>
                  <p className="text-gray-500 text-xs mb-3">
                    ✓ Era padrão no Next.js 14 • ✓ Máxima performance • ✓ Sem revalidação
                  </p>
                </div>
              </div>
              <Link
                href="/fetch-default"
                className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm"
              >
                Ver Exemplo →
              </Link>
            </div>

            {/* Fetch com Cache e Revalidação por Tempo */}
            <div className="border-2 border-green-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">⏱️</span>
                    <h3 className="text-xl font-semibold text-gray-800">
                      2. Revalidação por Tempo (ISR)
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">
                    Cache com revalidação automática após X segundos - ideal para dados que mudam periodicamente.
                  </p>
                  <div className="bg-gray-50 rounded p-3 mb-3">
                    <code className="text-sm text-gray-800">
                      fetch(url, {'{'} next: {'{'} revalidate: 60 {'}'} {'}'})
                    </code>
                  </div>
                  <p className="text-gray-500 text-xs mb-3">
                    ✓ ISR automático • ✓ Dados frescos • ✓ Boa performance
                  </p>
                </div>
              </div>
              <Link
                href="/fetch-cache-time"
                className="inline-block bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm"
              >
                Ver Exemplo →
              </Link>
            </div>

            {/* Fetch com Tag */}
            <div className="border-2 border-purple-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🏷️</span>
                    <h3 className="text-xl font-semibold text-gray-800">
                      3. Revalidação por Tag
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">
                    Cache com tags para revalidação seletiva on-demand - controle granular sobre quais dados atualizar.
                  </p>
                  <div className="bg-gray-50 rounded p-3 mb-3">
                    <code className="text-sm text-gray-800">
                      fetch(url, {'{'} next: {'{'} tags: ['products'] {'}'} {'}'})
                    </code>
                  </div>
                  <p className="text-gray-500 text-xs mb-3">
                    ✓ Controle granular • ✓ On-demand • ✓ Eficiente
                  </p>
                </div>
              </div>
              <Link
                href="/fetch-tag"
                className="inline-block bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors text-sm"
              >
                Ver Exemplo →
              </Link>
            </div>

            {/* Fetch sem Cache (SSR) */}
            <div className="border-2 border-orange-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🔄</span>
                    <h3 className="text-xl font-semibold text-gray-800">
                      4. no-store (Padrão Next.js 15)
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">
                    Sem cache - dados sempre frescos a cada requisição (SSR). Agora é o padrão!
                  </p>
                  <div className="bg-gray-50 rounded p-3 mb-3">
                    <code className="text-sm text-gray-800">
                      fetch(url) ou fetch(url, {'{'} cache: 'no-store' {'}'})
                    </code>
                  </div>
                  <p className="text-gray-500 text-xs mb-3">
                    ✓ Padrão Next.js 15 • ✓ Sempre atual • ✓ SSR
                  </p>
                </div>
              </div>
              <Link
                href="/fetch-path"
                className="inline-block bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm"
              >
                Ver Exemplo →
              </Link>
            </div>
          </div>

          {/* Tabela comparativa */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              📊 Comparação Rápida
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">Estratégia</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Quando usar</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Performance</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Frescor</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      <strong>force-cache</strong>
                      <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Padrão 14</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">
                      Conteúdo estático que raramente muda
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-green-600 text-sm">
                      ⚡⚡⚡ Máxima
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-600 text-sm">
                      Build time
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      <strong>revalidate: X</strong>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">
                      Dados que mudam periodicamente
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-green-600 text-sm">
                      ⚡⚡ Alta
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-blue-600 text-sm">
                      X segundos
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      <strong>tags</strong>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">
                      Atualização seletiva on-demand
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-green-600 text-sm">
                      ⚡⚡ Alta
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-purple-600 text-sm">
                      On-demand
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      <strong>no-store</strong>
                      <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Padrão 15</span>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-sm">
                      Dados em tempo real, personalizados
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-yellow-600 text-sm">
                      ⚡ Média
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-green-600 text-sm">
                      Sempre atual
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Dicas */}
          <div className="bg-indigo-50 border-l-4 border-indigo-400 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              💡 Dicas de Performance
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>
                <strong>1.</strong> Para performance, especifique <code className="bg-indigo-100 px-1 rounded">cache: 'force-cache'</code> explicitamente (não é mais padrão no Next.js 15!)
              </li>
              <li>
                <strong>2.</strong> Combine <code className="bg-indigo-100 px-1 rounded">revalidate</code> com tags para controle granular
              </li>
              <li>
                <strong>3.</strong> <code className="bg-indigo-100 px-1 rounded">no-store</code> é o novo padrão - use quando dados devem ser sempre frescos
              </li>
              <li>
                <strong>4.</strong> Aproveite a deduplicação automática do Next.js para múltiplos fetches da mesma URL
              </li>
              <li>
                <strong>5.</strong> Para ISR, prefira <code className="bg-indigo-100 px-1 rounded">revalidate</code> sobre <code className="bg-indigo-100 px-1 rounded">force-cache</code> quando dados mudam periodicamente
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
