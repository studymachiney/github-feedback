import "../styles/globals.css";
import "../styles/style.css";

export const metadata = {
  title: "Next App",
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
