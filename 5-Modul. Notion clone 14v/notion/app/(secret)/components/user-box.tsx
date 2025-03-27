"use client";
//bu page user document createga kirganda userni doxumentlari va hakozolari ko'rinib turadigan page yani userbox hamma narsasi shu joyda
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { ChevronsLeftRight } from "lucide-react";
import React from "react";

export const UserBox = () => {
    const { user } = useUser();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div
                    role="button"
                    className="flex items-center text-sm p-3 w-full hover:bg-primary/5"
                >
                    <div className="gap-x-2 flex items-center max-w-[150px]">
                        <Avatar className="h-5 w-5">
                            <AvatarImage src={user?.imageUrl} />
                        </Avatar>

                        <span className="text-start font-medium line-clamp-1">
                            {user?.firstName}&apos;s Notion
                        </span>
                    </div>

                    <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground h-t w-4" />
                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className="w-80"
                align="start"
                alignOffset={11}
                forceMount
            >
                <div className="flex flex-col space-y-4 p-2">
                    {/* userni datalari bor div */}
                    <p className="text-xs font-medium leading-none text-muted-foreground">
                        {user?.emailAddresses[0].emailAddress}
                    </p>

                    <div className="flex items-center gap-x-2">
                        <div className="rounded-md bg-secondary p-1">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={user?.imageUrl} />
                            </Avatar>
                        </div>

                        <div className="space-y-1">
                            <p className="text-sm line-clamp-1">
                                {user?.fullName}&apos;s Notion
                            </p>
                        </div>
                    </div>
                </div>

                <DropdownMenuSeparator />
                {/* DropdownMenuSeparator bu huddi hr yani chiziqcha yuqoridagi delete texti bilan last edidted by textni orasini ochib turgan hr */}
          


            <DropdownMenuItem asChild className="w-full cursor-pointer text-muted-foreground">
                <SignOutButton>
                    {/* bu  SignOutButton clerkni componenti bunga bosilgandan clerk userni dasturdan chiqarvoradi*/}
                    Log Out
                </SignOutButton>
            </DropdownMenuItem>

            </DropdownMenuContent>

        </DropdownMenu>
    );
};
// 5. Items 23: 40
