import fetcher from "@/lib/fetcher";
import useSWR from "swr"; //A hook to fetch data. react hook kutubhonasi vazifasi kerakli faillarga so'rov jo'natish//SWR - bu ma'lumotlarni olish uchun React Hooks kutubxonasi.

const useUsers = (limit: number) => {//limit number bo'lishi ona limitda Number object bilan qattiy aytib qo'yilgan bu shart//endi useUsers hooki qayerga chaqirib ishlatilsa parametrida limit bo'ladiva asli number bo'ladi boshqa typli data qo'yilsa hato qaytaradi
    const { data, error, isLoading, mutate } = useSWR(//datada shu `/api/users?limit=${limit}`dan kelgan datani qaytaradi fetcher esa axiosda qilingan swrni fetch qiladigan functioni hissoblanadi mutate esa agar user kamayib yoki ko'paysa so'rovni qaytadan olib to'g'ri ro'yhatni shakillantirib beradi
        `/api/users?limit=${limit}`,//bu limit qayoqdan qanday kelepti bu limit `/api/users/route ichida turipti shu sabab shunday so'rov jo'natilepti bu so'rov doimiy yani qandaydur hodisaga bog'liq emas bu doimiy default ishlab turadigan so'rov shu sabab async yoki callback ishlatilmadi
        fetcher
    );

    return{
        users:data,//data endi fallowbarda ishlatiladi useUsers bilan jo'natilgan datada esa so'rov bor doim ishlab turadigan so'rov bor
        isLoading,//any typida yani configda bu degani buni ichiga hamma nasra bersa bo'ladi degani bu isloading endi fallowbarda ishlatiladi useUsers bilan jo'natilgan
        isError: error,
        mutate,//mutate esa agar user kamayib yoki ko'paysa so'rovni qaytadan olib to'g'ri ro'yhatni shakillantirib beradi
    }
};

export default useUsers;
