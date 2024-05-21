"use client";
import Wallet from "@/components/Wallet";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Josefin_Sans } from "next/font/google";
import BountyPage from "./components/BountyPage";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export default function Home() {
  return (
    <Wallet>
      <main className="flex flex-col grow w-full items-center justify-center">
        <BountyPage />
      </main>
      <ToastContainer
        toastClassName={josefinSans.className}
        position="bottom-right"
      />
    </Wallet>
  );
}
