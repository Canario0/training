import UserGetDetailsController from "../../../src/controllers/userGetDetails.controller";
import users from "../../../src/data/users.demo";
import httpStatus from "http-status-codes";
import { Context } from "moleculer";

describe("UserGetDetailsController test suit", () => {
	let getAllUsersRepositoryMock: jest.Mock;
	let getUserRepositoryMock: jest.Mock;
	beforeAll(() => {
		getAllUsersRepositoryMock = jest.fn();
		getUserRepositoryMock = jest.fn();
	});
	beforeEach(() => {
		jest.resetAllMocks();
	});

	test("Controller with all correct", async () => {
		const user = users[0];
		// Given I have the getUserRepositoryMock initialized
		getUserRepositoryMock.mockReturnValue(user);
		// And I have a controller injected with the UserRepository
		const controller = new UserGetDetailsController({
			getAllUsers: getAllUsersRepositoryMock,
			getUser: getUserRepositoryMock,
		});
		// When I do a call
		const returnedUser = await controller.run({
			params: { id: `${user.id}` },
		} as Context<{ id: string }>);
		// Then the getUserRepositoryMock should be called with the id
		expect(getUserRepositoryMock).toHaveBeenCalledWith(user.id);
		// And the returned user be equals to user
		expect(returnedUser).toEqual(user);
	});

	test("Controller with invalid id", async () => {
		// Given I have a controller injected with the UserRepository
		const controller = new UserGetDetailsController({
			getAllUsers: getAllUsersRepositoryMock,
			getUser: getUserRepositoryMock,
		});
		// When I do a call
		// Then an MoleculerError should be raised
		const id = "fake_non_numeric_id";
		await expect(() =>
			controller.run({
				params: { id: id },
			} as Context<{ id: string }>)
		).rejects.toThrow(
			expect.objectContaining({
				code: httpStatus.BAD_REQUEST,
			})
		);
		// And the getUserRepositoryMock should not be called with name args
		expect(getUserRepositoryMock).not.toHaveBeenCalled();
	});

	test("Controller with missing user", async () => {
		getUserRepositoryMock.mockImplementation(() => {
			throw new Error("Missing user!");
		});
		// Given I have a controller injected with the UserRepository
		const controller = new UserGetDetailsController({
			getAllUsers: getAllUsersRepositoryMock,
			getUser: getUserRepositoryMock,
		});
		// When I do a call
		// Then an MoleculerError should be raised
		const id = 4;
		await expect(() =>
			controller.run({
				params: { id: `${id}` },
			} as Context<{ id: string }>)
		).rejects.toThrow(
			expect.objectContaining({
				code: httpStatus.NOT_FOUND,
			})
		);
		// And the getUserRepositoryMock should be called with id set
		expect(getUserRepositoryMock).toHaveBeenCalledWith(id);
	});
});
