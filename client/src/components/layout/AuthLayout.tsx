import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { Container } from "@mui/system";
import Logo from "../../assets/images/notion-logo.png";
import { authUtils } from "../../utils/authUtils";

export const AuthLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // JWTのverifyチェック
    const verify = authUtils.isAuthenticated();
  }, [navigate]);
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 6,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img
            src={Logo}
            alt="logo"
            style={{ width: 100, height: 100, marginBottom: 3 }}
          />
          Notionクローン開発
        </Box>
        <Outlet />
      </Container>
    </div>
  );
};
