import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import React, { useState } from "react";
import { memoApi } from "../api/memoApi";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/store";
import { addMemo } from "../redux/features/memoSlice";

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  const [loading, setLoading] = useState(false);
  const createMemo = async () => {
    try {
      setLoading(true);
      const response = await memoApi.create();
      dispatch(addMemo(response));
      navigate(`/memo/${response._id}`);
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LoadingButton variant="outlined" onClick={createMemo} loading={loading}>
        最初のメモを作成
      </LoadingButton>
    </Box>
  );
};
