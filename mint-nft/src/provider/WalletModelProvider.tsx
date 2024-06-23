"use client";

import React, { useContext } from "react";

export const WalletSelectorModelContext = React.createContext<{
  isModalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);
export function useWalletSelectorModelContext() {
  const ModelContext = useContext(WalletSelectorModelContext);

  return {
    isModalOpen: ModelContext?.isModalOpen,
    setModalOpen: ModelContext?.setModalOpen,
  };
}
interface WalletSelectorModelProviderProps {
  children: React.ReactNode;
}

export function WalletSelectorModelProvider({
  children,
}: WalletSelectorModelProviderProps) {
  const [isModalOpen, setModalOpen] = React.useState(false);

  return (
    <WalletSelectorModelContext.Provider value={{ isModalOpen, setModalOpen }}>
      {children}
    </WalletSelectorModelContext.Provider>
  );
}
