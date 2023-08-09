import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { loginState } from "../../recoil/login/loginState";
import { loginTokenState } from "../../recoil/login/loginTokenState";
import { userState } from "../../recoil/user/userState";

export default function NotFoundPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const [loginToken, setLoginToken] = useRecoilState(loginTokenState);
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    if (!isLogin) {
      setLoginToken({
        accessToken: null,
        refreshToken: null,
      });
      setUser({
        user_id: null,
        auth_id: null,
        username: null,
        email: null,
        profile: null,
      });
      navigate("/login");
    } else {
      navigate("/");
    }
  }, [
    isLogin,
    navigate,
    setLoginToken,
    setUser,
    loginToken.accessToken,
    setIsLogin,
  ]);

  return <NotFoundImg>Not Found Page</NotFoundImg>;
}

const NotFoundImg = styled.div`
  padding-top: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  font-weight: 700;
  color: #d9d9d9;
`;
