import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { ImageIcon } from "lucide-react";

interface CoverProps {
    url?: string; //url string qabul qiladi va  (secret)/documents/[documentId]/page.tsx failida ichida faqat string qabul qiladi (hozircha!!) yani coverni user hohlasa netdan url orqaliham olib kelib qo'yishi mumkun yani faqat devicedanmas ssilka bilanham olib kelib qo'yishi mumkun
    preview?: boolean;
}

const Cover = ({ preview, url }: CoverProps) => {
    return (
        <div
            className={cn(
                //cn bilan bu divda chaqiriladigan imageda agar url bor bo'lsa bu classlar>>>"relative w-full h-[35vh] group" agar yo'q bo'lsa bu classlar>>>
                //cn bilan bu divda chaqiriladigan imageda agar url bor bo'lsa bu classlar>>>"relative w-full h-[35vh] group" va agar yo'q bo'lsa bu classlar>>>!url && "h-[10vh]", url && "bg-muted" ishlasin deyildi/////////yani uchta holat aytildi
                "relative w-full h-[35vh] group",
                !url && "h-[10vh]", ////////yani agar url yo'q bo'lsa h-10 va urlni bg-muted yani ko'rinmeydigan qiladi yani url bilanchaqirilgan cover imageni joyini agar cover image yo'q bo'lsa ko'rinmas qilib qo'yadi
                url && "bg-muted"
            )}
        >
            {!!url && (
                <Image
                    fill
                    src={url} //url string qabul qiladi va  (secret)/documents/[documentId]/page.tsx failida ichida faqat string qabul qiladi (hozircha!!) yani coverni user hohlasa netdan url orqaliham olib kelib qo'yishi mumkun yani faqat devicedanmas ssilka bilanham olib kelib qo'yishi mumkun
                    alt="cover rasmi "
                    className="object-cover "
                />
            )}
            {/* agar ona divda relative classi bor bo'lsa bu image aftamat tarzda absalute bo'lib hamma joyni egallab oladi yani ona divdagi hamma joyni masalan bu holatda cover imageni faqat shu>> w-full h-[35vh] joyga sig'diradi yani fill sabab! */}

            {url &&
                !preview && ( // urlda //agar url bor bo'lsa va preview false bo'lsa bu holat ishlasin bu holatda esa preview yo'q yani div ichida yokida button ichida bu bolean qiymatli preview chaqirilmadi shu sabab bu logical operator uchun preview endi false qaytaradi
                    <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-20 flex items-center gap-x-2">
                        {/* bu bola div ona divda esa relative classi va group classi bor yani endi bu divlar bir biriga bo'gliq holatga qarab ishlaydi masalan bu bola div boshida opacitysi 0 yani hech narsa ko'rinmeydi va group sabab  urlda kelgan imagega hover bo'lganda group-hover:opacity-100 ishleydi va pastdagi button uiga ko'rinadi yani mishkani cover imagega olib kelganda bu button ko'rinadi */}
                        <Button
                            size={"sm"}
                            variant={"outline"}
                            className="text-muted-foreground text-xs"
                        >
                            <ImageIcon />
                            <span>Change cover</span>
                        </Button>
                    </div>
                )}
        </div>
    );
};

export default Cover;
