import React from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { WalletDisconnectButton } from "@solana/wallet-adapter-react-ui";
import ShowSolBalance from "./ShowSolBalance";
import SendSol from "./SendSol";

const Home = () => {
  return (
    <div className="min-h-screen w-full py-8 px-4">
      <div className="w-full space-y-8">
        <div className="flex justify-between  gap-4 flex-wrap">
          <WalletMultiButton className="bg-purple-600 hover:bg-purple-700 transition-colors" />
          <WalletDisconnectButton className="bg-red-500 hover:bg-red-600 transition-colors" />
        </div>
        <div>
          <ShowSolBalance />
        </div>
        <div>
          <SendSol />
        </div>
      </div>
    </div>
  );
};

export default Home;
