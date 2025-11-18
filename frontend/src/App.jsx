import MainRouter from "./MainRouter";
import { UserProvider } from "./UserContext";

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
