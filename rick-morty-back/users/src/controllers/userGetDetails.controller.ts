import { Context } from "moleculer";
import { Errors } from "moleculer";
import httpStatus from "http-status-codes";
import Controller from "../shared/controller";
import UserRepository from "../repositories/types/user.repository.type";

export default class UsersGetDetailsController implements Controller {
	public constructor(private userRepository: UserRepository) {}

	public async run(ctx: Context<{ id?: string }>) {
		const id = Number(ctx.params.id);
		if (Number.isNaN(id)) {
			throw new Errors.MoleculerError(
				"Hey! You must provide an id",
				httpStatus.BAD_REQUEST
			);
		} else {
			try {
				const user = await this.userRepository.getUser(id);
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
}
