import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalStyle from "./GlobalStyle";
import LoginPage from "./components/pages/login/LoginPage";
import DashPage from "./components/pages/dash/DashPage";
import RoomPage from "./components/pages/room/RoomPage";
import NotFoundPage from "./components/pages/NotFoundPage";
import CheckLogin from "./components/commons/CheckLogin";
import UserPage from "./components/pages/user/UserPage";
import CommonPage from "./components/pages/common/CommonPage";
import AdminPage from "./components/pages/admin/AdminPage";

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              exact
              element={
                <CheckLogin>
                  <DashPage />
                </CheckLogin>
              }
            />
            <Route
              path="/rooms"
              exact
              element={
                <CheckLogin>
                  <RoomPage />
                </CheckLogin>
              }
            />
            <Route
              path="/users"
              exact
              element={
                <CheckLogin>
                  <UserPage />
                </CheckLogin>
              }
            />
            <Route
              path="/commons"
              exact
              element={
                <CheckLogin>
                  <CommonPage />
                </CheckLogin>
              }
            />
            <Route
              path="/admins"
              exact
              element={
                <CheckLogin>
                  <AdminPage />
                </CheckLogin>
              }
            />
            <Route path="/login" exact element={<LoginPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
