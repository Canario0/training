import { syncHashPassword } from "../utils/crypt";

const users = [
  {
    id: 1,
    name: "Test User1",
    password: syncHashPassword("fake1"),
  },
  {
    id: 2,
    name: "Test User2",
    password: syncHashPassword("fake2"),
  },
];

export default users;
