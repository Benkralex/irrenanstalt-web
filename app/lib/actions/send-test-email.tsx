"use server";

import { z } from 'zod';
import { sendEmailInternal } from "../send-mail";

export type TestEmailState = {
  errorMessage: string;
  email: string;
  resultMessage: string;
};

const FormSchema = z.object({
  email: z.email( { message: "Ungültige E-Mail-Adresse" } ),
});

export async function sendTestEmail(
  prevState: TestEmailState,
  formData: FormData
): Promise<TestEmailState> {
  const validatedFields = FormSchema.safeParse({
    email: formData.get('recipient'),
  });

  if (!validatedFields.success) {
    const errorMessages = validatedFields.error.issues.map(err => err.message).join('<br/>');
    return { ...prevState, email: formData.get('recipient') as string, errorMessage: errorMessages };
  }

  const recipient = formData.get('recipient') as string;

  if (!recipient) {
    console.warn("Skipping test email: no recipient provided");
    return { ...prevState, email: formData.get('recipient') as string, errorMessage: 'Kein Empfänger angegeben' };
  }

  try {
    await sendEmailInternal({
      to: recipient,
      subject: "Test-E-Mail",
      message: "Dies ist eine Test-E-Mail, um die E-Mail-Konfiguration zu überprüfen.",
    });
  } catch (error) {
    console.error("Error sending test email:", error);
    return { ...prevState, email: formData.get('recipient') as string, errorMessage: 'Fehler beim Senden<br/>Überprüfen Sie die E-Mail-Konfiguration' };
  }

  return { 
    ...prevState, 
    email: formData.get('recipient') as string, 
    errorMessage: '', 
    resultMessage: 'Test-E-Mail erfolgreich gesendet'
  };
}