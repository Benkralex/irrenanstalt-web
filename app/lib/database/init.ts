import bcrypt from 'bcrypt';
import { PrismaClient } from "@/app/generated/prisma/client";
const prisma = new PrismaClient();

export async function updateAdminPassword() {
    if (!process.env.ADMIN_PASSWORD) {
        throw new Error("ADMIN_PASSWORD environment variable is not set");
    }
    const adminUser = await prisma.users.findUnique({
        where: { username: "Admin" },
    });

    if (!adminUser) {
        console.log("Admin user not found, skipping password update");
        return;
    }

    const passwordsMatch = await bcrypt.compare(process.env.ADMIN_PASSWORD, adminUser.password);
    if (passwordsMatch) {
        return;
    }

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    await prisma.users.update({
        where: { username: "Admin" },
        data: { password: hashedPassword },
    });
}

export async function updateAdminEmail() {
    if (!process.env.ADMIN_EMAIL) {
        throw new Error("ADMIN_EMAIL environment variable is not set");
    }
    const adminUser = await prisma.users.findUnique({
        where: { username: "Admin" },
    });

    if (!adminUser) {
        console.log("Admin user not found, skipping email update");
        return;
    }

    if (process.env.ADMIN_EMAIL === adminUser.email) {
        return;
    }

    await prisma.users.update({
        where: { username: "Admin" },
        data: { email: process.env.ADMIN_EMAIL },
    });
}

export async function createAdminUser() {
  const adminUser = await prisma.users.findUnique({
    where: { username: "Admin" },
  });

  if (!process.env.ADMIN_PASSWORD) {
    throw new Error("ADMIN_PASSWORD environment variable is not set");
  }
  if (!process.env.ADMIN_EMAIL) {
    throw new Error("ADMIN_EMAIL environment variable is not set");
  }

  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

  if (!adminUser) {
    await prisma.users.create({
      data: {
        username: "Admin",
        fullname: process.env.ADMIN_FULLNAME || "Administrator",
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        tags: "admin",
      }
    });
  }
}

export async function initializeDatabase() {
    await createAdminUser();
    await updateAdminPassword();
    await updateAdminEmail();
}