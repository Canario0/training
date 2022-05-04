import httpStatus from "http-status-codes";
import { getMockReq, getMockRes } from "@jest-mock/express";
import { getAllUsers, getUser } from "./user-controllers";
import AppError from "../utils/exceptions";
import users from "./user-demo";

describe("User controllers test suit", () => {
  let getAllUsersRepositoryMock: jest.Mock;
  let getUserRepositoryMock: jest.Mock;
  beforeAll(() => {
    getAllUsersRepositoryMock = jest.fn();
    getUserRepositoryMock = jest.fn();
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("Test getAllUsers controller without query params", async () => {
    // Given I have the getAllUsersRepositoryMock initialized
    getAllUsersRepositoryMock.mockReturnValue(users);
    // And I have a controller injected with the UserRepository
    const getAllUsersController = getAllUsers({
      getAllUsers: getAllUsersRepositoryMock,
      getUser: getUserRepositoryMock,
    });
    // When I do a call
    const req = getMockReq();
    const { res, next } = getMockRes();
    await getAllUsersController(req, res, next);
    // Then the next function should not be called
    expect(next).not.toHaveBeenCalled();
    // And the getAllUsersRepositoryMock should be called without args
    expect(getAllUsersRepositoryMock).toHaveBeenCalledWith(undefined);
    // And the status method should be called with httpStatus.OK
    expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
    // And the json method should be called with all the users
    expect(res.json).toHaveBeenCalledWith(expect.arrayContaining(users));
  });

  test("Test getAllUsers controller with query params set", async () => {
    // Given I have the getAllUsersRepositoryMock initialized
    getAllUsersRepositoryMock.mockReturnValue(users.slice(0, 1));
    // And I have a controller injected with the UserRepository
    const getAllUsersController = getAllUsers({
      getAllUsers: getAllUsersRepositoryMock,
      getUser: getUserRepositoryMock,
    });
    // When I do a call
    const userName = users[0].name;
    const req = getMockReq({
      query: {
        name: userName,
      },
    });
    const { res, next } = getMockRes();
    await getAllUsersController(req, res, next);
    // Then the next function should not be called
    expect(next).not.toHaveBeenCalled();
    // And the getAllUsersRepositoryMock should be called with name args
    expect(getAllUsersRepositoryMock).toHaveBeenCalledWith(userName);
    // And the status method should be called with httpStatus.OK
    expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
    // And the json method should be called with all the users
    expect(res.json).toHaveBeenCalledWith(
      expect.arrayContaining(users.slice(0, 1))
    );
  });

  test("Test getAllUsers controller users not found", async () => {
    // Given I have the getAllUsersRepositoryMock initialized
    getAllUsersRepositoryMock.mockImplementation(() => {
      throw new Error("Fake users not found!");
    });
    // And I have a controller injected with the UserRepository
    const getAllUsersController = getAllUsers({
      getAllUsers: getAllUsersRepositoryMock,
      getUser: getUserRepositoryMock,
    });
    // When I do a call
    const fakeUserName = "FAKE";
    const req = getMockReq({
      query: {
        name: fakeUserName,
      },
    });
    const { res, next } = getMockRes();
    await getAllUsersController(req, res, next);
    // Then the status and json methods should not be called
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    // And the getAllUsersRepositoryMock should be called with name args
    expect(getAllUsersRepositoryMock).toHaveBeenCalled();
    // And the next function should be called with an AppError
    // with status code httpStatus.NOT_FOUND
    expect(next).toHaveBeenCalledWith(expect.any(AppError));
    expect((next as jest.Mock).mock.calls[0][0].statusCode).toBe(
      httpStatus.NOT_FOUND
    );
  });

  test("Test getUser controller with all correct", async () => {
    const user = users[0];
    // Given I have the getUserRepositoryMock initialized
    getUserRepositoryMock.mockReturnValue(user);
    // And I have a controller injected with the UserRepository
    const getUserController = getUser({
      getAllUsers: getAllUsersRepositoryMock,
      getUser: getUserRepositoryMock,
    });
    // When I do a call
    const req = getMockReq({
      params: {
        id: user.id,
      },
    });
    const { res, next } = getMockRes();
    await getUserController(req, res, next);
    // Then the next function should not be called
    expect(next).not.toHaveBeenCalled();
    // And the getUserRepositoryMock should be called with id set
    expect(getUserRepositoryMock).toHaveBeenCalledWith(user.id);
    // And the status method should be called with httpStatus.OK
    expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
    // And the json method should be called with the user
    expect(res.json).toHaveBeenCalledWith(user);
  });

  test("Test getUser controller with invalid id", async () => {
    // Given I have a controller injected with the UserRepository
    const getUserController = getUser({
      getAllUsers: getAllUsersRepositoryMock,
      getUser: getUserRepositoryMock,
    });
    // When I do a call
    const id = "fake_non_numeric_id";
    const req = getMockReq({
      params: {
        id,
      },
    });
    const { res, next } = getMockRes();
    await getUserController(req, res, next);
    // Then the status and json methods should not be called
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    // And the getUserRepositoryMock should not be called
    expect(getUserRepositoryMock).not.toHaveBeenCalled();
    // And the next function should be called with an AppError
    // with status code httpStatus.BAD_REQUEST
    expect(next).toHaveBeenCalledWith(expect.any(AppError));
    expect((next as jest.Mock).mock.calls[0][0].statusCode).toBe(
      httpStatus.BAD_REQUEST
    );
  });

  test("Test getUser controller with missing user", async () => {
    getUserRepositoryMock.mockImplementation(() => {
      throw new Error("Missing user!");
    });
    // Given I have a controller injected with the UserRepository
    const getUserController = getUser({
      getAllUsers: getAllUsersRepositoryMock,
      getUser: getUserRepositoryMock,
    });
    // When I do a call
    const id = 4;
    const req = getMockReq({
      params: {
        id,
      },
    });
    const { res, next } = getMockRes();
    await getUserController(req, res, next);
    // Then the status and json methods should not be called
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    // And the getUserRepositoryMock should be called with id set
    expect(getUserRepositoryMock).toHaveBeenCalledWith(id);
    // And the next function should be called with an AppError
    // with status code httpStatus.NOT_FOUND
    expect(next).toHaveBeenCalledWith(expect.any(AppError));
    expect((next as jest.Mock).mock.calls[0][0].statusCode).toBe(
      httpStatus.NOT_FOUND
    );
  });
});
