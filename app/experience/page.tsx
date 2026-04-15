"use client";
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useVelocity, useMotionValueEvent, useTransform } from 'framer-motion';
import Navbar from '@/app/components/Navbar';
import ScrambleText from '@/app/components/ui/ScrambleText';
import { jobs } from './data/jobs';

export default function ExperiencePage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
    const [velocity, setVelocity] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    // Shutter Loader Effect
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    useMotionValueEvent(smoothVelocity, "change", (latest) => {
        setVelocity(Math.round(latest));
    });

    return (
        <main
            ref={containerRef}
            className="relative min-h-screen text-[#E0E0E0] selection:bg-[#E0E0E0] selection:text-[#050505] overflow-x-hidden perspective-2000 antialiased"
        >
            {/* --- THE SHUTTER (LOADER) --- */}
            <div className="fixed inset-0 z-[100] pointer-events-none flex flex-col">
                <motion.div
                    initial={{ height: "50%" }}
                    animate={{ height: isLoaded ? "0%" : "50%" }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    className="w-full bg-[#050505] border-b border-white/10"
                />
                <motion.div
                    initial={{ height: "50%" }}
                    animate={{ height: isLoaded ? "0%" : "50%" }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    className="w-full bg-[#050505] border-t border-white/10"
                />
            </div>

            {/* --- ATMOSPHERE --- */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                {/* Removed opaque bg-[#020202] to allow global SystemBackground to show */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                    style={{
                        backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')"
                    }}
                />

                {/* Calibration Spine */}
                <div className="absolute left-[8%] md:left-[50%] top-0 bottom-0 w-px bg-white/[0.03]">
                    <motion.div
                        initial={{ height: "0%" }}
                        animate={{ height: "100%" }}
                        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.8 }}
                        className="w-full bg-gradient-to-b from-transparent via-white/[0.2] to-transparent"
                    />
                </div>
            </div>

            <Navbar />

            {/* --- CONTENT --- */}
            <div className="relative z-10 pt-24 md:pt-32 pb-40">

                {/* HEADER */}
                <header
                    className="mb-[10vh] md:mb-[15vh] px-6 md:px-0 max-w-[1800px] mx-auto text-center relative selection:bg-none perspective-1000 py-12 md:py-20"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.95 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                        className="relative inline-block"
                    >
                        <h1 className="text-[15vw] md:text-[13vw] leading-[0.8] font-playfair font-medium text-[#E0E0E0] mix-blend-difference select-none tracking-tighter relative z-10">
                            <ScrambleText text="ARCHIVE" trigger="auto" scrambleSpeed={40} />
                        </h1>
                        <span className="absolute top-0 left-0 text-[15vw] md:text-[13vw] leading-[0.8] font-playfair font-medium text-white/5 tracking-tighter blur-sm -z-10 translate-y-2 md:translate-y-4">ARCHIVE</span>

                        <div className="absolute inset-0 flex items-center justify-center z-20 translate-y-12 md:translate-y-24">
                            <p className="text-[9px] md:text-xs font-light text-white/40 tracking-[0.6em] uppercase font-mono bg-[#050505]/50 px-4 py-1 backdrop-blur-sm">
                                Selected Works
                            </p>
                        </div>
                    </motion.div>

                    <div className="w-px h-12 md:h-16 bg-gradient-to-b from-white/10 to-transparent mx-auto mt-8 md:mt-12 mb-4" />
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: isLoaded ? 1 : 0, rotate: 360 }}
                        transition={{ scale: { duration: 1, delay: 1 }, rotate: { duration: 60, repeat: Infinity, ease: "linear" } }}
                        className="w-2 h-2 bg-white/80 rotate-45 mx-auto"
                    />
                </header>

                {/* THE LIVING ARCHIVE GALLERY */}
                <div className="flex flex-col gap-[10vh] md:gap-[15vh] max-w-[1400px] mx-auto px-6 md:px-12">
                    {jobs.map((job, i) => (
                        <KineticModule key={job.id} job={job} index={i} isLoaded={isLoaded} />
                    ))}
                </div>
            </div>

            {/* SIGNATURE FOOTER */}
            <div className="h-[20vh] flex flex-col items-center justify-center relative z-10 gap-6 opacity-40">
                <div className="w-px h-12 bg-white/20" />
                <span className="text-2xl font-serif italic text-white/60">Fin.</span>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-3 h-3 border border-white/30 rotate-45"
                />
            </div>
        </main>
    );
}

function KineticModule({ job, index, isLoaded }: { job: any, index: number, isLoaded: boolean }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const springConfig = { mass: 0.1, stiffness: 150, damping: 20 };

    const rawY = useTransform(scrollYProgress, [0, 1], [60, -60]);
    const springY = useSpring(rawY, springConfig);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    // Parallax for Background Number - Now Smoothed
    const rawParallax = useTransform(scrollYProgress, [0, 1], [-100, 100]);
    const parallaxY = useSpring(rawParallax, springConfig);

    const isEven = index % 2 === 0;

    return (
        <motion.article
            ref={ref}
            style={{ opacity }}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.98 }}
            transition={{ duration: 1, delay: 0.8 + (index * 0.1) }}
            className={`
                relative min-h-[40vh] flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} 
                items-center gap-8 md:gap-24 group perspective-1000 will-change-transform
            `}
        >
            {/* PARALLAX ETCHED NUMBER */}
            <motion.div
                style={{ y: parallaxY }} // Parallax movement
                className={`absolute top-0 ${isEven ? 'left-0 md:left-[-5%]' : 'right-0 md:left-auto md:right-[-5%]'} z-0 pointer-events-none select-none opacity-20`}
            >
                <span
                    className="text-[6rem] md:text-[20rem] font-bebas leading-none tracking-tighter text-transparent mix-blend-overlay"
                    style={{
                        WebkitTextStroke: '2px rgba(255,255,255,0.08)',
                    }}
                >
                    {String(index + 1).padStart(2, '0')}
                </span>
            </motion.div>

            {/* MAIN MODULE (Holographic Glass Card) */}
            <motion.div
                style={{ y: springY }}
                whileHover={{ scale: 1.02, rotateX: isEven ? 1 : -1, rotateY: isEven ? -1 : 1 }} // Magnetic Tilt
                transition={{ type: "spring", ...springConfig, stiffness: 300 }} // Stiffness 300 for hover (snappier)
                className="flex-1 w-full md:w-auto relative z-10 will-change-transform"
            >
                <div className="
                    relative overflow-hidden
                    p-6 md:p-10
                    border border-white/10 bg-white/[0.02] backdrop-blur-[4px]
                    group-hover:border-white/20 group-hover:bg-white/[0.03]
                    transition-colors duration-500
                ">
                    {/* Holographic Shine Overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-overlay bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] duration-1000 ease-in-out" />

                    {/* Technical Ornaments */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/40" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/40" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40" />
                    <div className="absolute top-1/2 left-0 w-1 h-3 -translate-y-1/2 bg-white/20" />
                    <div className="absolute top-1/2 right-0 w-1 h-3 -translate-y-1/2 bg-white/20" />

                    {/* Metadata Header */}
                    <div className="flex flex-col gap-2 mb-8 relative z-10">
                        <div className="flex flex-wrap justify-between items-baseline gap-2">
                            <h2 className="text-2xl md:text-5xl font-playfair font-medium text-white leading-none tracking-tight">
                                <ChromaticText text={job.role} />
                            </h2>
                            <span className="text-[9px] md:text-xs font-mono text-white/50 bg-white/5 px-3 py-1 rounded-full border border-white/5">{job.period}</span>
                        </div>

                        <h3 className="text-sm md:text-lg font-playfair italic text-white/60 tracking-wide">{job.company}</h3>
                    </div>

                    {/* Content */}
                    <div className="max-w-2xl relative z-10">
                        <p className="text-sm md:text-base text-[#D4D4D8] font-sans font-light leading-relaxed mb-8 text-justify opacity-90">
                            {job.description}
                        </p>

                        {/* Metrics */}
                        <div className="flex flex-wrap gap-4 md:gap-8 border-t border-white/5 pt-6">
                            {job.metrics.slice(0, 3).map((m: any) => (
                                <div key={m.label}>
                                    <div className="text-[9px] uppercase tracking-widest text-[#71717A] mb-1">{m.label}</div>
                                    <div className="text-xs md:text-sm font-mono text-[#E4E4E7]">
                                        <ScrambleText text={m.value} trigger="hover" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* MAGNETIC REVEAL - "Outcomes" (Modified for touch/mobile) */}
            <motion.div
                className={`w-full md:w-[280px] relative z-10 ${isEven ? 'pl-0 md:pl-6' : 'pr-0 md:pr-6 text-left md:text-right'} group/reveal`}
                initial="collapsed"
                whileHover="expanded"
                whileTap="expanded" // Enable tap interaction on mobile
            >
                <div className={`flex items-center gap-4 cursor-pointer py-2 ${!isEven && 'flex-row md:flex-row-reverse'}`}>
                    <div className="w-1.5 h-1.5 rounded-full border border-white/20 group-hover/reveal:bg-white transition-colors" />
                    <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase group-hover/reveal:text-white transition-colors">
                        Outcomes
                    </span>
                    <div className="h-px flex-1 bg-white/10 group-hover/reveal:bg-white/30 transition-colors" />
                </div>

                <motion.div
                    variants={{
                        collapsed: { height: 0, opacity: 0, marginTop: 0 },
                        expanded: { height: 'auto', opacity: 1, marginTop: 16 }
                    }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                >
                    <ul className={`space-y-3 ${isEven ? 'border-l pl-4' : 'border-l pl-4 md:border-l-0 md:border-r md:pl-0 md:pr-4'} border-white/10 py-2`}>
                        {job.achievements.map((ach: string, i: number) => (
                            <li key={i} className="text-[11px] text-[#A1A1AA] font-light leading-relaxed hover:text-white transition-colors">
                                {ach}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </motion.div>

        </motion.article>
    );
}

// Chromatic Text Component
function ChromaticText({ text }: { text: string }) {
    return (
        <span className="relative inline-block group/text cursor-default">
            <span className="relative z-10">{text}</span>
            <span className="absolute top-0 left-0 -z-10 text-red-500 opacity-0 group-hover/text:opacity-70 group-hover/text:-translate-x-0.5 transition-all duration-300 mix-blend-screen px-[0.05em]">{text}</span>
            <span className="absolute top-0 left-0 -z-10 text-cyan-500 opacity-0 group-hover/text:opacity-70 group-hover/text:translate-x-0.5 transition-all duration-300 mix-blend-screen px-[0.05em]">{text}</span>
        </span>
    );
}
