import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { isExpired } from "react-jwt";
import { loginTokenState } from "../recoil/login/loginTokenState";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../api/user";
import { userState } from "../recoil/user/userState";

export default function CheckLogin({ children }) {
  const [loginToken, setLoginToken] = useRecoilState(loginTokenState);
  const setUser = useSetRecoilState(userState);

  const navigate = useNavigate();

  const { data } = useQuery(["userInfo"], fetchUser, {
    retry: 1,
    staleTime: 500000,
    onSuccess: (data) => {
      console.log("[CheckLogin]: fetching user info");
      setUser({ ...data });
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

  return <div>{children}</div>;
}
