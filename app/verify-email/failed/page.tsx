import type { Metadata } from "next";
import { BG_COLOR_SURFACE, TEXT_COLOR_ON_SURFACE } from "@/app/ui/constants";

export const metadata: Metadata = {
  title: "Email verifizieren",
};

export default async function EmailFailedToVerify() {
    return (
        <main className={`
            min-h-screen px-4 py-8
            flex flex-col justify-center items-center gap-4
            ${BG_COLOR_SURFACE} ${TEXT_COLOR_ON_SURFACE}
        `}>
            <h1 className="text-3xl font-bold mb-8">Fehler beim Verifizieren der Email</h1>
        </main>
    );
}