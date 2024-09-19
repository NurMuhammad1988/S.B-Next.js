import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import Image from "next/image";
import { Fragment } from "react";
import { format } from "date-fns";
import { navItems } from "src/config/constants";
import { SidebarProps } from "./saidbar.props";

const Sidebar = ({latestBlogs}: SidebarProps) => {
    return (
        <Box width={{xs: "100%", md:"30%"}} >
            <Box
                position={"sticky"}
                // sticky asosiy sahifadagi o'ng tomonga alohida field qilish uchun yani ichki scroll qilindi sahifani chap tomoni scroll tugaydi lekin o'ng tomoni 100px ortiqcha yani content qo'yish uchun
                top={"100px"}
                sx={{ transition: "all .3s ease" }}
            >
                <Box
                    padding={"20px"}
                    border={"1px solid gray"}
                    borderRadius={"8px"}
                >
                    <Typography variant="h5">Lates Blogs</Typography>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            marginTop: "20px",
                           
                        }}
                    >
                        {latestBlogs.map((item) => (
                            <Box key={item.id} marginTop={"20px"} >
                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: "20px",
                                        alignItems: "center",
                                    }}
                                >
                                    <Image
                                        src={item.image.url}
                                        alt={item.title}
                                        width={100}
                                        height={100}
                                        style={{
                                            objectFit: "cover",
                                            borderRadius: "8px",
                                        }}
                                    />

                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "5px",
                                        }}
                                    >
                                        <Typography variant="body1">
                                            {item.title}
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                gap: "10px",
                                            }}
                                        >
                                            <Avatar
                                                alt={item.author.name}
                                                // src={item.author.avatar.url}
                                            />

                                            <Box>
                                                <Typography variant="body2">
                                                    {item.author.name}
                                                </Typography>
                                                <Box sx={{ opacity: "0.6" }}>
                                                    {format(
                                                        new Date(item.createdAt),
                                                        "dd MMM, yyyy"
                                                    )}
                                                    {/* &#x2022; o'qish 4 daqiqa */}
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                                <Divider sx={{ marginTop: "20px" }} />
                            </Box>
                        ))}
                    </Box>
                </Box>

                <Box
                    padding={"20px"}
                    border={"1px solid gray"}
                    borderRadius={"8px"}
                    marginTop={"20px"}
                >
                    <Typography variant="h5">Category</Typography>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            marginTop: "20px",
                        }}
                    >
                        {navItems.map((nav) => (
                            <Fragment key={nav.route}>
                                <Button
                                    fullWidth
                                    sx={{
                                        justifyContent: "flex-start",
                                        height: "50px",
                                    }}
                                >
                                    {nav.label}
                                </Button>
                                <Divider />
                            </Fragment>
                        ))}
                    </Box>
                </Box>

            </Box>
        </Box>
    );
};
export default Sidebar;

const data = [
    // bu data huddi serverday hero compoent uchun datalar shu datada nextda image bilan ishlash uchun agar image netda link bian chaqirilsa yoki serverda bo'lsa link bilan chaqirilsa next.config.js filega serverni adresi yozilishi kerak bo'lmasa hato chiaqdi chunki next imageni adresini aniq bilmasa uni formatiga moslashtira olmaydi yani serveriga olib keyin moslashtiradi ham hafsizlik uchun
    {
        image: "https://img.freepik.com/free-vector/seo-ad-banner-template_23-2148789090.jpg?t=st=1726016865~exp=1726020465~hmac=554c54552970da57709135cfa0eec12b950bb14107a5459c2b49d511e0c498c3&w=1060",
        title: "Exerpni SEO uchun nima foydasi bor???",
        exerp: "Exerpni SEO uchun nima foydasi borligini tushunish!!!",
        author: {
            //seo uchun kerak??????????????????????????????????????????????????
            name: "Nur Yorov",
            image: "https://img.freepik.com/free-photo/writer-work-handsome-young-writer-sitting-table-writing-something-his-sketchpad_155003-5206.jpg?t=st=1726005430~exp=1726009030~hmac=a8a4f750d3ed8c7b8a9f4bd42b85cd2e52eecb1eb635dc27c44eb42b1fcaa5fe&w=1060",
        },
    },
    /////////////////////////////
    {
        image: "https://img.freepik.com/free-vector/seo-optimization-landing-page-design_23-2148123548.jpg?t=st=1726016902~exp=1726020502~hmac=3918c1fae7c642276459392cc52f1e19744f71c0d8ff561842df8cda886342a9&w=740",
        title: "Exerpni SEO uchun foydalari va qanday foydalanish",
        exerp: "Next.jsda SEO qilish",
        author: {
            //seo uchun kerak??????????????????????????????????????????????????
            name: "Nur Yorov",
            image: "https://img.freepik.com/free-photo/handsome-young-writer-sitting-table-writing-something-his-sketchpad-home_155003-17078.jpg?t=st=1726005738~exp=1726009338~hmac=78cac2cde30dd0ad8d2af8218dd06a8f8eaed39c26c84674ff9cb701fd10e08c&w=1060",
        },
    },
    //////////////////////////////
    {
        image: "https://img.freepik.com/free-vector/seo-optimization-landing-page-design_23-2148123548.jpg?t=st=1726016902~exp=1726020502~hmac=3918c1fae7c642276459392cc52f1e19744f71c0d8ff561842df8cda886342a9&w=740",
        title: "Exerpni SEO uchun foydalari va qanday foydalanish",
        exerp: "Next.jsda SEO qilish",
        author: {
            //seo uchun kerak??????????????????????????????????????????????????
            name: "Nur Yorov",
            image: "https://img.freepik.com/free-vector/seo-optimization-banner_33099-1690.jpg?t=st=1726033643~exp=1726037243~hmac=0d8e0d8363d4ea49a4babc9d32635d2044a48e2c7c49b8e07c65bff636c51319&w=1060",
        },
    },
];
