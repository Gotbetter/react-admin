import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { loginTokenState } from "../../../recoil/login/loginTokenState";
import { fetchUser, loginRequest } from "../../../api/user";
import { useQuery } from "@tanstack/react-query";
import { userState } from "../../../recoil/user/userState";
import { loginState } from "../../../recoil/login/loginState";

export default function UserData() {
  const setUser = useSetRecoilState(userState);
  const setLoginToken = useSetRecoilState(loginTokenState);
  const setIsLogin = useSetRecoilState(loginState);

  const navigate = useNavigate();

  const { data } = useQuery(["userInfo"], fetchUser, {
    // retry: 1,
    // staleTime: 500000,
    onSuccess: (data) => {
      console.log("[CheckLogin]: fetching user info");
      setUser({ ...data });
      setIsLogin(true);
      navigate("/commons");
    },
    onError: async () => {
      alert("[사용자 정보 조회 실패] 다시 로그인해 주세요.");
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
    },
    select: (res) => res.data,
  });
}
