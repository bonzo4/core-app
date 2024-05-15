"use client";
import Wallet from "@/components/Wallet";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InvoicePage from "./components/TeamInvoicePage";
import { Josefin_Sans } from "next/font/google";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export default function Invoice({
  params: { id },
}: {
  params: { id: number };
}) {
  return (
    <Wallet>
      <main className="flex flex-col grow w-full items-center justify-center">
        <InvoicePage invoiceId={id} />
      </main>
      <ToastContainer
        toastClassName={josefinSans.className}
        position="bottom-right"
      />
    </Wallet>
  );
}
