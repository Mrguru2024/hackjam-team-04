import "./globals.css";
import { Lexend } from "next/font/google";
import { UserProvider } from "@/context/UserContext";

const lexend = Lexend({ subsets: ["latin"], weight: ["400", "700", "900"] });

export const metadata = {
  title: "LevelUp",
  description: "Gamified career progress tracker for Per Scholas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={lexend.className}>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
} 