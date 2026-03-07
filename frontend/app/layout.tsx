"import clsx from "clsx";
import "./globals.css";
import Providers from "../components/Providers";

export const metadata = {
  title: "AI Stylist",
  description: "Discover outfits generated from your taste profile",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx("min-h-screen bg-slate-950 text-white")}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
