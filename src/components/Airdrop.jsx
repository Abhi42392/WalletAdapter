import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import React, { useState } from "react";

const Airdrop = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [amount, setAmount] = useState("");
  const [toast, setToast] = useState({ show: false, text: "", success: false });

  const showToast = (text, success = false) => {
    setToast({ show: true, text, success });
    setTimeout(() => setToast({ show: false, text: "", success: false }), 3500);
  };

  const requestAirDrop = async () => {
    if (!wallet.publicKey) {
      showToast("⚠️ Connect your wallet first", false);
      return;
    }

    const num = Number(amount);
    if (!num || num <= 0) {
      showToast("Enter a valid amount", false);
      return;
    }

    try {
      const signature = await connection.requestAirdrop(
        wallet.publicKey,
        num * LAMPORTS_PER_SOL
      );
      await connection.confirmTransaction(signature, "confirmed");
      showToast(`✅ Airdropped ${num} SOL successfully!`, true);
    } catch (err) {
      console.error(err);
      showToast("❌ Airdrop failed", false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-white dark:bg-black transition-colors duration-300">
      {/* Toast notification */}
      {toast.show && (
        <div
          className={`fixed top-6 right-6 px-5 py-3 rounded-xl shadow-lg border transition-all duration-500
            ${
              toast.success
                ? "bg-black text-white dark:bg-white dark:text-black border-black/10 dark:border-white/20"
                : "bg-white text-black dark:bg-black dark:text-white border-black/10 dark:border-white/20"
            }
            animate-fadeSlideIn`}
        >
          {toast.text}
        </div>
      )}

      {/* Card */}
      <div className="w-full max-w-2xl rounded-2xl border border-black/10 dark:border-white/20 p-8 bg-white dark:bg-black shadow-md space-y-8">
        <h2 className="text-2xl font-semibold mb-6 text-black dark:text-white">
          Request Airdrop
        </h2>

        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-xl
                     bg-black/5 dark:bg-white/10
                     text-black dark:text-white
                     placeholder-gray-600 dark:placeholder-gray-400
                     border border-black/10 dark:border-white/20
                     focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white
                     transition"
        />

        <button
          onClick={requestAirDrop}
          className="w-full py-3 rounded-xl font-medium
                     bg-black text-white dark:bg-white dark:text-black
                     border border-black/10 dark:border-white/20
                     hover:opacity-80 active:scale-[0.98]
                     transition"
        >
          Airdrop
        </button>
      </div>
    </div>
  );
};

export default Airdrop;
