import { Search, X } from "lucide-react";

type SearchInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  placeholder?: string;
};

export function SearchInput({
  id,
  label,
  value,
  onChange,
  onClear,
  placeholder,
}: SearchInputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-bold text-zinc-700 dark:text-zinc-200"
      >
        {label}
      </label>

      <div className="flex items-center gap-3 rounded-2xl border border-zinc-300 bg-white px-4 py-3 focus-within:border-[#6A00F4] focus-within:ring-4 focus-within:ring-[#6A00F4]/10 dark:border-white/10 dark:bg-[#13002E] dark:focus-within:border-[#5BFF5A] dark:focus-within:ring-[#5BFF5A]/10">
        <Search className="text-zinc-400" size={20} aria-hidden="true" />

        <input
          id={id}
          type="search"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent text-zinc-950 outline-none placeholder:text-zinc-400 dark:text-white"
        />

        {!!value && (
          <button
            type="button"
            onClick={onClear}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-zinc-400 transition hover:bg-zinc-100 hover:text-[#6A00F4] focus:outline-none focus:ring-4 focus:ring-[#6A00F4]/20 dark:hover:bg-white/10 dark:hover:text-[#5BFF5A] dark:focus:ring-[#5BFF5A]/20"
            aria-label="Limpar busca"
            title="Limpar busca"
          >
            <X size={17} aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}