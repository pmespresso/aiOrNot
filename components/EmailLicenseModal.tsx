import { useState } from "react";
import { verifyEmailAndLicenseKey } from "../pages/api/auth";
import { useLicenseContext } from "../contexts/LicenseContext";

const EmailLicenseModal = ({ onClose }) => {
  const { setVerified } = useLicenseContext();
  const [email, setEmail] = useState("");
  const [licenseKey, setLicenseKey] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const isValid = await verifyEmailAndLicenseKey(email, licenseKey);
      if (isValid) {
        setVerified(true);
        onClose();
      } else {
        setError("Invalid email or license key");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later");
    }
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      {/* Modal content */}
      <div className="bg-white rounded p-8">
        <h2 className="text-xl font-bold mb-4">Submit Email and License Key</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="licenseKey" className="block mb-2">
              License Key:
            </label>
            <input
              type="text"
              id="licenseKey"
              value={licenseKey}
              onChange={(e) => setLicenseKey(e.target.value)}
              className="border border-gray-300 p-2 w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailLicenseModal;
