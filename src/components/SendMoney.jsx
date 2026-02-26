import { useState, useEffect, useRef } from "react";
import { FaPhoneAlt, FaUserFriends, FaQrcode } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getTransactions, saveTransaction } from "./Transaction";
import BalanceCard from "./BalanceCard";
import LoadingButton from "./LoadingButton";
import MobileNav from "./MobileNav";
import GoBackButton from "./GoBackButton";
import { Html5QrcodeScanner } from "html5-qrcode";

const SendMoney = () => {
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [recipient, setRecipient] = useState("");
  const [recentRecipients, setRecentRecipients] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const tx = getTransactions();
    const recents = [
      ...new Set(
        tx.map((t) => t.receiver).filter((name) => name && name !== "Self")
      ),
    ];
    setRecentRecipients(recents.slice(0, 5));
  }, []);

  const suggestedAmounts = [1000, 2000, 5000, 10000];

  const addNotification = (title, message, type = "System") => {
    const existing =
      JSON.parse(localStorage.getItem("epay_notifications")) || [];

    const newNotification = {
      title,
      message,
      type,
      time: new Date().toLocaleString(),
      read: false,
    };

    localStorage.setItem(
      "epay_notifications",
      JSON.stringify([newNotification, ...existing])
    );
  };

  const handleSend = () => {
    if (!recipient || !amount) {
      setError("Enter recipient and amount");
      return;
    }

    setError("");

    const newTx = {
      id: Date.now(),
      type: "debit",
      amount: Number(amount),
      sender: "You",
      receiver: recipient,
      date: new Date().toLocaleString(),
      status: "completed",
      description,
    };

    saveTransaction(newTx);

    addNotification(
      "Transfer successful",
      `You sent ₦${amount} to ${recipient}`,
      "Transactions"
    );

    setIsProcessing(true);
  };

  // ✅ FIXED QR SCAN HANDLER
  const handleScan = (data) => {
    if (!data) return;

    try {
      const parsedData = JSON.parse(data);

      setRecipient(
        parsedData.userName ||
          parsedData.walletId ||
          parsedData.name ||
          ""
      );
    } catch {
      // If QR is plain text
      setRecipient(data);
    }

    setIsScanning(false);
  };
const scannerRef = useRef(null);

useEffect(() => {
  if (isScanning) {
    scannerRef.current = new Html5QrcodeScanner("qr-reader", {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      aspectRatio: 1.0,
    });

    scannerRef.current.render(
      (decodedText) => {
        handleScan(decodedText);
        scannerRef.current.clear();
      },
      () => {}
    );
  }

  return () => {
    if (scannerRef.current) {
      scannerRef.current.clear().catch(() => {});
    }
  };
}, [isScanning]);
  return (
    <div className="min-h-screen bg-gray-100 p-4 pb-24">
      <GoBackButton />
      <BalanceCard />

      {/* ✅ FULLSCREEN QR SCANNER */}
     {isScanning && (
  <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center p-4">
    <h2 className="text-white mb-2 text-lg font-semibold">Scan QR Code</h2>

    <div
      id="qr-reader"
      className="w-full max-w-sm bg-black rounded-xl overflow-hidden"
    />

    <button
      onClick={() => setIsScanning(false)}
      className="mt-6 bg-red-500 px-6 py-3 rounded-xl text-white font-semibold"
    >
      Cancel
    </button>
  </div>
)}

      {!isScanning && (
        <>
          {/* RECIPIENT */}
          <div className="mb-4 mt-4">
            <p className="text-sm font-semibold mb-2">Recipient</p>
            <input
              type="text"
              placeholder="Enter name or account"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full p-3 rounded-xl border outline-none"
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

          {/* RECENT RECIPIENTS */}
          {recentRecipients.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-semibold mb-2">Recent</p>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {recentRecipients.map((name, index) => (
                  <button
                    key={index}
                    onClick={() => setRecipient(name)}
                    className="px-4 py-2 bg-white rounded-xl shadow text-sm whitespace-nowrap"
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ACTION BUTTONS */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <button
              onClick={() => navigate("/phone")}
              className="flex flex-col items-center gap-2 bg-white p-4 rounded-xl shadow"
            >
              <FaPhoneAlt className="text-blue-500" />
              <span className="text-sm">Phone</span>
            </button>

            <button className="flex flex-col items-center gap-2 bg-white p-4 rounded-xl shadow">
              <FaUserFriends className="text-green-500" />
              <span className="text-sm">Contacts</span>
            </button>

            <button
              onClick={() => setIsScanning(true)}
              className="flex flex-col items-center gap-2 bg-white p-4 rounded-xl shadow"
            >
              <FaQrcode className="text-purple-500" />
              <span className="text-sm">QR Code</span>
            </button>
          </div>

          {/* AMOUNT INPUT */}
          <div className="mb-4">
            <p className="text-sm font-semibold mb-2">Amount</p>
            <input
              type="number"
              placeholder="₦ 0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 rounded-xl border outline-none"
            />
          </div>

          {/* SUGGESTED AMOUNTS */}
          <div className="flex gap-3 mb-6 flex-wrap">
            {suggestedAmounts.map((amt) => (
              <button
                key={amt}
                onClick={() => {
                  setAmount(amt);
                  setSelectedAmount(amt);
                }}
                className={`px-4 py-2 rounded-full text-sm border ${
                  selectedAmount === amt
                    ? "bg-red-500 text-white"
                    : "border-red-400 text-red-500"
                }`}
              >
                ₦{amt}
              </button>
            ))}
          </div>

          {/* DESCRIPTION */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Description (Optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded-xl border outline-none"
            />
          </div>

          {/* BUTTON / LOADER */}
          {isProcessing ? (
            <LoadingButton text="Processing..." to="/otp" delay={2500} />
          ) : (
            <button
              onClick={handleSend}
              className="w-full bg-[#fe3737] text-white py-4 rounded-xl font-semibold active:scale-95 transition-transform"
            >
              Continue
            </button>
          )}
        </>
      )}

      <MobileNav />
    </div>
  );
};

export default SendMoney;