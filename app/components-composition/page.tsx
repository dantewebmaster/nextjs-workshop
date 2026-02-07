// Server Component que demonstra composição
import Link from 'next/link';
import { ClientCounter } from './ClientCounter';
import { ClientForm } from './ClientForm';

// Fetch de dados no servidor
async function getProducts() {
  const res = await fetch('https://dummyjson.com/products?limit=3');
  const data = await res.json();
  return data.products;
}

export default async function CompositionPage() {
  const products = await getProducts();
  const serverTime = new Date().toLocaleTimeString('pt-BR', { hour12: false });

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg p-8">
          <div className="mb-6">
            <Link href="/" className="text-orange-600 hover:text-orange-800 text-sm">
              ← Voltar
            </Link>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🎨 Composição de Componentes
          </h1>
          <p className="text-gray-600 mb-8">
            Como combinar Server e Client Components eficientemente
          </p>

          {/* Padrão recomendado */}
          <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              ✅ Padrão Recomendado
            </h2>
            <p className="text-gray-700 mb-3">
              Mantenha Server Components no nível superior e use Client Components
              apenas onde necessário (folhas da árvore).
            </p>
            <pre className="bg-white p-4 rounded text-sm overflow-x-auto border">
{`// ✅ BOM: Server Component com Client "leaves"
export default async function Page() {
  const data = await fetchData(); // Server

  return (
    <div>
      <Header data={data} />        {/* Server */}
      <ClientCounter />             {/* Client */}
      <ProductList products={data} /> {/* Server */}
    </div>
  );
}`}
            </pre>
          </div>

          {/* Demo prática */}
          <div className="space-y-8 mb-8">
            {/* Seção do servidor */}
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-semibold">
                  SERVER
                </span>
                <h2 className="text-xl font-semibold text-gray-800">
                  Dados do Servidor
                </h2>
              </div>
              <div className="bg-white rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Renderizado em:</strong> {serverTime}
                </p>
                <p className="text-sm text-gray-600">
                  Estes dados foram buscados no servidor, sem JavaScript no cliente.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {products.map((product: any) => (
                  <div key={product.id} className="bg-white rounded-lg p-4 border">
                    <h3 className="font-semibold text-gray-800 text-sm">{product.title}</h3>
                    <p className="text-blue-600 font-bold mt-2">${product.price}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Client Component 1 */}
            <div className="bg-purple-50 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-purple-500 text-white px-3 py-1 rounded text-sm font-semibold">
                  CLIENT
                </span>
                <h2 className="text-xl font-semibold text-gray-800">
                  Contador Interativo
                </h2>
              </div>
              <ClientCounter />
            </div>

            {/* Client Component 2 */}
            <div className="bg-pink-50 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-pink-500 text-white px-3 py-1 rounded text-sm font-semibold">
                  CLIENT
                </span>
                <h2 className="text-xl font-semibold text-gray-800">
                  Formulário Interativo
                </h2>
              </div>
              <ClientForm />
            </div>
          </div>

          {/* Regras importantes */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              📋 Regras de Composição
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Server Components podem importar Client Components</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Client Components podem importar outros Client Components</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✗</span>
                <span>
                  <strong>Client Components NÃO podem importar Server Components diretamente</strong>
                  <br />
                  <span className="text-xs text-gray-500 ml-3">
                    (mas podem recebê-los via children ou props)
                  </span>
                </span>
              </li>
            </ul>
          </div>

          {/* Padrão children */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              💡 Padrão: Passar Server Component como children
            </h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// ✅ Correto: Passar Server Component como children
// app/page.tsx (Server)
import ClientWrapper from './ClientWrapper';
import ServerChild from './ServerChild';

export default function Page() {
  return (
    <ClientWrapper>
      <ServerChild /> {/* Server Component como children */}
    </ClientWrapper>
  );
}

// ClientWrapper.tsx (Client)
'use client';
export default function ClientWrapper({ children }) {
  const [open, setOpen] = useState(false);
  return <div onClick={() => setOpen(!open)}>{children}</div>;
}`}
            </pre>
          </div>

          {/* Benefícios */}
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              🎯 Benefícios desta Abordagem
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">
                  ⚡ Performance
                </h4>
                <p className="text-gray-600 text-sm">
                  Menos JavaScript enviado ao cliente. Apenas componentes interativos
                  aumentam o bundle.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">
                  🔒 Segurança
                </h4>
                <p className="text-gray-600 text-sm">
                  Código sensível e chaves de API permanecem no servidor.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">
                  🚀 SEO
                </h4>
                <p className="text-gray-600 text-sm">
                  Server Components são renderizados como HTML, melhor para SEO.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">
                  💾 Data Fetching
                </h4>
                <p className="text-gray-600 text-sm">
                  Acesso direto a dados no servidor, sem waterfalls no cliente.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <Link
              href="/client-component"
              className="text-orange-600 hover:text-orange-800 text-sm"
            >
              ← Anterior: Client Component
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
