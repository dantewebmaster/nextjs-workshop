// Exemplo de Revalidação no Next.js
// 1. Time-based Revalidation (ISR)
// 2. On-demand Revalidation via API Route
// 3. Tag-based Revalidation

import Link from 'next/link';

// EXEMPLO 1: Revalidação baseada em tempo (ISR)
// A página será regenerada a cada 30 segundos quando houver uma requisição
export const revalidate = 30;

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

// EXEMPLO 2: Fetch com tag para revalidação on-demand
async function getRandomPost(): Promise<Post> {
    const randoId = Math.floor(Math.random() * 100) + 1;

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${randoId}`, {
    next: {
      tags: ['posts'], // Tag para revalidação on-demand
    }
  });

  if (!res.ok) {
    throw new Error('Falha ao buscar post');
  }

  return res.json();
}

// Fetch com cache de 10 segundos
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api/', {
    next: {
      revalidate: 10, // Revalida a cada 10 segundos
      tags: ['users'], // Tag para revalidação on-demand
    }
  });

  if (!res.ok) {
    throw new Error('Falha ao buscar usuário');
  }

  const data = await res.json();
  return data.results[0];
}

export default async function RevalidateExamplePage() {
  const post = await getRandomPost();
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Revalidação no Next.js
          </h1>
          <p className="text-gray-600 mb-6">
            Exemplos práticos de ISR e On-demand Revalidation
          </p>

          {/* Informação sobre quando foi renderizada */}
          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-purple-700">
                  <strong>Última renderização:</strong> {renderTime}
                </p>
                <p className="text-sm text-purple-700 mt-1">
                  ⏱️ Esta página usa <code className="bg-purple-100 px-1 rounded">revalidate = 30</code> segundos
                </p>
              </div>
            </div>
          </div>

          {/* Seção 1: Time-based Revalidation */}
          <div className="mb-8 bg-blue-50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3 flex items-center">
              <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">1</span>
              Time-based Revalidation (ISR)
            </h2>
            <div className="bg-white rounded p-4 mb-4">
              <pre className="text-sm text-gray-800 overflow-x-auto">
{`export const revalidate = 30; // segundos`}
              </pre>
            </div>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Página regenerada automaticamente a cada 30 segundos</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Primeira requisição após 30s serve cache antigo e regenera em background</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Próximas requisições já recebem a versão atualizada</span>
              </li>
            </ul>
          </div>

          {/* Seção 2: Tag-based Revalidation */}
          <div className="mb-8 bg-green-50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3 flex items-center">
              <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">2</span>
              Tag-based Revalidation
            </h2>
            <div className="bg-white rounded p-4 mb-4">
              <pre className="text-sm text-gray-800 overflow-x-auto">
{`fetch('https://api.example.com/data', {
  next: {
    tags: ['posts'], // Tag para revalidação
  }
})`}
              </pre>
            </div>

            {/* Exemplo de dados com tag 'posts' */}
            <div>
              <p className="text-gray-600 text-sm mb-2"></p>
                {post?.title}
              <p className="text-gray-600 text-sm mt-2">{post?.body}</p>
            </div>

            {/* Exemplo de dados com tag 'users' */}
            <div className="bg-white border-l-4 border-green-500 p-4">
              <p className="text-gray-600 text-sm mb-2">👤 Usuário Aleatório (tag: &apos;users&apos;, revalidate: 10s):</p>
              <p className="text-gray-800">
                <strong>{user.name.first} {user.name.last}</strong>
              </p>
              <p className="text-gray-600 text-sm">{user.email}</p>
            </div>
          </div>

          {/* Seção 3: On-demand Revalidation via API */}
          <div className="mb-8 bg-orange-50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3 flex items-center">
              <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">3</span>
              On-demand Revalidation via API Route
            </h2>
            <div className="bg-white rounded p-4 mb-4">
              <pre className="text-sm text-gray-800 overflow-x-auto">
{`// app/api/revalidate/route.ts
import { revalidateTag, revalidatePath } from 'next/cache';

revalidateTag('posts');  // Revalida por tag
revalidatePath('/path');  // Revalida por caminho`}
              </pre>
            </div>

            <div className="space-y-3">
              <p className="text-gray-700 text-sm">
                🔄 Teste a revalidação on-demand usando os botões abaixo:
              </p>

              <form action="/api/revalidate" method="POST" className="space-y-2">
                <input type="hidden" name="tag" value="posts" />
                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm"
                >
                  🔄 Revalidar Tag &apos;posts&apos;
                </button>
              </form>

              <form action="/api/revalidate" method="POST" className="space-y-2">
                <input type="hidden" name="tag" value="users" />
                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm"
                >
                  🔄 Revalidar Tag &apos;users&apos;
                </button>
              </form>

              <form action="/api/revalidate" method="POST" className="space-y-2">
                <input type="hidden" name="path" value="/revalidate-example" />
                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm"
                >
                  🔄 Revalidar Página Inteira
                </button>
              </form>
            </div>
          </div>

          {/* Resumo */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              📋 Resumo dos Tipos de Revalidação
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start">
                <span className="font-semibold text-blue-600 w-32">Time-based:</span>
                <span className="text-gray-700">Define intervalo fixo de revalidação (ISR)</span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold text-green-600 w-32">Tag-based:</span>
                <span className="text-gray-700">Revalida grupos de dados específicos sob demanda</span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold text-orange-600 w-32">Path-based:</span>
                <span className="text-gray-700">Revalida páginas específicas sob demanda</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              ← Voltar para Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
