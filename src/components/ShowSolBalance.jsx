import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import React, { useState, useEffect } from "react";
import SolanaBalanceDisplay from "./SolanaBalanceDisplay";

const ShowSolBalance = () => {
  const [solanaBalance, setSolanaBalance] = useState(0);
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  async function getBalance() {
    const balance = await connection.getBalance(publicKey);
    setSolanaBalance(balance / LAMPORTS_PER_SOL);
  }

  useEffect(() => {
    if (!publicKey) {
      return;
    }
    getBalance();
  }, [connection, publicKey]);

  return <SolanaBalanceDisplay solanaBalance={solanaBalance} />;
};

export default ShowSolBalance;
