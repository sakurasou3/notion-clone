import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { Container } from "@mui/system";
import Logo from "../../assets/images/notion-logo.png";

export const AuthLayout = () => {
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
