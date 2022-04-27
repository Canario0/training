import { Character } from "../../entities/characters";

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
  payload: {
    pageCount: number;
    characters: Character[];
  };
}

interface CharacterGridState {
  status: string;
  pageCount: number;
  characters: Character[];
}

/* eslint-disable import/prefer-default-export */
export function characterGridReducer(
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
        characters: action.payload.characters ?? [],
        pageCount: action.payload.pageCount,
      };
    default:
      throw new Error("CharacterGrid action type not defined");
  }
}
