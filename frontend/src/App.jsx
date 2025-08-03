import React from "react";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "@/context/UserContext";
import AppRoutes from "@/routes/AppRoutes";
import Navbar from "@/components/ui/Navbar";

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Navbar />
        <AppRoutes />
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
