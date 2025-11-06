import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import nacl from "tweetnacl";
import bs58 from "bs58";

const SignMessage = () => {
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState({ show: false, text: "", success: false });
  const { publicKey, signMessage } = useWallet();

  const showToast = (text, success = false) => {
    setToast({ show: true, text, success });
    setTimeout(() => setToast({ show: false, text: "", success: false }), 3500);
  };

  async function generateSign() {
    if (!publicKey || !signMessage) {
      showToast("No wallet connection or invalid signature", false);
      return;
    }
    if (!message) {
      showToast("Enter a message first", false);
      return;
    }

    try {
      const encodedMessage = new TextEncoder().encode(message);
      const signature = await signMessage(encodedMessage);
      const isValid = nacl.sign.detached.verify(
        encodedMessage,
        signature,
        publicKey.toBytes()
      );

      if (isValid) {
        showToast("✅ Signature verified successfully!", true);
      } else {
        showToast("❌ Invalid signature", false);
      }

      console.log(`Signature: ${bs58.encode(signature)}`);
    } catch (error) {
      showToast("Signing failed", false);
    }
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-white dark:bg-black transition-colors duration-300 ease-in-out">
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
      <div className="w-full max-w-2xl rounded-2xl border border-black/10 dark:border-white/20 p-8 bg-white dark:bg-black shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-black dark:text-white">
          Sign Message
        </h2>

        <input
          type="text"
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-xl
                     bg-black/5 dark:bg-white/10
                     text-black dark:text-white
                     placeholder-gray-600 dark:placeholder-gray-400
                     border border-black/10 dark:border-white/20
                     focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white
                     transition"
        />

        <button
          onClick={generateSign}
          className="w-full py-3 rounded-xl font-medium
                     bg-black text-white dark:bg-white dark:text-black
                     border border-black/10 dark:border-white/20
                     hover:opacity-80 active:scale-[0.98]
                     transition"
        >
          Sign Message
        </button>
      </div>
    </div>
  );
};

export default SignMessage;
