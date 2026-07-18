export default function Ring({
  value,
  max,
  color,
  size = 92,
  sw = 7,
}: {
  value: number;
  max: number;
  color: string;
  size?: number;
  sw?: number;
}) {
  const r = (size - sw) / 2;
  const circ = 2 * Math.PI * r;
  // So if value/max = 0.7 (70% of goal), offset comes out to circ * 0.3
  const offset = circ * (1 - Math.min(1, value / max));
  return (
    <svg
      width={size}
      height={size}
      style={{
        transform: "rotate(-90deg)", // starts filling from the top instead of the default 3-o'clock position
        display: "block",
      }}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="var(--bg4)"
        strokeWidth={sw}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={sw}
        strokeLinecap="round"
        strokeDasharray={circ} // draw the stroke as dashes, where each dash is circ pixels long, followed by a gap of circ pixels
        strokeDashoffset={offset} // shifts where along the circle that dash starts
        style={{ transition: "stroke-dashoffset 0.5s ease" }}
      />
    </svg>
  );
}
