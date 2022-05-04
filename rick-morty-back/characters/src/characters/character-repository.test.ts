import { createMock } from "ts-auto-mock";
import { On, method } from "ts-auto-mock/extension";
import { DataSource, Repository } from "typeorm";
import { TypeCharacterRepository } from "./character-repository";
import { TypeCharacter } from "./entities/character-entity";
import characters from "./character-demo";

describe("TypeCharacterRepository test suit", () => {
  let findMock: jest.Mock;
  let findOneByMock: jest.Mock;
  let characterRepository: TypeCharacterRepository;
  beforeAll(() => {
    const datasourceMock: DataSource = createMock<DataSource>();
    const repository = createMock<Repository<TypeCharacter>>();
    (
      On(datasourceMock).get(method("getRepository")) as jest.Mock
    ).mockReturnValue(repository);
    findMock = On(repository).get(method("find")) as jest.Mock;
    findOneByMock = On(repository).get(method("findOneBy")) as jest.Mock;
    characterRepository = new TypeCharacterRepository(datasourceMock);
  });

  beforeEach(() => {
    findMock.mockReset();
    findOneByMock.mockReset();
  });

  test("Test getAllCharacters without name", async () => {
    // Given I have the findMock setUp
    findMock.mockReturnValue(characters);
    // When I call getAllCharacters
    const returnedCharacters = await characterRepository.getAllCharacters();
    // Then findMock should be called
    expect(findMock).toHaveBeenCalled();
    // And the returned characters should be equals to the originals
    expect(returnedCharacters).toEqual(expect.arrayContaining(characters));
  });

  test("Test getAllCharacters with name", async () => {
    const slicedCharacters = characters.slice(0, 1);
    // Given I have the findMock setUp
    findMock.mockReturnValue(slicedCharacters);
    // When I call getAllCharacters
    const returnedCharacters = await characterRepository.getAllCharacters(
      slicedCharacters[0].name
    );
    // Then findMock should be called
    expect(findMock).toHaveBeenCalled();
    // And the returned characters should be equals to the originals
    expect(returnedCharacters).toEqual(
      expect.arrayContaining(slicedCharacters)
    );
  });

  test("Test getAllCharacters missing characters", async () => {
    // Given I have the findMock setUp
    findMock.mockReturnValue([]);
    // When I call getAllCharacters
    // Then an Error should rise
    await expect(() =>
      characterRepository.getAllCharacters("FAKE name")
    ).rejects.toThrowError("Characters not found");
    // And findMock should be called
    expect(findMock).toHaveBeenCalled();
  });

  test("Test getCharacter with id", async () => {
    const character = characters[0];
    // Given I have the findOneByMock setUp
    findOneByMock.mockReturnValue(character);
    // When I call getCharacter
    const returnedCharacter = await characterRepository.getCharacter(
      character.id
    );
    // Then findOneByMock should be called
    expect(findOneByMock).toHaveBeenCalled();
    // And the returned character should be equals to the originals
    expect(returnedCharacter).toEqual(character);
  });

  test("Test getCharacter missing character", async () => {
    // Given I have the findOneByMock setUp
    findOneByMock.mockReturnValue(null);
    // When I call getCharacter
    // Then an Error should rise
    await expect(() =>
      characterRepository.getCharacter(6)
    ).rejects.toThrowError("Character not found");
    // And findOneByMock should be called
    expect(findOneByMock).toHaveBeenCalled();
  });
});
