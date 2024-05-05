import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Outlet } from "react-router-dom";

import Order from "./components/Order";

// import { supabase } from "./supabase/supabase.config";
import Layout from "./containers/Layout";
import RegFormProvider from "./providers/RegFormProvider";
import { SubtotalProvider } from "./providers/SubtotalContext";

function App() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("Fine");

  useEffect(() => {
    document.title = title;
  }, [title]);

  // useEffect(() => {
  //   supabase.auth.onAuthStateChange((event, session) => {
  //     if (!session) {
  //       navigate("/login");
  //     }
  //   });
  // }, []);

  return (
    <RegFormProvider>
      <SubtotalProvider>
        <div className="App">
          <Layout>
            <Outlet />
          </Layout>
        </div>
      </SubtotalProvider>
    </RegFormProvider>
  );
}

export default App;
