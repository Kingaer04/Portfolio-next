import { cn } from "@/lib/utils";

type Props = {
  label: string;
  title: string;
  subtitle?: string;
  className?: string;
};

export default function SectionHeader({ label, title, subtitle, className }: Props) {
  return (
    <div className={cn("mb-12", className)}>
      <p className="font-mono text-sm text-green mb-2">
        <span className="opacity-50"># </span>{label}
      </p>
      <h2 className="font-mono text-3xl md:text-4xl font-bold text-text mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="font-sans text-muted max-w-xl">{subtitle}</p>
      )}
      <div className="mt-4 h-px w-16 bg-green" />
    </div>
  );
}
