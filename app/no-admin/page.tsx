import type { Metadata } from "next";
import { BG_COLOR_SURFACE, PRIMARY_BUTTON, TEXT_COLOR_ON_SURFACE } from "@/app/ui/constants";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default async function EmailFailedToVerify() {
    const session = await auth();
    
    return (
        <main className={`
            min-h-screen px-4 py-8
            flex flex-col justify-center items-center gap-4
            ${BG_COLOR_SURFACE} ${TEXT_COLOR_ON_SURFACE}
        `}>
            <h1 className="text-3xl font-bold mb-8">Du bist kein Admin</h1>
            {session?.user && (
                <a href="/">
                    <button className={`${PRIMARY_BUTTON}`}>
                        Zur Startseite
                    </button>
                </a>
            )}
        </main>
    );
}