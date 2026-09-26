import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { profile } from "@/content/profile";

export default function SocialLinks({ className = "" }: { className?: string }) {
  const { github, linkedin } = profile.links;
  const items = [
    github && { href: github.href, label: github.label, Icon: FiGithub },
    linkedin && { href: linkedin.href, label: linkedin.label, Icon: FiLinkedin },
    { href: `mailto:${profile.email}`, label: "Email", Icon: FiMail },
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
            className="grid size-9 place-items-center rounded-md text-subtle transition-colors hover:bg-surface-hover hover:text-fg"
          >
            <Icon className="size-[18px]" aria-hidden />
          </a>
        </li>
      ))}
    </ul>
  );
}
