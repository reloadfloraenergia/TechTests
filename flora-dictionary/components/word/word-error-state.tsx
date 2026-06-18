import { AlertCircle } from "lucide-react";

type WordErrorStateProps = {
  message: string;
};

export function WordErrorState({ message }: WordErrorStateProps) {
  return (
    <div className="flex min-h-[380px] flex-col items-center justify-center text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600 dark:bg-red-400/10 dark:text-red-200">
        <AlertCircle size={28} aria-hidden="true" />
      </div>

      <p className="mt-4 text-lg font-bold text-red-600 dark:text-red-200">
        Ops, algo deu errado
      </p>

      <p className="mt-2 max-w-md text-sm leading-6 text-zinc-500 dark:text-zinc-400">
        {message}
      </p>
    </div>
  );
}