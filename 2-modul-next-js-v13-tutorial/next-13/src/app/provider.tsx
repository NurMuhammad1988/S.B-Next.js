"use client";
import { FC, ReactNode } from "react";
import { Client, HydrationProvider } from "react-hydration-provider";
// npm i react-hydration-provider kutubhona bilan hydration failed hatosini tuzatishni uchinchi yo'li
const Provider: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <HydrationProvider>
            <Client>{children}</Client>
        </HydrationProvider>
    );
};

export default Provider;
