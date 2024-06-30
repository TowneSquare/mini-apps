"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Button,
  Menu,
  Drawer,
  Typography,
  Dropdown,
  MenuProps,
  Modal,
} from "antd";
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
import { useMediaQuery } from "react-responsive";

const { Text } = Typography;

type WalletSelectorProps = {
  isModalOpen?: boolean;
  setModalOpen?: Dispatch<SetStateAction<boolean>>;
};

export function WalletSelector({
  isModalOpen,
  setModalOpen,
}: WalletSelectorProps) {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 500px)",
  });
  const [walletSelectorModalOpen, setWalletSelectorModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  useEffect(() => {
    if (isModalOpen !== undefined) {
      setWalletSelectorModalOpen(isModalOpen);
    }
  }, [isModalOpen]);

  const { connect, disconnect, account, wallets, connected, wallet } =
    useWallet();

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
  // const copyAddress = async () => {
  //   try {
  //     await navigator.clipboard.writeText(account?.address || "");
  //     console.log("Content copied to clipboard");
  //   } catch (err) {
  //     console.error("Failed to copy: ", err);
  //   }
  // };
  const logout = () => {
    disconnect();
  };
  const buttonText = account?.ansName
    ? account?.ansName
    : truncateAddress(account?.address || "");
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <div className="!text-white font-semibold">Connceted wallet</div>,
    },
    {
      key: "2",
      label: (
        <div className="flex h-[2.5rem] w-[15rem] justify-between rounded-lg bg-[#404040]">
          <div className="flex items-center justify-center text-white">
            <img src={wallet?.icon} width={18} height={18} className="mx-2 rounded-[50%]" />
            <div>{truncateAddress(account?.address || "")}</div>
          </div>
          <button onClick={logout} className="mr-2 !text-[#aa80ef] font-medium">
            Disconnect
          </button>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <button
          onClick={() => setDropdownOpen(false)}
          className="mt-5 mb-1 h-8 w-full rounded-full bg-white text-center text-black font-medium"
        >
          Close
        </button>
      ),
    },
  ];
  return (
    <>
      {connected ? (
        <Dropdown
          rootClassName="!top-[4.2rem] !rounded-box"
          menu={{
            items,
            style: { backgroundColor: "#111827" },
          }}
          placement="bottomRight"
          onOpenChange={(open) => {
            setDropdownOpen(open);
          }}
        >
          <button className="rounded-box bg-black py-1 px-3 text-[#aa80ef]">
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
          className="rounded-box bg-black py-1 px-3 text-[#aa80ef]"
          onClick={() => onWalletButtonClick()}
        >
          {"Connect Wallet"}
        </button>
      )}
      {isDesktopOrLaptop ? (
        <Modal
          centered
          width={"25rem"}
          wrapClassName="wallet-modal-wrapper"
          footer={[]}
          closable={false}
          open={walletSelectorModalOpen}
          onCancel={onCancel}
        >
          {!connected && (
            <>
              <img
                className="mx-auto w-[20rem]"
                src={DrawTitlePNG.src}
                alt=""
              />
              <img
                className="mx-auto my-8 w-[15rem]"
                src={WalletPromptPNG.src}
                alt=""
              />
              <Menu className="bg-black">
                {wallets?.map(
                  (wallet: Wallet | AptosStandardSupportedWallet) => {
                    return walletView(wallet, onWalletSelected);
                  },
                )}
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
        </Modal>
      ) : (
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
              <img
                className="mx-auto w-[20rem]"
                src={DrawTitlePNG.src}
                alt=""
              />
              <img
                className="mx-auto my-8 w-[15rem]"
                src={WalletPromptPNG.src}
                alt=""
              />
              <Menu className="bg-black">
                {wallets?.map(
                  (wallet: Wallet | AptosStandardSupportedWallet) => {
                    return walletView(wallet, onWalletSelected);
                  },
                )}
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
      )}
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
          className="!rounded-full !p-0"
          key={wallet.name}
          onClick={() => onWalletSelected(wallet.name)}
        >
          <div className="flex h-[3rem] justify-between rounded-full bg-[#666665] py-2 px-5">
            <div className="wallet-name-wrapper">
              <img src={wallet.icon} width={35} style={{ marginRight: 10 }} />
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
        className="!rounded-full !p-0"
        key={wallet.name}
        onClick={
          wallet.readyState === WalletReadyState.Installed ||
          wallet.readyState === WalletReadyState.Loadable
            ? () => onWalletSelected(wallet.name)
            : () => window.open(wallet.url)
        }
      >
        <div className="flex h-[3rem] justify-between rounded-full bg-[#666665] py-2 px-5 active:ring-violet-300">
          <div className="wallet-name-wrapper">
            <img
              className="rounded-[50%] border-2 border-[#292e5f]"
              src={wallet.icon}
              width={35}
              style={{ marginRight: 10, backgroundColor: "#130f2a" }}
            />
            <Text className="wallet-selector-text text-white">
              {wallet.name}
            </Text>
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
