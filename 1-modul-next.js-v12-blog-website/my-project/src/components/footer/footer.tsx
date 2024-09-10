import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { format } from "date-fns"; //hozir 2024 yil bo'sa shu qo'yilgan joyda 27 yilda 27 yilga aftmatik o'zgarib turadi real vaqtni Dta objectdan olib qo'yib turadi shunaqa kutubhona yarn qilib yuklanadi
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer = () => {
    return (
        <Box
            padding={"20px"}
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "primary.main",
                color: "white",
            }}
        >
            <Typography>
                © Nur {format(new Date(), "yyyy")} Blog Website. Barcha huquqlar
                himoyalangan
            </Typography>
            <Box sx={{display:"flex", gap:"15px"}}
            >
                <TelegramIcon sx={{cursor:"pointer"}} />
                <InstagramIcon sx={{cursor:"pointer"}}/>
                <YouTubeIcon sx={{cursor:"pointer"}}/>
            </Box>
        </Box>
    );
};

export default Footer;
