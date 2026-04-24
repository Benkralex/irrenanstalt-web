import type { Metadata } from "next";
import { BG_COLOR_SURFACE, PRIMARY_BUTTON, TEXT_COLOR_ON_SURFACE } from "@/app/ui/constants";
import { verifyEmail } from "@/app/lib/actions/verify-email";

export const metadata: Metadata = {
  title: "Email verifizieren",
};

export default async function VerifyEmail(props: { params: Promise<{ code: string }> }) {
    const params = await props.params;
    const code = params.code;

    return (
        <main className={`
            min-h-screen px-4 py-8
            flex flex-col justify-center items-center gap-4
            ${BG_COLOR_SURFACE} ${TEXT_COLOR_ON_SURFACE}
        `}>
            <h1 className="text-3xl font-bold mb-8">Email verifizieren</h1>
            <form action={verifyEmail}>
                <input
                    type="text"
                    name="code"
                    value={code}
                    readOnly
                    hidden
                />
                <button className={`${PRIMARY_BUTTON}`}>Email verifizieren</button>
            </form>
        </main>
    );
}