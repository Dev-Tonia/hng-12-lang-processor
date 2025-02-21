import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../Layouts/Layout";
import ChatBot from "../pages/ChatBot";
import ChatDetail from "../pages/ChatDetail";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<Layout />}>
        <Route index element={<ChatBot />} />
        <Route path=":chatId" element={<ChatDetail />} />
      </Route>
    </Routes>
  );
}
