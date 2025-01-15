import './globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Memecoin Prediction Game',
  description: 'Predict the price movement of top memecoins',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-yellow-300">
          <AuthProvider>{children}</AuthProvider>
        </div>
      </body>
    </html>
  );
}

