"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Menu, Drawer, Typography, Dropdown, MenuProps } from "antd";
import {
  isRedirectable,
  useWallet,
  Wallet,
  WalletReadyState,
  WalletName,
  AptosStandardSupportedWallet,
} from "@aptos-labs/wallet-adapter-react";
import { truncateAddress } from "@/src/utils/aptos";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  RightOutlined,
} from "@ant-design/icons";
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
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(account?.address || "");
      console.log("Content copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  const logout = () => {
    disconnect();
  };
  const buttonText = account?.ansName
    ? account?.ansName
    : truncateAddress(account?.address || "");
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <button onClick={copyAddress} className="!text-[#aa80ef]">
          Copy Address
        </button>
      ),
    },
    {
      key: "2",
      label: (
        <button onClick={logout} className="!text-[#aa80ef]">
          Logout
        </button>
      ),
    },
  ];
  return (
    <>
      {connected ? (
        <Dropdown
          menu={{
            items,
            style: { backgroundColor: "#111827" },
          }}
          placement="bottomRight"
          onOpenChange={(open) => {
            setDropdownOpen(open);
          }}
        >
          <button className="rounded-box bg-black px-3 py-1 text-[#aa80ef]">
            {buttonText}
            {dropdownOpen ? (
              <CaretUpOutlined className="ml-2 text-white" />
            ) : (
              <CaretDownOutlined className="ml-2 text-white" />
            )}
          </button>
        </Dropdown>
      ) : (
        <button
          className="rounded-box bg-black px-3 py-1 text-[#aa80ef]"
          onClick={() => onWalletButtonClick()}
        >
          Connect Wallet
        </button>
      )}
      <Drawer
        height="32rem"
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
          <div className="flex h-[3rem] justify-between rounded-full bg-[#666665] px-5 py-2">
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
        <div className="flex h-[3rem] justify-between rounded-full bg-[#666665] px-5 py-2">
          <div className="wallet-name-wrapper">
            <img className="rounded-[50%] border-2 border-[#292e5f]" src={wallet.icon} width={25} style={{ marginRight: 10 ,backgroundColor:'#130f2a'}} />
            <Text className="text-white wallet-selector-text">{wallet.name}</Text>
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
