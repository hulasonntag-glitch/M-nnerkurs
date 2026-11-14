type Props = { href?: string; inverse?: boolean; compact?: boolean; className?: string };

export function Brand({ href = "/", inverse = false, compact = false, className = "" }: Props) {
  return (
    <a href={href} aria-label="MITTRAGEN – zur Startseite"
      className={`inline-flex shrink-0 items-center gap-2.5 no-underline ${inverse ? "text-white" : "text-[#1B2B3C]"} ${className}`}>
      <svg aria-hidden="true" viewBox="0 0 40 40" width={compact ? 27 : 32} height={compact ? 27 : 32} className="shrink-0"><path d="M3 31 L7 18 L12 18 L8 31 Z" fill={inverse ? "#fff" : "#162639"}/><path d="M13 31 L18 11 L23 11 L18 31 Z" fill={inverse ? "#fff" : "#162639"}/><path d="M23 31 L29 5 L35 5 L29 31 Z" fill="#c94e28"/></svg>
      <span className={`font-sans font-medium leading-none tracking-[-0.035em] ${compact ? "text-lg" : "text-[clamp(1.15rem,2vw,1.55rem)]"}`}>MITTRAGEN<span className="text-[#C4532B]">.</span></span>
    </a>
  );
}
