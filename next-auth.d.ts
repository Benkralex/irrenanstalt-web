import type { DefaultSession } from 'next-auth';
import type { User as AppUser, SessionType, SessionUser } from './app/lib/database/definitions';

declare module 'next-auth' {
  interface Session extends SessionType {}

  interface User extends AppUser {}
}

declare module 'next-auth/jwt' {
  interface JWT {
    user?: SessionUser;
    username?: string;
    otpRequired?: boolean;
  }
}
