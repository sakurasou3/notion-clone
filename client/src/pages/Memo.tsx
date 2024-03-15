import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, IconButton, TextField } from "@mui/material";
import { DeleteOutline, StarBorderOutlined } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { memoApi } from "../api/memoApi";
import { Memo as MemoType } from "../api/types/memo";
import { useAppDispatch } from "../redux/store";
import { updateMemo } from "../redux/features/memoSlice";

export const Memo = () => {
  const { memoId } = useParams();
  const [memo, setMemo] = useState<MemoType | undefined>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getOneMemo = async () => {
      try {
        const response = await memoApi.getOne(memoId ?? "");
        setMemo(response);
      } catch (err) {
        alert(err);
      }
    };
    getOneMemo();
  }, [memoId]);

  let timer: any;
  const timeout = 500;

  const updateTitle = async (e: ChangeEvent<HTMLTextAreaElement>) => {
    clearTimeout(timer);

    const title = e.target.value;
    const newMemo = { ...memo!, title };
    setMemo(newMemo);

    // 入力後500msを超えたタイミングのみAPIを呼ぶ
    timer = setTimeout(async () => {
      try {
        const response = await memoApi.update(memoId!, newMemo);
        dispatch(updateMemo(response));
      } catch (err) {
        alert(err);
      }
    }, timeout);
  };

  const updateDescription = async (e: ChangeEvent<HTMLTextAreaElement>) => {
    clearTimeout(timer);

    const description = e.target.value;
    const newMemo = { ...memo!, description };
    setMemo(newMemo);

    // 入力後500msを超えたタイミングのみAPIを呼ぶ
    timer = setTimeout(async () => {
      try {
        const response = await memoApi.update(memoId!, newMemo);
        dispatch(updateMemo(response));
      } catch (err) {
        alert(err);
      }
    }, timeout);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <IconButton>
          <StarBorderOutlined />
        </IconButton>
        <IconButton color="error">
          <DeleteOutline />
        </IconButton>
      </Box>
      <Box sx={{ p: "10pz 50px" }}>
        <TextField
          placeholder="無題"
          value={memo && memo.title}
          variant="outlined"
          fullWidth
          sx={{
            ".MuiOutlinedInput-input": {
              padding: 0,
            },
            ".MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            ".MuiOutlinedInput-root": {
              fontSize: "2rem",
              fontWeight: "700",
            },
          }}
          onChange={updateTitle}
        />
        <TextField
          placeholder="追加"
          variant="outlined"
          value={memo && memo.description}
          fullWidth
          sx={{
            ".MuiOutlinedInput-input": {
              padding: 0,
            },
            ".MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            ".MuiOutlinedInput-root": {
              fontSize: "1rem",
            },
          }}
          onChange={updateDescription}
        />
      </Box>
    </>
  );
};
