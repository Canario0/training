import { DataSource, Repository } from "typeorm";
import { User, TypeUser } from "./user-entity";

export interface UserRepository {
  getAllUsers(name?: string): Promise<User[]>;
  getUser(id: number): Promise<User>;
}

export class TypeUserRepository implements UserRepository {
  private appDataSource: DataSource;

  constructor(appDataSource: DataSource) {
    this.appDataSource = appDataSource;
  }

  private getRepository(): Repository<TypeUser> {
    return this.appDataSource.getRepository(TypeUser);
  }

  async getAllUsers(name?: string): Promise<User[]> {
    const users = await this.getRepository().find({
      where: {
        name,
      },
    });
    if (!users.length) {
      throw new Error("Users not found");
    }
    return users;
  }

  async getUser(id: number): Promise<User> {
    const user = await this.getRepository().findOneBy({ id });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
}
