import React, { useEffect, useState } from "react";
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
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { memoApi } from "../../api/memoApi";
import { setMemo } from "../../redux/features/memoSlice";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const memos = useAppSelector((state) => state.memo);
  // URLのパラメータからメモIDだけを抽出する
  const { memoId } = useParams();
  const [activeIndex, setActiveIndex] = useState(0);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const getMemos = async () => {
      try {
        const response = await memoApi.getAll();
        dispatch(setMemo(response));
      } catch (err) {
        alert(err);
      }
    };
    getMemos();
  }, [dispatch]);

  useEffect(() => {
    const activeIndex = memos.findIndex((e) => e._id === memoId);
    setActiveIndex(activeIndex);
  }, [memoId, memos, navigate]);

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
        {memos &&
          memos.map((memo, index) => (
            <ListItemButton
              key={memo._id}
              sx={{ pl: "20px" }}
              component={Link}
              to={`/memo/${memo._id}`}
              selected={index === activeIndex}
            >
              <Typography>
                {memo.icon} {memo.title}
              </Typography>
            </ListItemButton>
          ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
