"use client";

//bu error yani appichida yani appga aloqador faillarda qandaydur error bo'lsa ishga tushadigan page yani next.js app papkani ichida error.tsx papkani ko'rsa serverlarida pageni o'zinimi idisnimi saqlab olib agar shu next js appni ichida error bo'lsa shu pageni chiqaradi bu boshqa errorlarda masalanserver errorlarda ishlamaydi faqat app ichidagi faillariga ishlaydi nomi error.tsx bo'lishi shart aks holda next js  tanimay qoladi

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const Error = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/error.svg"
        height="300"
        width="300"
        alt="Error"
        className="dark:hidden"
      />
      <Image
        src="/error-dark.svg"
        height="300"
        width="300"
        alt="Error"
        className="hidden dark:block"
      />
      <h2 className="text-xl font-medium">Something went wrong!</h2>
      <Button asChild>
        <Link href="/documents">Go back</Link>
        {/* linkda real user uchun qilinganasosiy documents page bor yani bu error.tsx pageham real user uchun ishlaydi */}
      </Button>
    </div>
  );
};

export default Error;
