'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PRIMARY_CONTAINER_BUTTON, BUTTON, ICON_COLOR_ON_SURFACE } from './constants';
import { AdminIcon, EventsIcon, HomeIcon, ProfileIcon } from './icons';

const links = [
  { name: 'Startseite', icon: <HomeIcon classNames={ICON_COLOR_ON_SURFACE} />, href: '/' },
  { name: 'Events', icon: <EventsIcon classNames={ICON_COLOR_ON_SURFACE} />, href: '/events' },
  { name: 'Admin', icon: <AdminIcon classNames={ICON_COLOR_ON_SURFACE} />, href: '/admin' },
  { name: 'Profil', icon: <ProfileIcon classNames={ICON_COLOR_ON_SURFACE} />, href: '/profil' },
];

export default function NavLinks() {
    const pathname = usePathname();
    return (
        <>
            {links.map((link) => {
                return (
                    <Link key={link.name} href={link.href} className={`
                        flex w-full grow items-center justify-center gap-2
                        md:flex-none md:justify-start
                        ${(pathname === link.href) ? PRIMARY_CONTAINER_BUTTON : BUTTON}
                    `}>
                        {link.icon && link.icon}
                        <p className={(link.icon) ? 'hidden md:block' : ''}>
                            {link.name}
                        </p>
                    </Link>
                );
            })}
        </>
    );
}
