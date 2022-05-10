import { Context } from "moleculer";
import { Errors } from "moleculer";
import httpStatus from "http-status-codes";
import Controller from "../shared/controller";
import { UserRepository } from "../repositories/user.repository";

export default class UsersGetAllController implements Controller {
	public constructor(private userRepository: UserRepository) {}

	public async run(ctx: Context<{ name?: string }>) {
		const { name } = ctx.params;
		try {
			const user = await this.userRepository.getAllUsers(name as string);
			return user;
		} catch (err) {
			throw new Errors.MoleculerError(
				err.message,
				httpStatus.NOT_FOUND,
				"RESOURCE_NOT_FOUND"
			);
		}
	}
}
