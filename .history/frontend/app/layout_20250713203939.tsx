import "./globals.css";
import { Lexend } from "next/font/google";
import { UserProvider } from "@/context/UserContext";
import NavBar from "../components/NavBar";

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
      <body className="font-jura bg-surface-subtle dark:bg-surface-default">
        <NavBar />
        {children}
      </body>
    </html>
  );
} 