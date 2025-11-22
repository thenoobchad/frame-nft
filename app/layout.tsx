import type { Metadata } from "next";

import "./globals.css";
import { Navbar } from "@/components/navbar";

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
			<body className={`antialiased`} style={{position:'relative', minHeight:'100vh'}}>
				<div
					style={{
						
						backgroundImage: `url('/dark-background.gif')`,
						backgroundSize: "cover",
						backgroundPosition:'center',
						width:'100%',
						height: "100%",
						position: "fixed",
						top: 0,
						left: 0,
						zIndex: -2,
					}}
				/>

				{/* DARK OVERLAY */}
				<div
					style={{
						position: "fixed",
						top: 0,
						left: 0,
						height: "100%",
						width: "100%",
						background: "rgba(0, 0, 0, 0.78)",
						zIndex: -1,
					}}
				/>

				<main
					style={{
						position: "relative",
						zIndex: 1,
						color: "white",
						
					}}>
					<Navbar />
					{children}
				</main>
			</body>
		</html>
	);
}
