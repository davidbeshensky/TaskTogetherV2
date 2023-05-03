import prisma from "../../../lib/prisma"

export async function POST(request: Request) {
  const { completion_status: boolean, title: string } = await request.json();
  const newTask = await prisma.task.create({
    data: {
        completion_status: boolean,
        title: string,
    },
  })
  return {
    status: 200,
    body: newTask,
  }
}
