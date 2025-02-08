import { LucideIcon } from "lucide-react"; //??????????????????????????????
import React from "react";
import { BsDot } from "react-icons/bs";

interface Props {
    label: string;
    icon: LucideIcon;
    notification?: boolean;
}

const SidebarItem = ({ icon: Icon, label, notification }: Props) => {
    return (
        <div className="flex flex-row items-center">
            {/* {Mobile sidebar item} */}
            <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 lg:hidden">
                {/* lg bo'ganda mobile stylelar hidden bo'ladi desktopniki esa default holatda hidden bo'ladi agar mobile holati bo'lmasi true bo'ladi */}
                <Icon size={28} color="white" />
            </div>
            {/* {Desktop sidebar item} */}

            {/* pastdagi desktop stylelelari hidden esa mobile responseniki yani tailwind cssda birinchi default holatda mobile response turadi shu sabab desktop stylelearda birinchi hidden berildi yani desktop yani lg sizeda birinchi default style hissoblangan mobile response hidden bo'ladi  */}
            <div className="relative hidden lg:flex gap-4 p-4 rounded-full  hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer items-center ">
                <Icon size={24} color="white" />
                <p className="hidden lg:block text-xl text-white"> {label}</p>
                {notification ? (//bu notification sidebar.tsxdan kelgan path yani sidebar.tsx failidagi pathlarga click bo'lganda masalan notifications textiga click bo'lganda agar notification true bo'lsa yani serverdan notificationslar kelgan bo'lsa shularni pastdagi rasim steylelar bilan uiga ko'rsatadi yokida nullni qaytaradi yani hech narsani
                    <BsDot
                        className={"text-sky-500 absolute -top-4 left-0"}//bu notifications textida yangilik bo'sa sky rangida chiqib turadigan nuqta
                        size={70}
                    />
                ) : null}
            </div>
        </div>
    );
};

export default SidebarItem;
