import React from "react";

export default function CommonButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center gap-2 min-w-[180px] max-w-[240px] h-[48px] px-4 py-2 dark:bg-[#4D6BDD] bg-white dark:text-white text-black rounded-[8px] shadow-[0px_0px_20px_0px_rgba(255,255,255,0.30)] cursor-pointer transition-all duration-300 hover:opacity-80">
      <span>{children}</span>
    </div>
  );
}
