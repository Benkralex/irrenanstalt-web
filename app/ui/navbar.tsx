import { auth, signOut } from '@/auth';
import { parseTags } from '../lib/database/users';

export async function Navbar() {
  const session = await auth()
  const username = session?.user.username
  
  return (
    <div>
      <nav className='
        p-4
        fixed top-0 left-0 right-0
        backdrop-blur bg-white/30 dark:bg-black/30
        border-b border-zinc-200 dark:border-zinc-700
        z-50
      '>
        <ul className='flex gap-[20px]'>
          <li><a href="/">Startseite</a></li>
          <li><a href="/events">Events</a></li>
          { parseTags(session?.user?.tags || '').includes('admin') && (
            <li><a href="/admin">Admin Dashboard</a></li>
          )}
          <li><a href="/profile">Profil</a></li>
          <li>
            <form
              action={async () => {
                'use server';
                await signOut({ redirectTo: '/' });
              }}
            >
              <button type="submit">Abmelden</button>
            </form>
          </li>
        </ul>
      </nav>
      <div className='p-4'></div>
    </div>
  );
}