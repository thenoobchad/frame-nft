
export default function Home() {
  return (
		<>
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://buildnft.vercel.app/og-image.png" />
        <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
        <meta property="fc:frame:button:1" content="Mint Build NFT" />
        <meta property="fc:frame:button:1:action" content="tx" />
        <meta property="fc:frame:button:1:target" content="https://buildnft.vercel.app/api/mint-tx" />
        <meta property="fc:frame:post_url" content="https://buildnft.vercel.app/api/success" />
      </head>
			<main>Hello world.</main>
		</>
	);
}