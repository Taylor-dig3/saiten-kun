import { atom } from "recoil";

export const login = atom({
  key: "login",
  default: { userId: null, loginState: "notYetLoggedIn" },
});

export const testResult = atom({
  key: "testResult",
  default: {},
});
