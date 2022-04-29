import { DataSource } from "typeorm";
import { Character, TypeCharacter } from "./entities/character-entity";

export interface CharacterRepository {
  getAllCharacters(): Promise<Character[]>;
  getCharacter(id: number): Promise<Character>;
}

export class TypeCharacterRepository implements CharacterRepository {
  private appDataSource: DataSource;

  constructor(appDataSource: DataSource) {
    this.appDataSource = appDataSource;
  }

  async getAllCharacters(name?: String): Promise<Character[]> {
    return this.appDataSource.getRepository(TypeCharacter).find();
  }

  async getCharacter(id: number): Promise<Character> {
    return this.appDataSource.getRepository(TypeCharacter).findOneBy({ id });
  }
}
