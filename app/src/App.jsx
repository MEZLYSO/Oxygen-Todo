import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { FolderPage } from "./pages/FolderPage/FolderPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/folder/:idFolder" element={<FolderPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
