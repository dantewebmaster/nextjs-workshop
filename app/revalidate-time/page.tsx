// Exemplo 1: Revalidação Baseada em Tempo (ISR)
// A página é regenerada automaticamente a cada X segundos
import Link from 'next/link';

// URL da API (usa Mockoon local durante build)
const API_URL = process.env.API_URL || 'http://localhost:3001';

export const revalidate = 10;

async function getRandomQuote() {
  const res = await fetch(`${API_URL}/quotes/random`);

  if (!res.ok) {
    throw new Error('Falha ao buscar citação');
  }

  return res.json();
}

export default async function RevalidateTimePage() {
  const quote = await getRandomQuote();
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg p-8">
          <div className="mb-6">
            <Link href="/" className="text-blue-600 hover:text-blue-800 text-sm">
              ← Voltar
            </Link>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            ⏱️ Revalidação por Tempo
          </h1>
          <p className="text-gray-600 mb-8">
            Time-based Revalidation (ISR - Incremental Static Regeneration)
          </p>

          {/* Timestamp */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
            <p className="text-lg text-blue-700">
              <strong>⏰ Renderizado em:</strong> {renderTime}
            </p>
            <p className="text-sm text-blue-700 mt-2">
              Esta página foi gerada estaticamente e será regenerada automaticamente
              <strong> a cada 10 segundos</strong> quando houver uma nova requisição.
            </p>
          </div>
          {/* Dados dinâmicos */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              📊 Dados Atualizados
            </h2>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
              <p className="text-gray-600 text-sm mb-3">💬 Citação aleatória:</p>
              <blockquote className="text-lg text-gray-800 italic mb-3">
                "{quote.quote}"
              </blockquote>
              <p className="text-gray-600">— {quote.author}</p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex gap-4">
              <Link
                href="/revalidate-tag"
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Próximo: Revalidação por Tag →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
