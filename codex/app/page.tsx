'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Project = {
  id: string;
  name: string;
  template: string;
  updatedAt: string;
};

const templates = ['Basic', 'Grant', 'Preclinical', 'Clinical'];

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [name, setName] = useState('');
  const [template, setTemplate] = useState('Basic');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  async function createProject() {
    if (!name.trim()) return;
    setLoading(true);
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, template })
    });
    const project = await res.json();
    setLoading(false);
    setName('');
    setProjects((prev) => [project, ...prev]);
  }

  return (
    <div className="min-h-screen px-10 py-8">
      <header className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Research Compiler</h1>
          <p className="text-muted">Artifact-first scientific research workspace.</p>
        </div>
        <div className="rounded-full border border-border bg-panel px-4 py-2 text-sm">
          Build-driven, evidence-bound
        </div>
      </header>

      <section className="grid gap-8 lg:grid-cols-[360px_1fr]">
        <div className="rounded-2xl border border-border bg-panel p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Create Project</h2>
          <label className="mb-2 block text-sm font-medium">Project name</label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mb-4 w-full rounded-lg border border-border bg-white px-3 py-2"
            placeholder="e.g. Biomarker Study"
          />
          <label className="mb-2 block text-sm font-medium">Template</label>
          <select
            value={template}
            onChange={(event) => setTemplate(event.target.value)}
            className="mb-6 w-full rounded-lg border border-border bg-white px-3 py-2"
          >
            {templates.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <button
            onClick={createProject}
            disabled={loading || !name.trim()}
            className="w-full rounded-lg bg-accent px-4 py-2 text-white disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Project'}
          </button>
        </div>

        <div className="rounded-2xl border border-border bg-panel p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Recent Projects</h2>
          <div className="grid gap-3">
            {projects.length === 0 && (
              <p className="text-muted">No projects yet. Create one to start compiling.</p>
            )}
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/workspace/${project.id}`}
                className="flex items-center justify-between rounded-lg border border-border px-4 py-3 hover:bg-panelAlt"
              >
                <div>
                  <p className="font-medium">{project.name}</p>
                  <p className="text-sm text-muted">{project.template} template</p>
                </div>
                <span className="text-xs text-muted">
                  {new Date(project.updatedAt).toLocaleDateString()}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
