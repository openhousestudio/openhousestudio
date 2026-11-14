import { DoorMark } from "./door-mark";

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <DoorMark className="h-7 w-7" />
      <span
        className={
          "text-[13px] font-medium uppercase tracking-[0.18em] text-ink " +
          (compact ? "hidden sm:inline" : "")
        }
      >
        Open House Studio
      </span>
    </span>
  );
}
