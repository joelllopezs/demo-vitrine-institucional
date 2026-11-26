export default function Logo({ light = true, name = 'VIA MINEIRA' }: { light?: boolean; name?: string }) {
  const parts = name.trim().split(/\s+/)
  const first = parts[0] ?? ''
  const rest = parts.slice(1).join(' ')
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden>
        <circle cx="20" cy="20" r="19" fill="none" stroke="#C49A52" strokeWidth="1.5" />
        <path d="M9 29 L20 9 L31 29" fill="none" stroke="#C49A52" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 29 H26" stroke={light ? '#F7F0E3' : '#183D2C'} strokeWidth="2.2" strokeLinecap="round" />
      </svg>
      <span className={`font-display text-xl font-bold leading-none tracking-wide ${light ? 'text-cream' : 'text-forest'}`}>
        {first}
        {rest && <span className="ml-1.5 text-gold">{rest}</span>}
      </span>
    </span>
  )
}
