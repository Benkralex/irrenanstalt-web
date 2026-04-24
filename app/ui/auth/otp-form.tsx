"use client";

import { check2FA } from "@/app/lib/actions/authentication";
import { useActionState } from "react";
import { BG_COLOR_PRIMARY, TEXT_COLOR_ON_PRIMARY } from "../constants";

export default function OTPForm() {
    const [state, formAction, isPending] = useActionState(check2FA, { message: '' });
    
    return (
        <form action={formAction} className="flex flex-col items-center">
            <input type="text" placeholder="Enter OTP code" className="p-2 rounded border" id="otp" name="otp" />
            <p className="mt-2">{state?.message}</p>
            <button className={`
                mt-4 rounded-lg px-4 text-sm font-medium text-white h-10
                aria-disabled:cursor-not-allowed aria-disabled:opacity-50
                transition-colors ${BG_COLOR_PRIMARY} ${TEXT_COLOR_ON_PRIMARY}
            `} aria-disabled={isPending}>
                Verify
            </button>
        </form>
    );
}