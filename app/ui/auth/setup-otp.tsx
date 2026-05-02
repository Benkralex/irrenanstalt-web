"use client";

import { createOtp } from "@/app/lib/actions/otp";
import { PRIMARY_BUTTON } from "../constants";

export function SetupOtp() {
    return (
        <form action={createOtp} className="flex flex-col items-center gap-4 mt-8">
            <p className={`line-clamp-3 text-center text-sm`}>
                <b>Achtung</b><br/>
                Wenn du den OTP-Code einrichtest, brauchst du diesen für jede Anmeldung.<br/>
                Du bist selbst dafür verantwortlich, den Code sicher zu speichern oder ihn in deine Authenticator App einzutragen.
            </p>
            <button className={`${PRIMARY_BUTTON}`}>OTP Einrichten</button>
        </form>
    );
}