import { syncHashPassword } from "./utils/crypt";

const users = [
  {
    name: "Test User1",
    password: syncHashPassword("fake1"),
  },
  {
    name: "Test User2",
    password: syncHashPassword("fake2"),
  },
];

export default users;
