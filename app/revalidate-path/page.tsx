// Exemplo 3: Revalidação Baseada em Path
// Revalida páginas específicas por seu caminho (URL)

import Link from 'next/link';
import { RevalidateButton } from '@/app/components/RevalidateButton';
import { revalidatePagePath } from '@/app/actions/revalidate';

async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api/');

  if (!res.ok) {
    throw new Error('Falha ao buscar usuário');
  }

  const data = await res.json();
  return data.results[0];
}

async function getRandomJoke() {
  const res = await fetch('https://official-joke-api.appspot.com/random_joke');

  if (!res.ok) {
    throw new Error('Falha ao buscar piada');
  }

  return res.json();
}

export default async function RevalidatePathPage() {
  const user = await getRandomUser();
  const joke = await getRandomJoke();
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg p-8">
          <div className="mb-6">
            <Link href="/" className="text-purple-600 hover:text-purple-800 text-sm">
              ← Voltar
            </Link>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🛣️ Revalidação por Path
          </h1>
          <p className="text-gray-600 mb-8">
            Path-based Revalidation - Revalide páginas inteiras sob demanda
          </p>

          {/* Timestamp */}
          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-8">
            <p className="text-lg text-purple-700">
              <strong>⏰ Renderizado em:</strong> {renderTime}
            </p>
            <p className="text-sm text-purple-700 mt-2">
              Clique no botão abaixo para revalidar esta página inteira!
            </p>
          </div>

          {/* Botão de Revalidação */}
          <div className="mb-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              🔄 Revalidar Esta Página
            </h2>
            <p className="text-gray-700 text-sm mb-4">
              Ao clicar no botão abaixo, toda esta página será regenerada com novos dados.
            </p>
            <RevalidateButton
              action={async () => {
                'use server';
                return revalidatePagePath('/revalidate-path');
              }}
              label="🔄 Revalidar Página Completa"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all font-medium"
            />
          </div>

          {/* Dados da página */}
          <div className="space-y-6 mb-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                👤 Usuário Aleatório
              </h2>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <div className="flex items-center gap-4">
                  <img
                    src={user?.picture.large}
                    alt={`${user?.name.first} ${user?.name.last}`}
                    className="w-20 h-20 rounded-full"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {user?.name.first} {user?.name.last}
                    </h3>
                    <p className="text-gray-600 text-sm">{user?.email}</p>
                    <p className="text-gray-600 text-sm">{user?.location.city}, {user?.location.country}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                😄 Piada do Dia
              </h2>
              <div className="bg-pink-50 border border-pink-200 rounded-lg p-6">
                <p className="text-gray-800 font-medium mb-2">{joke.setup}</p>
                <p className="text-gray-600 italic">{joke.punchline}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex gap-4">
              <Link
                href="/revalidate-tag"
                className="text-purple-600 hover:text-purple-800 text-sm"
              >
                ← Anterior: Revalidação por Tag
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
