import { Doc } from "@/convex/_generated/dataModel";
import React, { ElementRef, useRef, useState } from "react";
import { Button } from "../ui/button";
import { ImageIcon, Smile, X } from "lucide-react";
import IconPicker from "./icon-picker"; //bu IconPicker componentda "emoji-picker-react"kutubhonadan kelgan emojilar bor component va functionlar kelgan
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import TextareaAutosize from "react-textarea-autosize"; //kutubhona

interface ToolbarProps {
    document: Doc<"documents">; //shu sabab onIconChange va onRemoveIcon functionlarda chaqirilgan id: document._id,ga type berilmasaham ts urushib bermepti yani hato qaytarmepti chunki bu convexni Doc  functionida umumiy yaratilgan documentni hamma typlari tipizatsa qilingan yani convex o'zi qilgan
    preview?: boolean;
}

function Toolbar({ document, preview }: ToolbarProps) {
    const textareaRef = useRef<ElementRef<"textarea">>(null); //textarea IconPicker componentni chiqarish uchun kerak lekin boshida null qaytaradi chunki textareani joyi ko'rinmasligi kerak yani hidden bo'lib turishi kerak va qachonki qaysidur jsx elemtga click qilinganda masalan "Add icon" textli jsx elementga click qilingandagina onIconChange ishlashi kerak bo'lgan ture holatidagina ishga tushib "Add icon" textiga click bo'lganda IconPicker copmonent uchun joy ochadi va IconPicker componentda kelgan iconlar ishga tushadi

    const [value, setValue] = useState("");

    const [isEditing, setIsEditing] = useState(false);

    const updateFields = useMutation(api.document.updateFields); //bu updateFields functionda convexni patch metodi bor yani convexdagi objectga yangi objectlar va hakozolar qo;shadi bu holatda esa documentga icon qo'shadi yani qabul qiladi

    const onIconChange = (icon: string) => {
        //onIconChange nomli calback functon ichida convex/document.tsxdan kelgan ichida patch metodi bor updateFields functionni  chaqrish
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

    const disableInput = () => {};

    const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {};

    return (
        <div className="pl-[54px] group relative">
            {!!document.icon &&
            //Bu yerda !!document.icon qiymatini aniq Boolean ga aylantirib, tekshiradi. masalan document.iconga bu sahifada type berilmagan yani ts bilan bu document.iconni nima ekanligini bu sahifani hech qayerida qattiy aytib qo'ymaganmiz shu sabab endi document.iconni booleanga o'tkazib olish kerak ikkita undov operatori shu ishni bajaradi yani document.icondan nomakelsaham uni booleanga aylantirib shunga qarab ishlatadi
                !preview && ( 
                    //o'zgaruvchi oldidagi ikkita undov belgisi "yo'q" degan ma'noni anglatadi . Bu operator mantiqiy ifoda qiymatini inkor etadi????????????????????

                    //  (!!) null, undefined, "", 0 ni tekshirish yani bu malummotlardan istalganini boolean qiymatga o'tkazib olish uchun yani document.icon bu malumot turlaridan qaysini qaytarsaham shuni booleanga o'girvoladi yani endi document.iconda true yokida false bor?????????????????????????

                    //yani bu holatda ikkita undov (!!) bilan document.iconni nima qaytarishini yani true yokida false qaytarishini belgilab oldik va bu holatda document.icon nima qaytarishini bileymiz lekin nima qaytarsaham yani har qanday malumot turini qaytarsaham uni boolean qivoldik yani faqat true yokida false qaytaradi agar???????????????????????????????????????????

                    //masalan document.icon nullnimi, undefinednimi, "bo'sh stringnimi", 0yokida 0numbernimi nimani qaytarepti shuni bilish yani !!document.icon null, undefined, "", 0 lardan qaysinidur qaytarsa yani hech qaysi malumot turiga oid hech narsani qaytarmasa boshida boolean qiymatli yani false yoki true qiymatidan birinigina qabul qila oladigan previewni false qildik bu holatda preview nimaga kerak yani bu mantiq if else operatorlar false yoki true qabul qiladi masalan bu holatda !!document.icon nima qaytretganini tekshirish uchungina ikkita undov qo'yildi va !previewni false qivolib agar document.icon shulardan>>>null, undefined, "", 0 hech qaysini qaytarmetgan bo'lsa va !preview false bo'lsa shu contentni yani onIconChange function bilan icon qo'yib document.iconni true qilish aytildi bu holatda preview faqat va (&&) operatorni davom ettirish uchun qo'yildi??? yani bu operator kamida ikkita misol bilan ishlaydi yani ko'plikda yani va yani bittamas?????????????????????????????????????

                    ///// let a = true;
                    ///// let b = !!a;
                    ///// console.log(b); =>>> true

                    //Yuqoridagi kod misolida birinchi let ibora a ning qiymatini o'rnatadi true. Keyin, oldidagi ikkita undov belgisi a qiymatni inkor qiladi va b sifatida o'rnatiladi ===true.>>>>>>https://www.shecodes.io/athena/1080-what-do-two-exclamation-marks-mean-in-javascript#:~:text=In%20JavaScript%20and%20some%20programming,value%20of%20a%20boolean%20expression.

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
                            {/* document.icon true bo'lsa bu X icon ishga tushadi yani user create qilgan documentni iconi avvaldan bor bo'lsa  yani iconni remove qilish uchun */}
                        </Button>
                    </div>
                )}

            {!!document.icon &&
                preview && ( //va yana agar  document.icon true bo'lsa va prewievham true bo'lsa yani avvalda serverda bor bo'lsa yani agar user documenta icon qo'ygan bo'lsa shuni udalit qilish uchun yani icon bor bo'lsa bu operatorham ishlab prewievni true qilib X iconni ishga tushuradi X iconga click qilinsa onRemoveIcon function ishga tushib documentni iconini yan udalit qiladi masalan yangi icon qo'yish uchun
                    <p className="text-6xl pt-6">{document.icon}</p>
                )}

            <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
                {!document.icon &&
                    !preview && ( //va yana agar document.icon ham false bo'lsa previewham false bo'lsa yani user document crete qilgandaham icon qo'ymagan bo'lsa yani yuqoridagi hech qaysi operatorlar ishlamasa yani hammasi false bo'lsa "emoji-picker-react"kutubhonasidan chaqirilgan tayyor ichida to'la kerakli emojilar bor IconPicker component ishga tushadi yani onIconChange function bilan birga ishga tushadi va user hohlagan iconini tanlab documentga qo'shib qo'yishi mumkun yani Add icon textiga click qilinganda convex/document.ts failidagi updateFields function ichidagi patch metodi sabab convexdagi objectga yani user yaratgan documentga icon qo'shiladi Smile icon esa document.icon va prewiev qiymatlar false bo'lganda default ishlab turadi va bu div boshida opacity-0 bo'ladi yani ko'rinmeydi va hover bo'lganda group-hover:opacity-100 shu classlar sabab ko'rinadi va Add icon textiga click qilinganda agar document.icon false bo'lsa icon-picker.tsx failidagi functionlar ishlab iconlar ishga tushadi va add qilinadi
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

                {!document.coverImage &&
                    !preview && ( //document.coverimage va preview  false bo'lsa yani  convex serverdan keladigan documentni coverimage qiymati false bo'lsa "Add cover" textli shu button chiqadi image icon bilan
                        <Button
                            size={"sm"}
                            variant={"outline"}
                            className="text-muted-foreground text-xs"
                        >
                            <ImageIcon className="h-4 w-4 mr-2" />
                            <span>Add cover</span>
                        </Button>
                    )}
            </div>

            {!isEditing && !preview ? ( //boshida false qilingan isEditing haliham false bo'lsa va previewham false bo'lsa
                <TextareaAutosize
                    ref={textareaRef}
                    onBlur={disableInput}
                    onKeyDown={onKeyDown}
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    className="text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none"
                />
            ) : (
                <></>
            )}
        </div>
    );
}

export default Toolbar;

9. Editor darsida 25:20 da qotib qoldim shu joyidan boshlab !! operatorni yahshilab tushun o'qi izlan va bu ikkita undovni qayerda yozgan bo'lsang o'sha joydagi yozgan commentlaringni qaytadan tekshirib hato commentlarni to'g'irla keyin shu 25:20 dan boshlab darsni davom ettir ungacha darsni davom ettirma (bu sahifadagi  ikkita undov haqidagi commentlarniham to'g'irla yani tushunib qaytadan yoz)
