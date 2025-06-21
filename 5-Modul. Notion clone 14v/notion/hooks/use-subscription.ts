import fetcher from "@/lib/fetcher";
import useSwr from "swr";

// bu hook email orqali Stripe obuna (subscription) holatini olish uchun ishlatiladi
const useSubscription = (email: string) => {
    const { data, isLoading, mutate } = useSwr(
        `/api/stripe/subscription?email=${email}`,//stripe API route manzili Bu joyda userning email manzili bilan birga Stripe subscription holatini olish uchun so'rov yuboriladi yani fetcher bilan yani bu api/stripe/subscription o'zimiz yozgan api bu useSubscription ishlaganda shu failga so'rov jo'natadi useSwr orqali brauzerda /api/stripe/subscription manziliga so'rov yuboriladi yani next js backendda
        fetcher//Fetcher Stripega togridan-togri murojaat qilmaydi, u Next.js backend bilan gaplashadi. fetcher /api/stripe/subscription manziliga so'rov jonatadi
    );

    return {
        plan:data,//stripe /api/stripe/subscription dan olingan subscription malumotni planga  sovoldi
        isLoading,
        mutate,//chaqirilsa, ma’lumot qayta olib kelinadi (masalan, foydalanuvchi rejani o‘zgartirganda) yani swr ni functioni
    };
};

export default useSubscription;

// Stripe bilan bog'langan foydalanuvchini avtomatik kuzatib boradi

// Komponent har safar render qilinmaydi, faqat kerak bo'lsa (va revalidate bo'lsa) yangilanadi

//SWR — bu "Stale-While-Revalidate" degan qisqartma. Bu malumotni yangilash strategiyasi bo'lib, foydalanuvchiga avvalgi (keshlangan) malumotni tezda ko‘rsatadi va orqada yangisini tarmoqdan olib keladi.

//API dan malumotlarni olish (fetch)

//Avtomatik yangilash (revalidation)

//Avtomatik kech (cache) qilish

//Global keshlash va fallback qiymatlar

//Fokusga qaytganda yoki internetga ulanganda malumotni avtomatik yangilash