import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import instance from "../../../api/axios";

export default function LoginPage() {
  const [authId, setAuthId] = useState("");
  const [password, setPassword] = useState("");

  const movePage = useNavigate();
  const goRooms = () => {
    movePage("/rooms");
  };

  const login = async () => {
    try {
      console.log(authId);
      console.log(password);
      const response = await instance.post("/users/login/admin", {
        auth_id: authId,
        password: password,
      });
      console.log(response.data);
      goRooms();
    } catch (error) {
      console.error(error);
      if (error.response.status === 403) {
        alert("관리자만 이용 가능합니다.");
      } else if ((authId === "") & (password === "")) {
        // 아이디, 비밀번호 모두 공백인 경우
        alert("아이디와 비밀번호를 입력해 주세요!");
      } else if (authId === "") {
        // 아이디가 공백인 경우
        alert("아이디를 입력해 주세요!");
      } else if (password === "") {
        // 비밀번호가 공백인 경우
        alert("비밀번호를 입력해 주세요!");
      } else {
        // 아이디와 비밀번호가 등록되어 있지 않을 때
        alert("아이디와 비밀번호를 확인해 주세요!");
      }
    }
  };

  return (
    <Layout>
      <WhiteBox>
        <LogoBox>로고</LogoBox>
        <AppName>GotBetter</AppName>
        <TextInput
          type="text"
          placeholder="아이디"
          onChange={(e) => setAuthId(e.target.value)}
        />
        <TextInput
          type="text"
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
  width: 139px;
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
