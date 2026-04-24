import { DebugSection } from "@/app/ui/admin/debug";
import { SendInviteEmailForm } from "@/app/ui/admin/invite-email";
import { Test2FA } from "@/app/ui/admin/test-2fa";
import { SendTestEmailForm } from "@/app/ui/admin/test-email";
import { BG_COLOR_SURFACE, TEXT_COLOR_ON_SURFACE } from "@/app/ui/constants";
import { auth } from "@/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default async function Home() {
    const session = await auth()
    return (
        <main className={`
        min-h-screen px-4 py-8
        flex flex-col justify-start items-center gap-4
        ${BG_COLOR_SURFACE} ${TEXT_COLOR_ON_SURFACE}
        `}>
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
            <h2 className="text-xl font-semibold mb-4">Person einladen</h2>
            <SendInviteEmailForm />
            <details className="w-full max-w-md" open>
                <summary className="cursor-pointer text-xl font-semibold mb-4">Weitere Funktionen</summary>
                <div className="flex flex-col justify-start items-center gap-4 mt-4">
                    <h2 className="text-xl font-semibold mb-4">Test E-Mail senden</h2>
                    <SendTestEmailForm recipient={session?.user?.email} />
                    <h2 className="text-xl font-semibold mb-4">Debug Section</h2>
                    <DebugSection />
                    <h2 className="text-xl font-semibold mt-8">Test 2FA</h2>
                    <Test2FA />
                </div>
            </details>
        </main>
    );
}