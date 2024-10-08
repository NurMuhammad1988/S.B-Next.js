import {
    AppBar,
    Box,
    Button,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Toolbar,
    Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { navItems } from "src/config/constants";
import CloseIcon from "@mui/icons-material/Close";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { useRouter } from "next/router";
import Image from "next/image";

interface Props {
    window?: () => Window;
}

// const drawerWidth = 100;

const Navbar = ({ window }: Props) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const router = useRouter()

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };
    const container =
        window !== undefined ? () => window().document.body : undefined;

    const drawer = (
        <Box  sx={{ textAlign: "center" }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingX: "20px",
                }}
            >
                <Box
                    sx={{
                        my: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                    }}
                >
                   <Image src={"/favicon.svg"} alt={"logo"} width={70} height={50}  />
                        <Typography  variant="h4" fontFamily={"fantasy"} paddingLeft={"5px"} component="div">
                            Blog Website Toggle
                        </Typography>
                </Box>
                <CloseIcon onClick={handleDrawerToggle} sx={{cursor:"pointer"}}/>
            </Box>

            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.route} disablePadding>
                        {/* pastdagi onclik mobil versiyaga o'tganda categoriyla va blogs pagelarga bosilganda touter shu sahifalarga oboradi */}
                        <ListItemButton onClick={() => router.push(item.route)} sx={{ textAlign: "center" }}>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box height={"9vh"}  sx={{ display: "flex" }}>
            
            <AppBar  sx={{ backgroundColor:"#141414", height:"9vh"}} component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                 
                    <Box
                        sx={{
                            my: 2,
                            alignItems: "center",
                            gap: "5px",
                            flexGrow: 1,
                            display:"flex",
                            cursor:"pointer"
                           
                        }}
                        onClick={() => router.push("/")}
                    >
                        {/* <AccountBalanceIcon /> */}
                        <Image src={"/favicon.svg"} alt={"logo"} width={70} height={50}  />
                        <Typography  variant="h4" fontFamily={"fantasy"} paddingLeft={"5px"} component="div">
                            Blog Website Toggle
                        </Typography>
                    </Box>

                    <Box sx={{ display: { xs: "none", sm: "block" } }}>
                        {navItems.map((item) => (
                            <Button onClick={() => router.push(item.route)} key={item.route} sx={{ color: "#fff" }}>
                                {/* constants.tsda yozilgan routlardan yani category bilan  blogni routerlaridan userouter orqali foydalanish yani shu navbar pagedagi yuqoridagi gategoriy va blogs pagega kirish uchun shunda navbar layoutda turgani uchun sayt bo'ylab hamma joyda bo'ladi va navbardagi yuqoridagi category va blogs pagelarham hamma joyda dynamic turadi shunda hamma joyda category va blogs pagelarga bitta click bilan o'tib ketish mumkun shu routerli onchlik sabab */}
                                {item.label}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>

            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: `100%`,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
};

export default Navbar;

