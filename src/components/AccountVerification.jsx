import { useState } from "react";

const accounts = [
  { id: 1, bank: "GTBank", number: "0123456789", type: "Savings" },
  { id: 2, bank: "GTBank", number: "0987654321", type: "Current" },
];

const AccountVerificationFlow = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b1c2d] px-6 transition-all duration-500">
      <div className="w-full max-w-md text-white">

        {/* STEP 1 – ENTER OTP */}
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold mb-2">Enter OTP</h2>
            <p className="text-gray-300 mb-6">
              Enter the OTP sent to your phone number.
            </p>

            <input
              type="text"
              maxLength="6"
              placeholder="••••••"
              className="w-full text-center text-2xl tracking-widest px-4 py-3 rounded-lg bg-[#10263f] mb-6"
            />

            <button
              onClick={() => setStep(2)}
              className="w-full bg-orange-500 py-3 rounded-lg"
            >
              Continue
            </button>
          </>
        )}

        {/* STEP 2 – SELECT ACCOUNT */}
        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold mb-2">Select account to link</h2>
            <p className="text-gray-300 mb-6">
              Select the bank account to link for seamless access.
            </p>

            <div className="space-y-3 mb-6">
              {accounts.map(acc => (
                <div
                  key={acc.id}
                  className="bg-[#10263f] p-4 rounded-lg cursor-pointer hover:border hover:border-orange-500 transition"
                >
                  <div className="flex justify-between">
                    <span>{acc.bank}</span>
                    <input type="radio" name="account" />
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    {acc.number} • {acc.type}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setStep(3)}
              className="w-full bg-orange-500 py-3 rounded-lg"
            >
              Continue
            </button>
          </>
        )}

        {/* STEP 3 – VERIFY OWNERSHIP */}
        {step === 3 && (
          <>
            <h2 className="text-2xl font-bold mb-2">Verify ownership</h2>
            <p className="text-gray-300 mb-4">
              To verify ownership of the account you added, please send
              <strong> ₦15</strong> from your selected bank to the account below.
            </p>

            <div className="bg-[#10263f] p-4 rounded-lg mb-6">
              <p className="font-medium">APK Verification</p>
              <p className="text-sm text-gray-400">Account Number: 1234567890</p>
            </div>

            <button
              onClick={() => setStep(4)}
              className="w-full bg-orange-500 py-3 rounded-lg"
            >
              I’ve sent ₦15
            </button>
          </>
        )}

        {/* STEP 4 – SUCCESS */}
        {step === 4 && (
          <div className="bg-white text-center text-gray-800 rounded-xl p-8 transition-all duration-500">
            <div className="w-14 h-14 mx-auto bg-green-100 text-green-600 flex items-center justify-center rounded-full mb-4 text-2xl">
              ✓
            </div>

            <h2 className="text-xl font-bold mb-2">
              Account successfully created
            </h2>

            <p className="text-gray-600 mb-6">
              You’ve successfully created an APK account.
              Kindly proceed to the dashboard to send and receive money.
            </p>

            <button className="w-full bg-orange-500 text-white py-3 rounded-lg">
              Proceed to Dashboard
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default AccountVerificationFlow;
