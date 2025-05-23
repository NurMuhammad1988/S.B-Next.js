import { Doc } from "@/convex/_generated/dataModel";
import React, { ElementRef, useRef, useState } from "react";
import { Button } from "../ui/button";
import { ImageIcon, Smile, X } from "lucide-react";
import IconPicker from "./icon-picker"; //bu IconPicker componentda "emoji-picker-react"kutubhonadan kelgan emojilar bor component va functionlar kelgan
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import TextareaAutosize from "react-textarea-autosize"; //kutubhona
import { title } from "process";

interface ToolbarProps {
    document: Doc<"documents">; //shu sabab onIconChange va onRemoveIcon functionlarda chaqirilgan id: document._id,ga type berilmasaham ts urushib bermepti yani hato qaytarmepti chunki bu convexni Doc  functionida umumiy yaratilgan documentni hamma typlari tipizatsa qilingan yani convex o'zi qilgan
    preview?: boolean;
}

function Toolbar({ document, preview }: ToolbarProps) {
    const textareaRef = useRef<ElementRef<"textarea">>(null); //textarea  lekin boshida null qaytaradi chunki textareani joyi ko'rinmasligi kerak yani hidden bo'lib turishi kerak va qachonki qaysidur jsx elementga click qilinganda masalan "Add icon" textli jsx elementga click qilingandagina onIconChange ishlashi kerak bo'lgan ture holatidagina ishga tushib "Add icon" textiga click bo'lganda IconPicker copmonent uchun joy ochadi va IconPicker componentda kelgan iconlar ishga tushadi yani iconpicker uchun joy input holatida va hidden holatida qachonki ref sabab inputda event bo'lganda joy ochiladi

    const [value, setValue] = useState(document.title);

    const [isEditing, setIsEditing] = useState(false);

    const updateFields = useMutation(api.document.updateFields); //bu updateFields functionda convexni patch metodi bor yani convexdagi objectga yangi objectlar va hakozolar qo;shadi bu holatda esa documentga icon qo'shadi yani qabul qiladi

    const onIconChange = (icon: string) => {
        //onIconChange nomli calback functon ichida convex/document.tsxdan kelgan ichida patch metodi bor updateFields functionni  chaqrish va updateFields function ichidan document._id va icon qiymatlarini olish yani id: nmli local o'zgaruvchi ichiga olish
        updateFields({
            id: document._id,
            icon,
        });
    };

    const onRemoveIcon = () => {
        updateFields({
            id: document._id,
            icon: "", //icon bu holatda hech narsa qaytarmeydi yani bo'sh string bu mantiqiy operator bilan tekshirilganda false qaytaradi
        });
    };

    const disableInput = () => {
        setIsEditing(false);
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            disableInput();
        }
    };

    const onInput = (value: string) => {
        //onInput functionda value string qiymat qabul qiladi va usestatedan kelgan setValue ichidagi document.titleni oladi va agar shu title bor bo'lsa titleni chiqaradi yokida "Untitled" textini chiqaradi
        setValue(value);
        updateFields({
            id: document._id,
            title: value || "Untitled",
        });
    };

    const enableInput = () => {
        if (preview) return;

        setIsEditing(true);

        setTimeout(() => {
            setValue(document.title);
            textareaRef.current?.focus();
        }, 0);
    };
    return (
        <div className="pl-[54px] group relative">
            {/* va operatori && Shart: Har ikki operand ham true bo‘lishi kerak.
                     Agar birinchi operand false bo‘lsa, ikkinchi operand tekshirilmaydi (short-circuit).
                     Natija: Birinchi falsy qiymat yoki oxirgi operand.
                     yani chapdan tekshiradi va false bo'lsa ishlashdan to'htaydi agar true bo'lsa jsxni ko'rsatadi yani falseni ko'rgandan to'htaydi yani va va va deb faqat trueni hissobga olib va va deydi va yokida demeydi

                     bu va operatorida bu holatda  agar document.icon false bo'lsa tekshirish to'htaydi yani false yani va operatori falseni ko'rganda to'htaydi

               
            */}
            {!!document.icon &&
                //Agar document.icon mavjud bo‘lsa (masalan serverdan keletgan documentni icon qiymati true bo'lsa), natija true bo‘ladi. Agar mavjud bo‘lmasa yani (null, undefined, "", 0, nan bo'lsa), natija false bo'ladi (!! double bang operatori yani keletgan qiymatni Boolean qiymatga o'giradi)
                //shunday gap. Boolean(document.icon) && ... !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

                //ikkita undov operatori !! yordamida null, undefined, "", 0, va boshqalar aniq falsega aylanadi.

                //Birinchi ! qiymatni inkor qiladi (boolean qiymatga aylanadi, ammo teskari).Ikkinchi ! qiymatni yana inkor qilib, asl truthy/falsy holatni boolean ko‘rinishda beradi.

                //Agar document.icon mavjud va preview yo‘q bo‘lsa, unda <div> elementi sahifada ko‘rsatiladi preview yo'q chunki boolean qiymatiga ega previewni chaqirib boshiga not operatorni ! qo'ydik endi preview aniq false bu va operatori bo'lgani uchun document.icondan keyin va deb nimadur yozish shart edi shu uchun previewni boolean qiymat berib yuqorida yozganbiz

                //yani bu holatda ikkita undov (!!) bilan document.iconni nima qaytarishini yani true yokida false qaytarishini belgilab oldik va bu holatda document.icon nima qaytarishini bilmeymiz lekin nima qaytarsaham yani har qanday malumot turini qaytarsaham uni boolean qivoldik yani endi faqat true yokida false qaytaradi

                //Bu yerda !!document.icon qiymatini aniq Boolean ga aylantirib, tekshiradi. masalan document.iconga bu sahifada type berilmagan yani ts bilan bu document.iconni nima ekanligini bu sahifani hech qayerida qattiy aytib qo'ymaganmiz shu sabab endi document.iconni booleanga o'tkazib olish kerak ikkita undov operatori shu ishni bajaradi yani document.icondan nima kelsaham uni booleanga aylantirib shunga qarab ishlatadi yani document.icon serverdan keladi bu degani kelmay qolishixam mumkun shu uchun bunga type berib ishlatish kerak type esa default berilmagan shu sabab deyildiki  bu document.iconni boolean qiymatga o'gir va false bo'lsa bu jsxni ko'rsatma agar true bo'lsa bu jsxni ko'rsat

                //  (!!) null, undefined, "", 0 ni tekshirish yani bu malummotlardan istalganini boolean qiymatga o'tkazib olish uchun yani document.icon bu malumot turlaridan qaysini qaytarsaham shuni booleanga o'girvoladi yani endi document.icondan keletgan datalar true yokida false qiymatiga o'girvolindi

                //yani bu holatda ikkita undov (!!) bilan document.iconni nima qaytarishini yani true yokida false qaytarishini belgilab oldik va bu holatda document.icon nima qaytarishini bilmeymiz lekin nima qaytarsaham yani har qanday malumot turini qaytarsaham uni boolean qivoldik yani endi faqat true yokida false qaytaradi

                //masalan document.icon nullnimi, undefinednimi, "bo'sh stringnimi",  yokida 0 numbernimi nimani qaytarepti shuni bilish yani !!document.icon null, undefined, "", 0 lardan qaysinidur qaytarsa yani hech qaysi malumot turiga oid hech narsani qaytarmasa boshida boolean qiymatli yani false yoki true qiymatidan birinigina qabul qila oladigan previewni false qildik bu holatda preview nimaga kerak yani bu mantiq if else operatorlar false yoki true qabul qiladi masalan bu holatda !!document.icon nima qaytretganini tekshirish uchungina ikkita undov qo'yildi va !previewni false qivolib agar document.icon shulardan>>>null, undefined, "", 0 hech qaysini qaytarmetgan bo'lsa va !preview false bo'lsa shu contentni yani onIconChange function bilan icon qo'yib document.iconni true qilish aytildi bu holatda preview faqat va (&&) operatorni davom ettirish uchun qo'yildi??? yani bu operator kamida ikkita misol bilan ishlaydi yani ko'plikda yani va yani bittamas && har doim kamida ikkita qiymat yoki ifoda bilan ishlaydi. chunki bu o'z nomi bilan va yani bittamas

                ///// let a = true;
                ///// let b = !!a;
                ///// console.log(b); =>>> true

                //Yuqoridagi kod misolida birinchi let ibora a ning qiymatini o'rnatadi true. Keyin, oldidagi ikkita undov belgisi a qiymatni inkor qiladi va b sifatida o'rnatiladi ===true.>>>>>>https://www.shecodes.io/athena/1080-what-do-two-exclamation-marks-mean-in-javascript#:~:text=In%20JavaScript%20and%20some%20programming,value%20of%20a%20boolean%20expression.

                !preview && (
                    // tailwindda group classlarga nom bersaham bo'ladi bu holatda group classimizni nomi icon>>> "group/icon"// agar documentda icon true bo'lsa va preview false bo'lsa bu holatda preview boshlang'ich holati oddiy boolean yani faqat true yoki false qabul qiladi shuni false qilib document.iconni true qilindi sabab bu logical operator false va true qiymatga qarab ishlaydi shu sabab  document.iconni true qilish uchun prewievni false qivoldik va agar document.icon true bo'lsa pastdagi div ishlab unga click qilinganda IconPicker component ishlab ichidagi onIconChange function ishlaydi onIconChange functionda convex/document/updateFields functiondan kelgan documentni idisi  va iconi bor agar shu icon bor bo'lsa shu div ichidagi p tegi ishga tushadi qachonki hover bo'lsa va button ichidagi onRemoveIcon functionga click qilinsa serverdan kelgan icon remove bo'ladi yani>>> ""
                    //yani serverdan kelgan document.iconga hover bo'lganda X iconham ishga tushadi yani agar kerak bo'lsa remove qilish uchun shu uchun onRemoveIcon chaqirilgan buttonga group-hover/icon:opacity-100 classi berilgan yani onIconChange bor yani icon bor va shu iconga  hover qilingada X iconham bor yani hover qilinganda chiqadi va click qilinsa onRemoveIconham bor ishga tushadi va yana iconni udalit qilib document.iconniham previewniham false qiladi yani onRemoveIcon qilingandan keyin document.icon false bo'lib qoladi shunda bu>>>!document.icon && !preview &&  logical operator ishga tushib documentga icon qo'yish yana qaytadan ishlaydi
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
                preview && ( //va yana agar  document.icon true bo'lsa va prewievham true bo'lsa yani avvalda serverda bor bo'lsa yani agar user documentga boshidan icon qo'ygan bo'lsa yokida yuqoridagi !!document.icon && holati true bo'lsa yani  onIconChange function ishlagan bo'lsa yani user iconni qo'ygan bo'lsa  shuni udalit qilish uchun yani icon bor bo'lsa bu operatorham ishlab prewievni true qilib X iconni ishga tushuradi X iconga click qilinsa onRemoveIcon function ishga tushib documentni iconini yana udalit qiladi masalan yangi icon qo'yish uchun//chunki va operatori trueni oladi shu sabab document.icon true bo'lsa va previewham true bo'lsa ishlaydi bu holatda esa preview true chunki oldiga ! qo'yilmagan
                    <p className="text-6xl pt-6">{document.icon}</p>
                )}

            <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
                {!document.icon &&
                    !preview && ( //va yana agar document.icon ham false bo'lsa previewham false bo'lsa yani user document crete qilgandaham icon qo'ymagan bo'lsa yani yuqoridagi hech qaysi operatorlarham ishlamasa yani hammasi false bo'lsa "emoji-picker-react"kutubhonasidan chaqirilgan tayyor ichida to'la kerakli emojilar bor IconPicker component ishga tushadi yani onIconChange function bilan birga ishga tushadi va user hohlagan iconini tanlab documentga qo'shib qo'yishi mumkun yani Add icon textiga click qilinganda convex/document.ts failidagi updateFields function ichidagi patch metodi sabab convexdagi objectga yani user yaratgan documentga icon qo'shiladi Smile icon esa document.icon va prewiev qiymatlar false bo'lganda default ishlab turadi va bu div boshida opacity-0 bo'ladi yani ko'rinmeydi va hover bo'lganda group-hover:opacity-100 shu classlar sabab ko'rinadi va Add icon textiga click qilinganda agar document.icon false bo'lsa icon-picker.tsx failidagi functionlar ishlab iconlar ishga tushadi va add qilinadi
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
                    !preview && ( //document.coverimage va preview  false bo'lsa yani  convex serverdan keladigan documentni coverimage qiymati false bo'lsa "Add cover" textli shu button chiqadi
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

            {!isEditing && !preview ? (
                <TextareaAutosize
                    ref={textareaRef}
                    onBlur={disableInput}
                    onKeyDown={onKeyDown}
                    value={value}
                    onChange={(event) => onInput(event.target.value)}
                    className="text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none"
                />
            ) : (
                <div
                    onClick={enableInput}
                    className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]"
                >
                    {document.title}
                </div>
            )}
        </div>
    );
}

export default Toolbar;

// 9. Editor darsi 33:18da qilindi va buni !isEditing && !preview ?, enableInput, disableInput, onKeyDown, onInput shu functionlarni yahshi tushunib komment yozib keyin editor darsini 33:18dan boshlab davom ettir
