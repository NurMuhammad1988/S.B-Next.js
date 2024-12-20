import { IUser } from "@/types";
import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

//ProfileHero component server side rerndring bo'lgani uchun browserda obnavit qilinmasa styllarni yoki boshqa o'zgarishlarni ko'rib bo'lmaydi

// 8. Profile 12: 44 chi minutda qoldi

const ProfileHero = ({ user }: { user: IUser }) => {
    return (
        <div className="h-44 relative bg-neutral-800 ">
            {user.coverImage ? (//userni coverimage iconi bor bo'lsa ko'rsat agar yo'q bo'lsa pastdagi default imageni ko'rsat yani "/images/cover-placeholder.png"ni
                <Image
                    fill//ona div position relativi classi berilganda next imagega fill qiymati beriladi
                    src={user.coverImage}//agar serverdan keletgan userni coverimagesi bor bo'lsa next imageni ichida bo'ladi
                    // fillni  ona divdagi relative classi sabab
                    alt={user.name}//nextni seo uchun udar functioni yani agar userni coverimagesi bor bo'lsa userni namesini shu imagega qo'yadi htmlda shunday ko'rinadi <img alt="Nurmuhammad Yorov">
                    style={{ objectFit: "cover" }}
                />
            ) : (
                <Image
                    fill
                    src={"/images/cover-placeholder.png"}//default avatar yani agar userni coverimagesi yo'q bo'lsa shu image chiqadi
                    alt={user.name}
                    style={{ objectFit: "cover" }}
                />
            )}

            <div className="absolute -bottom-16 left-4">
                <Avatar>
                    <AvatarImage src={user.profileImage}/>
                    <AvatarFallback className="text-7xl">{user.name[0]}</AvatarFallback>
                </Avatar>
            </div>
        </div>
    );
};

export default ProfileHero;
