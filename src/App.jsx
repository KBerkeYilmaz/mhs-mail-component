import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Layout from "layout/Layout";
import Home from "pages/home";

function App() {
  return (
    <Router>
      {/* <Layout> */}
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
        </Routes>
      {/* </Layout> */}
    </Router>
  );
}

export default App;
