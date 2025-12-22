import MainRouter from "./MainRouter";
import { UserProvider } from "./UserContext";
// import "./global.css"

function App() {
  return (
    <>
      <UserProvider>
        <MainRouter />
      </UserProvider>
    </>
  );
}

export default App;
