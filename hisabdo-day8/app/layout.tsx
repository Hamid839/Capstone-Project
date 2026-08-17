import "./globals.css";

export const metadata = {
  title: "HisabDo Web",
  description: "Modern web recreation of the HisabDo khata/ledger app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
