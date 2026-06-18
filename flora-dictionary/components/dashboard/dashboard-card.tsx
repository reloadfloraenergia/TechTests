import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type DashboardCardProps = {
  href?: string;
  icon: LucideIcon;
  title: string;
  description: string;
  variant?: "default" | "highlight";
  actionLabel?: string;
};

export function DashboardCard({
  href,
  icon: Icon,
  title,
  description,
  variant = "default",
  actionLabel,
}: DashboardCardProps) {
  const content = (
    <>
      <div
        className={
          variant === "highlight"
            ? "mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#5BFF5A]"
            : "mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6A00F4]/10 text-[#6A00F4] dark:bg-[#5BFF5A]/10 dark:text-[#5BFF5A]"
        }
      >
        <Icon size={24} aria-hidden="true" />
      </div>

      <h2
        className={
          variant === "highlight"
            ? "text-xl font-black text-[#5BFF5A]"
            : "text-xl font-black text-[#6A00F4] dark:text-[#5BFF5A]"
        }
      >
        {title}
      </h2>

      <p
        className={
          variant === "highlight"
            ? "mt-3 text-sm leading-6 text-white/80"
            : "mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300"
        }
      >
        {description}
      </p>

      {actionLabel && (
        <p
          className={
            variant === "highlight"
              ? "mt-5 text-sm font-bold text-[#5BFF5A] transition group-hover:underline"
              : "mt-5 text-sm font-bold text-[#6A00F4] transition group-hover:underline dark:text-[#5BFF5A]"
          }
        >
          {actionLabel}
        </p>
      )}
    </>
  );

  const className =
    variant === "highlight"
      ? "group rounded-3xl border border-[#6A00F4]/10 bg-[#6A00F4] p-6 text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10"
      : "group rounded-3xl border border-[#6A00F4]/10 bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-[#1F0A3D]";

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
}