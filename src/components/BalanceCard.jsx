import { FaEye, FaEyeSlash, FaShareAlt } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Added this

const BalanceCard = ({
  userName = "User",
  balance = 0,
  accountNumber = "",
}) => {
  const [showBalance, setShowBalance] = useState(true);
  const navigate = useNavigate(); // Added this

  // Define the missing toggle function
  const toggleBalance = () => setShowBalance(!showBalance);

  const maskAccount = (acc) =>
    acc ? `${"*".repeat(acc.length - 4)}${acc.slice(-4)}` : "";

  const handleCopy = () => {
    if (!accountNumber) return;
    navigator.clipboard.writeText(accountNumber);
    alert("Account number copied!");
  };

  const handleShare = () => {
    if (!accountNumber) return;
    if (navigator.share) {
      navigator.share({
        title: "My Epay Account",
        text: `Send money to ${accountNumber}`,
      });
    } else {
      alert("Sharing not supported");
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#0D1537] to-[#253C9D] text-white rounded-2xl p-6 mb-6">
      <div className="text-center mb-4">
        <p className="text-sm opacity-60">Welcome back</p>
        <h1 className="text-xl font-bold">{userName} 👋</h1>
      </div>

      <p className="text-sm opacity-80">Total Balance</p>
      <div className="flex justify-between items-center mt-2">
        <h2 className="text-3xl font-bold">
          {showBalance ? `₦${balance.toLocaleString()}` : "********"}
        </h2>
        <div className="flex flex-col items-end">
          <button onClick={toggleBalance} className="text-white text-xl mb-2">
            {showBalance ? <FaEye /> : <FaEyeSlash />}
          </button>
          <button onClick={() => navigate("/dashboard/transaction-history")} className="text-sm text-white underline">
            Transaction History
          </button>
        </div>
      </div>

      {/* Changed activeAccount to accountNumber */}
      {accountNumber && (
        <div className="flex justify-between items-center mt-4 bg-white/20 p-3 rounded-xl">
          <p className="text-sm tracking-widest">{maskAccount(accountNumber)}</p>
          <div className="flex gap-3">
            <button onClick={handleCopy} className="bg-white/30 px-3 py-1 rounded-full text-xs">
              Copy
            </button>
            <button onClick={handleShare} className="bg-white/30 p-2 rounded-full">
              <FaShareAlt size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BalanceCard;