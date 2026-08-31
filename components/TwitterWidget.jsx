"use client"
import React from 'react';
import { MousePointerClickIcon } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import { useTranslation } from '@/contexts/TranslationContext';
import siteConfig from '@/config/siteConfig';

function TwitterWidget() {
  const { t } = useTranslation();
  return (
    <div className="max-w-6xl mx-auto p-6 justify-center rounded-xl mb-16">
      <h1 className="text-md md:text-3xl relative left-1/2 -translate-x-1/2 font-bold bg-yellow-200 px-4 py-2 inline-block rounded-md mb-16 mt-8 md:mt-16 md:mb-32">
        <div className="flex items-center gap-x-2">
          <MousePointerClickIcon className="relative -top-0.5 w-4 md:w-8"/>
          <TypeAnimation
            sequence={[
              t('social.Heading1'),
              5000,
              t('social.Heading2'),
              3000
            ]}
            wrapper="span"
            speed={50}
            style={{ display: 'inline-block' ,textAlign: 'center'}}
            repeat={Infinity}
          />
        </div>
      </h1>
      <div className="flex flex-col md:flex-row flex-wrap md:justify-evenly gap-8 w-full">
        {/* <div className="rounded-lg mb-16 md:mb-0 shadow-md transition-all bg-white hover:shadow-lg">
          <iframe
            src={siteConfig.organization.facebookWidgetSrc}
            height="500"
            className="border-none overflow-hidden w-[270px] md:w-[340px]"
            scrolling="no"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            title={`${siteConfig.organizationNameEn} Facebook Page`}
          ></iframe>
        </div> */}
        <div className="max-w-md overflow-hidden shadow-md transition-all bg-white hover:shadow-lg">
          <iframe
            src={siteConfig.founder.facebookWidgetSrc}
            height="500"
            className="border-none overflow-hidden w-[270px] md:w-[340px]"
            scrolling="no"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            title={`${siteConfig.founder.name} Facebook Page`}
          ></iframe>
        </div>

        {/* Instagram Widget Card */}
        <div className="w-[270px] md:w-[340px] h-[500px] flex flex-col justify-between items-center p-8 bg-gradient-to-tr from-yellow-50 via-pink-50 to-purple-50 rounded-lg shadow-md transition-all hover:shadow-lg border border-pink-100">
          <div className="flex flex-col items-center gap-y-4 my-auto">
            {/* Instagram Logo */}
            <div className="w-20 h-20 bg-gradient-to-tr from-amber-500 via-red-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </div>
            
            {/* Account Details */}
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-800">Rahul Singh Bhadauria</h2>
              <p className="text-sm text-pink-600 font-semibold mt-0.5">@rsb27official</p>
            </div>
            
            <p className="text-xs text-gray-500 text-center max-w-[240px] mt-2">
              Follow on Instagram for the latest updates, pictures, and events.
            </p>
          </div>
          
          {/* Action Button */}
          <a
            href={siteConfig.socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center py-3 bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 hover:from-amber-600 hover:via-pink-600 hover:to-purple-700 text-white font-bold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
          >
            Visit Profile
          </a>
        </div>
      </div>
    </div>
  );
}

export default TwitterWidget;

