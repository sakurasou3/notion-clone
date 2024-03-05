/* eslint-disable array-callback-return */
import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../api/authApi";
import { loginValidation } from "../api/validation/authValidation";

export const Login = () => {
  const navigate = useNavigate();

  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsernameErrText("");
    setPasswordErrText("");

    // 入力欄の文字列を取得
    const data = new FormData(e.target as HTMLFormElement);
    const username = (data.get("username") as string).trim();
    const password = (data.get("password") as string).trim();

    // バリデーションチェック
    const errors = loginValidation(username, password);
    errors.map((err) => {
      if (err.key === "username") {
        setUsernameErrText(err.errorString);
      } else if (err.key === "password") {
        setPasswordErrText(err.errorString);
      }
    });
    if (errors.length > 0) return;

    setLoading(true);
    try {
      const response = await authApi.login({
        username,
        password,
      });
      setLoading(false);
      localStorage.setItem("token", response.token);
      navigate("/");
    } catch (error: any) {
      const errors = error.data.errors;
      console.log(errors);
      errors.map((err: { path: string; msg: React.SetStateAction<string> }) => {
        if (err.path === "username") {
          setUsernameErrText(err.msg);
        } else if (err.path === "password") {
          setPasswordErrText(err.msg);
        }
      });
      setLoading(false);
    }
  };
  return (
    <>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          id="username"
          label="お名前"
          margin="normal"
          name="username"
          required
          helperText={usernameErrText}
          error={usernameErrText !== ""}
          disabled={loading}
        />
        <TextField
          fullWidth
          id="password"
          label="パスワード"
          margin="normal"
          name="password"
          type="password"
          required
          helperText={passwordErrText}
          error={passwordErrText !== ""}
          disabled={loading}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          type="submit"
          loading={loading}
          color="primary"
          variant="outlined"
        >
          ログイン
        </LoadingButton>
      </Box>
      <Button component={Link} to="/register">
        アカウントを持っていませんか？新規登録
      </Button>
    </>
  );
};
