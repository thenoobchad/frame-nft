import { kv } from "@vercel/kv";

export async function saveRoast(fid: number, score: number, burn: string) {
	await kv.set(
		`roast:${fid}`,
		{ score, burn, ts: Date.now() },
		{ ex: 60 * 60 * 24 }
	);
}

export async function getLeaderboard() {
	const keys = await kv.keys("roast:*");
	const entries = await Promise.all(
		keys.map(async (k) => {
			const data = await kv.get(k);
			return { fid: k.split(":")[1], ...Object(data) };
		})
	);
	return entries.sort((a, b) => b.score - a.score).slice(0, 5);
}

export function roastSvg(score: number, burn: string) {
	const color = score >= 8 ? "#ef4444" : score >= 5 ? "#f59e0b" : "#10b981";
	return `
<svg width="600" height="600" xmlns="http://www.w3.org/2000/svg" font-family="system-ui">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e1b4b"/>
      <stop offset="100%" stop-color="#312e81"/>
    </linearGradient>
  </defs>
  <rect width="600" height="600" fill="url(#bg)" rx="32"/>
  <text x="300" y="180" text-anchor="middle" fill="#fff" font-size="72" font-weight="bold">${score}/10</text>
  <text x="300" y="300" text-anchor="middle" fill="${color}" font-size="36" font-weight="600">${burn}</text>
  <text x="300" y="500" text-anchor="middle" fill="#94a3b8" font-size="20">Cast Roast™ – Share the burn</text>
</svg>`;
}
