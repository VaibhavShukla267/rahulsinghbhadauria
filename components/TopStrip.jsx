"use client"
import { Mail, Phone, Facebook, Twitter, Instagram, HelpingHand } from "lucide-react";
import Link from "next/link";
import Container from "./Container";
import { useEffect, useState } from "react";
import { languageService } from "@/utils/languageService";
import { LanguageSwitcher } from "./LanguageSwitcher";
import siteConfig from "@/config/siteConfig";
import { useTranslation } from "@/contexts/TranslationContext";

const TopStrip = () => {
  const [currentLanguage, setCurrentLanguage] = useState(languageService.getCurrentLanguage());
  const { t } = useTranslation();

  useEffect(() => {
    const handleLanguageChange = (lang) => {
      setCurrentLanguage(lang);
    };

    const unsubscribe = languageService.subscribe(handleLanguageChange);

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#3E0D18] via-[#641526] to-[#3E0D18] text-white py-1.5 px-3 font-semibold text-xs sm:text-sm border-b border-amber-500/20 shadow-xs">
      <Container>
        <div className="flex flex-row items-center justify-between gap-2">
          {/* Left Section - Contact Info */}
          <div className="flex items-center gap-4 sm:gap-6">
            <a href={`mailto:${siteConfig.contactEmail}`} className="hidden sm:flex items-center gap-2 hover:text-[#E4C77A] transition-colors">
              <Mail className="w-3.5 h-3.5 text-[#C79A45]" />
              <span className="truncate">{siteConfig.contactEmail}</span>
            </a>
            <a href={`tel:${siteConfig.contactPhone}`} className="flex items-center gap-2 hover:text-[#E4C77A] transition-colors">
              <Phone className="w-3.5 h-3.5 text-[#C79A45]" />
              <span>{siteConfig.contactPhone}</span>
            </a>
          </div>

          {/* Right Section - Social Media, Donation Button & Language Switcher */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 border-r border-amber-500/30 pr-2 sm:pr-3">
              <Link href={siteConfig.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="p-1 rounded-full hover:bg-white/10 text-amber-100 hover:text-[#E4C77A] transition-all">
                <Facebook className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Link>
              <Link href={siteConfig.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="p-1 rounded-full hover:bg-white/10 text-amber-100 hover:text-[#E4C77A] transition-all">
                <Twitter className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Link>
              <Link href={siteConfig.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="p-1 rounded-full hover:bg-white/10 text-amber-100 hover:text-[#E4C77A] transition-all">
                <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Link>
            </div>

            {/* Donation Form CTA Link */}
            {/* <Link
              href="/join/help"
              className="bg-[#C79A45] hover:bg-[#b08537] text-white px-3 py-1 rounded-full text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 border border-amber-300/30"
            >
              <HelpingHand className="w-3.5 h-3.5 text-amber-100" />
              <span>{t('banner.contribute') || "सहयोग करें"}</span>
            </Link> */}



            <LanguageSwitcher />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TopStrip;




