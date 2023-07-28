import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import GlobalStyle from "./GlobalStyle";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
    <GlobalStyle/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="*" element={<NotFoundPage />}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;