import bg from "@/public/assets/hooray/bg.png";
import { Button } from "@/components/ui/button";
import centerImage from "@/public/assets/hooray/ball-brown.png";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
} from "@/components/ui/dialog";
import Image from "next/image";

export const MintDoneDialog: React.FC<{
  open: boolean;
  setOpen: (open: boolean) => void;
}> = ({ open, setOpen }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogOverlay className="backdrop-blur-sm">
        <DialogContent className="flex h-[40rem] w-[85%] flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-black bg-white bg-cover bg-center p-5">
          <h2 className="mb-6 text-3xl font-semibold">Well done!!!</h2>

          <div className="relative h-[12rem] w-full">
            <Image
              src={centerImage.src}
              alt="Center Image"
              fill
              className="object-contain "
            />
          </div>

          <h2 className="mb-2 text-xl font-semibold">Slothball #648</h2>
          <div className="text-center">
            <p className="mb-2 indent-2 font-medium ">
              Your Slothball's transformation into a Sloth is on the horizon.
              The evolution is coming – be prepared!
            </p>
          </div>

          <DialogClose asChild>
            <Button
              className="w-[100%] text-lg"
              type="button"
              variant="secondary"
            >
              CONTINUE
            </Button>
          </DialogClose>

          {/* 分享按钮 */}
          <a
            href="#"
            className=" flex items-center px-3 py-3  text-xl font-black text-[#6C5BA4]"
          >
            {/*<img src={shareImage.src} className="w-5 fill-blue-500 mr-2"  alt=""/>*/}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="mr-2 h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
              />
            </svg>
            SHARE
          </a>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};
