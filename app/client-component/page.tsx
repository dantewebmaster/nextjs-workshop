// Esta é uma Server Component que usa um Client Component
import Link from 'next/link';
import { InteractiveDemo } from './InteractiveDemo';

export default function ClientComponentPage() {
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
            💻 Client Component
          </h1>
          <p className="text-gray-600 mb-8">
            Componentes renderizados no cliente (browser)
          </p>

          {/* Características */}
          <div className="bg-purple-50 border-l-4 border-purple-500 p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              ✨ Características dos Client Components
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">✓</span>
                <span>Requerem a diretiva 'use client' no topo do arquivo</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">✓</span>
                <span>Podem usar hooks do React (useState, useEffect, etc.)</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">✓</span>
                <span>Podem usar event handlers (onClick, onChange, etc.)</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">✓</span>
                <span>Acesso a APIs do browser (window, localStorage, etc.)</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">✓</span>
                <span>Interatividade e estado do cliente</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">✓</span>
                <span>JavaScript enviado ao cliente (aumenta bundle)</span>
              </li>
            </ul>
          </div>

          {/* Demo interativa */}
          <InteractiveDemo />

          {/* Código exemplo */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              💻 Código do Client Component
            </h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`'use client'; // ⚠️ Diretiva obrigatória!

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Incrementar
      </button>
    </div>
  );
}`}
            </pre>
          </div>

          {/* Quando usar */}
          <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              ✅ Quando usar Client Components
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• Interatividade (botões, formulários, modals, etc.)</li>
              <li>• Estado do cliente (useState, useReducer)</li>
              <li>• Efeitos colaterais (useEffect)</li>
              <li>• APIs do browser (geolocation, localStorage, etc.)</li>
              <li>• Event listeners (onClick, onScroll, etc.)</li>
              <li>• Custom hooks</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              ⚡ Dica de Performance
            </h3>
            <p className="text-gray-700 text-sm">
              Mantenha Client Components o mais <strong>pequenos</strong> possível.
              Use Server Components por padrão e adicione 'use client' apenas onde
              necessário para interatividade.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex gap-4">
              <Link
                href="/server-component"
                className="text-purple-600 hover:text-purple-800 text-sm"
              >
                ← Anterior: Server Component
              </Link>
              <Link
                href="/components-composition"
                className="text-purple-600 hover:text-purple-800 text-sm"
              >
                Próximo: Composição →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
