"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import ProjectCard from './components/ProjectCard';
import ProjectDetail from './components/ProjectDetail';
import { projects, ProjectCategory, Project } from './data/projects';

const categories: { id: ProjectCategory | 'ALL', label: string }[] = [
    { id: 'ALL', label: 'All Work' },
    { id: 'CONVERSATIONAL_AI', label: 'AI Agents' },
    { id: 'SERVICE_MARKETPLACE', label: 'Marketplace' },
    { id: 'REAL_ESTATE', label: 'Real Estate' },
    { id: 'PROPRIETARY', label: 'R&D' },
];

export default function ProjectsPage() {
    const [activeFilter, setActiveFilter] = useState<ProjectCategory | 'ALL'>('ALL');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const filteredProjects = activeFilter === 'ALL'
        ? projects
        : projects.filter(p => p.category === activeFilter);

    return (
        <main className="relative min-h-screen text-white selection:bg-[#D10000] selection:text-white font-sans">

            {/* 1. LAYER: BACKGROUND */}
            {/* 1. LAYER: BACKGROUND - Moved to layout.tsx */}

            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />

                {/* Main Content Area - Aligned with Navbar (max-w-7xl) */}
                <div className="flex-1 w-full max-w-7xl mx-auto pt-32 pb-32">

                    {/* Header Block - Swiss Style Minimalist */}
                    <div className="mb-24 mt-8">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="text-6xl md:text-8xl lg:text-[10rem] font-bebas leading-[0.8] tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600"
                        >
                            SELECTED <br /> WORK
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="flex flex-col md:flex-row md:items-end justify-between border-t border-zinc-800 pt-6"
                        >
                            <p className="max-w-xl text-zinc-500 text-lg font-light leading-relaxed">
                                A curated archive of engineering challenges.
                                <br className="hidden md:block" />
                                Focusing on Autonomous Agents, Scalable Systems, and Clean Experience Design.
                            </p>

                            {/* Filter Bar */}
                            <div className="flex flex-wrap gap-6 mt-8 md:mt-0">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setActiveFilter(cat.id)}
                                        className={`text-xs font-mono tracking-widest uppercase transition-colors duration-300
                                            ${activeFilter === cat.id ? 'text-[#D10000] underline underline-offset-4 decoration-[#D10000]' : 'text-zinc-600 hover:text-zinc-300'}
                                        `}
                                    >
                                        [{cat.label}]
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Grid Layout - Masonry Feel */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                        <AnimatePresence mode='popLayout'>
                            {filteredProjects.map((project, i) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    index={i}
                                    priority={i < 4}
                                    onClick={() => setSelectedProject(project)}
                                />
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Empty State */}
                    {filteredProjects.length === 0 && (
                        <div className="py-32 flex flex-col items-center justify-center text-zinc-600 border-t border-b border-zinc-900">
                            <span className="font-bebas text-4xl mb-2">Null Sector</span>
                            <div className="text-xs font-mono tracking-widest">NO PROJECTS FOUND IN THIS CATEGORY</div>
                        </div>
                    )}
                </div>
            </div>

            {/* 3. LAYER: DETAIL VIEW (Slide Over) */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectDetail
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </main>
    );
}
