'use client';

import { useActionState, useState } from 'react';
import { register } from '@/app/lib/actions/authentication';
import { useSearchParams } from 'next/navigation';
import { TEXT_COLOR_ON_SURFACE_VARIANT, PLACEHOLDER_COLOR_SURFACE_VARIANT, BG_COLOR_PRIMARY, TEXT_COLOR_ON_PRIMARY } from './constants';

export default function RegisterForm({ idParam }: { idParam: string }) {
  const id = idParam;
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [state, formAction, isPending] = useActionState(
    register,
    undefined,
  );
  const {email, fullname, username, errorMessage} = state || {};
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  return (
    <form action={formAction}>
        <div>
          <input
            className={`peer block rounded-md border border-gray-400 p-[9px] text-sm ${PLACEHOLDER_COLOR_SURFACE_VARIANT}`}
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            defaultValue={email}
            required
          />
        </div>
        <div className="mt-4">
          <input
            className={`peer block rounded-md border border-gray-400 p-[9px] text-sm ${PLACEHOLDER_COLOR_SURFACE_VARIANT}`}
            id="fullname"
            type="text"
            name="fullname"
            placeholder="Voller Name"
            defaultValue={fullname}
            pattern='^(.*?\S.*){6,}$'
            title='Name muss min 6 Zeichen lang sein'
            required
          />
        </div>
        <div className="mt-4">
          <input
            className={`peer block rounded-md border border-gray-400 p-[9px] text-sm ${PLACEHOLDER_COLOR_SURFACE_VARIANT}`}
            id="username"
            type="text"
            name="username"
            placeholder="Benutzername"
            defaultValue={username}
            pattern="^.*?\S.*$"
            title="Benutzername darf nicht leer sein"
            required
          />
        </div>
        <div className="mt-4">
          <input
            className={`peer block rounded-md border border-gray-400 p-[9px] text-sm ${PLACEHOLDER_COLOR_SURFACE_VARIANT}`}
            id="password"
            type="password"
            name="password"
            placeholder="Passwort"
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
            title="Das Passwort muss min 8 Zeichen lang sein, einen Kleinbuchstaben, einen Großbuchstaben, eine Zahl und ein Sonderzeichen enthalten"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (confirmPassword && e.target.value !== confirmPassword) {
                setPasswordError("Passwörter stimmen nicht überein");
              } else {
                setPasswordError("");
              }
            }}
            required
          />
        </div>
        <div className="mt-4">
          <input
            className={`peer block rounded-md border border-gray-400 p-[9px] text-sm ${PLACEHOLDER_COLOR_SURFACE_VARIANT}`}
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="Passwort bestätigen"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (e.target.value !== password) {
                setPasswordError("Passwörter stimmen nicht überein");
              } else {
                setPasswordError("");
              }
            }}
            required
          />
          {passwordError && <p className="text-xs text-red-500 mt-1">{passwordError}</p>}
        </div>
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <input type="hidden" name="id" defaultValue={id} />
        <div
          className="flex flex-col justify-center items-center mt-4"
          aria-live="polite"
          aria-atomic="true"
        >
            {errorMessage && (
            <p className="text-xs text-red-500 break-words" dangerouslySetInnerHTML={{ __html: errorMessage }} />
            )}
          <p className={`text-xs ${TEXT_COLOR_ON_SURFACE_VARIANT} mt-2`}>
            Durch registrieren akzeptieren Sie<br/>
            unsere <a href="/terms-of-service" className="text-blue-500 underline">Nutzungsbedingungen</a>.
          </p>
        </div>
        <div className="flex items-center justify-end">
          <button className={`
            mt-4 rounded-lg px-4 text-sm font-medium text-white 
            h-10
            aria-disabled:cursor-not-allowed aria-disabled:opacity-50
            transition-colors ${BG_COLOR_PRIMARY} ${TEXT_COLOR_ON_PRIMARY}
          `} aria-disabled={isPending}>
            Registrieren
          </button>
        </div>
    </form>
  );
}