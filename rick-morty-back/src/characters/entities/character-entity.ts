import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Location, TypeLocation } from "./location-entity";
import { Origin, TypeOrigin } from "./origin-entity";

export enum CharacterStatus {
  Alive = "Alive",
  Dead = "Dead",
  Unknown = "unknown",
}

export enum CharacterGender {
  Female = "Female",
  Male = "Male",
  Genderless = "Genderless",
  Unknown = "unknown",
}
export interface Character {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  origin: Origin;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

@Entity()
export class TypeCharacter implements Character {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: "enum",
    enum: CharacterStatus,
    default: CharacterStatus.Unknown,
  })
  status: CharacterStatus;

  @Column({ nullable: true })
  species: string;

  @Column({ nullable: true })
  type: string;

  @Column({
    type: "enum",
    enum: CharacterGender,
    default: CharacterGender.Unknown,
  })
  gender: CharacterGender;

  @Column(() => TypeOrigin)
  origin: Origin;

  @Column(() => TypeLocation)
  location: Location;

  @Column({ nullable: true })
  image: string;

  @Column("simple-array", { nullable: true })
  episode: string[];

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  created: string;
}
