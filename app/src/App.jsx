import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { FolderPage } from "./pages/FolderPage/FolderPage";
import { NotePage } from "./pages/NotePage/NotePage";
import PrivateGuard from "./guards/PrivateGuard";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<PrivateGuard />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/folder/:idFolder" element={<FolderPage />} />
          <Route path="/note/:idNote" element={<NotePage />} />
        </Route>
      </Routes>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;
