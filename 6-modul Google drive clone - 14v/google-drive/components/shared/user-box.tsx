"use client";
import { useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React from "react";
import { DropdownMenu, DropdownMenuContent } from "../ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarImage } from "../ui/avatar";

const UserBox = () => {
    const { user } = useUser(); //bu hook app/layout.tsxdagi ClerkProvider sabab userni bor bo'lsa  topadi
    const { signOut } = useClerk();
    const router = useRouter();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div role="button">
                    <Avatar>
                        <AvatarImage src={user?.imageUrl} />
                    </Avatar>
                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className="w-80"
                align="start"
                alignOffset={11}
                forceMount
            >
              
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserBox;
