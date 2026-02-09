import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createScan = async (req, res) => {
  try {
    const scan = await prisma.scan.create({
      data: {
        organizationId: req.user.organizationId,
        confidence: Math.random() * 100,
        status: 'SCANNING'
      }
    });
    res.json(scan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getScans = async (req, res) => {
  const scans = await prisma.scan.findMany({
    where: { organizationId: req.user.organizationId }
  });
  res.json(scans);
};
