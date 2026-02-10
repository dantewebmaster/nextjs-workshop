// Exemplo 3: Fetch com tags para revalidação seletiva
import Link from 'next/link';
import { unstable_cache } from 'next/cache';
import { RevalidateButton } from '@/app/components/RevalidateButton';
import { revalidateQuotesTag, revalidateProductsTag } from '@/app/actions/revalidate';

// URL da API (usa Mockoon local durante build)
const API_URL = process.env.API_URL || 'http://localhost:3001';

// Fetch com cache e tag 'products'
const getProducts = unstable_cache(
  async () => {
    const timestamp = new Date().toLocaleTimeString('pt-BR', { hour12: false });
    const randomIds = Array.from({ length: 3 }, () => Math.floor(Math.random() * 30) + 1);

    const products = await Promise.all(
      randomIds.map(id =>
        fetch(`${API_URL}/products/${id}`).then(r => r.json())
      )
    );

    return { products, fetchedAt: timestamp };
  },
  ['products-fetch-demo'],
  { tags: ['products'] }
);

// Fetch com cache e tag 'quotes'
const getQuotes = unstable_cache(
  async () => {
    const timestamp = new Date().toLocaleTimeString('pt-BR', { hour12: false });

    const quote = await fetch(`${API_URL}/quotes/random`).then(r => r.json());

    return { quote, fetchedAt: timestamp };
  },
  ['quotes-fetch-demo'],
  { tags: ['quotes'] }
);

export default async function FetchTagPage() {
  const productsData = await getProducts();
  const quotesData = await getQuotes();
  const renderTime = new Date().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    hour12: false
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg p-8">
          <div className="mb-6">
            <Link href="/data-fetching" className="text-purple-600 hover:text-purple-800 text-sm">
              ← Voltar para Data Fetching
            </Link>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🏷️ Fetch com Tags
          </h1>
          <p className="text-gray-600 mb-8">
            Cache com tags para revalidação seletiva on-demand
          </p>

          {/* Timestamp */}
          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-4">
            <p className="text-sm text-purple-700">
              <strong>⏰ Página renderizada em:</strong> {renderTime}
            </p>
          </div>

          {/* Info sobre tags */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
            <p className="text-sm text-blue-800">
              <strong>💡 Como funciona:</strong> Cada seção tem sua própria tag.
              Revalide apenas o que mudou!
            </p>
            <p className="text-sm text-blue-800 mt-2">
              👀 Observe os timestamps "<strong>Buscado em</strong>" - apenas a seção revalidada muda!
            </p>
          </div>

          {/* Como funciona */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Como funciona?
            </h2>
            <div className="bg-gray-50 rounded-lg p-6 mb-4">
              <pre className="text-sm text-gray-800 overflow-x-auto">
{`// 1. Adicione tags ao fetch
const res = await fetch('https://api.com/products', {
  next: {
    tags: ['products'] // Tag para identificar estes dados
  }
});

// 2. Ou use unstable_cache
const getData = unstable_cache(
  async () => { /* fetch data */ },
  ['cache-key'],
  { tags: ['products'] }
);

// 3. Revalide seletivamente
import { revalidateTag } from 'next/cache';
revalidateTag('products', 'default'); // Só atualiza 'products'`}
              </pre>
            </div>
            <ul className="space-y-3 text-gray-700 text-sm">
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">✓</span>
                <span>
                  <strong>Granularidade:</strong> Revalide apenas os dados que mudaram
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">✓</span>
                <span>
                  <strong>Eficiência:</strong> Não regenera dados desnecessariamente
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">✓</span>
                <span>
                  <strong>Controle:</strong> Dispare via webhook, API route, ou server action
                </span>
              </li>
            </ul>
          </div>

          {/* Produtos */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-2xl font-semibold text-gray-800">
                📦 Produtos (tag: 'products')
              </h2>
              <RevalidateButton
                action={revalidateProductsTag}
                label="🔄 Revalidar"
                className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors text-sm"
              />
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-3">
              <p className="text-xs text-purple-700">
                <strong>⏰ Buscado em:</strong> {productsData.fetchedAt}
              </p>
            </div>
            <div className="space-y-3">
              {productsData.products.map((product: any) => (
                <div key={product.id} className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800">{product.title}</h3>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between mt-3">
                    <p className="text-purple-600 font-bold">${product.price}</p>
                    <p className="text-gray-500 text-xs">ID: {product.id}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Citação */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-2xl font-semibold text-gray-800">
                💬 Citação (tag: 'quotes')
              </h2>
              <RevalidateButton
                action={revalidateQuotesTag}
                label="🔄 Revalidar"
                className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors text-sm"
              />
            </div>
            <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 mb-3">
              <p className="text-xs text-pink-700">
                <strong>⏰ Buscado em:</strong> {quotesData.fetchedAt}
              </p>
            </div>
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-lg p-6">
              <blockquote className="text-lg text-gray-800 italic">
                "{quotesData.quote.quote}"
              </blockquote>
              <p className="text-gray-600 mt-3">— {quotesData.quote.author}</p>
              <p className="text-gray-400 text-xs mt-3">ID: {quotesData.quote.id}</p>
            </div>
          </div>

          {/* Casos de uso */}
          <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              🎯 Casos de Uso Reais
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>
                  <strong>E-commerce:</strong> Revalida apenas produtos que foram atualizados
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>
                  <strong>CMS:</strong> Webhook dispara revalidação quando conteúdo é publicado
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>
                  <strong>Dashboard:</strong> Atualiza apenas a métrica que mudou
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>
                  <strong>Multi-tenant:</strong> Revalida dados apenas do tenant específico
                </span>
              </li>
            </ul>
          </div>

          {/* Estratégias de tags */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              🎨 Estratégias de Nomeação de Tags
            </h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div>
                <p className="font-semibold mb-1">Por tipo de recurso:</p>
                <code className="bg-blue-100 px-2 py-1 rounded text-xs">
                  tags: ['products'], ['users'], ['posts']
                </code>
              </div>
              <div>
                <p className="font-semibold mb-1">Por ID específico:</p>
                <code className="bg-blue-100 px-2 py-1 rounded text-xs">
                  tags: [`product-${'{'}id{'}'}`], ['user-123']
                </code>
              </div>
              <div>
                <p className="font-semibold mb-1">Por hierarquia:</p>
                <code className="bg-blue-100 px-2 py-1 rounded text-xs">
                  tags: ['products', 'category-electronics', 'brand-samsung']
                </code>
              </div>
              <div>
                <p className="font-semibold mb-1">Múltiplas tags:</p>
                <code className="bg-blue-100 px-2 py-1 rounded text-xs">
                  tags: ['posts', 'author-john', 'tag-nextjs']
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
                <li>• Controle preciso sobre revalidação</li>
                <li>• Atualização instantânea quando necessário</li>
                <li>• Eficiente - só atualiza o necessário</li>
                <li>• Integra com webhooks e APIs</li>
                <li>• Combina com time-based revalidation</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                ⚠️ Considerações
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Requer estratégia de nomeação</li>
                <li>• Precisa implementar mecanismo de trigger</li>
                <li>• Mais complexo que time-based</li>
                <li>• Precisa gerenciar tags</li>
              </ul>
            </div>
          </div>

          {/* Como testar */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              🧪 Como testar:
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 text-sm">
              <li>Execute: <code className="bg-yellow-100 px-2 py-1 rounded">pnpm build && pnpm start</code></li>
              <li>Observe os timestamps de cada seção</li>
              <li>Clique em "Revalidar" apenas na seção de Produtos</li>
              <li>Veja que apenas o timestamp e produtos mudam - citação permanece igual!</li>
              <li>Agora clique em "Revalidar" na seção de Citação</li>
              <li>Apenas a citação muda - produtos mantêm os mesmos dados!</li>
            </ol>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex gap-4">
              <Link
                href="/fetch-cache-time"
                className="text-purple-600 hover:text-purple-800 text-sm"
              >
                ← Anterior: Revalidação por Tempo
              </Link>
              <Link
                href="/fetch-path"
                className="text-purple-600 hover:text-purple-800 text-sm"
              >
                Próximo: Fetch sem Cache →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
