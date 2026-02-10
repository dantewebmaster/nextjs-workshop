// Exemplo de SSR - Server-Side Rendering
// A página é renderizada no servidor A CADA REQUISIÇÃO

import Link from 'next/link';
import { headers } from 'next/headers';

// URL da API (usa Mockoon local durante build)
const API_URL = process.env.API_URL || 'http://localhost:3001';

// Fetch sem cache = SSR (renderiza a cada requisição)
async function getRealtimeData() {
  const res = await fetch(`${API_URL}/quotes/random`, {
    cache: 'no-store' // Força SSR - sem cache
  });

  if (!res.ok) {
    throw new Error('Falha ao buscar dados');
  }

  return res.json();
}

async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api/', {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error('Falha ao buscar usuário');
  }

  const data = await res.json();
  return data.results[0];
}

export default async function SSRExamplePage() {
  // Acesso a headers também torna a rota dinâmica (SSR)
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || 'Unknown';

  const quote = await getRealtimeData();
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg p-8">
          <div className="mb-6">
            <Link href="/" className="text-emerald-600 hover:text-emerald-800 text-sm">
              ← Voltar
            </Link>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🔄 SSR - Server-Side Rendering
          </h1>
          <p className="text-gray-600 mb-8">
            Páginas renderizadas no servidor a cada requisição
          </p>

          {/* Timestamp - muda a cada refresh */}
          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-emerald-700">
                  <strong>⏰ Renderizado em:</strong> {renderTime}
                </p>
                <p className="text-sm text-emerald-700 mt-1">
                  🔄 Recarregue a página (F5) e veja este horário mudar - a página é renderizada a cada requisição!
                </p>
              </div>
            </div>
          </div>

          {/* Como funciona */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Como funciona o SSR?
            </h2>
            <div className="bg-gray-50 rounded-lg p-6 mb-4">
              <pre className="text-sm text-gray-800 overflow-x-auto">
{`// SSR com cache: 'no-store'
async function getData() {
  const res = await fetch('https://api.com/data', {
    cache: 'no-store' // Sem cache = SSR
  });
  return res.json();
}

// Ou usando headers/cookies torna a rota dinâmica
import { headers } from 'next/headers';

export default async function Page() {
  const headersList = await headers(); // SSR
  const data = await getData();
  return <div>{data.title}</div>;
}`}
              </pre>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2 mt-1">1️⃣</span>
                <span>
                  <strong>Requisição:</strong> Usuário acessa a página
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2 mt-1">2️⃣</span>
                <span>
                  <strong>Servidor renderiza:</strong> Next.js executa o código e busca dados no servidor
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2 mt-1">3️⃣</span>
                <span>
                  <strong>HTML enviado:</strong> Página HTML completa é enviada ao cliente
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2 mt-1">4️⃣</span>
                <span>
                  <strong>Hydration:</strong> React hydrata o HTML no cliente para interatividade
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2 mt-1">🔄</span>
                <span>
                  <strong>Próxima requisição:</strong> Todo o processo se repete com dados frescos!
                </span>
              </li>
            </ul>
          </div>

          {/* Dados em tempo real */}
          <div className="space-y-6 mb-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                💬 Citação Aleatória (muda a cada refresh)
              </h2>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-6">
                <blockquote className="text-lg text-gray-800 italic mb-3">
                  "{quote.quote}"
                </blockquote>
                <p className="text-gray-600">— {quote.author}</p>
                <p className="text-gray-500 text-xs mt-3">
                  ID: {quote.id} • Buscado com cache: 'no-store'
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                👤 Usuário Aleatório (muda a cada refresh)
              </h2>
              <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 rounded-lg p-6">
                <div className="flex items-center gap-4">
                  <img
                    src={user.picture.large}
                    alt={`${user.name.first} ${user.name.last}`}
                    className="w-20 h-20 rounded-full border-2 border-emerald-300"
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
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                📡 Informações da Requisição
              </h2>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-6">
                <div className="space-y-2 text-sm">
                  <p className="text-gray-700">
                    <strong>User Agent:</strong>{' '}
                    <span className="text-gray-600 text-xs break-all">{userAgent}</span>
                  </p>
                  <p className="text-gray-500 text-xs mt-2">
                    Acessado via headers() - torna a rota dinâmica (SSR)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SSR vs SSG */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              ⚖️ SSR vs SSG - Quando usar cada um?
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-emerald-50 rounded-lg p-6 border-2 border-emerald-200">
                <h3 className="text-lg font-semibold text-emerald-800 mb-3 flex items-center">
                  <span className="mr-2">🔄</span> SSR
                </h3>
                <p className="text-sm text-gray-700 mb-3">
                  <strong>Renderiza:</strong> A cada requisição
                </p>
                <p className="text-sm font-semibold text-gray-800 mb-2">✅ Use quando:</p>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Dados mudam frequentemente</li>
                  <li>• Conteúdo personalizado por usuário</li>
                  <li>• Precisa de dados em tempo real</li>
                  <li>• Usa headers/cookies da requisição</li>
                  <li>• Autenticação necessária</li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
                <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                  <span className="mr-2">📄</span> SSG
                </h3>
                <p className="text-sm text-gray-700 mb-3">
                  <strong>Renderiza:</strong> No build time
                </p>
                <p className="text-sm font-semibold text-gray-800 mb-2">✅ Use quando:</p>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Conteúdo estático (blog posts)</li>
                  <li>• Dados não mudam frequentemente</li>
                  <li>• Máxima performance é crítica</li>
                  <li>• Pode usar CDN</li>
                  <li>• SEO é prioridade</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Formas de ativar SSR */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              🔧 Como ativar SSR no Next.js 15
            </h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div>
                <p className="font-semibold mb-1">1. Usando cache: 'no-store'</p>
                <code className="bg-blue-100 px-2 py-1 rounded text-xs">
                  fetch(url, {'{'} cache: 'no-store' {'}'})
                </code>
              </div>
              <div>
                <p className="font-semibold mb-1">2. Usando headers ou cookies</p>
                <code className="bg-blue-100 px-2 py-1 rounded text-xs">
                  const headersList = await headers()
                </code>
              </div>
              <div>
                <p className="font-semibold mb-1">3. Usando searchParams em Page</p>
                <code className="bg-blue-100 px-2 py-1 rounded text-xs">
                  export default function Page({'{'} searchParams {'}'})
                </code>
              </div>
              <div>
                <p className="font-semibold mb-1">4. Desabilitando cache da rota</p>
                <code className="bg-blue-100 px-2 py-1 rounded text-xs">
                  export const dynamic = 'force-dynamic'
                </code>
              </div>
            </div>
          </div>

          {/* Vantagens e Desvantagens */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-green-50 border-l-4 border-green-500 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                ✅ Vantagens do SSR
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Dados sempre frescos e atualizados</li>
                <li>• Bom SEO (conteúdo renderizado)</li>
                <li>• Acesso a dados da requisição</li>
                <li>• Conteúdo personalizado por usuário</li>
                <li>• Segurança (código roda no servidor)</li>
              </ul>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                ⚠️ Desvantagens do SSR
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Mais lento que SSG (renderiza sempre)</li>
                <li>• Maior carga no servidor</li>
                <li>• TTFB (Time to First Byte) maior</li>
                <li>• Custos de servidor mais altos</li>
                <li>• Não pode usar CDN para cache</li>
              </ul>
            </div>
          </div>

          {/* Como testar */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              🧪 Como testar o SSR:
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 text-sm">
              <li>
                Recarregue esta página várias vezes (F5 ou Cmd+R)
              </li>
              <li>
                Observe que o timestamp, citação e usuário mudam a cada vez
              </li>
              <li>
                Inspecione o HTML (View Source) - conteúdo já está renderizado
              </li>
              <li>
                No DevTools → Network, veja que o documento HTML vem completo do servidor
              </li>
              <li>
                Em produção (<code className="bg-yellow-100 px-1 rounded">pnpm build && pnpm start</code>),
                o comportamento é o mesmo - sempre dinâmico!
              </li>
            </ol>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex gap-4">
              <Link
                href="/"
                className="text-emerald-600 hover:text-emerald-800 text-sm"
              >
                ← Voltar para Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
