'use client';

import { useMemo, useState } from 'react';

const samplePrompts = [
  'Summarize my morning calendar and draft a short prep checklist.',
  'Check my inbox for urgent messages and suggest next steps.',
  'Give me a brief daily briefing for today in three bullets.',
];

export default function Home() {
  const [prompt, setPrompt] = useState(samplePrompts[0]);
  const [reply, setReply] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const apiBase = useMemo(
    () => process.env.NEXT_PUBLIC_API_BASE ?? 'http://localhost:3000',
    [],
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setReply('');
    setErrorMessage('');

    try {
      const response = await fetch(`${apiBase}/api/assistant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.message ?? 'Request failed.');
      }

      const data = (await response.json()) as { reply?: string };
      setReply(data.reply ?? 'No reply received.');
      setStatus('idle');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong.';
      setStatus('error');
      setErrorMessage(message);
    }
  };

  return (
    <main className="main">
      <section className="card">
        <h2>Ask your assistant</h2>
        <p className="muted">
          The backend uses OpenAI Agents and MCP tools to fetch context and deliver
          a concise response.
        </p>
        <form className="form" onSubmit={handleSubmit}>
          <label className="label" htmlFor="prompt">
            Prompt
          </label>
          <textarea
            id="prompt"
            name="prompt"
            rows={5}
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder="Ask the assistant to summarize your day..."
          />
          <div className="actions">
            <button type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Running agent…' : 'Run assistant'}
            </button>
            <div className="sample">
              <span>Try:</span>
              {samplePrompts.map((item) => (
                <button
                  key={item}
                  type="button"
                  className="ghost"
                  onClick={() => setPrompt(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </form>
      </section>

      <section className="card">
        <h2>Assistant response</h2>
        {status === 'error' && <p className="error">{errorMessage}</p>}
        {status === 'loading' && <p className="muted">Thinking…</p>}
        {!reply && status !== 'loading' ? (
          <p className="muted">Your response will appear here.</p>
        ) : (
          <pre className="reply">{reply}</pre>
        )}
      </section>

      <section className="grid">
        <div className="card">
          <h3>What happens under the hood</h3>
          <ul>
            <li>Frontend sends your prompt to the NestJS API.</li>
            <li>NestJS calls an OpenAI Agent configured with MCP tools.</li>
            <li>The agent pulls context (calendar, email, etc.).</li>
            <li>The response is summarized and returned to the UI.</li>
          </ul>
        </div>
        <div className="card">
          <h3>Suggested demo goals</h3>
          <ul>
            <li>Show how tool output influences the final response.</li>
            <li>Highlight guardrails for missing or empty context.</li>
            <li>Explain how to add new MCP servers.</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
