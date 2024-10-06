////SSR sahifa

import CustomImage from "@/copmponets/image";
import { notFound } from "next/navigation";

interface Props {
    params: {
        id: string;
    };
}
const ProductDetailedPage = async ({ params: { id } }: Props) => {
    // product/[id]/page.tsx bo'lgani uchun idni params bilan chaiqrvoldik
    try {
        // try catch bilan qilinishi serverdan datalar kelmay qolsa errorni aftamatik tarzda chiqarishi uchun error bo'lganda product/[id]/not-found.tsx failiga aftamatik tarzda jo'natadi
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const product = await res.json();
        return (
            <div className="max-w-5xl mx-auto  flex flex-col md:flex-row items-center gap-8 px-4 mt-48 pb-10">
                <CustomImage product={product} />
                {/* ProductDetailedPage sahifasida serverdan keladigan har bir id ichidagi imagega qilingan image optimizatsya product={product} qilinishini sababi serverdan keladigan imagelarni ovolish */}

                <div className="divide-2">
                    <div className="space-y-2 pb-8">
                        <h1 className="text-2xl md:text-4xl font-bold">
                            {product.title}
                        </h1>
                        <h2 className="text-gray-500 font-bold text-xl md:text-3xl">
                            ${product.price}
                        </h2>
                    </div>
                    <div>
                        <p className="text-xs md:text-sm">
                            {product.description}
                        </p>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        notFound();//serverdan datalar kelmay qolsa errorni aftamatik tarzda chiqarishi uchun error bo'lganda product/[id]/not-found.tsx failiga aftamatik tarzda jo'natadi bu next jsni mahsus hatolar uchun qilingan funksiyasi bu not found fi=unksiyasini qaysi sahifa uchun ishlatish kerak bo'lsa osha sahifa bor ona papka ichida not-found.tsx fail ochib ichiga nima yozsa shu chiqadi fail nomi next js uchun kalit so'z hissoblanadi ishlashi uchun fail nomi aynan next js hohlaganday bo'lishi kerak
    }
};

export default ProductDetailedPage;
