import { DataSource } from "typeorm";
import { TypeCharacter } from "./characters/entities/character-entity";
import { TypeLocation } from "./characters/entities/location-entity";
import { TypeOrigin } from "./characters/entities/origin-entity";
import characters from "./charactersDemo";

export const dataSource = new DataSource({
  type: "postgres",
  host: "172.18.0.2",
  port: 5432,
  username: "test",
  password: "test",
  database: "characters",
  synchronize: true,
  logging: false,
  entities: [TypeOrigin, TypeLocation, TypeCharacter],
  migrations: [],
  subscribers: [],
});

export default function setUpDatabase() {
  dataSource.initialize().then(() => {
    // TODO: extract this part into a initialization script.
    dataSource.getRepository(TypeCharacter).save(characters);
  });
}
