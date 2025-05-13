import React from "react";

import EmojiPicker, { Theme } from "emoji-picker-react";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { useTheme } from "next-themes";

interface IconPickerProps {
    onChange: (icon: string) => void;
    children: React.ReactNode;
    asChild?: boolean;
}

const IconPicker = ({ children, onChange, asChild }: IconPickerProps) => {
    const { resolvedTheme } = useTheme();
    const currenThem = (resolvedTheme || "light") as keyof typeof themeMap;
    const themeMap = {
        dark: Theme.DARK,
        light: Theme.LIGHT,
    };

    const  theme = themeMap[currenThem]
    return (
        <Popover>
            <PopoverTrigger asChild={asChild}>{children}</PopoverTrigger>
            <PopoverContent className="p-0 w-full border-none shadow-none">
                <EmojiPicker
                    height={350}
                    theme={theme}
                    onEmojiClick={(data) => onChange(data.emoji)}
                />
            </PopoverContent>
        </Popover>
    );
};

export default IconPicker;


editordarsni 11 chi minutdan boshlab 24 chi minutgacha yahshi tushunib comment yozib keyin darsni davom ettir