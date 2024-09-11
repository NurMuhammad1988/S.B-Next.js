import { Box, Button, Divider, Typography } from "@mui/material";
import { Fragment } from "react";
import { navItems } from "src/config/constants";

const Sidebar = () => {
    return (
        <Box
            width={"30%"}
            padding={"20px"}
            border={"1px solid gray"}
            borderRadius={"8px"}
        >
            <Typography variant="h5">Category</Typography>

            <Box sx={{display: "flex", flexDirection:"column", marginTop:"20px"}}>
                {navItems.map((nav) => (
                    
                    <Fragment key={nav.route} >
                       <Button fullWidth  sx={{justifyContent:"flex-start", height:"50px"}}>{nav.label}</Button>
                       <Divider/>
                    </Fragment>

                   
                ))}
            </Box>
        </Box>
    );
};

export default Sidebar;
6. SIdebar component 09:47 da qoldi