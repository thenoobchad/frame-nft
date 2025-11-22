import Image from "next/image";

const details = [

]
export default function Home() {
  return (
		<>
			{/* <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://buildnft.vercel.app/og-image.png" />
        <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
        <meta property="fc:frame:button:1" content="Mint Build NFT" />
        <meta property="fc:frame:button:1:action" content="tx" />
        <meta property="fc:frame:button:1:target" content="https://buildnft.vercel.app/api/mint-tx" />
        <meta property="fc:frame:post_url" content="https://buildnft.vercel.app/api/success" />
      </head> */}
			<main className="w-screen justify-center flex items-center flex-col px-8 mx-auto max-w-5xl">
				<h4 className="text-5xl font-bold mt-5">Build</h4>
				<p className="my-4 text-zinc-300">
					Enter the waitlist - 500 whitelist spot. Free mint on Base.
				</p>

				<p className="justify-start w-full">Mint starts in</p>

				<div className="grid grid-cols-12 gap-4 w-full my-6">
					<div className="bg-black p-6 outline outline-zinc-900 flex flex-col items-center gap-2 col-span-3 rounded-lg">
						<h4 className="text-3xl font-bold">01</h4>
						<p className="text-zinc-400">DAYS</p>
					</div>
					<div className="bg-black p-6 outline outline-zinc-900 flex flex-col items-center gap-2 col-span-3 rounded-lg">
						<h4 className="text-3xl font-bold">05</h4>
						<p className="text-zinc-400">HRS</p>
					</div>
					<div className="bg-black p-6 outline outline-zinc-900 flex flex-col items-center gap-2 col-span-3 rounded-lg">
						<h4 className="text-3xl font-bold">41</h4>
						<p className="text-zinc-400">MIN</p>
					</div>
					<div className="bg-black p-6 outline outline-zinc-900 flex flex-col items-center gap-2 col-span-3 rounded-lg">
						<h4 className="text-3xl font-bold ">56</h4>
						<p className="text-zinc-400">SEC</p>
					</div>
				</div>

				<div className="w-full grid grid-cols-12 gap-4 border-t py-4 border-zinc-800">
					{nftDetails.map((c, i) => (
						<div
							key={i}
							className="bg-black col-span-6 px-6 py-3 outline outline-zinc-900 flex flex-col items-center gap-2 rounded-lg">
							<h4 className="text-3xl font-bold">{c.count}</h4>
							<p className="text-zinc-400">{c.desc}</p>
						</div>
					))}
				</div>

        <button className="w-full backdrop-blur-md py-3 outline outline-zinc-800 rounded-lg my-3 ">Claim</button>

				<div className="mt-6 w-full">
					<h4 className="text-zinc-100">NFTs Preview</h4>
					<div className="flex gap-4">
						{nfts.map((n, i) => (
							<div key={i} className="my-4 flex gap-4">
								<Image
									src={`/${n}`}
									alt="nft"
									className="rounded-md"
									width={150}
									height={150}
								/>
							</div>
						))}
					</div>
				</div>
				
					<h4 className="my-8">Built by Rune(Chuddi) on Base</h4>
				
			</main>
		</>
	);
}

const nftDetails = [
	{
		count: "1,000",
		desc: "WL Sports",
	},
	{
		count: "10,000",
		desc: "Supply",
	},
	{
		count: "Free",
		desc: "Mint Price",
	},
	{
		count: "1",
		desc: "Per Wallet",
	},
];

const nfts = [
  "build.png", "og-image.png", "dark-background.gif"
]