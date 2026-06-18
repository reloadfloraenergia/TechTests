type SubmitButtonProps = {
  children: React.ReactNode;
  isSubmitting?: boolean;
  loadingText?: string;
};

export function SubmitButton({
  children,
  isSubmitting = false,
  loadingText = "Carregando...",
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="w-full rounded-xl bg-[#5BFF5A] px-6 py-4 text-lg font-bold text-[#6A00F4] transition hover:brightness-95 focus:outline-none focus:ring-4 focus:ring-[#5BFF5A]/40 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isSubmitting ? loadingText : children}
    </button>
  );
}