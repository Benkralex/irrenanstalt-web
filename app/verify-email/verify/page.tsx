import type { Metadata } from "next";
import { BG_COLOR_SURFACE, TEXT_COLOR_ON_SURFACE } from "@/app/ui/constants";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { EmailVerificationPoller, SendVerifyEmailForm } from "@/app/ui/auth/verify-email";
import { isEmailVerified } from "@/app/lib/database/email-verify";

export const metadata: Metadata = {
  title: "Email verifizieren",
};

export default async function VerifyEmail() {
    const session = await auth();
    const email = session?.user.email;
    if (!email) {
        redirect("/login");
    }
    const checkEmailVerified = session?.user.emailVerified ? true : await isEmailVerified(email);
    if (checkEmailVerified) {
        redirect("/verify-email/successful");
    }

    return (
        <main className={`
            min-h-screen px-4 py-8
            flex flex-col justify-center items-center gap-4
            ${BG_COLOR_SURFACE} ${TEXT_COLOR_ON_SURFACE}
        `}>
            <EmailVerificationPoller />
            <h1 className="text-3xl font-bold mb-8">Email verifizieren</h1>
            <p>{email}</p>
            <SendVerifyEmailForm />
        </main>
    );
}