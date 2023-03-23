// contexts/LicenseContext.tsx

import { createContext, useContext, useState } from "react";

interface LicenseContextType {
  isVerified: boolean;
  setVerified: (verified: boolean) => void;
}

const LicenseContext = createContext<LicenseContextType>({
  isVerified: false,
  setVerified: () => {},
});

export const useLicenseContext = () => useContext(LicenseContext);

export const LicenseProvider: React.FC = ({ children }) => {
  const [isVerified, setVerified] = useState(false);

  return (
    <LicenseContext.Provider value={{ isVerified, setVerified }}>
      {children}
    </LicenseContext.Provider>
  );
};
