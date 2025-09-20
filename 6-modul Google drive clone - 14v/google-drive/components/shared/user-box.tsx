"use client";
import { useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarImage } from "../ui/avatar";

const   UserBox = () => {
    const { user } = useUser(); //bu hook app/layout.tsxdagi ClerkProvider sabab userni bor bo'lsa  topadi
    const { signOut } = useClerk(); //register qilgan userni log out qiladigan clerkni hooki yani ClerkProviderga o'ralgan loyihadan log out qiladi
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
                <div className="flex flex-col space-y-4 p-2">
                    <p className="text-xs font-medium leading-none text-muted-foreground">
                        {user?.emailAddresses[0].emailAddress}
                    </p>

                    <div className="flex items-center gap-x-2">
                        <div className="rounded-md bg-secondary p-1">
                            <Avatar className="w-8 h-8">
                                <AvatarImage src={user?.imageUrl} />
                            </Avatar>
                        </div>

                        <div className="space-y-1 ">
                            <p className="text-sm line-clamp-1">
                                {user?.fullName}
                            </p>
                        </div>
                    </div>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        asChild
                        className="w-full cursor-pointer text-muted-foreground"
                        onClick={() => signOut(() => router.push("/sign-in"))} //userni clerkdan log out qiladi
                    >
                        <div role="button">Log out</div>
                    </DropdownMenuItem>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserBox;
