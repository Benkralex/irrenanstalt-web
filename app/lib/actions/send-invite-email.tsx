"use server";

import { z } from 'zod';
import { sendEmailInternal } from "../send-mail";
import { addInvite } from '../database/invites';

export type InviteEmailState = {
  errorMessage: string;
  email: string;
  resultMessage: string;
};

const FormSchema = z.object({
  email: z.email( { message: "Ungültige E-Mail-Adresse" } ),
});

export async function sendInviteEmail(
  prevState: InviteEmailState,
  formData: FormData
): Promise<InviteEmailState> {
  const validatedFields = FormSchema.safeParse({
    email: formData.get('recipient'),
  });

  if (!validatedFields.success) {
    const errorMessages = validatedFields.error.issues.map(err => err.message).join('<br/>');
    return { ...prevState, email: formData.get('recipient') as string, errorMessage: errorMessages };
  }

  const recipient = formData.get('recipient') as string;

  if (!recipient) {
    console.warn("Skipping invite email: no recipient provided");
    return { ...prevState, email: formData.get('recipient') as string, errorMessage: 'Kein Empfänger angegeben' };
  }

  //Create invite in database here and generate invite link
  const invite = await addInvite(recipient);
  if (!invite) {
    console.error("Failed to create invite for email:", recipient);
    return { ...prevState, email: formData.get('recipient') as string, errorMessage: 'Fehler beim Erstellen der Einladung' };
  }
  const inviteId = invite.id;

  const inviteLink = `${process.env.BASE_URL}register/${inviteId}`;

  try {
    await sendEmailInternal({
      to: recipient,
      subject: "Einladung zur Irrenanstalt",
      message: `\
        Sie sind herzlich eingeladen, sich auf der Irrenanstalt-Plattform zu registrieren.<br>\
        Benutzen Sie dazu den folgenden Link: <a href="${inviteLink}">${inviteLink}</a><br>\
        <br>\
        Wenn Sie bereits ein Konto haben oder Sie diese Einladung nicht angefordert haben, können Sie diese E-Mail ignorieren.<br>\
        <br>\
        Bei Problemen, melden Sie sich bei <a href="mailto:${process.env.SUPPORT_MAIL_ADDRESS}">${process.env.SUPPORT_MAIL_ADDRESS}</a><br>\
        <br>\
        Viel Spaß auf der Plattform,<br>\
        Ihr Irrenanstalt-Plattform-Team<br>`,
    });
  } catch (error) {
    console.error("Error sending invite email:", error);
    return { ...prevState, email: formData.get('recipient') as string, errorMessage: 'Fehler beim Senden' };
  }

  return { 
    ...prevState, 
    email: formData.get('recipient') as string, 
    errorMessage: '', 
    resultMessage: 'Einladung erfolgreich gesendet'
  };
}
