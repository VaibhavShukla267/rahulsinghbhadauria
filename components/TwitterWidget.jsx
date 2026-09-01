"use client"
import React from 'react';
import { MousePointerClickIcon } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import { useTranslation } from '@/contexts/TranslationContext';
import siteConfig from '@/config/siteConfig';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

function TwitterWidget() {
  const { t } = useTranslation();

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-6 md:py-12 my-4">
      {/* Responsive Animated Header Badge */}
      <div className="flex justify-center mb-8 md:mb-12 text-center">
        <div className="bg-gradient-to-r from-amber-100 via-amber-200 to-amber-100 text-[#641526] border border-amber-300/80 shadow-md px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl text-sm sm:text-lg md:text-xl font-bold flex items-center justify-center gap-2 max-w-full">
          <MousePointerClickIcon className="w-4 h-4 sm:w-6 sm:h-6 text-[#C79A45] shrink-0" />
          <TypeAnimation
            sequence={[
              t('social.Heading1') || "Follow Us on Social Media",
              5000,
              t('social.Heading2') || "Join Our Community",
              3000
            ]}
            wrapper="span"
            speed={50}
            style={{ display: 'inline-block', textAlign: 'center' }}
            repeat={Infinity}
          />
        </div>
      </div>

      {/* Main Widgets Container - Centered on Mobile */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 w-full max-w-5xl mx-auto">
        {/* Facebook Page Widget Card */}
        <div className="w-full max-w-[340px] h-[500px] bg-white rounded-2xl shadow-lg border border-amber-900/10 overflow-hidden flex flex-col items-center justify-center transition-all hover:shadow-xl shrink-0">
          <iframe
            src={siteConfig.founder.facebookWidgetSrc}
            height="500"
            className="border-none overflow-hidden w-full max-w-[340px] h-[500px]"
            scrolling="no"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            title={`${siteConfig.founder.name} Facebook Page`}
          ></iframe>
        </div>

        {/* Instagram Widget Card */}
        <div className="w-full max-w-[340px] h-[500px] flex flex-col justify-between items-center p-6 sm:p-8 bg-gradient-to-tr from-amber-50/80 via-pink-50/60 to-purple-50/80 rounded-2xl shadow-lg border border-pink-200/80 transition-all hover:shadow-xl shrink-0">
          <div className="flex flex-col items-center gap-y-4 my-auto text-center">
            {/* Instagram Logo Icon */}
            <div className="w-20 h-20 bg-gradient-to-tr from-amber-500 via-red-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </div>

            {/* Account Details */}
            <div>
              <h2 className="text-xl font-extrabold text-gray-900">{siteConfig.founder.name}</h2>
              <p className="text-sm text-pink-600 font-bold mt-0.5">@rsb27official</p>
            </div>

            <p className="text-xs text-gray-600 max-w-[250px] mt-1 leading-relaxed">
              ताज़ा अपडेट्स, तस्वीरों एवं वीडियो के लिए इंस्टाग्राम पर फॉलो करें।
            </p>
          </div>

          {/* Action Button */}
          <a
            href={siteConfig.socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center py-3 bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 hover:from-amber-600 hover:via-pink-600 hover:to-purple-700 text-white font-extrabold rounded-xl shadow-md transition-all duration-300 transform active:scale-95"
          >
            Visit Profile
          </a>
        </div>
      </div>

      {/* Quick Direct Social Links Bar */}
      <div className="mt-8 pt-6 border-t border-amber-100 flex flex-col items-center gap-3">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
          {t('footer.followUs') || "सोशल मीडिया प्लेटफॉर्म्स"}
        </p>
        <div className="flex items-center gap-3">
          {[
            { icon: <FaFacebook className="w-5 h-5" />, href: siteConfig.socialLinks.facebook, color: "bg-blue-600 hover:bg-blue-700" },
            { icon: <FaTwitter className="w-5 h-5" />, href: siteConfig.socialLinks.twitter, color: "bg-sky-500 hover:bg-sky-600" },
            { icon: <FaInstagram className="w-5 h-5" />, href: siteConfig.socialLinks.instagram, color: "bg-pink-600 hover:bg-pink-700" },
            { icon: <FaYoutube className="w-5 h-5" />, href: siteConfig.socialLinks.youtube, color: "bg-red-600 hover:bg-red-700" },
          ].map((s, idx) => (
            <Link
              key={idx}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-full ${s.color} text-white shadow-md transition-all duration-300 transform hover:-translate-y-1 active:scale-90`}
            >
              {s.icon}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TwitterWidget;

