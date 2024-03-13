import React from "react";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import { AddBoxOutlined } from "@mui/icons-material";
import { LogoutOutlined } from "@mui/icons-material";
import assets from "../../assets";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store";

const Sidebar = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      open={true}
      sx={{ width: 250, height: "100vh" }}
    >
      <List
        sx={{
          width: 250,
          height: "100vh",
          backgroundColor: assets.colors.secondary,
        }}
      >
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight={700}>
              {user.username}
            </Typography>
            <IconButton onClick={logout}>
              <LogoutOutlined />
            </IconButton>
          </Box>
        </ListItemButton>
        <Box sx={{ pt: "10px" }} />
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight={700}>
              お気に入り
            </Typography>
          </Box>
        </ListItemButton>
        <Box sx={{ pt: "10px" }} />
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight={700}>
              プライベート
            </Typography>
            <IconButton>
              <AddBoxOutlined fontSize="small" />
            </IconButton>
          </Box>
        </ListItemButton>
        <ListItemButton sx={{ pl: "20px" }} component={Link} to="/memo/1">
          <Typography>📝仮置きのメモ</Typography>
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;
