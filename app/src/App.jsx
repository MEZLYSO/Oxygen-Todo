import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { FolderPage } from "./pages/FolderPage/FolderPage";
import { NotePage } from "./pages/NotePage/NotePage";
import PrivateGuard from "./guards/PrivateGuard";
import PublicGuard from "./guards/PublicGuard";
import { Toaster } from "react-hot-toast";
import { UserPage } from "./pages/UserPage/UserPage";
import { RoutesContext } from "./context/RoutesContext";
import { useState } from "react";

function App() {
  const [folderPage, setFolderPage] = useState("");
  return (
    <BrowserRouter>
      <RoutesContext.Provider value={{ folderPage, setFolderPage }}>
        <Routes>
          <Route element={<PublicGuard />}>
            <Route path="/" element={<LoginPage />} />
          </Route>
          <Route element={<PrivateGuard />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/folder/:idFolder" element={<FolderPage />} />
            <Route path="/note/:idNote" element={<NotePage />} />
            <Route path="/user" element={<UserPage />} />
          </Route>
        </Routes>
        <Toaster position="top-right" />
      </RoutesContext.Provider>
    </BrowserRouter>
  );
}

export default App;
