"use server";
import { auth, unstable_update } from "@/auth";
import { getExistingOTPSecret, getOrCreateOTPSecret } from "../database/users";
import { verifyOPTToken } from "../otp";
import { redirect } from "next/navigation";

export async function createOtp(formData: FormData) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return;
  }
  const secret = await getOrCreateOTPSecret(userId);
  return;
}

export async function checkOTP(
  prevState: { message: string } | undefined,
  formData: FormData,
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return { ...prevState, message: 'Benutzer nicht authentifiziert' };
  }
  const secret = await getExistingOTPSecret(userId);
  if (!secret) {
    return { ...prevState, message: 'Für diesen Benutzer ist kein OTP aktiviert' };
  }
  const token = formData.get('otp') as string;
  const rawCallbackUrl = (formData.get('callbackUrl') as string) || '/';
  const callbackUrl = rawCallbackUrl.startsWith('/') ? rawCallbackUrl : '/';
  if (!/^\d{6}$/.test(token)) {
    return { ...prevState, message: 'OTP-Code muss aus 6 Ziffern bestehen' };
  }
  const result = await verifyOPTToken(token, secret);
  if (!result) {
    return { ...prevState, message: 'OTP is invalid!' };
  }

  await unstable_update({
    user: {
      otpRequired: true,
      otpLoggedIn: true,
    },
  });

  redirect(callbackUrl);
}