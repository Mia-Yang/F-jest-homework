import axios from "axios";
import { register } from "../user";
import { verifyUsername, verifyPassword } from "../verify";

jest.mock("../verify");
jest.mock("axios");

describe("register", () => {
  test("should post user when validated", async () => {
    // TODO 19: add test here
    axios.post.mockResolvedValueOnce({
      data: {
        name: "NANA",
      },
    });
    const result = register("fake username", "fake password");
    await expect(result).resolves.toEqual({ name: "NANA" });
  });

  test("should reject with Error when username is invalid", async () => {
    // TODO 20: add test here
    const fakeUserName = "fake username";
    const fakePassWord = "fake password";
    verifyUsername.mockReturnValueOnce(false);
    verifyPassword.mockReturnValueOnce(true);
    const result = register(fakeUserName, fakePassWord);
    await expect(result).rejects.toEqual(Error("wrong username or password"));
  });
});
