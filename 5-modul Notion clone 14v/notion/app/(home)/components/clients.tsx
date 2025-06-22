import Image from "next/image";
import React from "react";

export const Clients = () => {
    return (
        <div className="max-w-xl">
            <h2 className="text-4xl mt-6 font-bold">
                Millions run on Notion every day
            </h2>

            <p className="opacity-70 mt-2">
                Powering the world's best teams, from next-generation startups
                to established enterprises.
            </p>

            <div className="flex justify-center items-center gap-6 flex-wrap mt-6">
                {/* bu div ichida clients arrayni ichidagi hamma imagelar bitta nextdan keladigan image componentida intrigatsa intrigatsa qilinganda map metodi doim divni ichida bo'lishi kerak??? qilindi bu holatda srcga client berildi chunkisrc birinchi parametrn iqabul qiladi idx esa oddiy key yani shu map qaysi copmonentda ishlasa shu componentga shu map metodini keyi berilishi kerak alt esa hamma shu imagelarni seo uchun kerak kalit so'zi google buni nextni image componentida qilingani uchun bittada taniydi va seoni bajaradi */}
                {clients.map((client, idx) => (
                    <Image
                        key={idx}
                        src={client}
                        width={50}
                        height={50}
                        alt="Notion haridorlari"
                    />
                ))}
            </div>
        </div>
    );
};

// clientlarni svg imagelari bu failga chaqirilganini sababi bular ko'p har birini alohida nextdan keladigan image componentga solib har biriga alohida width height altlar berish kodni ko'paytirib yuboradi shu sabab hamma imagelar bittada massiv ichida chaqirilib map qilinib hammasiga birdan ishlov berildi
const clients = [
    "/clients/1.svg",
    "/clients/2.svg",
    "/clients/3.svg",
    "/clients/4.svg",
    "/clients/5.svg",
    "/clients/6.svg",
    "/clients/7.svg",
    "/clients/8.svg",
    "/clients/9.svg",
    "/clients/10.svg",
    "/clients/11.svg",
    "/clients/12.svg",
    "/clients/13.svg",
    "/clients/14.svg",
];
