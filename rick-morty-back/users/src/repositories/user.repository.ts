import { DataSource, Repository } from "typeorm";
import { User, TypeUser } from "../entities/user.entity";
import UserRepository from "./types/user.repository.type";

export default class TypeUserRepository implements UserRepository {
	public constructor(private client: Promise<DataSource>) {}

	public async getAllUsers(name?: string): Promise<User[]> {
		const repository = await this.getRepository();
		const users = await repository.find({
			where: {
				name,
			},
		});
		if (!users.length) {
			throw new Error("Users not found");
		}
		return users;
	}

	public async getUser(id: number): Promise<User> {
		const repository = await this.getRepository();
		const user = await repository.findOneBy({ id });
		if (!user) {
			throw new Error("User not found");
		}
		return user;
	}

	private async getRepository(): Promise<Repository<TypeUser>> {
		return (await this.client).getRepository(TypeUser);
	}
}
