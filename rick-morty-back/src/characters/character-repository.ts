import { Character } from "./character-entity";

export interface CharacterRepository {
  getAllCharacters(): Promise<Character[]>;
  getCharacter(id: number): Promise<Character>;
}

export class TypeCharacterRepository implements CharacterRepository {
  async getAllCharacters(): Promise<Character[]> {
    return [
      {
        id: 8,
        name: "Adjudicator Rick",
        status: "Dead",
        species: "Human",
        type: "",
        gender: "Male",
        origin: {
          name: "unknown",
          url: "",
        },
        location: {
          name: "Citadel of Ricks",
          url: "https://rickandmortyapi.com/api/location/3",
        },
        image: "https://rickandmortyapi.com/api/character/avatar/8.jpeg",
        episode: ["https://rickandmortyapi.com/api/episode/28"],
        url: "https://rickandmortyapi.com/api/character/8",
        created: "2017-11-04T20:03:34.737Z",
      },
    ];
  }

  async getCharacter(id: number): Promise<Character> {
    return {
      id: 8,
      name: "Adjudicator Rick",
      status: "Dead",
      species: "Human",
      type: "",
      gender: "Male",
      origin: {
        name: "unknown",
        url: "",
      },
      location: {
        name: "Citadel of Ricks",
        url: "https://rickandmortyapi.com/api/location/3",
      },
      image: "https://rickandmortyapi.com/api/character/avatar/8.jpeg",
      episode: ["https://rickandmortyapi.com/api/episode/28"],
      url: "https://rickandmortyapi.com/api/character/8",
      created: "2017-11-04T20:03:34.737Z",
    };
  }
}
