/** The checkerboard motif, used once on the merch page only — a small 2x4 tile strip echoing
 * the trailer artwork's checkerboard ground, never repeated elsewhere. */
export function CheckerStrip({ className = "" }: { className?: string }) {
  const cells = Array.from({ length: 8 });
  return (
    <div
      className={`grid grid-cols-4 grid-rows-2 overflow-hidden ${className}`}
      style={{ width: 64, height: 32 }}
      aria-hidden="true"
    >
      {cells.map((_, i) => {
        const row = Math.floor(i / 4);
        const col = i % 4;
        const dark = (row + col) % 2 === 0;
        return <span key={i} className={dark ? "bg-cream" : "bg-transparent"} />;
      })}
    </div>
  );
}
