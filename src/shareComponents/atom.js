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

export const testList = atom({
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

export const selectedTestInfo = atom({
  key:"selectedTestInfo",
  default:{test_id:"",title:"",grade:"",subject:"",make_date:"",question_count:"",run_date:""}
})
