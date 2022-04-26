import React, { useEffect, useReducer } from "react";
import { Box, Container, Grid, Pagination } from "@mui/material";
import { Character, PaginatedCharacters } from "../../entities/characters";
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
  pageCount: number;
  currentPage: number;
  characters: Character[];
}

interface CharacterGridState {
  status: string;
  pageCount: number;
  currentPage: number;
  characters: Character[];
}

function characterGridReducer(
  state: CharacterGridState,
  action: ActionLoading | ActionDone | ActionError
): CharacterGridState {
  switch (action.type) {
    case "loading":
    case "error":
      return { ...state, status: action.type };
    case "done":
      return {
        status: action.type,
        characters: action.characters ?? [],
        pageCount: action.pageCount,
        currentPage: action.currentPage,
      };
    default:
      throw new Error("CharacterGrid action type not defined");
  }
}

export default function CharacterGrid() {
  const [state, dispatch] = useReducer(characterGridReducer, {
    status: "loading",
    pageCount: 0,
    currentPage: 1,
    characters: [],
  });

  useEffect(() => {
    dispatch({ type: "loading" });
    getAllCharacters()
      .then((body: PaginatedCharacters) => {
        dispatch({
          type: "done",
          characters: body.results,
          pageCount: body.info.count,
          currentPage: state.currentPage + 1,
        });
      })
      .catch(() => dispatch({ type: "error" }));
  }, [state.currentPage]);

  return (
    <Box
      height="100%"
      width="100%"
      display="flex"
      flexDirection="column"
      overflow="auto"
    >
      {/* TODO: define search Bar */}
      <Pagination count={state.pageCount} variant="outlined" />
      <Container maxWidth="xl">
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
