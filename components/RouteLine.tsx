/** The signature device: a 3-segment stripe (teal / golden-yellow / tomato-red) taken from the
 * road in the client's own artwork. Marks transitions only — active nav, section eyebrows, the
 * checkout total — never used as a page border or repeated divider. */
export function RouteLine({
  className = "",
  width = 44,
  thickness = 3,
}: {
  className?: string;
  width?: number;
  thickness?: number;
}) {
  return (
    <span
      className={`inline-flex overflow-hidden rounded-[1px] ${className}`}
      style={{ width, height: thickness }}
      aria-hidden="true"
    >
      <span className="flex-1 bg-teal" />
      <span className="flex-1 bg-golden-yellow" />
      <span className="flex-1 bg-tomato-red" />
    </span>
  );
}
