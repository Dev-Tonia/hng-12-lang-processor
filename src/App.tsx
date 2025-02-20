// import { useEffect } from "react";
import Layout from "./Layouts/Layout";
import ChatBot from "./pages/ChatBot";
import { DataProvider } from "./providers/DataProvider";
import NotSupported from "./components/NotSupported";
function App() {
  const isSupported = () => "ai" in self;
  // useEffect(() => {
  //   if (!("ai" in self) && !("translator" in self.ai)) {
  //     console.log("OYO is that you ?", self.ai.translator);
  //   }
  //   console.log(window);
  // }, []);

  console.log(self);
  return (
    <>
      <DataProvider>
        <Layout>{!isSupported() ? <NotSupported /> : <ChatBot />}</Layout>
      </DataProvider>
    </>
  );
}

export default App;
