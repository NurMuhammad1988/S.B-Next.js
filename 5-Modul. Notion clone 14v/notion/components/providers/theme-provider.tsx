"use client"
//ui.shadcndan kelgan next js uchun moslashtirilgan dark light mode qilish uchun kerak bo'ladigan functionlarni ishlatish uchun provider
import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
