import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../api/authApi";
import { registerValidation } from "../api/validation/authValidation";

export const Register = () => {
  const navigate = useNavigate();

  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");
  const [confirmErrText, setConfirmErrText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsernameErrText("");
    setPasswordErrText("");
    setConfirmErrText("");

    // 入力欄の文字列を取得
    const data = new FormData(e.target as HTMLFormElement);
    const username = (data.get("username") as string).trim();
    const password = (data.get("password") as string).trim();
    const confirmPassword = (data.get("confirmPassword") as string).trim();

    // バリデーションチェック
    const errors = registerValidation(username, password, confirmPassword);
    errors.map((err) => {
      if (err.key === "username") {
        setUsernameErrText(err.errorString);
      } else if (err.key === "password") {
        setPasswordErrText(err.errorString);
      } else if (err.key === "confirm") {
        setConfirmErrText(err.errorString);
      }
    });
    errors
      .filter((err) => err.key === "username")
      .map((e) => setUsernameErrText(e.errorString));
    errors
      .filter((err) => err.key === "password")
      .map((e) => setPasswordErrText(e.errorString));
    errors
      .filter((err) => err.key === "confirm")
      .map((e) => setConfirmErrText(e.errorString));
    if (errors.length > 0) return;

    setLoading(true);
    try {
      const response = await authApi.register({
        username,
        password,
        confirmPassword,
      });
      setLoading(false);
      localStorage.setItem("token", response.token);
      navigate("/");
    } catch (error: any) {
      const errors = error.data.errors;
      console.log(errors);
      // eslint-disable-next-line array-callback-return
      errors.map((err: { path: string; msg: React.SetStateAction<string> }) => {
        if (err.path === "username") {
          setUsernameErrText(err.msg);
        } else if (err.path === "password") {
          setPasswordErrText(err.msg);
        } else if (err.path === "confirmPassword") {
          setConfirmErrText(err.msg);
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
        <TextField
          fullWidth
          id="confirmPassword"
          label="確認用パスワード"
          margin="normal"
          name="confirmPassword"
          type="password"
          required
          helperText={confirmErrText}
          error={confirmErrText !== ""}
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
          アカウント作成
        </LoadingButton>
      </Box>
      <Button component={Link} to="/login">
        すでにアカウントを持っていますか？ログイン
      </Button>
    </>
  );
};
