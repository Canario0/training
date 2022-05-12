import { createMock } from "ts-auto-mock";
import { On, method } from "ts-auto-mock/extension";
import { DataSource, Repository } from "typeorm";
import TypeUserRepository from "../../../src/repositories/user.repository";
import { TypeUser } from "../../../src/entities/user.entity";
import users from "../../../src/data/users.demo";

describe("TypeUserRepository test suit", () => {
	let findMock: jest.Mock;
	let findOneByMock: jest.Mock;
	let userRepository: TypeUserRepository;
	beforeAll(() => {
		const datasourceMock: DataSource = createMock<DataSource>();
		const repository = createMock<Repository<TypeUser>>();
		(
			On(datasourceMock).get(method("getRepository")) as jest.Mock
		).mockReturnValue(repository);
		findMock = On(repository).get(method("find")) as jest.Mock;
		findOneByMock = On(repository).get(method("findOneBy")) as jest.Mock;
		userRepository = new TypeUserRepository(
			Promise.resolve(datasourceMock)
		);
	});

	beforeEach(() => {
		findMock.mockReset();
		findOneByMock.mockReset();
	});

	test("Test getAllUsers without name", async () => {
		// Given I have the findMock setUp
		findMock.mockReturnValue(users);
		// When I call getAllUsers
		const returnedUsers = await userRepository.getAllUsers();
		// Then findMock should be called
		expect(findMock).toHaveBeenCalled();
		// And the returned users should be equals to the originals
		expect(returnedUsers).toEqual(expect.arrayContaining(users));
	});

	test("Test getAllUsers with name", async () => {
		const slicedUsers = users.slice(0, 1);
		// Given I have the findMock setUp
		findMock.mockReturnValue(slicedUsers);
		// When I call getAllUsers
		const returnedUsers = await userRepository.getAllUsers(
			slicedUsers[0].name
		);
		// Then findMock should be called
		expect(findMock).toHaveBeenCalled();
		// And the returned users should be equals to the originals
		expect(returnedUsers).toEqual(expect.arrayContaining(slicedUsers));
	});

	test("Test getAllUsers missing users", async () => {
		// Given I have the findMock setUp
		findMock.mockReturnValue([]);
		// When I call getAllUsers
		// Then an Error should rise
		await expect(() =>
			userRepository.getAllUsers("FAKE name")
		).rejects.toThrowError("Users not found");
		// And findMock should be called
		expect(findMock).toHaveBeenCalled();
	});

	test("Test getUser with id", async () => {
		const user = users[0];
		// Given I have the findOneByMock setUp
		findOneByMock.mockReturnValue(user);
		// When I call getUser
		const returnedUser = await userRepository.getUser(user.id);
		// Then findOneByMock should be called
		expect(findOneByMock).toHaveBeenCalled();
		// And the returned user should be equals to the originals
		expect(returnedUser).toEqual(user);
	});

	test("Test getUser missing user", async () => {
		// Given I have the findOneByMock setUp
		findOneByMock.mockReturnValue(null);
		// When I call getUser
		// Then an Error should rise
		await expect(() => userRepository.getUser(6)).rejects.toThrowError(
			"User not found"
		);
		// And findOneByMock should be called
		expect(findOneByMock).toHaveBeenCalled();
	});
});
