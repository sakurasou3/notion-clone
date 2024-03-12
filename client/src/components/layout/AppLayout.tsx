import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { authUtils } from "../../utils/authUtils";
import Sidebar from "../common/Sidebar";
import { setUser } from "../../redux/features/userSlice";
import { useAppDispatch } from "../../redux/store";

function AppLayout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // JWTのverifyチェック
    const checkAuth = async () => {
      const user = await authUtils.isAuthenticated();
      if (!user) {
        navigate("/login");
      } else {
        // userをreduxに保存
        dispatch(setUser(user));
      }
    };
    checkAuth();
  }, [dispatch, navigate]);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Sidebar />
        <Box sx={{ flexGrow: 1, p: 1, width: "max-content" }}>
          <Outlet />
        </Box>
      </Box>
    </div>
  );
}

export default AppLayout;
