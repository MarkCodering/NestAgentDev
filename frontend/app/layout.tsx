import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Personal Assistant Demo',
  description: 'NestJS + MCP + OpenAI Agents demo UI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="page">
          <header className="header">
            <div>
              <p className="eyebrow">NestJS + MCP + OpenAI Agents</p>
              <h1>Personal Assistant Demo</h1>
              <p className="subhead">
                A minimal UI to explore how your agent calls MCP tools for context
                and returns a concise plan.
              </p>
            </div>
            <div className="card">
              <h2>Quick start</h2>
              <ol>
                <li>Start the Nest API on port 3000.</li>
                <li>Start this Next.js frontend on port 3001.</li>
                <li>Ask a question below.</li>
              </ol>
            </div>
          </header>
          {children}
          <footer className="footer">
            <span>Designed for your course tutorial</span>
          </footer>
        </div>
      </body>
    </html>
  );
}
