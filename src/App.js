import { Routes as Switch, Route } from "react-router-dom";
import { ToastContextProvider } from "./context/ToastContext";

import Layout from "./components/ui/Layout";
import Home from "./pages/home";
import CreateTravel from "./pages/createTravel";

function App() {
  return (
    <ToastContextProvider>
      <Layout>
        <Switch>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateTravel />} />
        </Switch>
      </Layout>
    </ToastContextProvider>
  );
}

export default App;
