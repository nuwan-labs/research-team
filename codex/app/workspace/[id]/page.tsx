'use client';

import { useEffect, useMemo, useState } from 'react';
import { STAGES, StageId, stageLabel } from '@/lib/stages';
import clsx from 'clsx';
import Link from 'next/link';

type Artifact = {
  id: string;
  stage: StageId;
  content: any;
};

type BuildTest = {
  id: string;
  name: string;
  status: 'PASS' | 'FAIL';
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  message: string;
};

type Build = {
  id: string;
  number: number;
  status: 'PASS' | 'FAIL';
  summary: string;
  createdAt: string;
  tests: BuildTest[];
};

type Citation = {
  id: string;
  title: string;
  source: string;
  grade: string;
  doi?: string | null;
  url?: string | null;
};

type Project = {
  id: string;
  name: string;
  template: string;
  artifacts: Artifact[];
  builds: Build[];
  citations: Citation[];
};

const defaultContent = (stage: StageId) => {
  switch (stage) {
    case 'METHODS':
      return { text: '', controls: '', materials: '' };
    case 'ANALYSIS':
      return { text: '', sampleSize: 0 };
    default:
      return { text: '' };
  }
};

export default function WorkspacePage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<Project | null>(null);
  const [activeStage, setActiveStage] = useState<StageId>('QUESTION');
  const [content, setContent] = useState<Record<StageId, any>>({} as Record<StageId, any>);
  const [saving, setSaving] = useState(false);
  const [compiling, setCompiling] = useState(false);

  useEffect(() => {
    fetch(`/api/projects/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setProject(data);
        const map = {} as Record<StageId, any>;
        STAGES.forEach((stage) => {
          const found = data.artifacts.find((item: Artifact) => item.stage === stage.id);
          map[stage.id] = found?.content || defaultContent(stage.id as StageId);
        });
        setContent(map);
      });
  }, [params.id]);

  const latestBuild = useMemo(() => project?.builds?.[0], [project]);

  async function saveStage() {
    if (!project) return;
    setSaving(true);
    await fetch(`/api/projects/${project.id}/artifacts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        stage: activeStage,
        content: content[activeStage]
      })
    });
    setSaving(false);
  }

  async function runCompile() {
    if (!project) return;
    setCompiling(true);
    const res = await fetch('/api/compile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectId: project.id })
    });
    const build = await res.json();
    setProject((prev) =>
      prev ? { ...prev, builds: [build, ...prev.builds] } : prev
    );
    setCompiling(false);
  }

  async function addSampleCitation() {
    if (!project) return;
    const res = await fetch(`/api/projects/${project.id}/citations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Doe et al. 2022. Biomarker discovery study',
        source: 'PubMed',
        grade: 'Review',
        doi: '10.1234/example'
      })
    });
    const citation = await res.json();
    setProject((prev) =>
      prev ? { ...prev, citations: [citation, ...prev.citations] } : prev
    );
  }

  if (!project) {
    return <div className="p-10 text-muted">Loading project...</div>;
  }

  const stageContent = content[activeStage] || defaultContent(activeStage);

  return (
    <div className="min-h-screen bg-bg px-6 py-6">
      <header className="mb-5 flex items-center justify-between">
        <div>
          <Link href="/" className="text-sm text-muted">
            ? All projects
          </Link>
          <h1 className="text-2xl font-semibold">{project.name}</h1>
          <p className="text-sm text-muted">Template: {project.template}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={addSampleCitation}
            className="rounded-lg border border-border bg-panel px-3 py-2 text-sm"
          >
            Add sample citation
          </button>
          <button
            onClick={runCompile}
            disabled={compiling}
            className="rounded-lg bg-accent px-4 py-2 text-white disabled:opacity-50"
          >
            {compiling ? 'Compiling...' : 'Run Compile'}
          </button>
        </div>
      </header>

      <div className="grid gap-4 lg:grid-cols-[280px_1fr_320px]">
        <aside className="rounded-2xl border border-border bg-panel p-4 shadow-sm">
          <h2 className="mb-3 text-sm font-semibold text-muted">Pipeline</h2>
          <div className="grid gap-2">
            {STAGES.map((stage) => (
              <button
                key={stage.id}
                onClick={() => setActiveStage(stage.id as StageId)}
                className={clsx(
                  'flex items-center justify-between rounded-lg border px-3 py-2 text-left text-sm',
                  activeStage === stage.id
                    ? 'border-accent bg-panelAlt'
                    : 'border-border bg-white'
                )}
              >
                <span>{stage.label}</span>
                <span className="text-xs text-muted">Draft</span>
              </button>
            ))}
          </div>
        </aside>

        <section className="rounded-2xl border border-border bg-panel p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">{stageLabel(activeStage)}</h2>
              <p className="text-sm text-muted">Edit structured content for this stage.</p>
            </div>
            <button
              onClick={saveStage}
              disabled={saving}
              className="rounded-lg border border-border px-3 py-2 text-sm"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>

          {activeStage === 'METHODS' && (
            <div className="grid gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Protocol text</label>
                <textarea
                  className="h-32 w-full rounded-lg border border-border p-3"
                  value={stageContent.text || ''}
                  onChange={(event) =>
                    setContent({
                      ...content,
                      METHODS: { ...stageContent, text: event.target.value }
                    })
                  }
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Controls</label>
                <input
                  className="w-full rounded-lg border border-border p-3"
                  value={stageContent.controls || ''}
                  onChange={(event) =>
                    setContent({
                      ...content,
                      METHODS: { ...stageContent, controls: event.target.value }
                    })
                  }
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Materials</label>
                <input
                  className="w-full rounded-lg border border-border p-3"
                  value={stageContent.materials || ''}
                  onChange={(event) =>
                    setContent({
                      ...content,
                      METHODS: { ...stageContent, materials: event.target.value }
                    })
                  }
                />
              </div>
            </div>
          )}

          {activeStage === 'ANALYSIS' && (
            <div className="grid gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Analysis notes</label>
                <textarea
                  className="h-32 w-full rounded-lg border border-border p-3"
                  value={stageContent.text || ''}
                  onChange={(event) =>
                    setContent({
                      ...content,
                      ANALYSIS: { ...stageContent, text: event.target.value }
                    })
                  }
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Sample size</label>
                <input
                  type="number"
                  className="w-full rounded-lg border border-border p-3"
                  value={stageContent.sampleSize || 0}
                  onChange={(event) =>
                    setContent({
                      ...content,
                      ANALYSIS: {
                        ...stageContent,
                        sampleSize: Number(event.target.value)
                      }
                    })
                  }
                />
              </div>
            </div>
          )}

          {activeStage !== 'METHODS' && activeStage !== 'ANALYSIS' && (
            <div>
              <label className="mb-1 block text-sm font-medium">Notes</label>
              <textarea
                className="h-40 w-full rounded-lg border border-border p-3"
                value={stageContent.text || ''}
                onChange={(event) =>
                  setContent({
                    ...content,
                    [activeStage]: { ...stageContent, text: event.target.value }
                  })
                }
              />
            </div>
          )}
        </section>

        <aside className="rounded-2xl border border-border bg-panel p-4 shadow-sm">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-muted">Build Status</h3>
            <div className="mt-2 rounded-lg border border-border bg-panelAlt p-3">
              {latestBuild ? (
                <div>
                  <p className="text-sm font-semibold">
                    Build #{latestBuild.number} · {latestBuild.status}
                  </p>
                  <p className="text-xs text-muted">{latestBuild.summary}</p>
                </div>
              ) : (
                <p className="text-sm text-muted">No builds yet.</p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-semibold text-muted">Tests</h3>
            <div className="mt-2 grid gap-2">
              {(latestBuild?.tests || []).map((test) => (
                <div
                  key={test.id}
                  className="rounded-lg border border-border bg-white p-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{test.name}</span>
                    <span
                      className={clsx(
                        'rounded-full px-2 py-0.5 text-[10px]',
                        test.status === 'PASS'
                          ? 'bg-success text-white'
                          : 'bg-warning text-white'
                      )}
                    >
                      {test.status}
                    </span>
                  </div>
                  <p className="text-muted">{test.message}</p>
                </div>
              ))}
              {!latestBuild && <p className="text-xs text-muted">Run a build to see tests.</p>}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-muted">Evidence</h3>
            <div className="mt-2 grid gap-2">
              {project.citations.map((citation) => (
                <div key={citation.id} className="rounded-lg border border-border p-2 text-xs">
                  <p className="font-medium">{citation.title}</p>
                  <p className="text-muted">
                    {citation.source} · {citation.grade}
                  </p>
                </div>
              ))}
              {project.citations.length === 0 && (
                <p className="text-xs text-muted">No citations added yet.</p>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
