import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Layout from "layout/Layout";
import Home from "pages/home";
import Launch from "pages/launch";
import Leads from "pages/leads";

function App() {
  return (
    <Router>
      {/* <Layout> */}
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/launch"
            element={<Launch />}
          />
          <Route
            path="/leads"
            element={<Leads />}
          />
        </Routes>
      {/* </Layout> */}
    </Router>
  );
}

export default App;
