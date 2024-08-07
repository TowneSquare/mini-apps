"use client";
import Image from "next/image";
import { CloseOutlined } from "@ant-design/icons";
import HeaderBg from "@/public/assets/header_icon.svg";
import { useRouter } from "next/navigation";
import { useCommonPageBannerContext } from "../provider/CommonPageBannerProvider";

export const CommonPageHeader = ({
  className = "",
  closeIconColor = "text-white",
}: {
  className?: string;
  closeIconColor?: string;
}) => {
  const router = useRouter();
  const { noBanner } = useCommonPageBannerContext();

  const handleGoBack = () => {
    router.back();
  };
  return (
    <header
      className={
        `flex w-full pt-4 flex-row items-center justify-center backdrop-blur-sm bg-bgorange` +
        " " +
        className +
        " " +
        (noBanner ? "hidden" : "")
      }
    >
      <Image src={HeaderBg} width={126} height={80} alt="Header" />
    </header>
  );
};
