"use client";
import React, { useState, useEffect } from 'react';

export default function SystemFooter() {
    const [time, setTime] = useState('');
    const [latency, setLatency] = useState(12);

    useEffect(() => {
        // Clock tick
        const timer = setInterval(() => {
            const now = new Date();
            setTime(now.toISOString().split('T')[1].split('.')[0] + ' UTC');

            // Sim latency fluctuation
            if (Math.random() > 0.8) {
                setLatency(Math.floor(Math.random() * 20) + 10);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <footer className="relative border-t border-[var(--color-border)] py-12 overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px),
                    linear-gradient(to bottom, #fff 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 opacity-60">
                {/* LEFT: STATUS */}
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_5px_#10B981]" />
                        <span className="text-[9px] font-mono text-[var(--fg-muted)] tracking-widest uppercase">SYSTEM ONLINE</span>
                    </div>
                    <div className="hidden md:flex items-center gap-2 border-l border-[var(--color-border)] pl-4">
                        <span className="text-[9px] font-mono text-[var(--fg-muted)]">LATENCY:</span>
                        <span className="text-[9px] font-mono text-emerald-500">{latency}ms</span>
                    </div>
                </div>

                {/* CENTER: BUILD INFO (Mobile Hidden) */}
                <div className="hidden md:block">
                    <span className="text-[9px] font-mono text-[var(--fg-muted)] tracking-[0.2em] uppercase">
                        CTO_PORTFOLIO // V.3.0.0 // PRODUCTION
                    </span>
                </div>

                {/* RIGHT: TIME & LOC */}
                <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-2 border-r border-[var(--color-border)] pr-4">
                        <span className="text-[9px] font-mono text-[var(--fg-muted)]">LOC:</span>
                        <span className="text-[9px] font-mono text-[var(--fg-muted)]">33.68°N, 73.04°E</span>
                    </div>
                    <span className="text-[9px] font-mono text-[var(--fg-muted)] w-16 text-right">
                        {time}
                    </span>
                </div>
            </div>
        </footer>
    );
}