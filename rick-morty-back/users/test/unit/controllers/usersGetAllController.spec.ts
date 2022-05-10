import UserGetAllController from "../../../src/controllers/usersGetAll.controller";
import users from "../../../src/data/users.demo";
import httpStatus from "http-status-codes";
import { Context } from "moleculer";

describe("UserGetAllController test suit", () => {
	let getAllUsersRepositoryMock: jest.Mock;
	let getUserRepositoryMock: jest.Mock;
	beforeAll(() => {
		getAllUsersRepositoryMock = jest.fn();
		getUserRepositoryMock = jest.fn();
	});

	beforeEach(() => {
		jest.resetAllMocks();
	});

	test("Controller without query params", async () => {
		// Given I have the getAllUsersRepositoryMock initialized
		getAllUsersRepositoryMock.mockReturnValue(users);
		// And I have a controller injected with the UserRepository
		const controller = new UserGetAllController({
			getAllUsers: getAllUsersRepositoryMock,
			getUser: getUserRepositoryMock,
		});
		// When I do a call
		const returnedUsers = await controller.run({
			params: {},
		} as Context<{ name?: string }>);
		// Then the getAllUsersRepositoryMock should be called without args
		expect(getAllUsersRepositoryMock).toHaveBeenCalledWith(undefined);
		// And the returned users be equals to users
		expect(returnedUsers).toEqual(expect.arrayContaining(users));
	});

	test("Controller with query params set", async () => {
		// Given I have the getAllUsersRepositoryMock initialized
		getAllUsersRepositoryMock.mockReturnValue(users.slice(0, 1));
		// And I have a controller injected with the UserRepository
		const controller = new UserGetAllController({
			getAllUsers: getAllUsersRepositoryMock,
			getUser: getUserRepositoryMock,
		});
		// When I do a call
		const userName = users[0].name;
		const returnedUsers = await controller.run({
			params: {
				name: userName,
			},
		} as Context<{ name?: string }>);
		// Then the getAllUsersRepositoryMock should be called with name args
		expect(getAllUsersRepositoryMock).toHaveBeenCalledWith(userName);
		// And the returned users should equals to the users matching the name
		expect(returnedUsers).toEqual(
			expect.arrayContaining(users.slice(0, 1))
		);
	});

	test("Controller users not found", async () => {
		// Given I have the getAllUsersRepositoryMock initialized
		getAllUsersRepositoryMock.mockImplementation(() => {
			throw new Error("Fake users not found!");
		});
		// And I have a controller injected with the UserRepository
		const controller = new UserGetAllController({
			getAllUsers: getAllUsersRepositoryMock,
			getUser: getUserRepositoryMock,
		});
		// When I do a call
		// Then an MoleculerError should be raised
		const fakeUserName = "FAKE";
		await expect(() =>
			controller.run({
				params: {
					name: fakeUserName,
				},
			} as Context<{ name?: string }>)
		).rejects.toThrow(
			expect.objectContaining({
				code: httpStatus.NOT_FOUND,
			})
		);
		// And the getAllUsersRepositoryMock should be called with name args
		expect(getAllUsersRepositoryMock).toHaveBeenCalled();
	});
});
