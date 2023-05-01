import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    await prisma.task.update({
      where: {
        id: parseInt(req.body.id),
      },
      data: {
        completed: req.body.completed,
      },
    });
    res.status(200).json({ message: "Updated" });
  } else {
    // 404
    res.status(404).json({ message: "Not found" });
  }
}