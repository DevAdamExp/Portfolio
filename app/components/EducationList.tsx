import Image from "next/image";
import { FiArrowUpRight, FiBookOpen } from "react-icons/fi";
import { certifications, education } from "@/content/education";
import { formatMonth, formatPeriod } from "@/lib/format";

export default function EducationList() {
  return (
    <div className="grid gap-10">
      <ol className="grid gap-8">
        {education.map((item) => (
          <li key={item.institution} className="grid gap-x-5 sm:grid-cols-[40px_1fr]">
            <div className="hidden size-10 place-items-center rounded-lg border border-line bg-surface text-muted sm:grid">
              <FiBookOpen className="size-[18px]" aria-hidden />
            </div>
            <div className="min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between sm:gap-x-4">
                <h3 className="font-semibold leading-snug tracking-tight text-fg">{item.program}</h3>
                <p className="mt-0.5 shrink-0 font-mono text-[13px] text-subtle sm:mt-0">
                  {formatPeriod(item.start, item.end)}
                </p>
              </div>
              <p className="text-[15px] text-muted">{item.institution}</p>
              {item.details && <p className="mt-2 text-pretty text-muted">{item.details}</p>}
            </div>
          </li>
        ))}
      </ol>

      <div>
        <h3 className="mb-4 text-sm font-medium text-subtle">Certifications</h3>
        <ul className="grid gap-3">
          {certifications.map((cert) => {
            const body = (
              <>
                {cert.image && (
                  <Image
                    src={cert.image}
                    alt=""
                    width={240}
                    height={170}
                    className="h-auto w-full rounded-md border border-line bg-white"
                  />
                )}
                <div className="min-w-0">
                  <p className="font-medium leading-snug text-fg">{cert.name}</p>
                  <p className="mt-0.5 text-[15px] text-muted">
                    {cert.issuer} · {formatMonth(cert.date)}
                  </p>
                  {cert.credentialId && (
                    <p className="mt-1 font-mono text-xs text-subtle">Credential ID {cert.credentialId}</p>
                  )}
                </div>
                {cert.url && (
                  <FiArrowUpRight
                    aria-hidden
                    className="size-4 self-start text-subtle transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
                  />
                )}
              </>
            );
            const className =
              "group grid grid-cols-[5.5rem_1fr_auto] items-center gap-4 rounded-xl border border-line bg-surface p-3 sm:grid-cols-[7.5rem_1fr_auto] sm:p-4";

            return (
              <li key={cert.name}>
                {cert.url ? (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${cert.name}, ${cert.issuer} — view certificate`}
                    className={`${className} transition-colors hover:border-line-strong`}
                  >
                    {body}
                  </a>
                ) : (
                  <div className={className}>{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
