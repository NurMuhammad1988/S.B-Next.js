import { Avatar, Box, Divider, Typography } from "@mui/material";
import Image from "next/image";
import { format } from "date-fns";
import { ContentProps } from "./content.props";

const Content = ({blogs}: ContentProps) => {//serverdan keladigan blogsni distruptatsa bilan chaqirib unga content.props.tsda yozilgan bu content.tsxda ishlatiladigan blogsni qanaqa type ekanligi nima ekanligi aytilgan ContentProps funksiyasi chaqirilgan endi serverdan chaqirilgan blogsni typi content.props.tsda yozilgan ContentTypes funksiyasidagi BlogsType[] shudna content.tsxda confilict bo'maydi chunki typelar aniq
    return (
        <Box width={{xs: "100%", md:"70%"}}>
            {blogs.map((item) => (
                <Box
                    key={item.id}//hygraphdan kelgan id bu key yani hygraphni asosiy idisi yani blogsni idisi
                    sx={{
                        backgroundColor: "rgba(0,0,0, .5)",
                        padding: "20px",
                        marginTop: "20px",
                        borderRadius: "8px",
                        boxShadow: "0px 8px 16px rgba(255,255,255, .1)",
                    }}
                >
                    <Box position={"relative"} width={"100%"} height={{xs: "30vh", md:"50vh"}}>
                      {/* shu bozni ichidagi image shu response bilan juda chiroyli bo'lsi rasim 100% response bo'ldi  */}
                        {/* Image next.jsdan keladigan component hissoblanadi yani saytga qo'yilgan imagelarni aftamatik optimizatsa qilib beradi imagega fill atributi yozilsa ona boxsiga yoki diviga albatta positionlardan birirtasi berilishi kerak va bu imageda seo uchun atributlarni yozsa bo'ladi seo uchun friendly component huddi Head componentiga o'hshab  widt yoki height berilsa positionlar shart emas */}
                        <Image
                            src={item.image.url}//hygraphdan kelgan imageni urli
                            alt={item.title}
                            fill
                            style={{ objectFit: "cover", borderRadius: "10px" }}
                        />
                        {/* imageni ichidagi altni ichidagi title rasimni titlesi yani seoga kerak keywords yozilsihi kerak bu keyvord map qilinib datadan yani serverdan rasimga title yozilgan joydan keladi datadagi imageni title fileldi keyword bo'lishi kerak */}
                    </Box>
                    <Typography variant="h4" marginTop={"30px"}>
                        {item.title}
                    </Typography>

                    <Typography variant="body1" color={"gray"}> {item.excerpt} </Typography>
                    {/* exerp: (snippet) Blogingiz postining oldindan ko'rishi sifatida paydo bo'ladigan qisqa parcha . Ushbu parcha sizning asosiy blog sahifangizda (barcha xabarlaringiz ro'yxatga olingan) havolani Facebook yoki LinkedIn kabi platformalarga ulashganda oldindan ko'rish, ba'zan esa qidiruv natijalarida paydo bo'ladigan ko'rinish sifatida paydo bo'lishi mumkin. */}

                    <Divider sx={{marginTop:"30px"}}/>
                    {/* Divider huddi htmldagi hr kabi yani pastki chiziqcha */}

                    <Box
                                    sx={{
                                        display: "flex",
                                        gap: "10px",
                                        marginTop: "20px",
                                    }}
                                >
                                    <Avatar
                                        // alt={item.author.name}
                                        // src={item.author.avatar.url}//hygraphdan avatarni urli kelmadi haygrapg playgrounddaham avatarni urli null bo'b turipti demak kemadi shu sabab ts buni bo'shligi uchun hato chiqaradi shu sabab hygraphda avatarni urili null bo'lib tursaham bu yerdan o'chirib qo'ydim 
                                    />
                                    
                                    

                                    <Box  >
                                        <Typography>
                                            {item.author.name}
                                        </Typography>
                                        <Box color={"gray"}>
                                            {format(new Date(item.createdAt), "dd MMM, yyyy")}{" "}
                                            &#x2022; o'qish 10 daqiqa
                                        </Box>
                                    </Box>
                                </Box>

                </Box>
            ))}
        </Box>
    );
};

export default Content;


// const data = [
    // bu data huddi serverday hero compoent uchun datalar shu datada nextda image bilan ishlash uchun agar image netda link bian chaqirilsa yoki serverda bo'lsa link bilan chaqirilsa next.config.js filega serverni adresi yozilishi kerak bo'lmasa hato chiaqdi chunki next imageni adresini aniq bilmasa uni formatiga moslashtira olmaydi yani serveriga olib keyin moslashtiradi ham hafsizlik uchun
    // {
    //     image: "https://img.freepik.com/free-vector/seo-ad-banner-template_23-2148789090.jpg?t=st=1726016865~exp=1726020465~hmac=554c54552970da57709135cfa0eec12b950bb14107a5459c2b49d511e0c498c3&w=1060",
    //     title: "Exerpni SEO uchun nima foydasi bor???",
    //     exerp: "Exerpni SEO uchun nima foydasi borligini tushunish!!!",
    //     author: {
    //         //seo uchun kerak??????????????????????????????????????????????????
    //         name: "Nur Yorov",
    //         image: "https://img.freepik.com/free-photo/writer-work-handsome-young-writer-sitting-table-writing-something-his-sketchpad_155003-5206.jpg?t=st=1726005430~exp=1726009030~hmac=a8a4f750d3ed8c7b8a9f4bd42b85cd2e52eecb1eb635dc27c44eb42b1fcaa5fe&w=1060",
    //     },
    // },
    /////////////////////////////
//     {
//         //bu datadagi image nextda image componenetda chaqirilganda map qilib chaqiriladi va altga shu imageni titlesi yani asosiy kalit so'zi chaqirilishi kerak shu "Exerpni SEO uchun foydalari va qanday foydalanish" imagega seo hissoblanadi
//         image: "https://img.freepik.com/free-vector/seo-optimization-landing-page-design_23-2148123548.jpg?t=st=1726016902~exp=1726020502~hmac=3918c1fae7c642276459392cc52f1e19744f71c0d8ff561842df8cda886342a9&w=740",
//         title: "Exerpni SEO uchun foydalari va qanday foydalanish kerak",
//         exerp: "Next.jsda SEO qilish", //exerp: (snippet) Blogingiz postining oldindan ko'rishi sifatida paydo bo'ladigan qisqa parcha . Ushbu parcha sizning asosiy blog sahifangizda (barcha xabarlaringiz ro'yxatga olingan) havolani Facebook yoki LinkedIn kabi platformalarga ulashganda oldindan ko'rish, ba'zan esa qidiruv natijalarida paydo bo'ladigan ko'rinish sifatida paydo bo'lishi mumkin.
//         author: {
//             //seo uchun kerak??????????????????????????????????????????????????
//             name: "Nur Yorov",
//             image: "https://img.freepik.com/free-photo/handsome-young-writer-sitting-table-writing-something-his-sketchpad-home_155003-17078.jpg?t=st=1726005738~exp=1726009338~hmac=78cac2cde30dd0ad8d2af8218dd06a8f8eaed39c26c84674ff9cb701fd10e08c&w=1060",
//         },
//     },
//     //////////////////////////////
//     {
//         image: "https://img.freepik.com/free-vector/seo-ad-banner-template_23-2148789090.jpg?t=st=1726016865~exp=1726020465~hmac=554c54552970da57709135cfa0eec12b950bb14107a5459c2b49d511e0c498c3&w=1060",
//         title: "Next.jsda SEO qilish",
//         exerp: "Next.jsda SEO qilish",
//         author: {
//             //seo uchun kerak??????????????????????????????????????????????????
//             name: "Nur Yorov",
//             image: "https://img.freepik.com/free-vector/seo-optimization-banner_33099-1690.jpg?t=st=1726033643~exp=1726037243~hmac=0d8e0d8363d4ea49a4babc9d32635d2044a48e2c7c49b8e07c65bff636c51319&w=1060",
//         },
//     },
//     ////////////////////////////////////

//     {
//         image: "https://img.freepik.com/free-vector/seo-optimization-landing-page-design_23-2148123548.jpg?t=st=1726016902~exp=1726020502~hmac=3918c1fae7c642276459392cc52f1e19744f71c0d8ff561842df8cda886342a9&w=740",
//         title: "Next.jsda asosiy sahifani SEO qilish",
//         exerp: "Next.jsda SEO qilish",
//         author: {
//             //seo uchun kerak??????????????????????????????????????????????????
//             name: "Nur Yorov",
//             image: "https://img.freepik.com/free-vector/seo-optimization-banner_33099-1690.jpg?t=st=1726033643~exp=1726037243~hmac=0d8e0d8363d4ea49a4babc9d32635d2044a48e2c7c49b8e07c65bff636c51319&w=1060",
//         },
//     },
// ];
