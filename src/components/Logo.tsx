export default function Logo({
  light = true,
  name = 'VIA MINEIRA',
  responsive = false,
}: {
  light?: boolean
  name?: string
  /** Reduz o logo em telas pequenas (usado no cabeçalho do site). */
  responsive?: boolean
}) {
  const parts = name.trim().split(/\s+/)
  const first = parts[0] ?? ''
  const rest = parts.slice(1).join(' ')
  return (
    <span className={`inline-flex min-w-0 items-center ${responsive ? 'gap-2 sm:gap-2.5' : 'gap-2.5'}`}>
      <svg
        viewBox="0 0 40 40"
        className={`shrink-0 ${responsive ? 'h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9' : 'h-9 w-9'}`}
        aria-hidden
      >
        <circle cx="20" cy="20" r="19" fill="none" stroke="#C49A52" strokeWidth="1.5" />
        <path d="M9 29 L20 9 L31 29" fill="none" stroke="#C49A52" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 29 H26" stroke={light ? '#F7F0E3' : '#183D2C'} strokeWidth="2.2" strokeLinecap="round" />
      </svg>
      <span
        className={`truncate whitespace-nowrap font-display font-bold leading-none ${
          responsive ? 'text-base tracking-normal min-[380px]:text-lg sm:text-xl sm:tracking-wide' : 'text-xl tracking-wide'
        } ${light ? 'text-cream' : 'text-forest'}`}
      >
        {first}
        {rest && <span className="ml-1 text-gold sm:ml-1.5">{rest}</span>}
      </span>
    </span>
  )
}
