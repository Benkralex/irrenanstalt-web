"use server";

import { redirect } from "next/navigation";
import { deleteEmailVerificationById, getEmailVerificationByCode, setEmailVerified } from "../database/email-verify";
import { getUserByEmail } from "../database/users";

export async function verifyEmail(formData: FormData) {
    const code = formData.get("code");
    console.log("Verifizierungs-Code:", code);
    if (typeof code !== "string") {
        redirect("/verify-email/failed");
    }
    const emailVerification = await getEmailVerificationByCode(code);
    if (!emailVerification) {
        redirect("/verify-email/failed");
    }
    const user = await getUserByEmail(emailVerification.email);
    if (!user) {
        redirect("/verify-email/failed");
    }
    const success = (await setEmailVerified(emailVerification.email))?.emailVerified;
    if (success) {
        await deleteEmailVerificationById(emailVerification.id);
        redirect("/verify-email/successful");
    }
}