import { profile } from "@/content/profile";
import SocialLinks from "./SocialLinks";

export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="container-page flex flex-col gap-4 py-8 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}. {profile.location}.
        </p>
        <SocialLinks />
      </div>
    </footer>
  );
}
