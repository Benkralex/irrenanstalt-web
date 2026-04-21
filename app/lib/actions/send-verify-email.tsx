"use server";

import { sendEmailInternal } from "../send-mail";
import { createEmailVerification } from '../database/email-verify';
import { auth } from '@/auth';

export type VerifyEmailState = {
  errorMessage: string;
  resultMessage: string;
};

export async function sendVerifyEmail(
  prevState: VerifyEmailState,
  formData: FormData
): Promise<VerifyEmailState> {
  const session = await auth();
  const sessionEmail = session?.user?.email;

  if (!sessionEmail) {
    console.warn("Skipping invite email: no recipient provided");
    return { ...prevState, errorMessage: 'Session not active' };
  }

  const emailVerification = await createEmailVerification(sessionEmail);

  const verificationLink = `${process.env.BASE_URL}/verify-email/${emailVerification.code}`;

  try {
    await sendEmailInternal({
      to: sessionEmail,
      subject: "E-Mail-Verifizierung Irrenanstalt",
      message: `\
        Bitte bestätigen Sie Ihre E-Mail-Adresse, indem Sie auf den folgenden Link klicken: <a href="${verificationLink}">${verificationLink}</a><br>\
        Wenn Sie kein Konto erstellt haben, öffnen Sie den Link <b>nicht</b> und melden Sie sich bei <a href="mailto:${process.env.SUPPORT_MAIL_ADDRESS}">${process.env.SUPPORT_MAIL_ADDRESS}</a><br>\
        <br>\
        Bei Problemen, melden Sie sich bei <a href="mailto:${process.env.SUPPORT_MAIL_ADDRESS}">${process.env.SUPPORT_MAIL_ADDRESS}</a><br>\
        <br>\
        Viel Spaß auf der Plattform,<br>\
        Ihr Irrenanstalt-Plattform-Team<br>`,
    });
  } catch (error) {
    console.error("Error sending verification email:", error);
    return { ...prevState, errorMessage: 'Fehler beim Senden' };
  }

  return { 
    ...prevState, 
    errorMessage: '', 
    resultMessage: 'Verifikations-E-Mail erfolgreich gesendet'
  };
}
