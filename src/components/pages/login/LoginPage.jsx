import React, { useState } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { loginTokenState } from "../../../recoil/login/loginTokenState";
import { loginRequest } from "../../../api/user";
import { useMutation } from "@tanstack/react-query";
import UserData from "./UserData";
import { useErrorHandling } from "../../../api/useErrorHandling";
import { useApiError } from "../../../api/useApiError";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [authId, setAuthId] = useState("");
  const [password, setPassword] = useState("");
  const [loginToken, setLoginToken] = useRecoilState(loginTokenState);

  const errorhandling = useErrorHandling();
  const { handleError } = useApiError(
    {
      404: {
        NOT_FOUND: () => alert("아이디 또는 비밀번호가 일치하지 않습니다."),
      },
    },
    errorhandling
  );

  const { mutate: loginFunc } = useMutation(
    ({ auth_id, password, admin }) =>
      loginRequest({ auth_id: auth_id, password: password }, admin),
    {
      onError: handleError,
      onSuccess: async (res) => {
        const { access_token, refresh_token } = res.data;
        setLoginToken({
          accessToken: access_token,
          refreshToken: refresh_token,
        });
        setAuthId("");
        setPassword("");
        setIsLogin(true);
      },
    }
  );

  return (
    <Layout>
      <WhiteBox>
        <LogoBox>로고</LogoBox>
        <AppName>GotBetter Admin</AppName>
        <TextInput
          type='text'
          placeholder='아이디'
          onChange={(e) => setAuthId(e.target.value)}
        />
        <TextInput
          type='password'
          placeholder='비밀번호'
          onChange={(e) => setPassword(e.target.value)}
        />
        <LoginButton
          onClick={() =>
            loginFunc({ auth_id: authId, password: password, admin: true })
          }
        >
          로그인
        </LoginButton>
      </WhiteBox>
      {isLogin && <UserData />}
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const WhiteBox = styled.div`
  position: relative;
  width: 380px;
  height: 582px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid var(--grayscale-divider, #dfe0eb);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 55px;
  width: 139px;
  height: 48px;
  background-color: #d9d9d9;
  color: white;
`;

const AppName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 316px;
  margin-top: 12px;
  margin-bottom: 36px;
  height: 48px;
  background-color: white;
  color: #a4a6b3;
  font-size: 19px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.4px;
`;

const TextInput = styled.input`
  width: 316px;
  height: 64px;
  padding: 20.56px;
  fill: #fff;
  margin: 10px 0;
  border-radius: 8px;
  color: #bdbdbd;
  border: 1px solid var(--grayscale-divider, #dfe0eb);
  font-variant-numeric: lining-nums proportional-nums;
`;

const LoginButton = styled.button`
  width: 316px;
  height: 48px;
  margin-top: 25px;
  background-color: #33f;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
`;
