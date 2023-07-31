import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/pages/login/LoginPage";
import GlobalStyle from "./GlobalStyle";
import NotFoundPage from "./components/pages/NotFoundPage";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
