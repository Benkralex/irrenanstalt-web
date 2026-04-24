"use client";
import { useActionState, useState } from "react";
import { BG_COLOR_PRIMARY, BG_COLOR_ERROR, BORDER_COLOR_SURFACE_VARIANT, PLACEHOLDER_COLOR_SURFACE_VARIANT, TEXT_COLOR_ON_PRIMARY, TEXT_COLOR_ON_ERROR, PRIMARY_BUTTON, PRIMARY_CONTAINER_BUTTON } from "./constants";
import { editProfile } from "../lib/actions/edit-profil";

type ShowAndEditProfileProps = {
    username: string;
    fullname: string;
    email: string;
    passwordPattern: string;
    passwordTitle: string;
    editingPermitted: boolean;
};

export default function ShowAndEditProfile({
    username: defaultUsername,
    fullname: defaultFullname,
    email: defaultEmail,
    passwordPattern,
    passwordTitle,
    editingPermitted,
}: ShowAndEditProfileProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [state, formAction, isPending] = useActionState(
        editProfile,
        {
            username: defaultUsername,
            fullname: defaultFullname,
            email: defaultEmail,
            errorMessage: "",
            resultMessage: "",
        },
    );
    const {email, fullname, username, errorMessage, resultMessage} = state || {};
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const cancelEditing = () => {
        setIsEditing(false);
        setPassword("");
        setConfirmPassword("");
        setPasswordError("");
        state.email = defaultEmail;
        state.fullname = defaultFullname;
        state.username = defaultUsername;
        state.errorMessage = "";
        state.resultMessage = "";
    }

    return (
        <form action={formAction} className={`flex flex-col justify-start items-center w-full max-w-md`}>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="username">Benutzername</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    defaultValue={username}
                    className={`peer block rounded-md border ${BORDER_COLOR_SURFACE_VARIANT} p-[9px] text-sm ${PLACEHOLDER_COLOR_SURFACE_VARIANT}`}
                    readOnly={!isEditing}
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="fullname">Vollständiger Name</label>
                <input
                    id="fullname"
                    name="fullname"
                    type="text"
                    defaultValue={fullname}
                    className={`peer block rounded-md border ${BORDER_COLOR_SURFACE_VARIANT} p-[9px] text-sm ${PLACEHOLDER_COLOR_SURFACE_VARIANT}`}
                    readOnly={!isEditing}
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={email}
                    className={`peer block rounded-md border ${BORDER_COLOR_SURFACE_VARIANT} p-[9px] text-sm ${PLACEHOLDER_COLOR_SURFACE_VARIANT}`}
                    readOnly={!isEditing}
                />
            </div>

            {isEditing && (
                <div>
                    <div className="mt-4">
                        <input
                            className={`peer block rounded-md border ${BORDER_COLOR_SURFACE_VARIANT} p-[9px] text-sm ${PLACEHOLDER_COLOR_SURFACE_VARIANT}`}
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Passwort"
                            pattern={passwordPattern}
                            title={passwordTitle}
                            value={password}
                            onChange={(e) => {
                            setPassword(e.target.value);
                            if (confirmPassword && e.target.value !== confirmPassword) {
                                setPasswordError("Passwörter stimmen nicht überein");
                            } else {
                                setPasswordError("");
                            }
                            }}
                        />
                    </div>
                    <div className="mt-4">
                        <input
                            className={`peer block rounded-md border ${BORDER_COLOR_SURFACE_VARIANT} p-[9px] text-sm ${PLACEHOLDER_COLOR_SURFACE_VARIANT}`}
                            id="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            placeholder="Passwort bestätigen"
                            value={confirmPassword}
                            onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            if (e.target.value !== password) {
                                setPasswordError("Passwörter stimmen nicht überein");
                            } else {
                                setPasswordError("");
                            }
                            }}
                        />
                        {passwordError && <p className="text-xs text-red-500 mt-1">{passwordError}</p>}
                    </div>
                </div>
            )}
            <div
                className="flex justify-center items-center mt-4"
                aria-live="polite"
                aria-atomic="true"
            >
                {errorMessage && (
                    <p className="text-xs text-red-500 break-words" dangerouslySetInnerHTML={{ __html: errorMessage }} />
                )}
                {resultMessage && (
                    <p className={`text-xs text-green-500 break-words`} dangerouslySetInnerHTML={{ __html: resultMessage }} />
                )}
            </div>
            {isEditing && (
                <div className="flex justify-center items-center mt-4 gap-4">
                    <button className={`${PRIMARY_CONTAINER_BUTTON}`} onClick={() => cancelEditing()} type="button">
                        Abbrechen
                    </button>
                    <button className={`${PRIMARY_BUTTON}`} type="submit" aria-disabled={isPending}>
                        Speichern
                    </button>
                </div>
            )}
            {!isEditing && (
                <button className={`mt-4 ${PRIMARY_BUTTON}`} onClick={() => setIsEditing(editingPermitted)} type="button" aria-disabled={!editingPermitted}>
                    Bearbeiten
                </button>
            )}
        </form>
    )
}