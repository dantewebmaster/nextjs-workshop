// Server Component (Padrão no Next.js App Router)
// Renderizado no servidor, sem JavaScript enviado ao cliente

import Link from 'next/link';

// URL da API (usa Mockoon local durante build)
const API_URL = process.env.API_URL || 'http://localhost:3001';

// Server Component pode fazer fetch direto
async function getServerData() {
  const res = await fetch(`${API_URL}/products/1`);
  return res.json();
}

export default async function ServerComponentPage() {
  const product = await getServerData();
  const serverTime = new Date().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    hour12: false
  });

  // Pode acessar variáveis de ambiente do servidor diretamente
  const nodeVersion = process.version;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg p-8">
          <div className="mb-6">
            <Link href="/" className="text-blue-600 hover:text-blue-800 text-sm">
              ← Voltar
            </Link>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🖥️ Server Component
          </h1>
          <p className="text-gray-600 mb-8">
            Componentes renderizados no servidor (padrão no App Router)
          </p>

          {/* Características */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              ✨ Características dos Server Components
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span>Renderizados no servidor durante o build ou na requisição</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span>Acesso direto a recursos do servidor (banco de dados, filesystem, etc.)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span>Podem ser componentes assíncronos (async/await)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span>Zero JavaScript enviado ao cliente</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span>Não podem usar hooks do React (useState, useEffect, etc.)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span>Não podem usar event handlers (onClick, onChange, etc.)</span>
              </li>
            </ul>
          </div>

          {/* Exemplos práticos */}
          <div className="space-y-6 mb-8">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                📊 Dados do Servidor
              </h3>
              <div className="bg-white rounded-lg p-4 space-y-2 text-sm [&>p]:text-gray-600">
                <p><strong>Hora do servidor:</strong> {serverTime}</p>
                <p><strong>Node.js version:</strong> {nodeVersion}</p>
                <p><strong>Ambiente:</strong> {process.env.NODE_ENV}</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                🔄 Fetch de Dados (sem loading state)
              </h3>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-gray-800">{product.title}</h4>
                <p className="text-gray-600 text-sm mt-2">{product.description}</p>
                <p className="text-blue-600 font-bold mt-2">${product.price}</p>
                <p className="text-gray-500 text-xs mt-2">
                  Estes dados foram buscados diretamente no servidor, sem loading state!
                </p>
              </div>
            </div>
          </div>

          {/* Código exemplo */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              💻 Código do Server Component
            </h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// Sem 'use client' = Server Component (padrão)

async function getServerData() {
  const res = await fetch('https://api.com/data');
  return res.json();
}

export default async function Page() {
  const data = await getServerData();

  // Acesso direto ao servidor
  const nodeVersion = process.version;

  return <div>{data.title}</div>;
}`}
            </pre>
          </div>

          {/* Quando usar */}
          <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              ✅ Quando usar Server Components
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• Buscar dados de APIs ou banco de dados</li>
              <li>• Acessar recursos do backend diretamente</li>
              <li>• Usar bibliotecas grandes sem aumentar bundle do cliente</li>
              <li>• Manter código sensível (chaves de API) no servidor</li>
              <li>• Reduzir quantidade de JavaScript no cliente</li>
            </ul>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              ❌ O que Server Components NÃO podem fazer
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• Usar hooks do React (useState, useEffect, useContext, etc.)</li>
              <li>• Event handlers (onClick, onChange, onSubmit, etc.)</li>
              <li>• Usar APIs do browser (localStorage, window, document, etc.)</li>
              <li>• Interatividade do cliente</li>
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <Link
              href="/client-component"
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Próximo: Client Component →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
