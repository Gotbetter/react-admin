import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { loginTokenState } from "../../../recoil/login/loginTokenState";
import { loginRequest } from "../../../api/user";
import { useMutation } from "@tanstack/react-query";

export default function LoginPage() {
  const [authId, setAuthId] = useState("");
  const [password, setPassword] = useState("");
  const [loginToken, setLoginToken] = useRecoilState(loginTokenState);

  const navigate = useNavigate();

  useEffect(() => {
    if (loginToken.accessToken !== null && loginToken.refreshToken !== null) {
      navigate("/");
    }
  }, [loginToken.accessToken, loginToken.refreshToken])

  const { mutate: login } = useMutation(() => loginRequest({ auth_id: authId, password: password }), {
    onError: (err) => {
      const { status } = err.response;
      // console.log(format(err.response));
      // setError(true);
      if (status === 400) {
        alert('모든 정보를 입력해 주세요.');
        // setMessage('모든 정보를 입력해 주세요.');
      }
      if (status === 404) {
        alert('아이디 또는 비밀번호가 일치하지 않습니다.');
        // setMessage('아이디 또는 비밀번호가 일치하지 않습니다.');
      }
    },
    onSuccess: async (res) => {
      // console.log(format(res.data));
      const { access_token, refresh_token } = res.data;
      setLoginToken({
        accessToken: access_token,
        refreshToken: refresh_token
      });
      alert('로그인 성공');
      navigate('/');
    },
  });

  return (
    <Layout>
      <WhiteBox>
        <LogoBox>로고</LogoBox>
        <AppName>GotBetter Admin</AppName>
        <TextInput
          type="text"
          placeholder="아이디"
          onChange={(e) => setAuthId(e.target.value)}
        />
        <TextInput
          type="password"
          placeholder="비밀번호"
          onChange={(e) => setPassword(e.target.value)}
        />
        <LoginButton onClick={login}>로그인</LoginButton>
      </WhiteBox>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #363740;
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
