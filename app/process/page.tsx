"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import PhaseNeuron from './components/PhaseNeuron';
import SynapticPath from './components/SynapticPath';
import ContentPanel from './components/ContentPanel';
import FloatingMetadata from './components/FloatingMetadata';
import Navbar from '../components/Navbar';
import { phases } from './data/phases';

// Node positions for the neural network (calculated for SVG viewBox)
const nodePositions = [
    { x: 150, y: 120 },
    { x: 350, y: 120 },
    { x: 550, y: 120 },
    { x: 750, y: 120 }
];

const terminalLines = [
    { prompt: 'var(--fg-cinema)', text: ' initializing neural_algorithm v3.0...', accent: false },
    { prompt: 'var(--fg-cinema)', text: ' loading cognitive_frameworks...', accent: false },
    { prompt: 'var(--fg-cinema)', text: ' mapping problem_space...', accent: false },
    { prompt: 'var(--acc-red)',   text: ' READY: awaiting problem input', accent: true },
];

export default function ProcessPage() {
    const [activePhase, setActivePhase] = useState<number | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const handlePhaseClick = (id: number) => {
        setActivePhase(activePhase === id ? null : id);
    };

    const activePhaseData = activePhase
        ? phases.find(p => p.id === activePhase) || null
        : null;

    useEffect(() => {
        if (activePhase && contentRef.current) {
            const timer = setTimeout(() => {
                contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [activePhase]);

    return (
        <main className="relative min-h-screen text-[var(--fg-cinema)] overflow-x-hidden selection:bg-[var(--acc-red)] selection:text-white">
            <Navbar />

            {/* Full width padding wrapper */}
            <div className="relative z-10 pt-32 pb-32 w-full px-6 md:px-12 lg:px-24">
                {/* Centered content container */}
                <div className="max-w-7xl mx-auto">

                    {/* Hero Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-7xl mx-auto mb-20"
                    >
                        {/* Status Bar */}
                        <div className="flex items-center gap-4 mb-8">
                            <motion.div
                                className="w-2 h-2 bg-[var(--acc-red)] rounded-full"
                                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.6, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <span className="text-[10px] font-mono text-[var(--fg-muted)] tracking-[0.3em]">
                                METHODOLOGY_V3.0 // NEURAL_ALGORITHM
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-[15vw] md:text-[12vw] lg:text-[10vw] font-bebas text-[var(--fg-cinema)] leading-[0.85] mb-8">
                            THE
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--acc-red)] via-red-600 to-[var(--acc-red)]">
                                ALGORITHM
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-[var(--fg-muted)] max-w-xl leading-relaxed font-light">
                            A systematic approach to transforming complexity into elegant solutions.
                            Four phases. Infinite iterations. Zero compromises.
                        </p>
                    </motion.div>

                    {/* Neural Network Visualization — Desktop Only */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="hidden md:block max-w-5xl mx-auto mb-24"
                    >
                        <svg
                            viewBox="0 0 900 240"
                            className="w-full h-auto"
                            preserveAspectRatio="xMidYMid meet"
                        >
                            {/* Input Label */}
                            <text x="50" y="125" textAnchor="middle" fill="var(--fg-muted)" fontSize="10" fontFamily="JetBrains Mono, monospace">
                                INPUT
                            </text>
                            <text x="50" y="140" textAnchor="middle" fill="var(--acc-red)" fontSize="9" fontFamily="JetBrains Mono, monospace">
                                PROBLEM
                            </text>

                            {/* Synaptic Paths */}
                            {nodePositions.slice(0, -1).map((pos, i) => (
                                <SynapticPath
                                    key={i}
                                    start={{ x: pos.x + 40, y: pos.y }}
                                    end={{ x: nodePositions[i + 1].x - 40, y: nodePositions[i + 1].y }}
                                    isActive={activePhase !== null && activePhase > i}
                                    delay={i * 0.2}
                                />
                            ))}

                            {/* Phase Neurons */}
                            {phases.map((phase, i) => (
                                <PhaseNeuron
                                    key={phase.id}
                                    id={phase.id}
                                    code={phase.code}
                                    icon={phase.icon}
                                    isActive={activePhase === phase.id}
                                    isCompleted={activePhase !== null && phase.id < activePhase}
                                    onClick={() => handlePhaseClick(phase.id)}
                                    position={nodePositions[i]}
                                />
                            ))}

                            {/* Output Label */}
                            <text x="850" y="125" textAnchor="middle" fill="var(--fg-muted)" fontSize="10" fontFamily="JetBrains Mono, monospace">
                                OUTPUT
                            </text>
                            <text x="850" y="140" textAnchor="middle" fill="#22c55e" fontSize="9" fontFamily="JetBrains Mono, monospace">
                                SOLUTION
                            </text>
                        </svg>
                    </motion.div>

                    {/* Mobile Vertical Process List */}
                    <div className="md:hidden flex flex-col gap-8 mb-24 relative pl-8">
                        {/* Connecting Line — centered on node circles */}
                        <div className="absolute left-[60px] top-4 bottom-4 w-px bg-zinc-800" />

                        {phases.map((phase, i) => (
                            <motion.div
                                key={phase.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + (i * 0.1) }}
                                onClick={() => handlePhaseClick(phase.id)}
                                className="relative flex items-center gap-6 group cursor-pointer"
                            >
                                {/* Node */}
                                <div className={`
                                    relative z-10 w-14 h-14 rounded-full border-2 flex items-center justify-center bg-[#050505] transition-all duration-300 flex-shrink-0
                                    ${activePhase === phase.id
                                        ? 'border-[#D10000] shadow-[0_0_15px_rgba(209,0,0,0.4)] scale-110'
                                        : 'border-zinc-800 group-hover:border-zinc-600'
                                    }
                                `}>
                                    <span className={`text-lg transition-colors ${activePhase === phase.id ? 'text-white' : 'text-zinc-600 group-hover:text-zinc-400'}`}>
                                        {phase.icon}
                                    </span>
                                </div>

                                {/* Text Info */}
                                <div className="flex flex-col min-w-0">
                                    <span className={`text-[10px] font-mono tracking-widest uppercase mb-0.5 transition-colors ${activePhase === phase.id ? 'text-[#D10000]' : 'text-zinc-500'}`}>
                                        Step 0{phase.id}
                                    </span>
                                    <span className={`text-xl font-bebas tracking-wide transition-colors ${activePhase === phase.id ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                                        {phase.code}
                                    </span>
                                    <span className={`text-xs font-mono truncate transition-colors ${activePhase === phase.id ? 'text-zinc-400' : 'text-zinc-700'}`}>
                                        {phase.subtitle}
                                    </span>
                                </div>

                                {/* Active Indicator */}
                                {activePhase === phase.id && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="ml-auto w-1.5 h-1.5 rounded-full bg-[#D10000] flex-shrink-0"
                                    />
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Content Panel — ref used for auto-scroll */}
                    <div ref={contentRef}>
                        <ContentPanel
                            phase={activePhaseData}
                            onClose={() => setActivePhase(null)}
                        />
                    </div>

                    {/* Instruction Text — only when no phase selected */}
                    {!activePhase && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5, duration: 0.8 }}
                            className="text-center mt-16"
                        >
                            <motion.p
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                                className="text-sm font-mono text-[var(--fg-muted)] tracking-widest"
                            >
                                SELECT A PHASE TO EXPLORE
                            </motion.p>
                        </motion.div>
                    )}

                    {/* Terminal Log */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                        className="max-w-3xl mx-auto mt-32"
                    >
                        <div className="bg-[#0A0A0A]/60 backdrop-blur-sm border border-[var(--color-border)] p-6">
                            {/* Window Chrome */}
                            <div className="flex items-center gap-2 mb-5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                                <span className="ml-3 text-[10px] font-mono text-gray-600">neural_algorithm.log</span>
                            </div>

                            <div className="font-mono text-xs space-y-1.5 text-[var(--fg-muted)]">
                                {/* Animated log lines */}
                                {terminalLines.map((line, i) => (
                                    <motion.p
                                        key={i}
                                        initial={{ opacity: 0, x: -8 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 1.4 + i * 0.18, duration: 0.35 }}
                                    >
                                        <span style={{ color: line.prompt }}>&gt;</span>
                                        <span className={line.accent ? 'text-[var(--acc-red)]' : ''}>{line.text}</span>
                                    </motion.p>
                                ))}

                                {/* Comment lines */}
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 2.2, duration: 0.4 }}
                                    className="pt-2 text-zinc-700"
                                >
                                    <span className="text-zinc-600">//</span> This is how I think. Not linear, but iterative.
                                </motion.p>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 2.38, duration: 0.4 }}
                                    className="text-zinc-700"
                                >
                                    <span className="text-zinc-600">//</span> Each phase informs the next. Each iteration refines.
                                </motion.p>

                                {/* Blinking cursor */}
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 2.55, duration: 0.4 }}
                                    className="pt-1 flex items-center gap-0.5"
                                >
                                    <span className="text-[var(--fg-cinema)]">&gt;</span>
                                    <motion.span
                                        className="inline-block w-[7px] h-[13px] bg-[var(--fg-cinema)] ml-0.5 align-middle"
                                        animate={{ opacity: [1, 0, 1] }}
                                        transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
                                    />
                                </motion.p>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* Floating Metadata */}
            <FloatingMetadata
                currentPhase={activePhase}
                totalPhases={phases.length}
            />
        </main>
    );
}
