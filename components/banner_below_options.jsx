"use client";
import { ActivitySquare, HelpingHand, Lock } from "lucide-react";
import Link from "next/link";
import { useTranslation } from '@/contexts/TranslationContext';

const Banner_below_options = () => {
  const { t } = useTranslation();

  const options = [
    {
      name: t('banner.contribute') || "दान (Donation)",
      icon: <HelpingHand className="w-5 h-5 sm:w-6 sm:h-6 text-[#641526] group-hover:text-white transition-colors" />,
      link: "/join/help"
    },
    {
      name: t('banner.pledgeForm') || "संकल्प पत्र",
      icon: <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-[#641526] group-hover:text-white transition-colors" />,
      link: "/join/sankalppatra"
    },
    {
      name: t('banner.activeMembers') || "सक्रिय सदस्य",
      icon: <ActivitySquare className="w-5 h-5 sm:w-6 sm:h-6 text-[#641526] group-hover:text-white transition-colors" />,
      link: "/join/permanent"
    },
  ];

  return (
    <div className="relative -top-1 sm:-top-2 md:-top-3 z-20 w-full max-w-6xl mx-auto px-2 sm:px-4">
      <div className="grid grid-cols-3 bg-white rounded-2xl shadow-xl border border-amber-900/10 overflow-hidden divide-x divide-amber-100">
        {options.map((option) => (
          <Link
            key={option.name}
            href={option.link}
            className="flex flex-col sm:flex-row items-center justify-center p-2.5 sm:p-4 md:p-6 text-center sm:text-left gap-1.5 sm:gap-3 hover:bg-amber-50/80 transition-colors group"
          >
            <div className="p-2 sm:p-3 rounded-full bg-amber-50 group-hover:bg-[#641526] transition-colors shadow-2xs shrink-0">
              {option.icon}
            </div>
            <span className="font-bold text-[11px] sm:text-sm md:text-base text-gray-800 group-hover:text-[#641526] leading-tight">
              {option.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Banner_below_options;
