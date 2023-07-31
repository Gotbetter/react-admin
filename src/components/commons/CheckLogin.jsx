import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { isExpired } from 'react-jwt';
import { loginTokenState } from "../../recoil/login/loginTokenState"

export default function CheckLogin() {
    const [loginToken, setLoginToken] = useRecoilState(loginTokenState);

    const navigate = useNavigate();

    useEffect(() => {
        if (loginToken.accessToken !== null && loginToken.refreshToken !== null
            && isExpired(loginToken.accessToken) === false) {
            // navigate("/");
        } else if (loginToken.accessToken !== null && loginToken.refreshToken !== null
            && isExpired(loginToken.accessToken) === true) {
            // 추가 - selector
        } else {
            setLoginToken({
                accessToken: null,
                refreshToken: null
            });
            alert("만료되었습니다. 다시 로그인해 주세요.");
            navigate("/login");
        }
    }, [loginToken.accessToken, loginToken.refreshToken]);

    return(<></>);
}