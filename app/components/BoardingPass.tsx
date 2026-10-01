import { MdFlight } from "react-icons/md";

/**
 * "Open to relocation", as a one-way boarding pass from Islamabad to the
 * employer's city. One-way is the point: a long-term move, not a stopover.
 */
export default function BoardingPass({ name }: { name: string }) {
  return (
    <div id="relocate" className="pass group relative flex flex-col overflow-hidden rounded-[22px] border-[1.5px] border-ink bg-surface shadow-[6px_6px_0_var(--shadow-ink)] sm:flex-row">
      {/* Main ticket */}
      <div className="flex-1 p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4 font-mono text-[11.5px] tracking-[0.14em] text-subtle">
          <span>BOARDING PASS · RELOCATION</span>
          <span className="shrink-0 whitespace-nowrap rounded-md bg-mint px-2 py-0.5 text-ink">ONE-WAY</span>
        </div>

        <div className="mt-5 grid grid-cols-[auto_1fr_auto] items-center gap-4">
          <div>
            <p className="font-display text-[clamp(2.5rem,2rem+2vw,3.5rem)] font-extrabold leading-none tracking-[-0.04em]">ISB</p>
            <p className="mt-1 text-[13px] text-subtle">Islamabad</p>
          </div>
          <div className="relative h-6" aria-hidden>
            <span className="absolute inset-x-0 top-1/2 border-t-2 border-dashed border-ink/40" />
            <MdFlight className="pass-plane absolute top-1/2 size-6 -translate-y-1/2 rotate-90 text-cobalt" />
          </div>
          <div className="text-right">
            <p className="font-display text-[clamp(2.5rem,2rem+2vw,3.5rem)] font-extrabold leading-none tracking-[-0.04em] text-cobalt">YOU</p>
            <p className="mt-1 text-[13px] text-subtle">Your city</p>
          </div>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-dashed border-line pt-5 text-[14.5px] sm:grid-cols-4">
          <div>
            <dt className="font-mono text-[10.5px] tracking-[0.12em] text-subtle">PASSENGER</dt>
            <dd className="mt-0.5 font-semibold">{name}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10.5px] tracking-[0.12em] text-subtle">ROLE</dt>
            <dd className="mt-0.5 font-semibold">Full-stack · AI</dd>
          </div>
          <div>
            <dt className="font-mono text-[10.5px] tracking-[0.12em] text-subtle">STAY</dt>
            <dd className="mt-0.5 font-semibold">Long-term</dd>
          </div>
          <div>
            <dt className="font-mono text-[10.5px] tracking-[0.12em] text-subtle">STATUS</dt>
            <dd className="mt-0.5 inline-flex items-center gap-1.5 font-semibold">
              <span className="live-dot" aria-hidden />
              Ready to board
            </dd>
          </div>
        </dl>
      </div>

      {/* Tear-off stub */}
      <div className="relative flex items-center justify-between gap-4 border-t-2 border-dashed border-ink/30 bg-marigold px-6 py-5 sm:w-[11.5rem] sm:flex-col sm:items-start sm:justify-center sm:border-l-2 sm:border-t-0 sm:py-6">
        <span aria-hidden className="absolute -left-3 -top-3 hidden size-6 rounded-full border-[1.5px] border-line-strong bg-bg sm:block" />
        <span aria-hidden className="absolute -bottom-3 -left-3 hidden size-6 rounded-full border-[1.5px] border-line-strong bg-bg sm:block" />
        <div>
          <p className="font-mono text-[10.5px] tracking-[0.12em]">SEAT</p>
          <p className="font-display text-[26px] font-extrabold leading-none tracking-[-0.03em]">Your team</p>
        </div>
        <p className="hand text-[20px] leading-tight sm:mt-3">no return ticket,<br />I’m here to stay</p>
        <span aria-hidden className="hidden h-8 w-full sm:mt-4 sm:block" style={{ background: "repeating-linear-gradient(90deg, var(--ink) 0 2px, transparent 2px 4px, var(--ink) 4px 5px, transparent 5px 8px)" }} />
      </div>
    </div>
  );
}
