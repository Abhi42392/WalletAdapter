import React, { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

import "@solana/wallet-adapter-react-ui/styles.css";
import Airdrop from "./components/Airdrop.jsx";
import "../src/App.css";
import SideBar from "./components/SideBar.jsx";
import SignMessage from "./components/SignMessage.jsx";
import Home from "./components/Home.jsx";
import { Route, Routes } from "react-router-dom";
import ToggleTheme from "./components/ToggleTheme.jsx";

function App() {
  const network = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div className="flex dark:bg-black dark:text-white min-h-screen transition-colors duration-300 ease-in-out">
            <SideBar />
            <ToggleTheme />
            <div className="py-8 px-4 flex-1 transition-colors duration-300 ease-in-out">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/request-airdrop" element={<Airdrop />} />
                <Route path="/sign-message" element={<SignMessage />} />
              </Routes>
            </div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
