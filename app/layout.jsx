import "./globals.css";
import { Inter } from "next/font/google";
import Nav from "./Nav";
import { TProvider } from "@/providers/toast-provider";
import getCurrentUser from "./actions/getCurrentUser";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({ children }) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="https://w7.pngwing.com/pngs/672/907/png-transparent-favicon-buggi-trademark-logo-circle.png" />
      </head>
      <body className={inter.className}>
        <TProvider />
        <Nav currentUser={currentUser} />
        {children}
      </body>
    </html>
  );
}
