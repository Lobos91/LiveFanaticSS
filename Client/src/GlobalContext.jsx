import { createContext, useState, useEffect } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  // useState for all variables
  const [auth, setAuth] = useState({ loggedIn: false });
  const [isLoading, setIsLoading] = useState(true);

  // useEffect to run methods upon load
  useEffect(() => {
    checkAuth();
    // loadTidbits();
  }, []);

  // methods, could be for on load, or just called from elsewhere

  const checkAuth = async () => {
    setIsLoading(true);
    const response = await fetch("/data/login");
    const result = await response.json();
    console.log(result);
    setAuth(result);
    setIsLoading(false);
  };

  const submitLogin = async (email, password) => {
    setIsLoading(true);
    const response = await fetch("/data/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const result = await response.json();
    console.log(result);
    setIsLoading(false);
    checkAuth();
  };

  const logout = async () => {
    setIsLoading(true);
    const response = await fetch("/data/login", {
      method: "delete",
    });
    const result = await response.json();
    console.log(result);
    setIsLoading(false);
    setAuth({ loggedIn: false });
  };

  // const loadTidbits = async () => {
  //   setIsLoading(true);
  //   const response = await fetch("/data/tidbits");
  //   const result = await response.json();
  //   console.log(result);
  //   setTidbits(result);
  //   setIsLoading(false);
  // };

  return (
    <GlobalContext.Provider
      value={{
        auth,
        isLoading,
        submitLogin,
        logout,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
