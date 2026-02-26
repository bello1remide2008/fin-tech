import React from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import phone from "./phone.png";

const numbers = ["+234 803 *** 2211", "+234 812 *** 7744"];

const SelectNumber = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

      {/* LEFT – SELECT PHONE NUMBER */}
      <div className="flex flex-col items-center justify-center bg-[#0b1c2d] px-6 py-12">
        <div className="w-full max-w-md text-white">

          <h2 className="text-2xl font-bold mb-2">Choose phone number</h2>
          <p className="text-gray-300 mb-6">
            Select the number linked to your BVN to receive OTP.
          </p>

          <div className="space-y-3">
            {numbers.map((num, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-[#10263f] px-4 py-3 rounded-lg cursor-pointer hover:border hover:border-orange-500"
              >
                <span>{num}</span>
                <input type="radio" name="number" />
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate("/account-verification")}
            className="w-full bg-orange-500 py-3 rounded-full mt-6 font-semibold transition"
          >
            Send OTP
          </button>

          {/* Socials */}
          <div className="flex gap-4 mt-6">
            <a className="text-white text-[1.3rem] mr-[15px] transition-all duration-300 ease-in-out" href="#"><FaFacebookF /></a>
            <a className="text-white text-[1.3rem] mr-[15px] transition-all duration-300 ease-in-out" href="#"><FaTwitter /></a>
            <a className="text-white text-[1.3rem] mr-[15px] transition-all duration-300 ease-in-out" href="#"><FaInstagram /></a>
            <a className="text-white text-[1.3rem] mr-[15px] transition-all duration-300 ease-in-out" href="#"><FaLinkedin /></a>
          </div>

          {/* Footer */}
          <div className="text-center border-t border-white/20 mt-10 pt-4 text-[0.9rem] text-[#cfd9e6]">
            <p>© {new Date().getFullYear()} E-Pay — All rights reserved.</p>
          </div>

        </div>
      </div>

      {/* RIGHT – MARKETING (WEB ONLY) */}
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

export default SelectNumber;
