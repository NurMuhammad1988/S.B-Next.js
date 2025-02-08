import fetcher from "@/lib/fetcher";
import useSWR from "swr";

//bu hooks yani bu (root) notifications [userId] page.tsx failida ishlatiladi

const useNotifications = (id: string) => {
    const { data, isLoading, mutate } = useSWR(
        `/api/notifications/${id}`,
        fetcher
    );

    return { data, isLoading, mutate };
};

export default useNotifications;
