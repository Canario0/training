import React, { ReactElement } from "react";
import { Box } from "@mui/material";
import styled from "@emotion/styled";
import NotFoundImage from "../../NotFound.svg";

const StyledImage = styled.img`
  max-width: 500px;
  aspect-ration: 1/1;
`;

interface NotFoundProps {
  /* eslint-disable react/require-default-props */
  message?: string;
}

export default function NotFound({ message }: NotFoundProps): ReactElement {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center">
      <Box
        width="100%"
        display="flex"
        flexDirection="row"
        justifyContent="center"
      >
        <StyledImage src={NotFoundImage} loading="lazy" alt="NotFound" />
      </Box>
      {message && (
        <Box component="p" textAlign="center" fontWeight="600">
          {message}
        </Box>
      )}
    </Box>
  );
}
