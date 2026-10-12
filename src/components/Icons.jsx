function Icon({ size = 22, strokeWidth = 1.8, children }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

export const BookIcon = (props) => (
  <Icon {...props}>
    <path d="M12 7c-1.5-1.3-3.6-2-6-2H3v13h3c2.4 0 4.5.7 6 2m0-13c1.5-1.3 3.6-2 6-2h3v13h-3c-2.4 0-4.5.7-6 2m0-13v13" />
  </Icon>
)

export const PlusIcon = (props) => (
  <Icon {...props}>
    <path d="M12 5v14M5 12h14" />
  </Icon>
)

export const CheckIcon = (props) => (
  <Icon {...props}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </Icon>
)

export const UndoIcon = (props) => (
  <Icon {...props}>
    <path d="M4 9h10a5 5 0 0 1 0 10H8M4 9l4-4M4 9l4 4" />
  </Icon>
)

export const CalendarIcon = (props) => (
  <Icon {...props}>
    <rect x="3.5" y="5" width="17" height="15" rx="3" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </Icon>
)

export const FlameIcon = (props) => (
  <Icon {...props}>
    <path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3.2 2-4.2.2 1.3.9 2 1.7 2.2C10.3 8.5 10.8 5.5 12 3z" />
  </Icon>
)

export const TrendIcon = (props) => (
  <Icon {...props}>
    <path d="M4 16l5-5 4 4 7-8M15 7h5v5" />
  </Icon>
)



export const SlidersIcon = (props) => (
  <Icon {...props}>
    <path d="M4 7h10M18 7h2M4 17h2M10 17h10" />
    <circle cx="16" cy="7" r="2" />
    <circle cx="8" cy="17" r="2" />
  </Icon>
)


