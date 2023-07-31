import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GlobalStyle from "./GlobalStyle";
import LoginPage from "./components/pages/login/LoginPage";
import RoomPage from "./components/pages/dash/DashPage";
import DashPage from "./components/pages/room/RoomPage";
import NotFoundPage from "./components/pages/NotFoundPage";
import CheckLogin from "./components/commons/CheckLogin";

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={ <CheckLogin />}>
              <Route path="/" element={<DashPage />} />
              <Route path="/rooms" element={<RoomPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
