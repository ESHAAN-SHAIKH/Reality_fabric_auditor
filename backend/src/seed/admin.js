import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";

async function seed() {
  const email = "muqsit@realityfabric.ai";
  const password = "Muqsit@123";

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log("Admin already exists");
    return;
  }

  const hash = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: {
      email,
      password: hash,
      role: "ADMIN",
    },
  });

  console.log("Admin user created");
}

seed().finally(() => process.exit());
