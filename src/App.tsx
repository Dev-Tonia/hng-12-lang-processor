// import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { DataProvider } from "./providers/DataProvider";
import AppRoutes from "./routes/AppRoutes";
function App() {
  console.log(self);
  return (
    <>
      <Router>
        <DataProvider>
          <AppRoutes />
        </DataProvider>
      </Router>
    </>
  );
}

export default App;
