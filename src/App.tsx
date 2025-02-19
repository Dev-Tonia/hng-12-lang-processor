import Layout from "./Layouts/Layout";
import ChatBot from "./pages/ChatBot";
import { DataProvider } from "./providers/DataProvider";
function App() {
  return (
    <>
      <DataProvider>
        <Layout>
          <ChatBot />
        </Layout>
      </DataProvider>
    </>
  );
}

export default App;
