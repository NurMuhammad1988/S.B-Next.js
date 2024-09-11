// yarn add react-multi-carousel caruselni librariysi
import { Avatar, Box, Typography } from "@mui/material";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import Image from "next/image";
import { format } from "date-fns";

const Hero = () => {
    return (
        <Box width={"100%"} height={"70vh"} sx={{ backgroundColor: "red" }}>
            <Carousel
                responsive={{
                    mobile: {
                        breakpoint: { max: 4000, min: 0 },
                        items: 1,
                    },
                }}
            >
                {data.map((item) => (
                    <Box key={item.image}>
                        <Box
                            sx={{
                                position: "relative",
                                width: "100%",
                                height: "70vh",
                            }}
                        >
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                style={{ objectFit: "cover" }}
                            />

                            <Box
                                sx={{
                                    position: "absolute",
                                    top: "0",
                                    left: "0",
                                    right: "0",
                                    bottom: "0",
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: "rgba(0,0,0, .5)",
                                }}
                            />
                            <Box
                                width={{ xs: "100%", sm: "70%" }}
                                position={"relative"}
                                color={"white"}
                                sx={{
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    paddingLeft: {xs:"10px", sm:"50px"},
                                }}
                                zIndex={999}
                            >
                                <Typography variant="h2">
                                    {item.title}
                                </Typography>
                                <Typography variant="h5">
                                    {item.exerp}
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: "10px",
                                        marginTop: "20px",
                                    }}
                                >
                                    <Avatar
                                        alt={item.author.name}
                                        src={item.author.image}
                                    />
                                    
                                    <Box sx={{padding: { sm:"50px"},}} >
                                        <Typography>
                                            {item.author.name}
                                        </Typography>
                                        <Box >
                                            {format(new Date(), "dd MMM, yyyy")}{" "}
                                            &#x2022; o'qish 10 daqiqa
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Carousel>
        </Box>
    );
};

export default Hero;

const data = [
    {
        image: "https://img.freepik.com/free-vector/seo-ad-banner-template_23-2148789090.jpg?t=st=1726016865~exp=1726020465~hmac=554c54552970da57709135cfa0eec12b950bb14107a5459c2b49d511e0c498c3&w=1060",
        title: "Exerpni SEO uchun nima foydasi bor???",
        exerp: "Exerpni SEO uchun nima foydasi borligini tushun!!!",
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
            image: "https://img.freepik.com/free-photo/handsome-young-writer-sitting-table-writing-something-his-sketchpad-home_155003-17078.jpg?t=st=1726005738~exp=1726009338~hmac=78cac2cde30dd0ad8d2af8218dd06a8f8eaed39c26c84674ff9cb701fd10e08c&w=1060",
        },
    },
];
