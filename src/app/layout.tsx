import React from "react";
import { Providers } from "@/store/providers";
import MyApp from "./app";

export const metadata = {
  title: "eLab suite ",
  description: "Modernize Main kit",
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
      </body>
    </html>
  );
}
