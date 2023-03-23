import React from "react";
import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <nav className="container mx-auto px-4 py-6">
          <ul className="flex space-x-4">
            <li>
              <Link href="/game" className="text-blue-500 hover:text-blue-600">
                Game
              </Link>
            </li>
            <li>
              <Link
                href="/leaderboard"
                className="text-blue-500 hover:text-blue-600"
              >
                Leaderboard
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
};

export default Layout;
