'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface NavItem {
    label: string;
    href: string;
}

interface DropdownProps {
    label: string;
    items: NavItem[];
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const products: NavItem[] = [
    { label: 'Enterprise Solutions', href: '/products/enterprise' },
    { label: 'Cloud Services', href: '/products/cloud' },
    { label: 'Integrations', href: '/products/integrations' },
];

const resources: NavItem[] = [
    { label: 'Documentation', href: '/resources/documentation' },
    { label: 'Blog', href: '/resources/blog' },
    { label: 'Support', href: '/resources/support' },
];

function DropdownMenu({ label, items, isOpen, setIsOpen }: DropdownProps) {
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [setIsOpen]);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                className="flex items-center gap-1 text-primary hover:text-primary/80 font-[raleway] hover:cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                {label} <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div
                    className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-100"
                    onClick={(e) => e.stopPropagation()}
                >
                    {items.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="block px-4 py-2 hover:bg-gray-100 text-secondary"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function NavBar() {
    const [productsOpen, setProductsOpen] = useState(false);
    const [resourcesOpen, setResourcesOpen] = useState(false);

    return (
        <nav className="flex w-full px-15 py-4 bg-surface justify-between items-center">
            <div className="flex items-end">
                <Image
                    src="/zentrilink-logo.png"
                    alt="ZentriLink Logo"
                    width={200}
                    height={200}
                    className="h-22 w-auto"
                />
                <div className='flex flex-col ml-3'>
                    <h1 className="text-3xl font-bold font-[raleway] text-primary">ZentriLink</h1>
                    <p className='text-lg font-[raleway] text-secondary'>Centralization Software</p>
                </div>
            </div>

            <div className="flex items-center gap-8">
                <DropdownMenu
                    label="Products"
                    items={products}
                    isOpen={productsOpen}
                    setIsOpen={setProductsOpen}
                />

                <DropdownMenu
                    label="Resources"
                    items={resources}
                    isOpen={resourcesOpen}
                    setIsOpen={setResourcesOpen}
                />

                <Link href="/pricing" className="text-primary hover:text-primary/80 font-[raleway] hover:cursor-pointer">
                    Pricing
                </Link>
                <Link href="/contact" className="text-primary hover:text-primary/80 font-[raleway] hover:cursor-pointer">
                    Contact
                </Link>

                <button className="bg-primary text-tertiary px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-[raleway] hover:cursor-pointer">
                    Get Started
                </button>
            </div>
        </nav>
    );
}
