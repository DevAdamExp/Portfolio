"use client";
import HeroSection from "./components/HeroSection";
import ExperienceSection from "./components/ExperienceSection";

const SkillsSection = dynamic(() => import("./components/SkillsSection"), { ssr: false });
const ProjectsSection = dynamic(() => import("./components/ProjectsSection"), { ssr: false });
const MethodologySection = dynamic(() => import("./components/MethodologySection"), { ssr: false });
const Navbar = dynamic(() => import("./components/Navbar"), { ssr: true }); // Keep Navbar critical
import LoadingScreen from "./components/LoadingScreen";
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from "framer-motion";
import dynamic from 'next/dynamic';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className={`relative min-h-screen text-[var(--fg-cinema)] selection:bg-[var(--acc-red)] selection:text-white ${isLoading ? 'h-screen overflow-hidden' : 'overflow-x-hidden'}`}>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <Navbar />

      {/* Scrollable Sections - Rendered immediately so they are visible upon reveal */}
      <HeroSection />
      <ExperienceSection />
      <SkillsSection />
      <MethodologySection />
      <ProjectsSection />

    </main>
  );
}
