// src/components/icons.jsx
// Set de iconos minimalistas (stroke-based) en SVG puro, sin dependencias externas.
// Todos aceptan `size` y `className` para poder reutilizarlos en cualquier botón o etiqueta.

function baseProps(size, className) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
  }
}

export function CartIcon({ size = 20, className }) {
  return (
    <svg {...baseProps(size, className)}>
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="18" cy="20" r="1.4" />
      <path d="M2.5 3h2l2.2 11.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 7H6" />
    </svg>
  )
}

export function SearchIcon({ size = 20, className }) {
  return (
    <svg {...baseProps(size, className)}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.2-3.2" />
    </svg>
  )
}

export function CloseIcon({ size = 20, className }) {
  return (
    <svg {...baseProps(size, className)}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

export function PlusIcon({ size = 20, className }) {
  return (
    <svg {...baseProps(size, className)}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

export function MinusIcon({ size = 20, className }) {
  return (
    <svg {...baseProps(size, className)}>
      <path d="M5 12h14" />
    </svg>
  )
}

export function TrashIcon({ size = 20, className }) {
  return (
    <svg {...baseProps(size, className)}>
      <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-8 0 1 12.5A1.5 1.5 0 0 0 8.5 21h7a1.5 1.5 0 0 0 1.5-1.5L18 7" />
    </svg>
  )
}

export function EditIcon({ size = 20, className }) {
  return (
    <svg {...baseProps(size, className)}>
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19 3 20l1-4Z" />
    </svg>
  )
}

export function LogoutIcon({ size = 20, className }) {
  return (
    <svg {...baseProps(size, className)}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5M21 12H9" />
    </svg>
  )
}

export function LockIcon({ size = 20, className }) {
  return (
    <svg {...baseProps(size, className)}>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
      <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
    </svg>
  )
}

export function UnlockIcon({ size = 20, className }) {
  return (
    <svg {...baseProps(size, className)}>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
      <path d="M8 10.5V7a4 4 0 0 1 7.4-2" />
    </svg>
  )
}

export function PackageIcon({ size = 20, className }) {
  return (
    <svg {...baseProps(size, className)}>
      <path d="m3.5 7.5 8.5-4.5 8.5 4.5-8.5 4.5-8.5-4.5Z" />
      <path d="M3.5 7.5v9l8.5 4.5m0-13.5v13.5m8.5-13.5v9l-8.5 4.5" />
    </svg>
  )
}

export function UsersIcon({ size = 20, className }) {
  return (
    <svg {...baseProps(size, className)}>
      <circle cx="9" cy="8" r="3.3" />
      <path d="M2.7 20c.8-3.3 3.4-5.2 6.3-5.2s5.5 1.9 6.3 5.2" />
      <circle cx="17.5" cy="8.5" r="2.6" />
      <path d="M16.3 14.9c2.3.2 4.3 2 5 4.8" />
    </svg>
  )
}

export function ReceiptIcon({ size = 20, className }) {
  return (
    <svg {...baseProps(size, className)}>
      <path d="M6 3h12v18l-2.5-1.5L13 21l-1.5-1.5L10 21l-2.5-1.5L6 21Z" />
      <path d="M8.5 8h7M8.5 12h7M8.5 16h4" />
    </svg>
  )
}

export function BoxOpenIcon({ size = 40, className }) {
  return (
    <svg {...baseProps(size, className)}>
      <path d="M3.5 9.5 12 13l8.5-3.5M12 13v8M3.5 9.5v7L12 21l8.5-4.5v-7L12 3.5Z" />
    </svg>
  )
}

export function CheckCircleIcon({ size = 20, className }) {
  return (
    <svg {...baseProps(size, className)}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12.5 2.5 2.5L16 9.5" />
    </svg>
  )
}
