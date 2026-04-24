import { signOut } from "@/auth";
import { ICON_COLOR_ON_PRIMARY, PRIMARY_BUTTON } from "../constants";
import { LogoutIcon } from "@/app/ui/icons";

export function LogoutButton() {
    return (
        <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
          }}
        >
          <button className={`flex w-full grow items-center justify-center gap-2 ${PRIMARY_BUTTON}`}><LogoutIcon classNames={ICON_COLOR_ON_PRIMARY} /> Abmelden</button>
        </form>
    );
}