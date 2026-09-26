import { TechIcon } from "@/lib/tech";

/** Row of technology chips with brand-coloured logos. */
export default function TechList({
  items,
  label = "Technologies",
  size = "md",
}: {
  items: string[];
  label?: string;
  size?: "sm" | "md";
}) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-1.5">
      {items.map((name) => (
        <li key={name} className={size === "sm" ? "chip chip-sm" : "chip"}>
          <TechIcon name={name} className={size === "sm" ? "size-3.5" : "size-4"} />
          {name}
        </li>
      ))}
    </ul>
  );
}
