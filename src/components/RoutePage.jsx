import { Route, Routes } from "react-router-dom";
import DashPage from "./pages/dash/DashPage";
import RoomPage from "./pages/room/RoomPage";
import UserPage from "./pages/user/UserPage";
import CommonPage from "./pages/common/CommonPage";
import AdminPage from "./pages/admin/AdminPage";
import LoginPage from "./pages/login/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useRecoilValue } from "recoil";
import { loginState } from "../recoil/login/loginState";
import RoomDetailPage from "./pages/room/RoomDetailPage";

export default function RoutePage() {
  const isLogin = useRecoilValue(loginState);

  return (
    <Routes>
      {!isLogin ? (
        <>
          <Route path='/login' exact element={<LoginPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </>
      ) : (
        <>
          <Route path='/' exact element={<DashPage />} />
          <Route path='/rooms' exact element={<RoomPage />} />
          <Route path='/rooms/:roomId' exact element={<RoomDetailPage />} />
          <Route path='/users' exact element={<UserPage />} />
          <Route path='/commons' exact element={<CommonPage />} />
          <Route path='/admins' exact element={<AdminPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </>
      )}
    </Routes>
  );
}
