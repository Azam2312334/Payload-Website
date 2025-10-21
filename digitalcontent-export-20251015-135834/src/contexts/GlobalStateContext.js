import { setCookie, parseCookies } from "nookies";
import { useState, useContext, createContext, useEffect } from "react";
import { useRouter } from "next/router";

import { PERSONA } from "../constants";

const GlobalStateContext = createContext();

const GlobalState = ({ children }) => {
  const [persona, setPersona] = useState("people");
  const cookies = parseCookies();
  const router = useRouter();

  useEffect(() => {
    const { pathname } = router;

    try {
      if (cookies.persona === undefined) setPersona(PERSONA.People);
      else if (pathname.startsWith("/rakyat")) {
        setPersona(PERSONA.People);
      } else if (pathname.startsWith("/business")) {
        setPersona(PERSONA.Business);
      } else if (pathname.startsWith("/investor")) {
        setPersona(PERSONA.Investor);
      } else setPersona(cookies.persona);
    } catch (error) {}
  }, [router]);

  useEffect(() => {
    if (persona) setCookie(null, "persona", persona, { path: "/" });
  }, [persona]);

  return (
    <GlobalStateContext.Provider
      value={{
        persona,
        setPersona,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalState;
export const useGlobalState = () => useContext(GlobalStateContext);
