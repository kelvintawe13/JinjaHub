interface FrondProps {
  /** Colour scheme of the leaves and stem. */
  tone?: 'green' | 'gold' | 'cream';
  className?: string;
}

const tones = {
  green: { leaf: '#2F6B47', stem: '#1F4A32' },
  gold: { leaf: '#E2A93B', stem: '#C98F27' },
  cream: { leaf: '#FBF6EC', stem: '#FBF6EC' }
};

/**
 * Botanical frond accent, echoing the leaf illustrations from the approved
 * design. Decorative only. Always rendered with aria-hidden.
 */
export function Frond({ tone = 'green', className }: FrondProps) {
  const { leaf, stem } = tones[tone];
  return (
    <svg viewBox="0 0 180 260" fill="none" aria-hidden="true" className={className}>
      <path
        d="M96 256 C90 196 84 128 62 14"
        stroke={stem}
        strokeWidth="7"
        strokeLinecap="round"
      />
      <g fill={leaf}>
        <ellipse rx="27" ry="7.5" transform="translate(106 218) rotate(-24)" />
        <ellipse rx="24" ry="7" transform="translate(78 196) rotate(206)" />
        <ellipse rx="25" ry="7.5" transform="translate(104 178) rotate(-34)" />
        <ellipse rx="22" ry="6.5" transform="translate(72 156) rotate(214)" />
        <ellipse rx="22" ry="7" transform="translate(100 138) rotate(-44)" />
        <ellipse rx="19" ry="6" transform="translate(66 120) rotate(222)" />
        <ellipse rx="19" ry="6.5" transform="translate(94 100) rotate(-54)" />
        <ellipse rx="16" ry="5.5" transform="translate(60 86) rotate(230)" />
        <ellipse rx="15" ry="6" transform="translate(84 64) rotate(-64)" />
        <ellipse rx="12" ry="5" transform="translate(54 54) rotate(238)" />
        <ellipse rx="10" ry="5" transform="translate(72 32) rotate(-74)" />
      </g>
    </svg>
  );
}
