import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { updatedAt: 'desc' }
  });
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const body = await request.json();
  const name = String(body.name || '').trim();
  const template = String(body.template || 'Basic');

  if (!name) {
    return NextResponse.json({ error: 'Project name is required.' }, { status: 400 });
  }

  const project = await prisma.project.create({
    data: {
      name,
      template
    }
  });

  return NextResponse.json(project, { status: 201 });
}
