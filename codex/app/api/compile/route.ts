import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { compileBuild } from '@/lib/compile';

export async function POST(request: Request) {
  const body = await request.json();
  const projectId = String(body.projectId || '').trim();

  if (!projectId) {
    return NextResponse.json({ error: 'projectId is required.' }, { status: 400 });
  }

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: { artifacts: true, citations: true, builds: true }
  });

  if (!project) {
    return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
  }

  const compileResult = compileBuild(project, project.artifacts, project.citations);
  const buildNumber = project.builds.length + 1;

  const build = await prisma.build.create({
    data: {
      projectId: project.id,
      number: buildNumber,
      status: compileResult.status,
      summary: compileResult.summary,
      tests: {
        create: compileResult.tests.map((test) => ({
          name: test.name,
          status: test.status,
          severity: test.severity,
          message: test.message
        }))
      }
    },
    include: { tests: true }
  });

  await prisma.auditLog.create({
    data: {
      projectId: project.id,
      buildId: build.id,
      action: 'BUILD_COMPILE',
      detail: compileResult.summary
    }
  });

  return NextResponse.json(build, { status: 201 });
}
