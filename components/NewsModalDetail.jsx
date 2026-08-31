"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Maximize2, ExternalLink } from 'lucide-react';
import { ImageModal } from './ImageModal';

export const NewsModalDetail = ({ isOpen, newsItem, onClose }) => {
    const [fullImageViewer, setFullImageViewer] = useState(false);

    if (!isOpen || !newsItem) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-200" onClick={onClose}>
                <div 
                    className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative border border-amber-900/10"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button 
                        onClick={onClose} 
                        className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 transition-all z-20 shadow-md cursor-pointer"
                        aria-label="Close"
                    >
                        <X size={20} />
                    </button>

                    {/* Media Display Area */}
                    {newsItem.mediaUrl && (
                        <div 
                            className="relative w-full h-64 sm:h-96 bg-amber-950/90 overflow-hidden cursor-pointer group"
                            onClick={() => {
                                if (newsItem.mediaType !== 'video') {
                                    setFullImageViewer(true);
                                }
                            }}
                        >
                            {newsItem.mediaType === 'video' ? (
                                <video src={newsItem.mediaUrl} className="w-full h-full object-contain" controls autoPlay muted loop />
                            ) : (
                                <>
                                    <Image 
                                        src={newsItem.mediaUrl} 
                                        alt={newsItem.title} 
                                        fill 
                                        className="object-contain transition-transform duration-500 group-hover:scale-105" 
                                        unoptimized 
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-2">
                                        <Maximize2 className="w-5 h-5 text-amber-300" />
                                        <span>तस्वीर बड़ी करके देखें (Zoom Image)</span>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                    
                    {/* Content Section */}
                    <div className="p-6 sm:p-8 space-y-4">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#641526] leading-snug">
                            {newsItem.title}
                        </h2>
                        
                        <div className="w-16 h-1 bg-[#C79A45] rounded-full" />

                        <p className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-serif">
                            {newsItem.summary}
                        </p>

                        {/* Optional External Link */}
                        {newsItem.link && (
                            <div className="pt-4 border-t border-amber-100 flex justify-end">
                                <Link 
                                    href={newsItem.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="inline-flex items-center gap-2 bg-[#641526] hover:bg-[#3E0D18] text-white font-bold text-xs sm:text-sm py-2.5 px-5 rounded-xl shadow-md transition-colors"
                                >
                                    <span>पूरा समाचार स्रोत देखें</span>
                                    <ExternalLink className="w-4 h-4 text-amber-300" />
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Fullscreen Image Lightbox */}
            {fullImageViewer && (
                <ImageModal
                    isOpen={fullImageViewer}
                    onClose={() => setFullImageViewer(false)}
                    imageUrl={newsItem.mediaUrl}
                />
            )}
        </>
    );
};