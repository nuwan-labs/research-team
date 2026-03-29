import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { StageId } from '@/lib/stages';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const stage = String(body.stage || '').toUpperCase() as StageId;
  const content = body.content || {};

  if (!stage) {
    return NextResponse.json({ error: 'stage is required.' }, { status: 400 });
  }

  const project = await prisma.project.findUnique({ where: { id: params.id } });
  if (!project) {
    return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
  }

  const artifact = await prisma.artifact.upsert({
    where: {
      projectId_stage: {
        projectId: project.id,
        stage
      }
    },
    create: {
      projectId: project.id,
      stage,
      content: JSON.stringify(content)
    },
    update: {
      content: JSON.stringify(content)
    }
  });

  await prisma.auditLog.create({
    data: {
      projectId: project.id,
      action: 'ARTIFACT_SAVE',
      detail: `Saved ${stage} artifact.`
    }
  });

  return NextResponse.json(artifact);
}
