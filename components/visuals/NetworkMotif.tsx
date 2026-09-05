/**
 * Abstract corporate/IT network motif for the story intro: a cluster of
 * live IT-system nodes wired together, and one greyed-out "Sustainability"
 * node sitting apart — connected only by a dashed, faded line, to imply the
 * disconnection the learner is about to diagnose. Single-colour line work;
 * the sustainability node is the only muted element.
 */
export function NetworkMotif({ className }: { className?: string }) {
  const nodes = [
    { id: "systems", x: 96, y: 60, label: "Systems" },
    { id: "platforms", x: 176, y: 40, label: "Platforms" },
    { id: "devices", x: 236, y: 96, label: "Devices" },
    { id: "cloud", x: 168, y: 128, label: "Cloud" },
    { id: "erp", x: 84, y: 132, label: "ERP" },
  ];
  const links: [string, string][] = [
    ["systems", "platforms"],
    ["platforms", "devices"],
    ["devices", "cloud"],
    ["cloud", "erp"],
    ["erp", "systems"],
    ["systems", "cloud"],
    ["platforms", "cloud"],
  ];
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const sustain = { x: 300, y: 176 };
  const nearest = byId["devices"];

  return (
    <svg
      viewBox="0 0 340 210"
      role="img"
      aria-label="IT systems wired together, with a faded, disconnected sustainability node"
      className={className}
    >
      {/* live links */}
      <g stroke="#0E7A5A" strokeWidth="1.4" strokeLinecap="round" opacity="0.55">
        {links.map(([a, b]) => (
          <line key={`${a}-${b}`} x1={byId[a].x} y1={byId[a].y} x2={byId[b].x} y2={byId[b].y} />
        ))}
      </g>

      {/* the faded, dashed bridge to sustainability — barely there */}
      <line
        x1={nearest.x}
        y1={nearest.y}
        x2={sustain.x}
        y2={sustain.y}
        stroke="#B7BEC6"
        strokeWidth="1.4"
        strokeDasharray="3 5"
        strokeLinecap="round"
      />

      {/* live nodes */}
      <g>
        {nodes.map((n) => (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r="8" fill="#FFFFFF" stroke="#0E7A5A" strokeWidth="1.6" />
            <circle cx={n.x} cy={n.y} r="2.4" fill="#0E7A5A" />
            <text
              x={n.x}
              y={n.y - 14}
              textAnchor="middle"
              fontSize="10"
              fill="#5E6670"
              fontFamily="Segoe UI, Helvetica Neue, Arial, sans-serif"
            >
              {n.label}
            </text>
          </g>
        ))}
      </g>

      {/* the greyed-out sustainability node, set apart */}
      <g>
        <circle cx={sustain.x} cy={sustain.y} r="11" fill="#EEF1F3" stroke="#B7BEC6" strokeWidth="1.6" />
        <path
          d="M304 172c-4 0-6.6 2-6.6 5.4 0 .5 0 .9.2 1.3.8-2.2 2.5-3.6 5.1-4.2-2 1.2-3.3 2.6-3.7 4.6 3.4.5 5-1.7 5-5.1V172Z"
          fill="none"
          stroke="#9AA1AA"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <text
          x={sustain.x}
          y={sustain.y + 26}
          textAnchor="middle"
          fontSize="10"
          fill="#9AA1AA"
          fontFamily="Segoe UI, Helvetica Neue, Arial, sans-serif"
        >
          Sustainability
        </text>
      </g>
    </svg>
  );
}
