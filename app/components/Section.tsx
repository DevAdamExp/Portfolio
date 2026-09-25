export default function Section({
  id,
  title,
  children,
  className = "",
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  const headingId = id ? `${id}-title` : undefined;
  return (
    <section id={id} aria-labelledby={headingId} className={`mt-20 md:mt-24 ${className}`}>
      <h2 id={headingId} className="section-title">
        {title}
      </h2>
      {children}
    </section>
  );
}
