import httpStatus from "http-status-codes";
import { getMockReq, getMockRes } from "@jest-mock/express";
import { getCharacters } from "./character-controllers";
import {
  Character,
  CharacterGender,
  CharacterStatus,
} from "./entities/character-entity";
import AppError from "../utils/exceptions";

describe("Character controllers test suit", () => {
  let getAllCharactersMock: jest.Mock;
  let getCharacterMock: jest.Mock;
  let characters: Character[];
  beforeAll(() => {
    getAllCharactersMock = jest.fn();
    getCharacterMock = jest.fn();
    characters = [
      {
        id: 1,
        name: "Rick Sanchez",
        status: CharacterStatus.Alive,
        species: "Human",
        type: "",
        gender: CharacterGender.Male,
        origin: {
          name: "Earth (C-137)",
          url: "https://rickandmortyapi.com/api/location/1",
        },
        location: {
          name: "Citadel of Ricks",
          url: "https://rickandmortyapi.com/api/location/3",
        },
        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
        episode: [
          "https://rickandmortyapi.com/api/episode/1",
          "https://rickandmortyapi.com/api/episode/2",
          "https://rickandmortyapi.com/api/episode/3",
          "https://rickandmortyapi.com/api/episode/51",
        ],
        url: "https://rickandmortyapi.com/api/character/1",
        created: "2017-11-04T18:48:46.250Z",
      },
      {
        id: 2,
        name: "Morty Smith",
        status: CharacterStatus.Alive,
        species: "Human",
        type: "",
        gender: CharacterGender.Male,
        origin: {
          name: "unknown",
          url: "",
        },
        location: {
          name: "Citadel of Ricks",
          url: "https://rickandmortyapi.com/api/location/3",
        },
        image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
        episode: ["https://rickandmortyapi.com/api/episode/1"],
        url: "https://rickandmortyapi.com/api/character/2",
        created: "2017-11-04T18:50:21.651Z",
      },
    ];
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("Test getCharacters controller without query params", async () => {
    // Given I have the getAllCharactersMock initialized
    getAllCharactersMock.mockReturnValue(characters);
    // And I have a controller injected with the CharacterRepository
    const getCharactersController = getCharacters({
      getAllCharacters: getAllCharactersMock,
      getCharacter: getCharacterMock,
    });
    // When I do a call
    const req = getMockReq();
    const { res, next } = getMockRes();
    await getCharactersController(req, res, next);
    // Then the next function should not be called
    expect(next).not.toHaveBeenCalled();
    // And the getAllCharactersMock should be called without args
    expect(getAllCharactersMock).toHaveBeenCalledWith(undefined);
    // And the status method should be called with httpStatus.OK
    expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
    // And the json method should be called with all the characters
    expect(res.json).toHaveBeenCalledWith(expect.arrayContaining(characters));
  });

  test("Test getCharacters controller with query params set", async () => {
    // Given I have the getAllCharactersMock initialized
    getAllCharactersMock.mockReturnValue(characters.slice(0, 1));
    // And I have a controller injected with the CharacterRepository
    const getCharactersController = getCharacters({
      getAllCharacters: getAllCharactersMock,
      getCharacter: getCharacterMock,
    });
    // When I do a call
    const characterName = characters[0].name;
    const req = getMockReq({
      query: {
        name: characterName,
      },
    });
    const { res, next } = getMockRes();
    await getCharactersController(req, res, next);
    // Then the next function should not be called
    expect(next).not.toHaveBeenCalled();
    // And the getAllCharactersMock should be called with name args
    expect(getAllCharactersMock).toHaveBeenCalledWith(characterName);
    // And the status method should be called with httpStatus.OK
    expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
    // And the json method should be called with all the characters
    expect(res.json).toHaveBeenCalledWith(
      expect.arrayContaining(characters.slice(0, 1))
    );
  });

  test("Test getCharacters controller character not found", async () => {
    // Given I have the getAllCharactersMock initialized
    getAllCharactersMock.mockImplementation(() => {
      throw new Error("Fake character not found!");
    });
    // And I have a controller injected with the CharacterRepository
    const getCharactersController = getCharacters({
      getAllCharacters: getAllCharactersMock,
      getCharacter: getCharacterMock,
    });
    // When I do a call
    const fakeCharacterName = "FAKE";
    const req = getMockReq({
      query: {
        name: fakeCharacterName,
      },
    });
    const { res, next } = getMockRes();
    await getCharactersController(req, res, next);
    // Then the status and json methods should not be called
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    // And the getAllCharactersMock should be called with name args
    expect(getAllCharactersMock).toHaveBeenCalled();
    // And the next function should not be called with an AppError
    // with status code httpStatus.NOT_FOUND
    expect(next).toHaveBeenCalledWith(expect.any(AppError));
    expect((next as jest.Mock).mock.calls[0][0].statusCode).toBe(
      httpStatus.NOT_FOUND
    );
  });
});
