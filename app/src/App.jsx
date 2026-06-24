import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { RoutesContext } from "./context/RoutesContext";
import PrivateGuard from "./guards/PrivateGuard";
import PublicGuard from "./guards/PublicGuard";
import { FolderPage } from "./pages/FolderPage/FolderPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { NotePage } from "./pages/NotePage/NotePage";
import { UserPage } from "./pages/UserPage/UserPage";

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
        <Analytics />
      </RoutesContext.Provider>
    </BrowserRouter>
  );
}

export default App;
