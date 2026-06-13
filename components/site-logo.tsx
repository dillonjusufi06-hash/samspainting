import { Paintbrush } from "lucide-react";

export function SiteLogo({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-accent-500 text-white shrink-0 shadow-sm">
        <Paintbrush size={18} className="stroke-[2.5]" />
      </div>
      <div className="leading-tight text-left">
        <span className={`block text-sm sm:text-base font-black tracking-tight ${dark ? "text-white" : "text-neutral-900"}`}>
          Sam&apos;s Painting
        </span>
      </div>
    </div>
  );
}
