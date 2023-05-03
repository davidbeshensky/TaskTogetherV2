import prisma from "../../../lib/prisma"
import { NextResponse } from 'next/server';

export async function GET() {
  const tasks = await prisma.task.findMany();
  const tasksJSON = NextResponse.json(tasks);
  return tasksJSON;
}

