import { cn } from "@/lib/utils";

type BadgeColor = "green" | "cyan" | "orange" | "muted";

const colorMap: Record<BadgeColor, string> = {
  green:  "text-green  border-green/30  bg-green/5  hover:bg-green/10",
  cyan:   "text-cyan   border-cyan/30   bg-cyan/5   hover:bg-cyan/10",
  orange: "text-orange border-orange/30 bg-orange/5 hover:bg-orange/10",
  muted:  "text-muted  border-border    bg-surface  hover:bg-border/40",
};

type Props = {
  label: string;
  color?: BadgeColor;
  className?: string;
};

export default function Badge({ label, color = "muted", className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-mono text-xs px-3 py-1 rounded border transition-colors duration-150 cursor-default select-none",
        colorMap[color],
        className
      )}
    >
      {label}
    </span>
  );
}
