import axios from "axios";
////next js app padhodda dynamic routing qilish papka ichida bo'ladi yani ona papkasi bo'ladi bu holatda posts ona papka uni ichida[id] papka bor [id] next js uchun kalit so'z shu array ichid aid yoki slug bo'lsa shu [id] yoki [slug] papka ichida fetch qilingan datalarni dynamic routinglaydi shu sabab paramslarham ona papkaga o'hshab id yoki slug bo'lishi kerak next js shundan buni dynamic routinglanishi kerakligini tushunadi /// posts papkani ichidagi [id]ni ichidagi loading.tsx aftamatik tarzda endi bu dynamic touting ishlagancha yani axios datalarni fetsh qilgancha [id]ni ichidagi loading.tsxda yozilgan Loading Post Detail texti ishlaydi chunki seerverdan datalar fetch bo'lgancha usrerga nimadur ko'rsatib turish kerak loading.tsxham next js uchun kalit so'z loading payti shu loading.tsx ishlaydi shu sabab bu joyga import qilib chaqirilmasaham aftamatik tarzda ishladi //lekin loading seo uchun yahshi emas shu sabab ishlatilishi shart emas shunchaki loading.tsx papkani udalit qilib tashlasa bo'ldi boshqa ortiqcha  configlari yo'q

async function getDetailedData(id: string) {
    const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    return data;
}
//
const PostsDetailPage = async ({
     params,
     }: { params: { id: string };
     }) => {
    const data = await getDetailedData(params.id);

    return (
        <div>
            
            <h2>{data.title}</h2>
            <p>{data.body}</p>
        </div>
    );
};

export default PostsDetailPage;


