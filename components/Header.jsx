"use client";
import React from 'react';
import NavBar from './NavBar';

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-amber-900/10 transition-all duration-300">
      <NavBar />
    </header>
  );
}

export default Header;

