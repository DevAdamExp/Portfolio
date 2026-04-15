"use client";
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaPaperPlane, FaCopy } from 'react-icons/fa';

type FormState = 'idle' | 'sending' | 'sent';

const STATUS_ITEMS = [
    { label: 'RESPONSE TIME', value: '< 24H' },
    { label: 'STATUS',        value: 'AVAILABLE' },
    { label: 'TIMEZONE',      value: 'PKT +5' },
    { label: 'LOCATION',      value: 'ISLAMABAD' },
];

export default function ContactPage() {
    const [copied, setCopied] = useState(false);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [formState, setFormState] = useState<FormState>('idle');
    const [errors, setErrors] = useState<{ name?: string; message?: string }>({});

    const copyEmail = () => {
        navigator.clipboard.writeText('chaudhrayadam@gmail.com');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const validate = (): boolean => {
        const next: { name?: string; message?: string } = {};
        if (!name.trim())    next.name    = 'DESIGNATION REQUIRED';
        if (!message.trim()) next.message = 'TRANSMISSION CONTENT REQUIRED';
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setFormState('sending');

        const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
        const body    = encodeURIComponent(`Name: ${name}\n\nMessage:\n${message}`);

        setTimeout(() => {
            window.location.href = `mailto:chaudhrayadam@gmail.com?subject=${subject}&body=${body}`;
            setFormState('sent');
        }, 900);
    };

    const handleReset = () => {
        setName('');
        setMessage('');
        setFormState('idle');
        setErrors({});
    };

    return (
        <main className="relative min-h-screen text-[#E0E0E0] overflow-hidden flex flex-col selection:bg-[var(--acc-red)] selection:text-white">
            <Navbar />

            <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-6 pt-24 pb-16 md:pt-20">

                {/* Header Block */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12 max-w-4xl w-full"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <motion.div
                            className="w-2 h-2 bg-[#D10000] rounded-full"
                            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="text-xs font-mono text-[#D10000] tracking-[0.3em] uppercase">
                            Secure Uplink Established
                        </span>
                    </div>

                    <h1 className="text-[13vw] sm:text-7xl md:text-8xl font-bebas text-white leading-[0.85] mb-6">
                        INITIATE
                        <br />
                        <span className="opacity-50">TRANSMISSION</span>
                    </h1>

                    <p className="text-gray-500 font-mono text-sm max-w-xl mx-auto leading-relaxed">
                        Secure channel open for collaboration inquiries, architectural consultations,
                        and system access requests. Response protocols active.
                    </p>
                </motion.div>

                {/* Main Grid */}
                <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">

                    {/* Left: Direct Lines */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-8"
                    >
                        {/* Email Node */}
                        <div className="group relative pl-5">
                            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent group-hover:via-[#D10000]/50 transition-all duration-300" />
                            <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">
                                Direct Frequency
                            </h3>
                            <div className="flex items-center gap-3 flex-wrap">
                                <a
                                    href="mailto:chaudhrayadam@gmail.com"
                                    className="text-lg md:text-2xl font-bebas text-white hover:text-[#D10000] transition-colors tracking-wide break-all"
                                >
                                    CHAUDHRAYADAM@GMAIL.COM
                                </a>
                                <button
                                    onClick={copyEmail}
                                    className="p-2 border border-white/10 hover:bg-white/5 text-gray-400 hover:text-white transition-all flex-shrink-0"
                                    title="Copy email address"
                                    aria-label="Copy email address"
                                >
                                    {copied
                                        ? <span className="text-[10px] font-mono text-green-500 px-1">COPIED</span>
                                        : <FaCopy className="text-xs" />
                                    }
                                </button>
                            </div>
                        </div>

                        {/* GitHub Node */}
                        <div className="group relative pl-5">
                            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent group-hover:via-[#D10000]/50 transition-all duration-300" />
                            <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">
                                Code Repository
                            </h3>
                            <a
                                href="https://github.com/AdamChoudary"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-lg md:text-2xl font-bebas text-white hover:text-[#D10000] transition-colors tracking-wide flex-wrap"
                            >
                                <FaGithub className="flex-shrink-0" />
                                <span>GITHUB.COM/ADAMCHOUDARY</span>
                                <span className="text-[10px] font-mono text-gray-600 border border-white/10 px-2 py-0.5 tracking-wider">
                                    PUBLIC ACCESS
                                </span>
                            </a>
                        </div>

                        {/* Status Grid */}
                        <div className="pt-4 border-t border-white/5">
                            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                                {STATUS_ITEMS.map((item) => (
                                    <div key={item.label}>
                                        <div className="text-[9px] font-mono text-gray-600 mb-1 tracking-widest">{item.label}</div>
                                        <div className="text-xs font-mono text-gray-400">{item.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Message Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="bg-[#0A0A0A] border border-white/10 p-6 md:p-8 relative"
                    >
                        {/* Corner Decorators */}
                        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/20" />
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/20" />

                        {/* Protocol Header */}
                        <div className="text-[10px] font-mono text-gray-600 mb-6 uppercase tracking-widest flex justify-between items-center">
                            <span>ENCRYPTED MESSAGE PROTOCOL</span>
                            <motion.span
                                animate={{
                                    opacity: formState === 'sending' ? [1, 0.3, 1] : 1
                                }}
                                transition={{ duration: 0.7, repeat: formState === 'sending' ? Infinity : 0 }}
                                className={
                                    formState === 'sent'    ? 'text-green-500' :
                                    formState === 'sending' ? 'text-yellow-600' :
                                    'text-gray-600'
                                }
                            >
                                {formState === 'idle'    ? 'STATUS: READY' :
                                 formState === 'sending' ? 'TRANSMITTING...' :
                                 'STATUS: SENT ✓'}
                            </motion.span>
                        </div>

                        <AnimatePresence mode="wait">
                            {formState === 'sent' ? (
                                /* ── Sent State ── */
                                <motion.div
                                    key="sent"
                                    initial={{ opacity: 0, scale: 0.96 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.96 }}
                                    transition={{ duration: 0.4 }}
                                    className="py-10 text-center space-y-4"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', stiffness: 180, delay: 0.1 }}
                                        className="w-12 h-12 border border-green-500/30 rounded-full flex items-center justify-center mx-auto"
                                    >
                                        <span className="text-green-500 text-lg">✓</span>
                                    </motion.div>

                                    <p className="font-mono text-sm text-gray-300">PAYLOAD PREPARED</p>
                                    <p className="font-mono text-xs text-gray-600 leading-relaxed max-w-xs mx-auto">
                                        Your email client has been opened with the pre-filled
                                        transmission. Complete the send to finalize.
                                    </p>

                                    <button
                                        onClick={handleReset}
                                        className="mt-2 text-xs font-mono text-gray-500 hover:text-white border border-white/10 hover:border-white/30 px-5 py-2 transition-all"
                                    >
                                        SEND ANOTHER
                                    </button>
                                </motion.div>
                            ) : (
                                /* ── Form State ── */
                                <motion.form
                                    key="form"
                                    onSubmit={handleSubmit}
                                    initial={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="space-y-5"
                                    noValidate
                                >
                                    {/* Identity Field */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                                            Input // Identity
                                        </label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => {
                                                setName(e.target.value);
                                                if (errors.name) setErrors(p => ({ ...p, name: undefined }));
                                            }}
                                            placeholder="DESIGNATION"
                                            className={`w-full bg-[#050505] border text-white p-3 font-mono text-sm focus:outline-none transition-colors placeholder:text-gray-700 ${
                                                errors.name
                                                    ? 'border-[#D10000]'
                                                    : 'border-white/10 focus:border-[#D10000]/60'
                                            }`}
                                        />
                                        {errors.name && (
                                            <p className="text-[10px] font-mono text-[#D10000] tracking-wide">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    {/* Message Field */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                                            Input // Purpose
                                        </label>
                                        <textarea
                                            value={message}
                                            onChange={(e) => {
                                                setMessage(e.target.value);
                                                if (errors.message) setErrors(p => ({ ...p, message: undefined }));
                                            }}
                                            rows={4}
                                            placeholder="TRANSMISSION CONTENT..."
                                            className={`w-full bg-[#050505] border text-white p-3 font-mono text-sm focus:outline-none transition-colors resize-none placeholder:text-gray-700 ${
                                                errors.message
                                                    ? 'border-[#D10000]'
                                                    : 'border-white/10 focus:border-[#D10000]/60'
                                            }`}
                                        />
                                        {errors.message && (
                                            <p className="text-[10px] font-mono text-[#D10000] tracking-wide">
                                                {errors.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={formState === 'sending'}
                                        className="w-full bg-white text-black font-bebas text-xl py-3 tracking-widest hover:bg-[#D10000] hover:text-white transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {formState === 'sending' ? (
                                            <motion.span
                                                animate={{ opacity: [1, 0.4, 1] }}
                                                transition={{ duration: 0.7, repeat: Infinity }}
                                                className="tracking-widest"
                                            >
                                                TRANSMITTING...
                                            </motion.span>
                                        ) : (
                                            <>
                                                <FaPaperPlane className="text-sm" />
                                                <span>TRANSMIT PAYLOAD</span>
                                            </>
                                        )}
                                    </button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* Footer Strip */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="mt-16 flex flex-wrap justify-center gap-6 text-[10px] font-mono text-gray-700 uppercase tracking-widest"
                >
                    <span>PROTOCOL: MAILTO</span>
                    <span className="hidden sm:inline">·</span>
                    <span>ENCRYPTION: TLS</span>
                    <span className="hidden sm:inline">·</span>
                    <span>NODE: ISB-PK</span>
                </motion.div>
            </div>
        </main>
    );
}
