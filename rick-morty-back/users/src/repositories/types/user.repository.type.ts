import { User } from "../../entities/user.entity";

export default interface UserRepository {
	getAllUsers(name?: string): Promise<User[]>;
	getUser(id: number): Promise<User>;
}
