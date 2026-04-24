import type { DefaultSession } from 'next-auth';
import type { User as AppUser } from './app/lib/database/definitions';

declare module 'next-auth' {
  interface Session {
    user: (Omit<AppUser, 'password' | 'secondFactorSecret'> & {
      otpRequired?: boolean;
      otpVerified?: boolean;
    }) & DefaultSession['user'];
  }

  interface User extends AppUser {}
}

declare module 'next-auth/jwt' {
  interface JWT {
    user?: Omit<AppUser, 'password' | 'secondFactorSecret'>;
    username?: string;
    otpRequired?: boolean;
    otpVerified?: boolean;
  }
}
