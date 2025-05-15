import React from "react";

//bu copmonent "emoji-picker-react"kutubhonasidan chaqirilgan yani emijilar bor tayyor component holida

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

    const theme = themeMap[currenThem];
    return (
        <Popover>
            <PopoverTrigger asChild={asChild}>{children}</PopoverTrigger>
            {/* yani bu IconPicker component toolbar.tsxda chaqirib ishlatilganda shu popoverlarichida boradi va asChild qiymati agar toolbar.tsxda IconPicker ichida chaqirilsa va ichida nima bo'lsa shunga type beradi yani ichida react noe chaqirilgan children ishga tushadi yani hamma emojilarga type bervoldik  */}
            <PopoverContent className="p-0 w-full border-none shadow-none">
                <EmojiPicker
                    height={350}
                    theme={theme}//themani gark yokida light ekanligiga qarab bu emojilar componentiham dark lightga o'zgaradi
                    onEmojiClick={(data) => onChange(data.emoji)}//onChange string typli icon qabul qiladi yani IconPicker chaqirilib ishlatilgan joyda emojilarga click qilingadan shu onEmojiClick qiymati sabab (yani bu onEmojiClick "emoji-picker-react" kutubhonadan keladigan function) onChangeda endi emoji datalari bilan bor bo'ladi yani "emoji-picker-react" kutubhonasidan keladi har safar bu componentga click qilinganda ungacha esa kemey turadi yani har safar bosilganda so'rov ketadi//yani data nomli local o'zgaruvchiga onEmojiClick ichida yozilgan emojilarni sovoldik
                />
            </PopoverContent>
        </Popover>
    );
};

export default IconPicker;

// editor darsni 11 chi minutdan boshlab 24 chi minutgacha yahshi tushunib comment yozib keyin darsni davom ettir!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
