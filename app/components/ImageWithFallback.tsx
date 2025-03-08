'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ImageWithFallbackProps {
  src: string
  alt: string
  fill?: boolean
  className?: string
  style?: React.CSSProperties
}

export default function ImageWithFallback({
  src,
  alt,
  fill = false,
  className = '',
  style = {},
  ...props
}: ImageWithFallbackProps & Omit<React.ComponentProps<typeof Image>, 'src' | 'alt' | 'fill'>) {
  const [error, setError] = useState(false)
  
  // Fallback image (solid color with first letter of alt text)
  const fallbackSrc = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 300 200' style='background-color:%23f3f4f6;'><text x='50%' y='50%' font-family='Arial' font-size='42' font-weight='bold' text-anchor='middle' dominant-baseline='middle' fill='%239ca3af'>${alt.charAt(0).toUpperCase()}</text></svg>`

  return (
    <Image
      src={error ? fallbackSrc : src}
      alt={alt}
      fill={fill}
      className={className}
      style={style}
      onError={() => setError(true)}
      {...props}
    />
  )
} 