'use server';

import { z } from 'zod';
import { auth, signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { deleteInviteById, getInviteById } from '../database/invites';
import { addUser, checkEmail, checkUsername, get2FASecret, hashPassword } from '../database/users';
import { getPasswordRequirementsMessage, getPasswordRequirementsRegex } from '../check-password-requirements';
import { verifyToken } from '../2fa';

type AuthenticateState = {
  errorMessage: string;
  email: string;
};

export async function authenticate(
  prevState: AuthenticateState | undefined,
  formData: FormData,
) {
  const FormSchema = z.object({
    email: z.email({ message: "Ungültige E-Mail-Adresse" }),
    password: z.string({ message: "Passwort ist erforderlich" }).min(1, { message: "Passwort ist leer" }),
  });

  try {
    const validatedFields = FormSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    if (!validatedFields.success) {
      const errorMessages = validatedFields.error.issues.map(err => err.message).join('<br/>');
      return { ...prevState, email: formData.get('email') as string, errorMessage: errorMessages };
    }
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { ...prevState, email: formData.get('email') as string, errorMessage: 'Falsche Anmeldedaten' };
        default:
          return { ...prevState, email: formData.get('email') as string, errorMessage: 'Etwas ist fehlgeschlagen' };
      }
    }
    throw error;
  }
}

type RegisterState = {
  errorMessage: string;
  email: string;
  fullname: string;
  username: string;
};

export async function register(
  prevState: RegisterState | undefined,
  formData: FormData,
) {
  const FormSchema = z.object({
    email: z.email({ message: "Ungültige E-Mail-Adresse<br>" }),
    fullname: z.string()
      .regex(/^(.*?\S.*){6,}$/, { 
        message: "Name muss min 6 Zeichen lang sein<br>" 
      }),
    username: z.string()
      .regex(/^.*?\S.*$/, { 
        message: "Benutzername darf nicht leer sein<br>" 
      }),
    password: z.string().regex(
      getPasswordRequirementsRegex(), 
      { 
        message: getPasswordRequirementsMessage()
      },
    ),
    confirmPassword: z.string(),
    id: z.uuid({ message: "Ungültige Einladung<br>" }),
    redirectTo: z.string().optional(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwörter stimmen nicht überein<br>",
  });

  try {
    const validatedFields = FormSchema.safeParse({
      email: formData.get('email'),
      fullname: formData.get('fullname'),
      username: formData.get('username'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
      id: formData.get('id'),
      redirectTo: formData.get('redirectTo'),
    });

    if (!validatedFields.success) {
      const errorMessages = validatedFields.error.issues.map(err => err.message).join('<br/>');
      return { 
        ...prevState, 
        email: formData.get('email') as string, 
        fullname: formData.get('fullname') as string,
        username: formData.get('username') as string,
        errorMessage: errorMessages 
      };
    }

    const {email, fullname, username} = validatedFields.data || {};
    const redirectTo = validatedFields.data.redirectTo || '/';

    const invite = await getInviteById(validatedFields.data.id);
    if (!invite) {
      return { 
        ...prevState,
        email: email as string,
        fullname: fullname as string,
        username: username as string,
        errorMessage: 'Ungültige Einladung'
      };
    }
    if (invite.email !== email) {
      return { 
        ...prevState,
        email: email as string,
        fullname: fullname as string,
        username: username as string,
        errorMessage: 'E-Mail-Adresse stimmt nicht mit Einladung überein'
      };
    }
    if (!await checkUsername(username)) {
      return { 
        ...prevState,
        email: email as string,
        fullname: fullname as string,
        username: username as string,
        errorMessage: 'Benutzername bereits vergeben'
      };
    }
    if (!await checkEmail(email)) {
      return { 
        ...prevState,
        email: email as string,
        fullname: fullname as string,
        username: username as string,
        errorMessage: 'E-Mail-Adresse bereits vergeben'
      };
    }

    await addUser({
      email: email as string,
      username: username as string,
      fullname: fullname as string,
      password: await hashPassword(validatedFields.data.password),
    });
    await deleteInviteById(validatedFields.data.id);
    await signIn('credentials', {
      email: email,
      password: validatedFields.data.password,
      redirectTo,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { 
            ...prevState,
            email: formData.get('email') as string,
            fullname: formData.get('fullname') as string,
            username: formData.get('username') as string,
            errorMessage: 'Falsche Anmeldedaten' 
          };
        default:
          return {
             ...prevState,
             email: formData.get('email') as string,
            fullname: formData.get('fullname') as string,
            username: formData.get('username') as string,
            errorMessage: 'Etwas ist fehlgeschlagen' 
          };
      }
    }
    throw error;
  }
}


export async function check2FA(
  prevState: { message: string } | undefined,
  formData: FormData,
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return { ...prevState, message: 'Benutzer nicht authentifiziert' };
  }
  const secret = await get2FASecret(userId);
  const token = formData.get('otp') as string;
  if (!/^\d{6}$/.test(token)) {
    return { ...prevState, message: 'OTP-Code muss aus 6 Ziffern bestehen' };
  }
  const result = await verifyToken(token, secret);
  return { ...prevState, message: result ? 'OTP is valid!' : 'OTP is invalid!' };
}