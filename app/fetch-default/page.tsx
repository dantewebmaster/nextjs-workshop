// Exemplo 1: Fetch com force-cache explícito (cache estático)
import Link from 'next/link';

// URL da API (usa Mockoon local durante build)
const API_URL = process.env.API_URL || 'http://localhost:3001';

// Next.js 15+: Precisa especificar force-cache explicitamente!
async function getStaticData() {
  // ✅ Explicitamente force-cache (não é mais o padrão no Next 15!)
  const res = await fetch(`${API_URL}/products/1`, {
    cache: 'force-cache'
  });

  if (!res.ok) {
    throw new Error('Falha ao buscar dados');
  }

  return res.json();
}

async function getStaticQuote() {
  // Explicitamente definindo force-cache (mesmo comportamento do padrão)
  const res = await fetch(`${API_URL}/quotes/1`, {
    cache: 'force-cache'
  });

  return res.json();
}

export default async function FetchDefaultPage() {
  const product = await getStaticData();
  const quote = await getStaticQuote();
  const buildTime = new Date().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    hour12: false
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg p-8">
          <div className="mb-6">
            <Link href="/data-fetching" className="text-blue-600 hover:text-blue-800 text-sm">
              ← Voltar para Data Fetching
            </Link>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            📦 Fetch com force-cache
          </h1>
          <p className="text-gray-600 mb-8">
            Cache estático indefinido (era o padrão no Next.js 14)
          </p>

          {/* Warning sobre mudança */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <p className="text-sm text-yellow-800">
              <strong>⚠️ Mudança Importante Next.js 15:</strong> <code className="bg-yellow-100 px-2 py-1 rounded">fetch()</code> agora tem <code className="bg-yellow-100 px-2 py-1 rounded">cache: 'no-store'</code> por padrão!
            </p>
            <p className="text-sm text-yellow-800 mt-2">
              Se você quer cache, precisa especificar explicitamente <code className="bg-yellow-100 px-2 py-1 rounded">cache: 'force-cache'</code>
            </p>
          </div>

          {/* Timestamp */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
            <p className="text-sm text-blue-700">
              <strong>⏰ Dados buscados em:</strong> {buildTime}
            </p>
            <p className="text-sm text-blue-700 mt-2">
              Este timestamp NÃO muda ao recarregar - os dados foram buscados apenas uma vez no build!
            </p>
          </div>

          {/* Como funciona */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Como funciona?
            </h2>
            <div className="bg-gray-50 rounded-lg p-6 mb-4">
              <pre className="text-sm text-gray-800 overflow-x-auto">
{`// ❌ Next.js 15+: Sem cache por padrão!
const res = await fetch('https://api.com/data');
// Equivalente a: cache: 'no-store'

// ✅ Para cachear, use explicitamente:
const res = await fetch('https://api.com/data', {
  cache: 'force-cache' // Cache estático indefinido
});

// ℹ️ No Next.js 14 e anteriores:
// fetch() tinha force-cache por padrão`}
              </pre>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">1️⃣</span>
                <span>
                  <strong>Build time:</strong> Dados são buscados durante <code className="bg-gray-100 px-1 rounded">pnpm build</code>
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">2️⃣</span>
                <span>
                  <strong>Cache:</strong> Resultado é armazenado em cache indefinidamente
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">3️⃣</span>
                <span>
                  <strong>Runtime:</strong> Todas as requisições usam os dados em cache
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">4️⃣</span>
                <span>
                  <strong>Performance:</strong> Ultra-rápido pois não precisa buscar dados novamente
                </span>
              </li>
            </ul>
          </div>

          {/* Dados em cache */}
          <div className="space-y-6 mb-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                📦 Produto (cache padrão)
              </h2>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{product.description}</p>
                <div className="flex items-center gap-4 mt-4">
                  <p className="text-blue-600 font-bold text-xl">${product.price}</p>
                  <p className="text-gray-500 text-sm">Rating: {product.rating} ⭐</p>
                </div>
                <p className="text-gray-400 text-xs mt-4">
                  ID: {product.id} • Categoria: {product.category}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                💬 Citação (force-cache explícito)
              </h2>
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-lg p-6">
                <blockquote className="text-lg text-gray-800 italic">
                  "{quote.quote}"
                </blockquote>
                <p className="text-gray-600 mt-3">— {quote.author}</p>
                <p className="text-gray-400 text-xs mt-3">
                  ID: {quote.id}
                </p>
              </div>
            </div>
          </div>

          {/* Vantagens e Desvantagens */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-green-50 border-l-4 border-green-500 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                ✅ Vantagens
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Performance máxima</li>
                <li>• Sem latência de rede</li>
                <li>• Pode ser servido via CDN</li>
                <li>• SEO excelente</li>
                <li>• Custos de servidor reduzidos</li>
              </ul>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                ⚠️ Limitações
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Dados ficam desatualizados</li>
                <li>• Requer rebuild para atualizar</li>
                <li>• Não serve para dados dinâmicos</li>
                <li>• Sem personalização por usuário</li>
              </ul>
            </div>
          </div>

          {/* Quando usar */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              💡 Quando usar force-cache
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Blog posts, documentação, páginas de marketing</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Dados que raramente mudam (termos de uso, FAQs)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Catálogo de produtos que atualiza apenas com deploy</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Qualquer conteúdo onde performance é crítica e dados não precisam ser frescos</span>
              </li>
            </ul>
          </div>

          {/* Como testar */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              🧪 Como testar:
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 text-sm">
              <li>Execute: <code className="bg-yellow-100 px-2 py-1 rounded">pnpm build</code></li>
              <li>Execute: <code className="bg-yellow-100 px-2 py-1 rounded">pnpm start</code></li>
              <li>Recarregue esta página várias vezes (F5)</li>
              <li>Observe que o timestamp NÃO muda - dados foram buscados apenas no build</li>
              <li>Os produtos e citação são sempre os mesmos (IDs fixos: 1)</li>
              <li>Inspecione o código HTML (View Source) - conteúdo já está lá!</li>
            </ol>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <Link
              href="/fetch-cache-time"
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Próximo: Fetch com Revalidação por Tempo →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
