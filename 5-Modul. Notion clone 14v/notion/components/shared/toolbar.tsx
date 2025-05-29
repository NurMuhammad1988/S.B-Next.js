import { Doc } from "@/convex/_generated/dataModel";
import React, { ElementRef, useRef, useState } from "react";
import { Button } from "../ui/button";
import { ImageIcon, Smile, X } from "lucide-react";
import IconPicker from "./icon-picker"; //bu IconPicker componentda "emoji-picker-react"kutubhonadan kelgan emojilar bor component va functionlar kelgan
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import TextareaAutosize from "react-textarea-autosize"; //kutubhona
import { UseCoverImage } from "@/hooks/use-cover-image";

interface ToolbarProps {
    document: Doc<"documents">; //shu sabab onIconChange va onRemoveIcon functionlarda chaqirilgan id: document._id,ga type berilmasaham ts urushib bermepti yani hato qaytarmepti chunki bu convexni Doc  functionida umumiy yaratilgan documentni hamma typlari tipizatsa qilingan yani convex o'zi qilgan
    preview?: boolean; //bu agar documentni yaratgan userdan boshqa user kirganda false qilib qo'yiladi yani toolbardan faqat real user foydalanishi mumkun holos masalan user yaratgan documentini linkini boshqa odamlarga jo'natsa yoki boshqalar notionga kirib postni ko'rsa toolbardan foydalanib documentni o'zgartiraolmasligi kerak shu uchun boolean qilindi va chaqirib ishlatilganda preview false qilib berib qo'yiladi
}

function Toolbar({ document, preview }: ToolbarProps) {
    const coverImage = UseCoverImage();

    const textareaRef = useRef<ElementRef<"textarea">>(null); //useRef — bu React Hook, u  biror DOM elementga yoki oddiy qiymatga murojaat qilish imkonini beradi ///DOM elementga murojaat qilish uchun ishlatiladi.///ElementRef<"textarea"> — bu TypeScript tipi bo‘lib, textarea elementining aniq tipini oladi.///textareaRef.current.focus — bizning textarea elementimizga bog'lanadi va unga to‘g‘ridan-to‘g‘ri kirish imkonini beradi.//useRef - React'ning hook'i bo'lib, DOM elementlariga murojaat qilish yoki qiymatlarni komponent qayta render bo'lishida saqlab qolish uchun ishlatiladi.///Qiymat o'zgarganda qayta render bo'lmaydi //bu textareaRef user document create qilgadna toolbar.tsx failida documenti titlesini o'zgartrish uchun
    const [value, setValue] = useState(document.title); //value stateda boshlang'izch qiymat yani agar user toolbar.tsxda documentni o'zgartirmoqchi bo'lganda documentni convex serverdagi titilesi agar bor bo'lsa boshlang'ich qiymatda shu turadi
    const [isEditing, setIsEditing] = useState(false);

    const updateFields = useMutation(api.document.updateFields); //bu updateFields functionda convexni patch metodi bor yani convexdagi objectga yangi objectlar va hakozolar qo;shadi bu holatda esa documentga icon qo'shadi yani qabul qiladi

    const onIconChange = (icon: string) => {
        //onIconChange nomli calback functon ichida convex/document.tsxdan kelgan ichida patch metodi bor updateFields functionni  chaqrish va updateFields function ichidan document._id va icon qiymatlarini olish yani id: nomli local o'zgaruvchi ichiga olish bu updatefieldsda convexni patch metodi ishlatilgan yani serverdagi objectga change bo'gandatalarni qo'shadi bu holatda documentga "add icon" buttoniga bosilib icon qo'yilganda shu iconni convex serverdagi userni document objectiga patch metodi sabab yangi field ochib realtime holatda qo'shib qo'yadi
        updateFields({
            id: document._id,
            icon,
        });
    };

    const onRemoveIcon = () => {
        updateFields({
            id: document._id,
            icon: "", //icon bu holatda hech narsa qaytarmeydi yani bo'sh string bu mantiqiy operator bilan tekshirilganda false qaytaradi yani onRemoveIcon jsxda X icon bor buttunda ishlatildi yani updatefields papkada agar icon bor bo'lsa shuni ""<<yani false qiladi false yani convex serverdan remove qiladi remove bo'lganda esa X icon ishga tushadi ""yani updatefieldsda icon string qabul qiladi "" bo'sh stringesa false hossoblanadi
        });
    };

    const disableInput = () => {
        setIsEditing(false); //disableInput function setIsEditingni false qiladi chunki onblur bo'lganda ishlamay turishi kerak onBlur react DOM atributi yani ishlatilmaganda false bo'lishi kerak
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        //KeyboardEvent reactni klavushlar bilan ishlaydigan objecti typida esa HTMLTextAreaElement bor yani agar  shu onKeyDown function ishlatiletgan TextareaAutosize texareasida "Enter" klavushi ishlatilsa event sodir bo'ladi yani disableInput functionishga tushadi yani setIsEditing yana qaytadan yani "Enter" bosilgandaham false qilinadi yani hodisa to'htatiladi
        if (event.key === "Enter") {
            event.preventDefault();
            disableInput();
        }
    };

    const onInput = (value: string) => {
        //onInput functionda value string qiymat qabul qiladi va usestatedan kelgan setValue ichidagi document.titleni oladi va agar shu title bor bo'lsa titleni chiqaradi yokida "Untitled" textini chiqaradi
        setValue(value); //yani valustatedagi document.title bor
        updateFields({
            //convex serverga titileni qo'shish uchun
            id: document._id,
            title: value || "Untitled", //agar value statedagi document.title true bo'lsa yani valueda kelgan data true bo'lsa yokida "untitled" texti chiqadi
        });
    };

    const enableInput = () => {
        if (preview) return; //agar user documentni publish qilsa hech narsa qaytarmeydi

        setIsEditing(true); //setisediting shunchaki bitta state boshida false qilingan endi true qilindi bu jsxda if else berish uchun kerak

        setTimeout(() => {
            setValue(document.title);
            textareaRef.current?.focus(); //bu focus method useRef hookini metodi input ichiga focus beradi yani input ichida bo'letgan hodisani agar string bo'lsagina saqlaydi
        }, 0);
    };

    return (
        <div className="pl-[54px] group relative">
            {/* va operatori && Shart: Har ikki operand ham true bo‘lishi kerak.
                     Agar birinchi operand false bo‘lsa, ikkinchi operand tekshirilmaydi (short-circuit).
                     Natija: Birinchi falsy qiymat yoki oxirgi operand.
                     yani chapdan tekshiradi va false bo'lsa ishlashdan to'htaydi agar true bo'lsa jsxni ko'rsatadi yani falseni ko'rgandan to'htaydi yani va va va deb faqat trueni hissobga olib va va deydi va yokida demeydi

                     bu va operatorida bu holatda  agar document.icon false bo'lsa tekshirish to'htaydi yani false yani va operatori falseni ko'rganda to'htaydi shu uchun !! ikkita not operatori bilan tekshirilidi yani !! 2 ta undov keladigan javobni booleanga o'tkizvoladi agar false bno'lsa && va operatori to'htaydi agar javob true bo'lsa va operatori davom etadi yani agar document.icon true bo'lsa va preview false bo'lsa bu holatda va operator document icon true bo'lgandan to'htaydi

               
            */}
            {!!document.icon &&
                //Agar document.icon mavjud bo‘lsa (masalan serverdan keletgan documentni icon qiymati true bo'lsa), natija true bo‘ladi. Agar mavjud bo‘lmasa yani (null, undefined, "", 0, nan bo'lsa), natija false bo'ladi (!! double bang operatori yani keletgan qiymatni Boolean qiymatga o'giradi)
                //shunday gap. Boolean(document.icon) && ... !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

                //ikkita undov operatori !! yordamida null, undefined, "", 0, va boshqalar aniq falsega aylanadi.

                //Birinchi ! qiymatni inkor qiladi (boolean qiymatga aylanadi, ammo teskari yani agar document.iconda kerakli narsa kelsaham truemas false qiladi).Ikkinchi ! qiymatni yana inkor qilib, asl true holatni boolean ko‘rinishda beradi.

                //yani bu holatda ikkita undov (!!) bilan document.iconni nima qaytarishini yani true yokida false qaytarishini belgilab oldik va bu holatda document.icon nima qaytarishini bilmeymiz lekin nima qaytarsaham yani har qanday malumot turini qaytarsaham uni boolean qivoldik yani endi faqat true yokida false qaytaradi

                //Bu yerda !!document.icon qiymatini aniq Boolean ga aylantirib, tekshiradi. masalan document.iconga bu sahifada type berilmagan yani ts bilan bu document.iconni nima ekanligini bu sahifani hech qayerida qattiy aytib qo'ymaganmiz va operatorlariham typga qarab false truni ajratadi shu uchun type bervolish shart shu sabab endi document.iconni booleanga o'tkazib olish kerak ikkita undov operatori shu ishni bajaradi yani document.icondan nima kelsaham uni booleanga aylantirib shunga qarab ishlatadi yani document.icon serverdan keladi bu degani kelmay qolishixam mumkun shu uchun bunga type berib ishlatish kerak type esa default berilmagan shu sabab deyildiki  bu document.iconni boolean qiymatga o'gir va false bo'lsa bu jsxni ko'rsat agar true bo'lsa bu jsxni ko'rsatma

                //  (!!) null, undefined, "", 0 ni tekshirish yani bu malummotlardan istalganini boolean qiymatga o'tkazib olish uchun yani document.icon bu malumot turlaridan qaysini qaytarsaham shuni booleanga o'girvoladi yani endi document.icondan keletgan datalar true yokida false qiymatiga o'girvolindi

                //masalan document.icon nullnimi, undefinednimi, "bo'sh stringnimi",  yokida 0 numbernimi nimani qaytarepti shuni bilish yani !!document.icon null, undefined, "", 0 lardan qaysinidur qaytarsa yani hech qaysi malumot turiga oid hech narsani qaytarmasa boshida boolean qiymatli yani false yoki true qiymatidan birinigina qabul qila oladigan previewni false qildik chunki real userga bu jsx fail ko'rinishi kerak

                ///// let a = true;
                ///// let b = !!a;
                ///// console.log(b); =>>> true

                //Yuqoridagi kod misolida birinchi let ibora a ning qiymatini o'rnatadi true. Keyin, oldidagi ikkita undov belgisi a qiymatni inkor qiladi va b sifatida o'rnatiladi ===true.>>>>>>https://www.shecodes.io/athena/1080-what-do-two-exclamation-marks-mean-in-javascript#:~:text=In%20JavaScript%20and%20some%20programming,value%20of%20a%20boolean%20expression.

                !preview && (
                    // tailwindda group classlarga nom bersaham bo'ladi bu holatda group classimizni nomi icon>>> "group/icon"// agar documentda icon true bo'lsa va preview false bo'lsa bu holatda preview boshlang'ich holati oddiy boolean yani faqat true yoki false qabul qiladi shu false bo'lganda document.iconni true qilindi sabab bu logical operator false va true qiymatga qarab ishlaydi va agar document.icon true bo'lsa va preview false bo'lsa pastdagi div ishlab unga click qilinganda IconPicker component ishlab ichidagi onIconChange function ishlaydi onIconChange functionda convex/document/updateFields functiondan kelgan documentni idisi  va iconi bor agar shu icon bor bo'lsa shu div ichidagi p tegi ishga tushadi qachonki hover bo'lsa va button ichidagi onRemoveIcon functionga click qilinsa serverdan kelgan icon remove bo'ladi yani>>> ""
                    //yani serverdan kelgan document.iconga hover bo'lganda X iconham ishga tushadi yani agar kerak bo'lsa remove qilish uchun shu uchun onRemoveIcon chaqirilgan buttonga group-hover/icon:opacity-100 classi berilgan yani onIconChange bor yani icon bor va shu iconga  hover qilingada X iconham bor yani hover qilinganda chiqadi va click qilinsa onRemoveIconham bor ishga tushadi va yana iconni udalit qilib document.iconni false qiladi yani onRemoveIcon qilingandan keyin document.icon false bo'lib qoladi shunda bu>>>!document.icon && !preview &&  logical operator ishga tushib documentga icon qo'yish yana qaytadan ishlaydi
                    <div className="flex items-center gap-x-2 group/icon pt-6">
                        <IconPicker onChange={onIconChange}>
                            {/* agar va operatorida bu holat sodir bo'lsa convex serverdan documentni  iconi agar avval qo'yilgan bo'lsa keladi yani umuman oganda va operatorni bu holati ishlaganda onIconChange function ishlamaydi lekin IconPickerdan propsbilan kelgan onchange typi sabab onchangeni parametrga berish shart shu uchun onIconChange bu joyga shunchaki ts urushib bermasligi uchun type sifatida chaqirildi*/}
                            {/* bu iconpicker kutubhonadan yuklangan emojilar convexdaham real timeda o'zgarayapti va cserverda saqlanayapti har qanday js loyihada bu kutubhonani olib kelib ishlatish mumkun masalan messenger dasturlar bo'lsa bittada olib kelib o'rantish mumkun tekin qulay oson!! */}
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
                            {/* document.icon true bo'lsa bu X icon ishga tushadi yani user create qilgan documentni iconi avvaldan bor bo'lsa yoki yangi qo'yilgan bo'lsa  yani iconni remove qilish uchun */}
                        </Button>
                    </div>
                )}

            {!!document.icon &&
                preview && ( //va yana agar  document.icon true bo'lsa va prewievham true bo'lsa yani avvalda serverda bor bo'lsa yani agar user documentga boshidan icon qo'ygan bo'lsa yokida yuqoridagi !!document.icon && holati ishlatilib yani icon qo'yilib true bo'lsa yani  onIconChange function ishlagan bo'lsa yani user iconni qo'ygan bo'lsa  shuni udalit qilish uchun yani icon bor bo'lsa shu preview berilsa true yani qo'yilagnini o'zi truga aylantiradi qo'yilmagan joyda esa false yani (secret)/documents/[documentId]/page.tsxda toolbar chaqirilganda preview berilmagan yani u joyda preview false hissoblanadi bu preview faqat app/preview/[documntId]/page.tsx failida berilgan yani faqat o'sha joyda chaqirilgani uchun o'sha joyda true bo'ladi sababi app/preview/[documntId]/page.tsx da documentni idisga qarab get qilish bor yani endi document dynamic yaratilgan edni shu documentni ssikasini boshqa userlarga tashalsa boshqa userlar foydalana olamsiligi uchun yani preview false bo'lgan joyda documentni edit qilib bo'lmaydi lekin preview qiymati toolbar.tsx chaqirilgan joyda berilmasa preview false bo'ladi chaqirilsa true bo'ladi  yani loyihada preview papkadan foydalanadigan userdan boshqa user uchun bu false loyihada biror bir failda toolbar.tsx chaqirilib preview berilsa bu true va user toolbar.tsxni o'zgartira oladi
                    <p className="text-6xl pt-6">{document.icon}</p>
                )}

            <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
                {!document.icon &&
                    !preview && ( //va yana agar document.icon ham false bo'lsa previewham false bo'lsa yani user document crete qilgandaham icon qo'ymagan bo'lsa yani yuqoridagi hech qaysi operatorlarham ishlamasa va tooolbar.tsx chaqirilgan joyda preview qiymatiham berilmagan yani hammasi false bo'lsa "emoji-picker-react"kutubhonasidan chaqirilgan tayyor ichida to'la kerakli emojilar bor IconPicker component ishga tushadi yani hover bo'lganda ishga tushadi yani onIconChange function bilan birga ishga tushadi va user "emoji-picker-react" kutubhonadan kelgan hohlagan iconini tanlab documentga qo'shib qo'yishi mumkun yani Add icon textiga click qilinganda convex/document.ts failidagi updateFields function ichidagi patch metodi sabab convexdagi objectga yani user yaratgan documentga icon qo'shiladi Smile icon esa document.icon va prewiev qiymatlar false bo'lganda default ishlab turadi va bu div boshida opacity-0 bo'ladi yani ko'rinmeydi va hover bo'lganda group-hover:opacity-100 shu classlar sabab ko'rinadi va Add icon textiga click qilinganda agar document.icon false bo'lsa va preview false bo'lsa icon-picker.tsx failidagi functionlar ishlab iconlar ishga tushadi va add qilinadi
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
                    !preview && ( //document.coverimage va preview  false bo'lsa yani  convex serverdan keladigan documentni coverimage qiymati false bo'lsa va preview yani bu toolbar.tsx chaqirilgan joyda toolbar.tsxga preview qiymati berilmagan bo'lsa "Add cover" textli shu button chiqadi !preview false bo'lsa lekin preview papkada chaqirilganda bu toolbarga preview qiymati beriladi shunda bu false true bo'ladi yani bu toolbar.tsx qayergadur shu loyihada chaqirilib ishlatilsa va preview berilmasa unda bu false agar chaqirilsa true yani preview chaqirilsa true bo'ladi chaqirilmasa false bo'ladi yani    BU TOOLBAR TSX  CHAQIRILGAN JOYDA PREVIEW BERILSA SHU JSX ISHGA TUSHADI YANI ENDI TRUE BO'LADI BOSHIDA ESA FALSE EDI yani endi add cover textiga bosilganda onOpenishga tushib event sodir bo'ladi
                        <Button
                            size={"sm"}
                            variant={"outline"}
                            className="text-muted-foreground text-xs"
                            onClick={coverImage.onOpen}
                            //coverImage o'zgaruvchida kelgan onOpen bu usecoverimage hookida yaratilgan store yani   buttonga click bo'lganda event uchun yani buttonni ochadi yanu button ichidagi imageiconga click qilinganda open qiladi nimani open qiladi cover.tsx failini open qiladi cover.tsx failida usecoverimage hooki asosan ishlatilgan yani onOpen ishlaganda edgestore kutubhonadan keladigan component ishlab documentga cover image qo'yish ochiladi yani alohida component bo'lib faqat imageni qurulma hotirasidan olib yuklash uchun kerakli ui ishga tushadi bu joydaham bu cover imageni ishlatilish sababiesa add icon va add cover textlari yonmayon turipti add cover textiga bosilganda esa cover.tsx fail ishga tushadi (onOpen sabab!!!)
                        >
                            <ImageIcon className="h-4 w-4 mr-2" />
                            <span>Add cover</span>
                        </Button>
                    )}
            </div>

            {!isEditing && !preview ? ( //yani react-textarea-autosize kutubhonasidan kelgan  TextareaAutosize ishlaydi qachonki isEditing false bo'lsa va previewham false bo'lsa yani preview qiymati berilmagan joyda yani dynamic yaratiladigan linklarda emas yani faqat shu documenti yaratgan user uchun ishlaydi
                <TextareaAutosize
                    ref={textareaRef}
                    onBlur={disableInput}
                    onKeyDown={onKeyDown}
                    value={value}
                    onChange={(event) => onInput(event.target.value)} //inputga onInput functionda yozilgan eventni saqlab va updateFieldsga joylashtiradi
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
