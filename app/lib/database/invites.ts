import { PrismaClient } from "@/app/generated/prisma/client";
import { Invite } from './definitions';
const prisma = new PrismaClient();

export async function addInvite(email: string): Promise<Invite> {
  return await prisma.invites.create({
    data: {
      email
    },
  });
}

export async function getInviteById(id: string): Promise<Invite | null> {
  if (id.length !== 32 && id.length !== 36) {
    console.warn(`Invalid invite ID format: ${id}`);
    return null;
  }
  try {
    return await prisma.invites.findUniqueOrThrow({
      where: { id },
    });
  } catch (error) {
    console.error("Error fetching invite by ID:", error);
    return null;
  }
}

export async function deleteInviteById(id: string) {
  await prisma.invites.delete({
    where: { id },
  });
}