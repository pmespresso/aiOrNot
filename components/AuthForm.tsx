// components/AuthForm.tsx
import { useState } from "react";
import { verifyLicenseKey } from "../gumroad";
import { useLicenseContext } from "../contexts/LicenseContext";

const PRODUCT_ID = "your_product_id";

// Add the new prop type
interface AuthFormProps {
  onSuccess: () => void;
}

// Modify the AuthForm component to accept the new prop
const AuthForm: React.FC<AuthFormProps> = ({ onSuccess }) => {
  const { isVerified, setVerified } = useLicenseContext();
  const [licenseKey, setLicenseKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (process.env.NODE_ENV === "production") {
      const response = await verifyLicenseKey(PRODUCT_ID, licenseKey);

      if (response.success) {
        onSuccess();
      } else {
        setError(response.message || "License key verification failed");
      }
    } else {
      onSuccess();
    }

    setVerified(true);

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="licenseKey">License Key:</label>
        <input
          id="licenseKey"
          type="text"
          value={licenseKey}
          onChange={(e) => setLicenseKey(e.target.value)}
          required
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? "Verifying..." : "Verify License Key"}
      </button>
    </form>
  );
};

export default AuthForm;
