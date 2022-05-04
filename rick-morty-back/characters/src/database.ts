import { DataSource } from "typeorm";
import { TypeCharacter } from "./characters/entities/character-entity";
import { TypeLocation } from "./characters/entities/location-entity";
import { TypeOrigin } from "./characters/entities/origin-entity";
import { TypeUser } from "./users/user-entity";
import characters from "./characters/character-demo";
import users from "./users/user-demo";

export const dataSource = new DataSource({
  type: "postgres",
  host: "172.18.0.2",
  port: 5432,
  username: "test",
  password: "test",
  database: "characters",
  synchronize: true,
  logging: false,
  entities: [TypeOrigin, TypeLocation, TypeCharacter, TypeUser],
  migrations: [],
  subscribers: [],
});

export default function setUpDatabase() {
  dataSource.initialize().then(() => {
    // TODO: extract this part into a initialization script.
    dataSource.getRepository(TypeCharacter).save(characters);
    dataSource.getRepository(TypeUser).save(users);
  });
}
