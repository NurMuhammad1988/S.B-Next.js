"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { SessionProvider } from "next-auth/react";

// BU ui.shadcn ni tekin qaramliliksiz ishlatiladigan kodlarini ishlatish uchun next js bilan intigatsa qilish uchun fronted classlar provider kodlari yani next js bilan ui.shadcn ni ulash desaham bo'ladi

export function Provider({ children, ...props }: ThemeProviderProps) {
    return (
        <NextThemesProvider {...props}>
            <SessionProvider>{children}</SessionProvider>
        </NextThemesProvider>
    );
}
