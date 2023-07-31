import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { isExpired } from 'react-jwt';
import { loginTokenState } from "../../recoil/login/loginTokenState"
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../../api/user";
import { userState } from "../../recoil/user/userState";

interface Props {
    children: ReactNode;
}

export default function CheckLogin({ children }: Props) {
    const [loginToken, setLoginToken] = useRecoilState(loginTokenState);
    const [user, setUser] = useRecoilState(userState);

    const navigate = useNavigate();

    const { data } = useQuery(['user'], fetchUser, {
        retry: 1,
        staleTime: 500000,
        onSuccess: (data) => {
            console.log('[CheckLogin]: fetching user info');
            setUser({...data});
        },
        onError: async () => {
            alert('사용자 정보 조회 실패');
            
            setLoginToken({
                accessToken: null,
                refreshToken: null
            });
            setUser({
                user_id: null, 
                auth_id: null, 
                username: null, 
                email: null, 
                profile: null
            })
            navigate("/login");
        },
        select: (res) => res.data,
    });

    useEffect(() => {
        if (loginToken.accessToken !== null && loginToken.refreshToken !== null
            && isExpired(loginToken.accessToken) === false) {
            // navigate("/");
        } 
        // else if (loginToken.accessToken !== null && loginToken.refreshToken !== null
        //     && isExpired(loginToken.accessToken) === true) {
        //     // 추가 - selector
        // } 
        else {
            alert("다시 로그인해 주세요.");
            setLoginToken({
                accessToken: null,
                refreshToken: null
            });
            setUser({
                user_id: null, 
                auth_id: null, 
                username: null, 
                email: null, 
                profile: null
            })
            navigate("/login");
        }
    }, [loginToken.accessToken, loginToken.refreshToken]);

    return(children);
}