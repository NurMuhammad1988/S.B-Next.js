import { LucideIcon } from "lucide-react";
import React from "react";

interface ItemProps {
    icon: LucideIcon;
    label: string;
    path?: string;
}

const Item = ({ icon: Icon, label, path }: ItemProps) => {
    return (
        <div className="flex items-center transition hover:bg-secondary rounded-full px-4 py-2 cursor-pointer">
            {/* bu holatda interface ichidagi icon  Item componentda  chaqirilgada  component qilindi yani endi bir vaqtni o'zida iconni component qilib chaiqib classlarham berib ketsa bo'ladi*/}
            <Icon className="w-5 h-5" />
            <span className="pl-2 text-md opacity-75">{label}</span>
        </div>
    );
};

export default Item;
