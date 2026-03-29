import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const title = String(body.title || '').trim();
  const source = String(body.source || 'Manual');
  const grade = String(body.grade || 'Review');
  const doi = body.doi ? String(body.doi) : null;
  const url = body.url ? String(body.url) : null;

  if (!title) {
    return NextResponse.json({ error: 'title is required.' }, { status: 400 });
  }

  const project = await prisma.project.findUnique({ where: { id: params.id } });
  if (!project) {
    return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
  }

  const citation = await prisma.citation.create({
    data: {
      projectId: project.id,
      title,
      source,
      grade,
      doi,
      url
    }
  });

  await prisma.auditLog.create({
    data: {
      projectId: project.id,
      action: 'CITATION_ADD',
      detail: `Added citation: ${title}`
    }
  });

  return NextResponse.json(citation, { status: 201 });
}
