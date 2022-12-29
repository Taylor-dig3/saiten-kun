import { atom } from "recoil";

export const login = atom({
  key: "login",
  default: { userId: null, name: null, loginState: "notYetLoggedIn" },
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
  default: { data: [0, 1, 2] },
});

export const testResultList = atom({
  key: "testQuestion",
  default: [],
});

export const acquiredQuestion = atom({
  key: "acquiredQuestion",
  default: [],
});
export const questionAndAnswer = atom({
  key: "questionAndAnswer",
  default: {},
});
