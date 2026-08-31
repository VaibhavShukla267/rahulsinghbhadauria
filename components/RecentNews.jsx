'use client';

import { useState, useEffect } from 'react';
import { getNews } from '@/utils/galleryData';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Newspaper, PlayCircle, Maximize2 } from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';
import { NewsModalDetail } from './NewsModalDetail';

export default function RecentNews() {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchNews = async () => {
      const allNews = await getNews();
      setNewsItems(allNews.slice(0, 3));
      setLoading(false);
    };

    fetchNews();
  }, []);

  return (
    <>
      <section className="w-full py-8">
        <div className="flex flex-row justify-between items-end mb-6 border-b border-amber-100 pb-3">
          <div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#C79A45] uppercase tracking-wider mb-1">
              <Newspaper className="w-4 h-4" />
              <span>{t('gallery.newsGallery') || "समाचार व प्रेस रिलीज़"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#641526]">
              {t('gallery.recentNews') || "हालिया मुख्य समाचार"}
            </h2>
          </div>
          <Link 
            href="/gallery/news" 
            className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#641526] hover:text-[#C79A45] transition-colors group"
          >
            <span>{t('gallery.viewAll') || "सभी समाचार देखें"}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array(3).fill(null).map((_, index) => (
              <div key={`skeleton-${index}`} className="bg-white rounded-xl border border-amber-100 shadow-sm overflow-hidden">
                <Skeleton className="w-full h-48 bg-amber-50" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-6 w-3/4 bg-amber-100/50" />
                  <Skeleton className="h-4 w-full bg-amber-100/40" />
                </div>
              </div>
            ))
          ) : (
            newsItems.map((item, index) => (
              <div 
                key={index} 
                className="group flex cursor-pointer"
                onClick={() => setSelectedNews(item)}
              >
                <Card className="overflow-hidden rounded-2xl shadow-md hover:shadow-xl border border-amber-900/10 transition-all duration-300 flex flex-col justify-between w-full bg-white transform hover:-translate-y-1">
                  <div>
                    <div className="relative w-full h-52 bg-amber-950/90 overflow-hidden">
                      {item.mediaType === 'video' ? (
                        <div className="relative w-full h-full">
                          <video
                            src={item.mediaUrl}
                            poster={item.thumbnailUrl} 
                            className="w-full h-full object-cover"
                            preload="metadata"
                          />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <PlayCircle className="w-12 h-12 text-white/90 drop-shadow-md" />
                          </div>
                        </div>
                      ) : (
                        <>
                          <Image
                            src={item.mediaUrl}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            unoptimized
                          />
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1.5">
                            <Maximize2 className="w-4 h-4 text-amber-300" />
                            <span>समाचार पढ़ें / फ़ोटो देखें</span>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="p-5">
                      <h3 className="text-base sm:text-lg font-bold text-[#641526] group-hover:text-[#801B31] transition-colors line-clamp-2 leading-snug mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm line-clamp-3 leading-relaxed font-serif">
                        {item.summary}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-4 pt-1 flex items-center text-xs font-bold text-[#641526] group-hover:text-[#C79A45]">
                    <span>विवरण पढ़ें</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Modal Detail & Fullscreen Image Viewer */}
      <NewsModalDetail
        isOpen={!!selectedNews}
        newsItem={selectedNews}
        onClose={() => setSelectedNews(null)}
      />
    </>
  );
}