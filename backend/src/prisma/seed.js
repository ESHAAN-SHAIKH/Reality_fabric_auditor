import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  const email = "muqsit@realityfabric.ai";
  const plainPassword = "Muqsit@123";

  // Hash password properly
  const hashedPassword = await bcrypt.hash(plainPassword, 12);

  // Avoid duplicate users
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log("⚠️ User already exists, skipping seed");
    return;
  }

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("✅ Admin user created:");
  console.log(`📧 Email: ${email}`);
  console.log(`🔑 Password: ${plainPassword}`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
