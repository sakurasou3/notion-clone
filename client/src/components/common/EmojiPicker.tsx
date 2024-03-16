import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Picker from "@emoji-mart/react";

type Props = {
  icon: string;
  onUpdateIcon: (icon: string) => void;
};
export const EmojiPicker = (props: Props) => {
  const [selectedIcon, setSelectedIcon] = useState<string>("");
  const [isShowPicker, setIsShowPicker] = useState(false);

  useEffect(() => {
    setSelectedIcon(props.icon);
  }, [props.icon]);

  const showPicker = () => setIsShowPicker(!isShowPicker);

  const selectIcon = (e: { native: string }) => {
    setSelectedIcon(e.native);
    setIsShowPicker(false);
    props.onUpdateIcon(e.native);
  };

  return (
    <Box>
      <Typography
        variant="h3"
        fontWeight="700"
        sx={{ cursor: "pointer" }}
        onClick={showPicker}
      >
        {selectedIcon}
      </Typography>
      <Box
        sx={{
          display: isShowPicker ? "block" : "none",
          position: "absolute",
          zIndex: 100,
        }}
      >
        <Picker data={selectedIcon} onEmojiSelect={selectIcon} />
      </Box>
    </Box>
  );
};
