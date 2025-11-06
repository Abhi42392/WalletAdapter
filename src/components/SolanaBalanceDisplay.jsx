export default function SolanaBalanceDisplay({ solanaBalance }) {
  const str =
    typeof solanaBalance === "number"
      ? solanaBalance.toString()
      : `${solanaBalance}`;

  return (
    <div
      className="transition-colors duration-300 ease-in-out text-4xl"
      aria-label="Solana balance"
    >
      <div className="flex items-end gap-1 font-[Share_Tech_Mono,ui-monospace,monospace]">
        {Array.from(str).map((ch, i) => {
          if (ch === ".") {
            // dot: no block, just a small round dot at baseline
            return (
              <span
                key={`dot-${i}`}
                className="w-2 h-2 rounded-full bg-black dark:bg-white"
                aria-hidden="true"
              />
            );
          }

          if (ch === ",") {
            return (
              <span key={`comma-${i}`} className="w-1" aria-hidden="true" />
            );
          }

          // everything else (digits, minus, etc.) gets a block
          return (
            <div
              key={`${ch}-${i}`}
              className="
                min-w-10 h-14 md:min-w-12 md:h-16
                flex items-center justify-center
                rounded-lg select-none tracking-wider
                bg-black text-white
                dark:bg-white dark:text-black
                shadow-sm ring-1 ring-black/10 dark:ring-white/10
                font-calculator
              "
            >
              <span className="font-semibold">{ch}</span>
            </div>
          );
        })}

        {/* Unit */}
        <span className="ml-3 font-secondary  dark:text-gray-100 opacity-80 text-4xl font-bold">
          SOL
        </span>
      </div>
    </div>
  );
}
