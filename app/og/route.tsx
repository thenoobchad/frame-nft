import { ImageResponse } from "next/og";
import { roastSvg } from "@/lib/roast";

export const GET = async (req: Request) => {
	const { searchParams } = new URL(req.url);
	const score = Number(searchParams.get("score") ?? 5);
	const burn = searchParams.get("burn") ?? "Mid.";

	return new ImageResponse(
		<div dangerouslySetInnerHTML={{ __html: roastSvg(score, burn) }} />,
		{ width: 600, height: 600 }
	);
};
