import { Service, ServiceBroker } from "moleculer";
import container from "../dependency-injection";

export default class ProductsService extends Service {
	public constructor(public broker: ServiceBroker) {
		super(broker);
		this.parseServiceSchema({
			name: "users",
			version: 1,
			settings: {},
			hooks: {},
			actions: {
				getAll: {
					rest: "GET /",
					params: {
						name: { type: "string", optional: true },
					},
					handler: container.get(
						"App.controller.UsersGetAllController"
					).run,
				},
			},
			methods: {},
		});
	}
	// private async seedDB() {
	// 	await this.adapter.insertMany([
	// 		{
	// 			name: "Samsung Galaxy S10 Plus",
	// 			quantity: 10,
	// 			price: 704,
	// 		},
	// 		{
	// 			name: "iPhone 11 Pro",
	// 			quantity: 25,
	// 			price: 999,
	// 		},
	// 		{
	// 			name: "Huawei P30 Pro",
	// 			quantity: 15,
	// 			price: 679,
	// 		},
	// 	]);
	// }
}
