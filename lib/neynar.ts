export async function getLastCast(fid: number) {
    const res = await fetch(`https://api.neynar.com/v2/farcaster/casts?fid=${fid}&limit=1`, {
        headers: {api_key: process.env.NEYNAR_API_KEY!}
    })

    const data = await res.json();
    return data.casts?.[0].text ?? "gm"
}
