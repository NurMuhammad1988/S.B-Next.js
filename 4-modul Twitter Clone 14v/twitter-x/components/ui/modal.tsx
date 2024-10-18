import { ReactElement } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";

interface ModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    title?: string;
    body?: ReactElement;
    footer?: ReactElement;
    step?: number;
    totalSteps?: number;
}

export default function Modal({
    body,
    footer,
    isOpen,
    onClose,
    title,
    step,
    totalSteps,
}: ModalProps) {
    return (
        // bu dialog componentni o'zida juda ko'p classlar bor masalan ochilgan dialogdan boshqa joyga yani windowni boshqa joyiga click bo'lganda dialog yopiladi shu va boshqa ko'plab qulayliklari bor
        //
        <Dialog open={isOpen} onOpenChange={onClose}>
            {/* open va onOpenChange  nima?????????????????????? */}
            {/* bu modal componentda shadcndan chaqirilgan dialog componentlar chaqirilib ishlatildi va dynamic qiymatlar berildi bu qiymatlar aslida bo'sh faqat typi berib qo'yilgan holos va modals papkani ichidagi register-modal.tsx failiga chaqirilib ishlatildi  */}
            <DialogContent className="bg-black">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div className="mt-4">{body}</div>
                {footer && <div className="mt-4">{footer}</div>}
            </DialogContent>
        </Dialog>
    );
}
