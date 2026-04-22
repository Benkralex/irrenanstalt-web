import type { Metadata } from "next";
import { Suspense } from "react";
import LoginForm from "@/app/ui/login-form";
import { redirect } from "next/navigation";
import { BG_COLOR_SURFACE, TEXT_COLOR_ON_SURFACE } from "@/app/ui/constants";
import { auth } from "@/auth";
import { isEmailVerified } from "../lib/database/email-verify";

export const metadata: Metadata = {
  title: "Login",
};

type LoginPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>> | Record<string, string | string[] | undefined>;
};

export default async function Login({ searchParams }: LoginPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const session = await auth();
  if (session?.user.email) {
    const checkEmailVerified = session?.user.emailVerified ? true : await isEmailVerified(session?.user.email);
    if (checkEmailVerified) {
      const callbackValue = resolvedSearchParams.callbackURL ?? resolvedSearchParams.callbackUrl;
      const callbackURL = Array.isArray(callbackValue) ? callbackValue[0] : callbackValue;
      redirect(callbackURL || "/");
    } else {
      redirect("/verify-email/verify");
    }
  }

  return (
    <main className={`
      min-h-screen px-4 py-8
      flex flex-col justify-center items-center gap-4
      ${BG_COLOR_SURFACE} ${TEXT_COLOR_ON_SURFACE}
    `}>
      <h1 className="text-3xl font-bold mb-8">Login</h1>
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </main>
  );
}