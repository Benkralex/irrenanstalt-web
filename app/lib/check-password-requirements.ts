import { env } from "process";

export function checkPasswordRequirements(password: string): boolean {
    const passwordPattern = new RegExp(env.PASSWORT_REQUIREMENTS_REGEX || "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\.@$!%*?&]).{8,}$");
    return passwordPattern.test(password);
}

export function getPasswordRequirementsRegex(): RegExp {
    return new RegExp(env.PASSWORT_REQUIREMENTS_REGEX || "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\.@$!%*?&]).{8,}$");
}

export function getPasswordRequirementsMessage(): string {
    return env.PASSWORT_REQUIREMENTS_MESSAGE || "Das Passwort muss<ul class='list-disc ml-5'><li>mindestens 8 Zeichen lang sein</li><li>einen Kleinbuchstaben enthalten</li><li>einen Großbuchstaben enthalten</li><li>eine Zahl enthalten</li><li>ein Sonderzeichen enthalten</li></ul>";
}