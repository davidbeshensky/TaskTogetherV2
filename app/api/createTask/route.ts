import prisma from "../../../lib/prisma"

export async function POST( req: Request, res: Response) {
  try {
  const body = await req.json()
  const task = await prisma.task.create({
    data: {
      title: body.title,
    }
  })
  return new Response(JSON.stringify(task))
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