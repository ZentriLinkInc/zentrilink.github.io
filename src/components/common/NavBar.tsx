'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

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
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth < 1024);
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
                aria-expanded={isOpen}
            >
                {label} <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div
                    className={`
                        ${isMobile ? 'relative' : 'absolute'} 
                        top-full left-0 mt-1 w-48 
                        bg-background rounded-lg shadow-lg py-2 
                        border border-secondary z-[60]
                    `}
                    onClick={(e) => e.stopPropagation()}
                >
                    {items.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="block px-4 py-2 hover:bg-secondary text-primary"
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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024 && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMobileMenuOpen]);

    useEffect(() => {
        if (!isMobileMenuOpen) {
            setProductsOpen(false);
            setResourcesOpen(false);
        }
    }, [isMobileMenuOpen]);

    return (
        <nav className="w-full px-4 lg:px-15 py-4">
            <div className="flex justify-between items-center">
                <div className="flex items-end">
                    <Image
                        src="/zentrilink-logo.png"
                        alt="ZentriLink Logo"
                        width={200}
                        height={200}
                        className="h-16 lg:h-22 w-auto image-brightness transition-all"
                    />
                    <div className='flex flex-col ml-3'>
                        <h1 className="text-2xl lg:text-3xl font-bold font-[raleway] text-primary">ZentriLink</h1>
                        <p className='text-base lg:text-lg font-[raleway] text-secondary'>Centralization Software</p>
                    </div>
                </div>

                <button 
                    className="lg:hidden text-primary p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle mobile menu"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <div className={`
                    fixed lg:static top-0 right-0 h-full w-64 lg:w-auto
                    lg:flex items-center gap-8 bg-foreground lg:bg-transparent
                    transform transition-transform duration-300 ease-in-out
                    ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
                    lg:flex-row flex-col justify-start lg:justify-end
                    pt-16 lg:pt-0 px-4 lg:px-0
                    shadow-lg lg:shadow-none
                    z-[55]
                `}>
                    {/* Close button for mobile menu */}
                    <button 
                        className="lg:hidden absolute top-4 right-4 text-primary"
                        onClick={() => setIsMobileMenuOpen(false)}
                        aria-label="Close mobile menu"
                    >
                        <X size={24} />
                    </button>

                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-8 w-full lg:w-auto">
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

                        <Link href="/pricing" className="text-primary hover:text-primary/80 font-[raleway] hover:cursor-pointer w-full lg:w-auto">
                            Pricing
                        </Link>
                        <Link href="/contact" className="text-primary hover:text-primary/80 font-[raleway] hover:cursor-pointer w-full lg:w-auto">
                            Contact
                        </Link>

                        <button className="bg-foreground text-tertiary px-4 py-2 rounded-lg hover:bg-foreground/90 transition-colors font-[raleway] hover:cursor-pointer w-full lg:w-auto">
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
