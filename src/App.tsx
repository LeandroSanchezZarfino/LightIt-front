import AppLayout from "./components/layout/AppLayout";
import Login from "./pages/Login";
import  "./index.css"

function App() {
  return (
     1 == 1 ? <Login /> : 
      <AppLayout>
      content
    </AppLayout>
  );
}

export default App;
