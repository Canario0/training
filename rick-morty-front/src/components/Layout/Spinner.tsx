import React from "react";
import { CircularProgress, Box } from "@mui/material";

export default function Spinner() {
  return (
    <Box
      flexGrow="1"
      display="flex"
      justifyContent="center"
      flexDirection="row"
    >
      <CircularProgress
        color="secondary"
        size="5rem"
        sx={{ marginTop: "10%" }}
      />
    </Box>
  );
}
