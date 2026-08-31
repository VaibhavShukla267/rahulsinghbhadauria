'use client';

import { useState, useEffect } from 'react';
import { getImages } from '@/utils/galleryData';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ImageIcon, Maximize2 } from 'lucide-react';
import { ImageModal } from '@/components/ImageModal';
import { useTranslation } from '@/contexts/TranslationContext';

export default function RecentImages() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchImages = async () => {
      const allImages = await getImages();
      setImages(allImages.slice(0, 3));
      setLoading(false);
    };

    fetchImages();
  }, []);

  const handleImageLoad = (index) => {
    setLoadedImages(prev => ({
      ...prev,
      [index]: true
    }));
  };

  return (
    <section className="w-full py-10">
      <div className="flex flex-row justify-between items-end mb-8 border-b border-amber-100 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#C79A45] uppercase tracking-wider mb-1">
            <ImageIcon className="w-4 h-4" />
            <span>{t('gallery.heading') || "फोटो गैलरी"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#641526]">
            {t('gallery.recentImages') || "ताज़ा तस्वीरें"}
          </h2>
        </div>
        <Link 
          href="/gallery/images" 
          className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#641526] hover:text-[#C79A45] transition-colors group"
        >
          <span>{t('gallery.viewAll') || "सभी तस्वीरें देखें"}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array(3).fill(null).map((_, index) => (
            <Card key={`skeleton-${index}`} className="overflow-hidden rounded-2xl border border-amber-100">
              <div className="aspect-4/3">
                <Skeleton className="w-full h-full bg-amber-50" />
              </div>
            </Card>
          ))
        ) : (
          images.map((imageUrl, index) => (
            <Card 
              key={index} 
              onClick={() => setSelectedImage(imageUrl)}
              className="relative group overflow-hidden rounded-2xl shadow-md hover:shadow-xl border border-amber-100/80 cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="aspect-4/3 relative w-full bg-amber-50 overflow-hidden">
                {!loadedImages[index] && (
                  <Skeleton className="absolute inset-0 bg-amber-100/50" />
                )}
                <Image
                  src={imageUrl}
                  alt={`गैलरी फोटो ${index + 1}`}
                  fill
                  className={`object-cover transition-transform duration-700 group-hover:scale-110 ${
                    loadedImages[index] ? 'opacity-100' : 'opacity-0'
                  }`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading={index < 2 ? 'eager' : 'lazy'}
                  onLoad={() => handleImageLoad(index)}
                  unoptimized
                />
                
                {/* Overlay hover effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-4">
                  <div className="p-3 bg-white/90 backdrop-blur-md rounded-full text-[#641526] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <ImageModal 
          isOpen={!!selectedImage} 
          onClose={() => setSelectedImage(null)} 
          imageUrl={selectedImage} 
        />
      )}
    </section>
  );
}

