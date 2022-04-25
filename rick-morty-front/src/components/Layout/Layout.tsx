import React, { ReactElement } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import HeaderBar from "./HeaderBar";

export default function Layout(): ReactElement {
  return (
    <Box height="100%" width="100%">
      <HeaderBar />
      <Box margin="0" padding="10px" width="100%" height="calc(100% - 60px)">
        <Outlet />
      </Box>
    </Box>
  );
}
