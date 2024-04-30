"use client";
import { Button } from "@/src/components/ui/button";
import { ComposeList } from "./ComposeList";
import { SlothItem } from "./page";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ComposedImg from "@/public/assets/compose/composed.png";

export const ComposeSloth = ({ slothItems }: { slothItems: SlothItem[] }) => {
  const [composed, setcomposed] = useState(false);
  const router = useRouter();
  return (
    <>
       <div
        style={{ opacity: composed ? 1 : 0 }}
        className="border-black border rounded-xl overflow-hidden absolute top-0 bottom-0 left-0 right-0 m-auto h-[calc(100vw-2rem)] w-[calc(100vw-2.5rem)] opacity-0 transition-opacity duration-500"
      >
        <Image src={ComposedImg} fill objectFit="cover" alt="sloth" />
      </div>
      <div style={{ display: composed ? "none" : "block" }}>
        <ComposeList slothItems={slothItems} />
      </div>
     
      <Button
        style={{ opacity: composed ? 0 : 1 }}
        className="fixed bottom-0 left-0 right-0 mx-auto mb-8 h-14 w-[calc(100%-4rem)] text-lg transition-opacity duration-500"
        variant="secondary"
        onClick={() => setcomposed(true)}
      >
        COMPOSE cNFT
      </Button>

      <Button
        disabled={!composed}
        style={{ opacity: composed ? 1 : 0 }}
        className="fixed bottom-0 left-0 right-0 mx-auto mb-8 h-14 w-[calc(100%-4rem)] text-lg transition-opacity duration-500"
        variant="secondary"
        onClick={() => router.push("/battle-game/reveal-and-compose")}
      >
        CONTINUE
      </Button>
    </>
  );
};
