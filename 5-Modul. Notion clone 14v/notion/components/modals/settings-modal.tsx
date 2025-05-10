"use client";

import React from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useSettings } from "@/hooks/use-setting";
import { ModeToggle } from "../shared/mode-toggle";

const SettingsModal = () => {
    const settings = useSettings();

    const { isOpen, onClose, onOpen } = settings;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader className="border-b pb-3">
                    <h2 className="text-lg font-medium">My settings</h2>
                </DialogHeader>

                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-y-1">
                        <p>Appearance </p>
                        <span className="text-[0.8rem] text-muted-foreground">
                            Customize how Notion looks on your device 
                        </span>
                    </div>
                    <ModeToggle/>
                    {/* dark light toggle own component from shadcn ui dark yoki lighjt qilish faqat asosiy bosh sahifada bor edi endi esa real user uchun ochiladigan sidebar.tsxdagi setting labelli items.tsxdaham dark light qilish bor yani real userham documentlar bilan ishlaydigan joyda themani o'zgartirishni chaqirdik*/}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SettingsModal;
