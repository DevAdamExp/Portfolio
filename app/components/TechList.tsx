import { TechIcon } from "@/lib/tech";

/** Row of technology chips with logos. */
export default function TechList({ items, label = "Technologies" }: { items: string[]; label?: string }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-1.5">
      {items.map((name) => (
        <li key={name} className="chip">
          <TechIcon name={name} />
          {name}
        </li>
      ))}
    </ul>
  );
}
