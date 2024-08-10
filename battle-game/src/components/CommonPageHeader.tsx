"use client";
import Image from "next/image";
import { CloseOutlined } from "@ant-design/icons";
import HeaderBg from "@/public/assets/header_icon.png";
import { useRouter } from "next/navigation";

export const CommonPageHeader = ({
  className = "",
  closeIconColor = "text-white",
}: {
  className?: string;
  closeIconColor?: string;
}) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };
  return (
    <header
      className={
        `flex h-20 w-full flex-row items-center justify-center px-4 backdrop-blur-sm` +
        ` ${ 
        className}`
      }
    >
      <Image src={HeaderBg} width={126} height={80} alt="Header" />
      {/* <CloseOutlined
        onClick={handleGoBack}
        className={`text-2xl` + ` ${  closeIconColor}`}
      /> */}
    </header>
  );
};
