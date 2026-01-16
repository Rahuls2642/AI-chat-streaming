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
    flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-2 border border-zinc-300/70 shadow-[0_10px_30px_rgba(0,0,0,0.08)] focus-within:border-zinc-500 transition"
    >
      <input
        className="
      flex-1 bg-transparent outline-none px-2 text-sm text-zinc-900 placeholder:text-zinc-500 disabled:opacity-60 "
        placeholder="Type your message…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
      />

      <button
        type="submit"
        disabled={disabled}
        className="
      rounded-full px-4 py-1.5 text-sm font-medium text-zinc-900 bg-zinc-100 shadow-md hover:bg-zinc-400 active:scale-95 transition  disabled:opacity-40 disabled:cursor-not-allowed "
      >
        Send
      </button>
    </form>
  );
}
