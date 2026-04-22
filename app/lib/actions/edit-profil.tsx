"use server";
import { z } from "zod";
import { checkPasswordRequirements, getPasswordRequirementsMessage } from "../check-password-requirements";
import { auth } from "@/auth";
import { checkEmail, checkUsername, parseTags, updateEmail, updateFullname, updatePassword, updateUsername } from "../database/users";

export type EditProfilState = {
    errorMessage: string;
    resultMessage: string;
    email: string | undefined;
    username: string | undefined;
    fullname: string | undefined;
};

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
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
});

export async function editProfile(
    prevState: EditProfilState,
    formData: FormData
): Promise<EditProfilState> {
    const session = await auth();
    prevState.errorMessage = "";
    prevState.resultMessage = "";
    
    if (session?.user?.username === "Admin") {
        return {
            ...prevState,
            errorMessage: "Bearbeite das Haupt-Admin-Profil über die .env Datei<br>",
            resultMessage: "",
        };
    }

    try {
        const validatedFields = FormSchema.safeParse({
            email: formData.get('email'),
            fullname: formData.get('fullname'),
            username: formData.get('username'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
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

        if (validatedFields.data.password) {
            if (!checkPasswordRequirements(validatedFields.data.password)) {
                return {
                    ...prevState,
                    errorMessage: getPasswordRequirementsMessage(),
                    resultMessage: "",
                };
            }
        }

        if (validatedFields.data.password && validatedFields.data.password !== validatedFields.data.confirmPassword) {
            return {
                ...prevState,
                errorMessage: "Passwörter stimmen nicht überein<br>",
                resultMessage: "",
            };
        }

        if (!session?.user) {
            return {
                ...prevState,
                errorMessage: "Benutzer nicht authentifiziert<br>",
                resultMessage: "",
            };
        }

        //
        //   Check if username or email has changed and if the new values are available
        //
        if (session?.user.username != validatedFields.data.username) {
            const usernameAvailable = await checkUsername(validatedFields.data.username);
            if (!usernameAvailable) {
                return {
                    ...prevState,
                    errorMessage: "Dieser Benutzername ist bereits vergeben<br>",
                    resultMessage: "",
                };
            }
        }
        if (session?.user.email != validatedFields.data.email) {
            const emailAvailable = await checkEmail(validatedFields.data.email);
            if (!emailAvailable) {
                return {
                    ...prevState,
                    errorMessage: "Diese E-Mail-Adresse ist bereits vergeben<br>",
                    resultMessage: "",
                };
            }
        }

        //
        //   Update only the fields that have changed
        //
        if (session?.user.email != validatedFields.data.email) {
            await updateEmail(session.user.id, validatedFields.data.email);
        }
        if (session?.user.fullname != validatedFields.data.fullname) {
            await updateFullname(session.user.id, validatedFields.data.fullname);
        }
        if (session?.user.username != validatedFields.data.username) {
            await updateUsername(session.user.id, validatedFields.data.username);
        }
        if (validatedFields.data.password) {
            await updatePassword(session.user.id, validatedFields.data.password);
        }

        return {
            ...prevState,
            email: validatedFields.data.email,
            fullname: validatedFields.data.fullname,
            username: validatedFields.data.username,
            errorMessage: "",
            resultMessage: "Profil erfolgreich aktualisiert<br>",
        };
    } catch (error) {
        console.error("Fehler beim Aktualisieren des Profils:", error);
        return {
            ...prevState,
            errorMessage: "Ein Fehler ist aufgetreten. Bitte versuche es erneut.<br>",
            resultMessage: "",
        };
    }
}