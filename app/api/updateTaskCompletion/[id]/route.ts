import prisma from "../../../../lib/prisma";

export async function PUT(req: Request, { params: { id } }: { params: { id: string } }) {
  const body = await req.json();

  try {
    const taskId = Number(id);
    const task = await prisma.task.update({
      where: { id: taskId },
      data: { completion_status: body.completion_status },
    });

    return new Response(JSON.stringify(task))
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      headers: {
        'Content-Type': 'application/json'
      },
      status: 500
    });
  }
}

