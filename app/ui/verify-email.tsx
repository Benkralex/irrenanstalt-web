"use client";
import { sendVerifyEmail } from "@/app/lib/actions/send-verify-email";
import { useActionState, useEffect } from "react";
import { BG_COLOR_PRIMARY, TEXT_COLOR_ON_PRIMARY } from "./constants";
import { VerifyEmailState } from "../lib/actions/send-verify-email";
import { useRouter } from "next/navigation";

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
                    className={`
                        rounded-lg px-4 text-sm font-medium text-white 
                        h-10
                        aria-disabled:cursor-not-allowed aria-disabled:opacity-50
                        transition-colors ${BG_COLOR_PRIMARY} ${TEXT_COLOR_ON_PRIMARY}
                    `}
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