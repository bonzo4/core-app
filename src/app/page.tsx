"use client";
import Wallet from "@/components/Wallet";
import LoginPage from "./components/LoginPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <Wallet>
      <main className="flex flex-col grow w-full items-center justify-center">
        <LoginPage />
      </main>
      <ToastContainer />
    </Wallet>
  );
}
