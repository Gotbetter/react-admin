// errorUtils.js
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { loginState } from "../recoil/login/loginState";
import { useMutation } from "@tanstack/react-query";
import { reissue } from "./user";
import { loginTokenState } from "../recoil/login/loginTokenState";
export const useErrorHandling = () => {
  const navigate = useNavigate();

  const setIsLogin = useSetRecoilState(loginState);
  const setLoginToken = useSetRecoilState(loginTokenState);

  const { mutate: reissueToken } = useMutation(() => reissue(), {
    retry: 1,
    onSuccess: async (res) => {
      console.log("[Reissue]: reissue user tokens");
      const { access_token, refresh_token } = res.data;
      setLoginToken({
        accessToken: access_token,
        refreshToken: refresh_token,
      });
    },
    onError: (err) => {
      const { status } = err.response;

      if (status === 401) {
        handleRelogin();
      } else {
        alert("오류가 발생했습니다.");
      }
    },
  });

  const handleNotAdminError = () => {
    alert("관리자가 아닙니다.");
    setIsLogin(false);
    navigate("/notfound");
  };

  const handleExpiredToken = () => {
    reissueToken();
  };

  const handleRelogin = () => {
    alert("다시 로그인해주세요.");
    setIsLogin(false);
    navigate("/notfound");
  };

  return {
    handleNotAdminError,
    handleExpiredToken,
    handleRelogin,
  };
};
