// Página dinâmica gerada estaticamente para cada post da API
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Tipos para os dados da API
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    city: string;
  };
  phone: string;
  website: string;
  company: {
    name: string;
  };
}

// URL da API (usa Mockoon local durante build)
const API_URL = process.env.API_URL || 'http://localhost:3001';

// Buscar post específico da API
async function getPost(id: string): Promise<Post> {
  const res = await fetch(`${API_URL}/posts/${id}`, {
    cache: 'force-cache' // SSG
  });

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

// Buscar dados do autor
async function getUser(userId: number): Promise<User> {
  const res = await fetch(`${API_URL}/users/${userId}`, {
    cache: 'force-cache' // SSG
  });

  if (!res.ok) {
    throw new Error('Falha ao buscar usuário');
  }

  return res.json();
}

// Lista de IDs que serão gerados estaticamente
export async function generateStaticParams() {
  const res = await fetch(`${API_URL}/posts?_limit=10`, {
    cache: 'force-cache'
  });

  const posts = await res.json();

  return posts.map((post: Post) => ({
    slug: String(post.id)
  }));
}

// Opcional: retornar 404 para IDs não listados
export const dynamicParams = false;

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);
  const user = await getUser(post.userId);

  const buildTime = new Date().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    hour12: false,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg p-8">
          {/* Navigation */}
          <div className="mb-6">
            <Link
              href="/ssg-params"
              className="text-emerald-600 hover:text-emerald-800 text-sm"
            >
              ← Voltar para lista de posts
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">
                Post #{post.id}
              </span>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                User #{post.userId}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-600 border-t border-b border-gray-200 py-4 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-2xl">👤</span>
                <div>
                  <p className="font-semibold text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-500">@{user.username}</p>
                </div>
              </div>
              <span>•</span>
              <span>📧 {user.email}</span>
              <span>•</span>
              <span>🏢 {user.company.name}</span>
            </div>
          </div>

          {/* Build info */}
          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 mb-8">
            <p className="text-sm text-emerald-700">
              <strong>⚡ Dados buscados da API em:</strong> {buildTime}
            </p>
            <p className="text-sm text-emerald-700 mt-2">
              Esta página foi pré-renderizada no build usando{' '}
              <code className="bg-emerald-100 px-2 py-1 rounded">
                generateStaticParams()
              </code>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 text-xs">
              <div>
                <strong>API Endpoint (Post):</strong>
                <code className="block bg-emerald-100 px-2 py-1 rounded mt-1 break-all">
                  /posts/{resolvedParams.slug}
                </code>
              </div>
              <div>
                <strong>API Endpoint (User):</strong>
                <code className="block bg-emerald-100 px-2 py-1 rounded mt-1 break-all">
                  /users/{post.userId}
                </code>
              </div>
            </div>
          </div>

          {/* Content */}
          <article className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              📄 Conteúdo do Post
            </h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed text-lg">
                {post.body}
              </p>
            </div>
          </article>

          {/* Author info */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              👤 Sobre o Autor
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600 mb-2">
                  <strong className="text-gray-800">Nome:</strong> {user.name}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong className="text-gray-800">Username:</strong> @{user.username}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong className="text-gray-800">Email:</strong> {user.email}
                </p>
                <p className="text-gray-600">
                  <strong className="text-gray-800">Website:</strong>{' '}
                  <a href={`https://${user.website}`} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    {user.website}
                  </a>
                </p>
              </div>
              <div>
                <p className="text-gray-600 mb-2">
                  <strong className="text-gray-800">Empresa:</strong> {user.company.name}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong className="text-gray-800">Cidade:</strong> {user.address.city}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong className="text-gray-800">Endereço:</strong> {user.address.street}
                </p>
                <p className="text-gray-600">
                  <strong className="text-gray-800">Telefone:</strong> {user.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Technical info */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              📊 Informações Técnicas
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
              <ul className="space-y-2">
                <li>
                  <strong>Rendering:</strong> Static Site Generation (SSG)
                </li>
                <li>
                  <strong>Gerado em:</strong> Build time (pnpm build)
                </li>
                <li>
                  <strong>Fonte dos dados:</strong> JSONPlaceholder API
                </li>
                <li>
                  <strong>Fetches realizados:</strong> 2 (post + user)
                </li>
              </ul>
              <ul className="space-y-2">
                <li>
                  <strong>Servido como:</strong> HTML estático
                </li>
                <li>
                  <strong>Performance:</strong> Instant load
                </li>
                <li>
                  <strong>SEO:</strong> 100% otimizado
                </li>
                <li>
                  <strong>Cache:</strong> force-cache
                </li>
              </ul>
            </div>
          </div>

          {/* How it works */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              🔍 Como Funciona Este Exemplo
            </h3>
            <ol className="list-decimal list-inside space-y-3 text-sm text-gray-700">
              <li>
                <strong>generateStaticParams()</strong> busca lista de posts da API
              </li>
              <li>
                Para cada ID retornado, Next.js gera uma página HTML estática
              </li>
              <li>
                Durante a geração, faz fetch do post específico + dados do autor
              </li>
              <li>
                Resultado:{' '}
                <span className="bg-emerald-100 px-2 py-1 rounded">
                  Páginas 100% estáticas servidas via CDN
                </span>
              </li>
              <li>
                Em produção: Zero requisições ao servidor ou API em runtime!
              </li>
            </ol>
          </div>

          {/* Navigation */}
          <div className="flex gap-4 flex-wrap">
            <Link
              href="/ssg-params"
              className="inline-block bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors"
            >
              ← Ver todos os posts
            </Link>
            {Number(resolvedParams.slug) > 1 && (
              <Link
                href={`/ssg-params/${Number(resolvedParams.slug) - 1}`}
                className="inline-block bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
              >
                ← Post Anterior
              </Link>
            )}
            {Number(resolvedParams.slug) < 10 && (
              <Link
                href={`/ssg-params/${Number(resolvedParams.slug) + 1}`}
                className="inline-block bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Próximo Post →
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Gerar metadata para cada página
export async function generateMetadata({ params }: PageProps) {
  try {
    const resolvedParams = await params;
    const post = await getPost(resolvedParams.slug);
    const user = await getUser(post.userId);

    return {
      title: `${post.title} | Next.js Workshop`,
      description: post.body.substring(0, 160),
      authors: [{ name: user.name }],
      openGraph: {
        title: post.title,
        description: post.body.substring(0, 160),
        type: 'article',
      },
    };
  } catch {
    return {
      title: 'Post não encontrado',
    };
  }
}
