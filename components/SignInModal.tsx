import React, { useState } from "react";
import AuthForm from "./AuthForm";
import { PRODUCT_ID, verifyLicenseKey } from "../utils/gumroad";
import { saveUserData } from "../utils/firebase";

interface SignInModalProps {
  onClose: () => void;
  onSignedIn: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({ onClose, onSignedIn }) => {
  const [showAuthForm, setShowAuthForm] = useState(false);

  const handleSuccess = async (licenseKey: string) => {
    const response = await verifyLicenseKey(PRODUCT_ID, licenseKey);

    if (response.success) {
      await saveUserData(licenseKey, response.purchase);
      onSignedIn();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  py-12 bg-black bg-opacity-50">
      <div className="relative bg-white p-8 rounded-lg w-98">
        <button className="absolute top-0 right-0 p-2" onClick={onClose}>
          &times;
        </button>
        {showAuthForm ? (
          <AuthForm onSuccess={handleSuccess} />
        ) : (
          <div className="flex-column justify-center align-middle">
            <div className="flex-column justify-center align-middle">
              <h2 className="text-2xl mb-4">Sign in to save your score</h2>
              <p className="mb-4">
                Sign in to save your score and compete on the leaderboard.
              </p>
              <div className="flex justify-center align-middle">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
                  onClick={() => setShowAuthForm(true)}
                >
                  Sign in
                </button>
                <button
                  className="bg-gray-500 text-white py-2 px-4 rounded mb-4 ml-4"
                  onClick={() => {
                    onSignedIn();
                    onClose();
                  }}
                >
                  Play without signing in
                </button>
              </div>
            </div>
            <div className="flex-column justify-center align-middle mx-auto">
              <p>If you haven't bought the course yet:</p>
              <a
                href="https://digitalskepticai.gumroad.com/l/izpwj"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-lg justify-center align-middle mx-auto"
              >
                Buy the course on Gumroad
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignInModal;
