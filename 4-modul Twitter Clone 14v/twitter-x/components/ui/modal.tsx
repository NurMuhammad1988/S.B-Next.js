import { ReactElement } from "react";
import { Dialog, DialogContent } from "./dialog";
import { X } from "lucide-react";

interface ModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    body?: ReactElement;
    footer?: ReactElement;
    step?:number
    totalSteps?:number
}

export default function Modal({
    // bu modal component endi unversal bo'ldi chunki hamma narsasi dynamic va bu unversal modal componentni har qanday joyda kerakli qiymatlari bilan chaqirib qayta qayta ishlatish mumkun
    body,
    footer,
    isOpen,
    onClose,
    step,
    totalSteps
}: 
ModalProps) {
    return (
        // bu dialog componentni o'zida juda ko'p classlar bor masalan ochilgan dialogdan boshqa joyga yani windowni boshqa joyiga click bo'lganda dialog yopiladi shu va boshqa ko'plab qulayliklari bor
        //
        <Dialog open={isOpen} onOpenChange={onClose}>
            {/* open va onOpenChange  nima?????????????????????? */}
            {/* bu modal componentda shadcndan chaqirilgan dialog componentlar chaqirilib ishlatildi va dynamic qiymatlar berildi bu qiymatlar aslida bo'sh faqat typi berib qo'yilgan holos va modals papkani ichidagi register-modal.tsx failiga chaqirilib ishlatildi  */}
            <DialogContent className="bg-black p-1">
                <div className="flex items-center gap-6">
                    <button className="p-1  border-0 text-white hover:opacity-70 transition w-fit">
                        <X size={28} onClick={onClose} />
                        {/* X rasimga click bo'lganda o'chib ketadi sababi onClose ModalProps interfaseda yozilgan bo'sh funksiya yani void funksiya */}
                    </button>
                    {step && totalSteps && (
                        // agar step bor bo'lsa va totalstepsxam bor bo'lsa yani hali bodydan ketmagan bo'lsa Step textidan keyin stepni qo'y of textidan keyin totalstepsni qo'y  step register-modal.tsxda usestateda chaqirilgan va boshlang'ich qiymati 1 totalSteps esa register-modal.tsxda boshlang'ich qiymati 2 qilingan
                        <div className="text-xl font-bold "> Step {step} of {totalSteps}</div>
                        
                    )}
                    
                </div>

             
                <div className="mt-4">{body}</div>
                {/* modalni body qiymati reactelement qabul qiladi va divni ichida bu body dynamic jo'natilgan */}
                {footer && <div >{footer}</div>}
                {/* agar modalni react element qabul qabul qiladigan footer elementi bor bo'lsa footerni dynamic tarzda jo'natadi agar yo'q bo'lsa jo'natmaydi */}
            </DialogContent>
        </Dialog>
    );
}
