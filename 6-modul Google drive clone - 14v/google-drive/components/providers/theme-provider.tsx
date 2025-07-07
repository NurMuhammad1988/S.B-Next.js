"use client";
//tailwindda biz yozadigan dark va light classlarni holatiga qarab dark va light qilishni hal qiladigan provider bu asosiy layout.tsxda chaqirilgan chunki bu provider yani hamma joyda ishlashi kerak
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
