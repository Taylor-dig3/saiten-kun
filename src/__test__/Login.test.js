/* eslint-disable */

import { render, screen } from "@testing-library/react"
import LoginModal from "../pages/pageL1/components/LoginModal"
import { useRecoilValue } from "recoil";
import { RecoilRoot} from "recoil";
import { BrowserRouter, Route, Routes, Navigate,useLocation} from "react-router-dom";


describe("Test LoginModal Componet", () => {
    test("render form with 3button",async ()=>{
        render(
            <BrowserRouter>
         
        <RecoilRoot>
        <LoginModal />
        </RecoilRoot>
    </BrowserRouter>
        );
        const buttonList = await screen.findAllByRole("button");
        console.log("aaaa")
        console.log(buttonList)
        expect(buttonList).toHaveLength(4);
    })
})