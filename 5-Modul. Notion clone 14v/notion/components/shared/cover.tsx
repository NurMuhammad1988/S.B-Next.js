import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface CoverProps {
    url?: string;
    preview?: boolean;
}

const Cover = ({ preview, url }: CoverProps) => {
    return (
        <div
            className={cn(
                //cn bilan bu divda chaqiriladigan imageda agar url bor bo'lsa bu classlar>>>"relative w-full h-[35vh] group" agar uyo'q bo'lsa bu classlar>>>//cn bilan bu divda chaqiriladigan imageda agar url bor bo'lsa bu classlar>>>"relative w-full h-[35vh] group" va agar uyo'q bo'lsa bu classlar>>>!url && "h-[10vh]", url && "bg-muted" ishlasin deyildi
                "relative w-full h-[35vh] group",
                !url && "h-[10vh]",
                url && "bg-muted"
            )}
        >
            {!!url && (
                <Image
                    fill
                    src={url}
                    alt="cover rasmi "
                    className="object-cover "
                />
            )}
            {/* agar ona divda relative classi bor bo'lsa bu image aftamat tarzda absalute bo'lib hamma joyni egallab oladi?????? */}
            {/* agarda url bor bo'lsa??? */}
        </div>
    );
};

export default Cover;
