import Image from "next/image";
import React from "react";
import Container from "./Container";
import Link from "next/link";
import NavBarOptions from "./NavBarOptions";

const NavBar = () => {
  return (
    <div className="py-2 px-2 sm:px-4">
      <Container className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
          <div className="relative w-10 h-10 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-[#C79A45] shadow-xs group-hover:scale-105 transition-transform duration-300 shrink-0">
            <Image 
              src="/favicon.ico" 
              alt="Rahul Singh Bhadauria Logo" 
              fill
              sizes="(max-width: 640px) 40px, 56px"
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm sm:text-base md:text-lg text-[#641526] leading-tight">
              राहुल सिंह भदौरिया
            </span>
            <span className="text-[10px] sm:text-xs text-amber-800 font-medium tracking-wide">
              आधिकारिक पोर्टल
            </span>
          </div>
        </Link>
      
        <NavBarOptions />
      </Container>
    </div>
  );
};

export default NavBar;
