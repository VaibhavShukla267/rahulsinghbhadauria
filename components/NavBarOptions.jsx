"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Link from "next/link";
import { usePathname } from "next/navigation";
import NavItems from "@/utils/NavItems";
import { ArrowRight, ChevronDown, HelpingHand, Menu, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from '@/contexts/TranslationContext';

function NavBarOptions() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navItems = NavItems();
    const { t } = useTranslation();

    return (
        <div className="relative">
            {/* Mobile Toggle Button */}
            <button 
                aria-label="Toggle Navigation"
                className="md:hidden p-2 text-[#641526] hover:bg-gray-100 rounded-lg transition-colors focus:outline-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-x-6">
                <nav className="flex items-center gap-x-2 lg:gap-x-4">
                    {navItems.map((item) => {
                        const isLinkActive = item.link && item.link !== "/" 
                            ? pathname.startsWith(item.link) 
                            : item.link === "/" 
                                ? pathname === "/" 
                                : false;

                        // If item has dropdown sub-items
                        if (item.content && item.content.length > 0) {
                            return (
                                <DropdownMenu key={item.name}>
                                    <DropdownMenuTrigger className={`flex items-center gap-1 px-3 py-2 text-base font-semibold rounded-md transition-colors cursor-pointer focus:outline-none ${
                                        isLinkActive
                                            ? "text-[#641526] font-bold"
                                            : "text-gray-700 hover:text-[#641526]"
                                    }`}>
                                        <span className="flex items-center gap-1.5">
                                            {item.icon}
                                            {item.name}
                                        </span>
                                        <ChevronDown className="w-4 h-4 opacity-70 ml-0.5" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-52 bg-white shadow-xl border border-gray-100 rounded-xl p-1.5 z-50">
                                        <DropdownMenuLabel className="text-xs font-bold text-[#641526] px-2 py-1 uppercase tracking-wider">
                                            {item.name}
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator className="bg-gray-100" />
                                        {item.content.map((subItem, idx) => (
                                            <Link href={subItem.link} key={idx}>
                                                <DropdownMenuItem className="cursor-pointer text-sm font-medium rounded-lg hover:bg-amber-50 hover:text-[#641526] focus:bg-amber-50 focus:text-[#641526] px-3 py-2">
                                                    {subItem.name}
                                                </DropdownMenuItem>
                                            </Link>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            );
                        }

                        // Direct link without dropdown
                        return (
                            <Link 
                                href={item.link || "/"} 
                                key={item.name}
                                className={`flex items-center gap-1.5 px-3 py-2 text-base font-semibold rounded-md transition-colors ${
                                    isLinkActive
                                        ? "text-[#641526] font-bold"
                                        : "text-gray-700 hover:text-[#641526]"
                                }`}
                            >
                                {item.icon}
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Donation CTA */}
                <Link href="/join/help">
                    <div className="flex items-center gap-2 bg-[#F63D3E] hover:bg-[#D32F2F] text-white px-4 py-2.5 rounded-lg text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer">
                        <HelpingHand className="w-4 h-4 text-white" />
                        <span>{t('banner.contribute') || "दान (Donation)"}</span>
                        <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                </Link>
            </div>

            {/* Mobile Navigation Drawer */}
            {isMenuOpen && (
                <div className="absolute top-full right-0 w-72 bg-white shadow-2xl rounded-2xl border border-gray-200 p-4 mt-2 md:hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <nav className="flex flex-col gap-1">
                        {navItems.map((item) => {
                            if (item.content && item.content.length > 0) {
                                return (
                                    <div key={item.name} className="py-1">
                                        <div className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-[#641526] bg-amber-50/80 rounded-lg">
                                            {item.icon}
                                            <span>{item.name}</span>
                                        </div>
                                        <div className="pl-6 space-y-1 mt-1 border-l-2 border-amber-200 ml-3">
                                            {item.content.map((subItem, idx) => (
                                                <Link 
                                                    href={subItem.link} 
                                                    key={idx}
                                                    onClick={() => setIsMenuOpen(false)}
                                                    className="block px-3 py-1.5 text-xs font-semibold text-gray-700 hover:text-[#641526] hover:bg-amber-50 rounded-md"
                                                >
                                                    {subItem.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <Link 
                                    href={item.link || "/"}
                                    key={item.name}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center gap-2 px-3 py-2.5 text-sm font-bold text-gray-800 hover:text-[#641526] hover:bg-amber-50 rounded-md"
                                >
                                    {item.icon}
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="pt-3 mt-2 border-t border-gray-100">
                        <Link href="/join/help" onClick={() => setIsMenuOpen(false)}>
                            <div className="flex items-center justify-center gap-2 bg-[#F63D3E] hover:bg-[#D32F2F] text-white p-3 rounded-lg font-bold text-sm shadow-md">
                                <HelpingHand className="w-4 h-4" />
                                <span>{t('banner.contribute') || "दान (Donation)"}</span>
                                <ArrowRight className="w-4 h-4" />
                            </div>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default NavBarOptions;

