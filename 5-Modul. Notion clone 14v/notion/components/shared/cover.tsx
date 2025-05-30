import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { ImageIcon, X } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { UseCoverImage } from "@/hooks/use-cover-image";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";

//bu cover.tsx user documentni yaratgada ochiladigan dynamic failda (secret)/documents/[documentId]/page.tsx failida chaqirilgan yani real user yaratadigan documenga cover image qo'yish uchun

// bu cover.tsx user document create qilganda agar documentni cover imagesi bor bo'lsa ishlaydi va bu  component (secret)/documents/[documentId]/page.tsx failida chaqirilgan yani real user uchun qilingan secret papkani asosiy sahifasida chaqirilgan

interface CoverProps {
    url?: string; //url string qabul qiladi va  (secret)/documents/[documentId]/page.tsx failida ichida faqat string qabul qiladi  yani coverni user hohlasa netdan url orqaliham olib kelib qo'yishi mumkun yani faqat devicedanmas ssilka bilanham olib kelib qo'yishi mumkun
    preview?: boolean; // shaxsiy
}

const Cover = ({ preview, url }: CoverProps) => {
    const params = useParams();

    const coverImage = UseCoverImage(); //shaxsiy hook yani cover imageni o'zgartiretganda holatni boshqarish uchun modal window uchun
    const { edgestore } = useEdgeStore(); //bu kutubhona faillarni masalan bu holatda user cover imageni o'zi yaratgan documentga qo'yetganda chiqadigan component bu juda qulay va tekin kutubhona va hafsiz yani bad userlar image o'rniga boshqa  yomon faillar yuklashidan ts bilan himoyalangan global tekin component useEdgeStore kutubhona ichida edgestore o'zgaruvchinisini chaqirdik
    const updateFields = useMutation(api.document.updateFields);

    const onRemove = async () => {
        if (url) {
            await edgestore.publicFiles.delete({
                //edghistoreni delete functioni vazifasi o'ziga tegishli component ichidagi failni delete qilish yani bu function ishlatilganda faqat imageni udalit qiladi bu function chaqirilgan buttonga click qilinganda awaitdan keyin kelgan edgestoreda public qilingan failni delete qiladi va updatefieldsdanham yani convex serverdaham ""<<<bo'sh string yani false qilib qo'yadi
                url,
            });
        }
        updateFields({
            id: params.documentId as Id<"documents">,
            coverImage: "",
        });
    };

    return (
        <div
            className={cn(
                //cn bilan bu divda chaqiriladigan imageda agar url bor bo'lsa bu classlar>>>"relative w-full h-[35vh] group" agar yo'q bo'lsa bu classlar>>>
                //cn bilan bu divda chaqiriladigan imageda agar url bor bo'lsa bu classlar>>>"relative w-full h-[35vh] group" va agar yo'q bo'lsa bu classlar>>>!url && "h-[10vh]", url && "bg-muted" ishlasin deyildi/////////yani uchta holat aytildi
                "relative w-full h-[35vh] group", //cover imageni hajmi
                !url && "h-[10vh]", ////////yani agar url yo'q bo'lsa h-10 va urlni bg-muted yani ko'rinmeydigan qiladi yani url bilanchaqirilgan cover imageni joyini agar cover image yo'q bo'lsa ko'rinmas qilib qo'yadi
                url && "bg-muted"
            )}
        >
            {/* relative va absalute classlari sabab div ustiga div yozilib bola divga mishka borganda ichidagi buttonlar group classlari sabab chiqadigan qilindi */}
            {!!url && ( //yani agar url true bo'lsa
                <Image
                    fill
                    src={url} //url string qabul qiladi va  (secret)/documents/[documentId]/page.tsx failida ichida faqat string qabul qiladi  yani coverni user hohlasa netdan url orqaliham olib kelib qo'yishi mumkun yani faqat devicedanmas ssilka bilanham olib kelib qo'yishi mumkun
                    alt="cover rasmi " //bu seo uchun agar coverga img qo'yilsa shu seo tex bilan chiqadi
                    className="object-cover "
                />
            )}
            {/* agar ona divda relative classi bor bo'lsa bu image aftamat tarzda absalute bo'lib hamma joyni egallab oladi yani ona divdagi hamma joyni masalan bu holatda cover imageni faqat shu>> w-full h-[35vh] joyga sig'diradi yani fill sabab! */}

            {url &&
                !preview && ( // urlda //agar url bor bo'lsa va preview false bo'lsa bu holat ishlasin bu holatda esa preview yo'q  bo'lsa yani documenti yaratgan userdan boshqa user bo'lmasa yani bu preview  app/preview/[documentId]/page.tsx failida shu cover.tsx bilan chaqirilgan o'sha joyda agar cover.tsx componentga shu preview berilsa true yani qo'yilagnini o'zi truga aylantiradi qo'yilmagan joyda esa false yani (secret)/documents/[documentId]/page.tsxda cover chaqirilganda preview berilmagan yani u joyda preview false hissoblanadi bu preview faqat app/preview/[documntId]/page.tsx failida berilgan yani faqat o'sha joyda chaqirilgani uchun o'sha joyda true bo'ladi lekin preview qiymati cover.tsx chaqirilgan joyda berilmasa preview false bo'ladi chaqirilsa true bo'ladi  yani loyihada preview papkadan foydalanadigan userdan boshqa user uchun bu false loyihada biror bir failda cover.tsx chaqirilib preview berilsa bu true va user coverimageni o'zgartira oladi yani onReplase function ishlaydi
                    <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-20 flex items-center gap-x-2">
                        {/* bu bola div ona divda esa relative classi va group classi bor yani endi bu divlar bir biriga bo'gliq holatga qarab ishlaydi masalan bu bola div boshida opacitysi 0 yani hech narsa ko'rinmeydi va group sabab  urlda kelgan imagega hover bo'lganda group-hover:opacity-100 ishleydi va pastdagi button uiga ko'rinadi yani mishkani cover imagega olib kelganda bu button ko'rinadi */}
                        <Button
                            size={"sm"}
                            variant={"outline"}
                            className="text-muted-foreground text-xs"
                            onClick={() => coverImage.onReplase(url)} //onReplase cover imageni o'zgartirish yoki yangi qo'yish uchun kerak// onReplasega click qilinganda yani change coverga click qilinganda cover-image-modal.tsx ishga tushibichidagi hamma edgestorega aloqador narsalar ishlaydi yani kichkina fail upload qiladigan cover-image-modal.tsx fail keladi bunga sabab store zustand use-cover-image.ts(store to event the windows)
                        >
                            <ImageIcon />
                            <span>Change cover</span>
                            {/* "Change cover" textiga cover imageni o'zgartirish uchun coverImage o'zgaruvchida kelgan zustanda qilingan usecoverimage hookini onReplase functioni ishga tushadi yani windowni ochob beradi va edgestore functionlar ishlab cover image o'zgaradi */}
                        </Button>

                        <Button
                            size={"sm"}
                            variant={"outline"}
                            className="text-muted-foreground text-xs"
                            onClick={onRemove} //remove textiga click bo'lganda edgestore kutubhonadan kelgan delete function ishga tushadi va coverni udalit qiladi
                        >
                            <X />
                            <span>remove</span>
                        </Button>
                    </div>
                )}
        </div>
    );
};

export default Cover;

Cover.Skeleton = function CoverSkeleton() {
    //yani bu cover.tsx chaqirilgan (secret)/documents/[documentId]/page.tsx faili ishlaganda bu cover.tsx yokida ichida chaqirilgan so'rov malum vaqt bajarilmay tursa shu skeleton loader ishga tushadi

    //bu uchun (secret)/documents/[documentId]/page.tsx failida bu logical operator yozib qo'yilgan>>>>if(document === undefined){return ( <div>{Cover.Skeleton()} </div>)} yani agar document undefined bo'lsa Cover.tsx ichidagi Skeleton functionni ishlat

    return <Skeleton className="w-full h-[35vh] bg-sky-950 " />;
};
