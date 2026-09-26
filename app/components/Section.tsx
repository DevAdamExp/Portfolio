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
    <section
      id={id}
      aria-labelledby={headingId}
      className={`mt-20 border-t border-line pt-10 md:mt-24 md:pt-12 ${className}`}
    >
      <header className="mb-8">
        <h2 id={headingId} className="section-title">
          {title}
        </h2>
        {description && <p className="mt-1.5 text-[15px] text-pretty text-subtle">{description}</p>}
      </header>
      {children}
    </section>
  );
}
