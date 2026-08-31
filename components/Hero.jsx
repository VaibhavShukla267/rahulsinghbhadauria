"use client";
import React from 'react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#3E0D18] shadow-md" id="hero">
      <div className="relative w-full aspect-[21/9] min-h-[160px] xs:min-h-[200px] sm:min-h-[340px] max-h-[620px] flex items-center justify-center">
        <Image
          src="/Hero%20image.png"
          alt="Rahul Singh Bhadauria Banner"
          fill
          priority
          sizes="100vw"
          className="object-contain object-top w-full h-full"
        />
        {/* Subtle Bottom Ambient Overlay for Seamless Transition */}
        <div className="absolute inset-x-0 bottom-0 h-6 sm:h-10 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
