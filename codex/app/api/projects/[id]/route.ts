import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const project = await prisma.project.findUnique({
    where: { id: params.id },
    include: {
      artifacts: true,
      builds: { include: { tests: true }, orderBy: { createdAt: 'desc' } },
      citations: true
    }
  });

  if (!project) {
    return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
  }

  const artifacts = project.artifacts.map((artifact) => ({
    ...artifact,
    content: (() => {
      try {
        return JSON.parse(artifact.content);
      } catch {
        return { text: '' };
      }
    })()
  }));

  return NextResponse.json({ ...project, artifacts });
}
