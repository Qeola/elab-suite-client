import React from "react";
import { Providers } from "@/store/providers";
import MyApp from "./app";
import "../app/global.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "eLab suite ",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <MyApp>{children}</MyApp>
        </Providers>
        <ToastContainer
          position="top-center"
          autoClose={8000}
          hideProgressBar={true}
        />
      </body>
    </html>
  );
}
