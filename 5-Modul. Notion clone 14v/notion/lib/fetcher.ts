import axios from "axios";

//stripe subscriptionslarni aniqlashda kerak bo'ladiganb so'rovlarni shunday default qivoldik
const fetcher = (url: string) => axios.get(url).then((res) => res.data)//get bilan urlga so'rov jo'natadi va res qilib datani oladi //get bilan urlga so'rov jo'natadi va res qilib datani oladi  yani shunda bitta kod so'rovni ham jo;natadi ham datalarni qayta qabul qiladi ///axios promise qaytaradi va unda res degan javob obyekti bo'ladi .then((res) => res.data) yhen yani keyin yani hali sihlashda davom etib then res objectga so'rovda kelgan datanisovoladi va bu use-subscription.ts failida chaqirib ishlatilgan

export default fetcher