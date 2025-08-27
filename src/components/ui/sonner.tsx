"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "dark" } = useTheme()

  return (
    <Sonner
        position="top-right"
      theme={theme as ToasterProps["theme"]}
      className="toaster group text-white"
      {...props}
    />
  )
}

export { Toaster }
