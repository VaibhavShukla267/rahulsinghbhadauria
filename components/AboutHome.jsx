"use client";
import { BookOpen, ChevronRight, Award, ShieldCheck, Heart, Sparkles } from "lucide-react";
import Image from "next/image";
import { useTranslation } from '@/contexts/TranslationContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function AboutUs() {
  const { t } = useTranslation();

  return (
    <section className="relative my-12 md:my-20 px-4">
      
      {/* Outer Card Container */}
      <div className="bg-gradient-to-b from-amber-50/50 via-white to-amber-50/30 rounded-3xl p-6 sm:p-10 md:p-12 shadow-xl border border-amber-900/10 max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14 overflow-hidden relative">
        
        {/* Background Subtle Accent */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl -z-0 pointer-events-none" />

        {/* Left Column - Founder Image Frame */}
        <div className="w-full lg:w-5/12 flex flex-col items-center relative z-10">
          <div className="relative w-64 h-80 sm:w-80 sm:h-96 md:w-88 md:h-[420px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-amber-900/10 group">
            <Image
              src="/AboutMe.png"
              alt="Rahul Singh Bhadauriya"
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 right-4 text-white text-center">
              <p className="font-extrabold text-lg sm:text-xl drop-shadow-md">राहुल सिंह भदौरिया</p>
              <p className="text-amber-300 text-xs font-bold tracking-wider uppercase drop-shadow-sm">युवा नेता एवं समाजसेवी</p>
            </div>
          </div>

          {/* Core Values Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-4 max-w-xs">
            <span className="bg-amber-100/80 text-[#641526] text-xs font-bold px-3 py-1 rounded-full border border-amber-300/60 shadow-2xs">
              #जनसेवा
            </span>
            <span className="bg-amber-100/80 text-[#641526] text-xs font-bold px-3 py-1 rounded-full border border-amber-300/60 shadow-2xs">
              #युवा_सशक्तिकरण
            </span>
            <span className="bg-amber-100/80 text-[#641526] text-xs font-bold px-3 py-1 rounded-full border border-amber-300/60 shadow-2xs">
              #सामाजिक_न्याय
            </span>
          </div>
        </div>

        {/* Right Column - Text & Biography */}
        <div className="w-full lg:w-7/12 flex flex-col justify-center relative z-10">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-[#641526] font-extrabold text-xs sm:text-sm w-fit mb-3 border border-amber-300/60">
            <BookOpen className="w-4 h-4 text-[#C79A45]" />
            <span>{t('about.aboutOrg') || "परिचय एवं विचार"}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#641526] leading-tight mb-3 tracking-tight">
            {t('about.orgName') || "राहुल सिंह भदौरिया"}
          </h2>

          <div className="w-24 h-1.5 bg-gradient-to-r from-[#641526] to-[#C79A45] rounded-full mb-6" />

          {/* Description Paragraphs */}
          <div className="space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed text-justify">
            <p className="bg-amber-50/40 p-4 rounded-2xl border border-amber-200/50">
              {t('about.description1')}
            </p>

            {t('about.description2') && (
              <p className="text-gray-600">
                {t('about.description2')}
              </p>
            )}
          </div>

          {/* Key Achievements/Focus Bar */}
          <div className="grid grid-cols-3 gap-3 my-6 pt-2 border-t border-amber-100">
            <div className="text-center p-2 rounded-xl bg-amber-50/60 border border-amber-200/40">
              <ShieldCheck className="w-5 h-5 text-[#C79A45] mx-auto mb-1" />
              <p className="text-xs font-bold text-gray-800">अधिकार रक्षा</p>
            </div>
            <div className="text-center p-2 rounded-xl bg-amber-50/60 border border-amber-200/40">
              <Sparkles className="w-5 h-5 text-[#C79A45] mx-auto mb-1" />
              <p className="text-xs font-bold text-gray-800">युवा प्रेरणा</p>
            </div>
            <div className="text-center p-2 rounded-xl bg-amber-50/60 border border-amber-200/40">
              <Heart className="w-5 h-5 text-[#C79A45] mx-auto mb-1" />
              <p className="text-xs font-bold text-gray-800">जन कल्याण</p>
            </div>
          </div>

          {/* Full Story Dialog Trigger */}
          <div className="flex justify-end pt-1">
            <Dialog>
              <DialogTrigger asChild>
                <button className="flex items-center gap-2 bg-[#641526] hover:bg-[#3E0D18] text-white px-6 py-3 rounded-xl font-extrabold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.99] cursor-pointer">
                  <span>{t('about.readMore') || "पूरा पढ़ें"}</span>
                  <ChevronRight className="w-4 h-4 text-[#E4C77A]" />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl p-6 sm:p-8 bg-white border border-amber-900/10">
                <DialogHeader className="border-b border-amber-100 pb-4 mb-4">
                  <DialogTitle className="text-2xl sm:text-3xl font-extrabold text-[#641526] flex items-center gap-2">
                    <Award className="w-6 h-6 text-[#C79A45]" />
                    <span>{t('dialog.title') || "राहुल सिंह भदौरिया - विस्तृत परिचय"}</span>
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 text-gray-700 leading-relaxed text-justify sm:text-base">
                  {Array.isArray(t('dialog.content')) ? (
                    t('dialog.content').map((para, idx) => (
                      <p key={idx} className="bg-amber-50/50 p-4 rounded-xl border border-amber-200/60">
                        {para}
                      </p>
                    ))
                  ) : (
                    <p className="bg-amber-50/50 p-4 rounded-xl border border-amber-200/60">
                      {t('dialog.content')}
                    </p>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>

        </div>
      </div>
    </section>
  );
}
