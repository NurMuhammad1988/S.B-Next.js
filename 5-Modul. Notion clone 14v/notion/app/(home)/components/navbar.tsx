import React from "react";
import { Logo } from "./logo";

export const Navbar = () => {
    return (
        // tailwinddagi bi fixed classi navbar failini ona diviga berildi fixed bu navbarni bir joyda saqlaydi yaniqimirlamaydi top-0 yani fixeddan keyin berildi bu degani fixedga ishlaydi yani top 0 da navbarni ushlab turadi
        <div className="z-50 bg-background fixed top-0 flex items-center w-full p-6">
            <Logo/>
            <div className="flex items-center gap-x-2 ">
                
            </div>
        </div>
    );
};
