"use client";

import { Bell, Home, User } from "lucide-react"; //iconlar
import Image from "next/image";
import Link from "next/link";
import SidebarItem from "./sidebar-item";
import SidebarPostButton from "./sidebar-post-button";
import SidebarAccount from "./sidebar-account";
import { IUser } from "@/types";
import { MdOutlineExplore } from "react-icons/md";

const Sidebar = ({ user }: { user: IUser }) => {
    // console.log(user);
    const sidebarItems = [
        {
            label: "Home",
            path: "/",
            icon: Home,
        },

        {
            label: "Notifications",
            path: `/notifications/${user?._id}`,
            icon: Bell,
            notification: user?.hasNewNotifications,
        },

        {
            label: "Profile",
            path: `/profile/${user?._id}`,
            icon: User,
        },

        {
            label: "Explore",
            path: "/explore",
            icon: MdOutlineExplore,
        },
    ];


    // sticky left-0 top-0 classlsari chap tarafga yopishib turishi uchun
    return (
        // sticky top qilindi yani left tomondan 0 qilindi yani sidebar component chap tarafda qotib turadi yuqoridagi sidebarItems arrayda esa pathlar berilgan yani labellarga bosilganada pathdagi componentlarga aftamatik tarzda o'tib ketadi chunki sidebarItems sidebarItems map qilinib next Linkga o'ralgan va keyiga path berilgan endi sidebarItemsdagi path ichida berilgan dynamic adresslarga o'tib ketadi u adreslar g anext [] shu array ichida yozilgan papkalar ichidagi page ts larga kirib boradi yani navigatsa yani ``<<BU ICHIDA YOZILGANDA DYNAMIC QIYMAT BERISH mumkun va [] ichida yozilgan papakalardagi asisisy failga nextni o'zi kirib boradi yani next dynamic idlar sluglar bilan ishlashda moslashtirilgan aftamatik tarzda []shuni ichiga kirib boradi pathlar
        <section className="sticky left-0 top-0 h-screen lg:w-[266px] w-fit flex flex-col justify-between py-4 pl-2">
            <div className="flex flex-col space-y-2">
                <div className="rounded-full h-14 w-14 p-4 flex items-center justify-center hover:bg-sky-300 hover:bg-opacity-10 cursor-pointer transition">
                    <Image
                    // mobile versiya uchun x svg rasmi
                        width={56}
                        height={56}
                        src={"/images/logo.svg"}
                        alt="logo"
                    />
                </div>

                {sidebarItems.map((item) => (//sidebarItems map qilinib yani datalar nusxalanib key link ichida yuqoridagi dynamic pathlar key bilan berilib sidebarItemga jo'natildi sidebarItemni parametridagi ...item bu sidebarItems map qilgan narsalarni copy qilish href shu itemdagi path sabab sidebarItemdagi textlarga bsoilganda o'sha pagelarga o'tadi
                    <Link key={item.path} href={item.path}>
                        <SidebarItem {...item} />
                        {/* ...spread operator */}
                    </Link>
                ))}

                <SidebarPostButton />
            </div>
            <SidebarAccount user={user} /> 
            {/*  user={user} qilib sidebaraccountga props bilan user jo'natildi userda esa IUser typi bor yani userni hamma typlari bor  */}
        </section>
        
    );
};

export default Sidebar;
