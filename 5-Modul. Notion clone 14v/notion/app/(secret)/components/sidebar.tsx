"use client";
import { cn } from "@/lib/utils";
import {
    ChevronsLeft,
    MenuIcon,
    Plus,
    Rocket,
    Search,
    Settings,
    Trash,
} from "lucide-react";
import React, { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts"; //npm i usehooks-ts commandi bilanchaqirilgan kutubhona vazifasi user dasturga kirganda mobile qurilmadanmi yoki compdan kireptimi shuni aniqlashda kerak bo'ladigan functioni bor
import { DocumentList } from "./document-list";
import { Item } from "./item";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { UserBox } from "./user-box";
import { Progress } from "@/components/ui/progress";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import TrashBox from "./trash-box";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Navbar } from "./navbar";
import { useSearch } from "@/hooks/use-search";
import { useSettings } from "@/hooks/use-setting";
import { useUser } from "@clerk/clerk-react";
import useSubscription from "@/hooks/use-subscription";
import { Loader } from "@/components/ui/loader";

export const Sidebar = () => {
    const isMobile = useMediaQuery("(max-width: 770px)"); //agar user kirgan qurulmasi 770pxdan kam bo'lganda true qaytaradi ko'p bo'lganda false qaytaradi va shu false truga qarab userga har hil style berish kerak yani mobiledan kiretgan userga mobilega moslangan sidebar compdan kirgan userga compga moslangan sidebar ko'rsatish kerak
    // console.log(isMobile);
    const router = useRouter();
    const params = useParams();
    const search = useSearch(); //qo'la yozilgan hook use-search.tsx
    const settings = useSettings();
    const { user } = useUser();

    const createDocument = useMutation(api.document.createDocument); //convex serverda document yaratadigan function/// /convex/document.ts

    const sidebarRef = useRef<ElementRef<"div">>(null);
    const navbarRef = useRef<ElementRef<"div">>(null); //Elementlar React ilovalarining eng kichik qurilish bloklaridir . Element foydalanuvchi interfeysida nima bo'lishi kerakligini belgilaydi. Element - bu DOM tugunlari nuqtai nazaridan biz nimani ko'rishni xohlayotganimizni tavsiflovchi oddiy ob'ekt. Reaktsiya elementini yaratish DOM elementlariga nisbatan oson. Element JSX yordamida yoki JSXsiz React yordamida yaratilishi mumkin.//yani bu holatda ElementRef objecti bilan div yaratib boshlang'ich qiymati null qilindi
    const isResizing = useRef(false);

    const [isCollapsed, setIsCollapsed] = useState(isMobile);
    const [isResetting, setIsResetting] = useState(false);

    const { isLoading, plan } = useSubscription(
        user?.emailAddresses[0]?.emailAddress!
    );
    // console.log(plan);
    // console.log(isLoading);

    const documents = useQuery(api.document.getAllDocuments);
    // console.log(documents);

    useEffect(() => {
        if (isMobile) {
            //agar isMobile true bo'lsa yani user kirgan qurulma windowi 770pxdan kichkina bo'lsa collapse functionini ishga tushuradi yokida reset functionni ishga tushuradi
            collapse();
        } else {
            reset();
        }
    }, [isMobile]);

    //ref uchun eng keng tarqalgan foydalanish holati DOM elementiga kirishdir . Misol uchun, agar siz kiritilgan ma'lumotlarni dasturiy tarzda qaratmoqchi bo'lsangiz, bu qulay. Refni JSX da <div ref={myRef}> kabi ref atributiga o'tkazganingizda, React mos keladigan DOM elementini myRef.current ga joylashtiradi.////////////bu holatda siebarRefga joylashtiradi yani pastdagi ona divga joylashtiradi shunda ona divni collapse functionga chaqirvolib if else holatiga qarab stylelarini o'zgartirish mumkun masalan bu holatda yuqorida stete bilan sidebarRefdagi nul divi collapse functionga chaqirilib qaytadan yaratilib keraklistylelari o'zgartirilayapti yani sidebarRefda chaqirilgan ElementRef ichidagi bo'sh diviga pastdagi ona divni chaqirib collapse functioni bilan faqat kerakli joyiga style o'zgartirishlar kiritayapti bu uchun ElementRef currentga pastdagi divni sovoladi va agar ichida pastdagi divi bor sidebarRef o'zgaruvchini currentida pastdagi div kelgan bo'lsa va huddi shunday  navbarRef o'zgaruvchi ichidagi currentda navbarRef divi kelgan bo'lsa boshida false bo'lgan setIsCollapsed va setIsResetting true qilib sidebarda kelgan yangi divga current bilan qaytadan style berildi masalan widthi 0 qilindi va navbarref diviniki esa 100% qilindi va lefti 0 qilindi bu reflardagi currentlarga aynan shu divlar tushishi uchun pastdagi shu divlarga ref={sidebarRef},  ref={navbarRef} deb div atribut bilan berilib qo'yilishi kerak shunda ElementRef qaysi divga borib nusxa olib kelishni biladi (ref yani adress degani) shunda pastdan elementref sabab kelgan divlarni stylelari shu holatga o'zgaradi bunga sabab pastdagi divlargdagi berilgan onclickda (iconlarga) collapse va reset functionlari berib qo'yilgan yani ona diviga berilishi kerak!!!

    //elementref sabab pastdan nusxa olingan divdan kelgan setIsResettingda animatsya yani sekin kirib sekin chiqish stylelari bor yani bu holatda setIsResetting boshida false state agar collapse functiondagi if true bo'lsa setIsResettingham true bo'ladi yani style "0", "100%", "0" ga o'zgarganda bu animatsya styleham qo'shiladi shunda chap tomonga sekin kirib sekin chiqadi😏😏😏  endi truega aylangan isResetting esa umumiy ona divlarga if bilan berib qo'yilgan chunki bu isResetting ona div ichidagi evenlarga qarab ishlashi kerak chunkiiconlar ona div ichida
    const collapse = () => {
        //ChevronsLeft iconiga click bo'lganda ishlaydi
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(true);
            setIsResetting(true);
            sidebarRef.current.style.width = "0"; //ChevronsLeft iconi bor divni widthini 0 qiladi yani yopadi
            navbarRef.current.style.width = "100%"; //MenuIcon iconi bor divni widthini 100% qiladi yani ochadi
            navbarRef.current.style.left = "0"; //MenuIcon iconini chap tomonga 0pxgacha oladi asli kerakmasidi manimcha
            setTimeout(() => setIsResetting(false), 300); //isResetting && "transition-all ease-in  duration-300" classidagi transitonni false qilish uchun
        }
    };

    const reset = () => {
        //MenuIcon iconiga bosilganda ishlaydi
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(false); //collapse function onclick bo'lib setIsCollapsed true bo'lib sidebarni  widthi 0 bo'lib navbarRefni widthi 100% bo'lgandan keyin setIsCollapsed false qilinadi chunki endi pastdagi "240px", "calc(100% - 240)", "240" stylelari ishlashi kerak yani MenuIcon iconi chiqishi kerak
            setIsResetting(true);
            /////// sidebarRef.current.style.width = "240px"; //MenuIcon iconiga bosilganda 240px joy ochadi
            sidebarRef.current.style.width = isMobile ? "100%" : "240px"; // agar isMobile true bo'lsa sidebarref bor divni widthni 100 foiz yokida 240px qil
            /////// navbarRef.current.style.width = "calc(100% - 240)"; //MenuIcon bosilganda calc bilan navbarref uchun 100% widthdan 240px joy ochadi yani ayirib tashaydi
            navbarRef.current.style.width = isMobile
                ? "0"
                : "calc(100% - 240px)"; //agar ismobile true bo'lsa navbarref bor divni widthni 0 qil yokida???????????
            /////// navbarRef.current.style.left = "240"; //MenuIcon bosilganda joyni chap tomondan ochadi
            navbarRef.current.style.left = isMobile ? "100%" : "240px"; //agar ismobile true bo'lsa navbarref bor divni  lefti 100 foiz bo'lsin yani chap tomonga butunlay kirib ketsin yani userni windovi 770pxdan kichkina bo'lsa sidebarni boshidan ko'rinmasligi uchun lekin 770pxdan ortiq bo'lganda sidebar ko'rinib turardi endi esa boshidan  faqat menuicon iconi ko'rinadi holos yani mobiledan kiradigan user uchun qulaylik
            setTimeout(() => setIsResetting(false), 300);
        }
    };

    const handleMouseDown = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.preventDefault(); //preventDefault() hodisa metodi. Ushbu usul brauzerning hodisa ko'rib chiqilayotganda paydo bo'ladigan standart xatti-harakatlarini bekor qiladi . Misol uchun, biz havolani bosganimizda, biz ushbu havolaning manziliga o'tamiz. preventDefault() ni chaqirish bu xatti-harakatni bekor qiladi.
        event.stopPropagation(); //bu hodisani faqat mouse click bo'lgan joyda ishlatish yani faqat click qilingan joyda ishlaydi butun windiwga tasir qilmaydi

        isResizing.current = true; //ref berilgan isresizing boshida false edi endi shunui currentini true qilindi yani refgatasir qilaolish uchun hodisa ilish uchun
        document.addEventListener("mousemove", handleMouseMove); //umumiy dacumentdan yani js dacumentidan addEventListener metod functionini  "mousemove" qiymati chaqirildi bu "mousemove" tozza jsdan keladigan hodisa ilish uchun ishlatiladigan qiymat yani mishka qimillaganda bu addeventlistinerni birinchi parametriga yoziladi handleMouseMove function esa shu "mousemove" holati ishlaganda birgalikda ishlaydigan function
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (event: MouseEvent) => {
        if (!isResizing.current) return; // agar isResizing false bo'lsa hech qanday mouse hodisasi bo'lmasin
        let newWidth = event.clientX; // global let object newWidth ichida hodisa ovoldik yani x o'qi bo'yicha windowni newWidthga ovoldik

        if (newWidth < 240) newWidth = 240; //agar newWidth x o'qi bo'yichda 240pxdan kam bo'lsa newWidthni yana 240 qilib qo'yish yani sidebar 240pxdan kam bo'lmasligi kerak agar user hohlasa faqat ko'p bo'lishi kerak
        if (newWidth > 400) newWidth = 400; //yani sidebar 400pxgacha chapga o'sadi undan ko'p emas shunda user sidebarni kamida 240 ko'pi bilan 400pxgacha cho'zaoladi
        if (sidebarRef.current && navbarRef.current) {
            // sidebarRef.current && navbarRef.current true bo'lsa yangi hodisalar ilinayapti
            sidebarRef.current.style.width = `${newWidth}px`; //newWidth ni pxlda berish aytib qo'yildi yani bu holatda handleMouseMove functioni ishlaganda
            navbarRef.current.style.left = `${newWidth}px`;
            navbarRef.current.style.width = `calc(100% - ${newWidth}px)`;
        }
    };

    const handleMouseUp = () => {
        //mishka qo'yvorilgandan keyin ishga tushadigan hodisa function yani hodisalarni false qilib udalit qiladi
        isResizing.current = false;
        document.removeEventListener("mousemove", handleMouseMove); //handleMouseMove functioni va addeventlistinerni  mousemove paramaterlarini udalit qilindi
        document.removeEventListener("mouseup", handleMouseUp);
    };

    const onCreateDocument = () => {
        //bu holatda onCreateDocument functionda convexda document create qilish uchun yozilgan createDocument functioni chaqirilib qiymatlaridagi typi v.string berilgan title parametriga stringda  "Untitled" texti berib qo'yildi va bu onCreateDocument functioni "Create a blank" texti bor buttonga onclick bilanberib qo'yildi yani endi shu buttonga click bo'lganda shu onCreateDocument functioni ishlab  createDocument functionda yozilgan convexda dacument cretae qilish ishlaydi yani document create bo'ladi

        if (documents?.length && documents.length >= 3 && plan === "Free") {
            toast.error(
                "You can only create 3 documents in the free plan. (sidebar.tsx onCreateDocument function reaction)"
            );
            return;
        } //user 3 tadan ortiq document yarataolmasligi uchun

        const promise = createDocument({
            title: "Untitled",
        }).then((docId) => router.push(`/documents/${docId}`)); //createDocument convexda ishlab document create bo'lsa shu router sabab userni /documents/ papkaga olib boradi
        toast.promise(promise, {
            //bu holatda createDocumentda useMutation bo'lib convexda yaratilgan document promise o'zgaruvchi ichida createDocument functioon chaqirilib promise metodi bilan yaratilgan sonner kutubhonsidan kelgan toast copmonentdagi loading success error qiymatlariga hodisalar yuklandi masalan bu holatda createDocument document yaratadi va promise esa shu documentga hodisa beradi push esa  craete bo'lgan yangi document bor joyga yani documents ichida dynamic yaratilgan idli documentga navigatsa qiladi
            loading: "Creating a new document...",
            success: "Created a new document", //huddiki promise metodidagi relolve
            error: "Failed to create a new document", //hudiki promise metodidagi reject
        });
    };

    const arr = [1];

    return (
        <>
            <div
                className={cn(
                    "group/sidebar  h-screen bg-secondary overflow-y-auto relative flex w-60 flex-col z-50 sticky left-0 top-0",
                    isResetting && "transition-all ease-in  duration-300",
                    isMobile && "w-0"
                    //yani width 770pxdan kam bo'lsa bu sidebarni asosiy ona divini widthi 0 bo'ladi yani ko'rinmay qoladi nima uchun w-0 o'rniga hidden berilmadi?????
                )}
                ref={sidebarRef} //elementref ishlashi uchun ref jsxda shunday atribut bilan berib qo'yilishi kerak
            >
                {/* bu ona divdagi group classi bola divgaham yozildi shunda bitta class ikkita divga bir hil ishlaydi masalan pastdagi yetim divda group-hover:opacity-100" classi bor bu degani pastdagi divda cursor tursa hover bo'lib shu classlar ishlaydi yani pastdagi divda opacity 0 bo'lib turgabi group-hover:opacity-100" ga o'zgaradi yani cursor faqat pastdagi yetim divga o'tganda shu group-hover:opacity-100" hover klasslari ishlaydi .....................group/sidebar va  group-hover/sidebar:opacity-100 deb yozilishini sababi esa bu sahifada yana shunaqa grouplar qilinganda hammasi ishlashi uchun masalan groupni o'zi bilan qilsa faqat shu group ishlaydi agar bu groupga nom berilsa (bu holatda sidebar deb nom berildi chunki faqat sidebar uchun kerakli group) har hil nomdagi hamma grouplar ishlaydi */}

                <div
                    className={cn(
                        "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
                        isMobile && "opacity-100"
                    )}
                    role="button"
                    onClick={collapse} //bu div ichidagi ChevronsLeft iconiga click bo'lganda shu function ishlaydi
                >
                    {/* opacity-0 group-hover/sidebar:opacity-100 transition shu classlar sabab cursor faqat sidebarga yani shu ona divga o'tgandagina pastdagi yetim divga o'hshab bu iconham ko'rinadi cursor shu ona div ichida bo'lmaganda bu iconham pastdagi yetimdivday ko'rinmay qoladi yani faqat hover bo'lganda ishlaydi role="button" atributini berilishi sababi bu huddi button rolida vazifasi buttun masalan bu iconga click bo'lganda hodisa sodir qilish uchun */}
                    <ChevronsLeft className="h-6 w-6" />
                </div>

                <div>
                    <UserBox />
                    {/* usebox.tsx failda userni avatari va boshqa narsalari bor sidebar.tsxda shularham ko'rinishi kerak bu userbox eng birinchi chaqirilgani uchun userni avatari sahifada eng tepada turipti */}

                    <Item
                        label="Search"
                        icon={Search}
                        isSearch //item.tsxga isSearch nomli qiymat props bilan jo'natildi
                        onClick={() => search.onOpen()} //props bilan jo'natildi yani  item.tsxda endi ichida use-search.tsda yozilgan hook bor search o'zgaruvchi yani hookni onOpen qiymati bor yani onOpen ishlaganda boshida false bo'lgan isOpenni true qiladi
                    />
                    {/* item.tsxda bu labelga iconga onclickga nima ekanligi aytib qo'yilgan shu sabab hatosiz ishlaydi */}

                    <Item
                        label="Settings"
                        icon={Settings}
                        isSettings
                        onClick={() => settings.onOpen()}
                    />

                    <Item
                        label="New document"
                        icon={Plus}
                        onClick={onCreateDocument}
                    />
                    {/* onclickda chaqirilgan yuqorida yozilgan onCreateDocument functionida /convex/document.ts da yozilgan document create qiladigan createDocument functioni bor endi bu sidebar.tsx failidaham qaytadan chaqirilgan item.tsx componentida yozilgan icon qiymatida kelgan lucideni Plus iconiga click bo'lgandaham ota document create bo'ladi
                     */}

                    {/* bu Item app/(secret)/components/item.tsx failidan chaqirilgan shunda item.tsxdagi yaratiladigan documentlar childlari bilan sidebarda ishlaydi */}
                </div>

                <div className="mt-4 ">
                    <DocumentList />
                    {/* DocumentList component boshqa joyda yozilib bu sidebarga chaqirildi bu component bola document yaratish va uni ota doxumentga ulash yangi id bilan dynamic holda yaratish va dynamic [documentId] sahifasiga otvorish uchun kerak shunda sidebarda yuqorida sanab o'tilgan functionallar ishlaydi */}
                    <Item
                        onClick={onCreateDocument}
                        icon={Plus}
                        label="Add a page"
                    />
                    {/* item bu joydaham qo'shilishiga sabab sidebarda pastdaham Plus iconiga bosib yangi ota document va bola document yaratish uchun bu holatda bu failda document create qiladigan convex document.tsdan keladigan createDocument asosiy ota documentni yaratadi DocumentListda ichida keladigan getDocumentsda esa bor documentlarniham yaratadigan functonlar bor (level + 1)!!!!!!!!! */}

                    <Popover>
                        <PopoverTrigger className="w-full mt-4">
                            <Item label="Trash" icon={Trash} />
                            {/* real user uchun chiqadigan sidebardagi trash icon va texti */}
                        </PopoverTrigger>
                        <PopoverContent
                            className="p-0 w-72"
                            side={isMobile ? "bottom" : "right"} //agar mobile versiyada bo'lsa bottom clasi ishlasin yokida o'ng tomondan chiqsin
                        >
                            <TrashBox />
                            {/* trashbox aynan shu popover component ichida chaqirildi chunki faqat shu trash  iconga click bo'lganda ishlashi kerak trashbox componentda esa documentni yoki archivedan chiqarish yoki butunlay udalit qilish imkoniyati bor*/}
                        </PopoverContent>
                    </Popover>
                </div>

                <div
                    className="absolute right-0 top-0 w-1 h-full cursor-ew-resize bg-primary/10 opacity-0 group-hover/sidebar:opacity-100 transition"
                    onMouseDown={handleMouseDown} //onMouseDown reactni qiymati yani mishka bilan ishlash uchunichlatiladi yani function qabul qiladi huddi onclick onchangega o'hshab ishlayidi faqat michkaga tasir qiladi
                />
                {/* bu yetim div yani sidebar qismini qolgan asosiy qisimdan ajratish uchun yani tepadan pastga to'g'ri chiziq tortish uchun cursor-ew-resize classi esa shu chiziqga kelganda cursorni chap o'ng tarafgaham strelkali cursor chiqaradi>>> ↔ ↔ ↔ ↔ ↔ <<< yani ekrandagi sidebar va qolgan qismlarni o'lchamini o'zgartirish uchun   */}

                <div className="absolute bottom-0 px-2 bg-white/50 dark:bg-black/50 py-4 w-full">
                    {isLoading ? (
                        <div className="w-full flex justify-center items-center">
                            <Loader />
                        </div>
                    ) : (
                        <>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-1 text-[13px]">
                                    <Rocket />
                                    <p className="opacity-70 font-bold">
                                        {plan} plan
                                    </p>
                                </div>

                                {plan === "Free" ? (
                                    <p className="text-[13px] opacity-70">
                                        {documents?.length}/3
                                    </p>
                                ) : (
                                    <p className="text-[13px] opacity-70">
                                        {documents?.length} notes
                                    </p>
                                )}

                                {/* <p className="text-[13px] opacity-70">{arr.length}/3</p>////stripe ulanmasdan oldin shu kod ishlagan edi */}
                            </div>
                            {plan === "Free" && (
                                <Progress
                                    // value={arr.length >= 3 ? 100 : arr.length * 33.33}//stripe ulanmasdan oldin shu kod ishlagan edi
                                    value={
                                        documents?.length &&
                                        documents?.length >= 3
                                            ? 100
                                            : (documents?.length || 0) * 33.33
                                    }
                                    className="mt-2"
                                />
                            )}
                        </>
                    )}
                </div>
            </div>

            <div
                className={cn(
                    "absolute top-0 z-50 left-60 w-[calc(100% - 240px)]",
                    isResetting && "transition-all ease-in  duration-300",
                    isMobile && "w-full left-0"
                )}
                ref={navbarRef}
            >
                {!!params.documentId ? (
                    <Navbar isCollapsed={isCollapsed} reset={reset} />
                ) : (
                    // bu navbar userni sidebar.tsx failini navbari yani asosiy saytdagi navbarmas faqat account create qilgan user uchun chiqadigan toolslar bor navbar yani agar paramsda kelgan documentId true bo'lsa yani idlar bor bo'lsa shu navbar component chiqadi agar yo'q bo'lsa yani false bo'lsa pastdagi umumiy nav component chiqadi//yani bu holatda Navbar.tsxdagi documentId qiymati ishlaydi//agar false bo'lsa pastdagi nav ishlaydi

                    <nav className={cn("bg-transparent px-3 py-2 w-full")}>
                        {isCollapsed && ( //agar boshida false qilingan isCollapsed statesi true bo'lsa shu icon ishlaydi va ustiga onclick qilinsa reset functionda berilgan stylelarga o'zgaradi yani qaytadan sidebar qismi chap tomondan chiqib keladi
                            <MenuIcon
                                className="h-6 w-6 text-muted-foreground"
                                role="button"
                                onClick={reset} //menuiconga click bo'lganda ichida elementref bo'lgan reset function ishlab calc bilan 100% holatda turgan  windowdan 240px joyni -minus qilib tashlaydi shunda yuqoridagi collapse functioni berilgan divga joy ochiladi
                            />
                        )}
                    </nav>
                )}
            </div>
        </>
    );
};

// 11. Stripe integration darsi 37:36 da qoldi aynan shu soniyadan boshlab davom ettir
