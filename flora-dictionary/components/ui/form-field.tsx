type FormFieldProps = {
  label: string;
  name: string;
  type: React.HTMLInputTypeAttribute;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoComplete?: string;
};

export function FormField({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
}: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold text-zinc-700 dark:text-zinc-200"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-[#6A00F4] focus:ring-4 focus:ring-[#6A00F4]/10 dark:border-white/10 dark:bg-[#13002E] dark:text-white dark:focus:border-[#5BFF5A] dark:focus:ring-[#5BFF5A]/10"
      />
    </div>
  );
}