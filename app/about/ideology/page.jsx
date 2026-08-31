"use client"
import { Feather, Quote } from 'lucide-react'
import React from 'react'
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from '@/contexts/TranslationContext';

function Page() {
  const { t } = useTranslation();
  
  return (
    <div className='min-h-screen bg-gradient-to-b from-amber-50/40 via-white to-amber-50/20 py-10 px-4'>
      <div className="flex items-center flex-col text-center">
        <h1 className="text-3xl sm:text-4xl font-bold pt-10 pb-8 flex items-center gap-2 text-[#641526]">
          <Feather className="text-[#C79A45]" /> {t('ideology.heading')}
        </h1>
        <div className="w-[100px] h-[10px] bg-[#641526] rounded-3xl mb-10 relative -top-4"></div>
      </div>
      <div className="flex items-center justify-center p-4 mt-2 bg-transparent">
        <Card className="max-w-4xl md:p-8 shadow-xl bg-white rounded-3xl border border-amber-900/10 mb-20">
          <CardContent className="pt-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-center text-[#641526] mb-6">
              {t('ideology.heading2')}
            </h2>
            <div className="border-l-4 border-[#C79A45] pl-6 md:text-lg text-gray-800 italic flex items-start bg-amber-50/40 p-6 rounded-r-2xl">
              <Quote className="text-[#641526] w-16 md:w-20 shrink-0 mr-3 mt-1 opacity-80" />
              <p className="leading-relaxed font-serif">
                {t('ideology.para')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Page;
