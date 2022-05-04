import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export interface User {
  id: number;
  name: string;
  password?: string;
}

@Entity()
export class TypeUser implements User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ select: false })
  password: string;
}
