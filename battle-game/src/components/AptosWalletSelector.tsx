"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button, Menu, Drawer, Typography } from "antd";
import {
  isRedirectable,
  useWallet,
  Wallet,
  WalletReadyState,
  WalletName,
  AptosStandardSupportedWallet,
} from "@aptos-labs/wallet-adapter-react";
import { truncateAddress } from "@/src/utils/aptos";
import { RightOutlined } from "@ant-design/icons";
import DrawTitlePNG from "@/public/assets/draw_title.png";
import WalletPromptPNG from "@/public/assets/wallet-prompt.png";

const { Text } = Typography;

type WalletSelectorProps = {
  isModalOpen?: boolean;
  setModalOpen?: Dispatch<SetStateAction<boolean>>;
};

export function WalletSelector({
  isModalOpen,
  setModalOpen,
}: WalletSelectorProps) {
  const [walletSelectorModalOpen, setWalletSelectorModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen !== undefined) {
      setWalletSelectorModalOpen(isModalOpen);
    }
  }, [isModalOpen]);

  const { connect, disconnect, account, wallets, connected } = useWallet();

  const onWalletButtonClick = () => {
    if (connected) {
      disconnect();
    } else {
      setWalletSelectorModalOpen(true);
    }
  };

  const onWalletSelected = (wallet: WalletName) => {
    connect(wallet);
    setWalletSelectorModalOpen(false);
    if (setModalOpen) {
      setModalOpen(false);
    }
  };
  const onCancel = () => {
    setWalletSelectorModalOpen(false);
    if (setModalOpen) {
      setModalOpen(false);
    }
  };
  const buttonText = account?.ansName
    ? account?.ansName
    : truncateAddress(account?.address);
  return (
    <>
      <button
        className="rounded-box bg-black py-1 px-3 text-[#aa80ef]"
        onClick={() => onWalletButtonClick()}
      >
        {connected ? buttonText : "Connect Wallet"}
      </button>
      <Drawer
        height={"32rem"}
        className="rounded-t-3xl !bg-black"
        placement="bottom"
        // title={<div className="wallet-modal-title">Connect Wallet</div>}
        open={walletSelectorModalOpen}
        onClose={onCancel}
        footer={[]}
        closable={false}
        zIndex={9999}
      >
        {!connected && (
          <>
            <img className="mx-auto w-[20rem]" src={DrawTitlePNG.src} alt="" />
            <img
              className="mx-auto my-8 w-[15rem]"
              src={WalletPromptPNG.src}
              alt=""
            />
            <Menu className="bg-black">
              {wallets?.map((wallet: Wallet | AptosStandardSupportedWallet) => {
                return walletView(wallet, onWalletSelected);
              })}
            </Menu>
            <div className="p-[4px]">
              <button
                onClick={onCancel}
                className="mt-5 h-[3rem] w-full rounded-full bg-white text-lg"
              >
                Close
              </button>
            </div>
          </>
        )}
      </Drawer>
    </>
  );
}

const walletView = (
  wallet: Wallet | AptosStandardSupportedWallet,
  onWalletSelected: (wallet: WalletName) => void,
) => {
  const isWalletReady =
    wallet.readyState === WalletReadyState.Installed ||
    wallet.readyState === WalletReadyState.Loadable;

  // The user is on a mobile device
  if (!isWalletReady && isRedirectable()) {
    const mobileSupport = (wallet as Wallet).deeplinkProvider;
    // If the user has a deep linked app, show the wallet
    if (mobileSupport) {
      return (
        <Menu.Item
          className="!p-0"
          key={wallet.name}
          onClick={() => onWalletSelected(wallet.name)}
        >
          <div className="flex h-[3rem] justify-between rounded-full bg-[#666665] py-2 px-5">
            <div className="wallet-name-wrapper">
              <img src={wallet.icon} width={25} style={{ marginRight: 10 }} />
              <Text className="text-white">{wallet.name}</Text>
            </div>
            <button>
              <RightOutlined className="text-white" />
              {/* <Text className="wallet-connect-button-text">Connect</Text> */}
            </button>
          </div>
        </Menu.Item>
      );
    }
    // Otherwise don't show anything
    return null;
  } else {
    // The user is on a desktop device
    return (
      <Menu.Item
        className="!p-0"
        key={wallet.name}
        onClick={
          wallet.readyState === WalletReadyState.Installed ||
          wallet.readyState === WalletReadyState.Loadable
            ? () => onWalletSelected(wallet.name)
            : () => window.open(wallet.url)
        }
      >
        <div className="flex h-[3rem] justify-between rounded-full bg-[#666665] py-2 px-5">
          <div className="wallet-name-wrapper">
            <img src={wallet.icon} width={25} style={{ marginRight: 10 }} />
            <Text className="wallet-selector-text">{wallet.name}</Text>
          </div>
          {wallet.readyState === WalletReadyState.Installed ||
          wallet.readyState === WalletReadyState.Loadable ? (
            <RightOutlined className="text-white" />
          ) : (
            // <Button className="wallet-connect-button">
            //   <Text className="wallet-connect-button-text">Connect</Text>
            // </Button>
            <RightOutlined className="text-white" />

            // <Text className="wallet-connect-install">Install</Text>
          )}
        </div>
      </Menu.Item>
    );
  }
};
