/** Divisória em onda com o traço dourado do trigo da logo. Fica colada na base da seção. */
export function Onda({ cor = 'var(--color-creme)' }: { cor?: string }) {
  return (
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="absolute inset-x-0 -bottom-px block h-12 w-full sm:h-20"
    >
      <path d="M0 40 C 240 90, 480 0, 720 36 S 1200 80, 1440 30 L1440 80 L0 80 Z" fill={cor} />
      <path
        d="M0 40 C 240 90, 480 0, 720 36 S 1200 80, 1440 30"
        fill="none"
        stroke="var(--color-trigo)"
        strokeWidth="4"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
