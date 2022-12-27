import { atom } from "recoil";

export const login = atom({
<<<<<<< HEAD
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
=======
    key: "login",
    default: {userId:null,name:null,loginState:"notYetLoggedIn"}
  });
  

  export const questionAndAnswer = atom({
    key: "questionAndAnswer",
    default: []
  });
>>>>>>> 3b531a2633c78ac4d2550e47dde2de6c1dca3908
