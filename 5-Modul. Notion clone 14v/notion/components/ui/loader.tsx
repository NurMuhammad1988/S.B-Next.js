import React from "react";
import { Loader2 } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

const loaderVariants = cva("text-muted-foreground animate-spin", {
    variants: {
        size: {
            default: "h-4 w-4",
            sm: "h-2 w-2",
            lg: "h-6 w-6",
            xl: "h-10 w-10",
        },
    },

    defaultVariants: {
        size: "default"
    }
});

export const Loader = () => {
    return <Loader2 />;
};

2. Avtorizatsiya & Convex 17: 35 da qoldi va shu 2. Avtorizatsiya & Convex darsini tugatgandan keyin shu darsga aloqador hamma malumotlarga comment yoz yahshilab tushunib ket