import Image from "next/image";
import { CloseOutlined } from "@ant-design/icons";
import HeaderBg from "@/public/assets/header_icon.png";

export const CommonPageHeader = ({
  className = "",
  closeIconColor = "text-white",
}: {
  className?: string;
  closeIconColor?: string;
}) => {
  return (
    <header
      className={
        `fixed flex h-20 w-full flex-row items-center justify-between px-4 backdrop-blur-sm` +
        " " +
        className
      }
    >
      <Image src={HeaderBg} width={126} height={80} alt="Header" />
      <CloseOutlined className={"text-2xl" + " " + closeIconColor} />
    </header>
  );
};
