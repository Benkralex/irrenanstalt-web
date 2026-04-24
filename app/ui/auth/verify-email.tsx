"use client";
import { sendVerifyEmail } from "@/app/lib/actions/send-verify-email";
import { useActionState, useEffect } from "react";
import { VerifyEmailState } from "@/app/lib/actions/send-verify-email";
import { useRouter } from "next/navigation";
import { PRIMARY_BUTTON } from "@/app/ui/constants";

export function EmailVerificationPoller() {
    const router = useRouter();

    useEffect(() => {
        const intervalId = window.setInterval(() => {
            router.refresh();
        }, 10000);

        return () => {
            window.clearInterval(intervalId);
        };
    }, [router]);

    return null;
}

export function SendVerifyEmailForm() {
    const initialState: VerifyEmailState = {
        errorMessage: "",
        resultMessage: "",
        buttonMessage: "Code senden",
    };

    const [state, formAction, isPending] = useActionState(sendVerifyEmail, initialState);
    const {errorMessage, resultMessage} = state || {};

    return (
        <form action={formAction}>
            <div
                className="flex items-center justify-center gap-4"
            >
                <button
                    type="submit"
                    className={`${PRIMARY_BUTTON}`}
                    aria-disabled={isPending}
                    disabled={isPending}
                >
                {state?.buttonMessage}
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