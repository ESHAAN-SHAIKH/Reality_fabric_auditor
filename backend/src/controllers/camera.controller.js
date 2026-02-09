import { prisma } from "../server.js";

export async function createStream(req, res) {
  const { label } = req.body;

  const stream = await prisma.cameraStream.create({
    data: {
      userId: req.user.id,
      label
    }
  });

  res.status(201).json(stream);
}

