import React from "react";
import { Logo } from "./logo";
import { ModeToggle } from "@/components/shared/mode-toggle";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
    return (
        // tailwinddagi bi fixed classi navbar failini ona diviga berildi fixed bu navbarni bir joyda saqlaydi yaniqimirlamaydi top-0 yani fixeddan keyin berildi bu degani fixedga ishlaydi yani top 0 da navbarni ushlab turadi
        <div className="z-50 bg-background fixed top-0 flex items-center w-full p-6 justify-between flex-wrap">
            <Logo />
            <div className="flex items-center gap-x-2  ">
                <Button size={"sm"} variant={"ghost"} >Log in</Button>
                <Button size={"sm"}>Get Notion Free</Button>

                <ModeToggle />
                {/* modetogle app.components/shared/mode-toggledan chaqirildi darkmode uchun */}
            </div>
        </div>
    );
};
