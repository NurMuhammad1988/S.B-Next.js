"use client";

import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { api } from "@/convex/_generated/api";
import useSubscription from "@/hooks/use-subscription";
import { useUser } from "@clerk/clerk-react";
import { useMutation, useQuery } from "convex/react";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const DocumentPage = () => {
    const { user } = useUser(); //clerkni hooki
    const router = useRouter();
    const createDocument = useMutation(api.document.createDocument); //mutatsiya convex/documents/ faili ichidagi createDocument functioniga yo'naltirildi

    const documents = useQuery(api.document.getAllDocuments);

    const { isLoading, plan } = useSubscription(
        user?.emailAddresses[0]?.emailAddress!
    );//if(documents?.length && documents.length >= 3 && plan === "Free") shu if ishlashi uchun hamma documentslar documents nomli o'zgaruvchi cihdia chaqirildi sidebar.tsxda to'liq tushuntirilgan 


    const onCreateDocument = () => {
        //bu holatda onCreateDocument functionda convexda document create qilish uchun yozilgan createDocument functioni chaqirilib qiymatlaridagi typi v.string berilgan title parametriga stringda  "Untitled" texti berib qo'yildi va bu onCreateDocument functioni "Create a blank" texti bor buttonga onclick bilanberib qo'yildi yani endi shu buttonga click bo'lganda shu onCreateDocument functioni ishlab  createDocument functionda yozilgan convexda dacument cretae qilish ishlaydi yani document create bo'ladi

        if(documents?.length && documents.length >= 3 && plan === "Free"){
            toast.error("You can only create 3 documents in the free plan ( (secret)/documents/page.tsx onCreateDocument function reaction for )")////agar document bor bo'lsa va uzunligi 3 yokida 3 dan ko'p bo'lsa va stripedan qaytgan data bor plan qattiy teng bo'lsa "Free" planiga bu toats ishga tushadi yani user agar 3 tadan ortiq document create qilgan bo'lsa undan ortiq create qilaolmaydi o'shanda bu toast ishga tushib free plandagi userga text info beradi bu onCreateDocument document chaqiriligan  shu pagede yani secret pageda ichida "create a blank" texti bor buttonga klik qilinganda ishlaydi yani bu onCreateDocument function ishlaydi va documentlar create qiladi va lekin agar document bor bo'lsa va uzunligi 3 yokida 3 dan ko'p bo'lsa yani allaqachon 3 ta document create qilib bo'lgan bo'lsa va stripedan qaytgan ichida data bor plan qattiy teng bo'lsa "Free" planiga bu toats ishga tushadi yani user agar 3 tadan ortiq document create qilgan bo'lsa undan ortiq create qilaolmaydi o'shanda bu toast ishga tushib free plandagi userga text info beradi agar user free planda bo'lmasa onCreateDocument functionni qolgan funskyanalliklari ishlayveradi max document create qilish 4 ta>>>>>>>>>> = 3
            return
        }//user 3 tadan ortiq document yarataolmasligi uchun kerak


        const promise = createDocument({
            title: "Untitled",
        }).then((docId) => router.push(`/documents/${docId}`)); //createDocument convexda ishlab document create bo'lsa shu router sabab userni /documents/ papkaga olib boradi
        toast.promise(promise, {
            //bu holatda createDocumentda useMutation bo'lib convexda yaratilgan document promise o'zgaruvchi ichida createDocument functioon chaqirilib promise metodi bilan yaratilgan sonner kutubhonsidan kelgan toast copmonentdagi loading success error qiymatlariga hodisalar yuklandi masalan bu holatda createDocument document yaratadi va promise esa shu documentga hodisa beradi push esa  craete bo'lgan yangi document bor joyga yani documents ichida dynamic yaratilgan idli documentga navigatsa qiladi
            loading: "Creating a new blank...",
            success: "Created a new blank",//huddiki promise metodidagi relolve
            error: "Failed to create a new blank"//hudiki promise metodidagi reject
        });
    };

    return (
        <div className="h-screen w-full flex justify-center items-center space-y-4 flex-col">
            <Image
                src={"/note.svg"}
                alt="Notion loyihasi logosi"
                width={300}
                height={300}
                // dark: hidden yani agar mode-toggle.tsx sabab thema dark bo'lsa bu svg icon hidden bo'ladi yani ko'rinmaydi o'rniga boshqa svg ko'rinadi// birinchi ligh note ichon
                className="object-cover dark:hidden"
            />

            <Image
                src={"/note-dark.svg"}
                alt="Notion loyihasi logosi"
                width={300}
                height={300}
                //  hidden dark:block yani light bo'ganda hidden bo'ladi dark bo'lganda ko'rinadi //ikkinchi dark note icon
                className="object-cover hidden dark:block"
            />

            <h2 className="text-lg font-bold ">
                Welcome to {user?.firstName}`s document page!
            </h2>
            <Button onClick={onCreateDocument} disabled={isLoading}>
                {/* isLoading useSubscriptiondan keladigan useSubscription so'rov jo'natgacha ishlab turishi kerak bo'lgan qiymat shu qiymatga loader icon sovolindi so'rov bajarilib bo'lgandan keyin bu loader ishlashdan to'htaydi */}
                {isLoading  && <>
                <Loader/>
                <span className="ml-2">Loading...</span>
                </>}
                {!isLoading  && (
                    <>
                    <Plus className="h-4 w-4 mr-2" />
                     Create a blank
                    </>
                )}
                
                {/* Create a blank buttoniga click bo'lganda onCreateDocument functioni ishlab ichidagi mutatsiya bo'ib kelgan createDocument functoni sabab convexda document yaratiladi yani convex  convex/documents.ts failidagi createDocument functionida aytilgan ishlar bajariladi va bu Plus iconiham document create bo'lgandan keyin chiqadi va plus iconga click bo'lgandaham  onCreateDocument ishga tushadi va bola document yaratadi yani asosiy yaratilgan ona document ichida bola document yaratadi chunki Plus icon bor ona divga yani buttonga onCreateDocument onclikda berib qo'yilgan onCreateDocumentda faqat title qiymati chaqirilgan item.tsx failida esa  parentDocument:id qiymatiham chaiqirilgan bu  parentDocument:id qiymati  convex/documents.ts failidagi createDocument functionida bola documentyaratish uchun yozib qo'yilgan*/}
            </Button>
        </div>
    );
};
export default DocumentPage;

