"use client";

import { check2FA } from "@/app/lib/actions/authentication";
import { useActionState } from "react";
import { PRIMARY_BUTTON } from "../constants";

type OTPFormProps = {
    callbackUrl: string;
};

export default function OTPForm({ callbackUrl }: OTPFormProps) {
    const [state, formAction, isPending] = useActionState(check2FA, { message: '' });
    
    return (
        <form action={formAction} className="flex flex-col items-center">
            <input type="text" placeholder="Enter OTP code" className="p-2 rounded border" id="otp" name="otp" />
            <input type="hidden" name="callbackUrl" value={callbackUrl} />
            <p className="mt-2">{state?.message}</p>
            <button className={`mt-4 ${PRIMARY_BUTTON}`} aria-disabled={isPending}>
                Verify
            </button>
        </form>
    );
}