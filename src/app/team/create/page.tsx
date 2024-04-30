"use client";
import Wallet from "@/components/Wallet";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateTeamPage from "./components/CreateTeamPage";

export default function Home() {
  return (
    <Wallet>
      <main className="flex flex-col grow w-full items-center justify-center">
        <CreateTeamPage />
      </main>
      <ToastContainer />
    </Wallet>
  );
}
