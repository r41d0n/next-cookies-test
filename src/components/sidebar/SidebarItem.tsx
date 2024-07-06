'use client';

import {usePathname} from "next/navigation";

interface SidebarItemProps {
    icon: React.ReactNode;
    title: string;
    path: string
}

export const SidebarItem = ({icon, title, path}: SidebarItemProps) => {
    const pathName = usePathname();
    return (
        <li>
            <a href={path} className={`
                px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group
                hover:bg-gradient-to-r hover:from-sky-600 hover:to-cyan-400 hover:text-white
                ${pathName === path ? 'text-white bg-gradient-to-r from-sky-600 to-cyan-400' : ''}
                `}>
                {icon}
                <span>{title}</span>
            </a>
        </li>
    )
}
