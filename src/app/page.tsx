import { Button } from "../components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center overflow-hidden bg-orange-300 space-y-10">
      <Button>
        <Link href="/mint-nft">NFT Mint APP</Link>
      </Button>
      <Button variant="secondary">
        <Link href="/battle-game">NFT Game APP</Link>
      </Button>
    </main>
  );
}
