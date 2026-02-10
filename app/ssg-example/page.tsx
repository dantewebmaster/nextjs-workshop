import Link from "next/link";

// URL da API (usa Mockoon local durante build)
const API_URL = process.env.API_URL || 'http://localhost:3001';

type Post = {
  id: number;
  title: string;
  body: string;
};

async function getPosts(): Promise<Post[]> {
  const res = await fetch(`${API_URL}/posts?_limit=5`, {
    cache: 'force-cache'
  });

  if (!res.ok) {
    throw new Error('Falha ao buscar posts');
  }

  return res.json();
}

export default async function SSGExamplePage() {
  const posts = await getPosts();
  const buildTime = new Date().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
  });

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="shadow-lg rounded-lg p-8">
          <h1 className="text-4xl font-bold mb-2">
            SSG - Static Site Generation
          </h1>
          <p>
            Esta página foi gerada estaticamente no momento do build
          </p>

          <div className="bg-blue-50 mt-2 border-l-4 border-blue-500 p-4 mb-8">
            <div className="flex">
              <div className="shrink-0">
                <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  <strong>Hora do Build:</strong> {buildTime}
                </p>
                <p className="text-sm text-blue-700 mt-1">
                  💡 Recarregue a página e note que a hora não muda - a página foi gerada uma única vez no build!
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Como funciona o SSG?
            </h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>As páginas são geradas em HTML no momento do <strong>build</strong></span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Os dados são buscados apenas uma vez durante o build</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Resultado: páginas ultra-rápidas servidas diretamente do CDN</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Ideal para conteúdo que não muda frequentemente</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Posts (buscados no build time)
            </h2>
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-medium mb-2">
                    {post.id}. {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {post.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <Link
              href="/"
              className="hover:underline"
            >
              ← Voltar para Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
