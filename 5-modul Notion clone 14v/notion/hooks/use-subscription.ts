import fetcher from "@/lib/fetcher";
import useSwr from "swr"; //useSWR — bu React hook malumotni olib kelish (fetch yani ichida fetch bilan ishleydi), keshga saqlash, fonda yangilash//	URL orqali API yoki fayldan malumotni fetch qiladi BU HOLATDA APIDAN   //Fokusga qaytganda, vaqt otganda yoki mutate chaqirilganda avtomatik so'rov yani swrni  mutate functioni

// bu hook email orqali Stripe obuna (subscription) holatini olish uchun ishlatiladi
const useSubscription = (email: string) => {
    const { data, isLoading, mutate } = useSwr(
        `/api/stripe/subscription?email=${email}`, //stripe API route manzili Bu joyda userning email manzili bilan birga Stripe subscription holatini olish uchun so'rov yuboriladi yani fetcher bilan yani bu api/stripe/subscription o'zimiz yozgan api bu useSubscription ishlaganda shu failga so'rov jo'natadi useSwr orqali brauzerda /api/stripe/subscription manziliga so'rov yuboriladi yani next js backendda
        fetcher //Fetcher Stripega togridan-togri murojaat qilmaydi, u Next.js backend bilan gaplashadi. yani bu holatda /api/stripe/subscription ga so'rov jo'natadi u yerdagi api yani server backend functionlar esa  userni emailiga qarab data qaytaradi yani qaysi planda ekanligini qaytaradi va qaytgan dataga qarab sidebar qismidagi plan texti va document yaratish cheklovlari o'rnatiladi masalan returnda pastdagi plandagi datda "free" qaytsa faqat 3 da document agar "plus" yokida "biznes" planlar qaytsa plan nomlariham imtiyozlariham o'zgaradi shu uchun yozilgan kod
    );

    return {
        plan: data, //stripe /api/stripe/subscription dan olingan subscription malumotni planga  sovoldi
        isLoading,
        mutate, //chaqirilsa, malumot qayta olib kelinadi (masalan, foydalanuvchi rejani o‘zgartirganda) yani swr ni functioni 
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
