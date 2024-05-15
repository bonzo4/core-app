"use client";
import Wallet from "@/components/Wallet";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateTeamPage from "./components/CreateTeamPage";
import { Josefin_Sans } from "next/font/google";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export default function Home() {
  return (
    <Wallet>
      <main className="flex flex-col grow w-full items-center justify-center">
        <CreateTeamPage />
      </main>
      <ToastContainer
        toastClassName={josefinSans.className}
        position="bottom-right"
      />{" "}
    </Wallet>
  );
}
