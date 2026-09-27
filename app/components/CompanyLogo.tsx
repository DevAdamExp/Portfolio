import Image from "next/image";
import { initials } from "@/lib/format";

/** Company logo from /public, or the company's initials on a navy tile when no logo is set. */
export default function CompanyLogo({ name, logo, size = 40 }: { name: string; logo?: string; size?: number }) {
  return logo ? (
    <div
      className="grid shrink-0 place-items-center overflow-hidden rounded-lg border border-line bg-surface"
      style={{ width: size, height: size }}
    >
      <Image src={logo} alt={`${name} logo`} width={size} height={size} className="size-full object-contain p-1.5" />
    </div>
  ) : (
    <div
      className="grid shrink-0 place-items-center rounded-lg bg-navy text-[0.8125rem] font-semibold tracking-tight text-bg"
      style={{ width: size, height: size }}
    >
      <span aria-hidden>{initials(name)}</span>
    </div>
  );
}
