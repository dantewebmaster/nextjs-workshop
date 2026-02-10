// Exemplo 2: Revalidação Baseada em Tag
// Permite revalidar grupos específicos de dados sob demanda

import Link from 'next/link';
import { unstable_cache } from 'next/cache';
import { RevalidateButton } from '@/app/components/RevalidateButton';
import { revalidateQuotesTag, revalidateProductsTag } from '@/app/actions/revalidate';

// URL da API (usa Mockoon local durante build)
const API_URL = process.env.API_URL || 'http://localhost:3001';

// Função para buscar quotes com cache explícito
const getQuotes = unstable_cache(
  async () => {
    const timestamp = new Date().toLocaleTimeString('pt-BR', { hour12: false });

    // Gera um ID aleatório baseado no timestamp para garantir dados diferentes
    const randomId = Math.floor(Math.random() * 1000) + 1;
    const quote = await fetch(`${API_URL}/quotes/${randomId}`).then(r => r.json());

    return { data: quote, fetchedAt: timestamp };
  },
  ['quotes-cache'],
  { tags: ['quotes'] }
);

// Função para buscar produtos com cache explícito
const getProducts = unstable_cache(
  async () => {
    const timestamp = new Date().toLocaleTimeString('pt-BR', { hour12: false });

    // Gera IDs aleatórios
    const randomIds = Array.from({ length: 2 }, () => Math.floor(Math.random() * 100) + 1);

    const products = await Promise.all(
      randomIds.map(id => fetch(`${API_URL}/products/${id}`).then(r => r.json()))
    );

    return { data: products, fetchedAt: timestamp };
  },
  ['products-cache'],
  { tags: ['products'] }
);

export default async function RevalidateTagPage() {
  const quotesResult = await getQuotes();
  const productsResult = await getProducts();
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg p-8">
          <div className="mb-6">
            <Link href="/" className="text-green-600 hover:text-green-800 text-sm">
              ← Voltar
            </Link>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🏷️ Revalidação por Tag
          </h1>
          <p className="text-gray-600 mb-8">
            Tag-based Revalidation - Revalide dados específicos sob demanda
          </p>

          {/* Timestamp */}
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
            <p className="text-sm text-green-700">
              <strong>⏰ Renderizado em:</strong> {renderTime}
            </p>
            <p className="text-sm text-green-700 mt-2">
              Use as tags para revalidar apenas partes específicas desta página!
            </p>
          </div>

          {/* Seção Quotes */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-2xl font-semibold text-gray-800">
                💬 Citações (tag: 'quotes')
              </h2>
              <RevalidateButton
                action={revalidateQuotesTag}
                label="🔄 Revalidar Quotes"
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm"
              />
            </div>
            <div className="border border-green-200 rounded-lg p-4 mb-3">
              <p className="text-sm text-green-700">
                <strong>⏰ Dados buscados em:</strong> {quotesResult.fetchedAt}
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-gray-800 italic">"{quotesResult.data.quote}"</p>
              <p className="text-gray-600 text-sm mt-2">— {quotesResult.data.author}</p>
              <p className="text-gray-500 text-xs mt-2">ID: {quotesResult.data.id}</p>
            </div>
          </div>

          {/* Seção Products */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-2xl font-semibold text-gray-800">
                📦 Produtos (tag: 'products')
              </h2>
              <RevalidateButton
                action={revalidateProductsTag}
                label="🔄 Revalidar Products"
                className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors text-sm"
              />
            </div>
            <div className="border border-emerald-200 rounded-lg p-4 mb-3">
              <p className="text-sm text-emerald-700">
                <strong>⏰ Dados buscados em:</strong> {productsResult.fetchedAt}
              </p>
            </div>
            <div className="space-y-3 grid grid-cols-2 gap-4">
              {productsResult.data.map((product: any) => (
                <div key={product.id} className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800">{product.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                  <p className="text-emerald-600 font-bold mt-2">${product.price}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex gap-4">
              <Link
                href="/revalidate-time"
                className="text-green-600 hover:text-green-800 text-sm"
              >
                ← Anterior: Revalidação por Tempo
              </Link>
              <Link
                href="/revalidate-path"
                className="text-green-600 hover:text-green-800 text-sm"
              >
                Próximo: Revalidação por Path →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
