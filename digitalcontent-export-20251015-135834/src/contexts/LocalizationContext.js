import { useState, useEffect, createContext, useContext } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const LocalizationContext = createContext();

const Localization = ({ children }) => {
  const [currentLocale, setCurrentLocale] = useState("en");
  const { i18n } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem("locale")) {
        setCurrentLocale(window.sessionStorage.getItem("locale"));
        i18n.changeLanguage(window.sessionStorage.getItem("locale"));
      } else if (router.locale !== router.defaultLocale) {
        i18n.changeLanguage(router.locale);
        setCurrentLocale(router.locale);
      } else {
        setCurrentLocale(router.locale);
      }
    } catch (error) {}
  }, []);

  const changeLocale = (lng) => {
    try {
      window.sessionStorage.setItem("locale", lng);
      setCurrentLocale(lng);
      i18n.changeLanguage(lng);
    } catch (error) {}
  };

  const getCurrentLocale = () => {
    return currentLocale;
  };

  return (
    <LocalizationContext.Provider
      value={{
        changeLocale,
        getCurrentLocale,
      }}
    >
      {children}
    </LocalizationContext.Provider>
  );
};

export default Localization;
export const useLocalization = () => useContext(LocalizationContext);
