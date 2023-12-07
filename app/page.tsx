'use client';

import { useState } from 'react';

export default function Page() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);

  async function handleSubmit() {
    try {
      const res = await fetch('/api/gpt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: input }],
        }),
      });
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Failed to fetch:', error);
    }
  }

  return (
    <main className="flex flex-col min-h-screen items-center p-24">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message"
      />
      <button
        className="mt-4 mb-10 py-3 px-6 text-white bg-black rounded-xl"
        onClick={handleSubmit}
      >
        Send
      </button>
      {response && <div>{JSON.stringify(response, null, 2)}</div>}
    </main>
  );
}
