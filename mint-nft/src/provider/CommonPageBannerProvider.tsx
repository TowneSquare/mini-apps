"use client";

import React, { useContext } from "react";

export const CommonPageBannerContext = React.createContext<{
  noBanner: boolean;
  setNoBanner: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);
export function useCommonPageBannerContext() {
  const ModelContext = useContext(CommonPageBannerContext);

  return {
    noBanner: ModelContext?.noBanner,
    setNoBanner: ModelContext?.setNoBanner,
  };
}
interface CommonPageBannerProviderProps {
  children: React.ReactNode;
}

export function CommonPageBannerProvider({
  children,
}: CommonPageBannerProviderProps) {
  const [noBanner, setNoBanner] = React.useState(false);

  return (
    <CommonPageBannerContext.Provider value={{ noBanner, setNoBanner }}>
      {children}
    </CommonPageBannerContext.Provider>
  );
}
