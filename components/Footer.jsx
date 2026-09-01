"use client"
import { ChevronRight, Mail, MapPin, Phone } from "lucide-react";
import React from "react";
import Container from "./Container";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { useTranslation } from "@/contexts/TranslationContext";
import siteConfig from "@/config/siteConfig";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="mt-16">
      {/* Upper Main Footer */}
      <div className="bg-gradient-to-b from-[#3E0D18] via-[#641526] to-[#2B0810] text-white pt-12 pb-10 border-t-2 border-[#C79A45]/40 shadow-2xl">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

            {/* Organization Info */}
            <div className="flex flex-col space-y-4">
              <h2 className="text-2xl font-extrabold text-[#E4C77A] tracking-tight">
                {t("footer.organizationName") || "राहुल सिंह भदौरिया"}
              </h2>
              <p className="text-amber-100/80 text-sm leading-relaxed">
                सामाजिक न्याय, जनसेवा एवं युवा अधिकारों के संरक्षण हेतु प्रतिबद्ध संगठन।
              </p>
              <div className="space-y-2.5 pt-2 text-xs sm:text-sm text-amber-100/90">
                <p className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C79A45] flex-shrink-0 mt-0.5" />
                  <span>{siteConfig.address || t("footer.address")}</span>
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#C79A45] flex-shrink-0" />
                  <span>{siteConfig.contactPhone || t("footer.phone")}</span>
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#C79A45] flex-shrink-0" />
                  <span>{siteConfig.contactEmail || t("footer.email")}</span>
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col space-y-3">
              <h3 className="text-lg font-bold text-white border-b border-amber-500/30 pb-2">
                {t("footer.quickLinks") || "त्वरित लिंक्स"}
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm">
                {[
                  { label: t("common.home") || "मुख्य पृष्ठ", href: "/" },
                  // { label: t("common.about") || "हमारे बारे में", href: "/about" },
                  { label: t("common.gallery") || "गैलरी", href: "/gallery/images" },
                  { label: t("footer.membership") || "ऑनलाइन सदस्यता", href: "/join/new" },
                  { label: t("common.contact") || "संपर्क करें", href: "/contact" },
                  // { label: t("footer.adminLogin") || "एडमिन लॉगिन", href: "/login" },
                ].map((item, idx) => (
                  <li key={idx}>
                    <Link href={item.href} className="flex items-center gap-1.5 text-amber-100/80 hover:text-[#E4C77A] transition-colors group">
                      <ChevronRight className="w-3.5 h-3.5 text-[#C79A45] group-hover:translate-x-1 transition-transform" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Links */}
            <div className="flex flex-col space-y-3">
              <h3 className="text-lg font-bold text-white border-b border-amber-500/30 pb-2">
                {t("footer.popularLinks") || "लोकप्रिय खंड"}
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm">
                {[
                  { label: t("common.president") || "संदेश", href: "/president" },
                  { label: t("about.aboutOrg") || "परिचय एवं विचार", href: "/about/organisation" },
                  { label: t("about.ideology") || "हमारी विचारधारा", href: "/about/ideology" },
                  { label: t("about.leadership") || "नेतृत्व टीम", href: "/about/leadership" },
                  { label: t("common.grivences") || "सहायता एवं शिकायत", href: "/grivences" },
                ].map((item, idx) => (
                  <li key={idx}>
                    <Link href={item.href} className="flex items-center gap-1.5 text-amber-100/80 hover:text-[#E4C77A] transition-colors group">
                      <ChevronRight className="w-3.5 h-3.5 text-[#C79A45] group-hover:translate-x-1 transition-transform" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social & Connect */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-lg font-bold text-white border-b border-amber-500/30 pb-2">
                {t("footer.followUs") || "सोशल मीडिया से जुड़ें"}
              </h3>
              <p className="text-xs text-amber-100/80">
                नवीनतम गतिविधियों, जनसंवाद एवं अभियानों की जानकारी हेतु हमें फॉलो करें:
              </p>

              <div className="flex items-center gap-3 pt-1">
                {[
                  { icon: <FaFacebook className="w-5 h-5" />, href: siteConfig.socialLinks.facebook, hover: "hover:bg-blue-600" },
                  { icon: <FaTwitter className="w-5 h-5" />, href: siteConfig.socialLinks.twitter, hover: "hover:bg-sky-500" },
                  { icon: <FaInstagram className="w-5 h-5" />, href: siteConfig.socialLinks.instagram, hover: "hover:bg-pink-600" },
                  { icon: <FaYoutube className="w-5 h-5" />, href: siteConfig.socialLinks.youtube, hover: "hover:bg-red-600" },
                ].map((s, idx) => (
                  <Link key={idx} href={s.href} target="_blank" rel="noopener noreferrer" className={`p-2.5 rounded-full bg-white/10 ${s.hover} text-white transition-all duration-300 transform hover:-translate-y-1 shadow-md`}>
                    {s.icon}
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </Container>
      </div>

      {/* Copyright Bar */}
      <div className="bg-[#1F040A] text-amber-100/70 py-4 border-t border-amber-500/10 text-xs sm:text-sm">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
            <p>
              {t("footer.copyright") || `© ${new Date().getFullYear()} ${siteConfig.organizationNameEn}. सर्वाधिकार सुरक्षित।`}
            </p>
            <p className="text-xs text-amber-200/50">
              राहुल सिंह भदौरिया | उत्तर प्रदेश
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;


