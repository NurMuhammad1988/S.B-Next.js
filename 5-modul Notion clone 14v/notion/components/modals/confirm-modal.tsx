"use client";
import React from "react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";



interface ConfirmModalProps {
    children: React.ReactNode;
    onConfirm: () => void;
}
// bu confirimmodal componenti trash-box,tsx failida ishlatilgan va asosan shadcn uidan kelgan componentlar bilan ishlangan
const ConfirmModal = ({ children, onConfirm }: ConfirmModalProps) => {
    const handleConfirm = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>//yani mishka bilan event sodir bo'lganda
    ) => {
        e.stopPropagation();
        onConfirm();//onConfirm bo'sh function bu holatda shunday bo'shligicha trash-box.tsc failiga export qilinadi u yerda esa ichiga function chaqiriladi va pastda Confirim textiga click bo'lganda bu handleConfirm function ishlaydi yani ichidagi bu bosh onConfirimham trash-box.tsx failida ichida chaqirilgan onRemove function bilan ishlaydi
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger onClick={(e) => e.stopPropagation()} asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your document and remove your data from our
                        servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm}>
                        Confirim
                        {/* confirim textiga bosilganda document butunlay udalit bo'ladi confirim textiga click bo'lib handleConfirm function ishlaganda ichidagi bosh onConfirm function trash-box.tsx failidan turib ishlaydi*/}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ConfirmModal;
