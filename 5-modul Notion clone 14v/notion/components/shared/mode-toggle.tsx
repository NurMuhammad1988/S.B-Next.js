"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
///ui.shadcn.com saytidan chaqirilgan uilar dark va light modelar uchun tayyor ui.shadcn kodlari va hech kimga qaram emas shaxsiy kodday yani chaqirilmadi shunchaki yuklab olindi yuklaganda aftamatik tarzda loyihani ichida components/ui papka ochib tayyor kodlarni o'sha papka ichiga yuklab oladi bu mode-toggle.tsx failiham kodlari shu saytdan kelgan  va nomlarini o'zgartirmaslik kerak shu nomlar asosida bir biridan bir biriga chaqirilib ishlatilgan// bu togge function dark light qilish uchun kerak dark light bo'lib classlar o'zgarganda components/ui papka ichidagi button va dropdownmenu faillariishga tushadi
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
