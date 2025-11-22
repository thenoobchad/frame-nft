import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
	title: "build",
	description: "build nft",
	openGraph: {
		images: [],
	},
	other: {
		"fc:frame": "vNext",
		"fc:frame:image": "https://buildnft.vercel.app/og-image.png",
		"fc:frame:image:aspect_ratio": "1.91:1",
		"fc:frame:button:1": "Mint Build NFT",
		"fc:frame:button:1:action": "tx",
		"fc:frame:button:1:target": "https://buildnft.vercel.app/api/mint-tx",
		"fc:frame:post_url": "https://buildnft.vercel.app/api/success",
	},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
