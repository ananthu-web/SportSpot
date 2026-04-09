import React, { useState, useEffect } from "react";
import MainRouter from "./MainRouter";
import { UserProvider } from "./UserContext";
import API from "./API";
import ServerWaking from "./Components/ServerWaking";
import "./global.css";

function App() {
  const [isWaking, setIsWaking] = useState(true);

  useEffect(() => {
    const wakeUpServer = async () => {
      try {
        // Ping the backend root endpoint to wake it up
        await API.get("/");
        setIsWaking(false);
      } catch (error) {
        console.error("Waiting for server to wake up...");
        
        // Retry logic: If it fails, try again every 3 seconds for up to 60 seconds
        let attempts = 0;
        const interval = setInterval(async () => {
          attempts++;
          try {
            await API.get("/");
            clearInterval(interval);
            setIsWaking(false);
          } catch (e) {
            if (attempts > 20) { // Give up after 60 seconds
              clearInterval(interval);
              setIsWaking(false);
            }
          }
        }, 3000);
      }
    };

    wakeUpServer();
  }, []);

  return (
    <>
      {isWaking ? (
        <ServerWaking />
      ) : (
        <UserProvider>
          <MainRouter />
        </UserProvider>
      )}
    </>
  );
}

export default App;
