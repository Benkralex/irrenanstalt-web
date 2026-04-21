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
  return await prisma.invites.findUnique({
    where: { id },
  });
}

export async function deleteInviteById(id: string) {
  await prisma.invites.delete({
    where: { id },
  });
}