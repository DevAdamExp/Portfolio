import Image from "next/image";
import { initials } from "@/lib/format";

/** Company logo from /public, or the company's initials when no logo is set. */
export default function CompanyLogo({ name, logo, size = 40 }: { name: string; logo?: string; size?: number }) {
  return (
    <div
      className="grid shrink-0 place-items-center overflow-hidden rounded-lg border border-line bg-surface text-[13px] font-medium tracking-tight text-muted"
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
