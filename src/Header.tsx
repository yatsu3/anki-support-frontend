import { AppBar, Box, Button, IconButton, Typography } from "@mui/material";
import Toolbar from "@mui/material/Toolbar/Toolbar";
import React, { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";

const Header: React.FC = () => {
    const navigate = useNavigate();

    const logout = async () => {
      try {
        const auth = getAuth();
        await signOut(auth);
        alert("ログアウトしました。");
        navigate("/");
        } catch(e) {
        alert("ログアウトができませんでした。");
      }
    }

    return (
        <>
        <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate("/")}>
          HOME
        </Typography>
            <Button color="inherit" onClick={() => logout()}>ログアウト</Button>
      </Toolbar>
    </AppBar>
    </>
    );
}

export default Header;