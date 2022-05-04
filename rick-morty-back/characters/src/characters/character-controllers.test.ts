import httpStatus from "http-status-codes";
import { getMockReq, getMockRes } from "@jest-mock/express";
import { getCharacter, getCharacters } from "./character-controllers";
import AppError from "../utils/exceptions";
import characters from "./character-demo";

describe("Character controllers test suit", () => {
  let getAllCharactersMock: jest.Mock;
  let getCharacterMock: jest.Mock;
  beforeAll(() => {
    getAllCharactersMock = jest.fn();
    getCharacterMock = jest.fn();
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
    // And the next function should be called with an AppError
    // with status code httpStatus.NOT_FOUND
    expect(next).toHaveBeenCalledWith(expect.any(AppError));
    expect((next as jest.Mock).mock.calls[0][0].statusCode).toBe(
      httpStatus.NOT_FOUND
    );
  });

  test("Test getCharacter controller with all correct", async () => {
    const character = characters[0];
    // Given I have the getCharacterMock initialized
    getCharacterMock.mockReturnValue(character);
    // And I have a controller injected with the CharacterRepository
    const getCharacterController = getCharacter({
      getAllCharacters: getAllCharactersMock,
      getCharacter: getCharacterMock,
    });
    // When I do a call
    const req = getMockReq({
      params: {
        id: character.id,
      },
    });
    const { res, next } = getMockRes();
    await getCharacterController(req, res, next);
    // Then the next function should not be called
    expect(next).not.toHaveBeenCalled();
    // And the getCharacterMock should be called with id set
    expect(getCharacterMock).toHaveBeenCalledWith(character.id);
    // And the status method should be called with httpStatus.OK
    expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
    // And the json method should be called with all the characters
    expect(res.json).toHaveBeenCalledWith(character);
  });

  test("Test getCharacter controller with invalid id", async () => {
    // Given I have a controller injected with the CharacterRepository
    const getCharacterController = getCharacter({
      getAllCharacters: getAllCharactersMock,
      getCharacter: getCharacterMock,
    });
    // When I do a call
    const id = "fake_non_numeric_id";
    const req = getMockReq({
      params: {
        id,
      },
    });
    const { res, next } = getMockRes();
    await getCharacterController(req, res, next);
    // Then the status and json methods should not be called
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    // And the getCharacterMock should not be called
    expect(getCharacterMock).not.toHaveBeenCalled();
    // And the next function should be called with an AppError
    // with status code httpStatus.BAD_REQUEST
    expect(next).toHaveBeenCalledWith(expect.any(AppError));
    expect((next as jest.Mock).mock.calls[0][0].statusCode).toBe(
      httpStatus.BAD_REQUEST
    );
  });

  test("Test getCharacter controller with missing character", async () => {
    getCharacterMock.mockImplementation(() => {
      throw new Error("Missing character!");
    });
    // Given I have a controller injected with the CharacterRepository
    const getCharacterController = getCharacter({
      getAllCharacters: getAllCharactersMock,
      getCharacter: getCharacterMock,
    });
    // When I do a call
    const id = 4;
    const req = getMockReq({
      params: {
        id,
      },
    });
    const { res, next } = getMockRes();
    await getCharacterController(req, res, next);
    // Then the status and json methods should not be called
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    // And the getCharacterMock should be called with id set
    expect(getCharacterMock).toHaveBeenCalledWith(id);
    // And the next function should be called with an AppError
    // with status code httpStatus.NOT_FOUND
    expect(next).toHaveBeenCalledWith(expect.any(AppError));
    expect((next as jest.Mock).mock.calls[0][0].statusCode).toBe(
      httpStatus.NOT_FOUND
    );
  });
});
