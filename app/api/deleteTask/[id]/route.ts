import prisma from "../../../../lib/prisma";

export async function DELETE(req: Request, { params: { id } }: { params: { id: string } }) {
    // const body = await req.json();
    // console.log(body);

    try {
        const taskId = Number(id);
        const result = await prisma.task.delete({
            where: { id: taskId },
        });

        console.log("Deleted task:", result);
        return new Response(JSON.stringify({ message: "Task deleted successfully"}));
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
            headers: {
              'Content-Type': 'application/json'
            },
            status: 500
        });
    }
}