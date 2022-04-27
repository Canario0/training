import React, { useReducer, useEffect } from "react";
import { Box, Container, Link, styled, TextField } from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { characterDetailsReducer } from "./CharacterDetailsReducer";
import { Character } from "../../entities/characters";
import { getCharacter } from "../../services/character-service";
import Spinner from "../Layout/Spinner";
import NotFound from "../Layout/NotFound";

const TextFieldFixWidth = styled(TextField)`
  min-width: 10rem;
`;

export default function CharacterDetails() {
  const [state, dispatch] = useReducer(characterDetailsReducer, {
    status: "loading",
  });
  const { characterId } = useParams();
  useEffect(() => {
    dispatch({ type: "loading" });
    getCharacter(characterId!)
      .then((character: Character) =>
        dispatch({ type: "done", payload: { character } })
      )
      .catch(() => dispatch({ type: "error" }));
  }, [characterId]);
  return (
    <Container>
      <Box height="70px">
        <Link
          component={RouterLink}
          to="/characters/"
          underline="none"
          color="secondary"
        >
          <Box display="flex" alignItems="center" columnGap="0.5rem">
            <ArrowBackIosNewIcon sx={{ fontSize: "12px" }} />
            <Box component="span" sx={{ verticalAlign: "center" }}>
              All Characters
            </Box>
          </Box>
        </Link>
      </Box>
      {state.status === "error" && <NotFound message="Character not found" />}
      {state.status === "loading" && <Spinner />}
      {state.status === "done" && (
        <Box display="flex" flexGrow={1}>
          <img
            width="33%"
            height="33%"
            src={state.character!.image}
            loading="lazy"
            alt="character"
          />
          <Container sx={{ flexGrow: 1 }}>
            <Box component="h2" fontWeight={400}>
              {state.character!.name}
            </Box>
            <Box display="flex" gap="10px" flexWrap="wrap">
              <TextFieldFixWidth
                label="Status"
                defaultValue={state.character!.status}
                InputProps={{
                  readOnly: true,
                }}
                variant="filled"
                color="info"
              />
              <TextFieldFixWidth
                label="Specie"
                defaultValue={state.character!.species}
                InputProps={{
                  readOnly: true,
                }}
                variant="filled"
                color="info"
              />
              <TextFieldFixWidth
                label="Gender"
                defaultValue={state.character!.gender}
                InputProps={{
                  readOnly: true,
                }}
                variant="filled"
                color="info"
              />
            </Box>
          </Container>
        </Box>
      )}
    </Container>
  );
}
