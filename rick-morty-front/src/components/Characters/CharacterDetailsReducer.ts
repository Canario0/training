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
    character: Character;
  };
}

interface CharacterDetailsState {
  status: string;
  character?: Character;
}

/* eslint-disable import/prefer-default-export */
export function characterDetailsReducer(
  state: CharacterDetailsState,
  action: ActionLoading | ActionDone | ActionError
): CharacterDetailsState {
  switch (action.type) {
    case "loading":
    case "error":
      return { ...state, status: action.type };
    case "done":
      return {
        status: action.type,
        character: action.payload.character,
      };
    default:
      throw new Error("CharacterDetails action type not defined");
  }
}
