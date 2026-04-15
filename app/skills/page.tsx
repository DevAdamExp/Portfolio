import SkillsSection from "../components/SkillsSection";
import Navbar from "../components/Navbar";

export default function SkillsPage() {
    return (
        <main className="min-h-screen text-white">
            <Navbar />
            <div className="pt-32">
                <SkillsSection />
            </div>
        </main>
    );
}
