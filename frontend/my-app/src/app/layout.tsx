// src/app/layout.tsx
import "./globals.css";
import Layout from "./components/Layout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
