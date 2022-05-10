import { Context } from "moleculer";

export default interface Controller {
	run(ctx: Context<unknown>): Promise<unknown>;
}
