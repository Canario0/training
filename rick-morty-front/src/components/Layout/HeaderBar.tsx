import React, { ReactElement } from "react";
import { Link as RouterLink } from "react-router-dom";
import { AppBar, Container, Toolbar, Link, Box } from "@mui/material";
import styled from "@emotion/styled";

const StyledBar = styled(AppBar)`
    box-shadow: rgb(27 27 27 / 4%) 0px 3px 6px, rgb(27 27 27 / 6%) 0px 2px 6px, rgb(27 27 27 / 4%) 0px 0px 4px;
    height: 60px;
}
`;

// Define min values in my current window
const StyledToolbar = styled(Toolbar)`
  min-height: 60px;
  height: 60px;
  @media (min-width: 600px) {
    min-height: 60px;
    height: 60px;
  }
`;

export default function HeaderBar(): ReactElement {
  return (
    <Box width="100%">
      <StyledBar position="static">
        <StyledToolbar>
          <Container disableGutters>
            <Link component={RouterLink} to="/characters" underline="none">
              <Box component="span" color="secondary.main">
                Character Selection Page
              </Box>
            </Link>
          </Container>
        </StyledToolbar>
      </StyledBar>
    </Box>
  );
}
