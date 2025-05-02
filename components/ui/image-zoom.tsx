"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ImageZoomProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
}

export function ImageZoom({ src, alt, width, height, className }: ImageZoomProps) {
  const [isZoomed, setIsZoomed] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const imageRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!imageRef.current) return

      const { left, top, width, height } = imageRef.current.getBoundingClientRect()
      const x = ((e.clientX - left) / width) * 100
      const y = ((e.clientY - top) / height) * 100

      setPosition({ x, y })
    },
    [imageRef],
  )

  const handleMouseEnter = useCallback(() => {
    setIsZoomed(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsZoomed(false)
  }, [])

  return (
    <div
      ref={imageRef}
      className={cn("relative overflow-hidden rounded-lg cursor-zoom-in", isZoomed && "cursor-zoom-out", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <div className="aspect-square relative">
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          fill
          className={cn("object-contain transition-transform duration-200", isZoomed && "scale-150")}
          style={
            isZoomed
              ? {
                  transformOrigin: `${position.x}% ${position.y}%`,
                }
              : undefined
          }
        />
      </div>
    </div>
  )
}

