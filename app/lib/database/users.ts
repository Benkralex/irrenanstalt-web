import bcrypt from 'bcrypt';
import { PrismaClient } from "@/app/generated/prisma/client";
import { User } from "./definitions";
const prisma = new PrismaClient();

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function parseTags(tags: string): Promise<string[]> {
  const tagArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
  return tagArray;
}

export async function stringifyTags(tags: string[]): Promise<string> {
  return tags.join(', ');
}

export async function addUser(user: {
  username: string;
  fullname: string;
  email: string;
  password: string;
}): Promise<User> {
  return await prisma.users.create({
    data: user,
  })
}

export async function checkEmail(email: string): Promise<boolean> {
  const user = await prisma.users.findUnique({
    where: { email: email },
  });
  return !user;
}

export async function checkUsername(username: string): Promise<boolean> {
  const user = await prisma.users.findUnique({
    where: { username: username },
  });
  return !user;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return await prisma.users.findUnique({
    where: { email: email },
  });
}

export async function getUserByUsername(username: string): Promise<User | null> {
  return await prisma.users.findUnique({
    where: { username: username },
  });
}

export async function getUserById(id: string): Promise<User | null> {
  return await prisma.users.findUnique({
    where: { id: id },
  });
}