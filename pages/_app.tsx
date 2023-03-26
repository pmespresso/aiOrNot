// pages/_app.tsx

import "../styles/globals.css";
import type { AppProps } from "next/app";

import { LicenseProvider } from "../contexts/LicenseContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LicenseProvider>
      <Component {...pageProps} />
    </LicenseProvider>
  );
}

export default MyApp;
