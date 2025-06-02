import Image from "next/image";
import React from "react";
import { PricingCard } from "./pricing-card";

export const Pricing = () => {
    return (
        <div className=" max-w-7xl mx-auto container ">
            <div className="p-5">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold max-w-2xl ">
                    One tool for your whole company. Free for teams to try.
                </h1>
                <p className="uppercase opacity-70"> TRUSTED BY TEAMS AT </p>

                <div className="flex gap-4 flex-row flex-wrap mt-4">
                    {teams.map(
                        (
                            team,
                            idx //pastdagi teams massividagi client imagelari intrigatsa qilinib bitta div ichida stylelar berilib ishlatildi
                        ) => (
                            <Image
                                width={50}
                                height={50}
                                key={idx} //key yani index mapni ikkinchi parametri
                                alt="Notion haridorlari jamoasi" // for seo
                                src={team} // mapni birinchi parametriga doim src beriladi yani
                            />
                        )
                    )}
                </div>

                <div className="mt-6">
                    <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
                        {cards.map(
                            (
                                card,
                                idx //cards arrayni ichida 3 ta object bor shu sabab PricingCard componentga chaqirilganda ... qilib copy qilindi shunda 3 ta objectni copy qiladi chunki cards massivini ichida 3 ta object bor
                            ) => (
                                // bu PricingCard faqat shu pricing.tsx component ichida ishlatilgani uchun index.tsdan import qilinmadi chunki asosiy page.tsxda chaqirilmaydi faqat shu component ichida ishlatiladi
                                // bu PricingCard componentga PricingCard chaqirilib map qilinganda ona divdagi classlar tasir qiladi yani map qilinganda ona dividagi classlarga qaram bo'ladi yani masalan bu joyda size 300px qilinib lekin chaqirilgan joyda size 200px bo'lsa 200px ishlaydi kod o'qish tartibi bo'yicha shunday bo'ladiyani tepadan pastga
                                <PricingCard {...card} key={idx} /> // bu pricing.tsx componenti pricing-card componentiga props orqali export qilindi
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const teams = [
    // teams ichida arrayda iconlar chaqirilgan tozza jsda yozilgan
    "/teams/1.svg",
    "/teams/2.svg",
    "/teams/3.svg",
    "/teams/4.svg",
    "/teams/5.svg",
];

const cards = [
    {//bu title subtitle options va price qiymatlari bu fail chaqirilib ishlatigan failda propsda typlari berilishi kerak  chunki bu ts 
        title: "Free",
        subtitle: "For organizing very corner fo your work & life.",
        options:
            "Collaborative workspace, Integrate with Slack, GitHub & more, Basic page analystics, 7 day page history, Invite 10 guests",
        price: "Free",
    },

    {
        title: "Plus",
        subtitle: "A place for small groups to plan & get organized ",
        options:
            "Unlimited blocks for teams, Unlimited file uploads, 30 day page history, Invite 100 guests",
        price: "8",
        priceId: "price_1RUtJ3P7E3esMDczytmyoK51"//stripe uchun!!!!
    },

    {
        title: "Business",
        subtitle:
            "For companies using Notion to connect several teams & tools.",
        options:
            "SAML SSO, Private teapspaces, Bulk PDF export, Advanced page analytics, 90 day page history, Invite 250 guests",
        price: "15",
        priceId: "price_1RUtDPP7E3esMDczpQkpFERc"//stripe uchun!!!!
    },
];
