import { useState } from "react";
import {
  PRODUCT_ID,
  TEST_LICENSE_KEY,
  verifyLicenseKey,
} from "../utils/gumroad";
import { useLicenseContext } from "../contexts/LicenseContext";

interface AuthFormProps {
  onSuccess: (licenseKey: string) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onSuccess }) => {
  const { setVerified } = useLicenseContext();
  const [licenseKey, setLicenseKey] = useState(
    process.env.NODE_ENV === "production" ? "" : TEST_LICENSE_KEY,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const response = await verifyLicenseKey(PRODUCT_ID, licenseKey);

    if (response.success) {
      onSuccess(licenseKey);
      localStorage.setItem("licenseKey", licenseKey);
    } else {
      setError(response.message || "License key verification failed");
    }

    setVerified(true);
    setLoading(false);
  };

  return (
    <div className="flex-column justify-center align-middle mx-auto">
      <form onSubmit={handleSubmit} className="flex justify-center py-8">
        <div>
          <label htmlFor="licenseKey">License Key:</label>
          <input
            className="py-8 px-24 border-2 border-gray-300 rounded-lg"
            id="licenseKey"
            type="text"
            value={licenseKey}
            onChange={(e) => setLicenseKey(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-300 px-12 py-4"
        >
          {loading ? "Verifying..." : "Verify License Key"}
        </button>
      </form>
      <div className="flex justify-between mx-auto">
        <p className="m-0 font-bold">If you haven't bought the course yet: </p>
        <a
          href="https://digitalskepticai.gumroad.com/l/izpwj"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline text-lg m-0"
        >
          Buy the course on Gumroad
        </a>
      </div>
    </div>
  );
};

export default AuthForm;
