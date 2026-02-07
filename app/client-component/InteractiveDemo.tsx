'use client';

import { useState, useEffect } from 'react';

export function InteractiveDemo() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="mb-8 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">
        🎮 Demo Interativa
      </h2>

      {/* Counter */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          1️⃣ useState - Contador
        </h3>
        <div className="bg-white rounded-lg p-4">
          <p className="text-3xl font-bold text-purple-600 mb-4">
            {count}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCount(count - 1)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              - Decrementar
            </button>
            <button
              onClick={() => setCount(count + 1)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
            >
              + Incrementar
            </button>
            <button
              onClick={() => setCount(0)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Input controlado */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          2️⃣ onChange - Input Controlado
        </h3>
        <div className="bg-white rounded-lg p-4">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Digite algo..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <p className="text-gray-600">
            Você digitou: <strong className="text-purple-600">{text || '(nada ainda)'}</strong>
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Caracteres: {text.length}
          </p>
        </div>
      </div>

      {/* useEffect */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          3️⃣ useEffect - Browser APIs
        </h3>
        <div className="bg-white rounded-lg p-4 space-y-2 text-sm">
          <p>
            <strong>Componente montado:</strong>{' '}
            <span className={mounted ? 'text-green-600' : 'text-red-600'}>
              {mounted ? '✓ Sim' : '✗ Não'}
            </span>
          </p>
          <p>
            <strong>User Agent:</strong>{' '}
            <span className="text-gray-600 text-xs break-all">
              {typeof window !== 'undefined' ? window.navigator.userAgent : 'N/A'}
            </span>
          </p>
          <p>
            <strong>Largura da janela:</strong>{' '}
            <span className="text-gray-600">
              {typeof window !== 'undefined' ? window.innerWidth : 'N/A'}px
            </span>
          </p>
        </div>
      </div>

      {/* localStorage */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          4️⃣ Browser Storage (localStorage)
        </h3>
        <div className="bg-white rounded-lg p-4">
          <button
            onClick={() => {
              const timestamp = new Date().toLocaleTimeString('pt-BR');
              localStorage.setItem('lastClick', timestamp);
              alert(`Salvo no localStorage: ${timestamp}`);
            }}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors w-full"
          >
            💾 Salvar timestamp no localStorage
          </button>
          <p className="text-gray-500 text-xs mt-3">
            Abra o DevTools → Application → Local Storage para ver o valor salvo
          </p>
        </div>
      </div>
    </div>
  );
}
