import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import React, { useState } from "react";

const SendSol = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const { publicKey } = wallet;
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" }); // ✅ success/error state

  async function sendSolana() {
    if (!publicKey || !connection) {
      setMessage({ text: "Wallet not connected.", type: "error" });
      return;
    }
    try {
      const lamports = Math.round(Number(amount) * LAMPORTS_PER_SOL);
      if (!toAddress || !lamports || lamports < 0)
        throw new Error("Invalid input.");

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(toAddress.trim()),
          lamports,
        })
      );

      const signature = await wallet.sendTransaction(transaction, connection);
      setMessage({
        text: `✅ Transaction successful! Signature: ${signature}`,
        type: "success",
      });

      // Reset fields after success
      setToAddress("");
      setAmount("");
    } catch (e) {
      setMessage({
        text: `❌ ${e.message || "Transaction failed."}`,
        type: "error",
      });
    }

    // Clear the message after 5 seconds
    setTimeout(() => setMessage({ text: "", type: "" }), 5000);
  }

  return (
    <div className="w-full bg-white dark:bg-neutral-950 text-gray-900 dark:text-gray-100 p-6 transition-colors duration-300 ease-in-out">
      <div className="rounded-2xl p-[3px] max-w-3xl mx-auto">
        <div className="rounded-2xl bg-white/80 dark:bg-neutral-900/70 backdrop-blur-md shadow-xl ring-1 ring-black/5 dark:ring-white/10">
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6">
              SEND SOL
            </h2>

            <div className="space-y-8">
              <input
                className="w-full rounded-xl px-4 py-3 bg-white/70 dark:bg-neutral-800/70
                  placeholder-gray-400 dark:placeholder-gray-500
                  text-gray-900 dark:text-gray-100 ring-1 ring-black/10 dark:ring-white/10
                  focus:outline-none focus:ring-2 focus:ring-black/50 dark:focus:ring-white/50 transition"
                type="text"
                placeholder="Enter wallet address"
                value={toAddress}
                onChange={(e) => setToAddress(e.target.value)}
              />

              <div className="flex items-center gap-3">
                <input
                  className="flex-1 rounded-xl px-4 py-3 bg-white/70 dark:bg-neutral-800/70
                    placeholder-gray-400 dark:placeholder-gray-500
                    text-gray-900 dark:text-gray-100 ring-1 ring-black/10 dark:ring-white/10
                    focus:outline-none focus:ring-2 focus:ring-black/50 dark:focus:ring-white/50 transition"
                  type="number"
                  inputMode="decimal"
                  placeholder="Enter SOL amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <span className="px-3 py-2 rounded-lg text-sm bg-black text-white dark:bg-white dark:text-black select-none">
                  SOL
                </span>
              </div>

              <button
                onClick={sendSolana}
                className="w-full rounded-xl px-5 py-3.5 font-medium shadow-lg hover:shadow-xl active:scale-[0.99]
                  bg-black text-white dark:bg-white dark:text-black transition"
              >
                Send
              </button>

              {message.text && (
                <div
                  className={`mt-4 text-center text-sm font-medium ${
                    message.type === "success"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {message.text}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendSol;
