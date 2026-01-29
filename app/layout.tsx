import type { Metadata, Viewport } from "next";
import "./globals.css";
import AppProviders from "./components/_app";

export const metadata: Metadata = {
  title: "Offline Video App",
  description: "YouTube-like video player that works offline",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Offline Video",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
