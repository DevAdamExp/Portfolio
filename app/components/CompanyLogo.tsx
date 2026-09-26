import Image from "next/image";
import { initials } from "@/lib/format";

/** Company logo from /public, or the company's initials when no logo is set. */
export default function CompanyLogo({
  name,
  logo,
  size = 44,
  highlight = false,
}: {
  name: string;
  logo?: string;
  size?: number;
  highlight?: boolean;
}) {
  return (
    <div
      className={`relative grid shrink-0 place-items-center overflow-hidden rounded-xl border bg-surface font-mono text-[13px] font-semibold tracking-tight shadow-[var(--shadow-card)] ${
        highlight ? "border-accent/40 text-accent" : "border-line-strong text-muted"
      }`}
      style={{ width: size, height: size }}
    >
      {logo ? (
        <Image src={logo} alt={`${name} logo`} width={size} height={size} className="size-full object-contain p-1.5" />
      ) : (
        <span aria-hidden>{initials(name)}</span>
      )}
    </div>
  );
}
