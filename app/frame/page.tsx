// app/frame/page.tsx
import { getLastCast } from "@/lib/neynar";
import { saveRoast, getLeaderboard, roastSvg } from "@/lib/roast";
import { roastCast } from "@/lib/ai";
import { FrameRequest, getFrameMessage, MockFrameRequest } from "@coinbase/onchainkit/frame"; // optional, only for validation

// Helper – build OG HTML manually
function frameHtml({ image, buttons }: { image: string; buttons: string[] }) {
	const base = process.env.NEXT_PUBLIC_BASE_URL!;
	const postUrl = `${base}/frame`;

	const buttonMeta = buttons
		.map((b, i) => {
			const idx = i + 1;
			return `
        <meta property="fc:frame:button:${idx}" content="${b}" />
        <meta property="fc:frame:button:${idx}:action" content="post" />`;
		})
		.join("");

	return `<!DOCTYPE html>
<html>
<head prefix="og: http://ogp.me/ns#">
  <meta charset="utf-8" />
  <meta property="fc:frame" content="vNext" />
  <meta property="fc:frame:image" content="${image}" />
  ${buttonMeta}
  <meta property="fc:frame:post_url" content="${postUrl}" />
</head>
<body></body>
</html>`;
}

// GET – initial frame
export default function GET ()  {
	const html = frameHtml({
		image: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?score=0&burn=Roast+My+Cast`,
		buttons: ["Roast My Cast"],
	});
	return new Response(html, { headers: { "Content-Type": "text/html" } });
};

// POST – Server Action (no API route!)
export async function POST(request: Request) {
	const formData = await request.formData();
	const entries = Object.fromEntries(formData) as Record<string, FormDataEntryValue>;

	// Try to marshal the form payload into the FrameRequest shape the validator expects.
	// Many forms send JSON strings for nested objects; parse them if present.
	let frameReq: FrameRequest | MockFrameRequest | Record<string, unknown> = entries;

	if (typeof entries.untrustedData === "string" && typeof entries.trustedData === "string") {
		// safe-parse JSON fields; if parse fails we'll let validation handle it
		try {
			frameReq = {
				untrustedData: JSON.parse(entries.untrustedData),
				trustedData: JSON.parse(entries.trustedData),
			} as FrameRequest;
		} catch {
			// leave frameReq as the raw entries; getFrameMessage should return invalid
		}
	}

	// Now call the validator with an appropriate type
	const { isValid, message } = await getFrameMessage(frameReq as FrameRequest | MockFrameRequest);
	if (!isValid || !message?.interactor?.fid) {
		return new Response("Invalid frame", { status: 400 });
	}
	const fid = message.interactor.fid;
	// -------------------------------------------

	// read buttonIndex from parsed form entries
	const buttonIndex =
		typeof entries.buttonIndex === "string" ? entries.buttonIndex : String(entries.buttonIndex ?? "");

	// ---- 1. Generate Roast ----
	if (buttonIndex === "1") {
		const cast = await getLastCast(fid);
		const { score, burn } = await roastCast(cast);
		await saveRoast(fid, score, burn);

		const image = `${
			process.env.NEXT_PUBLIC_BASE_URL
		}/api/og?score=${score}&burn=${encodeURIComponent(burn)}`;

		const html = frameHtml({
			image,
			buttons: ["Share Roast", "Leaderboard"],
		});
		return new Response(html, { headers: { "Content-Type": "text/html" } });
	}

	// ---- 2. Show Leaderboard ----
	const leaderboard = await getLeaderboard();
	const rows = leaderboard
		.map(
			(r, i) => `<text x="80" y="${200 + i * 60}" fill="#fff" font-size="32">${
				i + 1
			}. FID ${r.fid}</text>
                   <text x="520" y="${
											200 + i * 60
										}" fill="#ef4444" font-size="36" font-weight="bold" text-anchor="end">${
				r.score
			}/10</text>`
		)
		.join("");

	const svg = roastSvg(0, "Top Roasts").replace("</svg>", rows + "</svg>");
	const dataUrl = `data:image/svg+xml,${encodeURIComponent(svg)}`;

	const html = frameHtml({
		image: dataUrl,
		buttons: ["Back"],
	});
	return new Response(html, { headers: { "Content-Type": "text/html" } });
}
