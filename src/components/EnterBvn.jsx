import React from "react";
import {useNavigate} from "react-router-dom";


const EnterBVN = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b1c2d] px-6">
      <div className="max-w-md w-full text-white">

        <h2 className="text-2xl font-bold mb-2">Enter BVN</h2>
        <p className="text-gray-300 mb-4">
          Your BVN is securely sent to MDBS for verification.
        </p>

        <input
          type="text"
          placeholder="Enter BVN"
          className="w-full px-4 py-3 rounded-lg bg-[#10263f] mb-3"
        />

        <p className="text-sm text-gray-400 mb-6">
          Forgot BVN? Dial *565*0#
        </p>

        <button 
         onClick={() => navigate("/select-bank")}
         className="w-full bg-orange-500 py-3 rounded-lg">
          Continue
        </button>
      </div>
    
    <div className="hidden lg:flex items-center justify-center bg-white px-10 py-12">
            <div className="max-w-md">
    
              <h2 className="text-3xl font-bold mb-4">
                Ready to take control of your finances?
              </h2>
              <p className="text-gray-600 mb-6">
                Join over 500,000 users who have transformed
                their financial lives with E-Pay. Download the app today and experience banking reimagined.
              </p>
    
              {/* Download Buttons */}
              <div className="flex gap-4 mb-6">
                <div
                  onClick={() => window.open("https://play.google.com/store/apps", "_blank")}
                  className="bg-black px-5 py-3 rounded-lg flex items-center gap-3 cursor-pointer hover:opacity-80 transition"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Google Play"
                    className="h-10"
                  />
                </div>
    
                <div
                  onClick={() => window.open("https://www.apple.com/app-store/", "_blank")}
                  className="bg-black px-5 py-3 rounded-lg flex items-center gap-3 cursor-pointer hover:opacity-80 transition"
                >
                  <img
                    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                    alt="App Store"
                    className="h-10"
                  />
                </div>
              </div>
    
              {/* Phone Image */}
              <img
                src={phone}
                alt="App preview"
                className="w-full"
              />
            </div>
          </div>
    </div>
  );
};

export default EnterBVN;
