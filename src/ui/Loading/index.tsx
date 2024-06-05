import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export const Loading = () => {
  return (
    <Box>
      <CircularProgress
        sx={{
          color: "rgba(208, 4, 103, 1)",
        }}
        size={60}
        thickness={4}
      />
    </Box>
  );
};
