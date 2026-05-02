import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { BG_COLOR_SURFACE, TEXT_COLOR_ON_SURFACE } from "@/app/ui/constants";
import { auth } from "@/auth";
import { isEmailVerified } from "@/app/lib/database/email-verify";
import OTPForm from "@/app/ui/auth/otp-form";

export const metadata: Metadata = {
  title: "OTP Verification",
};

type OTPPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>> | Record<string, string | string[] | undefined>;
};

export default async function OTPPage({ searchParams }: OTPPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const session = await auth();
  if (!session?.user?.email) {
    redirect('/login');
  }

  const callbackValue = resolvedSearchParams.callbackURL ?? resolvedSearchParams.callbackUrl;
  const callbackURL = Array.isArray(callbackValue) ? callbackValue[0] : callbackValue;
  const safeCallbackURL = callbackURL?.startsWith('/') ? callbackURL : '/';
  const checkEmailVerified = session.user.emailVerified ? true : await isEmailVerified(session.user.email);
  if (!checkEmailVerified) {
    redirect("/verify-email/verify");
  }
  if (session.otpLoggedIn) {
    redirect(safeCallbackURL || "/");
  }

  return (
    <main className={`
      min-h-screen px-4 py-8
      flex flex-col justify-center items-center gap-4
      ${BG_COLOR_SURFACE} ${TEXT_COLOR_ON_SURFACE}
    `}>
      <h1 className="text-3xl font-bold mb-8">OTP Code</h1>
      <OTPForm callbackUrl={safeCallbackURL || '/'} />
    </main>
  );
}