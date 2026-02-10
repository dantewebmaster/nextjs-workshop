// Página de índice mostrando todas as páginas geradas estaticamente
import Link from 'next/link';

// URL da API (usa Mockoon local durante build)
const API_URL = process.env.API_URL || 'http://localhost:3001';

// Buscar posts da API (executado no build time)
async function getPosts() {
  const res = await fetch(`${API_URL}/posts?_limit=10`, {
    cache: 'force-cache' // Cache para SSG
  });

  if (!res.ok) {
    throw new Error('Falha ao buscar posts');
  }

  return res.json();
}

export default async function SSGParamsIndex() {
  const posts = await getPosts();
  const buildTime = new Date().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    hour12: false,
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
            📄 Static Site Generation com Params
          </h1>
          <p className="text-gray-600 mb-8">
            Gerando múltiplas páginas estáticas a partir de uma API
          </p>

          {/* Build time */}
          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 mb-8">
            <p className="text-sm text-emerald-700">
              <strong>🏗️ Dados buscados da API em:</strong> {buildTime}
            </p>
            <p className="text-sm text-emerald-700 mt-2">
              {posts.length} páginas foram pré-geradas no build usando JSONPlaceholder API!
            </p>
          </div>

          {/* Explicação */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Como funciona?
            </h2>
            <div className="bg-gray-50 rounded-lg p-6 mb-4">
              <pre className="text-sm text-gray-800 overflow-x-auto">
{`// app/posts/[id]/page.tsx

// 1. Busca lista de posts da API no build
export async function generateStaticParams() {
  const posts = await fetch(
    'https://jsonplaceholder.typicode.com/posts'
  ).then(r => r.json());

  return posts.map(post => ({
    id: String(post.id)
  }));
}

// 2. Busca post específico no build
export default async function Post({ params }) {
  const post = await fetch(
    \`https://api.com/posts/\${params.id}\`
  ).then(r => r.json());

  return <article>{post.title}</article>;
}`}
              </pre>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">1️⃣</span>
                <span>
                  <strong>Build Time:</strong> Next.js chama <code className="bg-gray-100 px-2 py-1 rounded">generateStaticParams()</code> que busca dados da API
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">2️⃣</span>
                <span>
                  <strong>Geração:</strong> Para cada ID retornado, cria HTML estático buscando dados da API
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">3️⃣</span>
                <span>
                  <strong>Deploy:</strong> Todas as {posts.length} páginas são servidas como arquivos estáticos via CDN
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">4️⃣</span>
                <span>
                  <strong>Runtime:</strong> Zero requisições ao servidor - tudo já renderizado!
                </span>
              </li>
            </ul>
          </div>

          {/* Lista de posts */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              📚 Posts da API ({posts.length} páginas)
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Todos os posts abaixo foram buscados da JSONPlaceholder API e pré-renderizados no build!
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              {posts.map((post: any) => (
                <Link
                  key={post.id}
                  href={`/ssg-params/${post.id}`}
                  className="block bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-semibold">
                      ID: {post.id}
                    </span>
                    <span className="text-gray-400 text-xs">
                      User {post.userId}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-gray-800 mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                    {post.body}
                  </p>
                  <p className="text-emerald-600 text-xs">
                    ⚡ Clique para ver a página completa →
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Comparação com SSR */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                ✅ generateStaticParams (SSG)
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Todas as páginas geradas no build</li>
                <li>• Servidas via CDN</li>
                <li>• Performance máxima</li>
                <li>• Zero latência no servidor</li>
                <li>• SEO perfeito</li>
              </ul>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                ⚠️ Dynamic Routes sem SSG
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Página gerada por requisição</li>
                <li>• Servidor processa cada visita</li>
                <li>• Performance variável</li>
                <li>• Latência de servidor</li>
                <li>• Maior custo</li>
              </ul>
            </div>
          </div>

          {/* Casos de uso */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              🎯 Casos de Uso Perfeitos
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span>
                  <strong>Blog/Documentação:</strong> Posts com slugs conhecidos
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span>
                  <strong>E-commerce:</strong> Páginas de produtos do catálogo
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span>
                  <strong>Portfólio:</strong> Projetos com URLs definidas
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                <span>
                  <strong>Marketing:</strong> Landing pages de campanhas
                </span>
              </li>
            </ul>
          </div>

          {/* Opções avançadas */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              ⚙️ Opções Avançadas
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">
                  1. dynamicParams (fallback)
                </h4>
                <pre className="text-sm text-gray-700 bg-white p-3 rounded overflow-x-auto">
{`export const dynamicParams = true; // default
// true = gera on-demand para slugs não listados
// false = 404 para slugs não listados`}
                </pre>
              </div>

              <div className="bg-emerald-50 rounded-lg p-4 border-2 border-emerald-300">
                <h4 className="font-semibold text-gray-800 mb-2">
                  2. Buscar IDs de uma API (usado neste exemplo!)
                </h4>
                <pre className="text-sm text-gray-700 bg-white p-3 rounded overflow-x-auto">
{`export async function generateStaticParams() {
  // Busca posts da JSONPlaceholder API
  const posts = await fetch(
    'https://jsonplaceholder.typicode.com/posts'
  ).then(r => r.json());

  // Retorna array de IDs
  return posts.map(post => ({
    id: String(post.id)
  }));
}`}
                </pre>
                <p className="text-emerald-700 text-xs mt-2">
                  ✅ É exatamente isso que este exemplo faz!
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">
                  3. Múltiplos parâmetros dinâmicos
                </h4>
                <pre className="text-sm text-gray-700 bg-white p-3 rounded overflow-x-auto">
{`// app/blog/[category]/[slug]/page.tsx
export async function generateStaticParams() {
  return [
    { category: 'tech', slug: 'nextjs-15' },
    { category: 'tech', slug: 'react-19' },
    { category: 'design', slug: 'ui-trends' },
  ];
}`}
                </pre>
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
                <li>• Performance máxima (CDN)</li>
                <li>• SEO otimizado</li>
                <li>• Custos reduzidos</li>
                <li>• Zero computação em runtime</li>
                <li>• Escalabilidade infinita</li>
                <li>• Offline-first</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                ⚠️ Considerações
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Slugs devem ser conhecidos no build</li>
                <li>• Muitas páginas = build mais lento</li>
                <li>• Dados fixos até próximo build</li>
                <li>• Use ISR para atualizar depois</li>
              </ul>
            </div>
          </div>

          {/* Como testar */}
          <div className="bg-emerald-50 border-l-4 border-emerald-400 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              🧪 Como testar:
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 text-sm">
              <li>Execute: <code className="bg-emerald-100 px-2 py-1 rounded">pnpm build</code></li>
              <li>Observe o build mostrando "{posts.length} static pages" geradas</li>
              <li>Execute: <code className="bg-emerald-100 px-2 py-1 rounded">pnpm start</code></li>
              <li>Clique nos posts acima - carregamento instantâneo!</li>
              <li>Veja no DevTools → Network: páginas servidas como HTML estático</li>
              <li>Compare com páginas SSR - estas não fazem fetch no servidor!</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
