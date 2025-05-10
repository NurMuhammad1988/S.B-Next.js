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
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Settings } from "lucide-react";

//bu setting-modal.tsx component realuser uchun yaratilgan sidebar.tsxda dynamic yaratilgan item.tsxlarni settings labellesida chaqirilgan yani real user o'z sidebarida settings labelda kelgan settings textiga click qilganda shu settings-modal.tsx component ishga tushadi bu modal modal-provider.tsx bilan asosiy layout.tsx failida chaqirilgan chunki ildizpapka hissoblangan layout.tsxda chaqirilganda dasturni istalgan joyida ishlatish mumkun yani masalan bu settings-modalni real user uchun qilingan sidebar.tsxda chaqirib chalkashtirib ishlatmasdan alohida joyda alohida papkalar ichida ishlatish mumkun degani settings-modal.tsxni  modal-provider.tsxda chaqirvolib keyin modal-provider.tsxni layout.tsxda chaqirilishini sababi yani o'rab o'rab chaqirilishi sababi modal-provider.tsxda if else bilan useeffect ishlatilgan qilingan yani agar useEffect ishlaganda yani user kirganda mounted qiymati true bo'lsa bu component ishga tushadi yokida nullni yani hech narsani qaytaradi shunda sayt aynan shu settings-modal component uchun qayta qayta update bo'lmasdan faqat kerak bo'lgan payti ishlaydi bu reactni asosiy qoidalaridan biri hissoblanadi

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
                        <Label>Appearance </Label>
                        <span className="text-[0.8rem] text-muted-foreground">
                            Customize how Notion looks on your device
                        </span>
                    </div>
                    <ModeToggle />
                    {/* dark light toggle own component from shadcn ui dark yoki lighjt qilish faqat asosiy bosh sahifada bor edi endi esa real user uchun ochiladigan sidebar.tsxdagi setting labelli items.tsxdaham dark light qilish bor yani real userham documentlar bilan ishlaydigan joyda themani o'zgartirishni chaqirdik*/}
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-y-1">
                        <Label>Payments </Label>
                        <span className="text-[0.8rem] text-muted-foreground">
                            Manage your subscription and billing information
                        </span>
                    </div>
                    <Button size={"sm"}>
                        <Settings size={16} />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SettingsModal;
