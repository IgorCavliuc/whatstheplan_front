import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export const Loading = () => {
  return (
    <Box>
      <CircularProgress
        sx={{
          color: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.primary.dark
              : theme.palette.secondary.dark,
        }}
        size={60}
        thickness={4}
      />
    </Box>
  );
};
