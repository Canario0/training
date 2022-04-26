import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Box, Container, Grid, Pagination } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { isEmpty } from "lodash";
import { PaginatedCharacters } from "../../entities/characters";
import { getAllCharacters } from "../../services/character-service";
import CharacterGridItem from "./CharacterGridItem";
import Spinner from "../Layout/Spinner";
import { characterGridReducer } from "./CharacterReducer";
import SearchBar from "../Layout/SearchBar";

export default function CharacterGrid() {
  const [state, dispatch] = useReducer(characterGridReducer, {
    status: "loading",
    pageCount: 0,
    characters: [],
  });
  const [searchParams, setSearchParams] = useSearchParams({});
  const [page, setPage] = useState(
    parseInt(searchParams.get("page") ?? "1", 10)
  );
  const [name, setName] = useState(searchParams.get("name") ?? "");
  useEffect(() => {
    dispatch({ type: "loading" });
    setSearchParams({
      page: page.toString(),
      ...(isEmpty(name) ? {} : { name }),
    });
    getAllCharacters(page, name)
      .then((body: PaginatedCharacters) => {
        dispatch({
          type: "done",
          payload: { characters: body.results, pageCount: body.info.pages },
        });
      })
      .catch(() => dispatch({ type: "error" }));
  }, [name, page]);
  const handlePaginationChange = useCallback(
    (_e: ChangeEvent<unknown>, newPage: number) => setPage(newPage),
    [setSearchParams]
  );
  const handleSearchChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value),
    [setSearchParams]
  );
  return (
    <Box
      height="100%"
      width="100%"
      display="flex"
      flexDirection="column"
      overflow="auto"
    >
      <SearchBar onChange={handleSearchChange} value={name} />
      {state.status === "loading" && <Spinner />}
      {state.status === "done" && state.characters.length !== 0 && (
        /* TODO: define search Bar */
        <Container maxWidth="xl" sx={{ flexGrow: 2 }}>
          <Box width="100%" display="flex" justifyContent="flex-end">
            <Pagination
              page={page}
              count={state.pageCount}
              variant="outlined"
              onChange={handlePaginationChange}
            />
          </Box>
          <Grid container justifyContent="center" spacing={1}>
            {state.characters.map((character) => (
              <Grid item key={character.id.toString()} color="secondary.main">
                <CharacterGridItem character={character} />
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
      {/* TODO: define error view */}
    </Box>
  );
}
