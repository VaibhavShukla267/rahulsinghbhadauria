"use client"
import { Globe2, User, Award, BookOpen } from 'lucide-react';
import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from '@/contexts/TranslationContext';

function Page() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/40 via-white to-amber-50/20 py-10 px-4">
      
      {/* Title Header */}
      <div className="flex items-center flex-col text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-[#641526] text-white px-5 py-2 rounded-2xl shadow-md border border-amber-500/20 font-extrabold text-xl sm:text-2xl">
          <Globe2 className="w-6 h-6 text-[#C79A45]" />
          <span>{t('aboutPage.title') || "परिचय एवं विचार"}</span>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="flex items-center justify-center max-w-5xl mx-auto">
        <Card className="w-full shadow-xl bg-white rounded-3xl border border-amber-900/10 overflow-hidden">
          
          <div className="bg-gradient-to-r from-[#3E0D18] via-[#641526] to-[#3E0D18] text-white p-6 sm:p-8 text-center">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {t('aboutPage.organizationName') || "राहुल सिंह भदौरिया"}
            </h1>
            <p className="text-amber-100/80 text-xs sm:text-sm mt-1">
              जनसेवा, सामाजिक न्याय एवं युवा सशक्तिकरण का संकल्प
            </p>
          </div>

          <CardContent className="p-6 sm:p-10 space-y-8">
            
            {/* Top Portrait & Bio Header */}
            <div className="flex flex-col md:flex-row items-center gap-8 bg-amber-50/50 p-6 rounded-2xl border border-amber-200/60">
              <div className="relative w-48 h-60 shrink-0 rounded-2xl overflow-hidden shadow-lg border-2 border-white">
                <Image
                  src="/AboutMe.png"
                  alt="Rahul Singh Bhadauriya"
                  fill
                  sizes="200px"
                  className="object-cover object-top"
                  priority
                />
              </div>
              <div className="space-y-2 text-center md:text-left">
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#641526]">
                  राहुल सिंह भदौरिया
                </h2>
                <p className="text-amber-800 text-xs font-bold uppercase tracking-wider">
                  युवा समाज सेवी एवं जननेता
                </p>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed pt-2">
                  "समाज के प्रत्येक वर्ग के अधिकारों की रक्षा, युवाओं को आत्मनिर्भर बनाने और संवैधानिक मूल्यों की रक्षा हेतु सदैव समर्पित।"
                </p>
              </div>
            </div>

            {/* Main Paragraphs */}
            <div className="space-y-5 text-gray-700 leading-relaxed text-justify text-base sm:text-lg font-serif">
              {Array.isArray(t('aboutPage.content')) ? (
                t('aboutPage.content').map((para, idx) => (
                  <p key={idx} className="bg-white p-4 rounded-xl border border-amber-100 shadow-2xs">
                    {para}
                  </p>
                ))
              ) : (
                <p className="bg-white p-4 rounded-xl border border-amber-100 shadow-2xs">
                  {t('aboutPage.content')}
                </p>
              )}
            </div>

          </CardContent>
        </Card>
      </div>

    </div>
  );
}

export default Page;
