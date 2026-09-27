/** A page section: a title with an optional one-line description, then the content. */
export default function Section({
  id,
  title,
  description,
  children,
  className = "",
}: {
  id?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const headingId = id ? `${id}-title` : undefined;
  return (
    <section id={id} aria-labelledby={headingId} className={`mt-[var(--space-section)] ${className}`}>
      <header className="reveal max-w-[40rem]">
        <h2 id={headingId} className="section-title">
          {title}
        </h2>
        {description && <p className="mt-2 text-muted">{description}</p>}
      </header>
      <div className="mt-10">{children}</div>
    </section>
  );
}
