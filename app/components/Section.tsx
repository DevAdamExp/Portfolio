/**
 * A page section: a hairline, then the title in a rail on the left (sticky on
 * large screens) and the content on the right. Stacks below 1024px.
 */
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
    <section id={id} aria-labelledby={headingId} className={`section ${className}`}>
      <header className="section-rail reveal">
        <h2 id={headingId} className="section-title">
          {title}
        </h2>
        {description && <p className="section-rail-description">{description}</p>}
      </header>
      <div className="section-body">{children}</div>
    </section>
  );
}
