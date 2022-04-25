import React from "react";
import { Box, Link, Paper, Tooltip } from "@mui/material";
import { Character } from "../../entities/characters";
import styled from "@emotion/styled";
import { Link as RouterLink } from "react-router-dom";

const HoverPaper = styled(Paper)`
  &:hover {
    box-shadow: rgb(27 27 27 / 10%) 0px 8px 16px,
      rgb(27 27 27 / 6%) 0px 5px 16px, rgb(27 27 27 / 4%) 0px 0px 4px;
  }
  max-width: 200px;
  min-height: 250px;
  max-height: 250px;
`;

const Avatar = styled.img`
  min-width: 200px;
  max-width: 200px;
  aspect-ratio: 1 / 1;
`;

interface CharacterGridItemProps {
  character: Character;
}
export default function CharacterGridItem({
  character,
}: CharacterGridItemProps) {
  return (
    <Box paddingTop="1rem">
      <HoverPaper elevation={0}>
        <Link
          component={RouterLink}
          to={`/characters/${character.id}`}
          underline="none"
          color="secondary"
        >
          <Box>
            <Avatar src={character.image} loading="lazy" />
          </Box>
          <Tooltip title={character.name}>
            <Box
              marginLeft="12px"
              fontSize="12px"
              overflow="hidden"
              textOverflow="ellipsis"
              maxWidth="200px"
              whiteSpace="nowrap"
            >
              {character.name}
            </Box>
          </Tooltip>
        </Link>
      </HoverPaper>
    </Box>
  );
}
