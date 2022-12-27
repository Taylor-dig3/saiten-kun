import { atom } from 'recoil';

export const login = atom({
    key: "login",
    default: {userId:null,name:null,loginState:"notYetLoggedIn"}
  });
  

  export const questionAndAnswer = atom({
    key: "questionAndAnswer",
    default: {}
  });