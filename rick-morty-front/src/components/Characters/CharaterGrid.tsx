import React, { useEffect, useReducer } from "react";
import { Box, Container, Grid } from "@mui/material";
import { Character } from "../../entities/characters";
import { getAllCharacters } from "../../services/character-service";
import CharacterGridItem from "./CharaterGridItem";

interface ActionBase {
  type: string;
}

interface ActionError extends ActionBase {
  type: "error";
}

interface ActionLoading extends ActionBase {
  type: "loading";
}

interface ActionDone extends ActionBase {
  type: "done";
  characters: Character[];
}

interface CharacterGridState {
  status: string;
  characters: Character[];
}

function characterGridReducer(
  state: CharacterGridState,
  action: ActionLoading | ActionDone | ActionError
): CharacterGridState {
  const type = action.type;
  switch (type) {
    case "loading":
    case "error":
      return { status: type, characters: state.characters };
    case "done":
      return { status: type, characters: action.characters ?? [] };
    default:
      throw new Error("CharacterGrid action type not defined");
  }
}

export default function CharacterGrid() {
  const [state, dispatch] = useReducer(characterGridReducer, {
    status: "loading",
    characters: [],
  });

  useEffect(() => {
    dispatch({ type: "loading" });
    getAllCharacters()
      .then((characters: Character[]) =>
        dispatch({ type: "done", characters: characters })
      )
      .catch(() => dispatch({ type: "error" }));
  }, []);

  return (
    <Box
      height="100%"
      width="100%"
      display="flex"
      flexDirection="column"
      overflow="auto"
    >
      {/* TODO: define search Bar */}
      <Container>
        <Grid container justifyContent="center" spacing={1}>
          {state.characters.map((character) => (
            <Grid item key={character.id.toString()} color="secondary.main">
              <CharacterGridItem character={character} />
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* TODO: define pagination */}
    </Box>
  );
}
