import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { profile } from "@/content/profile";

/** Icon links to GitHub, LinkedIn and (unless `email` is false, e.g. next to an email button) email. */
export default function SocialLinks({
  className = "",
  tone = "page",
  email = true,
}: {
  className?: string;
  tone?: "page" | "band";
  email?: boolean;
}) {
  const { github, linkedin } = profile.links;
  const items = [
    github && { href: github.href, label: github.label, Icon: FiGithub },
    linkedin && { href: linkedin.href, label: linkedin.label, Icon: FiLinkedin },
    email && { href: `mailto:${profile.email}`, label: "Email", Icon: FiMail },
  ].filter((item) => !!item);

  return (
    <ul className={`flex items-center gap-1 ${className}`}>
      {items.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={label}
            title={label}
            {...(href.startsWith("http") && { target: "_blank", rel: "noreferrer" })}
            className={
              tone === "band"
                ? "grid size-10 place-items-center rounded-full text-band-muted transition-colors hover:bg-white/10 hover:text-band-fg"
                : "icon-btn"
            }
          >
            <Icon className="size-[18px]" aria-hidden />
          </a>
        </li>
      ))}
    </ul>
  );
}
