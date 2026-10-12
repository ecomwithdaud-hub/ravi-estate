import type { Metadata } from "next";
import "./globals.css";
import { LeadProvider } from "@/context/LeadContext";

export const metadata: Metadata = {
  title:
    "Ravi Estate (raviestate.com) | Deals in all kinds of properties. | Madina & Pakistan Real Estate Advisory",
  description:
    "Premier real estate advisory & marketing firm handling Value Apartments - Madina Al Munawwarah (Wadi Mubarak) and landmark Pakistani developments in Lahore with Value Group.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-navy-950 text-slate-100 antialiased selection:bg-gold-400 selection:text-navy-950">
        <LeadProvider>{children}</LeadProvider>
      </body>
    </html>
  );
}
