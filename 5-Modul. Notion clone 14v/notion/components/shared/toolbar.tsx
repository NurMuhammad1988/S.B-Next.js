import { Doc } from "@/convex/_generated/dataModel";
import React from "react";
import { Button } from "../ui/button";
import { Smile, X } from "lucide-react";
import IconPicker from "./icon-picker";//bu IconPicker componentda "emoji-picker-react"kutubhonadan kelgan emojilar bor component va functionlar kelgan
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

interface ToolbarProps {
    document: Doc<"documents">;//shu sabab onIconChange va onRemoveIcon functionlarda chaqirilgan id: document._id,ga type berilmasaham ts urushib bermepti yani hato qaytarmepti chunki bu convexni Doc  functionida umumiy yaratilgan documentni hamma typlari tipizatsa qilingan yani convex o'zi qilgan 
    preview?: boolean;
}

function Toolbar({ document, preview }: ToolbarProps) {
    const updateFields = useMutation(api.document.updateFields);//bu updateFields functionda convexni patch metodi bor yani convexdagi objectga yangi objectlar va hakozolar qo;shadi bu holatda esa documentga icon qo'shadi yani qabul qiladi

    const onIconChange = (icon: string) => {
        updateFields({
            id: document._id,
            icon,
        });
    };

    const onRemoveIcon = () => {
        updateFields({
            id: document._id,
            icon: "", //icon bu holatda hech narsa qaytarmeydi
        });
    };

    return (
        <div className="pl-[54px] group relative">
            {!!document.icon && !preview && (
                // tailwindda group classlarga nom bersaham bo'ladi bu holatda group classimizni nomi icon>>> "group/icon"// agar documentda icon true bo'lsa va preview false bo'lsa bu holatda preview boshlang'ich holati oddiy boolean yani faqat true yoi false qabul qialdi shuni false qilib document.iconni true qilindi sabab bu logical operator false va true qiymatga qarab ishlaydi shu sabab  document.iconni tur qilish uchun prewievni false qivoldik va agar document.icon true bo'lsa pastdagi div ishlab unga click qilinganda IconPicker component ishlab ichidagi onIconChange function ishlaydi onIconChange functionda convex/document/updateFields functiondan kelgan documentni idisi  va iconi bor agar shu icon bor bo'lsa shu div ichidagi p tegi ishga tushadi qachonki hover bo'lsa va button ichidagi onRemoveIcon functionga click qilinsa serverdan kelgan icon remove bo'ladi yani>>> "" 
                //yani serverdan kelgan document.iconga hover bo'lganda X iconham ishga tushaid yani agar kerak bo'lsa remove qilish uchun shu uchun onRemoveIcon chaqirilgan buttonga group-hover/icon:opacity-100 classi berilgan yani onIconChange bor yani icon bor va shu iconga  hover qilingada X iconham bor yani hover qilinganda chiqadi va click qilinsa onRemoveIconham bor ishga tushadi va yana iconni udalit qilib document.iconniham previewniham false qiladi yani onRemoveIcon qilingandan keyin document.icon false bo'lib qoladi shunda bu>>>!document.icon && !preview &&  logical operator ishga tushib documentga icon qo'yish ishlaydi
                <div className="flex items-center gap-x-2 group/icon pt-6">
                    <IconPicker onChange={onIconChange}>
                        <p className="text-6xl hover:opacity-75  transition">
                            {document.icon}
                        </p>
                    </IconPicker>

                    <Button
                        className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
                        variant={"outline"}
                        size={"icon"}
                        onClick={onRemoveIcon}
                    >
                        <X className="h-4 w-4" />
                        {/* document.iscon true bo'lsa bu X icon ishga tushadi yani user create qilgan documentni iconi avvaldan bor bo'lsa  yani iconni remove qilish uchun */}
                    </Button>
                </div>
            )}

            {!!document.icon &&
                preview && ( //va yana agar  document.icon true bo'lsa va prewievham true bo'lsa yani avvalda serverda bor bo'lsa yani agar user documenta icon qo'ygan bo'lsa shuni udalit qilish uchun yani icon bor bo'lsa bu operatorham ishlab prewievni true qilib X iconni ishga tushuradi X iconga click qilinsa onRemoveIcon function ishga tushib documentni iconini yan udalit qiladi masalan yangi icon qo'yish uchun
                    <p className="text-6xl pt-6">{document.icon}</p>
                )}

            <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
                {!document.icon && !preview && (//va yana agar document.icon ham false bo'lsa previewham false bo'lsa yani user document crete qilgandaham icon qo'ymagan bo'lsa yani yuqoridagi hech qaysi operatorlar ishlamasa yani hammasi false bo'lsa "emoji-picker-react"kutubhonasidan chaqirilgan tayyor ichida to'la kerakli emojilar bor IconPicker component ishga tushadi yani onIconChange function bilan birga ishga tushadi va user hohlagan iconini tanlab documentga qo'shib qo'yishi mumkun yani Add icon textiga click qilinganda convex/document.ts failidagi updateFields function ichidagi patch metodi sabab convexdagi objectga yani user yaratgan documentga icon qo'shiladi Smile iocon esa document.icon va prewiev qiymatlar false bo'lganda default ishlab turadi va bu div boshida opacity-0 bo'ladi yani ko'rinmeydi va hover bo'lganda group-hover:opacity-100 shu classlar sabab ko'rinadi va Add icon textiga click qilinganda agar document.iconfalse bo'lsa icon-picker.tsx failidagi functionlarishlab iconlar ishga tushadi va add qilinadi
                    <IconPicker asChild onChange={onIconChange}>
                        <Button
                            size={"sm"}
                            variant={"outline"}
                            className="text-muted-foreground text-xs"
                        >
                            <Smile className="h-4 w-4 mr-2" />
                            <span>Add icon</span>
                        </Button>
                    </IconPicker>
                )}
            </div>
        </div>
    );
}

export default Toolbar;
