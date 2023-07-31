import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { loginTokenState } from "../../../recoil/login/loginTokenState"

export default function DashPage() {
    const loginToken = useRecoilValue(loginTokenState);
    console.log("in dash page");
    console.log(loginToken);

    return(<></>);
}