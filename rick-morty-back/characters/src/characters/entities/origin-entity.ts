import { Column } from "typeorm";

export interface Origin {
  name: string;
  url: string;
}

export class TypeOrigin implements Origin {
  @Column()
  name: string;

  @Column()
  url: string;
}
