import { ReactElement } from "react";
import { Dialog, DialogContent } from "./dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    body?: ReactElement;
    footer?: ReactElement;
    step?: number;
    totalSteps?: number;
    isEditing?: boolean;
}

export default function Modal({
    // bu modal component endi unversal bo'ldi chunki hamma narsasi dynamic va bu unversal modal componentni har qanday joyda kerakli qiymatlari bilan chaqirib qayta qayta ishlatish mumkun
    body,
    footer,
    isOpen,
    onClose,
    step,
    totalSteps,
    isEditing,
}: ModalProps) {
    return (
        // bu dialog componentni o'zida juda ko'p classlar bor masalan ochilgan dialogdan boshqa joyga yani windowni boshqa joyiga click bo'lganda dialog yopiladi shu va boshqa ko'plab qulayliklari bor
        //
        <Dialog open={isOpen} onOpenChange={onClose}>
            {/* open va onOpenChange  bu Dialog cpmponenti kodlarida dynamic berib qo'yilgan qiymat yani dialog uchun kerak bo'alidan atanalarga moslab nom berilgan qiymat chaqiri shunday ishlatish mumkun yokida false bo'lib turadi}
            {/* bu modal componentda shadcndan chaqirilgan dialog componentlar chaqirilib ishlatildi va dynamic qiymatlar berildi bu qiymatlar aslida bo'sh faqat typi berib qo'yilgan holos va modals papkani ichidagi register-modal.tsx failiga chaqirilib ishlatildi  */}
            <DialogContent
    
                className={cn(//bu ui.shadcn ni configi bu cn esa ichida classlarga hodisa ilsa bo'ladigan funksiya va bu idediting boolean agar bu Modal component chaqirilgan joyda isediting qiymati bor bo'lsa  shu >>"h-[80vh] overflow-x-hidden overflow-y-auto" shu scroll ishlaydi
                    "bg-black p-1 ",
                    isEditing && "h-[80vh] overflow-x-hidden overflow-y-auto"
                )}
            >
                <div className="flex items-center gap-6">
                    <button className="p-1  border-0 text-white hover:opacity-70 transition w-fit">
                        <X size={28} onClick={onClose} />
                        {/* X rasimga click bo'lganda o'chib ketadi sababi onClose ModalProps interfaseda yozilgan bo'sh funksiya yani void funksiyaga yani bo'sh bu modal chaqirib ishlatiladigan joyda yani useregistermodalda onclose funksiyaga false qiymati berib qo'yilgan shu sabab useregistermodalda onclose qiymatiga useregistermodalni onclose qiymati berilganda modal o'chadi yani false bo'ladi */}
                    </button>
                    {step && totalSteps && (
                        // agar step bor bo'lsa va totalstepsxam bor bo'lsa yani hali bodydan ketmagan bo'lsa Step textidan keyin stepni qo'y yani 1 usestate stepdagi boshlang'ich 1 ni qo'y of textidan keyin totalstepsni yani shu modalda dynamic berilgan register-modalda.tsxda chaqirilib qiymati 2 qilkingan 2 ni qo'y  step register-modal.tsxda usestateda chaqirilgan va boshlang'ich qiymati 1 totalSteps esa register-modal.tsxda boshlang'ich qiymati 2 qilingan yani register-modal-tsx ga bu modal component chaqirib ishlatilib shu qiymatlar shunday tarzda yozilsa ishlayveradi yoki boshqa failga chaqirilibham shu qiymatlar statelar berilsa sunday tarzda ishlayveradi
                        <div className="text-xl font-bold ">
                            {" "}
                            Step {step} of {totalSteps}
                            {/* if va else ifdaham ikkala step va totalstep bor bo'lgani uchunham ikkasi ishlaydi */}
                        </div>
                    )}
                </div>

                <div className="mt-4">{body}</div>
                {/* modalni body qiymati reactelement qabul qiladi va divni ichida bu body dynamic jo'natilgan */}
                {footer && <div>{footer}</div>}
                {/* agar modalni react element qabul qabul qiladigan footer elementi bor bo'lsa footerni dynamic tarzda jo'natadi agar yo'q bo'lsa jo'natmaydi */}
            </DialogContent>
        </Dialog>
    );
}
