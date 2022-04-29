import { Column } from "typeorm";

export interface Location {
  name: string;
  url: string;
}

export class TypeLocation implements Location {
  @Column()
  name: string;

  @Column()
  url: string;
}
