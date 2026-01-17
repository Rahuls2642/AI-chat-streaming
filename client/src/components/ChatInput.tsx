import { useState } from "react";

type Props = {
  onSend: (text: string) => void;
  disabled?: boolean;
};

export default function ChatInput({ onSend, disabled }: Props) {
  const [value, setValue] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;
    onSend(value);
    setValue("");
  }

  return (
    <form
  onSubmit={handleSubmit}
  className="
    flex items-center gap-2 rounded-2xl dark:bg-zinc-800 px-3 py-2 border border-zinc-300/70 dark:border-zinc-700 shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] focus-within:border-zinc-500 dark:focus-within:border-zinc-400 transition
  "
>
  <input
    className="
      flex-1 bg-transparent outline-none px-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 dark:placeholder:text-zinc-400 disabled:opacity-60
    "
    placeholder="Type your message…"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    disabled={disabled}
  />

  <button
    type="submit"
    disabled={disabled}
    className="
      rounded-full px-4 py-1.5 text-sm font-medium text-zinc-900 dark:text-zinc-100 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 shadow-md active:scale-95 transition disabled:opacity-40 disabled:cursor-not-allowed
    "
  >
    Send
  </button>
</form>

  );
}
