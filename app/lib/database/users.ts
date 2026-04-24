import bcrypt from 'bcrypt';
import { PrismaClient } from "@/app/generated/prisma/client";
import { User } from "./definitions";
import { generate } from 'otplib';
import { generateTwoFactorSecret } from '../2fa';
const prisma = new PrismaClient();

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export function parseTags(tags: string): string[] {
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

export async function updateEmail(userId: string, newEmail: string): Promise<User> {
  return await prisma.users.update({
    where: { id: userId },
    data: { email: newEmail },
  });
}

export async function updateUsername(userId: string, newUsername: string): Promise<User> {
  return await prisma.users.update({
    where: { id: userId },
    data: { username: newUsername },
  });
}

export async function updateFullname(userId: string, newFullname: string): Promise<User> {
  return await prisma.users.update({
    where: { id: userId },
    data: { fullname: newFullname },
  });
}

export async function updatePassword(userId: string, unhashedNewPassword: string): Promise<User> {
  const hashedPassword = await hashPassword(unhashedNewPassword);
  return await prisma.users.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });
}

export async function get2FASecret(userId: string): Promise<string> {
  var user = await prisma.users.findUnique({
    where: { id: userId },
  });
  if (!user?.secondFactorSecret) {
    const secret = generateTwoFactorSecret();
    await prisma.users.update({
      where: { id: userId },
      data: { secondFactorSecret: secret },
    });
    user = await prisma.users.findUnique({
      where: { id: userId },
    });
  }
  return user?.secondFactorSecret!;
}