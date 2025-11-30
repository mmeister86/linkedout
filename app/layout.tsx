import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LinkedOut - Satirical LinkedIn Post Generator",
  description: "Generate satirical LinkedIn posts with AI. Just describe your topic or event, and we'll create a cringe-worthy post for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
