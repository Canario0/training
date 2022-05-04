import { DataSource, Repository } from "typeorm";
import { Character, TypeCharacter } from "./entities/character-entity";

export interface CharacterRepository {
  getAllCharacters(name?: string): Promise<Character[]>;
  getCharacter(id: number): Promise<Character>;
}

export class TypeCharacterRepository implements CharacterRepository {
  private appDataSource: DataSource;

  constructor(appDataSource: DataSource) {
    this.appDataSource = appDataSource;
  }

  private getRepository(): Repository<TypeCharacter> {
    return this.appDataSource.getRepository(TypeCharacter);
  }

  async getAllCharacters(name?: string): Promise<Character[]> {
    const characters = await this.getRepository().find({
      where: {
        name,
      },
    });
    if (!characters.length) {
      throw new Error("Characters not found");
    }
    return characters;
  }

  async getCharacter(id: number): Promise<Character> {
    const character = await this.getRepository().findOneBy({ id });
    if (!character) {
      throw new Error("Character not found");
    }
    return character;
  }
}
