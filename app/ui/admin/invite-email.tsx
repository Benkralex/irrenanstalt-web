"use client";
import { sendInviteEmail } from "@/app/lib/actions/send-invite-email";
import { useActionState, useState } from "react";
import { BG_COLOR_PRIMARY, BORDER_COLOR_SURFACE_VARIANT, PLACEHOLDER_COLOR_SURFACE_VARIANT, PRIMARY_BUTTON, TEXT_COLOR_ON_PRIMARY } from "../constants";
import { InviteEmailState } from "@/app/lib/actions/send-invite-email";

export function SendInviteEmailForm({recipient: initialRecipient}: {recipient?: string | null}) {
    const initialState: InviteEmailState = {
        email: "",
        errorMessage: "",
        resultMessage: "",
    };

    const [state, formAction, isPending] = useActionState(sendInviteEmail, initialState);
    var [recipient, setRecipient] = useState(initialRecipient || "");
    const {errorMessage, resultMessage} = state || {};

    return (
        <form action={formAction}>
            <div
                className="flex items-center justify-center gap-4"
            >
                <input 
                    className={`peer block rounded-md border ${BORDER_COLOR_SURFACE_VARIANT} p-[9px] text-sm ${PLACEHOLDER_COLOR_SURFACE_VARIANT}`}
                    type="email"
                    name="recipient"
                    value={recipient}
                    placeholder="Email"
                    onChange={(e) => setRecipient(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className={`${PRIMARY_BUTTON}`}
                    aria-disabled={isPending}
                    disabled={isPending}
                >
                Senden
                </button>
            </div>
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
        </form>
    );
}