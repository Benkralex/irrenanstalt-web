'use client';

import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions/authentication';
import { useSearchParams } from 'next/navigation';
import { TEXT_COLOR_ON_SURFACE_VARIANT, PLACEHOLDER_COLOR_SURFACE_VARIANT, BG_COLOR_PRIMARY, TEXT_COLOR_ON_PRIMARY, BORDER_COLOR_SURFACE_VARIANT } from '@/app/ui/constants';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [state, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );
  const {errorMessage, email} = state || {};

  return (
    <form action={formAction}>
        <div>
          <input
            className={`peer block rounded-md border ${BORDER_COLOR_SURFACE_VARIANT} p-[9px] text-sm ${PLACEHOLDER_COLOR_SURFACE_VARIANT}`}
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
            className={`peer block rounded-md border ${BORDER_COLOR_SURFACE_VARIANT} p-[9px] text-sm ${PLACEHOLDER_COLOR_SURFACE_VARIANT}`}
            id="password"
            type="password"
            name="password"
            placeholder="Passwort"
            required
          />
        </div>
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <div
          className="flex flex-col justify-center items-center mt-4"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
          <p className={`text-xs ${TEXT_COLOR_ON_SURFACE_VARIANT} mt-2`}>
            Durch anmelden akzeptieren Sie<br/>
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
            Anmelden
          </button>
        </div>
    </form>
  );
}

/*flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 */