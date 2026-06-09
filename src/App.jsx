import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Contacts from "./pages/Contacts";
import AddContact from "./pages/AddContact";
import EditContact from "./pages/EditContact";

export default function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/contacts/add" element={<AddContact />} />
      <Route path="/contacts/edit/:customer_id" element={<EditContact />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}