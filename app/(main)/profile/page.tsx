import type { Metadata } from "next";
import { BG_COLOR_SURFACE, TEXT_COLOR_ON_SURFACE } from "@/app/ui/constants";
import { auth } from "@/auth";
import ShowAndEditProfile from "@/app/ui/profile";
import { getPasswordRequirementsMessage, getPasswordRequirementsRegex } from "@/app/lib/check-password-requirements";

export const metadata: Metadata = {
  title: "Profil",
};

export default async function Profile() {
    const session = await auth();
    const username = session?.user?.username;
    const fullname = session?.user?.fullname;
    const email = session?.user?.email;
    const passwordPattern = getPasswordRequirementsRegex().source;
    const passwordTitle = getPasswordRequirementsMessage();

    return (
        <main className={`
            min-h-screen px-4 py-8
            flex flex-col justify-start items-center gap-4
            ${BG_COLOR_SURFACE} ${TEXT_COLOR_ON_SURFACE}
        `}>
            <h1 className="text-3xl font-bold mb-8">Profil</h1>
            {username === "Admin" && (
                <p className="text-red-500 mb-4">
                    Bearbeite das Haupt-Admin-Profil über die .env Datei
                </p>
            )}
            <ShowAndEditProfile
                username={username || ""}
                fullname={fullname || ""}
                email={email || ""}
                passwordPattern={passwordPattern}
                passwordTitle={passwordTitle}
                editingPermitted={username !== "Admin"}
            />
        </main>
    );
}