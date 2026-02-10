// Exemplo 2: Fetch com cache e revalidação por tempo (ISR)
import Link from 'next/link';

// URL da API (usa Mockoon local durante build)
const API_URL = process.env.API_URL || 'http://localhost:3001';

// Fetch com revalidação a cada 15 segundos
async function getProductWithRevalidation() {
  const randomId = Math.floor(Math.random() * 30) + 1;
  const res = await fetch(`${API_URL}/products/${randomId}`, {
    next: { revalidate: 15 } // Revalida a cada 15 segundos
  });

  if (!res.ok) {
    throw new Error('Falha ao buscar produto');
  }

  return res.json();
}

async function getQuoteWithRevalidation() {
  const res = await fetch(`${API_URL}/quotes/random`, {
    next: { revalidate: 10 } // Revalida a cada 10 segundos
  });

  return res.json();
}

export default async function FetchCacheTimePage() {
  const product = await getProductWithRevalidation();
  const quote = await getQuoteWithRevalidation();
  const fetchTime = new Date().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg p-8">
          <div className="mb-6">
            <Link href="/data-fetching" className="text-green-600 hover:text-green-800 text-sm">
              ← Voltar para Data Fetching
            </Link>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            ⏱️ Revalidação por Tempo (ISR)
          </h1>
          <p className="text-gray-600 mb-8">
            Cache com revalidação automática baseada em tempo
          </p>

          {/* Timestamp */}
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-8">
            <p className="text-sm text-green-700">
              <strong>⏰ Dados buscados em:</strong> {fetchTime}
            </p>
            <p className="text-sm text-green-700 mt-2">
              ⏱️ Produto revalida a cada <strong>15 segundos</strong> •
              Citação revalida a cada <strong>10 segundos</strong>
            </p>
          </div>

          {/* Como funciona */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Como funciona ISR com revalidate?
            </h2>
            <div className="bg-gray-50 rounded-lg p-6 mb-4">
              <pre className="text-sm text-gray-800 overflow-x-auto">
{`// Revalidação a cada 60 segundos
const res = await fetch('https://api.com/products', {
  next: {
    revalidate: 60 // em segundos
  }
});

// Ou no nível da página
export const revalidate = 60;`}
              </pre>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">1️⃣</span>
                <span>
                  <strong>Primeira requisição:</strong> Dados são buscados e cacheados
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">2️⃣</span>
                <span>
                  <strong>Dentro do tempo:</strong> Cache é servido (rápido!)
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">3️⃣</span>
                <span>
                  <strong>Após X segundos:</strong> Próxima requisição ainda serve cache mas dispara regeneração em background
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">4️⃣</span>
                <span>
                  <strong>Cache atualizado:</strong> Novas requisições recebem dados atualizados
                </span>
              </li>
            </ul>
          </div>

          {/* Visualização do processo */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              📊 Linha do Tempo (exemplo com 10s)
            </h2>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6">
              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <span className="bg-green-500 text-white px-3 py-1 rounded font-mono">0s</span>
                  <span className="text-gray-700">Build: Dados buscados e cacheados</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded font-mono">5s</span>
                  <span className="text-gray-700">Requisição: Serve cache ⚡ (instantâneo)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-yellow-500 text-white px-3 py-1 rounded font-mono">11s</span>
                  <span className="text-gray-700">Requisição: Serve cache + Inicia regeneração em background 🔄</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-green-500 text-white px-3 py-1 rounded font-mono">12s</span>
                  <span className="text-gray-700">Regeneração completa: Cache atualizado ✓</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded font-mono">15s</span>
                  <span className="text-gray-700">Próxima requisição: Serve novo cache ⚡</span>
                </div>
              </div>
            </div>
          </div>

          {/* Dados com revalidação */}
          <div className="space-y-6 mb-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                📦 Produto (revalidate: 15s)
              </h2>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{product.description}</p>
                <div className="flex items-center gap-4 mt-4">
                  <p className="text-green-600 font-bold text-xl">${product.price}</p>
                  <p className="text-gray-500 text-sm">Rating: {product.rating} ⭐</p>
                </div>
                <p className="text-gray-400 text-xs mt-4">
                  ID: {product.id} • Categoria: {product.category}
                </p>
                <p className="text-green-600 text-xs mt-2">
                  🔄 Este produto será atualizado automaticamente a cada 15 segundos
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                💬 Citação (revalidate: 10s)
              </h2>
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-6">
                <blockquote className="text-lg text-gray-800 italic">
                  "{quote.quote}"
                </blockquote>
                <p className="text-gray-600 mt-3">— {quote.author}</p>
                <p className="text-gray-400 text-xs mt-3">
                  ID: {quote.id}
                </p>
                <p className="text-emerald-600 text-xs mt-2">
                  🔄 Esta citação será atualizada automaticamente a cada 10 segundos
                </p>
              </div>
            </div>
          </div>

          {/* Configurações flexíveis */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              🎛️ Configurações Flexíveis
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-semibold text-gray-800 mb-1">Por fetch individual:</p>
                <code className="bg-blue-100 px-2 py-1 rounded text-xs">
                  fetch(url, {'{'} next: {'{'} revalidate: 30 {'}'} {'}'})
                </code>
              </div>
              <div>
                <p className="font-semibold text-gray-800 mb-1">Para a página inteira:</p>
                <code className="bg-blue-100 px-2 py-1 rounded text-xs">
                  export const revalidate = 60;
                </code>
              </div>
              <div>
                <p className="font-semibold text-gray-800 mb-1">Combinando com tags:</p>
                <code className="bg-blue-100 px-2 py-1 rounded text-xs">
                  fetch(url, {'{'} next: {'{'} revalidate: 60, tags: ['products'] {'}'} {'}'})
                </code>
              </div>
            </div>
          </div>

          {/* Vantagens */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-green-50 border-l-4 border-green-500 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                ✅ Vantagens
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Melhor dos dois mundos (performance + frescor)</li>
                <li>• Atualização automática</li>
                <li>• Sem reconstrução necessária</li>
                <li>• Ainda pode usar CDN</li>
                <li>• Bom SEO</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                ⚠️ Considerações
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Dados podem ficar desatualizados entre revalidações</li>
                <li>• Precisa escolher intervalo adequado</li>
                <li>• Regeneração consome recursos</li>
                <li>• Intervalo muito curto = mais carga</li>
              </ul>
            </div>
          </div>

          {/* Quando usar */}
          <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              💡 Quando usar revalidação por tempo
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Catálogo de e-commerce (preços atualizam periodicamente)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Feed de notícias ou blog</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Dashboards com métricas que atualizam regularmente</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Listas de eventos ou calendários</span>
              </li>
            </ul>
          </div>

          {/* Como testar */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              🧪 Como testar:
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 text-sm">
              <li>Execute: <code className="bg-yellow-100 px-2 py-1 rounded">pnpm build && pnpm start</code></li>
              <li>Acesse esta página e anote o timestamp e IDs dos produtos/citação</li>
              <li>Aguarde 15-20 segundos</li>
              <li>Recarregue a página</li>
              <li>Observe: timestamp e dados podem mudar (regeneração aconteceu!)</li>
              <li>Continue recarregando - eventualmente verá dados diferentes</li>
            </ol>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex gap-4">
              <Link
                href="/fetch-default"
                className="text-green-600 hover:text-green-800 text-sm"
              >
                ← Anterior: Fetch Padrão
              </Link>
              <Link
                href="/fetch-tag"
                className="text-green-600 hover:text-green-800 text-sm"
              >
                Próximo: Fetch com Tags →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
