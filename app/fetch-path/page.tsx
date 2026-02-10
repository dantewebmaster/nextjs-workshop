// Exemplo 4: Fetch sem cache (no-store) - SSR
import Link from 'next/link';
import { headers } from 'next/headers';

// URL da API (usa Mockoon local durante build)
const API_URL = process.env.API_URL || 'http://localhost:3001';

// Fetch sem cache - sempre busca dados frescos
async function getRealtimeData() {
  const res = await fetch(`${API_URL}/quotes/random`, {
    cache: 'no-store' // Sem cache = SSR
  });

  if (!res.ok) {
    throw new Error('Falha ao buscar dados');
  }

  return res.json();
}

async function getRealtimeProduct() {
  const randomId = Math.floor(Math.random() * 30) + 1;
  const res = await fetch(`${API_URL}/products/${randomId}`, {
    cache: 'no-store'
  });

  return res.json();
}

async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api/', {
    cache: 'no-store'
  });

  const data = await res.json();
  return data.results[0];
}

export default async function FetchPathPage() {
  // Usar headers também força SSR
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || 'Unknown';

  const quote = await getRealtimeData();
  const product = await getRealtimeProduct();
  const user = await getRandomUser();

  const renderTime = new Date().toLocaleString('pt-BR', {
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg p-8">
          <div className="mb-6">
            <Link href="/data-fetching" className="text-orange-600 hover:text-orange-800 text-sm">
              ← Voltar para Data Fetching
            </Link>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🔄 Fetch sem Cache (SSR)
          </h1>
          <p className="text-gray-600 mb-8">
            Dados sempre frescos - renderizado a cada requisição
          </p>

          {/* Timestamp */}
          <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-8">
            <p className="text-sm text-orange-700">
              <strong>⏰ Renderizado em:</strong> {renderTime}
            </p>
            <p className="text-sm text-orange-700 mt-2">
              🔄 Recarregue (F5) e veja este horário mudar - a página é renderizada a cada requisição!
            </p>
          </div>

          {/* Como funciona */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Como funciona no-store?
            </h2>
            <div className="bg-gray-50 rounded-lg p-6 mb-4">
              <pre className="text-sm text-gray-800 overflow-x-auto">
{`// Opção 1: cache: 'no-store'
const res = await fetch('https://api.com/data', {
  cache: 'no-store' // Sem cache
});

// Opção 2: Usar headers/cookies (força SSR)
import { headers } from 'next/headers';
const headersList = await headers();

// Opção 3: Desabilitar cache da rota
export const dynamic = 'force-dynamic';`}
              </pre>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">1️⃣</span>
                <span>
                  <strong>Cada requisição:</strong> Servidor executa o código novamente
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">2️⃣</span>
                <span>
                  <strong>Fetch fresco:</strong> Dados são buscados da API toda vez
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">3️⃣</span>
                <span>
                  <strong>Renderização:</strong> HTML é gerado no servidor
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">4️⃣</span>
                <span>
                  <strong>Resposta:</strong> HTML completo enviado ao cliente
                </span>
              </li>
            </ul>
          </div>

          {/* Dados em tempo real */}
          <div className="space-y-6 mb-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                💬 Citação Aleatória (muda sempre)
              </h2>
              <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-6">
                <blockquote className="text-lg text-gray-800 italic">
                  "{quote.quote}"
                </blockquote>
                <p className="text-gray-600 mt-3">— {quote.author}</p>
                <p className="text-gray-400 text-xs mt-3">
                  ID: {quote.id} • Buscado com cache: 'no-store'
                </p>
                <p className="text-orange-600 text-xs mt-2">
                  🔄 Recarregue e veja uma citação diferente!
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                📦 Produto Aleatório (muda sempre)
              </h2>
              <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{product.description}</p>
                <div className="flex items-center gap-4 mt-4">
                  <p className="text-orange-600 font-bold text-xl">${product.price}</p>
                  <p className="text-gray-500 text-sm">Rating: {product.rating} ⭐</p>
                </div>
                <p className="text-gray-400 text-xs mt-3">
                  ID: {product.id} • Categoria: {product.category}
                </p>
                <p className="text-orange-600 text-xs mt-2">
                  🔄 Cada reload busca um produto aleatório diferente!
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                👤 Usuário Aleatório (muda sempre)
              </h2>
              <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-6">
                <div className="flex items-center gap-4">
                  <img
                    src={user.picture.large}
                    alt={`${user.name.first} ${user.name.last}`}
                    className="w-20 h-20 rounded-full border-2 border-orange-300"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {user.name.first} {user.name.last}
                    </h3>
                    <p className="text-gray-600 text-sm">{user.email}</p>
                    <p className="text-gray-600 text-sm">
                      {user.location.city}, {user.location.country}
                    </p>
                  </div>
                </div>
                <p className="text-orange-600 text-xs mt-3">
                  🔄 Cada visitante vê dados diferentes!
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                📡 Dados da Requisição
              </h2>
              <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-6">
                <p className="text-gray-700 text-sm mb-2">
                  <strong>User Agent:</strong>
                </p>
                <p className="text-gray-600 text-xs break-all">{userAgent}</p>
                <p className="text-orange-600 text-xs mt-3">
                  Acessado via headers() - força renderização SSR
                </p>
              </div>
            </div>
          </div>

          {/* Comparação */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              ⚖️ no-store vs revalidate
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-orange-50 rounded-lg p-6 border-2 border-orange-200">
                <h3 className="text-lg font-semibold text-orange-800 mb-3">
                  🔄 no-store (SSR)
                </h3>
                <p className="text-sm text-gray-700 mb-2"><strong>Busca:</strong> Cada requisição</p>
                <p className="text-sm text-gray-700 mb-3"><strong>Performance:</strong> Mais lento</p>
                <p className="text-sm font-semibold text-gray-800 mb-2">Use quando:</p>
                <ul className="space-y-1 text-xs text-gray-700">
                  <li>• Dados em tempo real</li>
                  <li>• Conteúdo personalizado</li>
                  <li>• Precisa de headers/cookies</li>
                  <li>• Dados sempre frescos</li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-6 border-2 border-green-200">
                <h3 className="text-lg font-semibold text-green-800 mb-3">
                  ⏱️ revalidate (ISR)
                </h3>
                <p className="text-sm text-gray-700 mb-2"><strong>Busca:</strong> A cada X segundos</p>
                <p className="text-sm text-gray-700 mb-3"><strong>Performance:</strong> Rápido</p>
                <p className="text-sm font-semibold text-gray-800 mb-2">Use quando:</p>
                <ul className="space-y-1 text-xs text-gray-700">
                  <li>• Dados mudam periodicamente</li>
                  <li>• Performance é importante</li>
                  <li>• Pode tolerar dados levemente desatualizados</li>
                  <li>• Conteúdo público</li>
                </ul>
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
                <li>• Dados sempre atualizados</li>
                <li>• Conteúdo personalizado</li>
                <li>• Acesso a dados da requisição</li>
                <li>• Bom para dashboards em tempo real</li>
                <li>• Autenticação e autorização</li>
              </ul>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                ⚠️ Desvantagens
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Performance mais lenta</li>
                <li>• Maior carga no servidor</li>
                <li>• TTFB (Time to First Byte) maior</li>
                <li>• Não pode usar CDN efetivamente</li>
                <li>• Custos de servidor mais altos</li>
              </ul>
            </div>
          </div>

          {/* Quando usar */}
          <div className="bg-orange-50 border-l-4 border-orange-500 p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              💡 Quando usar no-store
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">✓</span>
                <span>Dashboards com métricas em tempo real</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">✓</span>
                <span>Feeds de atividade ou notificações</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">✓</span>
                <span>Páginas que requerem autenticação</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">✓</span>
                <span>Conteúdo personalizado por usuário</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">✓</span>
                <span>Dados de sessão ou carrinho de compras</span>
              </li>
            </ul>
          </div>

          {/* Como testar */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              🧪 Como testar:
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 text-sm">
              <li>Funciona tanto em dev quanto em produção</li>
              <li>Recarregue esta página várias vezes (F5)</li>
              <li>Observe que TUDO muda a cada reload:</li>
              <ul className="ml-6 mt-1 space-y-1 text-xs list-disc">
                <li>Timestamp</li>
                <li>Citação</li>
                <li>Produto</li>
                <li>Usuário</li>
              </ul>
              <li>No DevTools → Network, veja o documento HTML sendo gerado a cada vez</li>
              <li>Compare com as páginas SSG - lá os dados não mudam!</li>
            </ol>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <Link
              href="/fetch-tag"
              className="text-orange-600 hover:text-orange-800 text-sm"
            >
              ← Anterior: Fetch com Tags
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
