import { GeistSans } from "geist/font/sans";
import { SessionProvider } from "next-auth/react";
export const metadata = {
  title: "chat-trial",
  description: "chat-trial",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
