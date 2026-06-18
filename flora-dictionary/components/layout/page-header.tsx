type PageHeaderProps = {
  badge: string;
  title: string;
  description?: string;
};

export function PageHeader({ badge, title, description }: PageHeaderProps) {
  return (
    <div>
      <p className="mb-4 inline-flex rounded-full border border-[#6A00F4]/20 bg-[#6A00F4]/10 px-4 py-2 text-sm font-bold text-[#6A00F4] dark:border-[#5BFF5A]/30 dark:bg-[#5BFF5A]/10 dark:text-[#5BFF5A]">
        {badge}
      </p>

      <h1 className="max-w-3xl text-4xl font-black tracking-tight text-[#6A00F4] dark:text-[#5BFF5A]">
        {title}
      </h1>

      {description && (
        <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-700 dark:text-zinc-200">
          {description}
        </p>
      )}
    </div>
  );
}