import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { loginTokenState } from "../../../recoil/login/loginTokenState"

export default function RoomPage() {
    const loginToken = useRecoilValue(loginTokenState);
    console.log("in room page");
    console.log(loginToken);

    return(<></>);
}