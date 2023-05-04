import prisma from "../../../../lib/prisma";
import { NextResponse, NextRequest } from 'next/server';


export default async function PUT(req: NextRequest, res: NextRequest) {
  try {
    const taskId = Number(req.query.id);

    const task = await prisma.task.update({
      where: { id: taskId },
      data: { completion_status: req.body.completion_status },
    });

    return res.status(200).json(task);
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      headers: {
        'Content-Type': 'application/json'
      },
      status: 500
    });
  }
}