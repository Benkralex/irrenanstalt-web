import { PrismaClient } from "@/app/generated/prisma/client";
import crypto from 'crypto';
import { EmailVerification, User } from './definitions';
const prisma = new PrismaClient();

export async function createEmailVerification(email: string): Promise<EmailVerification> {
  await prisma.emailVerification.deleteMany({
    where: { email },
  });
  if (await isEmailVerified(email)) {
    throw new Error("E-Mail ist bereits verifiziert.");
  }
  return await prisma.emailVerification.create({
    data: {
      email: email,
      code: crypto.randomBytes(32).toString('hex'),
    },
  });
}

export async function getEmailVerificationByCode(code: string): Promise<EmailVerification | null> {
  return await prisma.emailVerification.findUnique({
    where: { code },
  });
}

export async function deleteEmailVerificationById(id: string) {
  await prisma.emailVerification.delete({
    where: { id },
  });
}

export async function setEmailVerified(email: string): Promise<User | null> {
  return await prisma.users.update({
    where: { email },
    data: { emailVerified: true },
  });
}

export async function isEmailVerified(email: string): Promise<boolean> {
  const user = await prisma.users.findUnique({
    where: { email },
    select: { emailVerified: true },
  });
  return user?.emailVerified || false;
}