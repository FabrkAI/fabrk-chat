/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getCssParamByCompany } from "../api/cssParam.api";
import { useScreenSize } from "./ScreenSizeContext";

export const InputConfigContextWrapper = ({
  companyId,
  children,
}: {
  companyId: string;
  children: React.ReactNode;
}) => {
  const [showMessages, setShowMessages] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState("");
  const [textColor, setTextColor] = useState("");
  const [width, setWidth] = useState("");
  const [borderRadius, setBorderRadius] = useState("");

  useQuery({
    queryFn: () => getCssParamByCompany(companyId as string),
    queryKey: ["cssParam"],
    enabled: companyId ? true : false,
    onSuccess(data) {
      if (data) {
        setBackgroundColor(data.backgroundColor);
        setTextColor(data.color);
        setWidth(data.width);
        setBorderRadius(data.borderRadius);
      }
    },
  });

  const screenSize = useScreenSize();

  const value = {
    backgroundColor,
    setBackgroundColor,
    textColor,
    setTextColor,
    width,
    setWidth,
    borderRadius,
    setBorderRadius,
    showMessages,
    setShowMessages,
  };

  useEffect(() => {
    if (screenSize.width < 800) {
      setWidth(screenSize.width.toString());
    }
  }, [screenSize]);

  return (
    <InputConfigContext.Provider value={value}>
      {children}
    </InputConfigContext.Provider>
  );
};

export const InputConfigContext = createContext({
  backgroundColor: "",
  setBackgroundColor: (value: string) => {},
  textColor: "",
  setTextColor: (value: string) => {},
  width: "",
  setWidth: (value: string) => {},
  borderRadius: "10",
  setBorderRadius: (value: string) => {},
  showMessages: true,
  setShowMessages: (value: boolean) => {},
});

export const useInputConfigContext = () => useContext(InputConfigContext);
