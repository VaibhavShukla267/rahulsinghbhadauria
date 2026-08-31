"use client"
import Container from '@/components/Container';
import { useTranslation } from '@/contexts/TranslationContext';
import React from 'react';
import { Award, UserCheck, Sparkles } from 'lucide-react';

function Page() {
  const { t } = useTranslation();
  
  const leaders = [
    {
      name: t('leadership.kalamName'),
      role: t('leadership.kalamRole'),
      quote: t('leadership.kalamQuote'),
      tag: t('leadership.kalamTag'),
      image: "/galaryImage/Abdul kalam.png"
    },
    {
      name: t('leadership.atalName'),
      role: t('leadership.atalRole'),
      quote: t('leadership.atalQuote'),
      tag: t('leadership.atalTag'),
      image: "/galaryImage/AtalBihari.png"
    },
    {
      name: t('leadership.bhagatName'),
      role: t('leadership.bhagatRole'),
      quote: t('leadership.bhagatQuote'),
      tag: t('leadership.bhagatTag'),
      image: "/galaryImage/Bhagat singh.png"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/40 via-white to-amber-50/20 py-10">
      <div className="flex items-center flex-col text-center mb-8 px-4">
        <div className="flex items-center gap-2 text-[#641526] font-bold text-xs sm:text-sm uppercase tracking-widest mb-1">
          <Award className="w-4 h-4 text-[#C79A45]" />
          <span>{t('leadership.heading')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#641526]">
          {t('leadership.subheading')}
        </h1>
        <div className="w-24 h-1.5 bg-[#C79A45] rounded-full mt-3"></div>
      </div>

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
          {leaders.map((leader, index) => (
            <div 
              key={index} 
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-amber-900/10 transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between group"
            >
              <div>
                <div className="relative w-full h-80 bg-amber-50 overflow-hidden">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = leader.image.replace(/ /g, '%20');
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  <div className="absolute bottom-3 left-4 right-4 text-white z-10">
                    <span className="inline-block bg-[#C79A45] text-white text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1 shadow-xs">
                      {leader.tag}
                    </span>
                    <h2 className="text-xl font-extrabold drop-shadow-md text-amber-100 leading-tight">
                      {leader.name}
                    </h2>
                    <p className="text-xs text-amber-200 font-medium drop-shadow-xs">
                      {leader.role}
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-white">
                  <div className="flex gap-2">
                    <Sparkles className="w-4 h-4 text-[#C79A45] shrink-0 mt-1" />
                    <p className="text-gray-700 text-sm italic leading-relaxed font-serif">
                      "{leader.quote}"
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-amber-100/60 flex items-center justify-between text-xs font-semibold text-[#641526]">
                <span className="flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-[#C79A45]" />
                  {t('leadership.badge')}
                </span>
                <span className="w-2 h-2 rounded-full bg-[#C79A45]"></span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Page;
