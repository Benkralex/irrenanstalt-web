import type { Metadata } from "next";
import { BG_COLOR_SURFACE, TEXT_COLOR_ON_SURFACE } from "@/app/ui/constants";
import RegisterForm from "@/app/ui/register-form";
import { auth } from "@/auth";
import { isEmailVerified } from "@/app/lib/database/email-verify";
import { redirect } from "next/navigation";
import { getInviteById } from "@/app/lib/database/invites";
import { getPasswordRequirementsMessage, getPasswordRequirementsRegex } from "@/app/lib/check-password-requirements";

export const metadata: Metadata = {
  title: "Registrieren",
};

export default async function Register(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const session = await auth();
  const passwordPattern = getPasswordRequirementsRegex().source;
  const passwordTitle = getPasswordRequirementsMessage();
  if (session?.user.email) {
    const checkEmailVerified = session?.user.emailVerified ? true : await isEmailVerified(session?.user.email);
    if (checkEmailVerified) {
      redirect("/");
    } else {
      redirect("/verify-email/verify");
    }
  }
  const invite = await getInviteById(id);
  if (!invite) {
    redirect("/register/failed");
  }

  return (
    <main className={`
      min-h-screen px-4 py-8
      flex flex-col justify-center items-center gap-4
      ${BG_COLOR_SURFACE} ${TEXT_COLOR_ON_SURFACE}
    `}>
      <h1 className="text-3xl font-bold mb-8">Registrieren</h1>
      <p>Registrieren mit ID: {id}</p>
      <RegisterForm idParam={id} passwordPattern={passwordPattern} passwordTitle={passwordTitle} />
    </main>
  );
}