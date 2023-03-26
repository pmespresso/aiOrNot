import { useLicenseContext } from "../contexts/LicenseContext";

// components/Footer.tsx
const Footer = () => {
  const { isVerified } = useLicenseContext();

  return (
    <footer className="bg-blue-500 p-6 text-white text-center">
      <div className="container mx-auto">
        {isVerified ? (
          <div>
            {/* <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mr-4"
            >
              GitHub
            </a> */}
            <a
              href="https://twitter.com/0xdeepskepticai"
              target="_blank"
              rel="noopener noreferrer"
              className="mr-4"
            >
              Twitter
            </a>
          </div>
        ) : (
          <a
            href="https://app.gumroad.com/products/izpwj"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 text-white bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:from-green-400 hover:via-blue-500 hover:to-purple-400 animate-gradient-x duration-3000 ease-in-out rounded-md"
          >
            Buy The Full Foundations Course to Access the Game for Free 🚀
          </a>
        )}
      </div>
    </footer>
  );
};

export default Footer;
