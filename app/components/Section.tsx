type Props = {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  /** "split" puts the heading in a sticky left column on large screens. */
  layout?: "stack" | "split";
  action?: React.ReactNode;
};

/** A full-width page section with a consistent heading. */
export default function Section({ id, eyebrow, title, description, children, layout = "stack", action }: Props) {
  const headingId = id ? `${id}-title` : undefined;

  const heading = (
    <div className="max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={headingId} className="mt-3 text-[1.75rem] font-semibold leading-tight tracking-tight text-balance text-fg md:text-4xl">
        {title}
      </h2>
      {description && <p className="mt-4 text-pretty text-muted">{description}</p>}
    </div>
  );

  return (
    <section id={id} aria-labelledby={headingId} className="border-t border-line py-20 md:py-28">
      <div className="container-page">
        {layout === "split" ? (
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">{heading}</div>
            </div>
            <div className="lg:col-span-8">{children}</div>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              {heading}
              {action}
            </div>
            <div className="mt-12">{children}</div>
          </>
        )}
      </div>
    </section>
  );
}
