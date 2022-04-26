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
  width: 300px;
  height: 100px;
`;

const Avatar = styled.img`
  height: 100px;
  aspect-ratio: 1 / 1;
`;

const TextBox = styled(Box)`
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
  white-space: nowrap;
`;

interface CharacterGridItemProps {
  character: Character;
}
export default function CharacterGridItem({
  character,
}: CharacterGridItemProps) {
  return (
    <Box paddingTop="1rem">
      <HoverPaper elevation={0} variant="outlined">
        <Link
          component={RouterLink}
          to={`/characters/${character.id}`}
          underline="none"
          color="secondary"
          display="flex"
          flexDirection="row"
          alignItems="center"
        >
          <Box>
            <Avatar src={character.image} loading="lazy" />
          </Box>
          <Box marginLeft="12px" height="100px" flexGrow="1">
            <TextBox fontSize="16px" fontWeight="bold">
              {character.name}
            </TextBox>
            <TextBox fontSize="12px">{character.status}</TextBox>
            <TextBox fontSize="12px">{character.origin.name}</TextBox>
          </Box>
        </Link>
      </HoverPaper>
    </Box>
  );
}
