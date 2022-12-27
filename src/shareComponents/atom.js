import { atom } from "recoil";

export const login = atom({
  key: "login",
  default: { userId: null, loginState: "notYetLoggedIn" },
});

export const testResult = atom({
  key: "testResult",
  default: {},
});

export const testResultCheck = atom({
  key: "testResultCheck",
  default: {},
});

export const testQuestion = atom({
  key: "testQuestion",
  default: {},
});

export const acquiredQuestion = atom({
  key: "acquiredQuestion",
  default: [],
});
