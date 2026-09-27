import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { profile } from "@/content/profile";

/** Icon links to GitHub, LinkedIn and (unless `email` is false, e.g. next to an email button) email. */
export default function SocialLinks({ className = "", email = true }: { className?: string; email?: boolean }) {
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
            className="icon-btn"
          >
            <Icon className="size-[18px]" aria-hidden />
          </a>
        </li>
      ))}
    </ul>
  );
}
