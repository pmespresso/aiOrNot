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
    } else {
      setError(response.message || "License key verification failed");
    }

    setVerified(true);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center">
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
  );
};

export default AuthForm;
