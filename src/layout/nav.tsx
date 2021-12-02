import { Box, AppBar, Toolbar, IconButton, Typography, Container, Button, Menu, MenuItem, Tooltip, Avatar } from "@mui/material";
import React, { useContext, useState } from "react";
import { AuthContext } from "../providers/auth-provider";
import { useRouter } from "next/router";
import { links } from "../constants/links";
import Link from "../Link";


const settings = [{name:'Like Photos', url:"liked-photos"}];

export default function Navbar() {
    const [_anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const { token, signIn, user, signOut } = useContext(AuthContext)
    const router = useRouter()
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        Image Search
                    </Typography>
                    <Box sx={{ flexGrow: 0, width: "100%", display: "flex", justifyContent: "right" }}>
                        <Link href={links.homePage} sx={{ justifySelf: "right" }} color="inherit"  ></Link>
                        {(token === "" && typeof user === "undefined") && <Button sx={{ justifySelf: "right" }} color="inherit" onClick={() => signIn()}>Login</Button>}
                        {token !== "" && typeof user !== "undefined" && <>
                            <Tooltip title="Open settings" sx={{ justifySelf: "right" }}>
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Typography color="white" sx={{
                                        paddingX: "5px"
                                    }}>welcome {user.first_name} </Typography>
                                    <Avatar alt={user.name} src={user.profile_image.small} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting.name} onClick={(() =>  ( router.push(links.lkedPhotos), handleCloseNavMenu()))}>
                                        <Typography textAlign="center">{setting.name}</Typography>
                                    </MenuItem>
                                ))}

                                <MenuItem onClick={() => {
                                    signOut()
                                    handleCloseNavMenu()
                                }}>
                                    <Typography textAlign="center">Logout</Typography>
                                </MenuItem>
                            </Menu>
                        </>
                        }
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    );
}
