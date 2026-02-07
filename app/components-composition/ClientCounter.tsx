'use client';

import { useState } from 'react';

export function ClientCounter() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-white rounded-lg p-4">
      <p className="text-4xl font-bold text-purple-600 mb-4 text-center">
        {count}
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => setCount(count - 1)}
          className="flex-1 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors"
        >
          - Decrementar
        </button>
        <button
          onClick={() => setCount(count + 1)}
          className="flex-1 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors"
        >
          + Incrementar
        </button>
      </div>
      <p className="text-gray-500 text-xs text-center mt-3">
        Este contador usa useState (Client Component)
      </p>
    </div>
  );
}
