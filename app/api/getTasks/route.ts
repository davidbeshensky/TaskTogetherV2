import prisma from "../../../lib/prisma";
import dayjs from 'dayjs';

export async function GET(_: any, res: Response) {
  try {
    
    const today = dayjs();
    const startOfDay = today.startOf('day').toDate();
    const endOfDay = today.endOf('day').toDate();
    const tasks = await prisma.task.findMany({
      where: {
        createdAt: {
          gte: startOfDay,
          lte: endOfDay
        }
      }
    });
    return new Response(JSON.stringify(tasks), {
      
      headers: {
        'Content-Type': 'application/json'
      }
    });
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